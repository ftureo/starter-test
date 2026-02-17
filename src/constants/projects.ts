/**
 * Constantes de proyectos
 * 
 * Los datos de ejemplo se han movido a src/config/examples.ts
 * Los labels se mantienen aquí para compatibilidad
 */

import { Project } from "@/types/project";
import { exampleProjects, projectStatusLabels as exampleProjectStatusLabels, projectCategoryLabels as exampleProjectCategoryLabels } from "@/config/examples";

/**
 * Proyectos de ejemplo (para desarrollo/seed)
 * 
 * @deprecated Usa exampleProjects de @/config/examples directamente
 */
export const projects: Project[] = exampleProjects;

/**
 * Labels de estado de proyectos
 */
export const projectStatusLabels: Record<Project['status'], string> = exampleProjectStatusLabels;

/**
 * Labels de categorías de proyectos
 */
export const projectCategoryLabels: Record<Project['category'], string> = exampleProjectCategoryLabels; 