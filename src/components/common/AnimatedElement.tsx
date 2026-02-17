"use client";

import React from "react";
import { motion } from "framer-motion";

type Animation = {
    initial?: {
      opacity?: number;
      y?: number;
      scale?: number;
    };
    animate?: {
      opacity?: number;
      y?: number;
      scale?: number;
    };
    transition?: {
      duration: number;
      delay?: number;
    };
    whileHover?: {
      opacity?: number;
      y?: number;
      scale?: number;
    };
    whileTap?: {
      opacity?: number;
      y?: number;
      scale?: number;
    };
};

interface AnimatedElementProps {
    children: React.ReactNode;
    className?: string;
    animation?: Animation;
}

const AnimatedElement = ({ 
    children, 
    className = "", 
    animation = {
        initial: { opacity: 0, y: -50 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    }
}: AnimatedElementProps) => {
    const MotionDiv = motion.div;
    return (
        <MotionDiv
            style={{ display: 'inline-block' }}
            initial={animation.initial}
            animate={animation.animate}
            transition={animation.transition}
            whileHover={animation.whileHover}
            whileTap={animation.whileTap}
        >
            <div className={className}>
                {children}
            </div>
        </MotionDiv>
    );
};

export default AnimatedElement; 