
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

    async updateStreak(userId: string): Promise<void> {
        const data = await userService.getUserData(userId);
        await userService.checkAndUpdateStreak(userId, data);
    },

    async performReading(input: string, result: any, godImageUrl: string | null, isPaid: boolean = false, amountPaid: number = 0): Promise<void> {
        // Use RPC for secure transaction
        // Note: userId is derived from auth.uid() in the RPC for security
        // Casting to any to avoid TS error with manual type definition
        const { error } = await (supabase as any).rpc('perform_reading', {
            p_input_text: input,
            p_fortune_level: result.fortune,
            p_advice_json: result,
            p_lucky_item: result.lucky_item,
            p_god_name: result.god_name,
            p_god_image_url: godImageUrl,
            p_is_paid: isPaid,
            p_amount_paid: amountPaid,
            p_currency: 'USD',
            p_stripe_session_id: null // We could pass this if available
        });

        if (error) {
            console.error('RPC perform_reading failed:', error);
            // Fallback to client-side if RPC fails (e.g., during migration)
            // But if RLS blocks insert, this fallback will also fail.
            // For now, let's assume RPC exists.
            throw new Error(`Failed to save reading securely: ${error.message} (${error.code})`);
        }
    },

    // Deprecated: Use performReading instead
    async incrementReadingCount(_userId: string): Promise<void> {
        console.warn('incrementReadingCount is deprecated. Use performReading.');
    },

    async checkAndUpdateStreak(userId: string, currentData: UserData | null): Promise<void> {
        if (!currentData) return;

        const today = new Date().toISOString().split('T')[0];
        const lastActive = currentData.last_active_date;
        let newStreak = currentData.streak_days || 0;

        if (lastActive === today) {
            return;
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (lastActive === yesterdayStr) {
            newStreak += 1;
        } else {
            newStreak = 1;
        }

        // We still allow client-side streak updates for now until we make a daily_login RPC
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
        if (!data) return true;
        return (data.readings_count || 0) < 1;
    },

    // Deprecated: Is now handled inside performReading RPC
    async saveReading(_userId: string, _input: string, _result: any, _godImageUrl: string | null): Promise<void> {
        console.warn('saveReading is deprecated. Use performReading.');
    },

    async getUserCredits(userId: string): Promise<number> {
        // Casting to any to avoid TS error with manual type definition if it fails to resolve
        const { data, error } = await (supabase as any)
            .from('user_credits')
            .select('credits')
            .eq('user_id', userId)
            .single();

        if (error) {
            // If row doesn't exist (no credits ever), treat as 0
            if (error.code === 'PGRST116') return 0;
            console.error('Error fetching credits:', error);
            return 0;
        }
        return data?.credits || 0;
    },

    async generateFortuneEdge(input: string): Promise<any> {
        const { data, error } = await supabase.functions.invoke('generate-fortune', {
            body: { input }
        });

        if (error) {
            console.error('Edge Function Error:', error);
            throw new Error(`Oracle Error: ${error.message}`);
        }
        return data; // Returns the full fortune object
    }
};
