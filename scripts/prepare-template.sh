#!/bin/bash

# Script para preparar el proyecto como template (versión bash)
# Uso: ./scripts/prepare-template.sh [directorio-destino]

DEST_DIR=${1:-../nextjs-portfolio-template}
ROOT_DIR=$(pwd)

echo "🚀 Preparando template..."
echo "📁 Origen: $ROOT_DIR"
echo "📁 Destino: $DEST_DIR"
echo ""

# Verificar si el directorio destino ya existe
if [ -d "$DEST_DIR" ]; then
    echo "❌ Error: El directorio $DEST_DIR ya existe."
    echo "   Por favor, especifica un directorio diferente o elimina el existente."
    exit 1
fi

# Crear directorio destino
mkdir -p "$DEST_DIR"

echo "📋 Copiando archivos..."
echo ""

# Copiar archivos excluyendo directorios y archivos no deseados
rsync -av \
    --exclude='node_modules' \
    --exclude='.git' \
    --exclude='.next' \
    --exclude='out' \
    --exclude='build' \
    --exclude='.vercel' \
    --exclude='dist' \
    --exclude='coverage' \
    --exclude='.DS_Store' \
    --exclude='*.log' \
    --exclude='.env*' \
    --exclude='*.tsbuildinfo' \
    --exclude='next-env.d.ts' \
    --exclude='.pnp.*' \
    --exclude='.yarn' \
    --exclude='.cursor' \
    --exclude='pnpm-lock.yaml' \
    --exclude='yarn.lock' \
    --exclude='package-lock.json' \
    "$ROOT_DIR/" "$DEST_DIR/"

echo ""
echo "✨ Template preparado exitosamente!"
echo ""
echo "📝 Próximos pasos:"
echo "   1. cd $DEST_DIR"
echo "   2. git init"
echo "   3. git add ."
echo "   4. git commit -m \"Initial template commit\""
echo "   5. Crear un nuevo repositorio en GitHub/GitLab"
echo "   6. git remote add origin <url-del-repo>"
echo "   7. git push -u origin main"
echo ""
echo "💡 Nota: El archivo src/config/site.ts contiene valores de ejemplo."
echo "   Los usuarios pueden personalizarlo según sus necesidades."
echo ""
