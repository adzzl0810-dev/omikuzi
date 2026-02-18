import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RitualProps {
    onComplete: () => void;
}

export const Ritual: React.FC<RitualProps> = ({ onComplete }) => {
    const [phase, setPhase] = useState<'intro' | 'temizu' | 'bow1' | 'bow2' | 'clap1' | 'clap2' | 'bow3' | 'complete'>('intro');

    useEffect(() => {
        if (phase === 'intro') return;

        const sequence = async () => {
            if (phase === 'temizu') {
                await new Promise(r => setTimeout(r, 4000)); // Wash hands animation
                setPhase('bow1');
            } else if (phase === 'bow1') {
                await new Promise(r => setTimeout(r, 2000));
                setPhase('bow2');
            } else if (phase === 'bow2') {
                await new Promise(r => setTimeout(r, 2000));
                setPhase('clap1');
            } else if (phase === 'clap1') {
                await new Promise(r => setTimeout(r, 800));
                setPhase('clap2');
            } else if (phase === 'clap2') {
                await new Promise(r => setTimeout(r, 800));
                setPhase('bow3');
            } else if (phase === 'bow3') {
                await new Promise(r => setTimeout(r, 2000));
                setPhase('complete');
            } else if (phase === 'complete') {
                await new Promise(r => setTimeout(r, 1000));
                onComplete();
            }
        };
        sequence();
    }, [phase, onComplete]);

    const startRitual = () => {
        setPhase('temizu');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-8 p-4 relative z-10 w-full max-w-lg mx-auto text-center font-serif">
            <AnimatePresence mode="wait">
                {phase === 'intro' ? (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center gap-8"
                    >
                        <div className="w-16 h-16 border-2 border-jap-gold-300 rounded-full flex items-center justify-center mb-4">
                            <span className="text-3xl text-jap-gold-300">⛩️</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-jap-indigo tracking-[0.3em] leading-relaxed">
                            PURIFICATION<br />
                            <span className="text-sm text-jap-violet block mt-2 opacity-70">参拝の儀</span>
                        </h2>
                        <p className="text-jap-indigo/80 font-serif text-sm leading-8 tracking-wide max-w-md">
                            Align your frequency with the spirits.<br />
                            Clear your mind to receive the message.<br />
                            <span className="text-xs text-black/40 mt-2 block">(精神統一)</span>
                        </p>

                        <button
                            onClick={startRitual}
                            className="mt-8 px-12 py-4 border border-jap-vermilion text-jap-vermilion font-serif font-bold tracking-[0.2em] hover:bg-jap-vermilion hover:text-white transition-all duration-500 relative overflow-hidden group rounded-sm"
                        >
                            <span className="relative z-10">BEGIN RITUAL</span>
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="ritual-active"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center"
                    >
                        <div className="relative w-64 h-64 flex items-center justify-center mb-8">
                            {/* Animated Icon/Visual based on phase - SVGs */}
                            <motion.div
                                key={phase}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 1.1, opacity: 0 }}
                                transition={{ duration: 1 }}
                                className="text-6xl text-jap-gold-500 drop-shadow-md"
                            >
                                {phase === 'temizu' && (
                                    <div className="text-center">
                                        <div className="text-4xl mb-2">💧</div>
                                        <div className="text-xs tracking-widest uppercase">Purify</div>
                                    </div>
                                )}
                                {(phase === 'bow1' || phase === 'bow2' || phase === 'bow3') && (
                                    <div className="text-center">
                                        <div className="text-4xl mb-2">🙇</div>
                                        <div className="text-xs tracking-widest uppercase">Bow</div>
                                    </div>
                                )}
                                {(phase === 'clap1' || phase === 'clap2') && (
                                    <div className="text-center">
                                        <div className="text-4xl mb-2">👏</div>
                                        <div className="text-xs tracking-widest uppercase">Clap</div>
                                    </div>
                                )}
                                {phase === 'complete' && (
                                    <div className="text-center">
                                        <div className="text-4xl mb-2">✨</div>
                                        <div className="text-xs tracking-widest uppercase">Connected</div>
                                    </div>
                                )}
                            </motion.div>

                            {/* Progress Ring */}
                            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                                <circle cx="128" cy="128" r="120" stroke="rgba(212, 175, 55, 0.2)" strokeWidth="1" fill="none" />
                                <motion.circle
                                    cx="128" cy="128" r="120"
                                    stroke="#D4AF37"
                                    strokeWidth="2"
                                    fill="none"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 10, ease: "linear" }}
                                />
                            </svg>
                        </div>

                        <motion.div
                            key={`text-${phase}`}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            className="text-xl font-serif text-jap-indigo tracking-[0.2em] font-bold"
                        >
                            {phase === 'temizu' && "Wash Hands (手水)"}
                            {phase === 'bow1' && "Bow Deeply (一拝)"}
                            {phase === 'bow2' && "Bow Deeply (二拝)"}
                            {phase === 'clap1' && "Clap Hands (拍手)"}
                            {phase === 'clap2' && "Clap Hands (拍手)"}
                            {phase === 'bow3' && "Bow Deeply (一拝)"}
                            {phase === 'complete' && "Spirit Responds"}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
