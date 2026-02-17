"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import ContactForm from "@/components/common/ContactForm";
import { CONTACT_INFO } from "@/lib/constants/contactInformation";
import { SOCIAL_LINKS } from "@/lib/constants/socialLinks";
import CallToAction from "@/components/common/CallToAction";
import { siteConfig } from "@/config/site";

const locations = [
    {
        id: "caba",
        title: CONTACT_INFO.LOCATIONS.CABA.LONG_TITLE,
        shortTitle: CONTACT_INFO.LOCATIONS.CABA.SHORT_TITLE,
        address: CONTACT_INFO.LOCATIONS.CABA.ADDRESS,
        mapUrl: "https://maps.app.goo.gl/tv7BSJxX6tXjWEv37",
        embedUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.432515820383!2d-58.3609175!3d-34.6185088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a335006537713d%3A0x1af13cad9d46a449!2sEstudio%20Jur%C3%ADdico%20Perez%20Mora%20%26%20Asociados!5e0!3m2!1ses-419!2suy!4v1740669877921!5m2!1ses-419!2suy",
    },
    {
        id: "chivilcoy",
        title: CONTACT_INFO.LOCATIONS.CHIVILCOY.LONG_TITLE,
        shortTitle: CONTACT_INFO.LOCATIONS.CHIVILCOY.SHORT_TITLE,
        address: CONTACT_INFO.LOCATIONS.CHIVILCOY.ADDRESS,
        mapUrl: "https://maps.app.goo.gl/jpgiJNkgKQT54CFNA",
        embedUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.432515820383!2d-58.3609175!3d-34.6185088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a335006537713d%3A0x1af13cad9d46a449!2sEstudio%20Jur%C3%ADdico%20Perez%20Mora%20%26%20Asociados!5e0!3m2!1ses-419!2suy!4v1740669877921!5m2!1ses-419!2suy",
    },
];

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background">
            <Navbar />
            <main className="container mx-auto px-4 md:px-12 py-24">
                <div className="space-y-16">
                    {/* Encabezado */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center space-y-4"
                    >
                        <h1 className="text-4xl font-bold text-foreground">Get in Touch</h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            I`&apos;`d love to hear from you. Whether you have a question about classes,
                            events, or retreats — let`&apos;`s connect.
                        </p>

                        {/* Datos de contacto rápido */}
                        <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
                            <a
                                href={`tel:${CONTACT_INFO.PHONE}`}
                                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                            >
                                <FaPhoneAlt className="h-4 w-4" />
                                <span className="font-medium">{CONTACT_INFO.PHONE}</span>
                            </a>
                            <a
                                href={`mailto:${SOCIAL_LINKS.MAIL}`}
                                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <FaEnvelope className="h-4 w-4" />
                                <span className="font-medium">{SOCIAL_LINKS.MAIL}</span>
                            </a>
                            <a
                                href={SOCIAL_LINKS.WHATSAPP}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                            >
                                <FaWhatsapp className="h-4 w-4" />
                                <span className="font-medium">WhatsApp</span>
                            </a>
                        </div>
                    </motion.div>

                    {/* Formulario de contacto */}
                    <ContactForm />

                    {/* Ubicaciones */}
                    <div className="space-y-8">
                        <h2 className="text-2xl font-semibold text-foreground text-center">
                            Where to Find Me
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {locations.map((location, index) => (
                                <motion.div
                                    key={location.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.15 }}
                                    className="bg-card border border-border rounded-lg p-6"
                                >
                                    <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                                        <FaMapMarkerAlt className="text-primary shrink-0" />
                                        {location.title}
                                    </h3>
                                    <p className="text-muted-foreground mb-4 text-sm">{location.address}</p>
                                    <div className="w-full h-[220px] md:h-[260px] mb-4">
                                        <iframe
                                            src={location.embedUrl}
                                            className="w-full h-full rounded-lg"
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        />
                                    </div>
                                    <a
                                        href={location.mapUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-primary text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
                                    >
                                        View on Google Maps
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <CallToAction
                title={siteConfig.cta.contact.title}
                description={siteConfig.cta.contact.description}
                buttonText={siteConfig.cta.contact.buttonText}
                href={siteConfig.cta.contact.href}
            />
            <Footer />
        </div>
    );
}
