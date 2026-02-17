import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Testimonials from "@/components/sections/Testimonials";
import { Linkedin } from "lucide-react";
import { siteConfig, type TeamMember } from "@/config/site";

export const metadata: Metadata = {
    title: `About ${siteConfig.branding.shortName} | ${siteConfig.branding.name}`,
    description: `Meet Chloe. Yoga teacher, breathwork facilitator, and retreat host.`,
    keywords: [...[...siteConfig.seo.keywords]],
};

// Obtener datos desde la configuración centralizada
const owner = siteConfig.owner;
const pillars = siteConfig.pillars;
const teamMembers = siteConfig.team.members;

// ── Componente de card de miembro ───────────────────────────────
function TeamMemberCard({ member, isAlone }: { member: TeamMember; isAlone: boolean }) {
    return (
        <div
            className={`flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-card border border-border rounded-2xl p-6 md:p-8 transition-colors hover:border-primary/30 ${
                isAlone ? "max-w-2xl mx-auto" : ""
            }`}
        >
            {/* Foto */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0 border border-border">
                <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                />
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left space-y-2">
                <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                <p className="text-sm font-medium text-primary">{member.role}</p>
                <p className="text-muted-foreground leading-relaxed text-sm">
                    {member.description}
                </p>
            </div>
        </div>
    );
}

// ── Page ────────────────────────────────────────────────────────
export default function AboutPage() {
    const isOneMember = teamMembers.length === 1;

    return (
        <div className="min-h-screen bg-gradient-to-b from-background/15 via-secondary/20 to-background/70">
            <Navbar />

            <main className="container mx-auto px-4 py-24 space-y-28">
                {/* ───── OWNER ───── — Fondo wine oscuro para contraste */}
                <section
                    className="max-w-5xl mx-auto rounded-3xl border border-[#7e212e]/40 p-8 md:p-12 shadow-lg"
                    style={{
                        background: 'linear-gradient(to bottom right, rgba(126, 33, 46, 0.45), rgba(176, 107, 112, 0.35), rgba(126, 33, 46, 0.55))',
                    }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
                        {/* Foto perfil */}
                        <div className="md:col-span-2 flex justify-center">
                            <div className="relative">
                                <div className="w-52 h-52 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-accent/30 shadow-lg shadow-accent/10">
                                    <Image
                                        src={owner.image}
                                        alt={owner.name}
                                        fill
                                        className="object-cover"
                                        sizes="240px"
                                        priority
                                    />
                                </div>
                                {/* Badge LinkedIn */}
                                <a
                                    href={owner.linkedIn}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute bottom-2 right-2 p-2.5 rounded-full bg-[#0A66C2] text-white shadow-lg hover:scale-110 transition-transform"
                                    title="Ver perfil en LinkedIn"
                                >
                                    <Linkedin className="h-5 w-5" />
                                </a>
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="md:col-span-3 space-y-4">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                                    {owner.name}
                                </h1>
                                <p className="text-primary font-medium mt-1">{owner.role}</p>
                            </div>
                            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                {owner.bio}
                            </p>
                        </div>
                    </div>
                </section>

                {/* ───── QUÉ HACEMOS ───── */}
                <section className="max-w-5xl mx-auto space-y-12">
                    <div className="text-center space-y-3">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                            {siteConfig.sections.about.whatWeDo.title}
                        </h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            {siteConfig.sections.about.whatWeDo.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {pillars.map((pillar) => (
                            <div
                                key={pillar.title}
                                className="group bg-card border border-border rounded-2xl p-8 text-center space-y-4 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 md:hover:-translate-y-1"
                            >
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10 text-accent transition-all duration-300 group-hover:bg-primary/15 group-hover:text-primary group-hover:scale-110">
                                    <pillar.icon className="h-7 w-7" />
                                </div>
                                <h3 className="text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                                    {pillar.title}
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {pillar.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ───── QUIÉNES SOMOS ───── */}
                <section className="space-y-10">
                    <div className="text-center space-y-3">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                            {siteConfig.sections.about.whoWeAre.title}
                        </h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            {siteConfig.sections.about.whoWeAre.description}
                        </p>
                    </div>

                    <div
                        className={
                            isOneMember
                                ? "flex justify-center"
                                : "grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
                        }
                    >
                        {teamMembers.map((member) => (
                            <TeamMemberCard
                                key={member.id}
                                member={member}
                                isAlone={isOneMember}
                            />
                        ))}
                    </div>
                </section>

                {/* ───── CLIENT FEEDBACK ───── */}
                <section className="max-w-5xl mx-auto">
                    <Testimonials />
                </section>
            </main>

            <Footer />
        </div>
    );
}
