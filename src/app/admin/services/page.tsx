import React from "react";
import Link from "next/link";
import { serviceRepository } from "@/lib/repositories";
import ServiceDeleteButton from "@/components/admin/ServiceDeleteButton";

export const dynamic = 'force-dynamic';

async function getServices() {
    try {
        const result = await serviceRepository.findAllServices({ 
            limit: 100,
            isActive: undefined 
        });
        return result.data;
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
}

export default async function AdminServicesPage() {
    const services = await getServices();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Servicios</h1>
                    <p className="text-gray-400 mt-1">
                        Gestiona los servicios de BAB 3D
                    </p>
                </div>
                <Link
                    href="/admin/services/new"
                    className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition-colors"
                >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Nuevo Servicio
                </Link>
            </div>

            {/* Services Table */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Servicio
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Orden
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Activo
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {services.length > 0 ? (
                            services.map((service) => (
                                <tr key={service._id.toString()} className="hover:bg-gray-800/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-800">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={service.image}
                                                    alt={service.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">{service.title}</p>
                                                <p className="text-sm text-gray-400">{service.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-300">
                                        {service.order}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                            service.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                        }`}>
                                            {service.isActive ? 'Sí' : 'No'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/services/${service._id.toString()}`}
                                                className="rounded-lg p-2 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
                                                title="Editar"
                                            >
                                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </Link>
                                            <ServiceDeleteButton 
                                                serviceId={service._id.toString()} 
                                                serviceTitle={service.title}
                                                isActive={service.isActive}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                                    No hay servicios. Crea uno nuevo para comenzar.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
