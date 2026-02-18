
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Mock client for development if keys are missing
const createMockClient = () => {
    console.warn('Using Mock Supabase Client (Missing Keys)');
    return {
        auth: {
            getSession: async () => ({ data: { session: null }, error: null }),
            signInAnonymously: async () => ({ data: { user: { id: 'mock-user-id' } }, error: null }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
        },
        from: () => ({
            select: () => ({ eq: () => ({ single: async () => ({ data: null, error: null }) }) }),
            update: () => ({ eq: async () => ({ error: null }) }),
            insert: async () => ({ data: null, error: null }),
        }),
    } as unknown as ReturnType<typeof createClient<Database>>;
};

export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient<Database>(supabaseUrl, supabaseAnonKey)
    : createMockClient();
