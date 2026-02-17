# Guía de Configuración del Template

Esta guía te ayudará a configurar el template para tu nuevo proyecto.

## 🚀 Crear el Template desde este Proyecto

Si estás en el proyecto `bab-3d-printing-design` y quieres crear el template:

### Opción 1: Usar el Script (Recomendado)

```bash
# Ejecutar el script de preparación
pnpm prepare-template

# O especificar un directorio destino
pnpm prepare-template ../mi-template

# O usar directamente Node
node scripts/prepare-template.js ../nextjs-portfolio-template
```

**En Windows (PowerShell):**
```powershell
.\scripts\prepare-template.ps1
# O con directorio personalizado
.\scripts\prepare-template.ps1 ..\mi-template
```

**En Linux/Mac:**
```bash
chmod +x scripts/prepare-template.sh
./scripts/prepare-template.sh
# O con directorio personalizado
./scripts/prepare-template.sh ../mi-template
```

### Opción 2: Manual

1. Copiar el proyecto a un nuevo directorio:
   ```bash
   # Desde el directorio padre
   cp -r bab-3d-printing-design nextjs-portfolio-template
   cd nextjs-portfolio-template
   ```

2. Eliminar archivos no necesarios:
   ```bash
   rm -rf .git
   rm -rf node_modules
   rm -rf .next
   rm -rf out
   rm -rf .vercel
   rm pnpm-lock.yaml  # o yarn.lock / package-lock.json
   ```

3. Inicializar nuevo repositorio:
   ```bash
   git init
   git add .
   git commit -m "Initial template commit"
   ```

## Pasos Iniciales para Usar el Template

### 1. Clonar el Template

```bash
# Clonar el repositorio del template
git clone <url-del-template>
cd <nombre-del-proyecto>

# Eliminar el historial de git (opcional, si quieres empezar desde cero)
rm -rf .git
git init
```

### 2. Instalar Dependencias

```bash
# Usando pnpm (recomendado)
pnpm install

# O usando npm
npm install

# O usando yarn
yarn install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Base de datos MongoDB
MONGODB_URI=mongodb://localhost:27017/tu-base-de-datos

# Cloudinary (para subida de imágenes)
CLOUDINARY_CLOUD_NAME=tu-cloud-name
CLOUDINARY_API_KEY=tu-api-key
CLOUDINARY_API_SECRET=tu-api-secret

# URL del sitio (para metadata)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Personalizar Configuración del Sitio

El template usa un sistema de configuración centralizado. Todo el contenido personalizable está en `src/config/site.ts`.

#### Paso 1: Verificar que site.ts existe

El archivo `src/config/site.ts` debería existir con valores de ejemplo. Si no existe, cópialo desde `site.example.ts`:

```bash
cp src/config/site.example.ts src/config/site.ts
```

#### Paso 2: Personalizar `src/config/site.ts`

Edita el archivo `src/config/site.ts` y personaliza:

**Branding:**
```typescript
branding: {
    name: "Tu Nombre de Empresa",
    shortName: "Tu Nombre Corto",
    tagline: "Tu tagline aquí",
    logo: "/logo.png", // Ruta a tu logo en public/
}
```

**SEO:**
```typescript
seo: {
    title: "Tu Título",
    description: "Tu descripción",
    url: "https://tu-dominio.com",
    keywords: ["palabra1", "palabra2", ...],
    openGraph: {
        title: "Tu Título OG",
        description: "Tu descripción OG",
        images: ["/images/og-image.jpg"],
    },
}
```

**Contacto:**
```typescript
contact: {
    phone: "+54 11 1234-5678",
    email: "contacto@tu-dominio.com",
    locations: {
        // Personaliza tus ubicaciones
    },
}
```

**Navegación:**
```typescript
navigation: [
    {
        title: "Servicios",
        href: "/services",
        color: "text-white hover:text-primary",
        icon: FaTools, // Importa el icono que necesites
    },
    // Agrega más items...
]
```

**Hero Slides:**
```typescript
hero: {
    autoplayDelay: 6000,
    slides: [
        {
            id: 1,
            image: "url-de-tu-imagen",
            title: "Tu Título",
            subtitle: "Tu Subtítulo",
            description: "Tu descripción",
            cta: {
                label: "Texto del Botón",
                href: "/ruta",
            },
            icon: Printer, // Icono de lucide-react
            accent: "cyan", // "cyan", "fuchsia", o "amber"
        },
        // Agrega más slides...
    ],
}
```

**Textos de Secciones:**
```typescript
sections: {
    services: {
        badge: "Texto del Badge",
        title: "Título de la Sección",
        description: "Descripción de la sección",
        viewAllText: "Ver todos",
    },
    about: {
        whatWeDo: {
            title: "Qué hacemos",
            description: "Descripción de qué hace tu empresa",
        },
        whoWeAre: {
            title: "Quiénes somos",
            description: "Descripción del equipo",
        },
    },
}
```

**Owner / Fundador:**
```typescript
owner: {
    name: "Nombre del Fundador",
    role: "Rol del Fundador",
    image: "url-de-la-imagen",
    linkedIn: "https://linkedin.com/in/perfil",
    bio: "Biografía del fundador...",
}
```

**Miembros del Equipo:**
```typescript
team: {
    members: [
        {
            id: "1",
            name: "Nombre del Miembro",
            role: "Rol del Miembro",
            image: "url-de-la-imagen",
            description: "Descripción del miembro",
        },
        // Agrega más miembros...
    ],
}
```

**Pilares / Valores:**
```typescript
pillars: [
    {
        icon: Lightbulb, // Icono de lucide-react
        title: "Título del Pilar",
        description: "Descripción del pilar",
    },
    // Agrega más pilares...
]
```

### 5. Personalizar Tema y Colores

Edita `src/config/theme.ts` para personalizar los colores de marca:

```typescript
colors: {
    brand: {
        tuColor: {
            200: '#color-claro',
            500: '#color-medio',
            800: '#color-oscuro',
        },
        // Agrega más colores...
    },
}
```

Los colores definidos aquí estarán disponibles en Tailwind como `bg-tuColor-500`, `text-tuColor-200`, etc.

### 6. Actualizar package.json

```json
{
  "name": "tu-nombre-del-proyecto",
  "version": "1.0.0",
  // ... resto de la configuración
}
```

### 7. Configurar Base de Datos

Asegúrate de tener MongoDB corriendo. Puedes usar Docker:

```bash
docker-compose up -d
```

O conectarte a una instancia de MongoDB existente.

### 8. Ejecutar Seed (Opcional)

Si quieres poblar la base de datos con datos de ejemplo:

```bash
pnpm seed
```

### 9. Iniciar el Servidor de Desarrollo

```bash
pnpm dev
```

Visita [http://localhost:3000](http://localhost:3000) para ver tu sitio.

## Estructura de Archivos Importantes

```
src/
├── config/
│   ├── site.ts              # ⚠️ Configuración principal (personalizar aquí)
│   ├── site.example.ts       # Ejemplo de configuración
│   ├── theme.ts             # Colores y tema (personalizar aquí)
│   └── examples.ts          # Datos de ejemplo
├── constants/
│   ├── navigation.ts        # (usa site.ts)
│   ├── contact.ts          # (usa site.ts)
│   └── projects.ts         # (usa examples.ts)
└── app/
    └── layout.tsx          # Metadata (usa site.ts)
