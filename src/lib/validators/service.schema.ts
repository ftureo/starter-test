import { z } from 'zod';

export const serviceFeatureSchema = z.object({
    title: z.string().min(1, 'El título es requerido').max(100),
    description: z.string().min(1, 'La descripción es requerida').max(500),
});

export const servicePricingSchema = z.object({
    basePrice: z.number().min(0, 'El precio debe ser positivo'),
    currency: z.string().default('ARS'),
});

export const createServiceSchema = z.object({
    title: z
        .string()
        .min(1, 'El título es requerido')
        .max(100, 'El título no puede exceder 100 caracteres'),
    slug: z
        .string()
        .min(1)
        .max(100)
        .regex(/^[a-z0-9-]+$/, 'El slug solo puede contener letras minúsculas, números y guiones')
        .optional(),
    slogan: z.string().max(150, 'El slogan no puede exceder 150 caracteres').optional(),
    description: z
        .string()
        .min(1, 'La descripción es requerida')
        .max(500, 'La descripción no puede exceder 500 caracteres'),
    longDescription: z.string().max(2000).optional(),
    image: z.string().url('La imagen debe ser una URL válida'),
    gallery: z.array(z.string().url()).default([]),
    icon: z.string().optional(),
    features: z.array(serviceFeatureSchema).default([]),
    pricing: servicePricingSchema.optional(),
    order: z.number().int().min(0).default(0),
    isActive: z.boolean().default(true),
});

export const updateServiceSchema = createServiceSchema.partial();

export const serviceQuerySchema = z.object({
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
    orderBy: z.enum(['order', 'createdAt', 'title']).optional(),
    orderDir: z.enum(['asc', 'desc']).optional(),
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
export type ServiceQueryInput = z.infer<typeof serviceQuerySchema>;
