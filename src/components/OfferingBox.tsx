import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface OfferingBoxProps {
    onOffered: () => void;
}

export const OfferingBox: React.FC<OfferingBoxProps> = ({ onOffered }) => {
    const [isThrowing, setIsThrowing] = useState(false);
    const [hasOffered, setHasOffered] = useState(false);

    const handleOffer = () => {
        if (isThrowing || hasOffered) return;

        setIsThrowing(true);
        // Sound effect: Clap/Coin sound
        setTimeout(() => {
            setHasOffered(true);
            setIsThrowing(false);
            setTimeout(onOffered, 2000); // Allow time to see the "Accepted" state
        }, 1200);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-12 p-4 relative z-10 w-full max-w-lg mx-auto">
            <div className="text-center space-y-4">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-jap-indigo tracking-[0.2em] relative inline-block">
                    <span className="relative z-10">奉納 (OFFERING)</span>
                    <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-jap-gold-300"></span>
                </h2>
                <p className="text-jap-violet/70 font-serif text-sm tracking-wide leading-loose">
                    To connect with the <span className="text-jap-vermilion">Spirit Realm</span>,<br />
                    one must give before receiving.<br />
                    <span className="text-xs opacity-60 mt-2 block">(画面の賽銭箱に触れて、硬貨を投げ入れてください)</span>
                </p>
            </div>

            <motion.div
                onClick={handleOffer}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative w-72 h-48 md:w-80 md:h-56 bg-[#8B4513] border-4 border-[#5D2906] rounded-sm shadow-2xl flex items-center justify-center cursor-pointer overflow-hidden group transition-all duration-500 ${hasOffered ? 'opacity-80' : ''}`}
                style={{
                    backgroundColor: '#8B4513', // Wood base
                    backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(0,0,0,0.1) 20px)`, // Slats
                    backgroundSize: '20px 100%'
                }}
            >
                {/* Traditional Vermilion Accents */}
                <div className="absolute top-0 inset-x-0 h-4 bg-jap-vermilion/90 shadow-sm" />
                <div className="absolute bottom-0 inset-x-0 h-4 bg-jap-vermilion/90 shadow-sm" />
                <div className="absolute inset-y-0 left-0 w-4 bg-jap-vermilion/90 shadow-sm" />
                <div className="absolute inset-y-0 right-0 w-4 bg-jap-vermilion/90 shadow-sm" />

                {/* Center Kanji */}
                <div className="z-10 text-jap-gold-100 font-serif font-bold text-5xl opacity-80 select-none tracking-widest drop-shadow-md border-2 border-jap-gold-300/50 p-4 bg-black/10 rounded-sm">
                    奉納
                </div>

                {/* Coin Animation */}
                <AnimatePresence>
                    {isThrowing && (
                        <motion.div
                            initial={{ y: -400, scale: 0.5, opacity: 0, rotateX: 0 }}
                            animate={{
                                y: [-400, 60, 40],
                                scale: [0.5, 1, 0.9],
                                opacity: 1,
                                rotateX: 1080
                            }}
                            exit={{ opacity: 0, scale: 0.8, y: 150 }}
                            transition={{
                                duration: 0.8,
                                times: [0, 0.7, 1],
                                ease: ["easeIn", "easeOut"]
                            }}
                            className="absolute z-20 w-12 h-12 bg-jap-gold-400 rounded-full border-2 border-jap-gold-200 shadow-lg flex items-center justify-center font-bold text-jap-gold-600"
                        >
                            <span className="text-xs">5円</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Success Light */}
                {hasOffered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 z-0 bg-jap-gold-100/30 mix-blend-overlay"
                    />
                )}
            </motion.div>

            <AnimatePresence>
                {hasOffered && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-jap-vermilion font-serif font-bold tracking-widest text-lg"
                    >
                        PRAYER ACCEPTED
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Real Offering Link (Phase 10) */}
            {import.meta.env.VITE_SAISEN_LINK && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-4"
                >
                    <a
                        href={import.meta.env.VITE_SAISEN_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-jap-gold-500 hover:text-jap-vermilion tracking-[0.2em] uppercase border-b border-transparent hover:border-jap-vermilion transition-all pb-1 flex items-center gap-2"
                    >
                        <span>Support the Digital Sanctuary</span>
                        <ExternalLink size={10} />
                    </a>
                </motion.div>
            )}
        </div>
    );
};
