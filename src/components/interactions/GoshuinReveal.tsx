import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface GoshuinRevealProps {
    onComplete: () => void;
}

export const GoshuinReveal: React.FC<GoshuinRevealProps> = ({ onComplete }) => {

    useEffect(() => {
        // Play sound effect here if available
        // const audio = new Audio('/sounds/stamp.mp3');
        // audio.play();

        const timer = setTimeout(onComplete, 3500); // Animation duration
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-shinto-white/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="relative flex flex-col items-center">

                {/* Scale down and "Stamp" effect */}
                <motion.div
                    initial={{ scale: 5, opacity: 0, rotate: -10 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        delay: 0.5
                    }}
                    className="relative"
                >
                    {/* Outer Circle (Vermilion) */}
                    <div className="w-64 h-64 rounded-full border-8 border-jap-vermilion flex items-center justify-center bg-jap-vermilion/10 mix-blend-multiply">
                        <div className="w-56 h-56 rounded-full border-4 border-jap-vermilion flex items-center justify-center">
                            <span className="text-jap-vermilion font-brush text-6xl font-bold writing-vertical-rl select-none">
                                参拝
                            </span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="mt-8 text-center"
                >
                    <h2 className="text-2xl font-serif text-jap-indigo font-bold mb-2">
                        御朱印 授与
                    </h2>
                    <p className="text-gray-500 font-serif text-sm">
                        Goshuin (Digital Stamp) Received
                    </p>
                </motion.div>

            </div>
        </motion.div>
    );
};
