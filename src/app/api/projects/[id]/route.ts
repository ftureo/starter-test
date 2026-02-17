import { NextRequest, NextResponse } from 'next/server';
import { projectRepository } from '@/lib/repositories';
import { updateProjectSchema } from '@/lib/validators';
import { createSuccessResponse, createErrorResponse } from '@/types/api';
import { IProjectDocument } from '@/models/Project';

interface RouteParams {
    params: Promise<{ id: string }>;
}

function serializeProject(project: IProjectDocument) {
    const category = project.category;

    return {
        id: project._id.toString(),
        title: project.title,
        slug: project.slug,
        slogan: project.slogan,
        description: project.description,
        image: project.image,
        gallery: project.gallery,
        status: project.status,
        category:
            typeof category === 'object' && category !== null && '_id' in category
                ? {
                      id: (category as { _id: { toString(): string } })._id.toString(),
                      title: (category as { title?: string }).title,
                      slug: (category as { slug?: string }).slug,
                  }
                : category?.toString(),
        client: project.client,
        startDate: project.startDate.toISOString(),
        endDate: project.endDate?.toISOString(),
        technologies: project.technologies,
        featured: project.featured,
        metadata: project.metadata,
        isActive: project.isActive,
        createdAt: project.createdAt.toISOString(),
        updatedAt: project.updatedAt.toISOString(),
    };
}

// GET /api/projects/[id] - Obtener un proyecto por ID o slug
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;

        let project = null;
        const isObjectId = /^[a-fA-F0-9]{24}$/.test(id);

        if (isObjectId) {
            project = await projectRepository.findProjectById(id);
        }

        if (!project) {
            project = await projectRepository.findProjectBySlug(id);
        }

        if (!project) {
            return NextResponse.json(
                createErrorResponse('Proyecto no encontrado'),
                { status: 404 }
            );
        }

        // Incrementar vistas automáticamente
        await projectRepository.incrementViews(project._id.toString());

        return NextResponse.json(createSuccessResponse(serializeProject(project)));
    } catch (error) {
        console.error('Error fetching project:', error);
        return NextResponse.json(
            createErrorResponse('Error interno del servidor'),
            { status: 500 }
        );
    }
}

// PUT /api/projects/[id] - Actualizar un proyecto
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const body = await request.json();

        const validatedData = updateProjectSchema.safeParse(body);

        if (!validatedData.success) {
            return NextResponse.json(
                createErrorResponse(validatedData.error.issues[0]?.message || 'Datos inválidos'),
                { status: 400 }
            );
        }

        const project = await projectRepository.updateProject(id, validatedData.data);

        if (!project) {
            return NextResponse.json(
                createErrorResponse('Proyecto no encontrado'),
                { status: 404 }
            );
        }

        return NextResponse.json(
            createSuccessResponse(serializeProject(project), 'Proyecto actualizado exitosamente')
        );
    } catch (error) {
        console.error('Error updating project:', error);

        if (error instanceof Error && error.message.includes('duplicate key')) {
            return NextResponse.json(
                createErrorResponse('Ya existe un proyecto con ese slug'),
                { status: 409 }
            );
        }

        return NextResponse.json(
            createErrorResponse('Error interno del servidor'),
            { status: 500 }
        );
    }
}

// DELETE /api/projects/[id] - Eliminar un proyecto
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const { searchParams } = new URL(request.url);
        const hard = searchParams.get('hard') === 'true';

        const result = await projectRepository.deleteProject(id, hard);

        if (!result) {
            return NextResponse.json(
                createErrorResponse('Proyecto no encontrado'),
                { status: 404 }
            );
        }

        const message = hard
            ? 'Proyecto eliminado permanentemente'
            : 'Proyecto desactivado exitosamente';

        return NextResponse.json(
            createSuccessResponse({ deleted: true, hard }, message)
        );
    } catch (error) {
        console.error('Error deleting project:', error);
        return NextResponse.json(
            createErrorResponse('Error interno del servidor'),
            { status: 500 }
        );
    }
}

// PATCH /api/projects/[id] - Operaciones parciales (restaurar, like, etc)
export async function PATCH(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const body = await request.json();

        // Acción: restaurar proyecto
        if (body.action === 'restore') {
            const project = await projectRepository.restoreProject(id);

            if (!project) {
                return NextResponse.json(
                    createErrorResponse('Proyecto no encontrado'),
                    { status: 404 }
                );
            }

            return NextResponse.json(
                createSuccessResponse(serializeProject(project), 'Proyecto restaurado exitosamente')
            );
        }

        // Acción: dar like
        if (body.action === 'like') {
            const project = await projectRepository.incrementLikes(id);

            if (!project) {
                return NextResponse.json(
                    createErrorResponse('Proyecto no encontrado'),
                    { status: 404 }
                );
            }

            return NextResponse.json(
                createSuccessResponse(
                    { likes: project.metadata.likes },
                    'Like registrado'
                )
            );
        }

        // Update parcial normal
        const validatedData = updateProjectSchema.safeParse(body);

        if (!validatedData.success) {
            return NextResponse.json(
                createErrorResponse(validatedData.error.issues[0]?.message || 'Datos inválidos'),
                { status: 400 }
            );
        }

        const project = await projectRepository.updateProject(id, validatedData.data);

        if (!project) {
            return NextResponse.json(
                createErrorResponse('Proyecto no encontrado'),
                { status: 404 }
            );
        }

        return NextResponse.json(
            createSuccessResponse(serializeProject(project), 'Proyecto actualizado exitosamente')
        );
    } catch (error) {
        console.error('Error patching project:', error);
        return NextResponse.json(
            createErrorResponse('Error interno del servidor'),
            { status: 500 }
        );
    }
}
