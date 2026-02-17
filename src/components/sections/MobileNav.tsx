"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FaTools, FaProjectDiagram, FaInfoCircle, FaHandshake } from "react-icons/fa";

const navItems = [
    {
        title: "Servicios",
        href: "/services",
        icon: FaTools,
        color: "hover:text-primary"
    },
    {
        title: "Proyectos",
        href: "/projects",
        icon: FaProjectDiagram,
        color: "hover:text-secondary"
    },
    {
        title: "Detrás de BAB 3D",
        href: "/about",
        icon: FaInfoCircle,
        color: "hover:text-accent"
    },
    {
        title: "Trabajemos juntos",
        href: "/contact",
        icon: FaHandshake,
        color: "hover:text-primary"
    }
];

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    className="md:hidden p-2 hover:bg-muted"
                    aria-label="Toggle Menu"
                >
                    <Menu className="h-6 w-6 text-foreground" />
                </Button>
            </SheetTrigger>
            <SheetContent 
                side="right" 
                className="w-[300px] bg-background backdrop-blur-md border-l border-border px-6"
            >
                <div className="flex flex-col h-full py-8">
                    <div className="flex items-center justify-between mb-16">
                        <Link 
                            href="/" 
                            className="text-2xl font-bold text-foreground tracking-tight hover:opacity-90 transition-opacity"
                            onClick={() => setIsOpen(false)}
                        >
                            BAB 3D - <span className="text-primary">Soluciones</span>
                            {/* <span className="text-accent">&</span> */}
                            <span className="text-secondary">3D</span>
                        </Link>
                        <Button
                            variant="ghost"
                            className="p-2 hover:bg-muted"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close menu"
                        >
                            <X className="h-6 w-6 text-foreground" />
                        </Button>
                    </div>
                    <nav className="flex flex-col gap-8" aria-label="Mobile navigation">
                        <AnimatePresence>
                            {navItems.map((item, index) => {
                                const isActive = pathname === item.href;
                                return (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.1, delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "flex items-center gap-4 text-lg font-medium text-foreground transition-colors group",
                                                item.color,
                                                isActive && "text-primary"
                                            )}
                                            onClick={() => setIsOpen(false)}
                                            aria-current={isActive ? "page" : undefined}
                                        >
                                            {item.icon && (
                                                <item.icon className={cn(
                                                    "h-5 w-5 transition-colors",
                                                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                                )} />
                                            )}
                                            <span className="font-semibold">{item.title}</span>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </nav>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNav; 