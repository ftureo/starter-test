"use client";

import React from "react";
import {
    Printer,
    Box,
    MessageSquare,
    Wrench,
    Settings,
    Package,
    Layers,
    Cpu,
    Cog,
    PenTool,
    Lightbulb,
    Rocket,
    Target,
    Zap,
    Star,
    Heart,
    Shield,
    Award,
    Briefcase,
    Users,
    type LucideIcon,
} from "lucide-react";

// Mapa de iconos disponibles para servicios
export const LUCIDE_ICONS: Record<string, LucideIcon> = {
    Printer,
    Box,
    Cube: Box, // Alias para Cube (Box es el equivalente en Lucide)
    MessageSquare,
    Wrench,
    Settings,
    Package,
    Layers,
    Cpu,
    Cog,
    PenTool,
    Lightbulb,
    Rocket,
    Target,
    Zap,
    Star,
    Heart,
    Shield,
    Award,
    Briefcase,
    Users,
};

// Lista de iconos con metadatos para el selector
export const AVAILABLE_ICONS = [
    { name: "Printer", label: "Impresora", icon: Printer },
    { name: "Box", label: "Cubo / Caja", icon: Box },
    { name: "MessageSquare", label: "Mensaje", icon: MessageSquare },
    { name: "Wrench", label: "Herramienta", icon: Wrench },
    { name: "Settings", label: "Configuración", icon: Settings },
    { name: "Package", label: "Paquete", icon: Package },
    { name: "Layers", label: "Capas", icon: Layers },
    { name: "Cpu", label: "Procesador", icon: Cpu },
    { name: "Cog", label: "Engranaje", icon: Cog },
    { name: "PenTool", label: "Diseño", icon: PenTool },
    { name: "Lightbulb", label: "Idea", icon: Lightbulb },
    { name: "Rocket", label: "Cohete", icon: Rocket },
    { name: "Target", label: "Objetivo", icon: Target },
    { name: "Zap", label: "Rayo", icon: Zap },
    { name: "Star", label: "Estrella", icon: Star },
    { name: "Heart", label: "Corazón", icon: Heart },
    { name: "Shield", label: "Escudo", icon: Shield },
    { name: "Award", label: "Premio", icon: Award },
    { name: "Briefcase", label: "Maletín", icon: Briefcase },
    { name: "Users", label: "Usuarios", icon: Users },
];

/**
 * Renderiza un icono de Lucide dinámicamente por nombre
 * @param name - Nombre del icono (ej: "Printer", "Box", "Cube")
 * @param className - Clases CSS opcionales
 * @returns Componente del icono o null si no existe
 */
export function renderLucideIcon(
    name: string | undefined,
    className?: string
): React.ReactNode {
    if (!name) return null;

    const IconComponent = LUCIDE_ICONS[name];
    if (!IconComponent) return null;

    return <IconComponent className={className} />;
}

/**
 * Obtiene el componente de icono por nombre
 * @param name - Nombre del icono
 * @returns El componente LucideIcon o undefined
 */
export function getLucideIcon(name: string | undefined): LucideIcon | undefined {
    if (!name) return undefined;
    return LUCIDE_ICONS[name];
}
