/**
 * Configuración de Feature Flags
 * 
 * Controla qué funcionalidades y rutas están habilitadas.
 * Para cambios en producción sin redeploy, considerar migrar a base de datos.
 */

type MatchType = 'exact' | 'startsWith' | 'pattern';

type RouteConfig = {
    enabled: boolean;
    /** Mensaje personalizado para mostrar si está deshabilitado */
    message?: string;
    /** Solo mostrar en desarrollo */
    devOnly?: boolean;
    /** 
     * Tipo de coincidencia:
     * - 'exact': Solo coincide con la ruta exacta
     * - 'startsWith': Coincide con cualquier ruta que empiece con el path
     * - 'pattern': Coincide con rutas dinámicas (usa * como wildcard)
     */
    match?: MatchType;
};

type FeatureConfig = {
    routes: Record<string, RouteConfig>;
    features: Record<string, boolean>;
};

const isDev = process.env.NODE_ENV === 'development';

export const FEATURES: FeatureConfig = {
    /**
     * Rutas que pueden ser habilitadas/deshabilitadas
     * 
     * Ejemplos:
     * - '/services': { match: 'exact' }     → Solo /services
     * - '/services/*': { match: 'pattern' } → /services/algo, /services/otro
     * - '/admin': { match: 'startsWith' }   → /admin, /admin/projects, etc.
     */
    routes: {
        // ✅ /services está habilitado
        '/services': { 
            enabled: true,
            match: 'exact',
        },
        
        // ❌ /services/* (las páginas de detalle) están deshabilitadas
        '/services/*': { 
            enabled: true,
            match: 'pattern',
            message: 'Los detalles de servicios estarán disponibles próximamente' 
        },
        
        // Proyectos
        '/projects': { 
            enabled: true,
            match: 'exact',
        },
        '/projects/*': { 
            enabled: true,  // Cambiar a false si quieres ocultar detalles
            match: 'pattern',
            message: 'Estamos preparando nuestro portafolio' 
        },
        
        // Admin - todas las subrutas
        '/admin': { 
            enabled: true,
            match: 'startsWith',  // Incluye /admin, /admin/projects, etc.
            devOnly: false,
        },
    },
    
    /**
     * Features específicas (no rutas)
     */
    features: {
        projectLikes: true,
        projectComments: false,
        newsletter: false,
        darkModeToggle: false,
    },
};

/**
 * Verifica si una ruta está habilitada
 */
export function isRouteEnabled(pathname: string): { enabled: boolean; message?: string } {
    // Normalizar pathname (quitar trailing slash excepto para root)
    const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
    
    // Ordenar rutas: patrones específicos primero, luego por longitud
    const sortedRoutes = Object.entries(FEATURES.routes)
        .sort((a, b) => {
            // Patrones con * tienen prioridad sobre startsWith
            const aIsPattern = a[0].includes('*');
            const bIsPattern = b[0].includes('*');
            if (aIsPattern && !bIsPattern) return -1;
            if (!aIsPattern && bIsPattern) return 1;
            // Luego por longitud (más específico primero)
            return b[0].replace('*', '').length - a[0].replace('*', '').length;
        });
    
    for (const [route, config] of sortedRoutes) {
        const matchType = config.match || 'startsWith';
        let matches = false;
        
        switch (matchType) {
            case 'exact':
                matches = normalizedPath === route;
                break;
                
            case 'pattern':
                // Convierte /services/* a regex que matchea /services/algo
                if (route.includes('*')) {
                    const baseRoute = route.replace('/*', '');
                    // Debe empezar con baseRoute Y tener algo después del slash
                    matches = normalizedPath.startsWith(baseRoute + '/') && 
                              normalizedPath.length > baseRoute.length + 1;
                }
                break;
                
            case 'startsWith':
            default:
                matches = normalizedPath === route || normalizedPath.startsWith(route + '/');
                break;
        }
        
        if (matches) {
            // Si es devOnly y estamos en producción, deshabilitar
            if (config.devOnly && !isDev) {
                return { enabled: false, message: 'Página no disponible' };
            }
            return { enabled: config.enabled, message: config.message };
        }
    }
    
    // Por defecto, las rutas no listadas están habilitadas
    return { enabled: true };
}

/**
 * Verifica si una feature está habilitada
 */
export function isFeatureEnabled(feature: keyof typeof FEATURES.features): boolean {
    return FEATURES.features[feature] ?? false;
}

/**
 * Lista de rutas deshabilitadas (para uso en middleware)
 */
export function getDisabledRoutes(): string[] {
    return Object.entries(FEATURES.routes)
        .filter(([, config]) => !config.enabled || (config.devOnly && !isDev))
        .map(([route]) => route);
}
