import React from "react";
import ProjectForm from "@/components/admin/ProjectForm";
import { serviceRepository } from "@/lib/repositories";

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

export default async function NewProjectPage() {
    const services = await getServices();

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">Nuevo Proyecto</h1>
                <p className="text-gray-400 mt-1">
                    Crea un nuevo proyecto para mostrar en el portafolio
                </p>
            </div>

            <ProjectForm services={services} />
        </div>
    );
}
