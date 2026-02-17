"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { projectStatusLabels } from "@/types/project";
import { cn } from "@/lib/utils";
import { ArrowRight, Star, ChevronRight, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";

interface FeaturedProject {
    id: string;
    title: string;
    slug: string;
    description: string;
    image: string;
    status: 'in-progress' | 'completed' | 'planned';
    category?: {
        id: string;
        title?: string;
        slug?: string;
    };
    client?: string;
    technologies: string[];
    metadata?: {
        views?: number;
        likes?: number;
    };
}

const statusColors: Record<string, string> = {
    'in-progress': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'completed': 'bg-green-500/20 text-green-400 border-green-500/30',
    'planned': 'bg-blue-500/20 text-blue-400 border-blue-500/30'
};

// Imágenes de fallback para proyectos sin imagen
const FALLBACK_IMAGES = [
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80",
    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
    "https://images.unsplash.com/photo-1631733898881-dcaa17069406?w=800&q=80",
];

const FeaturedProjects = () => {
    const [projects, setProjects] = useState<FeaturedProject[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchFeaturedProjects() {
            try {
                const response = await fetch('/api/projects?featured=true&isActive=true&limit=3');
                const result = await response.json();

                if (result.success && result.data && result.data.length > 0) {
                    setProjects(result.data.map((p: {
                        id: string;
                        title: string;
                        slug: string;
                        description: string;
                        image: string;
                        status: 'in-progress' | 'completed' | 'planned';
                        category?: { id: string; title?: string; slug?: string };
                        client?: string;
                        technologies: string[];
                        metadata?: { views?: number; likes?: number };
                    }, index: number) => ({
                        id: p.id,
                        title: p.title,
                        slug: p.slug,
                        description: p.description,
                        image: p.image || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length],
                        status: p.status,
                        category: p.category,
                        client: p.client,
                        technologies: p.technologies || [],
                        metadata: p.metadata,
                    })));
                }
            } catch (error) {
                console.error('Error fetching featured projects:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchFeaturedProjects();
    }, []);

    // No renderizar si no hay proyectos destacados
    if (!isLoading && projects.length === 0) {
        return null;
    }

    const selectedProject = projects[selectedIndex];

    return (
        <section id="featured-projects" className="w-full py-20 bg-secondary/30">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <Badge variant="outline" className="mb-3 text-primary border-primary/40">
                            <Star className="h-3 w-3 mr-1 fill-primary" />
                            {siteConfig.sections.featuredProjects.badge}
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                            {siteConfig.sections.featuredProjects.title}
                        </h2>
                        <p className="text-muted-foreground mt-2 max-w-lg">
                            {siteConfig.sections.featuredProjects.description}
                        </p>
                    </div>
                    <Link 
                        href="/projects" 
                        className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        {siteConfig.sections.featuredProjects.viewAllText}
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
                        <div className="lg:col-span-1 space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-24 rounded-lg bg-muted animate-pulse" />
                            ))}
                        </div>
                        <div className="lg:col-span-2 rounded-xl bg-muted animate-pulse" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Lista de proyectos (izquierda) */}
                        <div className="lg:col-span-1 flex flex-col gap-2 justify-evenlyF">
                            {projects.map((project, index) => (
                                <button
                                    key={project.id}
                                    onClick={() => setSelectedIndex(index)}
                                    className={cn(
                                        "w-full text-left p-4 rounded-xl transition-all duration-300 group",
                                        selectedIndex === index
                                            ? "bg-primary/10 border border-primary/30"
                                            : "bg-muted/50 hover:bg-muted border border-transparent"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Thumbnail */}
                                        <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover"
                                                sizes="64px"
                                            />
                                            {selectedIndex === index && (
                                                <div className="absolute inset-0 ring-2 ring-primary rounded-lg" />
                                            )}
                                        </div>
                                        
                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Badge
                                                    variant="outline"
                                                    className={cn(
                                                        "text-[10px] px-1.5 py-0",
                                                        statusColors[project.status]
                                                    )}
                                                >
                                                    {projectStatusLabels[project.status]}
                                                </Badge>
                                            </div>
                                            <h3 className={cn(
                                                "font-semibold truncate transition-colors",
                                                selectedIndex === index ? "text-primary" : "text-foreground group-hover:text-primary"
                                            )}>
                                                {project.title}
                                            </h3>
                                            {project.client && (
                                                <p className="text-xs text-muted-foreground truncate">
                                                    {project.client}
                                                </p>
                                            )}
                                        </div>

                                        {/* Arrow */}
                                        <ChevronRight className={cn(
                                            "h-5 w-5 shrink-0 transition-all",
                                            selectedIndex === index 
                                                ? "text-primary translate-x-0" 
                                                : "text-muted-foreground -translate-x-1 group-hover:translate-x-0 group-hover:text-foreground"
                                        )} />
                                    </div>
                                </button>
                            ))}
                            
                            {/* Link móvil */}
                            <Link 
                                href="/projects" 
                                className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors lg:hidden"
                            >
                                {siteConfig.sections.featuredProjects.viewAllText} events
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>

                        {/* Detalle del proyecto (derecha) */}
                        {selectedProject && (
                            <div className="lg:col-span-2 relative rounded-2xl overflow-hidden bg-muted/50 border border-border">
                                {/* Imagen de fondo */}
                                <div className="absolute inset-0">
                                    <Image
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        fill
                                        className="object-cover transition-all duration-500"
                                        sizes="(max-width: 1024px) 100vw, 66vw"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
                                </div>

                                {/* Contenido */}
                                <div className="relative z-10 p-6 md:p-8 flex flex-col justify-end min-h-[350px] md:min-h-[400px]">
                                    {/* Badges superiores */}
                                    <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Badge
                                                variant="outline"
                                                className={cn("backdrop-blur-sm", statusColors[selectedProject.status])}
                                            >
                                                {projectStatusLabels[selectedProject.status]}
                                            </Badge>
                                            {selectedProject.category?.title && (
                                                <Badge variant="secondary" className="backdrop-blur-sm">
                                                    {selectedProject.category.title}
                                                </Badge>
                                            )}
                                        </div>
                                        {selectedProject.metadata?.likes !== undefined && selectedProject.metadata.likes > 0 && (
                                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-primary">
                                                <Star className="h-3.5 w-3.5 fill-primary" />
                                                <span className="text-xs font-medium">{selectedProject.metadata.likes}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Info principal */}
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                                {selectedProject.title}
                                            </h3>
                                            {selectedProject.client && (
                                                <p className="text-gray-400">
                                                    <span className="text-gray-500">with</span>{" "}
                                                    <span className="text-white font-medium">{selectedProject.client}</span>
                                                </p>
                                            )}
                                        </div>

                                        <p className="text-gray-300 line-clamp-3 max-w-xl">
                                            {selectedProject.description}
                                        </p>

                                        {/* Tecnologías */}
                                        {selectedProject.technologies.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.technologies.map((tech, idx) => (
                                                    <span 
                                                        key={idx}
                                                        className="px-2.5 py-1 text-xs rounded-md bg-white/10 text-gray-300 backdrop-blur-sm"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* CTA */}
                                        <Link
                                            href={`/projects/${selectedProject.slug}`}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors group"
                                        >
                                            Learn more
                                            <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedProjects;
