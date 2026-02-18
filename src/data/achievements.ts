import { Achievement } from '../types/achievement';

export const ACHIEVEMENTS: Achievement[] = [
    {
        id: 'first_light',
        title: 'First Light',
        description: 'Receive your first Oracle.',
        icon: 'Sparkles',
        condition_type: 'reading_count',
        threshold: 1
    },
    {
        id: 'seeker',
        title: 'Seeker of Truth',
        description: 'Receive 10 Oracles.',
        icon: 'Scroll',
        condition_type: 'reading_count',
        threshold: 10
    },
    {
        id: 'zen_novice',
        title: 'Zen Novice',
        description: 'Complete 10 minutes of mindfulness.',
        icon: 'Wind',
        condition_type: 'zazen_minutes',
        threshold: 10
    },
    {
        id: 'zen_master',
        title: 'Zen Master',
        description: 'Complete 100 minutes of mindfulness.',
        icon: 'Mountain',
        condition_type: 'zazen_minutes',
        threshold: 100
    },
    {
        id: 'streak_keeper',
        title: 'Keeping the Flame',
        description: 'Maintain a 3-day spiritual streak.',
        icon: 'Flame',
        condition_type: 'streak_days',
        threshold: 3
    },
    {
        id: 'devoted_soul',
        title: 'Devoted Soul',
        description: 'Maintain a 7-day spiritual streak.',
        icon: 'Sun',
        condition_type: 'streak_days',
        threshold: 7
    },
    {
        id: 'pilgrim',
        title: 'The Pilgrim',
        description: 'Collect 5 Goshuin stamps.',
        icon: 'Footprints',
        condition_type: 'goshuin_count',
        threshold: 5
    }
];
