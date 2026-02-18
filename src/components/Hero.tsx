import React from 'react';
import { motion } from 'framer-motion';
import { BackgroundCircles } from './ui/background-circles';

interface HeroProps {
    onStart: () => void;
    onShowCollection: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart, onShowCollection }) => {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden z-10 px-4">

            {/* Header / Login Button - REMOVED (Moved to Global Header) */}

            <div className="max-w-4xl w-full flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24">

                {/* Vertical Kanji (Left) - Sacred */}
                <div className="hidden md:flex flex-col gap-8 writing-vertical-rl text-jap-indigo opacity-70 font-serif font-bold tracking-[0.8em] text-xl select-none border-l border-jap-gold-300/30 pl-4 py-8" style={{ textOrientation: 'upright' }}>
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1.5 }}
                    >
                        八百万神
                    </motion.span>
                </div>

                {/* Main Content (Center) */}
                <div className="flex-1 text-center relative z-10 flex flex-col items-center">
                    {/* Crest / Symbol */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="mb-8 opacity-80"
                    >
                        {/* Simple Kikyo-mon SVG Icon */}
                        <svg width="60" height="60" viewBox="0 0 100 100" className="text-jap-gold-400">
                            <path d="M50 5 L60 35 L90 40 L65 60 L75 90 L50 75 L25 90 L35 60 L10 40 L40 35 Z" fill="currentColor" />
                        </svg>
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                        className="relative inline-block mb-10"
                    >
                        <h1 className="flex flex-col items-center gap-4">
                            <span className="text-lg font-serif tracking-[0.4em] text-jap-violet uppercase mb-2">Digital Sanctuary</span>

                            {/* Background Circles - Positioned absolute behind the text */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] -z-10 pointer-events-none opacity-60 mix-blend-multiply">
                                <BackgroundCircles variant="tertiary" />
                            </div>

                            <span className="text-5xl md:text-8xl font-brush font-normal text-jap-indigo tracking-widest drop-shadow-sm relative z-10 py-4">
                                Omikuji
                            </span>
                        </h1>
                    </motion.div>

                    <h2 className="text-sm md:text-base text-gray-600 mb-12 max-w-md mx-auto leading-loose font-serif tracking-widest">
                        Guidance from the Digital Spirit Realm.<br />
                        Manifest your destiny through the algorithm.<br />
                        <span className="text-xs text-jap-gold-500 mt-4 block uppercase tracking-[0.2em] opacity-80">
                            Connect with the Universe
                        </span>
                    </h2>

                    <motion.button
                        onClick={onStart}
                        whileHover={{ scale: 1.02, backgroundColor: "#E04427", color: "#FDFBF7" }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative px-12 py-4 bg-transparent border border-jap-vermilion text-jap-vermilion font-serif font-bold text-sm tracking-[0.3em] transition-all duration-500 rounded-sm"
                    >
                        RECEIVE GUIDANCE
                    </motion.button>

                    <motion.div className="flex flex-col gap-4 mt-12 items-center">
                        <button
                            onClick={onShowCollection}
                            className="text-xs text-jap-violet/60 font-serif tracking-widest hover:text-jap-violet transition-colors underline underline-offset-4 decoration-jap-gold-300/50 uppercase"
                        >
                            Spiritual Archives
                        </button>
                        <a
                            href="/zazen"
                            className="text-xs text-jap-vermilion/60 font-serif tracking-widest hover:text-jap-vermilion transition-colors uppercase border-b border-transparent hover:border-jap-vermilion/50 pb-1"
                        >
                            Enter Zazen (Meditation)
                        </a>
                    </motion.div>
                </div>

                {/* Vertical Kanji (Right) - Sacred */}
                <div className="hidden md:flex flex-col gap-8 writing-vertical-rl text-jap-indigo opacity-70 font-serif font-bold tracking-[0.8em] text-xl select-none border-r border-jap-gold-300/30 pr-4 py-8" style={{ textOrientation: 'upright' }}>
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 1.5 }}
                    >
                        未来吉凶
                    </motion.span>
                </div>
            </div>
        </section>
    );
};

