"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageSliderProps {
    images: string[];
    alt: string;
}

const ImageSlider = ({ images, alt }: ImageSliderProps) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [tappedIndex, setTappedIndex] = useState<number | null>(null);

    const handleSelect = useCallback((index: number) => {
        // Micro-animación: marcar el thumbnail como "tapped"
        setTappedIndex(index);
        setSelectedIndex(index);
        // Limpiar la animación después de completarse
        setTimeout(() => setTappedIndex(null), 400);
    }, []);

    if (!images || images.length === 0) {
        return null;
    }

    return (
        <div className="space-y-4">
            {/* Imagen principal con transición de fade */}
            <div className="relative aspect-4/3 w-4/5 rounded-xl overflow-hidden bg-muted border border-border">
                {images.map((image, index) => (
                    <Image
                        key={image}
                        src={image}
                        alt={`${alt} - Imagen ${index + 1}`}
                        fill
                        className={cn(
                            "object-cover transition-opacity duration-700 ease-in-out",
                            selectedIndex === index
                                ? "opacity-100 z-10"
                                : "opacity-0 z-0"
                        )}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index === 0}
                    />
                ))}
            </div>

            {/* Thumbnails con micro-animación */}
            {images.length > 1 && (
                <div className="flex justify-center gap-3">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => handleSelect(index)}
                            className={cn(
                                "relative w-16 h-16 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-300",
                                selectedIndex === index
                                    ? "border-primary ring-2 ring-primary/30 scale-105 shadow-lg shadow-primary/20"
                                    : "border-border hover:border-primary/50 opacity-60 hover:opacity-100",
                                // Micro-animación: pulse al hacer click
                                tappedIndex === index && "animate-thumbnail-tap"
                            )}
                            aria-label={`Ver imagen ${index + 1}`}
                        >
                            <Image
                                src={image}
                                alt={`${alt} - Miniatura ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="80px"
                            />
                            {/* Overlay de selección animado */}
                            <div
                                className={cn(
                                    "absolute inset-0 transition-all duration-500",
                                    selectedIndex === index
                                        ? "bg-primary/0 ring-inset ring-1 ring-primary/50"
                                        : "bg-black/10 hover:bg-black/0"
                                )}
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Estilos para la micro-animación */}
            <style jsx>{`
                @keyframes thumbnail-tap {
                    0% { transform: scale(1.05); }
                    30% { transform: scale(0.9); }
                    60% { transform: scale(1.1); }
                    100% { transform: scale(1.05); }
                }
                :global(.animate-thumbnail-tap) {
                    animation: thumbnail-tap 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }
            `}</style>
        </div>
    );
};

export default ImageSlider;
