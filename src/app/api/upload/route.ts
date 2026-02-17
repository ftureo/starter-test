/**
 * API Route: Image Upload
 * 
 * Endpoint para subir imágenes a Cloudinary.
 * POST /api/upload
 * 
 * Body: FormData con:
 * - file: Archivo de imagen
 * - folder: 'services' | 'projects' | 'general' (opcional)
 * - tags: string[] serializado como JSON (opcional)
 */

import { NextRequest, NextResponse } from 'next/server';
import { uploadImageFromFile, CloudinaryFolder } from '@/lib/adapters';

// Tipos de archivo permitidos
const ALLOWED_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
];

// Tamaño máximo: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;
        const folder = (formData.get('folder') as CloudinaryFolder) || 'general';
        const tagsRaw = formData.get('tags') as string | null;

        // Validar que se envió un archivo
        if (!file) {
            return NextResponse.json(
                { success: false, error: 'No se proporcionó ningún archivo' },
                { status: 400 }
            );
        }

        // Validar tipo de archivo
        if (!ALLOWED_TYPES.includes(file.type)) {
            return NextResponse.json(
                {
                    success: false,
                    error: `Tipo de archivo no permitido. Tipos válidos: ${ALLOWED_TYPES.join(', ')}`,
                },
                { status: 400 }
            );
        }

        // Validar tamaño
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                {
                    success: false,
                    error: `El archivo excede el tamaño máximo permitido (${MAX_FILE_SIZE / 1024 / 1024}MB)`,
                },
                { status: 400 }
            );
        }

        // Parsear tags si se proporcionaron
        let tags: string[] | undefined;
        if (tagsRaw) {
            try {
                tags = JSON.parse(tagsRaw);
            } catch {
                // Ignorar si no se puede parsear
            }
        }

        // Subir a Cloudinary
        const result = await uploadImageFromFile(file, {
            folder,
            tags,
            transformation: {
                quality: 'auto',
                format: 'auto',
            },
        });

        if (!result.success) {
            return NextResponse.json(
                { success: false, error: result.error },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: {
                url: result.secureUrl,
                publicId: result.publicId,
                width: result.width,
                height: result.height,
                format: result.format,
            },
        });
    } catch (error) {
        console.error('[API Upload] Error:', error);
        return NextResponse.json(
            { success: false, error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}

// Configurar el límite de tamaño del body
export const config = {
    api: {
        bodyParser: false,
    },
};
