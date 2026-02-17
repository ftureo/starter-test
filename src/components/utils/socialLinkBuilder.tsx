import {
    FaYoutube,
    FaInstagram,
    FaFacebookF,
    FaWhatsapp,
} from "react-icons/fa";
import { SOCIAL_LINKS } from "../../lib/constants/socialLinks";


export const socialIcons = [
    {
        Icon: FaYoutube,
        href: SOCIAL_LINKS.YOUTUBE,
        label: "YouTube",
        hoverEffect: "group-hover:shadow-[0_0_15px_rgba(255,0,0,0.5)]",
    },
    {
        Icon: FaInstagram,
        href: SOCIAL_LINKS.INSTAGRAM,
        label: "Instagram",
        hoverEffect: "group-hover:shadow-[0_0_15px_rgba(225,48,108,0.5)]",
    },
    {
        Icon: FaFacebookF,
        href: SOCIAL_LINKS.FACEBOOK,
        label: "Facebook",
        hoverEffect: "group-hover:shadow-[0_0_15px_rgba(66,103,178,0.5)]",
    },
    {
        Icon: FaWhatsapp,
        href: SOCIAL_LINKS.WHATSAPP,
        label: "WhatsApp",
        hoverEffect: "group-hover:shadow-[0_0_15px_rgba(37,211,102,0.5)]",
    },
];
