import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import CallToAction from "@/components/common/CallToAction";
import { siteConfig } from "@/config/site";
import { projectRepository } from "@/lib/repositories";
import { Badge } from "@/components/ui/badge";
import { projectStatusLabels } from "@/types/project";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";

interface ProjectPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = await projectRepository.findProjectBySlug(slug);

    if (!project) {
        return {
            title: "Proyecto no encontrado | BAB 3D",
            keywords: [...siteConfig.seo.keywords],
        };
    }

    return {
        title: `${project.title} | BAB 3D Printing & Design`,
        description: project.description,
        keywords: [...siteConfig.seo.keywords],
    };
}

export const revalidate = 60;

const statusColors: Record<string, string> = {
    'in-progress': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'completed': 'bg-green-500/20 text-green-400 border-green-500/30',
    'planned': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
};

function formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
    });
}

async function getProject(slug: string) {
    try {
        const project = await projectRepository.findProjectBySlug(slug);
        if (!project) return null;

        const category = project.category;
        let serializedCategory: { id: string; title?: string; slug?: string } | undefined;

        if (category && typeof category === 'object' && '_id' in category) {
            const cat = category as { _id: { toString(): string }; title?: string; slug?: string };
            serializedCategory = {
                id: cat._id.toString(),
                title: cat.title,
                slug: cat.slug,
            };
        }

        return {
            id: project._id.toString(),
            title: project.title,
            slug: project.slug,
            slogan: project.slogan,
            description: project.description,
            image: project.image,
            gallery: Array.isArray(project.gallery) ? [...project.gallery] : [],
            status: project.status,
            category: serializedCategory,
            client: project.client,
            startDate: project.startDate,
            endDate: project.endDate,
            technologies: project.technologies,
            featured: project.featured,
            metadata: project.metadata
                ? { views: project.metadata.views ?? 0, likes: project.metadata.likes ?? 0 }
                : { views: 0, likes: 0 },
        };
    } catch (error) {
        console.error('Error fetching project:', error);
        return null;
    }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = await getProject(slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background">
            <Navbar />

            {/* Hero Image - full width */}
            <section className="relative w-full h-72 md:h-[28rem]">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                {/* Badge de estado sobre el hero */}
                <div className="absolute top-6 left-6 flex items-center gap-2">
                    <Badge
                        variant="outline"
                        className={`backdrop-blur-sm ${statusColors[project.status]}`}
                    >
                        {projectStatusLabels[project.status]}
                    </Badge>
                    {project.category?.title && (
                        <Badge variant="secondary" className="backdrop-blur-sm">
                            {project.category.title}
                        </Badge>
                    )}
                </div>

                {/* Título sobre el hero */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                    <div className="container mx-auto">
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                            {project.title}
                        </h1>
                        {project.slogan && (
                            <p className="text-lg md:text-xl text-primary italic font-medium">
                                {project.slogan}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            <main className="container mx-auto px-12 py-8 space-y-16">
                {/* Botón de volver */}
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                >
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    Volver a proyectos
                </Link>

                {/* Contenido principal: dos columnas asimetricas */}
                <section className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Columna principal (3/5) - Descripción */}
                    <div className="lg:col-span-3 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-4">
                                Sobre este proyecto
                            </h2>
                            <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
                                {project.description}
                            </p>
                        </div>

                        {/* Tecnologías */}
                        {project.technologies.length > 0 && (
                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                                    <Tag className="h-4 w-4 text-primary" />
                                    Tecnologías utilizadas
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1.5 text-sm rounded-lg bg-primary/10 text-primary border border-primary/20"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Columna lateral (2/5) - Detalles */}
                    <div className="lg:col-span-2">
                        <div className="bg-card border border-border rounded-2xl p-6 space-y-5 sticky top-24">
                            <h3 className="text-lg font-semibold text-foreground border-b border-border pb-3">
                                Detalles del proyecto
                            </h3>

                            {project.client && (
                                <div className="flex items-center gap-3">
                                    <User className="h-4 w-4 text-primary shrink-0" />
                                    <div>
                                        <span className="text-xs text-muted-foreground block">Cliente</span>
                                        <span className="text-foreground font-medium">{project.client}</span>
                                    </div>
                                </div>
                            )}

                            {project.category?.title && (
                                <div className="flex items-center gap-3">
                                    <Tag className="h-4 w-4 text-primary shrink-0" />
                                    <div>
                                        <span className="text-xs text-muted-foreground block">Categoría</span>
                                        <Link
                                            href={`/services/${project.category.slug}`}
                                            className="text-foreground font-medium hover:text-primary transition-colors"
                                        >
                                            {project.category.title}
                                        </Link>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-3">
                                <Calendar className="h-4 w-4 text-primary shrink-0" />
                                <div>
                                    <span className="text-xs text-muted-foreground block">Fecha de inicio</span>
                                    <span className="text-foreground font-medium">{formatDate(project.startDate)}</span>
                                </div>
                            </div>

                            {project.endDate && (
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-4 w-4 text-green-400 shrink-0" />
                                    <div>
                                        <span className="text-xs text-muted-foreground block">Fecha de finalización</span>
                                        <span className="text-foreground font-medium">{formatDate(project.endDate)}</span>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${project.status === 'completed' ? 'bg-green-500' : project.status === 'in-progress' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
                                <div>
                                    <span className="text-xs text-muted-foreground block">Estado</span>
                                    <span className="text-foreground font-medium">
                                        {projectStatusLabels[project.status]}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Galería en grid */}
                {project.gallery.length > 0 && (
                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold text-foreground">
                            Galería
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {project.gallery.map((image, index) => (
                                <div
                                    key={index}
                                    className="relative aspect-[4/3] rounded-xl overflow-hidden group border border-border hover:border-primary/30 transition-colors"
                                >
                                    <Image
                                        src={image}
                                        alt={`${project.title} - Imagen ${index + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Call To Action */}
                <CallToAction
                    title={siteConfig.cta.projectSlug.title}
                    description={siteConfig.cta.projectSlug.description}
                    buttonText={siteConfig.cta.projectSlug.buttonText}
                    href={siteConfig.cta.projectSlug.href}
                />
            </main>

            <Footer />
        </div>
    );
}
