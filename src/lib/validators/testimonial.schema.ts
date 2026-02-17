import { z } from 'zod';

export const testimonialQuerySchema = z.object({
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
    orderBy: z.enum(['order', 'createdAt', 'name']).optional(),
    orderDir: z.enum(['asc', 'desc']).optional(),
});

export type TestimonialQueryInput = z.infer<typeof testimonialQuerySchema>;
