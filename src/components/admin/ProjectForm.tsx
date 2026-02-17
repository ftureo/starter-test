"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createProject, updateProject } from "@/actions/project.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/admin/ImageUpload";

interface Service {
    id: string;
    title: string;
    slug: string;
}

interface ProjectData {
    id: string;
    title: string;
    slug: string;
    slogan?: string;
    description: string;
    image: string;
    gallery: string[];
    status: 'in-progress' | 'completed' | 'planned';
    category: string;
    client?: string;
    startDate: string;
    endDate?: string;
    technologies: string[];
    featured: boolean;
    isActive: boolean;
}

interface ProjectFormProps {
    project?: ProjectData;
    services: Service[];
}

export default function ProjectForm({ project, services }: ProjectFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    // Validar que hay servicios disponibles para asignar como categoría
    const hasServices = services.length > 0;

    const [formData, setFormData] = useState({
        title: project?.title || '',
        slug: project?.slug || '',
        slogan: project?.slogan || '',
        description: project?.description || '',
        image: project?.image || '',
        status: project?.status || 'planned',
        category: project?.category || (services[0]?.id || ''),
        client: project?.client || '',
        startDate: project?.startDate || new Date().toISOString().split('T')[0],
        endDate: project?.endDate || '',
        technologies: project?.technologies?.join(', ') || '',
        featured: project?.featured || false,
        isActive: project?.isActive ?? true,
    });

    // Si no hay servicios, mostrar mensaje de error
    if (!hasServices && !project) {
        return (
            <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-3">
                    <svg className="h-6 w-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-yellow-500">
                        No hay servicios disponibles
                    </h3>
                </div>
                <p className="text-gray-300">
                    Para crear un proyecto necesitas tener al menos un servicio creado, 
                    ya que los proyectos se asocian a categorías (servicios).
                </p>
                <div className="flex gap-4">
                    <Button
                        onClick={() => router.push('/admin/services/new')}
                        className="bg-green-600 hover:bg-green-700"
                    >
                        Crear un Servicio Primero
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => router.back()}
                        className="text-gray-300 border-gray-700 hover:bg-gray-800"
                    >
                        Volver
                    </Button>
                </div>
            </div>
        );
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        console.log({ formData });
        e.preventDefault();
        setError(null);

        startTransition(async () => {
            const technologies = formData.technologies.split(',').map(t => t.trim()).filter(Boolean);
            
            const result = project
                ? await updateProject(project.id, {
                    title: formData.title,
                    slug: formData.slug || undefined,
                    slogan: formData.slogan || undefined,
                    description: formData.description,
                    image: formData.image,
                    status: formData.status as 'in-progress' | 'completed' | 'planned',
                    category: formData.category,
                    client: formData.client || undefined,
                    startDate: formData.startDate,
                    endDate: formData.endDate || undefined,
                    technologies,
                    featured: formData.featured,
                    isActive: formData.isActive,
                })
                : await createProject({
                    title: formData.title,
                    slug: formData.slug || undefined,
                    slogan: formData.slogan || undefined,
                    description: formData.description,
                    image: formData.image,
                    gallery: [], // Campo requerido con valor por defecto
                    status: formData.status as 'in-progress' | 'completed' | 'planned',
                    category: formData.category,
                    client: formData.client || undefined,
                    startDate: formData.startDate,
                    endDate: formData.endDate || undefined,
                    technologies,
                    featured: formData.featured,
                    isActive: formData.isActive,
                });

            if (result.success) {
                router.push('/admin/projects');
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
                        Descripción *
                    </label>
                    <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="bg-gray-800 border-gray-700 text-white"
                    />
                </div>

                <ImageUpload
                    value={formData.image}
                    onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                    folder="projects"
                    label="Imagen Principal del Proyecto"
                    required
                    disabled={isPending}
                />
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 space-y-6">
                <h2 className="text-lg font-semibold text-white">Detalles del Proyecto</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="status" className="text-sm font-medium text-gray-300">
                            Estado
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full rounded-md bg-gray-800 border-gray-700 text-white px-3 py-2"
                        >
                            <option value="planned">Planned</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="category" className="text-sm font-medium text-gray-300">
                            Categoría (Servicio)
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full rounded-md bg-gray-800 border-gray-700 text-white px-3 py-2"
                        >
                            {services.map(service => (
                                <option key={service.id} value={service.id}>
                                    {service.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="client" className="text-sm font-medium text-gray-300">
                            Cliente
                        </label>
                        <Input
                            id="client"
                            name="client"
                            value={formData.client}
                            onChange={handleChange}
                            className="bg-gray-800 border-gray-700 text-white"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="startDate" className="text-sm font-medium text-gray-300">
                            Fecha de Inicio *
                        </label>
                        <Input
                            id="startDate"
                            name="startDate"
                            type="date"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                            className="bg-gray-800 border-gray-700 text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="endDate" className="text-sm font-medium text-gray-300">
                            Fecha de Fin
                        </label>
                        <Input
                            id="endDate"
                            name="endDate"
                            type="date"
                            value={formData.endDate}
                            onChange={handleChange}
                            className="bg-gray-800 border-gray-700 text-white"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="technologies" className="text-sm font-medium text-gray-300">
                        Tecnologías (separadas por coma)
                    </label>
                    <Input
                        id="technologies"
                        name="technologies"
                        value={formData.technologies}
                        onChange={handleChange}
                        placeholder="PLA, FDM, Blender"
                        className="bg-gray-800 border-gray-700 text-white"
                    />
                </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 space-y-6">
                <h2 className="text-lg font-semibold text-white">Opciones</h2>

                <div className="flex flex-wrap gap-6">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            name="featured"
                            checked={formData.featured}
                            onChange={handleChange}
                            className="w-5 h-5 rounded bg-gray-800 border-gray-700 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-300">Proyecto Destacado</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={handleChange}
                            className="w-5 h-5 rounded bg-gray-800 border-gray-700 text-blue-600 focus:ring-blue-500"
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
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    {isPending ? 'Guardando...' : project ? 'Actualizar' : 'Crear Proyecto'}
                </Button>
            </div>
        </form>
    );
}
