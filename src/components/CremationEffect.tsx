import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/noise.css'; // Utilizing existing noise styles

interface CremationEffectProps {
    isActive: boolean;
    onComplete: () => void;
}

export const CremationEffect: React.FC<CremationEffectProps> = ({ isActive, onComplete }) => {
    return (
        <AnimatePresence onExitComplete={onComplete}>
            {isActive && (
                <motion.div
                    className="absolute inset-0 z-50 pointer-events-none overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                    {/* Noise Base */}
                    <div className="absolute inset-0 noise-overlay opacity-100 mix-blend-color-burn"></div>

                    {/* Data Glitch Blocks */}
                    <motion.div
                        className="absolute inset-x-0 h-4 bg-red-600/50 mix-blend-overlay"
                        animate={{ top: ['10%', '80%', '40%', '90%', '20%'] }}
                        transition={{ duration: 0.5, repeat: 3, repeatType: 'mirror' }}
                    />
                    <motion.div
                        className="absolute inset-y-0 w-8 bg-black mix-blend-overlay"
                        animate={{ left: ['20%', '70%', '10%', '80%', '50%'] }}
                        transition={{ duration: 0.3, repeat: 5, repeatType: 'mirror' }}
                    />

                    {/* Cremation Fire (CSS Filter Burn) */}
                    <motion.div
                        className="absolute inset-0 bg-orange-600/80 mix-blend-exclusion"
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: [0, 1, 1, 0], scaleY: [0, 1.2, 1, 0] }}
                        transition={{ duration: 1.5, times: [0, 0.4, 0.8, 1] }}
                        style={{ transformOrigin: 'bottom' }}
                    >
                        {/* Fake Hex Code Cascade */}
                        <div className="flex flex-wrap gap-1 p-4 font-mono text-[8px] text-white/50 w-full h-full overflow-hidden opacity-50 break-all leading-none">
                            {Array.from({ length: 500 }).map((_, i) => (
                                <span key={i}>{(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}</span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Final White Flash */}
                    <motion.div
                        className="absolute inset-0 bg-white mix-blend-screen"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0, 1, 0] }}
                        transition={{ duration: 1.5, times: [0, 0.8, 0.9, 1] }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
