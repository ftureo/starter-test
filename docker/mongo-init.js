// Script de inicialización de MongoDB
// Se ejecuta automáticamente cuando el contenedor se crea por primera vez

// Usar la base de datos configurada
const dbName = process.env.MONGO_INITDB_DATABASE || 'bab3d';

db = db.getSiblingDB(dbName);

// Crear usuario de la aplicación (opcional, para mayor seguridad)
db.createUser({
    user: process.env.MONGO_APP_USER || 'bab3d_app',
    pwd: process.env.MONGO_APP_PASSWORD || 'bab3d_app_password',
    roles: [
        {
            role: 'readWrite',
            db: dbName
        }
    ]
});

// Crear colecciones con validación de esquema
db.createCollection('services', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['title', 'slug', 'description', 'image'],
            properties: {
                title: { bsonType: 'string' },
                slug: { bsonType: 'string' },
                description: { bsonType: 'string' },
                image: { bsonType: 'string' },
                isActive: { bsonType: 'bool' }
            }
        }
    }
});

db.createCollection('projects', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['title', 'slug', 'description', 'image', 'status', 'category', 'startDate'],
            properties: {
                title: { bsonType: 'string' },
                slug: { bsonType: 'string' },
                description: { bsonType: 'string' },
                image: { bsonType: 'string' },
                status: { enum: ['in-progress', 'completed', 'planned'] },
                isActive: { bsonType: 'bool' }
            }
        }
    }
});

// Crear índices
db.services.createIndex({ slug: 1 }, { unique: true });
db.services.createIndex({ isActive: 1, order: 1 });

db.projects.createIndex({ slug: 1 }, { unique: true });
db.projects.createIndex({ isActive: 1, status: 1 });
db.projects.createIndex({ isActive: 1, featured: 1 });
db.projects.createIndex({ category: 1, isActive: 1 });
db.projects.createIndex({ createdAt: -1 });

print('✅ Base de datos inicializada correctamente');
print('📦 Colecciones: services, projects');
print('🔑 Índices creados');
