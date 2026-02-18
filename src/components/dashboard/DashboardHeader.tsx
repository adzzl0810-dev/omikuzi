import React from 'react';
import { User } from '@supabase/supabase-js';
import { Sparkles, Wind, Scroll, LogOut, Flame } from 'lucide-react';

interface DashboardHeaderProps {
    user: User | null;
    stats: {
        totalReadings: number;
        totalZazenMinutes: number;
        streakDays: number; // Mocked for now, or calculated
        goshuinCount: number;
    };
    onSignOut: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user, stats, onSignOut }) => {
    return (
        <div className="w-full bg-white/80 backdrop-blur-md border-b border-jap-gold-100 sticky top-0 z-30">
            <div className="max-w-7xl mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row items-center justify-between gap-4">

                {/* User Greeting */}
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-jap-indigo text-white flex items-center justify-center font-serif text-xl shadow-md border-2 border-jap-gold-300">
                        {user?.email?.[0]?.toUpperCase() || "G"}
                    </div>
                    <div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Digital Pilgrim</div>
                        <h2 className="text-xl font-serif text-jap-indigo font-bold">
                            {user?.email ? user.email.split('@')[0] : "Wandering Spirit"}
                        </h2>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="flex items-center gap-2 md:gap-8 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                    <StatItem
                        icon={<Sparkles size={16} />}
                        label="Oracles"
                        value={stats.totalReadings}
                        color="text-jap-vermilion"
                    />
                    <div className="w-px h-8 bg-gray-200 hidden md:block"></div>
                    <StatItem
                        icon={<Wind size={16} />}
                        label="Mindfulness"
                        value={`${stats.totalZazenMinutes}m`}
                        color="text-jap-indigo"
                    />
                    <div className="w-px h-8 bg-gray-200 hidden md:block"></div>
                    <StatItem
                        icon={<Flame size={16} />}
                        label="Streak"
                        value={`${stats.streakDays} Days`}
                        color="text-orange-500"
                    />
                    <div className="w-px h-8 bg-gray-200 hidden md:block"></div>
                    <StatItem
                        icon={<Scroll size={16} />}
                        label="Goshuin"
                        value={stats.goshuinCount}
                        color="text-jap-gold-500"
                    />
                </div>

                {/* Sign Out (Desktop) */}
                <button
                    onClick={onSignOut}
                    className="hidden md:flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-jap-vermilion transition-colors uppercase tracking-widest"
                >
                    <span>Sign Out</span>
                    <LogOut size={14} />
                </button>
            </div>
        </div>
    );
};

const StatItem: React.FC<{ icon: React.ReactNode, label: string, value: string | number, color: string }> = ({ icon, label, value, color }) => (
    <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 min-w-[120px]">
        <div className={`p-2 rounded-full bg-opacity-10 ${color.replace('text-', 'bg-')}`}>
            <span className={color}>{icon}</span>
        </div>
        <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{label}</span>
            <span className="text-lg font-serif font-bold text-jap-indigo leading-none">{value}</span>
        </div>
    </div>
);
