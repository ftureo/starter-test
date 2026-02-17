import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';

export async function GET() {
    try {
        await connectDB();
        
        return NextResponse.json({
            success: true,
            data: {
                status: 'healthy',
                timestamp: new Date().toISOString(),
                services: {
                    mongodb: 'connected',
                },
            },
        });
    } catch (error) {
        console.error('Health check failed:', error);
        
        return NextResponse.json(
            {
                success: false,
                data: {
                    status: 'unhealthy',
                    timestamp: new Date().toISOString(),
                    services: {
                        mongodb: 'disconnected',
                    },
                },
                error: 'Database connection failed',
            },
            { status: 503 }
        );
    }
}
