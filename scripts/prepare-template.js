#!/usr/bin/env node

/**
 * Script para preparar el proyecto como template
 * 
 * Este script copia todos los archivos necesarios a un nuevo directorio,
 * excluyendo node_modules, .git, y otros archivos que no deben estar en el template.
 * 
 * Uso: node scripts/prepare-template.js [directorio-destino]
 */

const fs = require('fs');
const path = require('path');

const DEST_DIR = process.argv[2] || '../nextjs-portfolio-template';

// Archivos y directorios a excluir
const EXCLUDE_PATTERNS = [
    'node_modules',
    '.git',
    '.next',
    'out',
    'build',
    '.vercel',
    'dist',
    'coverage',
    '.DS_Store',
    '*.log',
    '.env*',
    '*.tsbuildinfo',
    'next-env.d.ts',
    '.pnp.*',
    '.yarn',
    '.cursor',
];

// Archivos específicos a excluir
const EXCLUDE_FILES = [
    'pnpm-lock.yaml',
    'yarn.lock',
    'package-lock.json',
];

function shouldExclude(filePath, rootPath) {
    const relativePath = path.relative(rootPath, filePath);
    
    // Verificar patrones de exclusión
    for (const pattern of EXCLUDE_PATTERNS) {
        if (relativePath.includes(pattern) || relativePath.match(new RegExp(pattern.replace('*', '.*')))) {
            return true;
        }
    }
    
    // Verificar archivos específicos
    const fileName = path.basename(filePath);
    if (EXCLUDE_FILES.includes(fileName)) {
        return true;
    }
    
    return false;
}

function copyFile(src, dest) {
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(src, dest);
}

function copyDirectory(src, dest, rootPath) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (shouldExclude(srcPath, rootPath)) {
            console.log(`⏭️  Excluyendo: ${path.relative(rootPath, srcPath)}`);
            continue;
        }
        
        if (entry.isDirectory()) {
            copyDirectory(srcPath, destPath, rootPath);
        } else {
            copyFile(srcPath, destPath);
            console.log(`✅ Copiado: ${path.relative(rootPath, srcPath)}`);
        }
    }
}

function main() {
    const rootPath = path.resolve(__dirname, '..');
    const destPath = path.resolve(DEST_DIR);
    
    console.log('🚀 Preparando template...\n');
    console.log(`📁 Origen: ${rootPath}`);
    console.log(`📁 Destino: ${destPath}\n`);
    
    // Verificar si el directorio destino ya existe
    if (fs.existsSync(destPath)) {
        console.error(`❌ Error: El directorio ${destPath} ya existe.`);
        console.error('   Por favor, especifica un directorio diferente o elimina el existente.');
        process.exit(1);
    }
    
    // Crear directorio destino
    fs.mkdirSync(destPath, { recursive: true });
    
    // Copiar archivos
    console.log('📋 Copiando archivos...\n');
    copyDirectory(rootPath, destPath, rootPath);
    
    // Crear .gitignore en el destino si no existe
    const gitignoreDest = path.join(destPath, '.gitignore');
    if (fs.existsSync(path.join(rootPath, '.gitignore'))) {
        copyFile(path.join(rootPath, '.gitignore'), gitignoreDest);
    }
    
    // Agregar site.ts al .gitignore del template (opcional, para que cada usuario lo personalice)
    // Pero en realidad, para un template queremos que site.ts esté commiteado con valores de ejemplo
    // Así que no lo agregamos al .gitignore
    
    console.log('\n✨ Template preparado exitosamente!\n');
    console.log('📝 Próximos pasos:');
    console.log(`   1. cd ${DEST_DIR}`);
    console.log('   2. git init');
    console.log('   3. git add .');
    console.log('   4. git commit -m "Initial template commit"');
    console.log('   5. Crear un nuevo repositorio en GitHub/GitLab');
    console.log('   6. git remote add origin <url-del-repo>');
    console.log('   7. git push -u origin main\n');
    console.log('💡 Nota: El archivo src/config/site.ts contiene valores de ejemplo.');
    console.log('   Los usuarios pueden personalizarlo según sus necesidades.\n');
}

main();
