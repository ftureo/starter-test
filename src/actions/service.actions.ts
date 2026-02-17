'use server';

import { revalidatePath } from 'next/cache';
import { serviceRepository } from '@/lib/repositories';
import {
    createServiceSchema,
    updateServiceSchema,
    CreateServiceInput,
    UpdateServiceInput,
} from '@/lib/validators';
import { IServiceDocument } from '@/models/Service';

// ActionResult está definido en project.actions.ts y re-exportado desde index.ts
type ActionResult<T> = 
    | { success: true; data: T }
    | { success: false; error: string };

function serializeService(service: IServiceDocument) {
    // Serializar features a objetos planos
    const features = Array.isArray(service.features)
        ? service.features.map(f => ({ title: f.title, description: f.description }))
        : [];

    // Serializar pricing a objeto plano
    const pricing = service.pricing
        ? { basePrice: service.pricing.basePrice, currency: service.pricing.currency }
        : undefined;

    return {
        id: service._id.toString(),
        title: service.title,
        slug: service.slug,
        slogan: service.slogan,
        description: service.description,
        longDescription: service.longDescription,
        image: service.image,
        gallery: Array.isArray(service.gallery) ? [...service.gallery] : [],
        icon: service.icon,
        features,
        pricing,
        order: service.order,
        isActive: service.isActive,
        createdAt: service.createdAt.toISOString(),
        updatedAt: service.updatedAt.toISOString(),
    };
}

export async function getServices() {
    try {
        const result = await serviceRepository.findAllServices({ limit: 100 });
        return {
            success: true,
            data: {
                ...result,
                data: result.data.map(serializeService),
            },
        };
    } catch (error) {
        console.error('Error fetching services:', error);
        return {
            success: false,
            error: 'Error al obtener los servicios',
        };
    }
}

export async function getServiceById(id: string): Promise<ActionResult<ReturnType<typeof serializeService>>> {
    try {
        const service = await serviceRepository.findServiceById(id);
        
        if (!service) {
            return {
                success: false,
                error: 'Servicio no encontrado',
            };
        }

        return {
            success: true,
            data: serializeService(service),
        };
    } catch (error) {
        console.error('Error fetching service:', error);
        return {
            success: false,
            error: 'Error al obtener el servicio',
        };
    }
}

export async function getServiceBySlug(slug: string): Promise<ActionResult<ReturnType<typeof serializeService>>> {
    try {
        const service = await serviceRepository.findServiceBySlug(slug);
        
        if (!service) {
            return {
                success: false,
                error: 'Servicio no encontrado',
            };
        }

        return {
            success: true,
            data: serializeService(service),
        };
    } catch (error) {
        console.error('Error fetching service:', error);
        return {
            success: false,
            error: 'Error al obtener el servicio',
        };
    }
}

export async function createService(input: CreateServiceInput): Promise<ActionResult<ReturnType<typeof serializeService>>> {
    try {
        const validatedData = createServiceSchema.parse(input);
        const service = await serviceRepository.createService(validatedData);
        
        revalidatePath('/services');
        revalidatePath('/admin/services');
        revalidatePath('/');

        return {
            success: true,
            data: serializeService(service),
        };
    } catch (error) {
        console.error('Error creating service:', error);
        
        // Manejo específico de errores de Zod
        if (error && typeof error === 'object' && 'issues' in error) {
            const zodError = error as { issues: Array<{ path: string[]; message: string }> };
            const firstIssue = zodError.issues[0];
            const fieldName = firstIssue?.path?.join('.') || 'campo';
            return {
                success: false,
                error: `Error en ${fieldName}: ${firstIssue?.message || 'Datos inválidos'}`,
            };
        }

        // Error de MongoDB (duplicado)
        if (error instanceof Error && error.message.includes('duplicate key')) {
            return {
                success: false,
                error: 'Ya existe un servicio con ese slug',
            };
        }

        return {
            success: false,
            error: error instanceof Error ? error.message : 'Error al crear el servicio',
        };
    }
}

export async function updateService(
    id: string,
    input: UpdateServiceInput
): Promise<ActionResult<ReturnType<typeof serializeService>>> {
    try {
        const validatedData = updateServiceSchema.parse(input);
        const service = await serviceRepository.updateService(id, validatedData);

        if (!service) {
            return {
                success: false,
                error: 'Servicio no encontrado',
            };
        }

        revalidatePath('/services');
        revalidatePath(`/services/${service.slug}`);
        revalidatePath('/admin/services');
        revalidatePath('/');

        return {
            success: true,
            data: serializeService(service),
        };
    } catch (error) {
        console.error('Error updating service:', error);

        if (error instanceof Error && error.name === 'ZodError') {
            return {
                success: false,
                error: 'Datos de servicio inválidos',
            };
        }

        return {
            success: false,
            error: 'Error al actualizar el servicio',
        };
    }
}

export async function deleteService(id: string): Promise<ActionResult<{ deleted: boolean }>> {
    try {
        // Server Actions solo hacen soft delete por seguridad
        const result = await serviceRepository.deleteService(id, false);

        if (!result) {
            return {
                success: false,
                error: 'Servicio no encontrado',
            };
        }

        revalidatePath('/services');
        revalidatePath('/admin/services');
        revalidatePath('/');

        return {
            success: true,
            data: { deleted: true },
        };
    } catch (error) {
        console.error('Error deleting service:', error);
        return {
            success: false,
            error: 'Error al eliminar el servicio',
        };
    }
}

export async function restoreService(id: string): Promise<ActionResult<ReturnType<typeof serializeService>>> {
    try {
        const service = await serviceRepository.restoreService(id);

        if (!service) {
            return {
                success: false,
                error: 'Servicio no encontrado',
            };
        }

        revalidatePath('/services');
        revalidatePath('/admin/services');
        revalidatePath('/');

        return {
            success: true,
            data: serializeService(service),
        };
    } catch (error) {
        console.error('Error restoring service:', error);
        return {
            success: false,
            error: 'Error al restaurar el servicio',
        };
    }
}

export async function reorderServices(orderedIds: string[]): Promise<ActionResult<{ updated: number }>> {
    try {
        const result = await serviceRepository.reorderServices(orderedIds);

        revalidatePath('/services');
        revalidatePath('/admin/services');
        revalidatePath('/');

        return {
            success: true,
            data: { updated: result.updated },
        };
    } catch (error) {
        console.error('Error reordering services:', error);
        return {
            success: false,
            error: 'Error al reordenar los servicios',
        };
    }
}
