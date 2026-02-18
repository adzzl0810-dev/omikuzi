import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TemizuProps {
    onComplete: () => void;
}

export const Temizu: React.FC<TemizuProps> = ({ onComplete }) => {
    const [cleansedAmount, setCleansedAmount] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [showHint, setShowHint] = useState(false);

    // Simulate "cleansing" on interaction
    const handleInteraction = () => {
        if (!isComplete) {
            setCleansedAmount(prev => Math.min(prev + 5, 100)); // Increased sensitivity
            setShowHint(false);
        }
    };

    // Hint Timer
    useEffect(() => {
        const timer = setTimeout(() => setShowHint(true), 3000);
        return () => clearTimeout(timer);
    }, [cleansedAmount]);

    useEffect(() => {
        if (cleansedAmount >= 100 && !isComplete) {
            setIsComplete(true);
            setTimeout(onComplete, 1500); // Wait a bit before finishing
        }
    }, [cleansedAmount, isComplete, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div id="temizu-section" className="relative w-full h-full max-w-lg mx-auto flex flex-col items-center justify-center p-8"
                onMouseMove={handleInteraction}
                onTouchMove={handleInteraction}
                onClick={handleInteraction} // Fallback for click
            >

                {/* Instruction Text */}
                <motion.div
                    className="absolute top-1/4 text-center pointer-events-none z-20"
                    animate={{ opacity: isComplete ? 0 : 1, y: isComplete ? -20 : 0 }}
                >
                    <h2 className="text-2xl font-serif text-white tracking-[0.3em] font-bold mb-2">
                        手水
                        <span className="block text-xs text-jap-gold-300 mt-2 font-sans tracking-widest uppercase opacity-80">
                            Digital Purification
                        </span>
                    </h2>
                    <p className="text-white/70 text-sm font-serif tracking-widest mt-4">
                        {showHint ? "Tap the screen to cleanse." : "Tap or Move to cleanse the digital spirit."}
                    </p>
                </motion.div>

                {/* Water/Noise Overlay */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border border-white/10 flex items-center justify-center">

                    {/* Impurity (Noise) Layer */}
                    <motion.div
                        className="absolute inset-0 bg-repeat opacity-80 mix-blend-overlay"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
                        }}
                        animate={{
                            opacity: Math.max(0, 0.8 - (cleansedAmount / 100)),
                            scale: 1 + (cleansedAmount / 200)
                        }}
                    />

                    {/* Water/Cleansed Layer */}
                    <motion.div
                        className="absolute inset-0 bg-blue-400/20"
                        style={{
                            clipPath: `circle(${cleansedAmount}% at 50% 50%)`
                        }}
                    >
                        {/* Water Ripples Animation would go here ideally, simple gradient for now */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-300/30 to-blue-500/30 animate-pulse" />
                    </motion.div>

                    {/* Completion Symbol */}
                    <AnimatePresence>
                        {isComplete && (
                            <motion.div
                                className="absolute text-5xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                                initial={{ scale: 0, opacity: 0, rotate: -45 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                exit={{ scale: 1.5, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            >
                                祓
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Progress Bar */}
                <div className="mt-12 w-48 h-1 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-jap-gold-300 shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${cleansedAmount}%` }}
                    />
                </div>

            </div>
        </motion.div>
    );
};
