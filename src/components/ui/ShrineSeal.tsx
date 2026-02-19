import React from 'react';
import { motion } from 'framer-motion';

interface ShrineSealProps {
    className?: string;
    text?: string;
}

export const ShrineSeal: React.FC<ShrineSealProps> = ({ className, text = "電子神社" }) => {
    return (
        <div className={`relative ${className}`}>
            {/* The Seal Body */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
                animate={{ opacity: 0.8, scale: 1, rotate: -5 }}
                className="relative w-24 h-24 flex items-center justify-center p-2"
            >
                {/* Square Frame with 'kasure' (distressed) effect via SVG mask */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-jap-vermilion fill-current pointer-events-none">
                    <defs>
                        <filter id="distress">
                            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
                            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
                        </filter>
                    </defs>
                    <rect
                        x="10" y="10" width="80" height="80"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="5"
                        filter="url(#distress)"
                    />
                    <text
                        x="50" y="55"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="font-serif font-bold text-[18px]"
                        style={{ writingMode: 'vertical-rl', glyphOrientationVertical: '0' }}
                        filter="url(#distress)"
                    >
                        {text}
                    </text>
                </svg>

                {/* Subtle digital glitch line */}
                <motion.div
                    animate={{
                        opacity: [0, 0.4, 0],
                        top: ["20%", "80%", "20%"]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute left-[15%] right-[15%] h-[1px] bg-neon-cyan/50 blur-[1px] z-10"
                />
            </motion.div>
        </div>
    );
};
