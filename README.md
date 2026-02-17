# Next.js Portfolio Template

Template reutilizable de Next.js con API acoplada, sistema de servicios/proyectos y panel de administración.

## Características

- ✅ **Next.js 15** con App Router
- ✅ **TypeScript** para type safety
- ✅ **API acoplada** con MongoDB y Mongoose
- ✅ **Sistema de configuración centralizado** para fácil personalización
- ✅ **Panel de administración** para gestionar servicios y proyectos
- ✅ **Componentes reutilizables** y bien estructurados
- ✅ **Tailwind CSS** con sistema de temas personalizable
- ✅ **Cloudinary** para gestión de imágenes
- ✅ **Responsive design** y optimizado para SEO

## 🚀 Inicio Rápido

### 1. Clonar el Template

```bash
git clone <url-del-template>
cd <nombre-del-proyecto>

# Eliminar historial de git (opcional)
rm -rf .git
git init
```

### 2. Instalar Dependencias

```bash
pnpm install
# o
npm install
# o
yarn install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local`:

```env
MONGODB_URI=mongodb://localhost:27017/tu-base-de-datos
CLOUDINARY_CLOUD_NAME=tu-cloud-name
CLOUDINARY_API_KEY=tu-api-key
CLOUDINARY_API_SECRET=tu-api-secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Personalizar Configuración

**IMPORTANTE:** Edita `src/config/site.ts` para personalizar tu proyecto.

El archivo `site.ts` viene con valores de ejemplo (BAB 3D) que hacen que el template funcione inmediatamente. **Debes personalizarlo** con tu información:
- Branding (nombre, logo, tagline)
- Información de contacto
- Metadata SEO
- Navegación
- Slides del Hero
- Textos de secciones
- Owner/Fundador
- Miembros del equipo
- Pilares/Valores de la empresa

> 💡 **Nota:** `site.ts` está commiteado en el template (no está en `.gitignore`) porque es código fuente necesario para que funcione. Puedes modificarlo libremente en tu proyecto.

Ver [TEMPLATE_SETUP.md](./TEMPLATE_SETUP.md) para una guía completa de personalización.

### 5. Iniciar el Servidor

```bash
pnpm dev
```

Visita [http://localhost:3000](http://localhost:3000)

## 📚 Documentación

- **[TEMPLATE_SETUP.md](./TEMPLATE_SETUP.md)** - Guía completa de configuración y personalización
- **[Next.js Documentation](https://nextjs.org/docs)** - Documentación oficial de Next.js

## 🏗️ Estructura del Proyecto

```
src/
├── app/                    # Rutas y páginas (App Router)
│   ├── api/                # API endpoints
│   ├── admin/              # Panel de administración
│   └── ...
├── components/            # Componentes React
│   ├── common/            # Componentes reutilizables
│   ├── sections/          # Secciones de página
│   └── ui/                # Componentes UI (shadcn/ui)
├── config/                # Configuración centralizada
│   ├── site.ts            # ⚠️ Configuración principal (personalizar aquí)
│   ├── site.example.ts    # Ejemplo de configuración
│   └── theme.ts          # Colores y tema
├── constants/            # Constantes (usan config/)
├── lib/                  # Utilidades y helpers
├── models/               # Modelos de MongoDB
└── types/                # Tipos TypeScript
```

## 🎨 Personalización

### Configuración del Sitio

Todo el contenido personalizable está en `src/config/site.ts`:
- Branding y textos
- Información de contacto
- Metadata SEO
- Navegación
- Hero slides
- Textos de secciones

### Colores y Tema

Personaliza los colores en `src/config/theme.ts`. Los colores definidos estarán disponibles en Tailwind.

## 📦 Scripts Disponibles

```bash
pnpm dev          # Servidor de desarrollo
pnpm build        # Build de producción
pnpm start        # Servidor de producción
pnpm lint         # Linter
pnpm seed         # Poblar base de datos con datos de ejemplo
```

## 🔧 Tecnologías Utilizadas

- **Next.js 15** - Framework React
- **TypeScript** - Type safety
- **MongoDB** - Base de datos
- **Mongoose** - ODM para MongoDB
- **Tailwind CSS** - Estilos
- **shadcn/ui** - Componentes UI
- **Cloudinary** - Gestión de imágenes
- **Framer Motion** - Animaciones
- **Lucide React** - Iconos

## 📝 Notas Importantes

- El contenido estático actual (textos, imágenes) se mantiene como ejemplo
- La API está acoplada al proyecto - puedes modificarla según tus necesidades
- **`src/config/site.ts` está commiteado** con valores de ejemplo (BAB 3D) para que el template funcione inmediatamente
- Personaliza `site.ts` con tu información después de clonar el template
- El archivo funciona en deploy porque está commiteado (no está en `.gitignore`)

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Deploy automático

### Otros Proveedores

El proyecto puede desplegarse en cualquier plataforma que soporte Next.js:
- Netlify
- Railway
- Render
- AWS
- etc.

## 📄 Licencia

Este template es de código abierto y está disponible para uso personal y comercial.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📞 Soporte

Para preguntas o problemas:
1. Revisa [TEMPLATE_SETUP.md](./TEMPLATE_SETUP.md)
2. Revisa los comentarios en el código
3. Consulta la documentación de Next.js

---

Hecho con ❤️ usando Next.js
