/**
 * Configuracion del sitio
 * 
 * Datos derivados del scraping de https://www.chloeokeeffe.ie/
 * Paleta: terracotta / sand / wine (elegant, light)
 * 
 * Campos marcados con "placeholder" requieren datos reales del cliente.
 */

import { FaHeart, FaCalendarAlt, FaUser, FaEnvelope } from "react-icons/fa";
import { Heart, Wind, Compass, Sun } from "lucide-react";
// import type { Icon } from "lucide-react";

// ============================================================================
// BRANDING
// ============================================================================

export const siteConfig = {
    branding: {
        name: "Chloe O'Keeffe",
        shortName: "Yoga with Chloe",
        tagline: "Mindful living for the Modern world.",
        logo: "/logo.png",
    },

    // ============================================================================
    // METADATA SEO
    // ============================================================================
    seo: {
        title: "Chloe O'Keeffe | Yoga & Breathwork",
        description: "Yoga, breathwork, and meditation to cultivate clarity and deep connection. Bridging yogic wisdom, poetry and modern mindfulness.",
        url: "https://www.chloeokeeffe.ie",
        keywords: [
            "Yoga",
            "Breathwork",
            "Meditation",
            "Retreats",
            "Events",
            "Mindfulness",
            "Dublin",
            "Ireland",
            "Prenatal Yoga",
            "Healing",
        ],
        openGraph: {
            title: "Chloe O'Keeffe | Yoga & Breathwork",
            description: "Mindful living for the Modern world.",
            images: ["https://framerusercontent.com/images/nPjNzykNTzmY3eb37MsYbG6aIA.jpg"],
        },
    },

    // ============================================================================
    // INFORMACION DE CONTACTO
    // ============================================================================
    contact: {
        phone: "+353 XX XXX XXXX", // placeholder
        email: "hello@chloeokeeffe.ie", // placeholder
        form: {
            title: "Let's make this real. Tell me what it's about.",
            submitButtonText: "Send Message",
        },
        locations: {
            CABA: {
                longTitle: "Yoga Hub - Blackrock",
                shortTitle: "Blackrock",
                address: "Blackrock, Co. Dublin, Ireland",
            },
            CHIVILCOY: {
                longTitle: "Yoga Dublin - Ranelagh",
                shortTitle: "Ranelagh",
                address: "Ranelagh, Dublin 6, Ireland",
            },
        },
    },

    // ============================================================================
    // NAVEGACION
    // ============================================================================
    navigation: [
        {
            title: "Offerings",
            href: "/services",
            color: "text-foreground hover:text-primary",
            icon: FaHeart,
        },
        {
            title: "Events & Retreats",
            href: "/projects",
            color: "text-foreground hover:text-accent",
            icon: FaCalendarAlt,
        },
        {
            title: "About Chloe",
            href: "/about",
            color: "text-foreground hover:text-primary",
            icon: FaUser,
        },
        {
            title: "Get in Touch",
            href: "/contact",
            color: "text-foreground hover:text-primary",
            icon: FaEnvelope,
        },
    ],

    // ============================================================================
    // HERO SLIDES
    // ============================================================================
    hero: {
        autoplayDelay: 6000,
        slides: [
            {
                id: 1,
                image: "https://framerusercontent.com/images/CgxptZ6gvYpQXkpSI7bFPyJv4OU.jpg?width=3412&height=5118",
                title: "Yoga with Chloe",
                subtitle: "Mindful Living",
                description: "Reconnect with yourself and live with ease through a tailored approach to yoga and breathwork",
                cta: {
                    label: "Explore Offerings",
                    href: "/services",
                },
                icon: Heart,
                accent: "primary",
            },
            {
                id: 2,
                image: "https://framerusercontent.com/images/KtD1LupHDUDXyd0ScUvsuPCsh5g.jpg?width=4128&height=4985",
                title: "Yoga & Breathwork",
                subtitle: "Transform Your Practice",
                description: "Weekly classes and 1:1 sessions designed to remove mental and physical blockages",
                cta: {
                    label: "View Classes",
                    href: "/services",
                },
                icon: Wind,
                accent: "accent",
            },
            {
                id: 3,
                image: "https://framerusercontent.com/images/ulKC0zaQVFB0eXA7bl1YNDBL0U.jpg?width=1365&height=2048",
                title: "Events & Retreats",
                subtitle: "Unplug & Reconnect",
                description: "Immersive experiences centered around Transformational Breathwork, Healing circles and Yoga",
                cta: {
                    label: "Discover More",
                    href: "/projects",
                },
                icon: Compass,
                accent: "primary",
            },
        ],
    },

    // ============================================================================
    // TEXTOS DE SECCIONES
    // ============================================================================
    sections: {
        services: {
            badge: "My Offerings",
            title: "What I Offer",
            description: "Yoga, breathwork, and meditation to cultivate a life of clarity and deep connection",
            viewAllText: "View all",
        },
        projects: {
            title: "Events & Retreats",
            description: "A curated selection of retreats and experiences. Unplug, reconnect, and transform.",
        },
        featuredProjects: {
            badge: "Featured",
            title: "Upcoming Events & Experiences",
            description: "A curated selection of retreats and events",
            viewAllText: "View all",
        },
        about: {
            whatWeDo: {
                title: "What I Do",
                description: "Bridging yogic wisdom, poetry and modern mindfulness to help you find true balance in a fast-paced world.",
            },
            whoWeAre: {
                title: "About Chloe",
                description: "The person behind every class, every breath, every journey.",
            },
        },
    },

    // ============================================================================
    // OWNER / FUNDADOR
    // ============================================================================
    owner: {
        name: "Chloe O'Keeffe",
        role: "Yoga Teacher, Breathwork Facilitator & Retreat Host",
        image: "https://framerusercontent.com/images/nPjNzykNTzmY3eb37MsYbG6aIA.jpg",
        linkedIn: "#", // placeholder
        bio: `I guide students through yoga, breathwork, and meditation to cultivate a life of clarity and deep connection. My offerings bridge yogic wisdom, poetry and modern mindfulness to help you find true balance in a fast-paced world.\n\nI teach weekly classes and offer 1:1 sessions in Breathwork and Yoga including Prenatal Yoga. My tailored approach focuses on removing mental and physical blockages, helping you reconnect with yourself and live with ease.`,
    },

    // ============================================================================
    // MIEMBROS DEL EQUIPO
    // ============================================================================
    team: {
        members: [
            {
                id: "1",
                name: "Chloe O'Keeffe",
                role: "Founder & Yoga Teacher",
                image: "https://framerusercontent.com/images/nPjNzykNTzmY3eb37MsYbG6aIA.jpg",
                description: "Yoga teacher, breathwork facilitator and retreat host. Guiding students to cultivate clarity and deep connection through yogic wisdom and modern mindfulness.",
            },
        ],
    },

    // ============================================================================
    // PILARES / VALORES
    // ============================================================================
    cta: {
        home: {
            title: "Begin Your Journey",
            description: "Whether you're curious about yoga, breathwork, or retreats — let's find the right path for you.",
            buttonText: "Get in Touch",
            href: "/contact",
        },
        contact: {
            title: "Begin Your Journey",
            description: "Explore my offerings and find the practice that resonates with you.",
            buttonText: "Explore Offerings",
            href: "/services",
        },
        servicesSlug: {
            title: "Ready to dive deeper?",
            description: "Get in touch and we'll find the right offering for you.",
            buttonText: "Get in Touch",
            href: "/contact",
        },
        projectSlug: {
            title: "Want an experience like this?",
            description: "Let's talk about your next retreat or event.",
            buttonText: "Get in Touch",
            href: "/contact",
        },
    },

    pillars: [
        {
            icon: Wind,
            title: "Breathwork",
            description: "Experience the transformative power of conscious breathing. Release stored tension, clear mental blockages, and regulate your nervous system.",
        },
        {
            icon: Heart,
            title: "Yoga",
            description: "Hatha, Yin and Pre/Post Natal Yoga. Corporate classes and personalised one to one programs, completely tailored to your needs.",
        },
        {
            icon: Sun,
            title: "Events & Retreats",
            description: "From cozy indoor winter gatherings to summer circles along the coast. Immersive experiences that move with the rhythm of the seasons.",
        },
    ],
} as const;

// Tipos exportados para uso en componentes
export type SiteConfig = typeof siteConfig;
export type HeroSlide = typeof siteConfig.hero.slides[number];
export type NavItem = typeof siteConfig.navigation[number];
export type TeamMember = typeof siteConfig.team.members[number];
export type Pillar = typeof siteConfig.pillars[number];
