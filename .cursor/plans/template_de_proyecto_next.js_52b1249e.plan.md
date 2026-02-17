---
name: Template de proyecto Next.js
overview: Convertir el proyecto actual en un template reutilizable mejorando la componetización, extrayendo contenido específico a configuración, y preparando la estructura para ser clonada como base de nuevos proyectos.
todos:
  - id: create-site-config
    content: "Crear sistema de configuración centralizado: site.ts, site.example.ts, theme.ts"
    status: completed
  - id: refactor-constants
    content: Refactorizar constantes (navigation, contact, projects) para usar configuración centralizada
    status: completed
    dependencies:
      - create-site-config
  - id: improve-hero-component
    content: Extraer HERO_SLIDES de Hero.tsx a configuración y hacer componente más genérico
    status: completed
    dependencies:
      - create-site-config
  - id: improve-services-component
    content: Extraer textos hardcodeados de Services.tsx a configuración
    status: completed
    dependencies:
      - create-site-config
  - id: update-layout-metadata
    content: Actualizar layout.tsx para leer metadata desde site.ts
    status: completed
    dependencies:
      - create-site-config
  - id: update-package-json
    content: Actualizar package.json con nombre genérico y preparar para template
    status: completed
  - id: update-tailwind-config
    content: Hacer tailwind.config.ts más genérico leyendo colores desde theme.ts
    status: completed
    dependencies:
      - create-site-config
  - id: create-template-docs
    content: Crear TEMPLATE_SETUP.md y actualizar README.md con documentación del template
    status: completed
---

# Plan: Convertir proyecto en template reutilizable

## Objetivo

Transformar el proyecto BAB 3D Printing & Design en un template reutilizable con mejor componetización y sistema de configuración centralizado, manteniendo la API acoplada.

## Estrategia

Crear un repositorio separado para el template con:

- Sistema de configuración centralizado para personalización
- Componentes más genéricos y configurables
- Documentación para inicialización de nuevos proyectos
- Scripts de setup opcionales

## Análisis del proyecto actual

### Contenido específico a extraer:

1. **Branding y textos** (`src/constants/`):

   - `navigation.ts`: Títulos de navegación específicos
   - `contact.ts`: Información de contacto (BAB 3D)
   - `projects.ts`: Proyectos de ejemplo hardcodeados

2. **Metadata y SEO** (`src/app/layout.tsx`):

   - Título, descripción, keywords específicos
   - OpenGraph data

3. **Contenido en componentes**:

   - `Hero.tsx`: Slides con contenido específico
   - `Services.tsx`: Textos hardcodeados ("Nuestros Servicios", etc.)
   - Varios componentes con textos en español específicos

4. **Configuración visual**:

   - `tailwind.config.ts`: Colores de marca (luminacore, fuchsineacrylic, freshpolymer)
   - Fonts específicas (Afacad_Flux)

5. **Package.json**:

   - Nombre del proyecto: "bab-3d-printing-design"

## Implementación

### 1. Crear sistema de configuración centralizado

**Archivo: `src/config/site.ts`** (nuevo)

- Configuración centralizada del sitio:
  - Branding (nombre, logo, tagline)
  - Información de contacto
  - Metadata SEO
  - Colores del tema
  - Configuración de navegación
  - Configuración de Hero slides

**Archivo: `src/config/theme.ts`** (nuevo)

- Configuración de colores y estilos
- Paleta de colores personalizable
- Configuración de fuentes

### 2. Refactorizar constantes existentes

**Modificar: `src/constants/navigation.ts`**

- Hacer que use configuración de `site.ts`
- Mantener estructura pero leer desde config

**Modificar: `src/constants/contact.ts`**

- Convertir a función que lee de `site.ts`
- O mover directamente a `site.ts`

**Modificar: `src/constants/projects.ts`**

- Convertir en datos de ejemplo/seed
- Mover a `src/config/examples.ts` o similar

### 3. Mejorar componetización

**Modificar: `src/components/sections/Hero.tsx`**

- Extraer `HERO_SLIDES` a configuración en `site.ts`
- Hacer componente más genérico

**Modificar: `src/components/sections/Services.tsx`**

- Extraer textos hardcodeados a configuración
- Hacer textos configurables via props o config

**Modificar: `src/components/common/ServiceCard.tsx`**

- Ya está bastante genérico, pero verificar que no tenga textos hardcodeados

**Crear: `src/components/common/ConfigurableText.tsx`** (opcional)

- Componente wrapper para textos configurables
- Facilita la personalización

### 4. Actualizar configuración de build

**Modificar: `package.json`**

- Cambiar nombre a algo genérico como "nextjs-portfolio-template"
- Agregar scripts de setup si es necesario

**Modificar: `src/app/layout.tsx`**

- Leer metadata desde `site.ts`
- Hacer font configurable

**Modificar: `tailwind.config.ts`**

- Leer colores del tema desde configuración
- Hacer más genérico

### 5. Preparar para template

**Crear: `TEMPLATE.md` o `TEMPLATE_SETUP.md`**

- Guía de cómo usar el template
- Instrucciones de personalización
- Lista de archivos a modificar

**Crear: `.template-config.example.json`** (opcional)

- Archivo de ejemplo con todas las configuraciones
- Puede ser usado por scripts de setup

**Actualizar: `README.md`**

- Documentación como template
- Instrucciones de instalación
- Guía de personalización

**Crear: `src/config/site.example.ts`**

- Archivo de ejemplo con toda la configuración
- Usuario lo copia a `site.ts` y personaliza

### 6. Limpiar contenido específico

**Identificar y marcar:**

- Imágenes específicas en `public/` (mantener estructura pero documentar)
- Referencias a Cloudinary específicas (documentar configuración)
- Cualquier otro contenido hardcodeado

## Estructura de archivos resultante

```
src/
├── config/
│   ├── site.ts              # Configuración principal (generado desde example)
│   ├── site.example.ts      # Ejemplo de configuración
│   ├── theme.ts             # Configuración de tema
│   └── examples.ts          # Datos de ejemplo/seed
├── constants/
│   ├── navigation.ts        # (refactorizado para usar config)
│   ├── contact.ts          # (refactorizado o movido a config)
│   └── projects.ts         # (movido a examples.ts)
└── ...
```

## Flujo de uso del template

1. Clonar el repositorio del template
2. Copiar `site.example.ts` a `site.ts`
3. Personalizar `site.ts` con información del nuevo proyecto
4. (Opcional) Ejecutar script de setup si se crea
5. Modificar colores en `theme.ts` si es necesario
6. Actualizar `package.json` con nombre del proyecto
7. Inicializar nuevo repo git
8. Listo para desarrollar

## Ventajas de esta estrategia

- ✅ Separación clara entre template y proyecto específico
- ✅ Fácil personalización centralizada
- ✅ Mantiene estructura y API acoplada
- ✅ Componentes más reutilizables
- ✅ Documentación clara para nuevos usuarios
- ✅ Puede evolucionar el template sin afectar proyectos existentes

## Notas importantes

- El contenido estático actual (textos, imágenes) se mantiene como ejemplo
- La API se mantiene acoplada como solicitaste
- Los componentes mejoran en generalidad pero mantienen funcionalidad
- Se puede crear un script de inicialización opcional más adelante