import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { BackgroundCircles } from '../components/ui/background-circles';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useSound } from '../contexts/SoundContext';
import '../styles/smoke.css';

const COURSES = [
    { id: 'beginner', label: 'Beginner', duration: 5, labelJp: '初級 (5分)' },
    { id: 'intermediate', label: 'Intermediate', duration: 15, labelJp: '中級 (15分)' },
    { id: 'advanced', label: 'Advanced', duration: 30, labelJp: '上級 (30分)' },
];

const ZAZEN_BGM = "/audio/harumachimusic-misty-lake-358265.mp3";
const SINGING_BOWL = "https://cdn.pixabay.com/download/audio/2022/03/24/audio_070e1bba69.mp3"; // Orin Sound

export const ZazenPage: React.FC = () => {
    const { fadeTo, currentTrack } = useSound();
    const [selectedCourse, setSelectedCourse] = useState(COURSES[0]);
    const [isActive, setIsActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(COURSES[0].duration * 60);
    const bowlRef = useRef<HTMLAudioElement | null>(null);
    const previousTrackRef = useRef<string | null>(null);

    // Reset timer when course changes
    useEffect(() => {
        if (!isActive) {
            setTimeLeft(selectedCourse.duration * 60);
        }
    }, [selectedCourse, isActive]);

    const { user } = useAuth();

    // BGM Logic using SoundContext
    useEffect(() => {
        if (isActive) {
            // Save current track to restore later
            if (currentTrack !== ZAZEN_BGM && currentTrack) {
                previousTrackRef.current = currentTrack;
                fadeTo(ZAZEN_BGM, 2000);
            }
        } else {
            // Restore previous track if we came from one
            if (previousTrackRef.current) {
                fadeTo(previousTrackRef.current, 2000);
                previousTrackRef.current = null;
            }
        }

        return () => {
            // Ensure we restore track on unmount if we changed it
            if (previousTrackRef.current) {
                fadeTo(previousTrackRef.current, 2000);
            }
        };
    }, [isActive]);

    // Timer Logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
            // Play bell sound
            if (bowlRef.current) {
                bowlRef.current.currentTime = 0;
                bowlRef.current.play().catch(() => { });
            }

            // Save Session
            if (user) {
                const saveSession = async () => {
                    try {
                        const { error } = await supabase.from('zazen_sessions').insert({
                            user_id: user.id,
                            course_id: selectedCourse.id,
                            duration_seconds: selectedCourse.duration * 60
                        } as any);
                        if (!error) {
                            alert("Meditation session recorded. 🙏");
                        }
                    } catch (e) {
                        console.error("Error saving session", e);
                    }
                };
                saveSession();
            }
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, user, selectedCourse]);

    const handleStart = () => {
        setIsActive(true);
        // Play start bell
        if (bowlRef.current) {
            bowlRef.current.currentTime = 0;
            bowlRef.current.play().catch(() => { });
        }
    };

    const handleStop = () => {
        setIsActive(false);
    };

    const progress = timeLeft / (selectedCourse.duration * 60);

    return (
        <div className="min-h-screen bg-shinto-white font-serif text-jap-indigo relative overflow-hidden transition-colors duration-[2000ms]"
            style={isActive ? { backgroundColor: '#050510', color: '#E0E0E0' } : {}}
        >
            <Helmet>
                <title>Zazen (Meditation) | Street Spirit</title>
            </Helmet>

            {/* Background for immersion */}
            <div className={`absolute inset-0 transition-opacity duration-[2000ms] ${isActive ? 'opacity-30' : 'opacity-10'}`}>
                <BackgroundCircles variant={isActive ? "secondary" : "primary"} />
            </div>

            <div className={`absolute inset-0 transition-opacity duration-[2000ms] ${isActive ? 'opacity-30' : 'opacity-10'}`}>
                <BackgroundCircles variant={isActive ? "secondary" : "primary"} />
            </div>

            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">

                {/* Intro / Setup UI (Hidden when active) */}
                <AnimatePresence>
                    {!isActive && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="max-w-2xl text-center"
                        >
                            <span className="text-jap-vermilion font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
                                Digital Zen
                            </span>
                            <h1 className="text-4xl md:text-6xl font-brush mb-8">坐禅</h1>

                            <p className="text-lg mb-12 leading-relaxed opacity-80 font-sans">
                                Quiet your mind. Focus on your breath.<br />
                                Just sit, and let the digital incense burn away your distractions.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                                {COURSES.map((course) => (
                                    <button
                                        key={course.id}
                                        onClick={() => setSelectedCourse(course)}
                                        className={`p-6 border rounded-sm transition-all duration-300 ${selectedCourse.id === course.id
                                            ? 'border-jap-vermilion bg-jap-vermilion/5 shadow-lg scale-105'
                                            : 'border-jap-gold-300 hover:border-jap-vermilion hover:bg-white/50'
                                            }`}
                                    >
                                        <div className="text-xl font-bold mb-2">{course.labelJp}</div>
                                        <div className="text-xs uppercase tracking-widest opacity-60">{course.label}</div>
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handleStart}
                                className="px-12 py-4 bg-jap-indigo text-white font-bold text-xl tracking-[0.2em] hover:bg-jap-vermilion transition-colors shadow-2xl rounded-sm"
                            >
                                BEGIN SESSION
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Active Meditation UI */}
                <AnimatePresence>
                    {isActive && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 2 }}
                            className="absolute inset-0 flex flex-col items-center justify-center"
                        >
                            {/* Incense Stick Container */}
                            <div className="relative h-[60vh] w-2 bg-white/10 rounded-full overflow-hidden mb-12">
                                {/* Burning Ember */}
                                <motion.div
                                    className="absolute inset-x-0 top-0 bg-jap-vermilion shadow-[0_0_20px_rgba(224,68,39,0.8)]"
                                    style={{ height: `${(1 - progress) * 100}%` }}
                                    animate={{ opacity: [0.8, 1, 0.8] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />
                                {/* Remaining Incense (Mask) */}
                                <div
                                    className="absolute bottom-0 w-full bg-gradient-to-t from-gray-400 to-gray-200"
                                    style={{ height: `${progress * 100}%` }}
                                />
                                {/* Glowing Tip at the top of the remaining stick */}
                                <motion.div
                                    className="absolute w-4 h-4 rounded-full bg-orange-500 shadow-[0_0_15px_4px_rgba(255,100,0,0.6)] -left-1"
                                    style={{ bottom: `${progress * 100}%`, marginBottom: '-8px' }}
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.7] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />

                                {/* Smoke Particles */}
                                <div className="absolute -left-10 -right-10 bottom-[calc(100%_+_10px)] h-48 pointer-events-none"
                                    style={{ bottom: `${progress * 100}%` }}>
                                    <div className="smoke-container">
                                        {[...Array(12)].map((_, i) => (
                                            <div key={i} className="smoke-particle" />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="text-white/50 font-mono tracking-widest text-sm mb-8">
                                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                            </div>

                            <button
                                onClick={handleStop}
                                className="text-white/30 hover:text-white border border-white/20 hover:border-white px-8 py-2 text-xs tracking-widest transition-all rounded-full"
                            >
                                END SESSION
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Audio Elements */}
            <audio ref={bowlRef} src={SINGING_BOWL} />
        </div>
    );
};
