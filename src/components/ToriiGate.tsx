import { motion } from 'framer-motion';

export const ToriiGate = () => {
    return (
        <div className="absolute inset-0 z-0 flex items-end justify-center pointer-events-none overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative w-full h-full max-w-6xl flex items-end justify-center mb-[-50px] md:mb-[-80px] opacity-100"
            >
                {/* Traditional Lighting (No Neon) */}
                <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-jap-vermilion/5 to-transparent blur-3xl" />

                <svg viewBox="0 0 800 500" className="w-full h-auto drop-shadow-2xl">
                    <defs>
                        <linearGradient id="torii-wood" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#E04427" /> {/* Traditional Vermilion */}
                            <stop offset="50%" stopColor="#C0331A" />
                            <stop offset="100%" stopColor="#E04427" />
                        </linearGradient>
                        <linearGradient id="stone-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#555" />
                            <stop offset="100%" stopColor="#333" />
                        </linearGradient>
                        <filter id="shadow-depth">
                            <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
                        </filter>
                    </defs>

                    {/* Torii Structure (Widened for content framing) */}
                    <g transform="translate(100, 50)" filter="url(#shadow-depth)">
                        {/* Base Stones (Kamebara) - Moved apart */}
                        <ellipse cx="60" cy="450" rx="40" ry="12" fill="url(#stone-gradient)" />
                        <ellipse cx="540" cy="450" rx="40" ry="12" fill="url(#stone-gradient)" />

                        {/* Pillars (Hashira) - Widened gap (x: 60 - 540 range) */}
                        <path d="M35,450 L80,100 L110,100 L95,450" fill="url(#torii-wood)" />
                        <path d="M505,450 L520,100 L550,100 L565,450" fill="url(#torii-wood)" />

                        {/* Lower Beam (Nuki) - Widened */}
                        <rect x="20" y="160" width="560" height="25" rx="2" fill="url(#torii-wood)" />
                        {/* Wedge (Kusabi) */}
                        <rect x="100" y="155" width="12" height="35" fill="#1a1a1a" />
                        <rect x="488" y="155" width="12" height="35" fill="#1a1a1a" />

                        {/* Top Beam (Kasagi/Shimaki) - Curved & Widened */}
                        <path d="M-40, 90 Q300, 30 640, 90 L650, 130 Q300, 70 -50, 130 Z" fill="url(#torii-wood)" />

                        {/* Center Tablet (Gaku) */}
                        <rect x="275" y="100" width="50" height="65" fill="#1a1a1a" stroke="#D4AF37" strokeWidth="2" />
                        <text x="300" y="140" fontSize="30" fill="#D4AF37" textAnchor="middle" fontFamily="serif" fontWeight="bold">神</text>

                        {/* Shamenawa (Sacred Rope) */}
                        <path d="M40, 140 Q300, 170 560, 140" fill="none" stroke="#FDFBF7" strokeWidth="4" strokeDasharray="10,5" />

                        {/* Shide (Paper Streamers) */}
                        <path d="M150,155 L135,185 L165,185 L150,215" fill="#FDFBF7" stroke="#ccc" strokeWidth="0.5" />
                        <path d="M300,160 L285,190 L315,190 L300,220" fill="#FDFBF7" stroke="#ccc" strokeWidth="0.5" />
                        <path d="M450,155 L435,185 L465,185 L450,215" fill="#FDFBF7" stroke="#ccc" strokeWidth="0.5" />
                    </g>
                </svg>
            </motion.div>
        </div>
    );
};
