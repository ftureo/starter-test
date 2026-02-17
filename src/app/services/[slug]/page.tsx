import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { serviceRepository, projectRepository } from "@/lib/repositories";
import ProjectCard from "@/components/common/ProjectCard";
import ImageSlider from "@/components/common/ImageSlider";
import CallToAction from "@/components/common/CallToAction";
import { siteConfig } from "@/config/site";

interface ServicePageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
    const { slug } = await params;
    const service = await serviceRepository.findServiceBySlug(slug);

    if (!service) {
        return {
            title: "Servicio no encontrado | BAB 3D",
            keywords: [...siteConfig.seo.keywords],
        };
    }

    return {
        title: `${service.title} | BAB 3D Printing & Design`,
        description: service.description,
        keywords: [...siteConfig.seo.keywords],
    };
}

export const revalidate = 60;

async function getService(slug: string) {
    try {
        const service = await serviceRepository.findServiceBySlug(slug);
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
        };
    } catch (error) {
        console.error('Error fetching service:', error);
        return null;
    }
}

async function getProjectsByService(serviceId: string) {
    try {
        const projects = await projectRepository.findProjectsByCategory(serviceId, 3);
        return projects.map((project) => {
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
                status: project.status,
                category: serializedCategory,
                client: project.client,
                startDate: project.startDate.toISOString(),
                endDate: project.endDate?.toISOString(),
                technologies: project.technologies,
            };
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}

export default async function ServicePage({ params }: ServicePageProps) {
    const { slug } = await params;
    const service = await getService(slug);

    if (!service) {
        notFound();
    }

    const projects = await getProjectsByService(service.id);

    // Preparar imágenes para el slider: gallery si existe, sino imagen principal
    const sliderImages = service.gallery.length > 0
        ? service.gallery
        : [service.image];

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background">
            <Navbar />

            {/* Banner horizontal */}
            <section className="relative w-full h-96 mb-4">
                <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center px-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                            {service.title}
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                            {service.description}
                        </p>
                    </div>
                </div>
            </section>
            <main className="container mx-auto px-4 py-8 space-y-20">
                {/* Dos columnas: Slider + Long Description */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                    {/* Columna izquierda: Image Slider */}
                    <div>
                        <ImageSlider images={sliderImages} alt={service.title} />
                    </div>

                    {/* Columna derecha: Long Description */}
                    <div className="space-y-6">
                        {service.longDescription ? (
                            <>
                                <h2 className="text-2xl font-bold text-foreground">
                                    Sobre este servicio
                                </h2>
                                <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
                                    {service.longDescription}
                                </p>
                            </>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold text-foreground">
                                    Sobre este servicio
                                </h2>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    {service.description}
                                </p>
                            </>
                        )}

                        {/* Features inline si existen */}
                        {service.features && service.features.length > 0 && (
                            <div className="space-y-4 pt-4 border-t border-gray-800">
                                <h3 className="text-lg font-semibold text-foreground">Características</h3>
                                <ul className="space-y-3">
                                    {service.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />
                                            <div>
                                                <span className="font-medium text-foreground">{feature.title}</span>
                                                <span className="text-muted-foreground"> — {feature.description}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </section>

                {/* Call To Action */}
                <CallToAction
                    title={siteConfig.cta.servicesSlug.title}
                    description={siteConfig.cta.servicesSlug.description}
                    buttonText={siteConfig.cta.servicesSlug.buttonText}
                    href={siteConfig.cta.servicesSlug.href}
                />

                {/* Proyectos Relacionados */}
                {projects.length > 0 && (
                    <section className="space-y-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center">
                            Proyectos Relacionados
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {projects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
}
