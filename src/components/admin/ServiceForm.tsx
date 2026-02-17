"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createService, updateService } from "@/actions/service.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import IconPicker from "@/components/admin/IconPicker";
import ImageUpload from "@/components/admin/ImageUpload";

interface ServiceFeature {
    title: string;
    description: string;
}

interface ServiceData {
    id: string;
    title: string;
    slug: string;
    slogan?: string;
    description: string;
    longDescription?: string;
    image: string;
    gallery?: string[];
    icon?: string;
    features: ServiceFeature[];
    pricing?: {
        basePrice: number;
        currency: string;
    };
    order: number;
    isActive: boolean;
}

interface ServiceFormProps {
    service?: ServiceData;
}

export default function ServiceForm({ service }: ServiceFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: service?.title || '',
        slug: service?.slug || '',
        slogan: service?.slogan || '',
        description: service?.description || '',
        longDescription: service?.longDescription || '',
        image: service?.image || '',
        icon: service?.icon || '',
        order: service?.order ?? 0,
        isActive: service?.isActive ?? true,
        basePrice: service?.pricing?.basePrice?.toString() || '',
        currency: service?.pricing?.currency || 'ARS',
    });

    const [gallery, setGallery] = useState<string[]>(service?.gallery || []);

    const [features, setFeatures] = useState<ServiceFeature[]>(
        service?.features || [{ title: '', description: '' }]
    );

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleFeatureChange = (
        index: number,
        field: 'title' | 'description',
        value: string
    ) => {
        setFeatures(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    const addFeature = () => {
        setFeatures(prev => [...prev, { title: '', description: '' }]);
    };

    const removeFeature = (index: number) => {
        setFeatures(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        startTransition(async () => {
            const data = {
                title: formData.title,
                slug: formData.slug || undefined,
                slogan: formData.slogan || undefined,
                description: formData.description,
                longDescription: formData.longDescription || undefined,
                image: formData.image,
                gallery: gallery.filter(Boolean),
                icon: formData.icon || undefined,
                features: features.filter(f => f.title && f.description),
                pricing: formData.basePrice
                    ? {
                          basePrice: parseFloat(formData.basePrice),
                          currency: formData.currency,
                      }
                    : undefined,
                order: parseInt(formData.order.toString(), 10),
                isActive: formData.isActive,
            };

            const result = service
                ? await updateService(service.id, data)
                : await createService(data);

            if (result.success) {
                router.push('/admin/services');
                router.refresh();
            } else {
                setError(result.error);
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 space-y-6">
                <h2 className="text-lg font-semibold text-white">Información General</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium text-gray-300">
                            Título *
                        </label>
                        <Input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="bg-gray-800 border-gray-700 text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="slug" className="text-sm font-medium text-gray-300">
                            Slug (URL)
                        </label>
                        <Input
                            id="slug"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            placeholder="se-genera-automaticamente"
                            className="bg-gray-800 border-gray-700 text-white"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="slogan" className="text-sm font-medium text-gray-300">
                        Slogan
                    </label>
                    <Input
                        id="slogan"
                        name="slogan"
                        value={formData.slogan}
                        onChange={handleChange}
                        placeholder="Frase corta para miniaturas"
                        maxLength={150}
                        className="bg-gray-800 border-gray-700 text-white"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium text-gray-300">
                        Descripción Corta *
                    </label>
                    <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={2}
                        className="bg-gray-800 border-gray-700 text-white"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="longDescription" className="text-sm font-medium text-gray-300">
                        Descripción Larga
                    </label>
                    <Textarea
                        id="longDescription"
                        name="longDescription"
                        value={formData.longDescription}
                        onChange={handleChange}
                        rows={4}
                        className="bg-gray-800 border-gray-700 text-white"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ImageUpload
                        value={formData.image}
                        onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                        folder="services"
                        label="Imagen del Servicio"
                        required
                        disabled={isPending}
                    />

                    <div className="space-y-2">
                        <label htmlFor="icon" className="text-sm font-medium text-gray-300">
                            Icono
                        </label>
                        <IconPicker
                            value={formData.icon}
                            onChange={(value) => setFormData(prev => ({ ...prev, icon: value }))}
                            className="bg-gray-800 border-gray-700 text-white"
                        />
                    </div>
                </div>

                {/* Galería de imágenes */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-300">
                            Galería de Imágenes (slider)
                        </label>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setGallery(prev => [...prev, ''])}
                            className="text-gray-300 border-gray-700 hover:bg-gray-800"
                        >
                            + Agregar imagen
                        </Button>
                    </div>
                    {gallery.map((url, index) => (
                        <div key={index} className="flex gap-2 items-start">
                            <div className="flex-1">
                                <ImageUpload
                                    value={url}
                                    onChange={(newUrl) => {
                                        setGallery(prev => {
                                            const updated = [...prev];
                                            updated[index] = newUrl;
                                            return updated;
                                        });
                                    }}
                                    folder="services"
                                    label={`Imagen ${index + 1}`}
                                    disabled={isPending}
                                />
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setGallery(prev => prev.filter((_, i) => i !== index))}
                                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 mt-6"
                            >
                                ✕
                            </Button>
                        </div>
                    ))}
                    {gallery.length === 0 && (
                        <p className="text-xs text-gray-500">
                            Sin imágenes de galería. Se usará la imagen principal en el slider.
                        </p>
                    )}
                </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-white">Características</h2>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addFeature}
                        className="text-gray-300 border-gray-700 hover:bg-gray-800"
                    >
                        + Agregar
                    </Button>
                </div>

                {features.map((feature, index) => (
                    <div key={index} className="flex gap-4 items-start">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                value={feature.title}
                                onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                                placeholder="Título de la característica"
                                className="bg-gray-800 border-gray-700 text-white"
                            />
                            <Input
                                value={feature.description}
                                onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                                placeholder="Descripción"
                                className="bg-gray-800 border-gray-700 text-white"
                            />
                        </div>
                        {features.length > 1 && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFeature(index)}
                                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            >
                                ✕
                            </Button>
                        )}
                    </div>
                ))}
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 space-y-6">
                <h2 className="text-lg font-semibold text-white">Configuración</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="order" className="text-sm font-medium text-gray-300">
                            Orden de visualización
                        </label>
                        <Input
                            id="order"
                            name="order"
                            type="number"
                            min="0"
                            value={formData.order}
                            onChange={handleChange}
                            className="bg-gray-800 border-gray-700 text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="basePrice" className="text-sm font-medium text-gray-300">
                            Precio Base (opcional)
                        </label>
                        <Input
                            id="basePrice"
                            name="basePrice"
                            type="number"
                            min="0"
                            step="0.01"
                            value={formData.basePrice}
                            onChange={handleChange}
                            placeholder="0.00"
                            className="bg-gray-800 border-gray-700 text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="currency" className="text-sm font-medium text-gray-300">
                            Moneda
                        </label>
                        <select
                            id="currency"
                            name="currency"
                            value={formData.currency}
                            onChange={handleChange}
                            className="w-full rounded-md bg-gray-800 border-gray-700 text-white px-3 py-2"
                        >
                            <option value="ARS">ARS</option>
                            <option value="USD">USD</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-wrap gap-6">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={handleChange}
                            className="w-5 h-5 rounded bg-gray-800 border-gray-700 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-gray-300">Activo (visible en el sitio)</span>
                    </label>
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={isPending}
                    className="text-gray-300 border-gray-700 hover:bg-gray-800"
                >
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    disabled={isPending}
                    className="bg-green-600 hover:bg-green-700"
                >
                    {isPending ? 'Guardando...' : service ? 'Actualizar' : 'Crear Servicio'}
                </Button>
            </div>
        </form>
    );
}
