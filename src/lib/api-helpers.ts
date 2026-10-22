// API Helper Functions
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { handleApiError, UnauthorizedError } from './errors';

export async function requireAuth() {
    const session = await getServerSession(authOptions);
    if (!session) {
        throw new UnauthorizedError();
    }
    return session;
}

export function apiResponse(data: any, status: number = 200) {
    return NextResponse.json(data, { status });
}

export function apiError(error: unknown) {
    const { error: message, statusCode } = handleApiError(error);
    return NextResponse.json({ error: message }, { status: statusCode });
}

export async function withErrorHandling(
    handler: (req: NextRequest) => Promise<NextResponse>
) {
    return async (req: NextRequest) => {
        try {
            return await handler(req);
        } catch (error) {
            return apiError(error);
        }
    };
}

export function getPaginationParams(searchParams: URLSearchParams) {
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    return { page, limit, skip };
}

export function paginatedResponse(data: any[], total: number, page: number, limit: number) {
    return {
        data,
        pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit),
            hasMore: page * limit < total,
        },
    };
}
