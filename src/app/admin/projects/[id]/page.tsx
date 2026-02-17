import React from "react";
import { notFound } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";
import { projectRepository, serviceRepository } from "@/lib/repositories";

interface EditProjectPageProps {
    params: Promise<{ id: string }>;
}

async function getProject(id: string) {
    try {
        const project = await projectRepository.findProjectById(id);
        if (!project) return null;

        return {
            id: project._id.toString(),
            title: project.title,
            slug: project.slug,
            slogan: project.slogan,
            description: project.description,
            image: project.image,
            gallery: project.gallery,
            status: project.status,
            category: typeof project.category === 'object' && project.category !== null && '_id' in project.category
                ? (project.category as { _id: { toString(): string } })._id.toString()
                : project.category?.toString() || '',
            client: project.client,
            startDate: project.startDate.toISOString().split('T')[0],
            endDate: project.endDate?.toISOString().split('T')[0],
            technologies: project.technologies,
            featured: project.featured,
            isActive: project.isActive,
        };
    } catch (error) {
        console.error('Error fetching project:', error);
        return null;
    }
}

async function getServices() {
    try {
        const services = await serviceRepository.findActiveServices();
        return services.map(s => ({
            id: s._id.toString(),
            title: s.title,
            slug: s.slug,
        }));
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
    const { id } = await params;
    const [project, services] = await Promise.all([
        getProject(id),
        getServices(),
    ]);

    if (!project) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 px-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Editar Proyecto</h1>
                <p className="text-gray-400 mt-1">
                    Modifica los datos del proyecto
                </p>
            </div>

            <ProjectForm project={project} services={services} />
        </div>
    );
}
