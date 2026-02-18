import { ACHIEVEMENTS } from '../data/achievements';
import { Achievement } from '../types/achievement';

interface UserStats {
    readingsCount: number;
    zazenMinutes: number;
    streakDays: number;
    goshuinCount: number;
}

export const achievementService = {
    getUnlockedAchievements(stats: UserStats): Achievement[] {
        return ACHIEVEMENTS.filter(achievement => {
            switch (achievement.condition_type) {
                case 'reading_count':
                    return stats.readingsCount >= achievement.threshold;
                case 'zazen_minutes':
                    return stats.zazenMinutes >= achievement.threshold;
                case 'streak_days':
                    return stats.streakDays >= achievement.threshold;
                case 'goshuin_count':
                    return stats.goshuinCount >= achievement.threshold;
                default:
                    return false;
            }
        });
    },

    getProgress(achievement: Achievement, stats: UserStats): number {
        let current = 0;
        switch (achievement.condition_type) {
            case 'reading_count':
                current = stats.readingsCount;
                break;
            case 'zazen_minutes':
                current = stats.zazenMinutes;
                break;
            case 'streak_days':
                current = stats.streakDays;
                break;
            case 'goshuin_count':
                current = stats.goshuinCount;
                break;
        }
        return Math.min(100, (current / achievement.threshold) * 100);
    }
};
