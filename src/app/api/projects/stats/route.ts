import { NextResponse } from 'next/server';
import { projectRepository } from '@/lib/repositories';
import { createSuccessResponse, createErrorResponse } from '@/types/api';

// GET /api/projects/stats - Obtener estadísticas de proyectos
export async function GET() {
    try {
        const stats = await projectRepository.getStats();

        return NextResponse.json(createSuccessResponse(stats));
    } catch (error) {
        console.error('Error fetching project stats:', error);
        return NextResponse.json(
            createErrorResponse('Error interno del servidor'),
            { status: 500 }
        );
    }
}
