import type { Metadata } from "next";
import { Afacad_Flux } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

/**
 * Configuración de fuente
 * 
 * Para cambiar la fuente, importa una diferente de next/font/google
 * y actualiza la variable CSS en theme.ts
 * Ejemplo: import { Inter } from "next/font/google";
 */
const afacadFlux = Afacad_Flux({
    variable: "--font-afacad-flux",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    metadataBase: new URL(siteConfig.seo.url),
    keywords: [...siteConfig.seo.keywords],
    openGraph: {
        title: siteConfig.seo.openGraph.title,
        description: siteConfig.seo.openGraph.description,
        images: [...siteConfig.seo.openGraph.images],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={afacadFlux.variable}>{children}</body>
        </html>
    );
}
