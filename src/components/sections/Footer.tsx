"use client";

import React from "react";
import AnimatedElement from "@/components/common/AnimatedElement";
import {
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaEnvelope,
} from "react-icons/fa";
import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/constants/socialLinks";
import { CONTACT_INFO } from "@/lib/constants/contactInformation";
import { socialIcons } from "@/components/utils/socialLinkBuilder";

const Footer = () => (
    <footer className="w-full backdrop-blur-md bg-secondary/50 border-t border-border text-foreground py-8 px-4 sm:px-8 text-center text-sm">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                {/* Contacto */}
                <div className="text-center">
                    <h4 className="text-lg font-semibold mb-4 text-primary">
                        Contact
                    </h4>
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center justify-center gap-2">
                            <FaPhoneAlt className="text-primary" />
                            <a
                                href={SOCIAL_LINKS.PHONE_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary transition-colors"
                            >
                                {CONTACT_INFO.PHONE}
                            </a>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <FaEnvelope className="text-primary" />
                            <a
                                href={`mailto:${SOCIAL_LINKS.MAIL}`}
                                className="hover:text-primary transition-colors"
                            >
                                {SOCIAL_LINKS.MAIL}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Ubicaciones */}
                <div className="text-center">
                    <h4 className="text-lg font-semibold mb-4">
                        Locations
                    </h4>
                    <div className="flex flex-col items-center gap-2">
                        <Link
                            href="/contact"
                            className="flex items-center justify-center gap-2 hover:text-primary transition-colors"
                        >
                            <FaMapMarkerAlt className="text-primary" />
                            <span>{CONTACT_INFO.LOCATIONS.CABA.SHORT_TITLE}</span>
                        </Link>
                        <Link
                            href="/contact"
                            className="flex items-center justify-center gap-2 hover:text-primary transition-colors"
                        >
                            <FaMapMarkerAlt className="text-primary" />
                            <span>{CONTACT_INFO.LOCATIONS.CHIVILCOY.SHORT_TITLE}</span>
                        </Link> 
                    </div>
                </div>

                {/* Redes Sociales */}
                <div className="text-center">
                    <h4 className="text-lg font-semibold mb-4 text-primary">
                        Follow
                    </h4>
                    <div className="flex justify-center items-center gap-4">
                        {socialIcons.map(
                            ({ Icon, href, label, hoverEffect }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group"
                                    aria-label={label}
                                >
                                    <Icon
                                        className={`text-2xl text-accent transition-all duration-300 group-hover:scale-125 ${hoverEffect}`}
                                    />
                                </a>
                            )
                        )}
                    </div>
                </div>

                {/* Owner Info */}
                <div className="text-center">
                    <h4 className="text-lg font-semibold mb-4 text-primary">
                        About
                    </h4>
                    <p className="text-sm">{CONTACT_INFO.NAME}</p>
                    <p className="text-xs mt-2 text-muted-foreground">
                        {CONTACT_INFO.BRAND}
                    </p>
                </div>
            </div>

            <div className="border-t border-border pt-4">
                <p className="text-xs text-muted-foreground">
                    © {new Date().getFullYear()} {CONTACT_INFO.BRAND} — All
                    Rights Reserved
                </p>
                <AnimatedElement>
                    <p className="text-xs mt-2">
                        Powered by{" "}
                        <a
                            href="https://github.com/ftureo"
                            className="text-accent hover:text-accent/80 transition-colors"
                        >
                            Dev on Flight
                        </a>
                    </p>
                </AnimatedElement>
            </div>
        </div>
    </footer>
);

export default Footer; 