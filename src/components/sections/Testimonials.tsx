"use client";

import React, { useEffect, useState } from "react";
import { Quote } from "lucide-react";
interface TestimonialItem {
    id: string;
    name: string;
    role?: string;
    description: string;
    image?: string;
    order: number;
}

const FALLBACK_TESTIMONIALS: TestimonialItem[] = [
    {
        id: "1",
        name: "Ben",
        role: "yoga student",
        description:
            "Best Yoga-teacher I've ever met. She really knows what she does. And helps the inflexible like me. :)",
        order: 0,
    },
    {
        id: "2",
        name: "Natalia",
        role: "breathwork student",
        description:
            "Chloe!! What a great teacher and soul you are. I love your soft and gentle voice during classes and my favourite part was the quotes in the end of the class, always left me so happy and warm. 3 weeks in Nicaragua together and never missed a class ❤️",
        order: 1,
    },
    {
        id: "3",
        name: "Enda",
        role: "breathwork student",
        description:
            "Best Yoga-teacher I've ever met. She really knows what she does. And helps the inflexible like me. :)",
        order: 2,
    },
    {
        id: "4",
        name: "Michaela",
        role: "retreat attendee",
        description:
            "Every session with Chloe is truly beautiful and nourishing for the heart. She has a special gift for creating harmony and transmitting genuine kindness. You can feel that she truly loves what she does, and that energy fills the space in such a powerful way. Her breathwork sessions, are transformative, they always shift my energy completely. I couldn't recommend them enough; they're truly a before and after experience.",
        order: 3,
    },
    {
        id: "5",
        name: "Filippa",
        role: "",
        description:
            "Best Yoga-teacher I've ever met. She really knows what she does. And helps the inflexible like me. :)",
        order: 4,
    },
    {
        id: "6",
        name: "Amporo",
        role: "",
        description:
            "Really enjoy Chloe classes. They are soothing and have a nice flow to them. She incorporates breathwork and poetry which is fab. Also, she always reminds to introduce an intention and bringing awareness to our life.",
        order: 5,
    },
];

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState<TestimonialItem[]>(FALLBACK_TESTIMONIALS);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchTestimonials() {
            try {
                const res = await fetch("/api/testimonials?isActive=true&limit=50");
                const json = await res.json();
                if (json.success && json.data?.length > 0) {
                    setTestimonials(
                        json.data.map((t: { id: string; name: string; role?: string; description: string; image?: string; order: number }) => ({
                            id: t.id,
                            name: t.name,
                            role: t.role,
                            description: t.description,
                            image: t.image,
                            order: t.order,
                        }))
                    );
                }
            } catch {
                // keep fallback
            } finally {
                setIsLoading(false);
            }
        }
        fetchTestimonials();
    }, []);

    if (isLoading && testimonials.length === 0) {
        return null;
    }

    return (
        <section className="space-y-10">
            <div className="text-center space-y-3">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    Client Feedback
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                    What students and retreat attendees say about their experience.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {testimonials.map((t) => (
                    <div
                        key={t.id}
                        className="group relative bg-card border border-border rounded-2xl p-6 md:p-8 text-left transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 active:scale-[0.99] overflow-hidden"
                    >
                        {/* Hover cross highlight: subtle gradient from corner */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" aria-hidden />
                        <Quote className="relative h-8 w-8 text-primary/70 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:text-primary" aria-hidden />
                        <p className="relative text-muted-foreground leading-relaxed mb-6 transition-colors duration-300 group-hover:text-foreground/90">
                            &ldquo;{t.description}&rdquo;
                        </p>
                        <div className="relative">
                            <p className="font-semibold text-foreground">{t.name}</p>
                            {t.role && (
                                <p className="text-sm text-primary">{t.role}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
