"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { SOCIAL_LINKS } from "@/lib/constants/socialLinks";
import { siteConfig } from "@/config/site";

interface ServiceOption {
    id: string;
    title: string;
}

const ContactForm = () => {
    const [services, setServices] = useState<ServiceOption[]>([]);

    useEffect(() => {
        async function fetchServices() {
            try {
                const response = await fetch('/api/services?isActive=true&limit=20');
                const result = await response.json();

                if (result.success && result.data && result.data.length > 0) {
                    setServices(result.data.map((s: { id: string; title: string }) => ({
                        id: s.id,
                        title: s.title,
                    })));
                }
            } catch (error) {
                console.error('Error fetching services for contact form:', error);
            }
        }

        fetchServices();
    }, []);

    return (
        <section className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-sm">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-semibold text-foreground mb-8">
                    {siteConfig.contact.form.title}
                </h2>

                <form className="space-y-6">
                    {/* Grilla principal: campos a la izquierda, textarea a la derecha */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Columna izquierda: todos los campos */}
                        <div className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                                        Nombre *
                                    </label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Tu nombre"
                                        required
                                        className="bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                                        Email *
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="tu@email.com"
                                        required
                                        className="bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                                    />
                                </div>
                            </div>

                            {/* WhatsApp */}
                            <div className="space-y-2">
                                <label htmlFor="whatsapp" className="text-sm font-medium text-foreground">
                                    WhatsApp
                                </label>
                                <div className="flex gap-2">
                                    <Input
                                        id="whatsapp"
                                        type="tel"
                                        placeholder="+54 9 11 1234-5678"
                                        className="bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary flex-1"
                                    />
                                    <a
                                        href={SOCIAL_LINKS.WHATSAPP}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-1.5 px-3 rounded-md bg-green-600/20 border border-green-500/30 text-green-600 hover:bg-green-600/30 transition-colors shrink-0"
                                        title="Chateá con nosotros por WhatsApp"
                                    >
                                        <FaWhatsapp className="h-4 w-4" />
                                    </a>
                                </div>
                            </div>

                            {/* Asunto */}
                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium text-foreground">
                                    Asunto
                                </label>
                                <Input
                                    id="subject"
                                    type="text"
                                    placeholder="¿En qué podemos ayudarte?"
                                    className="bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                                />
                            </div>

                            {/* Servicio de interés */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">
                                    Servicio de interés
                                </label>
                                <Select>
                                    <SelectTrigger className="bg-background border-border text-foreground data-[placeholder]:text-muted-foreground">
                                        <SelectValue placeholder="Seleccioná un servicio" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {services.length > 0 ? (
                                            services.map((service) => (
                                                <SelectItem key={service.id} value={service.id}>
                                                    {service.title}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <SelectItem value="general" disabled>
                                                Cargando servicios...
                                            </SelectItem>
                                        )}
                                        <SelectItem value="otro">Otro</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Columna derecha: textarea ocupa toda la altura */}
                        <div className="space-y-2 flex flex-col">
                            <label htmlFor="message" className="text-sm font-medium text-foreground">
                                Mensaje *
                            </label>
                            <Textarea
                                id="message"
                                placeholder="Contanos más sobre tu proyecto, las cantidades, materiales preferidos, o cualquier detalle que nos ayude a darte la mejor solución..."
                                required
                                className="flex-1 min-h-[200px] lg:min-h-0 bg-background border-border text-foreground placeholder:text-muted-foreground resize-none focus-visible:ring-primary"
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                        {siteConfig.contact.form.submitButtonText}
                    </Button>
                </form>
            </motion.div>
        </section>
    );
};

export default ContactForm;
