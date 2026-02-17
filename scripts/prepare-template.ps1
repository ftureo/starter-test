# Script para preparar el proyecto como template (PowerShell para Windows)
# Uso: .\scripts\prepare-template.ps1 [directorio-destino]

param(
    [string]$DestDir = "../nextjs-portfolio-template"
)

$RootDir = Get-Location

Write-Host "🚀 Preparando template..." -ForegroundColor Cyan
Write-Host "📁 Origen: $RootDir" -ForegroundColor Gray
Write-Host "📁 Destino: $DestDir" -ForegroundColor Gray
Write-Host ""

# Resolver ruta absoluta
$DestPath = Resolve-Path -Path $DestDir -ErrorAction SilentlyContinue
if (-not $DestPath) {
    $DestPath = Join-Path (Get-Location).Parent.FullName $DestDir
}

# Verificar si el directorio destino ya existe
if (Test-Path $DestPath) {
    Write-Host "❌ Error: El directorio $DestPath ya existe." -ForegroundColor Red
    Write-Host "   Por favor, especifica un directorio diferente o elimina el existente." -ForegroundColor Yellow
    exit 1
}

# Crear directorio destino
New-Item -ItemType Directory -Path $DestPath -Force | Out-Null

Write-Host "📋 Copiando archivos..." -ForegroundColor Cyan
Write-Host ""

# Patrones a excluir
$ExcludePatterns = @(
    "node_modules",
    ".git",
    ".next",
    "out",
    "build",
    ".vercel",
    "dist",
    "coverage",
    ".DS_Store",
    "*.log",
    ".env*",
    "*.tsbuildinfo",
    "next-env.d.ts",
    ".pnp.*",
    ".yarn",
    ".cursor",
    "pnpm-lock.yaml",
    "yarn.lock",
    "package-lock.json"
)

# Función para copiar archivos recursivamente
function Copy-TemplateFiles {
    param(
        [string]$Source,
        [string]$Destination
    )
    
    $items = Get-ChildItem -Path $Source -Force
    
    foreach ($item in $items) {
        $shouldExclude = $false
        
        foreach ($pattern in $ExcludePatterns) {
            if ($item.Name -like $pattern -or $item.FullName -like "*\$pattern\*") {
                $shouldExclude = $true
                break
            }
        }
        
        if ($shouldExclude) {
            Write-Host "⏭️  Excluyendo: $($item.FullName.Replace($RootDir, ''))" -ForegroundColor Gray
            continue
        }
        
        $destPath = Join-Path $Destination $item.Name
        
        if ($item.PSIsContainer) {
            if (-not (Test-Path $destPath)) {
                New-Item -ItemType Directory -Path $destPath | Out-Null
            }
            Copy-TemplateFiles -Source $item.FullName -Destination $destPath
        } else {
            Copy-Item -Path $item.FullName -Destination $destPath -Force
            Write-Host "✅ Copiado: $($item.FullName.Replace($RootDir, ''))" -ForegroundColor Green
        }
    }
}

Copy-TemplateFiles -Source $RootDir -Destination $DestPath

Write-Host ""
Write-Host "✨ Template preparado exitosamente!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Próximos pasos:" -ForegroundColor Cyan
Write-Host "   1. cd $DestPath"
Write-Host "   2. git init"
Write-Host "   3. git add ."
Write-Host "   4. git commit -m `"Initial template commit`""
Write-Host "   5. Crear un nuevo repositorio en GitHub/GitLab"
Write-Host "   6. git remote add origin <url-del-repo>"
Write-Host "   7. git push -u origin main"
Write-Host ""
Write-Host "💡 Nota: El archivo src/config/site.ts contiene valores de ejemplo." -ForegroundColor Yellow
Write-Host "   Los usuarios pueden personalizarlo según sus necesidades." -ForegroundColor Yellow
Write-Host ""
