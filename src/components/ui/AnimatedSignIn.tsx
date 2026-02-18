"use client";

import React, { useState, useEffect } from "react";
import {
    Eye,
    EyeOff,
    ArrowLeft
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { WagaraBackground } from "../WagaraBackground";
import { KamiParticles } from "../KamiParticles";
import { motion } from "framer-motion";

const AnimatedSignIn: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { signInWithGoogle, user } = useAuth();
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Check for previous location to redirect back to
    const from = location.state?.from?.pathname || '/archives';

    // If already logged in, redirect
    useEffect(() => {
        if (user && !loading) {
            navigate(from, { replace: true });
        }
    }, [user, loading, navigate, from]);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                alert("Registration successful! Please check your email to confirm.");
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                // Redirect handled by useEffect
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle(from);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden font-serif text-white">
            {/* Backgrounds */}
            <WagaraBackground />
            <KamiParticles />

            {/* Dark Overlay for readability */}
            <div className="absolute inset-0 bg-street-dark/80 backdrop-blur-sm z-0"></div>

            {/* Back Button */}
            <button
                onClick={() => navigate('/')}
                className="absolute top-6 left-6 z-50 p-3 rounded-full bg-black/40 border border-white/20 hover:bg-white/10 hover:border-jap-vermilion transition-all group"
            >
                <ArrowLeft size={24} className="group-hover:text-jap-vermilion transition-colors" />
            </button>

            {/* Main Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md p-8 md:p-12"
            >
                {/* Glassmorphism Container */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-md rounded-xl border border-jap-indigo/50 shadow-[0_0_50px_rgba(20,20,40,0.8)]"></div>

                {/* Decorative Borders (Torii Style) */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-jap-vermilion to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-jap-indigo to-transparent opacity-80"></div>

                <div className="relative z-20">
                    <div className="mb-10 text-center">
                        <h1 className="text-4xl font-bold font-display tracking-widest mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">
                            {isSignUp ? "参拝者登録" : "参拝者受付"}
                        </h1>
                        <p className="text-xs tracking-[0.3em] uppercase text-jap-vermilion font-bold">
                            {isSignUp ? "New Pilgrim Registration" : "Worshipper Identification"}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Email Field */}
                        <div className="relative group">
                            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-neon-cyan transition-colors">Digital ID (Email)</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/40 border-b border-gray-600 focus:border-neon-cyan py-3 px-2 focus:outline-none transition-all duration-300 font-mono text-lg text-white placeholder-gray-700"
                                placeholder="name@example.com"
                                required
                            />
                            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-neon-cyan group-focus-within:w-full transition-all duration-500"></div>
                        </div>

                        {/* Password Field */}
                        <div className="relative group">
                            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-neon-purple transition-colors">Secret Key (Password)</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black/40 border-b border-gray-600 focus:border-neon-purple py-3 px-2 focus:outline-none transition-all duration-300 font-mono text-lg text-white placeholder-gray-700"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-3 text-gray-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-neon-purple group-focus-within:w-full transition-all duration-500"></div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="text-red-400 text-xs font-mono bg-red-900/20 p-2 border border-red-900/50 rounded"
                            >
                                ERROR: {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 font-bold tracking-[0.2em] uppercase transition-all duration-300 relative overflow-hidden group border
                                ${isSignUp
                                    ? "bg-jap-indigo/80 border-jap-indigo hover:bg-jap-indigo"
                                    : "bg-jap-vermilion/80 border-jap-vermilion hover:bg-jap-vermilion"
                                } hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]`}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {loading ? "CONNECTING..." : (isSignUp ? "ISSUE ID" : "AUTHENTICATE")}
                            </span>
                        </button>
                    </form>

                    <div className="my-8 flex items-center gap-4 opacity-30">
                        <div className="h-px bg-white flex-1"></div>
                        <span className="text-xs uppercase tracking-widest">Or</span>
                        <div className="h-px bg-white flex-1"></div>
                    </div>

                    <div className="flex justify-center flex-col gap-4">
                        {/* Google Login */}
                        <button
                            onClick={handleGoogleLogin}
                            className="w-full py-3 px-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex items-center justify-center gap-3 group"
                        >
                            <svg className="w-5 h-5 fill-white opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24"><path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" /></svg>
                            <span className="text-sm tracking-wide text-gray-300 group-hover:text-white">Sign in with Google</span>
                        </button>
                    </div>

                    <p className="mt-8 text-center text-xs opacity-60 font-mono">
                        {isSignUp ? "Already have an ID?" : "No ID yet?"}{" "}
                        <button
                            onClick={() => {
                                setIsSignUp(!isSignUp);
                                setError(null);
                            }}
                            className="underline cursor-pointer hover:text-neon-cyan transition-colors ml-2"
                        >
                            {isSignUp ? "Sign In" : "Register"}
                        </button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default AnimatedSignIn;
