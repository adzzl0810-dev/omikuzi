import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const OmikujiBox: React.FC = () => {
    const [phase, setPhase] = useState<'shake' | 'release' | 'reveal'>('shake');

    useEffect(() => {
        // Timeline
        // 0-3s: Shake (Consulting Spirits)
        // 3s:   Release stick (Answer Formed)
        // 4.5s: Reveal/Complete

        const timer1 = setTimeout(() => setPhase('release'), 3000);
        const timer2 = setTimeout(() => setPhase('reveal'), 4500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    return (
        <div id="main-shrine" className="flex flex-col items-center justify-center relative min-h-[50vh] w-full max-w-lg mx-auto overflow-visible">
            <AnimatePresence>
                {phase !== 'reveal' && (
                    <div className="relative">
                        {/* Cylinder Body (Hexagonal Wooden Box) */}
                        <motion.div
                            className="relative w-36 h-64 bg-[#E8D5B5] border-x-8 border-[#C19A6B] rounded-sm flex items-center justify-center shadow-xl z-20 overflow-hidden"
                            initial={{ rotate: 0, y: 0 }}
                            animate={phase === 'shake' ? {
                                rotate: [0, -10, 10, -10, 10, 0],
                                y: [0, -20, 0, -10, 0],
                                transition: { duration: 0.5, repeat: Infinity, ease: "easeInOut" }
                            } : {
                                rotate: 45,
                                y: 50,
                                transition: { duration: 0.5 }
                            }}
                            style={{
                                backgroundImage: `bg-[#E8D5B5]`, // Wood texture
                                boxShadow: 'inset 0 0 40px rgba(0,0,0,0.1)'
                            }}
                        >
                            {/* Decorative Kanji Strip */}
                            <div className="absolute inset-y-4 inset-x-8 border-2 border-jap-vermilion/50 flex flex-col items-center justify-center gap-4 bg-white/50 backdrop-blur-sm">
                                <div className="text-4xl font-serif text-jap-vermilion font-bold writing-vertical-rl tracking-widest drop-shadow-sm">
                                    OMIKUJI
                                </div>
                            </div>

                            {/* Top Cap */}
                            <div className="absolute -top-3 w-[110%] h-6 bg-[#8B4513] rounded-sm shadow-sm" />
                            {/* Bottom Cap */}
                            <div className="absolute -bottom-3 w-[110%] h-6 bg-[#8B4513] rounded-sm shadow-sm" />
                        </motion.div>

                        {/* Stick Coming Out (Bamboo/Wood) */}
                        {phase === 'release' && (
                            <motion.div
                                className="absolute top-0 left-1/2 w-6 h-56 bg-[#F5DEB3] -translate-x-1/2 z-10 origin-bottom border-x border-[#DEB887] flex items-start justify-center pt-4 shadow-md"
                                initial={{ y: 0, rotate: 45, opacity: 0 }}
                                animate={{ y: -160, rotate: 45, opacity: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <div className="text-xs font-bold text-jap-vermilion writing-vertical-rl tracking-widest">
                                    FORTUNE
                                </div>
                                <div className="absolute bottom-0 w-full h-4 bg-red-600" /> {/* Painted tip */}
                            </motion.div>
                        )}
                    </div>
                )}
            </AnimatePresence>

            {/* Sound Wave / Aura Effect (Holy Light) */}
            {phase === 'shake' && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <motion.div
                        className="w-48 h-48 rounded-full border-2 border-jap-gold-300 opacity-50"
                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <motion.div
                        className="w-32 h-32 rounded-full bg-jap-gold-100 blur-2xl opacity-20"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>
            )}

            {/* Status Text */}
            <motion.div
                className="mt-16 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <motion.div
                    className="text-lg font-serif text-jap-gold-500 tracking-[0.4em] uppercase"
                    animate={{
                        opacity: [0.5, 1, 0.5],
                        textShadow: [
                            "0 0 4px rgba(212, 175, 55, 0.2)",
                            "0 0 12px rgba(212, 175, 55, 0.6)",
                            "0 0 4px rgba(212, 175, 55, 0.2)"
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    {phase === 'shake' ? 'Connecting to Spirit Realm...' : 'Destiny Written'}
                </motion.div>
            </motion.div>
        </div>
    );
};
