/**
 * Configuración de tema y estilos
 * 
 * Personaliza los colores, fuentes y estilos visuales del sitio.
 * Los colores definidos aquí se usarán en tailwind.config.ts
 */

export interface ThemeColors {
    // Colores de marca personalizados
    brand?: {
        [key: string]: {
            200?: string;
            500?: string;
            800?: string;
        };
    };
}

export interface ThemeConfig {
    colors: ThemeColors;
    font: {
        family: string;
        variable: string;
    };
}

// Paleta clara y elegante inspirada en #7E2B21, #7e5921, #7e212e (versiones más claras)
export const themeConfig: ThemeConfig = {
    colors: {
        brand: {
            terracotta: {
                200: '#E8D5D0',
                500: '#B07D72',
                800: '#7E2B21',
            },
            sand: {
                200: '#E8DFD0',
                500: '#B8A068',
                800: '#7e5921',
            },
            wine: {
                200: '#E8D2D4',
                500: '#B06B70',
                800: '#7e212e',
            },
        },
    },
    font: {
        family: 'Afacad_Flux',
        variable: '--font-afacad-flux',
    },
};

/**
 * Obtiene los colores de marca en formato para Tailwind
 */
export function getBrandColorsForTailwind(): Record<string, Record<string, string>> {
    if (!themeConfig.colors.brand) {
        return {};
    }

    const tailwindColors: Record<string, Record<string, string>> = {};
    
    Object.entries(themeConfig.colors.brand).forEach(([name, shades]) => {
        tailwindColors[name] = shades;
    });

    return tailwindColors;
}
