import React from "react";
import { Button } from "@/components/ui/button";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface AlertButtonProps {
    message: string;
    children?: React.ReactNode;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    className?: string;
}

const variantToToastType = {
    default: toast.success,
    secondary: toast.warning,
    outline: toast.error,
    destructive: toast.error,
    ghost: toast.info,
    link: toast.info,
} as const;

const AlertButton = ({ 
    message, 
    children, 
    variant = "default",
    className 
}: AlertButtonProps) => {
    const handleClick = () => {
        const toastFunction = variantToToastType[variant] || toast.info;
        toastFunction(message);
    };

    return (
        <Button
            onClick={handleClick}
            variant={variant}
            className={cn(className)}
        >
            <FaCheckCircle className="mr-2" />
            {children || "Test Alert"}
        </Button>
    );
};

export default AlertButton; 