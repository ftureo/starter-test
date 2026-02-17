import { z } from 'zod';

export const projectStatusEnum = z.enum(['in-progress', 'completed', 'planned']);

export const projectMetadataSchema = z.object({
    views: z.number().int().min(0).default(0),
    likes: z.number().int().min(0).default(0),
});

export const createProjectSchema = z.object({
    title: z
        .string()
        .min(1, 'El título es requerido')
        .max(150, 'El título no puede exceder 150 caracteres'),
    slug: z
        .string()
        .min(1)
        .max(150)
        .regex(/^[a-z0-9-]+$/, 'El slug solo puede contener letras minúsculas, números y guiones')
        .optional(),
    slogan: z.string().max(150, 'El slogan no puede exceder 150 caracteres').optional(),
    description: z
        .string()
        .min(1, 'La descripción es requerida')
        .max(1000, 'La descripción no puede exceder 1000 caracteres'),
    image: z.string().url('La imagen debe ser una URL válida'),
    gallery: z.array(z.string().url()).default([]),
    status: projectStatusEnum.default('planned'),
    category: z.string().min(1, 'La categoría es requerida'),
    client: z.string().max(100).optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    technologies: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    metadata: projectMetadataSchema.optional(),
    isActive: z.boolean().default(true),
});

export const updateProjectSchema = createProjectSchema.partial();

export const projectQuerySchema = z.object({
    status: projectStatusEnum.optional(),
    category: z.string().optional(),
    featured: z
        .string()
        .transform((val) => val === 'true')
        .optional(),
    isActive: z
        .string()
        .transform((val) => val === 'true')
        .optional(),
    limit: z
        .string()
        .transform((val) => parseInt(val, 10))
        .pipe(z.number().int().min(1).max(100))
        .optional(),
    offset: z
        .string()
        .transform((val) => parseInt(val, 10))
        .pipe(z.number().int().min(0))
        .optional(),
    orderBy: z.enum(['createdAt', 'startDate', 'title', 'status']).optional(),
    orderDir: z.enum(['asc', 'desc']).optional(),
    search: z.string().optional(),
});

// Tipo de salida después de validación (con Date)
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type ProjectQueryInput = z.infer<typeof projectQuerySchema>;

// Tipo de entrada antes de validación (acepta string para fechas que serán convertidas por z.coerce)
export type CreateProjectFormInput = Omit<CreateProjectInput, 'startDate' | 'endDate'> & {
    startDate: string | Date;
    endDate?: string | Date;
};
export type UpdateProjectFormInput = Partial<CreateProjectFormInput>;
