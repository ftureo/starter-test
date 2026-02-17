export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginatedApiResponse<T> extends ApiResponse<T[]> {
    pagination?: {
        total: number;
        limit: number;
        offset: number;
        hasMore: boolean;
    };
}

export function createSuccessResponse<T>(data: T, message?: string): ApiResponse<T> {
    return {
        success: true,
        data,
        message,
    };
}

export function createPaginatedResponse<T>(
    data: T[],
    pagination: { total: number; limit: number; offset: number; hasMore: boolean }
): PaginatedApiResponse<T> {
    return {
        success: true,
        data,
        pagination,
    };
}

export function createErrorResponse(error: string): ApiResponse<never> {
    return {
        success: false,
        error,
    };
}
