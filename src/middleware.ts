import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isRouteEnabled } from '@/config/features';

/**
 * Middleware para control de acceso a rutas
 * 
 * Intercepta requests y puede:
 * - Bloquear rutas deshabilitadas
 * - Redirigir a páginas de "próximamente"
 * - Agregar headers personalizados
 */
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // Ignorar archivos estáticos y API routes
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.') // archivos con extensión
    ) {
        return NextResponse.next();
    }
    
    // Verificar si la ruta está habilitada
    const { enabled, message } = isRouteEnabled(pathname);
    
    if (!enabled) {
        // Opción 1: Redirigir a página de "coming soon" con mensaje
        const url = request.nextUrl.clone();
        url.pathname = '/coming-soon';
        url.searchParams.set('from', pathname);
        if (message) {
            url.searchParams.set('message', message);
        }
        
        // Opción 2: Mostrar 404 (descomentar si prefieres)
        // return NextResponse.rewrite(new URL('/not-found', request.url));
        
        return NextResponse.redirect(url);
    }
    
    return NextResponse.next();
}

/**
 * Configuración del matcher
 * Define qué rutas pasan por el middleware
 */
export const config = {
    matcher: [
        /*
         * Coincidir con todas las rutas excepto:
         * - _next/static (archivos estáticos)
         * - _next/image (optimización de imágenes)
         * - favicon.ico
         * - archivos públicos con extensión
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
    ],
};
