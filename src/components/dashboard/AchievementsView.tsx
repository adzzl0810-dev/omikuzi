import React from 'react';
import { ACHIEVEMENTS } from '../../data/achievements';
import { achievementService } from '../../services/achievementService';
import { Sparkles, Scroll, Wind, Mountain, Flame, Sun, Footprints, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

interface AchievementsViewProps {
    stats: {
        readingsCount: number;
        zazenMinutes: number;
        streakDays: number;
        goshuinCount: number;
    };
}

const iconMap: { [key: string]: React.ReactNode } = {
    Sparkles: <Sparkles size={24} />,
    Scroll: <Scroll size={24} />,
    Wind: <Wind size={24} />,
    Mountain: <Mountain size={24} />,
    Flame: <Flame size={24} />,
    Sun: <Sun size={24} />,
    Footprints: <Footprints size={24} />,
};

export const AchievementsView: React.FC<AchievementsViewProps> = ({ stats }) => {
    const unlockedAchievements = achievementService.getUnlockedAchievements(stats);
    const unlockedIds = new Set(unlockedAchievements.map(a => a.id));

    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
            <div className="mb-12 text-center">
                <span className="text-jap-vermilion font-bold tracking-[0.3em] uppercase text-xs mb-2 block">
                    SPIRITUAL MILESTONES
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-jap-indigo tracking-widest">
                    Achievements
                </h2>
                <div className="w-12 h-0.5 bg-jap-gold-300 mx-auto mt-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ACHIEVEMENTS.map((achievement) => {
                    const unlocked = unlockedIds.has(achievement.id);
                    return (
                        <motion.div
                            key={achievement.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`relative p-6 rounded-sm border transition-all duration-300 overflow-hidden group ${unlocked
                                ? 'bg-white/80 border-jap-gold-300 shadow-md hover:shadow-xl'
                                : 'bg-gray-100/50 border-gray-200 opacity-70 grayscale'
                                }`}
                        >
                            {/* Background Pattern */}
                            {unlocked && (
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <div className="w-24 h-24 rounded-full border-4 border-jap-gold-500/20" />
                                </div>
                            )}

                            <div className="flex items-start gap-4 relative z-10">
                                <div className={`p-4 rounded-full ${unlocked ? 'bg-jap-indigo text-jap-gold-300' : 'bg-gray-200 text-gray-400'}`}>
                                    {unlocked ? iconMap[achievement.icon] : <Lock size={24} />}
                                </div>
                                <div>
                                    <h3 className={`font-serif font-bold text-lg mb-1 ${unlocked ? 'text-jap-indigo' : 'text-gray-500'}`}>
                                        {achievement.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 leading-relaxed font-sans mb-3">
                                        {achievement.description}
                                    </p>

                                    {/* Progress Bar (if not unlocked) */}
                                    {!unlocked && (
                                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mt-2">
                                            <div
                                                className="h-full bg-jap-gold-400 transition-all duration-1000"
                                                style={{
                                                    width: `${achievementService.getProgress(achievement, stats)}%`
                                                }}
                                            />
                                        </div>
                                    )}

                                    {unlocked && (
                                        <div className="mt-2 inline-block px-2 py-0.5 bg-jap-vermilion/10 text-jap-vermilion text-[10px] font-bold uppercase tracking-wider rounded-sm border border-jap-vermilion/20">
                                            Unlocked
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};
