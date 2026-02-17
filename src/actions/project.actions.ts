'use server';

import { revalidatePath } from 'next/cache';
import { projectRepository, ProjectStats } from '@/lib/repositories';
import {
    createProjectSchema,
    updateProjectSchema,
    CreateProjectFormInput,
    UpdateProjectFormInput,
    ProjectQueryInput,
} from '@/lib/validators';
import { IProjectDocument } from '@/models/Project';

export type ActionResult<T> =
    | { success: true; data: T }
    | { success: false; error: string };

function serializeProject(project: IProjectDocument) {
    const category = project.category;
    
    // Serializar category correctamente
    let serializedCategory: string | { id: string; title?: string; slug?: string } | undefined;
    if (category) {
        if (typeof category === 'object' && '_id' in category) {
            const cat = category as { _id: { toString(): string }; title?: string; slug?: string };
            serializedCategory = {
                id: cat._id.toString(),
                title: cat.title,
                slug: cat.slug,
            };
        } else {
            serializedCategory = category.toString();
        }
    }

    // Serializar metadata a objeto plano
    const metadata = project.metadata 
        ? { views: project.metadata.views ?? 0, likes: project.metadata.likes ?? 0 }
        : { views: 0, likes: 0 };

    return {
        id: project._id.toString(),
        title: project.title,
        slug: project.slug,
        slogan: project.slogan,
        description: project.description,
        image: project.image,
        gallery: Array.isArray(project.gallery) ? [...project.gallery] : [],
        status: project.status,
        category: serializedCategory,
        client: project.client,
        startDate: project.startDate.toISOString(),
        endDate: project.endDate?.toISOString(),
        technologies: Array.isArray(project.technologies) ? [...project.technologies] : [],
        featured: project.featured,
        metadata,
        isActive: project.isActive,
        createdAt: project.createdAt.toISOString(),
        updatedAt: project.updatedAt.toISOString(),
    };
}

export async function getProjects(query: ProjectQueryInput = {}) {
    try {
        const result = await projectRepository.findAllProjects(query);
        return {
            success: true,
            data: {
                ...result,
                data: result.data.map(serializeProject),
            },
        };
    } catch (error) {
        console.error('Error fetching projects:', error);
        return {
            success: false,
            error: 'Error al obtener los proyectos',
        };
    }
}

export async function getProjectById(id: string): Promise<ActionResult<ReturnType<typeof serializeProject>>> {
    try {
        const project = await projectRepository.findProjectById(id);

        if (!project) {
            return {
                success: false,
                error: 'Proyecto no encontrado',
            };
        }

        return {
            success: true,
            data: serializeProject(project),
        };
    } catch (error) {
        console.error('Error fetching project:', error);
        return {
            success: false,
            error: 'Error al obtener el proyecto',
        };
    }
}

export async function getProjectBySlug(slug: string): Promise<ActionResult<ReturnType<typeof serializeProject>>> {
    try {
        const project = await projectRepository.findProjectBySlug(slug);

        if (!project) {
            return {
                success: false,
                error: 'Proyecto no encontrado',
            };
        }

        return {
            success: true,
            data: serializeProject(project),
        };
    } catch (error) {
        console.error('Error fetching project:', error);
        return {
            success: false,
            error: 'Error al obtener el proyecto',
        };
    }
}

export async function getFeaturedProjects(limit = 3) {
    try {
        const projects = await projectRepository.findFeaturedProjects(limit);
        return {
            success: true,
            data: projects.map(serializeProject),
        };
    } catch (error) {
        console.error('Error fetching featured projects:', error);
        return {
            success: false,
            error: 'Error al obtener los proyectos destacados',
        };
    }
}

export async function getProjectsByCategory(categoryId: string) {
    try {
        const projects = await projectRepository.findProjectsByCategory(categoryId);
        return {
            success: true,
            data: projects.map(serializeProject),
        };
    } catch (error) {
        console.error('Error fetching projects by category:', error);
        return {
            success: false,
            error: 'Error al obtener los proyectos por categoría',
        };
    }
}

export async function getProjectsByCategorySlug(categorySlug: string) {
    try {
        const projects = await projectRepository.findProjectsByCategorySlug(categorySlug);
        return {
            success: true,
            data: projects.map(serializeProject),
        };
    } catch (error) {
        console.error('Error fetching projects by category slug:', error);
        return {
            success: false,
            error: 'Error al obtener los proyectos por categoría',
        };
    }
}

