import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface WorshipProps {
    onComplete: () => void;
}

export const Worship: React.FC<WorshipProps> = ({ onComplete }) => {
    const [isHolding, setIsHolding] = useState(false);
    const [progress, setProgress] = useState(0);

    // Breathing Guide: 4s Inhale, 4s Hold
    // We want user to hold for ~3-4 seconds to sync.
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isHolding) {
            interval = setInterval(() => {
                setProgress((prev) => {
                    // 3 seconds duration target
                    return Math.min(prev + 0.8, 100);
                });
            }, 20);
        } else {
            interval = setInterval(() => {
                setProgress((prev) => Math.max(prev - 2, 0));
            }, 20);
        }

        return () => clearInterval(interval);
    }, [isHolding]);

    useEffect(() => {
        if (progress >= 100) {
            onComplete();
        }
    }, [progress, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div
                className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer select-none"
                onMouseDown={() => setIsHolding(true)}
                onMouseUp={() => setIsHolding(false)}
                onTouchStart={() => setIsHolding(true)}
                onTouchEnd={() => setIsHolding(false)}
            >
                <div className="absolute top-1/4 text-center pointer-events-none">
                    <h2 className="text-2xl font-serif text-white tracking-[0.3em] font-bold mb-2">
                        二拝二拍手一拝
                        <span className="block text-xs text-jap-gold-300 mt-2 font-sans tracking-widest uppercase opacity-80">
                            Digital Worship
                        </span>
                    </h2>
                    <p className="text-white/70 text-sm font-serif tracking-widest mt-4">
                        Hold to Align your Frequency.
                    </p>
                </div>

                {/* Breathing Circle / Enso */}
                <div className="relative">
                    {/* Base Circle */}
                    <div className="w-48 h-48 rounded-full border border-white/20" />

                    {/* Expanding Spirit Circle */}
                    <motion.div
                        className="absolute inset-0 rounded-full bg-jap-vermilion mix-blend-screen blur-xl"
                        animate={{
                            scale: isHolding ? [1, 1.5] : [1, 1.1, 1],
                            opacity: isHolding ? 0.8 : 0.3
                        }}
                        transition={{
                            duration: isHolding ? 3 : 4,
                            ease: "easeInOut",
                            repeat: isHolding ? 0 : Infinity
                        }}
                    />

                    {/* Progress Ring */}
                    <svg className="absolute inset-[-20px] w-[calc(100%+40px)] h-[calc(100%+40px)] rotate-[-90deg]">
                        <circle
                            cx="50%"
                            cy="50%"
                            r="48%"
                            fill="none"
                            stroke="#D4AF37"
                            strokeWidth="2"
                            strokeDasharray="300"
                            strokeDashoffset={300 - (300 * progress) / 100}
                            className="transition-all duration-75 ease-linear"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                <div className="mt-12 text-xs font-mono text-white/50 tracking-[0.2em] animate-pulse">
                    {isHolding ? "ALIGNING..." : "LONG PRESS"}
                </div>
            </div>
        </motion.div>
    );
};
