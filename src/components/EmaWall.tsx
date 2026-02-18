import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { emaService, EmaWish } from '../services/emaService';

export const EmaWall: React.FC = () => {
    const [emas, setEmas] = useState<EmaWish[]>([]);

    useEffect(() => {
        const loadEmas = async () => {
            const data = await emaService.getRecentEmas();
            setEmas(data);
        };
        loadEmas();
        // Poll for new Emas every 30s
        const interval = setInterval(loadEmas, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div id="ema-wall" className="relative w-full h-[60vh] overflow-hidden bg-gradient-to-b from-transparent to-black/20 pointer-events-none">
            {/* Shimenawa (Sacred Rope) Visual */}
            <div className="absolute top-0 left-0 right-0 h-24 z-20 pointer-events-none">
                {/* Rope SVG Representation */}
                <svg width="100%" height="100%" viewBox="0 0 1200 100" preserveAspectRatio="none" className="drop-shadow-lg">
                    {/* Twisted Rope Body */}
                    <path d="M0,20 Q300,80 600,20 T1200,20" fill="none" stroke="#f2e8c9" strokeWidth="12" strokeLinecap="round" />
                    <path d="M0,20 Q300,80 600,20 T1200,20" fill="none" stroke="#e0d0a0" strokeWidth="12" strokeDasharray="20 10" strokeLinecap="round" />

                    {/* Shide (Paper Streamers) */}
                    <g transform="translate(200, 45) rotate(10)">
                        <path d="M0,0 L20,40 L0,80 L-20,40 Z" fill="white" stroke="#eee" strokeWidth="1" />
                    </g>
                    <g transform="translate(600, 40) rotate(-5)">
                        <path d="M0,0 L20,40 L0,80 L-20,40 Z" fill="white" stroke="#eee" strokeWidth="1" />
                    </g>
                    <g transform="translate(1000, 45) rotate(15)">
                        <path d="M0,0 L20,40 L0,80 L-20,40 Z" fill="white" stroke="#eee" strokeWidth="1" />
                    </g>
                </svg>
            </div>

            <div className="absolute inset-0 flex flex-wrap content-center justify-center gap-6 p-12 pt-24 pointer-events-auto">
                {emas.map((ema, index) => (
                    <motion.div
                        key={ema.id}
                        initial={{ opacity: 0, y: 100, rotate: (Math.random() - 0.5) * 10 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            rotate: [
                                (Math.random() - 0.5) * 8,
                                (Math.random() - 0.5) * -8,
                                (Math.random() - 0.5) * 8
                            ]
                        }}
                        transition={{
                            y: { duration: 0.8, delay: index * 0.05, ease: "easeOut" },
                            rotate: {
                                duration: 8 + Math.random() * 5,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                            }
                        }}
                        className="relative w-40 h-32 bg-[#e6cca8] rounded-t-lg shadow-lg border border-[#d4b08c] flex flex-col items-center p-3 cursor-pointer hover:scale-105 hover:-translate-y-2 transition-transform z-10 group"
                        style={{
                            clipPath: "polygon(50% 0%, 100% 15%, 100% 100%, 0% 100%, 0% 15%)"
                        }}
                        title={`Wish by ${ema.user_name || 'Anonymous'}`}
                    >
                        {/* String hole & string */}
                        <div className="w-2 h-2 bg-black/20 rounded-full absolute top-4 z-20"></div>
                        <div className="absolute -top-12 left-1/2 w-0.5 h-16 bg-red-800/50 -z-10 origin-bottom transform -translate-x-1/2"></div>

                        {/* Content */}
                        <div className="mt-6 w-full h-full overflow-hidden flex items-center justify-center relative z-10">
                            <p className="text-[10px] font-serif text-jap-indigo text-center leading-relaxed font-bold writing-vertical-rl max-h-full line-clamp-4">
                                {ema.content}
                            </p>
                        </div>

                        {/* Horse/Design Icon opacity overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none group-hover:opacity-15 transition-opacity">
                            <span className="text-4xl text-jap-vermilion">叶</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
