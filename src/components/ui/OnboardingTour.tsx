import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KikyoMon } from '../icons/KikyoMon';

interface Step {
    target: string; // CSS selector for the highlight target
    title: string;
    content: string;
    position: 'top' | 'bottom' | 'center';
}

const TOUR_STEPS: Step[] = [
    {
        target: 'body', // General intro
        title: 'Welcome to Street Spirit',
        content: 'A digital sanctuary for your busy soul. Here, you can find a moment of peace and connect with ancient wisdom.',
        position: 'center'
    },
    {
        target: '#temizu-section',
        title: 'Purification (Temizu)',
        content: 'Before approaching the spirits, cleanse your mind and hands here. It prepares you for the divine.',
        position: 'top' // Assuming usually near top/middle
    },
    {
        target: '#main-shrine', // Omikuji area
        title: 'The Oracle (Omikuji)',
        content: 'Shake the box to receive a message from the spirits. Your destiny awaits guidance.',
        position: 'bottom'
    },
    {
        target: '#ema-wall',
        title: 'Community Wishes (Ema)',
        content: 'Write your wishes on these wooden plaques. They are shared with the community and offered to the heavens.',
        position: 'top'
    }
];

export const OnboardingTour: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has seen the tour
        const hasSeenTour = localStorage.getItem('street_spirit_onboarding_completed');
        if (!hasSeenTour) {
            // Delay start slightly
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleNext = () => {
        if (currentStep < TOUR_STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
            // Scroll to target
            const step = TOUR_STEPS[currentStep + 1];
            if (step.target !== 'body') {
                const el = document.querySelector(step.target);
                el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            handleComplete();
        }
    };

    const handleComplete = () => {
        setIsVisible(false);
        localStorage.setItem('street_spirit_onboarding_completed', 'true');
    };

    if (!isVisible) return null;

    const step = TOUR_STEPS[currentStep];

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 pointer-events-none">
                {/* Backdrop / Spotlight Effect */}
                <motion.div
                    className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                />

                {/* Spirit Guide Character (Floating Fox/Spirit) */}
                <motion.div
                    className="absolute z-50 pointer-events-auto"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        // Position based on step preference
                        top: step.position === 'center' ? '40%' : step.position === 'top' ? '20%' : 'auto',
                        bottom: step.position === 'bottom' ? '20%' : 'auto',
                        left: '50%',
                        x: '-50%'
                    }}
                    transition={{ type: 'spring', duration: 0.6 }}
                >
                    <div className="bg-[#FAF7F0] w-[320px] rounded-lg shadow-2xl border-2 border-jap-gold-300 overflow-hidden relative">
                        {/* Washi Texture */}
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')]" />

                        {/* Top Decorative Bar */}
                        <div className="h-2 bg-jap-vermilion w-full" />

                        {/* Content */}
                        <div className="p-6 relative z-10">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="min-w-[48px] h-12 rounded-full bg-jap-indigo flex items-center justify-center text-white shadow-md">
                                    <KikyoMon className="w-6 h-6 animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="font-serif font-bold text-jap-indigo text-lg leading-tight">
                                        {step.title}
                                    </h3>
                                    <span className="text-[10px] uppercase tracking-widest text-jap-gold-500 font-bold">
                                        Spirit Guide
                                    </span>
                                </div>
                            </div>

                            <p className="text-sm text-gray-700 leading-relaxed mb-6 font-medium">
                                {step.content}
                            </p>

                            <div className="flex items-center justify-between mt-2">
                                <div className="flex gap-1">
                                    {TOUR_STEPS.map((_, i) => (
                                        <div
                                            key={i}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStep ? 'w-6 bg-jap-vermilion' : 'w-1.5 bg-gray-300'}`}
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={handleNext}
                                    className="px-6 py-2 bg-jap-indigo text-white text-xs font-bold tracking-widest rounded shadow-md hover:bg-jap-violet transition-colors"
                                >
                                    {currentStep === TOUR_STEPS.length - 1 ? 'BEGIN JOURNEY' : 'NEXT'}
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
