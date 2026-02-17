import mongoose from 'mongoose';

/**
 * Configuración de conexión a MongoDB
 */
interface MongoDBConfig {
    uri: string;
    dbName: string;
}

/**
 * Construye la configuración de MongoDB desde variables de entorno
 */
function getMongoDBConfig(): MongoDBConfig {
    const database = process.env.MONGODB_DATABASE || 'bab3d';

    // Si MONGODB_URI está definida, usarla directamente
    if (process.env.MONGODB_URI) {
        return {
            uri: process.env.MONGODB_URI,
            dbName: database,
        };
    }

    // Construir URI desde variables individuales (para Atlas)
    // Formato Atlas: mongodb+srv://user:pass@cluster.mongodb.net/?appName=xxx
    const user = process.env.MONGODB_USER;
    const password = process.env.MONGODB_PASSWORD;
    const cluster = process.env.MONGODB_CLUSTER;
    const appName = process.env.MONGODB_APP_NAME;

    if (user && password && cluster) {
      console.info('Building MongoDB URI for Atlas...');
        const params = new URLSearchParams();
        if (appName) {
            params.append('appName', appName);
        }
        
        const queryString = params.toString();
        const uri = `mongodb+srv://${user}:${encodeURIComponent(password)}@${cluster}/${queryString ? `?${queryString}` : ''}`;
        
        return { uri, dbName: database };
    }

    // Construir URI para Docker local
    // Formato: mongodb://user:pass@localhost:port/database?authSource=admin
    const rootUser = process.env.MONGO_ROOT_USER;
    const rootPassword = process.env.MONGO_ROOT_PASSWORD;
    const port = process.env.MONGO_PORT || '27017';

    if (rootUser && rootPassword) {
        const uri = `mongodb://${rootUser}:${encodeURIComponent(rootPassword)}@localhost:${port}/${database}?authSource=admin`;
        return { uri, dbName: database };
    }

    throw new Error(
        'Por favor define MONGODB_URI o las variables individuales (MONGODB_USER, MONGODB_PASSWORD, MONGODB_CLUSTER) en .env.local'
    );
}

const mongoConfig = getMongoDBConfig();

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    // eslint-disable-next-line no-var
    var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };

if (!global.mongoose) {
    global.mongoose = cached;
}

async function connectDB(): Promise<typeof mongoose> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts: mongoose.ConnectOptions = {
            // bufferCommands: true (default) permite que Mongoose encole operaciones
            // hasta que la conexión esté lista, evitando errores de timing
            bufferCommands: true,
            dbName: mongoConfig.dbName,
            // Timeout de 10s para la selección del servidor (evita queries en cola indefinidamente)
            serverSelectionTimeoutMS: 10000,
            // Timeout de 45s para operaciones de socket
            socketTimeoutMS: 45000,
        };

        cached.promise = mongoose.connect(mongoConfig.uri, opts).then((mongoose) => {
            console.log(`✅ MongoDB conectado exitosamente a: ${mongoConfig.dbName}`);
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

// Iniciar conexión inmediatamente al importar el módulo
// Esto asegura que la conexión comience lo antes posible
connectDB().catch(console.error);

export default connectDB;
