import React from "react";
import { notFound } from "next/navigation";
import ServiceForm from "@/components/admin/ServiceForm";
import { serviceRepository } from "@/lib/repositories";

interface EditServicePageProps {
    params: Promise<{ id: string }>;
}

async function getService(id: string) {
    try {
        const service = await serviceRepository.findServiceById(id);
        if (!service) return null;

        return {
            id: service._id.toString(),
            title: service.title,
            slug: service.slug,
            slogan: service.slogan,
            description: service.description,
            longDescription: service.longDescription,
            image: service.image,
            gallery: Array.isArray(service.gallery) ? [...service.gallery] : [],
            icon: service.icon,
            features: service.features,
            pricing: service.pricing,
            order: service.order,
            isActive: service.isActive,
        };
    } catch (error) {
        console.error('Error fetching service:', error);
        return null;
    }
}

export default async function EditServicePage({ params }: EditServicePageProps) {
    const { id } = await params;
    const service = await getService(id);

    if (!service) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">Editar Servicio</h1>
                <p className="text-gray-400 mt-1">
                    Modifica los datos del servicio
                </p>
            </div>

            <ServiceForm service={service} />
        </div>
    );
}
