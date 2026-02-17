/**
 * Cloudinary Adapter
 * 
 * Adaptador exclusivo para la subida de imágenes a Cloudinary.
 * Maneja la configuración, subida y obtención de URLs públicas.
 * 
 * Variables de entorno requeridas:
 * - CLOUDINARY_CLOUD_NAME: Nombre del cloud de Cloudinary
 * - CLOUDINARY_API_KEY: API Key de Cloudinary
 * - CLOUDINARY_API_SECRET: API Secret de Cloudinary
 */

import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

// Configuración de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export type CloudinaryFolder = 'services' | 'projects' | 'general';

export interface UploadOptions {
    /** Carpeta donde se almacenará la imagen */
    folder?: CloudinaryFolder;
    /** Nombre público personalizado (sin extensión) */
    publicId?: string;
    /** Transformaciones a aplicar */
    transformation?: {
        width?: number;
        height?: number;
        crop?: 'fill' | 'fit' | 'scale' | 'thumb';
        quality?: 'auto' | number;
        format?: 'auto' | 'webp' | 'jpg' | 'png';
    };
    /** Tags para organizar las imágenes */
    tags?: string[];
}

export interface UploadResult {
    success: true;
    url: string;
    secureUrl: string;
    publicId: string;
    width: number;
    height: number;
    format: string;
    bytes: number;
}

export interface UploadError {
    success: false;
    error: string;
    code?: string;
}

export type CloudinaryUploadResponse = UploadResult | UploadError;

/**
 * Verifica que las variables de entorno de Cloudinary estén configuradas
 */
function validateConfig(): void {
    const requiredEnvVars = [
        'CLOUDINARY_CLOUD_NAME',
        'CLOUDINARY_API_KEY',
        'CLOUDINARY_API_SECRET',
    ];

    const missingVars = requiredEnvVars.filter(
        (varName) => !process.env[varName]
    );

    if (missingVars.length > 0) {
        throw new Error(
            `Faltan variables de entorno de Cloudinary: ${missingVars.join(', ')}`
        );
    }
}

/**
 * Genera el folder path basado en el tipo de recurso.
 * Base path configurable via CLOUDINARY_FOLDER_BASE (default: chloe-yoga).
 */
function getFolderPath(folder: CloudinaryFolder): string {
    const basePath = process.env.CLOUDINARY_FOLDER_BASE || 'chloe-yoga';
    return `${basePath}/${folder}`;
}

/**
 * Sube una imagen a Cloudinary desde un Buffer o Base64
 * 
 * @param fileData - Buffer o string base64 de la imagen
 * @param options - Opciones de subida
 * @returns Resultado de la subida con la URL pública
 */
export async function uploadImage(
    fileData: Buffer | string,
    options: UploadOptions = {}
): Promise<CloudinaryUploadResponse> {
    try {
        validateConfig();

        const { folder = 'general', publicId, transformation, tags } = options;
        const folderPath = getFolderPath(folder);

        // Convertir Buffer a base64 data URI si es necesario
        const uploadData = Buffer.isBuffer(fileData)
            ? `data:image/png;base64,${fileData.toString('base64')}`
            : fileData;

        const uploadOptions: Record<string, unknown> = {
            folder: folderPath,
            resource_type: 'image',
            overwrite: true,
            invalidate: true,
        };

        if (publicId) {
            uploadOptions.public_id = publicId;
        }

        if (transformation) {
            uploadOptions.transformation = {
                width: transformation.width,
                height: transformation.height,
                crop: transformation.crop || 'fill',
                quality: transformation.quality || 'auto',
                fetch_format: transformation.format || 'auto',
            };
        }

        if (tags && tags.length > 0) {
            uploadOptions.tags = tags;
        }

        const result: UploadApiResponse = await cloudinary.uploader.upload(
            uploadData,
            uploadOptions
        );

        return {
            success: true,
            url: result.url,
            secureUrl: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes,
        };
    } catch (error) {
        console.error('[CloudinaryAdapter] Error al subir imagen:', error);

        const cloudinaryError = error as UploadApiErrorResponse;
        
        return {
            success: false,
            error: cloudinaryError.message || 'Error desconocido al subir imagen',
            code: cloudinaryError.http_code?.toString(),
        };
    }
}

/**
 * Sube una imagen desde un archivo File (para uso en API routes)
 * 
 * @param file - Objeto File del navegador
 * @param options - Opciones de subida
 * @returns Resultado de la subida con la URL pública
 */
export async function uploadImageFromFile(
    file: File,
    options: UploadOptions = {}
): Promise<CloudinaryUploadResponse> {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        // Detectar el tipo MIME y agregar como data URI
        const mimeType = file.type || 'image/png';
        const base64Data = `data:${mimeType};base64,${buffer.toString('base64')}`;
        
        return uploadImage(base64Data, options);
    } catch (error) {
        console.error('[CloudinaryAdapter] Error al procesar archivo:', error);
        return {
            success: false,
            error: 'Error al procesar el archivo de imagen',
        };
    }
}

/**
 * Elimina una imagen de Cloudinary por su public_id
 * 
 * @param publicId - ID público de la imagen a eliminar
 * @returns true si se eliminó correctamente
 */
export async function deleteImage(publicId: string): Promise<boolean> {
    try {
        validateConfig();

        const result = await cloudinary.uploader.destroy(publicId);
        return result.result === 'ok';
    } catch (error) {
        console.error('[CloudinaryAdapter] Error al eliminar imagen:', error);
        return false;
    }
}

/**
 * Genera una URL optimizada para una imagen existente
 * 
 * @param publicId - ID público de la imagen
 * @param transformation - Transformaciones a aplicar
 * @returns URL optimizada
 */
export function getOptimizedUrl(
    publicId: string,
    transformation?: UploadOptions['transformation']
): string {
    const options: Record<string, unknown> = {
        secure: true,
    };

    if (transformation) {
        options.transformation = {
            width: transformation.width,
            height: transformation.height,
            crop: transformation.crop || 'fill',
            quality: transformation.quality || 'auto',
            fetch_format: transformation.format || 'auto',
        };
    }

    return cloudinary.url(publicId, options);
}

/**
 * Extrae el public_id de una URL de Cloudinary
 * 
 * @param url - URL completa de Cloudinary
 * @returns public_id o null si no es una URL válida
 */
export function extractPublicId(url: string): string | null {
    try {
        // Ejemplo: https://res.cloudinary.com/cloud-name/image/upload/v1234567890/folder/image.jpg
        const regex = /\/upload\/(?:v\d+\/)?(.+)\.\w+$/;
        const match = url.match(regex);
        return match ? match[1] : null;
    } catch {
        return null;
    }
}

export default {
    uploadImage,
    uploadImageFromFile,
    deleteImage,
    getOptimizedUrl,
    extractPublicId,
};
