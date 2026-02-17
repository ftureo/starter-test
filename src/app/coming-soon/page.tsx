import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Clock, ArrowLeft, Sparkles } from "lucide-react";

export const metadata: Metadata = {
    title: "Próximamente | BAB 3D",
    description: "Esta sección estará disponible pronto",
    keywords: ["próximamente", "coming soon", "en construcción"],
};

interface ComingSoonPageProps {
    searchParams: Promise<{ from?: string; message?: string }>;
}

export default async function ComingSoonPage({ searchParams }: ComingSoonPageProps) {
    const { from, message } = await searchParams;
    
    const displayMessage = message || "Esta sección estará disponible próximamente";
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background flex items-center justify-center p-4">
            <div className="max-w-lg w-full text-center space-y-8">
                {/* Icono animado */}
                <div className="relative inline-flex">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                    <div className="relative p-6 rounded-2xl bg-primary/10 border border-primary/20">
                        <Clock className="h-12 w-12 text-primary" />
                    </div>
                </div>

                {/* Título */}
                <div className="space-y-3">
                    <h1 className="text-4xl md:text-5xl font-black text-foreground">
                        Próximamente
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        {displayMessage}
                    </p>
                </div>

                {/* Info adicional */}
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                    <div className="flex items-center justify-center gap-2 text-primary">
                        <Sparkles className="h-5 w-5" />
                        <span className="font-semibold">Estamos trabajando en ello</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                        Nuestro equipo está preparando contenido increíble para esta sección.
                        Mientras tanto, explorá lo que ya tenemos disponible.
                    </p>
                </div>

                {/* Acciones */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Volver al inicio
                    </Link>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-foreground font-semibold rounded-lg hover:bg-secondary/80 transition-colors border border-border"
                    >
                        Contactanos
                    </Link>
                </div>

                {/* Debug info (solo desarrollo) */}
                {process.env.NODE_ENV === 'development' && from && (
                    <p className="text-xs text-muted-foreground">
                        Ruta bloqueada: <code className="text-foreground/80">{from}</code>
                    </p>
                )}
            </div>
        </div>
    );
}
