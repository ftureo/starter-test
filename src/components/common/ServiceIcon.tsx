"use client";

import React from "react";
import { renderLucideIcon } from "@/lib/utils/lucide-icons";

interface ServiceIconProps {
    name: string | undefined;
    className?: string;
}

/**
 * Componente cliente para renderizar iconos de Lucide dinámicamente
 * Útil cuando se necesita usar en Server Components
 */
export default function ServiceIcon({ name, className }: ServiceIconProps) {
    return <>{renderLucideIcon(name, className)}</>;
}
