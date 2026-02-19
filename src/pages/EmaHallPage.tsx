import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { emaService, EmaWish } from '../services/emaService';
import { WagaraBackground } from '../components/WagaraBackground';
import { Sparkles, MessageSquare } from 'lucide-react';

const EmaHallPage: React.FC = () => {
    const [wishes, setWishes] = useState<EmaWish[]>([]);
    const [selectedWish, setSelectedWish] = useState<EmaWish | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWishes = async () => {
            const data = await emaService.getRecentEmas();
            setWishes(data);
            setLoading(false);
        };
        fetchWishes();
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden bg-black text-white pt-24 pb-20">
            <WagaraBackground />

            {/* Dark Overlay with deep blue gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-jap-indigo/40 to-black z-0"></div>

            <div className="relative z-10 max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-4xl md:text-5xl font-serif font-bold tracking-[0.4em] mb-4 text-white"
                    >
                        DIGITAL EMA HALL
                    </motion.h1>
                    <p className="text-sm font-sans tracking-[0.3em] uppercase text-jap-gold-300 opacity-70">
                        Digital Ema Hall — Floating Desires
                    </p>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center p-20">
                        <div className="w-12 h-12 border-4 border-jap-gold-300 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="relative h-[600px] w-full">
                        {/* The Hall: Floating Wishes */}
                        <div className="absolute inset-0 flex flex-wrap justify-center items-center gap-12 overflow-visible">
                            {wishes.map((wish, i) => (
                                <motion.button
                                    key={wish.id}
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: [0.4, 0.8, 0.4],
                                        y: [0, -20, 0],
                                        x: [0, 10, 0]
                                    }}
                                    transition={{
                                        duration: 5 + (i % 3),
                                        repeat: Infinity,
                                        delay: i * 0.5,
                                        ease: "easeInOut"
                                    }}
                                    onClick={() => setSelectedWish(wish)}
                                    className="group relative"
                                >
                                    {/* Hitodama (Soul Orb) */}
                                    <div className="w-8 h-8 md:w-12 md:h-12 bg-jap-gold-100 rounded-full blur-sm group-hover:bg-jap-vermilion transition-colors duration-500 shadow-[0_0_20px_#fff]"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Sparkles className="w-3 h-3 md:w-5 md:h-5 text-jap-gold-500 group-hover:scale-125 transition-transform" />
                                    </div>

                                    {/* Label (Invisible until hover) */}
                                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 px-2 py-1 rounded">
                                        Reveal Wish
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal for viewing wish */}
            <AnimatePresence>
                {selectedWish && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedWish(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-lg bg-[#FCF9F2] p-8 md:p-12 text-jap-indigo shadow-[0_0_50px_rgba(0,0,0,0.5)] border-y-4 border-jap-vermilion"
                        >
                            <div className="absolute top-4 right-4">
                                <button onClick={() => setSelectedWish(null)} className="text-jap-gold-500 hover:text-jap-vermilion">
                                    CLOSE ✕
                                </button>
                            </div>

                            <div className="flex flex-col items-center">
                                <MessageSquare className="w-12 h-12 text-jap-vermilion/30 mb-6" />
                                <div className="w-full h-px bg-jap-gold-300 mb-8"></div>
                                <p className="text-2xl font-serif leading-relaxed text-center mb-8">
                                    "{selectedWish.content}"
                                </p>
                                <div className="text-[10px] uppercase tracking-[0.3em] text-jap-gold-600 font-bold">
                                    Offerings to the Digital Ether
                                </div>
                                <div className="mt-2 text-[8px] opacity-40">
                                    {new Date(selectedWish.created_at).toLocaleDateString()} Oracle Record
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EmaHallPage;
