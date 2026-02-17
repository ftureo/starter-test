import React from "react";
import { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { serviceRepository } from "@/lib/repositories";
import ServiceCard from "@/components/common/ServiceCard";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
    title: "Servicios | BAB 3D Printing & Design",
    description: "Ofrecemos servicios de impresión 3D, diseño y consultoría para materializar tus ideas en proyectos tangibles.",
    keywords: [...siteConfig.seo.keywords],
};

// Revalidar cada 60 segundos
export const revalidate = 60;

async function getServices() {
    try {
        const services = await serviceRepository.findActiveServices();
        return services;
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
}

export default async function ServicesPage() {
    const services = await getServices();

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background">
            <Navbar />
            <main className="container mx-auto px-4 py-24">
                <div className="space-y-8">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold text-foreground">Nuestros Servicios</h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Descubre cómo podemos ayudarte a materializar tus ideas
                            a través de nuestros servicios especializados en impresión 3D.
                        </p>
                    </div>

                    {services.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {services.map((service) => (
                                <ServiceCard
                                    key={service._id.toString()}
                                    title={service.title}
                                    slogan={service.slogan}
                                    description={service.description}
                                    link={`/services/${service.slug}`}
                                    bgImage={service.image}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">
                                No hay servicios disponibles en este momento.
                            </p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
