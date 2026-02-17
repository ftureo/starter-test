// Tipos base compartidos entre frontend y backend
export type ProjectStatus = 'in-progress' | 'completed' | 'planned';
export type ProjectCategory = 'impresion-3d' | 'diseno-3d' | 'consultoria';

// Tipo legacy para compatibilidad con datos estáticos
export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    status: ProjectStatus;
    category: ProjectCategory;
    client?: string;
    startDate: string;
    endDate?: string;
    technologies: string[];
    link?: string;
}

// Tipo para proyectos de la API/DB
export interface ProjectDTO {
    id: string;
    title: string;
    slug: string;
    slogan?: string;
    description: string;
    image: string;
    gallery: string[];
    status: ProjectStatus;
    category: {
        id: string;
        title?: string;
        slug?: string;
    } | string;
    client?: string;
    startDate: string;
    endDate?: string;
    technologies: string[];
    featured: boolean;
    metadata: {
        views: number;
        likes: number;
    };
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

// Tipo para servicios de la API/DB
export interface ServiceDTO {
    id: string;
    title: string;
    slug: string;
    slogan?: string;
    description: string;
    longDescription?: string;
    image: string;
    gallery: string[];
    icon?: string;
    features: Array<{
        title: string;
        description: string;
    }>;
    pricing?: {
        basePrice: number;
        currency: string;
    };
    order: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

// Status labels (English; can be driven by i18n/config later)
export const projectStatusLabels: Record<ProjectStatus, string> = {
    'in-progress': 'In Progress',
    'completed': 'Completed',
    'planned': 'Planned'
};

// Mapeo de categorías a labels en español
export const projectCategoryLabels: Record<ProjectCategory, string> = {
    'impresion-3d': 'Impresión 3D',
    'diseno-3d': 'Diseño 3D',
    'consultoria': 'Consultoría'
};
