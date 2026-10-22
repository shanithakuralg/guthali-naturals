import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        // Check database connection
        await prisma.$runCommandRaw({ ping: 1 });

        return NextResponse.json({
            status: 'ok',
            timestamp: new Date().toISOString(),
            service: 'guthali-naturals',
            version: '1.0.0',
            database: 'connected',
        });
    } catch (error) {
        return NextResponse.json(
            {
                status: 'error',
                timestamp: new Date().toISOString(),
                service: 'guthali-naturals',
                database: 'disconnected',
                error: 'Database connection failed',
            },
            { status: 503 }
        );
    }
}
