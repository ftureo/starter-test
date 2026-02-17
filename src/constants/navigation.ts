import { siteConfig, type NavItem } from "@/config/site";

/**
 * Items de navegación del sitio
 * 
 * Los valores se leen desde la configuración centralizada en site.ts
 * Para personalizar, edita src/config/site.ts
 */
export const navItems: NavItem[] = [...siteConfig.navigation]; 