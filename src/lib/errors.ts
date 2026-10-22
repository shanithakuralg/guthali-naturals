// Custom Error Handling

export class AppError extends Error {
    constructor(
        public message: string,
        public statusCode: number = 500,
        public isOperational: boolean = true
    ) {
        super(message);
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

export class ValidationError extends AppError {
    constructor(message: string) {
        super(message, 400);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string = 'Unauthorized') {
        super(message, 401);
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string = 'Forbidden') {
        super(message, 403);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string = 'Resource not found') {
        super(message, 404);
    }
}

export function handleApiError(error: unknown) {
    console.error('API Error:', error);

    if (error instanceof AppError) {
        return {
            error: error.message,
            statusCode: error.statusCode,
        };
    }

    // Prisma errors
    if (error && typeof error === 'object' && 'code' in error) {
        const prismaError = error as { code: string; meta?: any };

        switch (prismaError.code) {
            case 'P2002':
                return {
                    error: 'A record with this value already exists',
                    statusCode: 409,
                };
            case 'P2025':
                return {
                    error: 'Record not found',
                    statusCode: 404,
                };
            case 'P2003':
                return {
                    error: 'Invalid reference',
                    statusCode: 400,
                };
        }
    }

    return {
        error: process.env.NODE_ENV === 'production'
            ? 'Internal server error'
            : error instanceof Error ? error.message : 'Unknown error',
        statusCode: 500,
    };
}
