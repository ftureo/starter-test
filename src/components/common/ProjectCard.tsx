"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projectStatusLabels } from "@/types/project";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface ProjectCardProject {
    id: string | number;
    title: string;
    slug?: string;
    slogan?: string;
    description: string;
    image: string;
    status: 'in-progress' | 'completed' | 'planned';
    category: string | { id?: string; title?: string; slug?: string } | unknown;
    client?: string;
    startDate: string;
    endDate?: string;
    technologies: string[];
    metadata?: {
        views?: number;
        likes?: number;
    };
}

interface ProjectCardProps {
    project: ProjectCardProject;
    showLikeButton?: boolean;
}

const statusColors: Record<string, string> = {
    'in-progress': 'bg-yellow-500/20 text-yellow-500',
    'completed': 'bg-green-500/20 text-green-500',
    'planned': 'bg-blue-500/20 text-blue-500'
};

// Helper para formatear fechas de forma consistente (evita mismatch server/client)
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC', // Consistente entre server y client
    });
}

// Helper para obtener el label de la categoría
function getCategoryLabel(category: ProjectCardProject['category']): string {
    if (typeof category === 'string') {
        // Mapeo de slugs a labels amigables
        const categoryMap: Record<string, string> = {
            'impresion-3d': 'Impresión 3D',
            'diseno-3d': 'Diseño 3D',
            'consultoria': 'Consultoría',
        };
        return categoryMap[category] || category;
    }
    
    if (category && typeof category === 'object') {
        const cat = category as { title?: string; slug?: string };
        if (cat.title) return cat.title;
        if (cat.slug) {
            const categoryMap: Record<string, string> = {
                'impresion-3d': 'Impresión 3D',
                'diseno-3d': 'Diseño 3D',
                'consultoria': 'Consultoría',
            };
            return categoryMap[cat.slug] || cat.slug;
        }
    }
    
    return 'Sin categoría';
}

const ProjectCard = ({ project, showLikeButton = true }: ProjectCardProps) => {
    const categoryLabel = getCategoryLabel(project.category);
    const [likes, setLikes] = useState(project.metadata?.likes ?? 0);
    const [isLiked, setIsLiked] = useState(false);
    const [isLiking, setIsLiking] = useState(false);

    const handleLike = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (isLiking || isLiked) return;
        
        setIsLiking(true);
        // Optimistic update
        setLikes(prev => prev + 1);
        setIsLiked(true);
        
        try {
            const response = await fetch(`/api/projects/${project.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'like' }),
            });
            
            if (!response.ok) {
                // Revert on error
                setLikes(prev => prev - 1);
                setIsLiked(false);
            }
        } catch {
            // Revert on error
            setLikes(prev => prev - 1);
            setIsLiked(false);
        } finally {
            setIsLiking(false);
        }
    };

    const projectHref = project.slug ? `/projects/${project.slug}` : '#';

    return (
        <Link href={projectHref} className="block">
        <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
            <div className="relative h-48 w-full">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-300" />
                
                {/* Botón de Like */}
                {showLikeButton && (
                    <button
                        onClick={handleLike}
                        disabled={isLiking || isLiked}
                        className={cn(
                            "absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full backdrop-blur-sm transition-all duration-300",
                            isLiked 
                                ? "bg-primary/20 text-primary" 
                                : "bg-black/40 text-white/70 hover:bg-primary/15 hover:text-primary"
                        )}
                    >
                        <Star 
                            className={cn(
                                "h-4 w-4 transition-all duration-300",
                                isLiked && "fill-primary"
                            )} 
                        />
                        <span className="text-xs font-medium">{likes}</span>
                    </button>
                )}
            </div>

            <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                    <Badge
                        variant="outline"
                        className={cn(
                            "capitalize",
                            statusColors[project.status]
                        )}
                    >
                        {projectStatusLabels[project.status]}
                    </Badge>
                    <Badge variant="secondary" className="capitalize bg-secondary/80 text-foreground border-border">
                        {categoryLabel}
                    </Badge>
                </div>
                <h3 className="text-xl text-foreground font-bold group-hover:text-primary transition-colors">
                    {project.title}
                </h3>
                {project.slogan && (
                    <p className="text-sm italic text-primary/80">
                        {project.slogan}
                    </p>
                )}
            </CardHeader>

            <CardContent>
                <p className="text-muted-foreground line-clamp-2">{project.description}</p>
                {project.client && (
                    <p className="mt-2 text-sm text-muted-foreground">
                        <span className="text-muted-foreground">para</span>{" "}
                        <span className="font-medium text-foreground">{project.client}</span>
                    </p>
                )}
                {project.technologies.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                            <Badge
                                key={index}
                                variant="outline"
                                className="text-xs bg-primary/10 border-primary/30 text-primary font-medium"
                            >
                                {tech}
                            </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                            <Badge
                                variant="outline"
                                className="text-xs bg-primary/10 border-primary/30 text-primary font-medium"
                            >
                                +{project.technologies.length - 3}
                            </Badge>
                        )}
                    </div>
                )}
            </CardContent>

            <CardFooter className="flex justify-between text-xs text-muted-foreground border-t border-border pt-3">
                <span>{formatDate(project.startDate)}</span>
                {project.endDate && (
                    <span className="text-primary">Completed</span>
                )}
            </CardFooter>
        </Card>
        </Link>
    );
};

export default ProjectCard;
