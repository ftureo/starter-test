"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaHome, FaArrowLeft } from "react-icons/fa";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background">
            <Navbar />
            <main className="container mx-auto px-4 py-24">
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                        <h1 className="text-6xl font-bold text-foreground">404</h1>
                        <h2 className="text-2xl font-semibold text-foreground">Página no encontrada</h2>
                        <p className="text-muted-foreground max-w-md mx-auto">
                            Lo sentimos, la página que estás buscando no existe o ha sido movida.
                        </p>
                                            </motion.div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                        <Button
                            asChild
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-white"
                        >
                            <Link href="/" className="flex items-center gap-2">
                                <FaHome className="h-5 w-5" />
                                Volver al inicio
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-border text-foreground hover:bg-muted"
                            onClick={() => window.history.back()}
                        >
                            <span className="flex items-center gap-2">
                                <FaArrowLeft className="h-5 w-5" />
                                Volver atrás
                            </span>
                        </Button>
                        </motion.div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
} 