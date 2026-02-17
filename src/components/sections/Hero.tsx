"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import "swiper/css";
import "swiper/css/effect-fade";

// Obtener configuración del hero desde siteConfig
const HERO_SLIDES = siteConfig.hero.slides;
const AUTOPLAY_DELAY = siteConfig.hero.autoplayDelay;

const Hero = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const swiperRef = useRef<SwiperType | null>(null);
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const activeSlide = HERO_SLIDES[activeIndex];

    // Manejar el progreso del autoplay
    const startProgress = useCallback(() => {
        setProgress(0);
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
        }
        
        const interval = 50; // Update cada 50ms
        const steps = AUTOPLAY_DELAY / interval;
        let currentStep = 0;

        progressIntervalRef.current = setInterval(() => {
            currentStep++;
            setProgress((currentStep / steps) * 100);
            
            if (currentStep >= steps) {
                clearInterval(progressIntervalRef.current!);
            }
        }, interval);
    }, []);

    const handleSlideChange = useCallback((swiper: SwiperType) => {
        setActiveIndex(swiper.realIndex);
        startProgress();
    }, [startProgress]);

    const goToSlide = useCallback((index: number) => {
        if (swiperRef.current) {
            swiperRef.current.slideToLoop(index);
        }
    }, []);

    // Iniciar progreso al montar
    useEffect(() => {
        startProgress();
        return () => {
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
            }
        };
    }, [startProgress]);

    return (
        <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden">
            {/* Background Swiper (imágenes) */}
            <div className="absolute inset-0">
                <Swiper
                    modules={[Autoplay, EffectFade]}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    autoplay={{ 
                        delay: AUTOPLAY_DELAY, 
                        disableOnInteraction: false 
                    }}
                    loop
                    speed={1000}
                    onSwiper={(swiper) => { swiperRef.current = swiper; }}
                    onSlideChange={handleSlideChange}
                    className="h-full w-full"
                >
                    {HERO_SLIDES.map((slide, index) => (
                        <SwiperSlide key={slide.id}>
                            <div className="relative w-full h-full">
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    sizes="100vw"
                                    className={cn(
                                        "object-cover transition-transform duration-[6000ms] ease-out",
                                        activeIndex === index ? "scale-110" : "scale-100"
                                    )}
                                    priority={index === 0}
                                />
                                {/* Overlay gradiente */}
                                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Contenido del Hero */}
            <div className="relative z-10 container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Texto principal */}
                    <div className="space-y-6">
                        {/* Badge con icono */}
                        <div 
                            className={cn(
                                "inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border transition-all duration-500",
                                activeSlide.accent === "primary" && "bg-primary/15 border-primary/40 text-primary",
                                activeSlide.accent === "accent" && "bg-accent/15 border-accent/40 text-accent"
                            )}
                        >
                            <activeSlide.icon className="h-4 w-4" />
                            <span className="text-sm font-medium">{siteConfig.branding.shortName}</span>
                        </div>

                        {/* Título animado */}
                        <div className="space-y-2">
                            <h1 
                                key={`title-${activeIndex}`}
                                className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700"
                            >
                                {activeSlide.title}
                            </h1>
                            <h2 
                                key={`subtitle-${activeIndex}`}
                                className={cn(
                                    "text-3xl md:text-5xl lg:text-6xl font-black leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100",
                                    activeSlide.accent === "primary" && "text-primary",
                                    activeSlide.accent === "accent" && "text-accent"
                                )}
                            >
                                {activeSlide.subtitle}
                            </h2>
                        </div>

                        {/* Descripción */}
                        <p 
                            key={`desc-${activeIndex}`}
                            className="text-lg md:text-xl text-gray-300 max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200"
                        >
                            {activeSlide.description}
                        </p>

                        {/* CTA */}
                        <Link
                            href={activeSlide.cta.href}
                            className={cn(
                                "inline-flex items-center gap-3 px-6 py-3 rounded-lg font-semibold transition-all duration-300 group animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300",
                                activeSlide.accent === "primary" && "bg-primary hover:bg-primary/90 text-primary-foreground",
                                activeSlide.accent === "accent" && "bg-accent hover:bg-accent/90 text-accent-foreground"
                            )}
                        >
                            {activeSlide.cta.label}
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Panel de navegación */}
                    <div className="hidden lg:flex flex-col items-end justify-center gap-4">
                        {HERO_SLIDES.map((slide, index) => (
                            <button
                                key={slide.id}
                                onClick={() => goToSlide(index)}
                                className={cn(
                                    "group flex items-center gap-4 p-3 rounded-xl transition-all duration-300 w-full max-w-sm",
                                    activeIndex === index 
                                        ? "bg-white/10 backdrop-blur-sm" 
                                        : "hover:bg-white/5"
                                )}
                            >
                                {/* Thumbnail */}
                                <div className={cn(
                                    "relative w-16 h-16 rounded-lg overflow-hidden shrink-0 transition-all duration-300",
                                    activeIndex === index && "ring-2",
                                    activeIndex === index && slide.accent === "primary" && "ring-primary",
                                    activeIndex === index && slide.accent === "accent" && "ring-accent"
                                )}>
                                    <Image
                                        src={slide.image}
                                        alt={slide.title}
                                        fill
                                        className="object-cover"
                                        sizes="64px"
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex-1 text-left">
                                    <p className={cn(
                                        "font-semibold transition-colors",
                                        activeIndex === index ? "text-white" : "text-gray-400 group-hover:text-white"
                                    )}>
                                        {slide.title}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {slide.subtitle}
                                    </p>
                                </div>

                                {/* Progress indicator (solo para el activo) */}
                                {activeIndex === index && (
                                    <div className="w-10 h-10 relative">
                                        <svg className="w-10 h-10 -rotate-90">
                                            <circle
                                                cx="20"
                                                cy="20"
                                                r="16"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                fill="none"
                                                className="text-white/20"
                                            />
                                            <circle
                                                cx="20"
                                                cy="20"
                                                r="16"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                fill="none"
                                                strokeDasharray={`${2 * Math.PI * 16}`}
                                                strokeDashoffset={`${2 * Math.PI * 16 * (1 - progress / 100)}`}
                                                className={cn(
                                                    "transition-all duration-100",
                                                    slide.accent === "primary" && "text-primary",
                                                    slide.accent === "accent" && "text-accent"
                                                )}
                                            />
                                        </svg>
                                        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                                            {index + 1}
                                        </span>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Dots móviles */}
                <div className="flex lg:hidden justify-center gap-2 mt-8">
                    {HERO_SLIDES.map((slide, index) => (
                        <button
                            key={slide.id}
                            onClick={() => goToSlide(index)}
                            className={cn(
                                "h-2 rounded-full transition-all duration-300",
                                activeIndex === index 
                                    ? cn(
                                        "w-8",
                                        slide.accent === "primary" && "bg-primary",
                                        slide.accent === "accent" && "bg-accent"
                                    )
                                    : "w-2 bg-white/30 hover:bg-white/50"
                            )}
                            aria-label={`Ir a slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Decoración inferior */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </section>
    );
};

export default Hero;
