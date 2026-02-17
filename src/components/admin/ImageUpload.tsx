"use client";

import React, { useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type UploadFolder = "services" | "projects" | "general";

interface ImageUploadProps {
    /** Valor actual (URL de la imagen) */
    value: string;
    /** Callback cuando cambia el valor */
    onChange: (url: string) => void;
    /** Carpeta donde se subirá la imagen */
    folder?: UploadFolder;
    /** Texto del label */
    label?: string;
    /** Si el campo es requerido */
    required?: boolean;
    /** Clases CSS adicionales */
    className?: string;
    /** Placeholder para el input de URL */
    placeholder?: string;
    /** Deshabilitado */
    disabled?: boolean;
}

interface UploadResponse {
    success: boolean;
    data?: {
        url: string;
        publicId: string;
        width: number;
        height: number;
        format: string;
    };
    error?: string;
}

export default function ImageUpload({
    value,
    onChange,
    folder = "general",
    label = "Imagen",
    required = false,
    className = "",
    placeholder = "https://...",
    disabled = false,
}: ImageUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);

    const handleFileSelect = useCallback(
        async (file: File) => {
            setError(null);
            setIsUploading(true);

            try {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("folder", folder);

                const response = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                const result: UploadResponse = await response.json();

                if (result.success && result.data) {
                    onChange(result.data.url);
                } else {
                    setError(result.error || "Error al subir la imagen");
                }
            } catch (err) {
                console.error("Error uploading image:", err);
                setError("Error de conexión al subir la imagen");
            } finally {
                setIsUploading(false);
            }
        },
        [folder, onChange]
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFileSelect(files[0]);
        }
    };

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);

            if (disabled || isUploading) return;

            const files = e.dataTransfer.files;
            if (files && files.length > 0) {
                const file = files[0];
                if (file.type.startsWith("image/")) {
                    handleFileSelect(file);
                } else {
                    setError("Solo se permiten archivos de imagen");
                }
            }
        },
        [disabled, isUploading, handleFileSelect]
    );

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
        setError(null);
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleRemoveImage = () => {
        onChange("");
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className={`space-y-3 ${className}`}>
            <label className="text-sm font-medium text-gray-300">
                {label} {required && "*"}
            </label>

            {/* Zona de drop / Preview */}
            <div
                className={`
                    relative border-2 border-dashed rounded-lg transition-colors
                    ${dragActive ? "border-blue-500 bg-blue-500/10" : "border-gray-700 hover:border-gray-600"}
                    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={!disabled && !isUploading ? handleButtonClick : undefined}
            >
                {value ? (
                    // Preview de imagen
                    <div className="relative aspect-video">
                        <img
                            src={value}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg"
                            onError={() => setError("No se pudo cargar la imagen")}
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleButtonClick();
                                }}
                                disabled={disabled || isUploading}
                                className="text-white border-white hover:bg-white/20"
                            >
                                Cambiar
                            </Button>
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveImage();
                                }}
                                disabled={disabled || isUploading}
                                className="text-red-400 border-red-400 hover:bg-red-500/20"
                            >
                                Eliminar
                            </Button>
                        </div>
                    </div>
                ) : (
                    // Estado vacío
                    <div className="py-8 px-4 text-center">
                        {isUploading ? (
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                <p className="text-sm text-gray-400">Subiendo imagen...</p>
                            </div>
                        ) : (
                            <>
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-500"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                >
                                    <path
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <p className="mt-2 text-sm text-gray-400">
                                    <span className="text-blue-500 hover:text-blue-400">
                                        Haz clic para subir
                                    </span>{" "}
                                    o arrastra una imagen aquí
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                    PNG, JPG, WEBP, GIF hasta 5MB
                                </p>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Input oculto para el file picker */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                onChange={handleInputChange}
                disabled={disabled || isUploading}
                className="hidden"
            />

            {/* Input de URL manual */}
            <div className="flex gap-2">
                <Input
                    type="url"
                    value={value}
                    onChange={handleUrlChange}
                    placeholder={placeholder}
                    disabled={disabled || isUploading}
                    required={required}
                    className="bg-gray-800 border-gray-700 text-white flex-1"
                />
            </div>

            {/* Mensaje de error */}
            {error && (
                <p className="text-sm text-red-400 flex items-center gap-1">
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    );
}
