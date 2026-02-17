import { NextRequest, NextResponse } from 'next/server';
import { serviceRepository } from '@/lib/repositories';
import {
    createServiceSchema,
    serviceQuerySchema,
} from '@/lib/validators';
import { createSuccessResponse, createPaginatedResponse, createErrorResponse } from '@/types/api';

// GET /api/services - Lista todos los servicios con filtros
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const queryParams = Object.fromEntries(searchParams.entries());

        const validatedQuery = serviceQuerySchema.safeParse(queryParams);

        if (!validatedQuery.success) {
            return NextResponse.json(
                createErrorResponse('Parámetros de consulta inválidos'),
                { status: 400 }
            );
        }

        const result = await serviceRepository.findAllServices(validatedQuery.data);

        const serializedData = result.data.map((service) => ({
            id: service._id.toString(),
            title: service.title,
            slug: service.slug,
            slogan: service.slogan,
            description: service.description,
            longDescription: service.longDescription,
            image: service.image,
            gallery: service.gallery || [],
            icon: service.icon,
            features: service.features,
            pricing: service.pricing,
            order: service.order,
            isActive: service.isActive,
            createdAt: service.createdAt.toISOString(),
            updatedAt: service.updatedAt.toISOString(),
        }));

        return NextResponse.json(
            createPaginatedResponse(serializedData, {
                total: result.total,
                limit: result.limit,
                offset: result.offset,
                hasMore: result.hasMore,
            })
        );
    } catch (error) {
        console.error('Error fetching services:', error);
        return NextResponse.json(
            createErrorResponse('Error interno del servidor'),
            { status: 500 }
        );
    }
}

// POST /api/services - Crear un nuevo servicio
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validatedData = createServiceSchema.safeParse(body);

        if (!validatedData.success) {
            return NextResponse.json(
                createErrorResponse(validatedData.error.issues[0]?.message || 'Datos inválidos'),
                { status: 400 }
            );
        }

        const service = await serviceRepository.createService(validatedData.data);

        const serializedService = {
            id: service._id.toString(),
            title: service.title,
            slug: service.slug,
            slogan: service.slogan,
            description: service.description,
            longDescription: service.longDescription,
            image: service.image,
            gallery: service.gallery || [],
            icon: service.icon,
            features: service.features,
            pricing: service.pricing,
            order: service.order,
            isActive: service.isActive,
            createdAt: service.createdAt.toISOString(),
            updatedAt: service.updatedAt.toISOString(),
        };

        return NextResponse.json(
            createSuccessResponse(serializedService, 'Servicio creado exitosamente'),
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating service:', error);

        if (error instanceof Error && error.message.includes('duplicate key')) {
            return NextResponse.json(
                createErrorResponse('Ya existe un servicio con ese slug'),
                { status: 409 }
            );
        }

        return NextResponse.json(
            createErrorResponse('Error interno del servidor'),
            { status: 500 }
        );
    }
}
