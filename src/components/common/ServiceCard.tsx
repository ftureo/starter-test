"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { renderLucideIcon } from "@/lib/utils/lucide-icons";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
    title: string;
    slogan?: string;
    description: string;
    link: string;
    bgImage?: string;
    icon?: string;
    accentColor?: string;
}

// Colores de acento únicos para cada servicio
const ACCENT_COLORS = [
    { gradient: "from-terracotta-500 to-terracotta-800", glow: "terracotta-500", text: "terracotta-500" },
    { gradient: "from-wine-500 to-wine-800", glow: "wine-500", text: "wine-500" },
    { gradient: "from-sand-500 to-sand-800", glow: "sand-500", text: "sand-800" },
    { gradient: "from-terracotta-500 to-wine-500", glow: "wine-500", text: "wine-500" },
];

// Imágenes de fallback mejoradas
const FALLBACK_IMAGES = [
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80", // 3D printing
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", // Design
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", // Consulting
];

const ServiceCard = ({ 
    title, 
    slogan,
    link, 
    bgImage, 
    icon,
    accentColor 
}: ServiceCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    
    // Determinar color de acento basado en el título o prop
    const getAccentIndex = () => {
        if (accentColor) return 0;
        const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return hash % ACCENT_COLORS.length;
    };
    
    const accent = ACCENT_COLORS[getAccentIndex()];
    console.log(accent);
    const fallbackImage = FALLBACK_IMAGES[getAccentIndex() % FALLBACK_IMAGES.length];

    return (
        <Link 
            href={link}
            className="block group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative h-[420px] rounded-2xl overflow-hidden bg-card border border-border transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-xl">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src={bgImage || fallbackImage}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={cn(
                            "object-cover transition-all duration-700",
                            isHovered ? "scale-110 blur-sm" : "scale-100"
                        )}
                        priority={false}
                    />
                    {/* Gradient overlays */}
                    <div className={cn(
                        "absolute inset-0 transition-opacity duration-500",
                        isHovered ? "opacity-90" : "opacity-70"
                    )}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                        <div className={cn(
                            "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500",
                            `${accent.gradient}`,
                            isHovered && "opacity-20"
                        )} />
                    </div>
                </div>

                {/* Icon Badge */}
                {icon && (
                    <div className={cn(
                        "absolute top-5 right-5 p-3 rounded-xl backdrop-blur-md transition-all duration-500",
                        isHovered 
                            ? `bg-gradient-to-br ${accent.gradient} shadow-lg` 
                            : "bg-white/10 border border-white/10"
                    )}>
                        {renderLucideIcon(icon, cn(
                            "h-6 w-6 transition-colors duration-300",
                            isHovered ? "text-white" : "text-white/80"
                        ))}
                    </div>
                )}

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                    {/* Number/Index decorativo */}
                    <div className={cn(
                        "absolute top-5 left-5 text-7xl font-black opacity-10 transition-all duration-500",
                        isHovered && `text-${accent.text} opacity-20`
                    )}>
                        {title.charAt(0)}
                    </div>

                    {/* Main content */}
                    <div className="space-y-4">
                        {/* Title with animated underline */}
                        <div className="relative">
                            <h3 className={cn(
                                "text-2xl md:text-3xl font-bold text-white transition-colors duration-300",
                                isHovered && `text-${accent.text}`
                            )}>
                                {title}
                            </h3>
                            <div className={cn(
                                "h-1 rounded-full mt-2 transition-all duration-500 origin-left",
                                `bg-gradient-to-r ${accent.gradient}`,
                                isHovered ? "w-full opacity-100" : "w-0 opacity-0"
                            )} />
                        </div>

                        {/* Slogan */}
                        {/* Think into apply this rule: isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4" */}
                        {slogan && (
                            <p className={cn(
                                "text-md font-medium transition-all duration-700 ease-in-out",
                                "text-white",
                            )}>
                                {slogan}
                            </p>
                        )}

                        {/* CTA Button */}
                        <div className={cn(
                            "flex items-center gap-2 pt-2 transition-all duration-500",
                            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        )}>
                            <span className={cn(
                                "text-sm font-semibold",
                                `text-${accent.text}`
                            )}>
                                Explore
                            </span>
                            <div className={cn(
                                "p-1.5 rounded-full transition-transform duration-300",
                                `bg-gradient-to-br ${accent.gradient}`,
                                isHovered && "translate-x-1 -translate-y-1"
                            )}>
                                <ArrowUpRight className="h-4 w-4 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom glow effect on hover */}
                <div className={cn(
                    "absolute bottom-0 left-0 right-0 h-32 transition-opacity duration-500",
                    `bg-gradient-to-t from-${accent.glow}/20 to-transparent`,
                    isHovered ? "opacity-100" : "opacity-0"
                )} />
            </div>
        </Link>
    );
};

export default ServiceCard;
