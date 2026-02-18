import React from 'react';
import { motion } from 'framer-motion';
import { KikyoMon } from './icons/KikyoMon';

export const KikyoLoader: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-8">
            <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Outer Ring - pulsating */}
                <motion.div
                    className="absolute inset-0 border-2 border-jap-gold-300 rounded-full opacity-30"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Rotating Kikyo-mon */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="text-jap-violet drop-shadow-lg"
                >
                    <KikyoMon className="w-24 h-24" />
                </motion.div>

                {/* Center Glow */}
                <motion.div
                    className="absolute w-4 h-4 bg-jap-gold-400 rounded-full blur-sm"
                    animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </div>

            <motion.div
                className="text-jap-gold-500 font-serif tracking-[0.5em] text-sm uppercase flex flex-col items-center gap-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <span>Consulting the Spirits</span>
                <span className="text-xs tracking-[0.8em] opacity-70">...</span>
            </motion.div>
        </div>
    );
};
