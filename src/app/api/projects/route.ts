import { NextRequest, NextResponse } from 'next/server';
import { projectRepository } from '@/lib/repositories';
import {
    createProjectSchema,
    projectQuerySchema,
} from '@/lib/validators';
import { createSuccessResponse, createPaginatedResponse, createErrorResponse } from '@/types/api';
import { IProjectDocument } from '@/models/Project';

function serializeProject(project: IProjectDocument) {
    const category = project.category || 'non-category';

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

// GET /api/projects - Lista todos los proyectos con filtros
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const queryParams = Object.fromEntries(searchParams.entries());

        const validatedQuery = projectQuerySchema.safeParse(queryParams);

        if (!validatedQuery.success) {
            return NextResponse.json(
                createErrorResponse('Parámetros de consulta inválidos'),
                { status: 400 }
            );
        }

        // Por defecto, la API pública solo muestra proyectos activos
        // Si se quiere ver todos, se debe pasar explícitamente isActive=false o isActive=true
        const query = {
            ...validatedQuery.data,
            isActive: validatedQuery.data.isActive ?? true,
        };
        const result = await projectRepository.findAllProjects(query);

        return NextResponse.json(
            createPaginatedResponse(result.data.map(serializeProject), {
                total: result.total,
                limit: result.limit,
                offset: result.offset,
                hasMore: result.hasMore,
            })
        );
    } catch (error) {
        console.error('Error fetching projects:', error);
        return NextResponse.json(
            createErrorResponse('Error interno del servidor'),
            { status: 500 }
        );
    }
}

// POST /api/projects - Crear un nuevo proyecto
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validatedData = createProjectSchema.safeParse(body);

        if (!validatedData.success) {
            return NextResponse.json(
                createErrorResponse(validatedData.error.issues[0]?.message || 'Datos inválidos'),
                { status: 400 }
            );
        }

        const project = await projectRepository.createProject(validatedData.data);

        return NextResponse.json(
            createSuccessResponse(serializeProject(project), 'Proyecto creado exitosamente'),
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating project:', error);

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
