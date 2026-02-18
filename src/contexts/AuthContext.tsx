
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, signInWithGoogle: async () => { }, signOut: async () => { } });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
            if (!session) {
                signInAnonymously();
            } else {
                // Check if there is a pending migration
                const prevUserId = localStorage.getItem('street_spirit_anon_id');
                if (prevUserId && prevUserId !== session.user.id) {
                    migrateData(prevUserId);
                }
            }
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);

            // Handle migration on sign in state change
            if (_event === 'SIGNED_IN' && session) {
                const prevUserId = localStorage.getItem('street_spirit_anon_id');
                if (prevUserId && prevUserId !== session.user.id) {
                    migrateData(prevUserId);
                }
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const migrateData = async (oldUserId: string) => {
        try {
            console.log("Migrating data from:", oldUserId);
            const { error } = await supabase.rpc('migrate_anonymous_readings', {
                anonymous_user_id: oldUserId
            } as any);

            if (!error) {
                console.log("Migration successful");
                localStorage.removeItem('street_spirit_anon_id'); // Clear after success
            } else {
                console.error("Migration failed:", error);
            }
        } catch (e) {
            console.error("Migration error:", e);
        }
    };

    const signInAnonymously = async () => {
        try {
            const { data, error } = await supabase.auth.signInAnonymously();
            if (data?.user) {
                setUser(data.user);
            } else if (error) {
                console.warn("Auth Error (Using Mock User):", error.message);
                setUser({ id: 'mock-user-id', aud: 'authenticated', role: 'anon', email: 'guest@street-spirit.local', app_metadata: {}, user_metadata: {}, created_at: '' } as User);
            } else {
                // Fallback for mock client
                setUser({ id: 'mock-user-id', aud: 'authenticated', role: 'anon', email: 'guest@street-spirit.local', app_metadata: {}, user_metadata: {}, created_at: '' } as User);
            }
        } catch (error) {
            console.error("Error signing in anonymously:", error);
            // Fallback
            setUser({ id: 'mock-user-id', aud: 'authenticated', role: 'anon', email: 'guest@street-spirit.local', app_metadata: {}, user_metadata: {}, created_at: '' } as User);
        }
    };

    const signInWithGoogle = async () => {
        try {
            // Save current anonymous ID before redirecting
            if (user?.is_anonymous) {
                localStorage.setItem('street_spirit_anon_id', user.id);
            }

            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin
                }
            });
            if (error) throw error;
        } catch (error) {
            console.error("Error signing in with Google:", error);
            alert("Login failed. Please checks your network or Supabase settings.");
        }
    };

    const signOut = async () => {
        try {
            await supabase.auth.signOut();
            setUser(null);
            // Optional: Redirect to home is handled by components usually
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
