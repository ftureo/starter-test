"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ServiceCard from "@/components/common/ServiceCard";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";

// Tipo para servicios de la API
interface ServiceItem {
    id: string;
    title: string;
    slug: string;
    slogan?: string;
    description: string;
    image: string;
    icon?: string;
}

// Datos estáticos de fallback con iconos
const fallbackServices: ServiceItem[] = [
    {
        id: "1",
        title: "Breathwork",
        slug: "breathwork",
        description: "Experience the transformative power of conscious breathing",
        image: "https://framerusercontent.com/images/KtD1LupHDUDXyd0ScUvsuPCsh5g.jpg?width=4128&height=4985",
        icon: "Wind",
    },
    {
        id: "2",
        title: "Yoga",
        slug: "yoga",
        description: "Hatha, Yin and Pre/Post Natal Yoga tailored to your needs",
        image: "https://framerusercontent.com/images/ulKC0zaQVFB0eXA7bl1YNDBL0U.jpg?width=1365&height=2048",
        icon: "Heart",
    },
    {
        id: "3",
        title: "Events & Retreats",
        slug: "events-retreats",
        description: "Immersive experiences centered around healing and connection",
        image: "https://framerusercontent.com/images/CgxptZ6gvYpQXkpSI7bFPyJv4OU.jpg?width=3412&height=5118",
        icon: "Sun",
    },
];

// Export para uso en otros componentes (ContactForm)
export { fallbackServices as services };

const Services = ({ isHome }: { isHome: boolean }) => {
    const [services, setServices] = useState<ServiceItem[]>(fallbackServices);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchServices() {
            try {
                const response = await fetch(`/api/services?isActive=true&limit=${isHome ? 3 : 6}`);
                const result = await response.json();

                if (result.success && result.data && result.data.length > 0) {
                    setServices(result.data.map((s: {
                        id: string;
                        title: string;
                        slug: string;
                        slogan?: string;
                        description: string;
                        image: string;
                        icon?: string;
                    }) => ({
                        id: s.id,
                        title: s.title,
                        slug: s.slug,
                        slogan: s.slogan,
                        description: s.description,
                        image: s.image,
                        icon: s.icon,
                    })));
                }
            } catch (error) {
                console.error('Error fetching services:', error);
                // Usar datos de fallback si falla
            } finally {
                setIsLoading(false);
            }
        }

        fetchServices();
    }, [isHome]);

    return (
        <section id="services" className="w-full py-8">
            <div className="container mx-auto px-4">
                {/* Header mejorado */}
                <div className="text-center mb-14 space-y-4">
                    <Badge variant="outline" className="text-primary border-primary/40">
                        <Sparkles className="h-3 w-3 mr-1" />
                        {siteConfig.sections.services.badge}
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                        {siteConfig.sections.services.title}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {siteConfig.sections.services.description}
                    </p>
                </div>

            <div className="flex justify-end mr-10 mb-10">
                <Link 
                    href="/services" 
                    className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                    {siteConfig.sections.services.viewAllText}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="h-[420px] rounded-2xl bg-muted animate-pulse"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <ServiceCard
                                key={service.id}
                                title={service.title}
                                slogan={service.slogan}
                                description={service.description}
                                link={`/services/${service.slug}`}
                                bgImage={service.image}
                                icon={service.icon}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Services;
