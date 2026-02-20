import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { goshuinService, GoshuinEntry } from '../services/goshuinService';
import { KikyoLoader } from './KikyoLoader';
import { useAuth } from '../contexts/AuthContext';

export const GoshuinCho: React.FC = () => {
    const { user } = useAuth();
    const [entries, setEntries] = useState<GoshuinEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            loadHistory();
        }
    }, [user]);

    const loadHistory = async () => {
        if (!user) return;
        setLoading(true);
        const history = await goshuinService.getHistory(user.id);
        setEntries(history);
        setLoading(false);
    };

    if (loading) {
        return <div className="flex justify-center p-12"><KikyoLoader /></div>;
    }

    if (entries.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center opacity-60">
                <div className="text-6xl mb-4 grayscale opacity-50">📿</div>
                <p className="font-serif text-gray-500 mb-2">No Goshuin collected yet.</p>
                <p className="text-xs text-gray-400">Visit the sanctuary daily to receive a stamp.</p>
            </div>
        );
    }

    // Sort entries by date desc
    const sortedEntries = [...entries].sort((a, b) =>
        new Date(b.awarded_at).getTime() - new Date(a.awarded_at).getTime()
    );

    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            {/* Book Container - Horizontal Scroll */}
            <div className="relative overflow-x-auto pb-12 hide-scrollbar">
                <div className="inline-flex min-w-full bg-[#f0e6d2] shadow-2xl border-y-[12px] border-jap-indigo relative">

                    {/* Washi Texture Overlay */}
                    <div className="absolute inset-0 opacity-30 pointer-events-none mix-blend-multiply z-0"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'repeat',
                        }}
                    ></div>

                    {/* Cover Page (First Item) */}
                    <div className="w-[300px] h-[450px] flex-shrink-0 border-r border-gray-300 relative bg-jap-indigo flex items-center justify-center shadow-lg z-10">
                        <div className="w-[70%] h-[80%] border-2 border-jap-gold-300 flex items-center justify-center p-4">
                            <div className="bg-white px-6 py-12 writing-vertical-rl text-4xl font-brush tracking-widest text-jap-indigo shadow-md">
                                御朱印帳
                            </div>
                        </div>
                        {/* Fold Shadow */}
                        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/20 to-transparent pointer-events-none"></div>
                    </div>

                    {/* Entries */}
                    {sortedEntries.map((entry, index) => (
                        <motion.div
                            key={entry.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="w-[300px] h-[450px] flex-shrink-0 border-r border-gray-300 relative bg-transparent flex flex-col items-center justify-between p-6 group"
                        >
                            {/* Paper Crease Effect */}
                            <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/5 to-transparent pointer-events-none"></div>
                            <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-black/5 to-transparent pointer-events-none"></div>

                            {/* Date Stamp (Top Right) */}
                            <div className="self-end writing-vertical-rl text-sm font-serif text-gray-500 tracking-widest py-2 h-1/3 flex items-center opacity-80">
                                {new Date(entry.awarded_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </div>

                            {/* Main Stamp (Center) */}
                            <div className="absolute inset-0 flex items-center justify-center z-10">
                                <div className="w-40 h-40 rounded-full border-4 border-jap-vermilion/60 flex items-center justify-center relative opacity-90 mix-blend-multiply transform rotate-[-2deg] group-hover:rotate-0 transition-transform duration-500">
                                    <div className="w-36 h-36 rounded-full border border-jap-vermilion/40 flex items-center justify-center relative">
                                        <span className="text-jap-vermilion font-brush text-5xl font-bold writing-vertical-rl select-none">
                                            参拝
                                        </span>
                                        <div className="absolute bottom-4 text-jap-vermilion font-serif text-[10px] tracking-widest font-bold uppercase opacity-80">
                                            Visited
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Calligraphy Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                                <span className="text-black/70 font-brush text-6xl mix-blend-multiply transform -rotate-1">
                                    奉拝
                                </span>
                            </div>

                            {/* Bottom Note */}
                            <div className="w-full text-center pt-2 opacity-50">
                                <div className="text-[10px] font-sans text-gray-400 uppercase tracking-widest">
                                    Digital Sanctuary
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Empty Pages Filler */}
                    {[...Array(Math.max(0, 5 - sortedEntries.length))].map((_, i) => (
                        <div key={`empty-${i}`} className="w-[300px] h-[450px] flex-shrink-0 border-r border-gray-300 relative bg-transparent flex flex-col items-center justify-center gap-4 opacity-30">
                            {/* Paper Crease Effect */}
                            <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/5 to-transparent pointer-events-none"></div>
                            <span className="font-serif text-gray-400 writing-vertical-rl tracking-widest text-sm">
                                (未記帳)
                            </span>
                            <span className="font-sans text-gray-400 text-[10px] tracking-[0.2em] uppercase">
                                Empty
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <p className="text-center text-xs text-gray-400 mt-4 font-serif">
                Scroll horizontally to view your journey
            </p>
        </div>
    );
};
