import React from "react";
import { Toaster } from "sonner";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <>
            <Toaster position="top-right" richColors />
            <Navbar />
            <main className="flex flex-col items-center justify-center gap-10 p-8 bg-gradient-to-br from-background via-secondary/30 to-background text-foreground pt-32">
                {children}
            </main>
            <Footer />
        </>
    );
};

export default MainLayout; 