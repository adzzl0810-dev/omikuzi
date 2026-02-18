"use client";

import React, { useState, useEffect } from "react";
import {
    Eye,
    EyeOff,
    Github,
    Sun,
    Moon,
    ArrowLeft
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const AnimatedSignIn: React.FC = () => {
    const navigate = useNavigate();
    const { signInWithGoogle } = useAuth();
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark for this app
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

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
                // For Supabase, often requires email confirmation. 
                // We'll auto-login if configured, or show message.
                // But for now, let's assume auto-confirm is OFF (requires check) 
                // or ON. If successful, we can try to sign in or just redirect.
                alert("Registration successful! Please check your email to confirm.");
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                navigate('/archives'); // Redirect on success
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle();
        } catch (err: any) {
            setError(err.message);
        }
    };

    // Toggle dark mode (visual only for this component demo, or global if connected)
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Create particles
    useEffect(() => {
        const canvas = document.getElementById("particles") as HTMLCanvasElement;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        setCanvasSize();
        window.addEventListener("resize", setCanvasSize);

        // Particle class
        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            color: string;

            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                // Use refined colors from our config
                this.color = isDarkMode
                    ? `rgba(188, 19, 254, ${Math.random() * 0.5})` // Neon Purple
                    : `rgba(201, 54, 24, ${Math.random() * 0.3})`; // Vermilion
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const particles: Particle[] = [];
        const particleCount = Math.min(
            100,
            Math.floor((canvas.width * canvas.height) / 15000)
        );

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (const particle of particles) {
                particle.update();
                particle.draw();
            }

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", setCanvasSize);
        };
    }, [isDarkMode]);

    return (
        <div className={`min-h-screen relative flex items-center justify-center overflow-hidden transition-colors duration-500 font-sans ${isDarkMode ? "bg-street-dark text-white" : "bg-shinto-white text-jap-indigo"}`}>
            <canvas id="particles" className="absolute inset-0 pointer-events-none opacity-50"></canvas>

            {/* Back Button */}
            <button
                onClick={() => navigate('/')}
                className="absolute top-6 left-6 z-50 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
                <ArrowLeft size={24} />
            </button>

            {/* Theme Toggle */}
            <button
                onClick={toggleDarkMode}
                className="absolute top-6 right-6 z-50 p-2 rounded-full hover:bg-white/10 transition-colors"
                title="Toggle Theme"
            >
                {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>

            {/* Login Card */}
            <div className={`relative z-10 w-full max-w-md p-8 md:p-12 rounded-2xl shadow-2xl backdrop-blur-xl border transition-all duration-300
                ${isDarkMode
                    ? "bg-black/40 border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                    : "bg-white/60 border-jap-gold-300/30 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                }`}
            >
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold font-display tracking-widest mb-2">
                        {isSignUp ? "JOIN US" : "WELCOME"}
                    </h1>
                    <p className={`text-sm tracking-wider uppercase ${isDarkMode ? "text-gray-400" : "text-jap-gold-500"}`}>
                        {isSignUp ? "Create your Digital Sanctuary" : "Sign in to Street Spirit"}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <div className="relative group">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setIsEmailFocused(true)}
                            onBlur={() => setIsEmailFocused(false)}
                            className={`peer w-full bg-transparent border-b-2 py-2 px-1 focus:outline-none transition-colors duration-300 font-mono
                                ${isEmailFocused || email
                                    ? (isDarkMode ? "border-neon-purple" : "border-jap-vermilion")
                                    : "border-gray-500"
                                }`}
                            required
                        />
                        <label
                            htmlFor="email"
                            className={`absolute left-1 transition-all duration-300 pointer-events-none uppercase text-xs tracking-widest
                                ${isEmailFocused || email
                                    ? "-top-5 text-xs " + (isDarkMode ? "text-neon-purple" : "text-jap-vermilion")
                                    : "top-2 text-gray-500"
                                }`}
                        >
                            Email Address
                        </label>
                    </div>

                    {/* Password Field */}
                    <div className="relative group">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setIsPasswordFocused(true)}
                            onBlur={() => setIsPasswordFocused(false)}
                            className={`peer w-full bg-transparent border-b-2 py-2 px-1 focus:outline-none transition-colors duration-300 font-mono
                                ${isPasswordFocused || password
                                    ? (isDarkMode ? "border-neon-purple" : "border-jap-vermilion")
                                    : "border-gray-500"
                                }`}
                            required
                        />
                        <label
                            htmlFor="password"
                            className={`absolute left-1 transition-all duration-300 pointer-events-none uppercase text-xs tracking-widest
                                ${isPasswordFocused || password
                                    ? "-top-5 text-xs " + (isDarkMode ? "text-neon-purple" : "text-jap-vermilion")
                                    : "top-2 text-gray-500"
                                }`}
                        >
                            Password
                        </label>
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={`absolute right-1 top-2 hover:text-white transition-colors
                                ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {error && (
                        <div className="text-red-500 text-xs font-mono">{error}</div>
                    )}

                    {/* Success Message for Sign Up */}
                    {isSignUp && !error && !loading && (
                        <div className="text-gray-400 text-xs font-mono text-center opacity-0 animate-fade-in">
                            Password must be at least 6 characters.
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded-sm relative overflow-hidden group
                            ${isDarkMode
                                ? "bg-neon-purple/20 text-neon-purple border border-neon-purple hover:bg-neon-purple hover:text-white hover:shadow-[0_0_20px_#bc13fe]"
                                : "bg-jap-indigo text-white hover:bg-jap-vermilion hover:shadow-lg"
                            }`}
                    >
                        {loading ? "Processing..." : (isSignUp ? "Create Account" : "Sign In")}
                    </button>
                </form>

                <div className="my-8 flex items-center gap-4 opacity-50">
                    <div className="h-px bg-current flex-1"></div>
                    <span className="text-xs uppercase tracking-widest">Or continue with</span>
                    <div className="h-px bg-current flex-1"></div>
                </div>

                <div className="flex justify-center gap-6">
                    {/* Google Login */}
                    <button
                        onClick={handleGoogleLogin}
                        className={`p-4 rounded-full transition-all duration-300 hover:scale-110
                            ${isDarkMode ? "bg-white/10 hover:bg-white/20" : "bg-black/5 hover:bg-black/10"}`}
                        title="Sign in with Google"
                    >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" /></svg>
                    </button>
                    {/* Github mock */}
                    <button className={`p-4 rounded-full transition-all duration-300 hover:scale-110 opacity-50 cursor-not-allowed
                            ${isDarkMode ? "bg-white/10" : "bg-black/5"}`} title="Coming Soon">
                        <Github size={20} />
                    </button>
                </div>

                <p className="mt-8 text-center text-xs opacity-60">
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                    <button
                        onClick={() => {
                            setIsSignUp(!isSignUp);
                            setError(null);
                        }}
                        className="underline cursor-pointer hover:text-neon-cyan transition-colors"
                    >
                        {isSignUp ? "Sign In" : "Sign Up"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AnimatedSignIn;
