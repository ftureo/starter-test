/**
 * Configuración del sitio - ARCHIVO DE EJEMPLO
 * 
 * INSTRUCCIONES:
 * 1. Copia este archivo a site.ts: cp site.example.ts site.ts
 * 2. Personaliza todos los valores según tu proyecto
 * 3. NO commitees site.ts (debe estar en .gitignore)
 * 
 * Este archivo contiene toda la configuración personalizable del sitio:
 * - Branding y textos
 * - Información de contacto
 * - Metadata SEO
 * - Configuración de navegación
 * - Slides del Hero
 * - Textos de secciones
 */

import { FaTools, FaProjectDiagram, FaInfoCircle, FaHandshake } from "react-icons/fa";
import { Printer, PenTool, Box, Lightbulb, Cog, Layers } from "lucide-react";
// import type { IconType } from "react-icons";
// import type { Icon } from "lucide-react";

// ============================================================================
// BRANDING
// ============================================================================

export const siteConfig = {
    // Información básica de la marca
    branding: {
        name: "BAB 3D Printing & Design",
        shortName: "BAB 3D",
        tagline: "Impresión 3D, Diseño y Desarrollo de Soluciones",
        logo: "/logo.png", // Ruta a tu logo en public/
    },

    // ============================================================================
    // METADATA SEO
    // ============================================================================
    seo: {
        title: "BAB 3D - Printing & Design",
        description: "Impresión 3D, Diseño y Desarrollo de Soluciones en CABA",
        url: "https://bab3d.com.ar",
        keywords: [
            "Impresión 3D",
            "Diseño 3D",
            "Desarrollo de Soluciones",
            "CABA",
            "Impresión 3D en CABA",
            "Diseño 3D en CABA",
            "Desarrollo de Soluciones en CABA",
        ],
        openGraph: {
            title: "BAB 3D - Printing & Design",
            description: "Impresión 3D, Diseño y Desarrollo de Soluciones en CABA",
            images: ["/images/slide1.jpg"],
        },
    },

    // ============================================================================
    // INFORMACIÓN DE CONTACTO
    // ============================================================================
    contact: {
        phone: "+54 11 1234-5678",
        email: "contacto@bab3d.com.ar",
        locations: {
            CABA: {
                longTitle: "Sede CABA - Capital Federal",
                shortTitle: "CABA",
                address: "Av. Corrientes 1234, CABA",
            },
            CHIVILCOY: {
                longTitle: "Sede Chivilcoy - Provincia de Buenos Aires",
                shortTitle: "Chivilcoy",
                address: "Calle Principal 567, Chivilcoy",
            },
        },
    },

    // ============================================================================
    // NAVEGACIÓN
    // ============================================================================
    navigation: [
        {
            title: "Servicios",
            href: "/services",
            color: "text-white hover:text-primary",
            icon: FaTools,
        },
        {
            title: "Proyectos",
            href: "/projects",
            color: "text-white hover:text-secondary",
            icon: FaProjectDiagram,
        },
        {
            title: "Detrás de BAB 3D",
            href: "/about",
            color: "text-white hover:text-accent",
            icon: FaInfoCircle,
        },
        {
            title: "Trabajemos juntos",
            href: "/contact",
            color: "text-white hover:text-primary",
            icon: FaHandshake,
        },
    ],

    // ============================================================================
    // HERO SLIDES
    // ============================================================================
    hero: {
        autoplayDelay: 6000, // milisegundos
        slides: [
            {
                id: 1,
                image: "https://res.cloudinary.com/mern-project-fabi/image/upload/v1750042110/bab-3d-printing-design/post-3.jpg",
                title: "Fabricación Digital",
                subtitle: "de Alta Precisión",
                description: "Transformamos tus ideas en objetos reales con tecnología FDM y resina de última generación",
                cta: {
                    label: "Ver Servicios",
                    href: "/services",
                },
                icon: Printer,
                accent: "cyan",
            },
            {
                id: 2,
                image: "https://res.cloudinary.com/mern-project-fabi/image/upload/v1750042063/bab-3d-printing-design/post-1.jpg",
                title: "Diseño 3D",
                subtitle: "Personalizado",
                description: "Creamos modelos optimizados para impresión, desde prototipos hasta producción en serie",
                cta: {
                    label: "Ver Proyectos",
                    href: "/projects",
                },
                icon: PenTool,
                accent: "fuchsia",
            },
            {
                id: 3,
                image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&q=80",
                title: "Innovación",
                subtitle: "Sin Límites",
                description: "De Argentina para el mundo. Consultoría técnica y soluciones a medida para tu proyecto",
                cta: {
                    label: "Contactar",
                    href: "/contact",
                },
                icon: Box,
                accent: "amber",
            },
        ],
    },

    // ============================================================================
    // TEXTOS DE SECCIONES
    // ============================================================================
    sections: {
        services: {
            badge: "Nuestros Servicios",
            title: "A lo que nos dedicamos",
            description: "Soluciones integrales de fabricación digital para dar vida a tus proyectos",
            viewAllText: "Ver todos",
        },
        about: {
            whatWeDo: {
                title: "Qué hacemos",
                description: "Soluciones de fabricación digital de principio a fin. Sin vueltas, con ingeniería.",
            },
            whoWeAre: {
                title: "Quiénes somos",
                description: "Las personas que hacen que cada proyecto cobre vida.",
            },
        },
    },

    // ============================================================================
    // OWNER / FUNDADOR
    // ============================================================================
    owner: {
        name: "Federico Zoppi",
        role: "Founder & Smart Builder",
        image: "https://media.licdn.com/dms/image/v2/D4D03AQH_TwLypa7_iw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718210238726?e=1772668800&v=beta&t=vrpgwl4xaQ0-vq3DIZox5p9FmRQFHuxYsXdKCTYoYeY",
        linkedIn: "https://www.linkedin.com/in/federico-z-91805973/",
        bio: `Ingeniero Industrial con más de 8 años de experiencia (ahre) en desarrollo de soluciones tecnológicas y manufactura aditiva. Apasionado por transformar ideas en productos tangibles, combinando diseño paramétrico, impresión 3D y pensamiento de ingeniería para resolver problemas reales.\n\nFundé BAB 3D con la convicción de que la fabricación digital democratiza la innovación: desde prototipos rápidos para startups hasta piezas funcionales para la industria, cada proyecto es una oportunidad de crear algo que antes no existía.`,
    },

    // ============================================================================
    // MIEMBROS DEL EQUIPO
    // ============================================================================
    team: {
        members: [
            {
                id: "1",
                name: "Federico Zoppi",
                role: "Founder & Smart Builder",
                image: "https://media.licdn.com/dms/image/v2/D4D03AQH_TwLypa7_iw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718210238726?e=1772668800&v=beta&t=vrpgwl4xaQ0-vq3DIZox5p9FmRQFHuxYsXdKCTYoYeY",
                description: "Ingeniero Industrial especializado en manufactura aditiva y desarrollo de productos. Lidera la visión técnica y creativa de BAB 3D, asegurando que cada proyecto combine innovación con calidad de ingeniería.",
            },
            // Agrega más miembros del equipo aquí
            // {
            //     id: "2",
            //     name: "Nombre del Miembro",
            //     role: "Rol del Miembro",
            //     image: "url-de-la-imagen",
            //     description: "Descripción del miembro del equipo",
            // },
        ],
    },

    // ============================================================================
    // PILARES / VALORES
    // ============================================================================
    pillars: [
        {
            icon: Lightbulb,
            title: "Ideación y Diseño",
            description: "Convertimos conceptos abstractos en modelos 3D listos para fabricar, priorizando funcionalidad y estética.",
        },
        {
            icon: Cog,
            title: "Fabricación Digital",
            description: "Impresión 3D con múltiples tecnologías y materiales para prototipos, piezas funcionales y producción en serie corta.",
        },
        {
            icon: Layers,
            title: "Soluciones a Medida",
            description: "Cada desafío es único. Diseñamos procesos completos que integran diseño, producción y acabado según tu necesidad.",
        },
        // Agrega más pilares aquí si es necesario
    ],
} as const;

// Tipos exportados para uso en componentes
export type SiteConfig = typeof siteConfig;
export type HeroSlide = typeof siteConfig.hero.slides[number];
export type NavItem = typeof siteConfig.navigation[number];
export type TeamMember = typeof siteConfig.team.members[number];
export type Pillar = typeof siteConfig.pillars[number];
