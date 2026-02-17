import { siteConfig } from "@/config/site";

/**
 * Información de contacto del sitio
 * 
 * Los valores se leen desde la configuración centralizada en site.ts
 * Para personalizar, edita src/config/site.ts
 */

// Mantener compatibilidad con código existente usando formato anterior
export const CONTACT_INFO = {
    PHONE: siteConfig.contact.phone,
    EMAIL: siteConfig.contact.email,
    LOCATIONS: {
        CABA: {
            LONG_TITLE: siteConfig.contact.locations.CABA.longTitle,
            SHORT_TITLE: siteConfig.contact.locations.CABA.shortTitle,
            ADDRESS: siteConfig.contact.locations.CABA.address,
        },
        CHIVILCOY: {
            LONG_TITLE: siteConfig.contact.locations.CHIVILCOY.longTitle,
            SHORT_TITLE: siteConfig.contact.locations.CHIVILCOY.shortTitle,
            ADDRESS: siteConfig.contact.locations.CHIVILCOY.address,
        },
    },
    NAME: siteConfig.branding.name,
    BRAND: siteConfig.branding.shortName,
} as const; 