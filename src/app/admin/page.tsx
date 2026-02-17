import React from "react";
import Link from "next/link";
import { projectRepository, serviceRepository } from "@/lib/repositories";
import { projectStatusLabels } from "@/types/project";

async function getStats() {
    try {
        const [projectStats, serviceCount] = await Promise.all([
            projectRepository.getStats(),
            serviceRepository.count({ isActive: true }),
        ]);

        return {
            projects: projectStats,
            services: serviceCount,
        };
    } catch (error) {
        console.error('Error fetching stats:', error);
        return {
            projects: { total: 0, byStatus: {}, byCategory: {}, featured: 0 },
            services: 0,
        };
    }
}

export default async function AdminDashboard() {
    const stats = await getStats();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-gray-400 mt-2">
                    Bienvenido al panel de administración de BAB 3D
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">Total Proyectos</p>
                            <p className="text-3xl font-bold text-white mt-1">
                                {stats.projects.total}
                            </p>
                        </div>
                        <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">Total Servicios</p>
                            <p className="text-3xl font-bold text-white mt-1">
                                {stats.services}
                            </p>
                        </div>
                        <div className="h-12 w-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                            <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">Destacados</p>
                            <p className="text-3xl font-bold text-white mt-1">
                                {stats.projects.featured}
                            </p>
                        </div>
                        <div className="h-12 w-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                            <svg className="h-6 w-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">Completed</p>
                            <p className="text-3xl font-bold text-white mt-1">
                                {stats.projects.byStatus['completed'] || 0}
                            </p>
                        </div>
                        <div className="h-12 w-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                            <svg className="h-6 w-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Acciones Rápidas</h2>
                    <div className="space-y-3">
                        <Link
                            href="/admin/projects/new"
                            className="flex items-center gap-3 rounded-lg border border-gray-700 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                        >
                            <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Nuevo Proyecto
                        </Link>
                        <Link
                            href="/admin/services/new"
                            className="flex items-center gap-3 rounded-lg border border-gray-700 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                        >
                            <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Nuevo Servicio
                        </Link>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Estado por Categoría</h2>
                    <div className="space-y-3">
                        {Object.entries(stats.projects.byStatus).map(([status, count]) => (
                            <div key={status} className="flex items-center justify-between">
                                <span className="text-gray-400 capitalize">
                                    {projectStatusLabels[status as keyof typeof projectStatusLabels]}
                                </span>
                                <span className="text-white font-medium">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
