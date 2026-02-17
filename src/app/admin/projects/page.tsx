import React from "react";
import Link from "next/link";
import { projectRepository } from "@/lib/repositories";
import { projectStatusLabels } from "@/types/project";
import ProjectDeleteButton from "@/components/admin/ProjectDeleteButton";

export const dynamic = 'force-dynamic';

async function getProjects() {
    try {
        // Obtener todos los proyectos, incluyendo inactivos
        const result = await projectRepository.findAllProjects({ 
            limit: 100,
            isActive: undefined 
        });
        return result.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}

export default async function AdminProjectsPage() {
    const projects = await getProjects();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Proyectos</h1>
                    <p className="text-gray-400 mt-1">
                        Gestiona los proyectos de BAB 3D
                    </p>
                </div>
                <Link
                    href="/admin/projects/new"
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
                >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Nuevo Proyecto
                </Link>
            </div>

            {/* Projects Table */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Proyecto
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Estado
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Cliente
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
                        {projects.length > 0 ? (
                            projects.map((project) => (
                                <tr key={project._id.toString()} className="hover:bg-gray-800/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-800">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">{project.title}</p>
                                                <p className="text-sm text-gray-400">{project.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                            project.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                            project.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
                                            'bg-blue-500/20 text-blue-400'
                                        }`}>
                                            {projectStatusLabels[project.status]}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-300">
                                        {project.client || '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                            project.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                        }`}>
                                            {project.isActive ? 'Sí' : 'No'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/projects/${project._id.toString()}`}
                                                className="rounded-lg p-2 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
                                                title="Editar"
                                            >
                                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </Link>
                                            <ProjectDeleteButton 
                                                projectId={project._id.toString()} 
                                                projectTitle={project.title}
                                                isActive={project.isActive}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                    No hay proyectos. Crea uno nuevo para comenzar.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