export async function createProject(input: CreateProjectFormInput): Promise<ActionResult<ReturnType<typeof serializeProject>>> {
    try {
        const validatedData = createProjectSchema.parse(input);
        const project = await projectRepository.createProject(validatedData);

        revalidatePath('/projects');
        revalidatePath('/admin/projects');
        revalidatePath('/');

        return {
            success: true,
            data: serializeProject(project),
        };
    } catch (error) {
        console.error('Error creating project:', error);

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
                error: 'Ya existe un proyecto con ese slug',
            };
        }

        return {
            success: false,
            error: error instanceof Error ? error.message : 'Error al crear el proyecto',
        };
    }
}

export async function updateProject(
    id: string,
    input: UpdateProjectFormInput
): Promise<ActionResult<ReturnType<typeof serializeProject>>> {
    try {
        // Debug logging para diagnosticar problemas de actualización
        console.log('[updateProject] ID:', id);
        console.log('[updateProject] Input:', JSON.stringify(input, null, 2));
        
        const validatedData = updateProjectSchema.parse(input);
        console.log('[updateProject] Validated data:', JSON.stringify(validatedData, null, 2));
        
        const project = await projectRepository.updateProject(id, validatedData);
        console.log('[updateProject] Result:', project ? 'Project updated successfully' : 'Project not found');

        if (!project) {
            return {
                success: false,
                error: 'Proyecto no encontrado',
            };
        }

        console.log('[updateProject] Updated project isActive:', project.isActive);
        
        revalidatePath('/projects');
        revalidatePath(`/projects/${project.slug}`);
        revalidatePath('/admin/projects');
        revalidatePath('/');

        return {
            success: true,
            data: serializeProject(project),
        };
    } catch (error) {
        console.error('Error updating project:', error);

        if (error instanceof Error && error.name === 'ZodError') {
            return {
                success: false,
                error: 'Datos de proyecto inválidos',
            };
        }

        return {
            success: false,
            error: 'Error al actualizar el proyecto',
        };
    }
}

export async function deleteProject(id: string): Promise<ActionResult<{ deleted: boolean }>> {
    try {
        // Server Actions solo hacen soft delete por seguridad
        const result = await projectRepository.deleteProject(id, false);

        if (!result) {
            return {
                success: false,
                error: 'Proyecto no encontrado',
            };
        }

        revalidatePath('/projects');
        revalidatePath('/admin/projects');
        revalidatePath('/');

        return {
            success: true,
            data: { deleted: true },
        };
    } catch (error) {
        console.error('Error deleting project:', error);
        return {
            success: false,
            error: 'Error al eliminar el proyecto',
        };
    }
}

export async function restoreProject(id: string): Promise<ActionResult<ReturnType<typeof serializeProject>>> {
    try {
        const project = await projectRepository.restoreProject(id);

        if (!project) {
            return {
                success: false,
                error: 'Proyecto no encontrado',
            };
        }

        revalidatePath('/projects');
        revalidatePath('/admin/projects');
        revalidatePath('/');

        return {
            success: true,
            data: serializeProject(project),
        };
    } catch (error) {
        console.error('Error restoring project:', error);
        return {
            success: false,
            error: 'Error al restaurar el proyecto',
        };
    }
}

export async function incrementProjectViews(id: string): Promise<ActionResult<{ views: number }>> {
    try {
        const project = await projectRepository.incrementViews(id);

        if (!project) {
            return {
                success: false,
                error: 'Proyecto no encontrado',
            };
        }

        return {
            success: true,
            data: { views: project.metadata.views },
        };
    } catch (error) {
        console.error('Error incrementing views:', error);
        return {
            success: false,
            error: 'Error al incrementar vistas',
        };
    }
}

export async function incrementProjectLikes(id: string): Promise<ActionResult<{ likes: number }>> {
    try {
        const project = await projectRepository.incrementLikes(id);

        if (!project) {
            return {
                success: false,
                error: 'Proyecto no encontrado',
            };
        }

        revalidatePath(`/projects/${project.slug}`);

        return {
            success: true,
            data: { likes: project.metadata.likes },
        };
    } catch (error) {
        console.error('Error incrementing likes:', error);
        return {
            success: false,
            error: 'Error al dar like',
        };
    }
}

export async function getProjectStats(): Promise<ActionResult<ProjectStats>> {
    try {
        const stats = await projectRepository.getStats();
        return {
            success: true,
            data: stats,
        };
    } catch (error) {
        console.error('Error fetching project stats:', error);
        return {
            success: false,
            error: 'Error al obtener estadísticas',
        };
    }
}
