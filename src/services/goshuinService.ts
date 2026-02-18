// NOTE: Since we don't have the backend migration running in this environment,
// we will use LocalStorage to simulate the Goshuin persistence for the demo.
// In production, this would use the Supersbase client.

const USE_MOCK = true;
const STORAGE_KEY = 'street_spirit_goshuin_history';

export interface GoshuinEntry {
    id: string;
    user_id: string;
    awarded_at: string;
    design_id: string;
}

export const goshuinService = {

    async hasReceivedToday(_userId: string): Promise<boolean> {
        if (USE_MOCK) {
            const history = this.getMockHistory();
            const today = new Date().toDateString();
            return history.some(entry => new Date(entry.awarded_at).toDateString() === today);
        }
        // Real implementation
        // const { data, error } = await supabase
        //     .from('goshuin_entries')
        //     .select('*')
        //     .eq('user_id', userId)
        //     .gte('awarded_at', startOfDay)
        //     .lte('awarded_at', endOfDay);
        return false;
    },

    async awardGoshuin(userId: string): Promise<GoshuinEntry | null> {
        const hasReceived = await this.hasReceivedToday(userId);
        if (hasReceived) return null;

        const newEntry: GoshuinEntry = {
            id: crypto.randomUUID(),
            user_id: userId,
            awarded_at: new Date().toISOString(),
            design_id: 'default_ver1'
        };

        if (USE_MOCK) {
            const history = this.getMockHistory();
            history.push(newEntry);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
            return newEntry;
        }

        return null;
    },

    async getHistory(_userId: string): Promise<GoshuinEntry[]> {
        if (USE_MOCK) {
            return this.getMockHistory();
        }
        return [];
    },

    getMockHistory(): GoshuinEntry[] {
        try {
            const item = localStorage.getItem(STORAGE_KEY);
            return item ? JSON.parse(item) : [];
        } catch (e) {
            return [];
        }
    }
};
