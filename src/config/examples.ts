/**
 * Datos de ejemplo para seed/desarrollo
 * 
 * Estos datos se usan como ejemplos o para poblar la base de datos inicial.
 * Puedes personalizarlos o eliminarlos según tus necesidades.
 */

import { Project } from "@/types/project";

export const exampleProjects: Project[] = [
    {
        id: 1,
        title: "Prototipo de Pieza Mecánica",
        description: "Desarrollo de un prototipo funcional para una pieza mecánica de alta precisión utilizando impresión 3D en resina.",
        image: "https://res.cloudinary.com/mern-project-fabi/image/upload/v1750041892/bab-3d-printing-design/destacada-3.jpg",
        status: "completed",
        category: "impresion-3d",
        client: "Industrias Mecánicas XYZ",
        startDate: "2024-01-15",
        endDate: "2024-02-20",
        technologies: ["Resina UV", "SLA", "Post-procesado"],
        link: "#proyecto-1",
    },
    {
        id: 2,
        title: "Diseño de Modelo Arquitectónico",
        description: "Creación de un modelo arquitectónico detallado para un proyecto residencial, incluyendo texturas y acabados realistas.",
        image: "https://res.cloudinary.com/mern-project-fabi/image/upload/v1750041876/bab-3d-printing-design/destacada-2.jpg",
        status: "in-progress",
        category: "diseno-3d",
        client: "Arquitectura Moderna S.A.",
        startDate: "2024-02-01",
        technologies: ["Blender", "ZBrush", "Substance Painter"],
        link: "#proyecto-2",
    },
    {
        id: 3,
        title: "Optimización de Proceso de Impresión",
        description: "Consultoría para optimizar el proceso de impresión 3D en una empresa manufacturera, reduciendo costos y tiempo de producción.",
        image: "https://res.cloudinary.com/mern-project-fabi/image/upload/v1750041868/bab-3d-printing-design/destacada-1.jpg",
        status: "planned",
        category: "consultoria",
        client: "Manufacturas del Norte",
        startDate: "2024-03-01",
        technologies: ["Análisis de Procesos", "Optimización", "Automatización"],
        link: "#proyecto-3",
    },
];

export const projectStatusLabels: Record<Project['status'], string> = {
    'in-progress': 'In Progress',
    'completed': 'Completed',
    'planned': 'Planned',
};

export const projectCategoryLabels: Record<Project['category'], string> = {
    'impresion-3d': 'Impresión 3D',
    'diseno-3d': 'Diseño 3D',
    'consultoria': 'Consultoría',
};
