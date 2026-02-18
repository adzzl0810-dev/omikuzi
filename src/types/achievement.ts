export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string; // Lucide icon name or emoji
    condition_type: 'reading_count' | 'zazen_minutes' | 'goshuin_count' | 'streak_days';
    threshold: number;
    is_secret?: boolean;
}

export interface UserAchievement {
    user_id: string;
    achievement_id: string;
    unlocked_at: string;
}