```

## Personalización Avanzada

### Cambiar la Fuente

1. Edita `src/app/layout.tsx`
2. Importa una fuente diferente de `next/font/google`:

```typescript
import { Inter } from "next/font/google";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});
```

3. Actualiza `src/config/theme.ts` con la nueva variable CSS.

### Agregar Nuevas Secciones

1. Crea el componente en `src/components/sections/`
2. Agrega la configuración en `src/config/site.ts` si es necesario
3. Usa el componente en las páginas correspondientes

### Modificar la API

La API está en `src/app/api/`. Puedes:
- Modificar endpoints existentes
- Agregar nuevos endpoints
- Cambiar los modelos en `src/models/`

## Checklist de Personalización

- [ ] Copiar `site.example.ts` a `site.ts` (si es necesario)
- [ ] Personalizar branding en `site.ts`
- [ ] Actualizar información de contacto
- [ ] Configurar navegación
- [ ] Personalizar slides del Hero
- [ ] Actualizar textos de secciones
- [ ] Personalizar colores en `theme.ts`
- [ ] Actualizar `package.json` con nombre del proyecto
- [ ] Configurar variables de entorno
- [ ] Agregar logo en `public/`
- [ ] Actualizar imágenes del Hero
- [ ] Configurar base de datos
- [ ] Probar el sitio en desarrollo

## Notas Importantes

- **El archivo `src/config/site.ts` está commiteado** con valores de ejemplo. Esto es intencional para que el template funcione inmediatamente.
- Los usuarios pueden personalizar `site.ts` según sus necesidades.
- El contenido estático actual (textos, imágenes) se mantiene como ejemplo. Reemplázalo con tu contenido.
- La API está acoplada al proyecto. Puedes modificarla según tus necesidades.
- Los componentes están diseñados para ser reutilizables. Personaliza según sea necesario.

## Soporte

Si tienes problemas o preguntas:
1. Revisa la documentación de Next.js: https://nextjs.org/docs
2. Revisa los comentarios en el código
3. Consulta los archivos de ejemplo en `src/config/`

## Próximos Pasos

Una vez configurado el template:
1. Personaliza el contenido según tu proyecto
2. Agrega tus propias imágenes y assets
3. Configura el panel de administración (`/admin`)
4. Personaliza los estilos si es necesario
5. Despliega tu proyecto

¡Listo para desarrollar! 🚀
