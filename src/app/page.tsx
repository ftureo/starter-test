"use client";

import React from "react";
import MainLayout from "@/layouts/MainLayout";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import CallToAction from "@/components/common/CallToAction";
import { siteConfig } from "@/config/site";

export default function Home() {
    return (
        <MainLayout>
            <Hero />
            <Services isHome={true} />
            <FeaturedProjects />
            <CallToAction
                title={siteConfig.cta.home.title}
                description={siteConfig.cta.home.description}
                buttonText={siteConfig.cta.home.buttonText}
                href={siteConfig.cta.home.href}
            />
        </MainLayout>
    );
}
