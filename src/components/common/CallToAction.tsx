import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CallToActionProps {
    title: string;
    description?: string;
    buttonText: string;
    href?: string;
}

const CallToAction = ({
    title,
    description,
    buttonText,
    href = "/contact",
}: CallToActionProps) => {
    return (
        <div className="w-full rounded-2xl bg-accent/5 border border-accent/20 p-8 md:p-12 mb-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1 text-left">
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                        {title}
                    </h3>
                    {description && (
                        <p className="text-muted-foreground max-w-lg">
                            {description}
                        </p>
                    )}
                </div>
                <Link
                    href={href}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 group shrink-0"
                >
                    {buttonText}
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
};

export default CallToAction;
