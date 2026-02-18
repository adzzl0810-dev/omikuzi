import { supabase } from '../lib/supabase';

const USE_MOCK = true;
const STORAGE_KEY = 'street_spirit_ema_wishes';

export interface EmaWish {
    id: string;
    user_id: string;
    user_name?: string; // Display name
    content: string;
    created_at: string;
    likes_count: number;
    goshuin_id?: string; // Optional: link to a specific stamp design used?
}

// Initial mock data to populate the wall if empty
const INITIAL_MOCK_DATA: EmaWish[] = [
    { id: 'mock-1', user_id: 'anon-1', user_name: 'Pilgrim', content: "World Peace & Inner Calm", created_at: new Date(Date.now() - 10000000).toISOString(), likes_count: 5 },
    { id: 'mock-2', user_id: 'anon-2', user_name: 'Keiko', content: "Health for my family this year.", created_at: new Date(Date.now() - 5000000).toISOString(), likes_count: 12 },
    { id: 'mock-3', user_id: 'anon-3', content: "Success in my new venture!", created_at: new Date(Date.now() - 2000000).toISOString(), likes_count: 3 },
    { id: 'mock-4', user_id: 'anon-4', user_name: 'Traveler', content: "Finding clarity in chaos.", created_at: new Date().toISOString(), likes_count: 8 },
];

export const emaService = {

    async getRecentEmas(): Promise<EmaWish[]> {
        if (USE_MOCK) {
            return this.getMockWishes();
        }

        const { data, error } = await supabase
            .from('ema_offerings')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(50);

        if (error) {
            console.error("Error fetching Emas:", error);
            return [];
        }

        return data as EmaWish[];
    },

    async postEma(userId: string, content: string): Promise<EmaWish | null> {
        if (!content.trim()) return null;

        const newEma: EmaWish = {
            id: crypto.randomUUID(),
            user_id: userId,
            content: content.substring(0, 140), // Enforce limit
            created_at: new Date().toISOString(),
            likes_count: 0
        };

        if (USE_MOCK) {
            const wishes = this.getMockWishes();
            wishes.unshift(newEma); // Add to top
            // Limit local storage size
            if (wishes.length > 50) wishes.pop();

            localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 800));
            return newEma;
        }

        const { data, error } = await supabase
            .from('ema_offerings')
            .insert([
                {
                    user_id: userId,
                    content: content.trim(),
                    is_public: true, // Default to public
                    likes_count: 0
                }
            ] as any)
            .select()
            .single();

        if (error) {
            console.error("Error posting Ema:", error);
            return null;
        }

        return data as EmaWish;
    },

    getMockWishes(): EmaWish[] {
        try {
            const item = localStorage.getItem(STORAGE_KEY);
            if (!item) {
                // Initialize with some data so it's not empty
                localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_DATA));
                return INITIAL_MOCK_DATA;
            }
            return JSON.parse(item);
        } catch (e) {
            return INITIAL_MOCK_DATA;
        }
    }
};
