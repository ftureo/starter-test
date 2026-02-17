"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import MobileNav from "./MobileNav";
import { navItems } from "@/constants/navigation";

const Navbar = () => {
    const pathname = usePathname();

    return (
        <header className="fixed top-0 w-full bg-background/95 backdrop-blur-md z-50 py-4 px-4 md:px-8 flex justify-between items-center mb-4 shadow-sm border-b border-border">
            <Link href="/" className="text-foreground text-lg md:text-xl font-bold hover:opacity-90 transition-opacity">
                <motion.span
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <span className="text-primary">Initializer</span>
                </motion.span>  
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-6 text-foreground" aria-label="Main navigation">
                {navItems.map((item, index) => {
                    const isActive = pathname === item.href;
                    return (
                        <motion.div
                            key={item.href}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                        >
                            <Link
                                href={item.href}
                                className={cn(
                                    "text-lg font-medium transition-colors relative group",
                                    item.color,
                                    isActive && "text-primary"
                                )}
                                aria-current={isActive ? "page" : undefined}
                            >
                                {item.title}
                                <div className={cn(
                                    "absolute bottom-0 left-0 h-0.5 bg-current transition-all duration-200",
                                    isActive ? "w-full" : "w-0 group-hover:w-full"
                                )} />
                            </Link>
                        </motion.div>
                    );
                })}
            </nav>

            {/* Mobile Navigation */}
            <MobileNav />
        </header>
    );
};

export default Navbar; 