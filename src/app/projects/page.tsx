import React from "react";
import { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { projectRepository } from "@/lib/repositories";
import ProjectCard from "@/components/common/ProjectCard";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
    title: "Proyectos | BAB 3D Printing & Design",
    description: "Explora nuestros proyectos de impresión 3D, diseño y consultoría. Descubre cómo hemos ayudado a nuestros clientes a materializar sus ideas.",
    keywords: [...siteConfig.seo.keywords],
};

// Revalidar cada 60 segundos
export const revalidate = 60;

// Tipo para el resultado de lean() con populate
interface ProjectWithCategory {
    _id: string;
    title: string;
    slug: string;
    slogan?: string;
    description: string;
    image: string;
    status: 'in-progress' | 'completed' | 'planned';
    category: {
        _id: string;
        title: string;
        slug: string;
        icon?: string;
    } | null;
    client?: string;
    startDate: Date | string;
    endDate?: Date | string;
    technologies: string[];
    metadata?: {
        views?: number;
        likes?: number;
    };
}

async function getProjects(): Promise<ProjectWithCategory[]> {
    try {
        // Solo mostrar proyectos activos en el sitio público
        const result = await projectRepository.findAllProjects({ limit: 100, isActive: true });
        // Con lean(), los datos ya son objetos planos
        return result.data as unknown as ProjectWithCategory[];
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background">
            <Navbar />
            <main className="container mx-auto px-4 py-24">
                <div className="space-y-8">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold text-foreground">
                            {siteConfig.sections.projects.title}
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            {siteConfig.sections.projects.description}
                        </p>
                    </div>

                    {projects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project) => (
                                <ProjectCard 
                                    key={String(project._id)} 
                                    project={{
                                        id: String(project._id),
                                        title: project.title,
                                        slug: project.slug,
                                        slogan: project.slogan,
                                        description: project.description,
                                        image: project.image,
                                        status: project.status,
                                        // Con lean() + populate, category ya viene como objeto plano
                                        category: project.category ? {
                                            id: String(project.category._id),
                                            title: project.category.title,
                                            slug: project.category.slug,
                                        } : undefined,
                                        client: project.client,
                                        startDate: typeof project.startDate === 'string' 
                                            ? project.startDate 
                                            : project.startDate.toISOString(),
                                        endDate: project.endDate 
                                            ? (typeof project.endDate === 'string' 
                                                ? project.endDate 
                                                : project.endDate.toISOString())
                                            : undefined,
                                        technologies: project.technologies,
                                        metadata: project.metadata,
                                    }} 
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">
                                No hay proyectos disponibles en este momento.
                            </p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
