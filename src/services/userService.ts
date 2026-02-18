
import { supabase } from '../lib/supabase';
import { Database } from '../types/database.types';

type UserData = Database['public']['Tables']['users']['Row'];

export const userService = {
    async getUserData(userId: string): Promise<UserData | null> {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Error fetching user data:', error);
            return null;
        }
        return data;
    },

    async incrementReadingCount(userId: string): Promise<void> {
        // First get current count
        const currentData = await userService.getUserData(userId);
        if (!currentData) return;

        const { error } = await (supabase as any)
            .from('users')
            .update({ readings_count: (currentData.readings_count || 0) + 1 })
            .eq('id', userId);

        if (error) {
            console.error('Error incrementing reading count:', error);
        }

        await userService.checkAndUpdateStreak(userId, currentData);
    },

    async checkAndUpdateStreak(userId: string, currentData: UserData | null): Promise<void> {
        if (!currentData) return;

        const today = new Date().toISOString().split('T')[0];
        const lastActive = currentData.last_active_date;
        let newStreak = currentData.streak_days || 0;

        if (lastActive === today) {
            // Already active today, do nothing
            return;
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (lastActive === yesterdayStr) {
            // Consecutive day
            newStreak += 1;
        } else {
            // Streak broken (or first time)
            newStreak = 1;
        }

        const { error } = await (supabase as any)
            .from('users')
            .update({
                last_active_date: today,
                streak_days: newStreak
            })
            .eq('id', userId);

        if (error) {
            console.error('Error updating streak:', error);
        }
    },

    async canReadFree(userId: string): Promise<boolean> {
        const data = await userService.getUserData(userId);
        // Allow if no data (assume new) or count is 0
        if (!data) return true;
        return (data.readings_count || 0) < 1;
    },

    async saveReading(userId: string, input: string, result: any, godImageUrl: string | null): Promise<void> {
        const { error } = await supabase
            .from('readings')
            .insert({
                user_id: userId,
                input_text: input,
                fortune_level: result.fortune,
                advice_json: result,
                lucky_item: result.lucky_item,
                god_name: result.god_name,
                god_image_url: godImageUrl,
                is_paid: false
            } as any); // Cast to any to avoid strict type definition mismatch for now

        if (error) {
            console.error('Error saving reading:', error);
        }
    }
};
