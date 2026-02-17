import { NextRequest, NextResponse } from 'next/server';
import { serviceRepository } from '@/lib/repositories';
import { updateServiceSchema } from '@/lib/validators';
import { createSuccessResponse, createErrorResponse } from '@/types/api';

interface RouteParams {
    params: Promise<{ id: string }>;
}

function serializeService(service: {
    _id: { toString(): string };
    title: string;
    slug: string;
    slogan?: string;
    description: string;
    longDescription?: string;
    image: string;
    gallery?: string[];
    icon?: string;
    features: Array<{ title: string; description: string }>;
    pricing?: { basePrice: number; currency: string };
    order: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}) {
    return {
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
}

// GET /api/services/[id] - Obtener un servicio por ID o slug
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;

        // Intentar buscar por ID primero, si falla, buscar por slug
        let service = null;

        // Verificar si es un ObjectId válido (24 caracteres hexadecimales)
        const isObjectId = /^[a-fA-F0-9]{24}$/.test(id);

        if (isObjectId) {
            service = await serviceRepository.findServiceById(id);
        }

        // Si no se encontró por ID, buscar por slug
        if (!service) {
            service = await serviceRepository.findServiceBySlug(id);
        }

        if (!service) {
            return NextResponse.json(
                createErrorResponse('Servicio no encontrado'),
                { status: 404 }
            );
        }

        return NextResponse.json(createSuccessResponse(serializeService(service)));
    } catch (error) {
        console.error('Error fetching service:', error);
        return NextResponse.json(
            createErrorResponse('Error interno del servidor'),
            { status: 500 }
        );
    }
}

// PUT /api/services/[id] - Actualizar un servicio
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const body = await request.json();

        const validatedData = updateServiceSchema.safeParse(body);

        if (!validatedData.success) {
            return NextResponse.json(
                createErrorResponse(validatedData.error.issues[0]?.message || 'Datos inválidos'),
                { status: 400 }
            );
        }

        const service = await serviceRepository.updateService(id, validatedData.data);

        if (!service) {
            return NextResponse.json(
                createErrorResponse('Servicio no encontrado'),
                { status: 404 }
            );
        }

        return NextResponse.json(
            createSuccessResponse(serializeService(service), 'Servicio actualizado exitosamente')
        );
    } catch (error) {
        console.error('Error updating service:', error);

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

// DELETE /api/services/[id] - Eliminar un servicio
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const { searchParams } = new URL(request.url);
        const hard = searchParams.get('hard') === 'true';

        const result = await serviceRepository.deleteService(id, hard);

        if (!result) {
            return NextResponse.json(
                createErrorResponse('Servicio no encontrado'),
                { status: 404 }
            );
        }

        const message = hard
            ? 'Servicio eliminado permanentemente'
            : 'Servicio desactivado exitosamente';

        return NextResponse.json(
            createSuccessResponse({ deleted: true, hard }, message)
        );
    } catch (error) {
        console.error('Error deleting service:', error);
        return NextResponse.json(
            createErrorResponse('Error interno del servidor'),
            { status: 500 }
        );
    }
}

// PATCH /api/services/[id] - Restaurar un servicio
export async function PATCH(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const body = await request.json();

        // Si el body contiene action: 'restore', restaurar el servicio
        if (body.action === 'restore') {
            const service = await serviceRepository.restoreService(id);

            if (!service) {
                return NextResponse.json(
                    createErrorResponse('Servicio no encontrado'),
                    { status: 404 }
                );
            }

            return NextResponse.json(
                createSuccessResponse(serializeService(service), 'Servicio restaurado exitosamente')
            );
        }

        // Si no es una acción de restauración, hacer update parcial
        const validatedData = updateServiceSchema.safeParse(body);

        if (!validatedData.success) {
            return NextResponse.json(
                createErrorResponse(validatedData.error.issues[0]?.message || 'Datos inválidos'),
                { status: 400 }
            );
        }

        const service = await serviceRepository.updateService(id, validatedData.data);

        if (!service) {
            return NextResponse.json(
                createErrorResponse('Servicio no encontrado'),
                { status: 404 }
            );
        }

        return NextResponse.json(
            createSuccessResponse(serializeService(service), 'Servicio actualizado exitosamente')
        );
    } catch (error) {
        console.error('Error patching service:', error);
        return NextResponse.json(
            createErrorResponse('Error interno del servidor'),
            { status: 500 }
        );
    }
}
