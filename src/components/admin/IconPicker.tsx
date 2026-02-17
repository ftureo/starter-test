"use client";

import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { AVAILABLE_ICONS } from "@/lib/utils/lucide-icons";

interface IconPickerProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export default function IconPicker({
    value,
    onChange,
    placeholder = "Seleccionar icono",
    className,
}: IconPickerProps) {
    return (
        <Select value={value || "none"} onValueChange={(val) => onChange(val === "none" ? "" : val)}>
            <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder}>
                    {value ? (
                        <span className="flex items-center gap-2">
                            {(() => {
                                const iconData = AVAILABLE_ICONS.find((i) => i.name === value);
                                if (iconData) {
                                    const Icon = iconData.icon;
                                    return (
                                        <>
                                            <Icon className="h-4 w-4" />
                                            <span>{iconData.label}</span>
                                        </>
                                    );
                                }
                                return <span>{value}</span>;
                            })()}
                        </span>
                    ) : (
                        <span className="text-gray-400">{placeholder}</span>
                    )}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="none">
                    <span className="flex items-center gap-2 text-gray-400">
                        <span className="h-4 w-4 flex items-center justify-center">—</span>
                        <span>Sin icono</span>
                    </span>
                </SelectItem>
                {AVAILABLE_ICONS.map(({ name, label, icon: Icon }) => (
                    <SelectItem key={name} value={name}>
                        <span className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            <span>{label}</span>
                        </span>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
