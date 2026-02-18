import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { BackgroundCircles } from './ui/background-circles';
import { KikyoLoader } from './KikyoLoader';

interface Reading {
    id: string;
    fortune_level: string;
    god_name: string;
    god_image_url: string | null;
    created_at: string;
    input_text: string;
}

interface CollectionViewProps {
    onClose: () => void;
    onConnect?: () => void;
}

export const CollectionView: React.FC<CollectionViewProps> = ({ onClose, onConnect }) => {
    const { user } = useAuth();
    const [readings, setReadings] = useState<Reading[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchReadings = async () => {
            const { data, error } = await supabase
                .from('readings')
                .select('id, fortune_level, god_name, god_image_url, created_at, input_text')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (data) {
                setReadings(data);
            }
            if (error) {
                console.error("Error fetching readings:", error);
            }
            setLoading(false);
        };

        fetchReadings();
    }, [user]);

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                <BackgroundCircles variant="primary" />
            </div>

            {/* Goshuin-cho Book Container */}
            <div className="relative z-10 w-full max-w-5xl h-[90vh] bg-[#FDFBF7] shadow-2xl rounded-sm flex overflow-hidden border-2 border-[#D4AF37]">

                {/* Left Sidebar (Book Spine/cover) - Mobile hidden or top */}
                <div className="hidden md:flex flex-col justify-between w-64 bg-jap-indigo p-8 text-white relative">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/asanoha-45px.png')]"></div>
                    <div>
                        <h2 className="text-3xl font-serif font-bold tracking-[0.3em] writing-vertical-rl border-r-2 border-jap-gold-300 pr-6 h-64">
                            御朱印帳
                        </h2>
                        <div className="mt-8 text-xs font-sans font-bold text-jap-gold-300 uppercase tracking-widest">
                            Sacred Records
                        </div>
                        <div className="mt-2 text-sm text-gray-400 font-serif">
                            Collected: {readings.length}
                        </div>
                    </div>

                    <div>
                        {onConnect && (
                            <button
                                onClick={onConnect}
                                className="w-full py-3 mb-4 border border-jap-gold-300 text-jap-gold-300 font-sans text-xs hover:bg-jap-gold-300 hover:text-jap-indigo transition-colors uppercase tracking-widest"
                            >
                                Link Google
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white font-sans text-sm uppercase tracking-widest"
                        >
                            Close Book
                        </button>
                    </div>
                </div>

                {/* Right Content (Pages) */}
                <div className="flex-1 overflow-y-auto p-8 md:p-12 relative bg-[#FDFBF7]">
                    {/* Header for Mobile */}
                    <div className="md:hidden flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
                        <h2 className="text-xl font-serif font-bold text-jap-indigo">御朱印帳 (Collection)</h2>
                        <button onClick={onClose} className="text-gray-500">✕</button>
                    </div>

                    {loading ? (
                        <div className="mt-20">
                            <KikyoLoader />
                        </div>
                    ) : readings.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center opacity-50 space-y-4">
                            <div className="text-6xl grayscale">🕸️</div>
                            <div className="font-serif text-gray-500">
                                The pages are empty.<br />
                                (まだ記録はありません)
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 ml-0 md:ml-8 gap-12">
                            {readings.map((reading) => (
                                <div key={reading.id} className="relative group perspective-1000">
                                    <div className="relative bg-white border border-gray-200 p-4 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                                        {/* Date Stamp */}
                                        <div className="absolute -top-3 -right-3 w-12 h-12 bg-jap-vermilion rounded-full flex items-center justify-center text-[10px] text-white font-bold font-sans shadow-md z-10 rotate-12">
                                            {new Date(reading.created_at).getDate()}
                                        </div>

                                        {/* Image Area */}
                                        <div className="aspect-[3/4] overflow-hidden mb-4 bg-gray-100 relative grayscale group-hover:grayscale-0 transition-all duration-700">
                                            {reading.god_image_url ? (
                                                <img
                                                    src={reading.god_image_url}
                                                    alt={reading.god_name}
                                                    className="w-full h-full object-cover mix-blend-multiply"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300 font-serif p-4 text-center">
                                                    No Image
                                                </div>
                                            )}
                                        </div>

                                        {/* Text Info */}
                                        <div className="text-center">
                                            <h3 className="text-lg font-bold font-serif text-jap-indigo mb-1">{reading.god_name}</h3>
                                            <div className="text-xs font-sans text-jap-vermilion uppercase tracking-widest mb-3 border-t border-b border-gray-100 py-1 inline-block">
                                                {reading.fortune_level}
                                            </div>
                                            <p className="text-xs text-gray-500 line-clamp-2 font-serif italic">"{reading.input_text}"</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
