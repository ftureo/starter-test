import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Dashboard | Chloe Yoga",
    description: "Panel de administración de Chloe Yoga",
    keywords: ["admin", "dashboard", "administración", "panel"],
};

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-950">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-800 bg-gray-900">
                <div className="flex h-full flex-col">
                    {/* Logo */}
                    <div className="flex h-16 items-center border-b border-gray-800 px-6">
                        <Link href="/admin" className="text-xl font-bold text-white">
                            Chloe Yoga Admin
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 p-4">
                        <Link
                            href="/admin"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Dashboard
                        </Link>

                        <Link
                            href="/admin/projects"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            Proyectos
                        </Link>

                        <Link
                            href="/admin/services"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Servicios
                        </Link>
                    </nav>

                    {/* Footer */}
                    <div className="border-t border-gray-800 p-4">
                        <Link
                            href="/"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Volver al sitio
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main className="ml-64 min-h-screen">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
