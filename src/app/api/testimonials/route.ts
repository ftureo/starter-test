import { NextRequest, NextResponse } from 'next/server';
import { testimonialRepository } from '@/lib/repositories';
import { testimonialQuerySchema } from '@/lib/validators';
import { createPaginatedResponse, createErrorResponse } from '@/types/api';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const queryParams = Object.fromEntries(searchParams.entries());

        const validatedQuery = testimonialQuerySchema.safeParse(queryParams);

        if (!validatedQuery.success) {
            return NextResponse.json(
                createErrorResponse('Invalid query parameters'),
                { status: 400 }
            );
        }

        const result = await testimonialRepository.findAllTestimonials(validatedQuery.data);

        const serializedData = result.data.map((t) => ({
            id: t._id.toString(),
            name: t.name,
            role: t.role,
            description: t.description,
            image: t.image,
            order: t.order,
            isActive: t.isActive,
            createdAt: t.createdAt.toISOString(),
            updatedAt: t.updatedAt.toISOString(),
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
        console.error('Error fetching testimonials:', error);
        return NextResponse.json(
            createErrorResponse('Internal server error'),
            { status: 500 }
        );
    }
}
