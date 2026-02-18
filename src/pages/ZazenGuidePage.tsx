import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { BackgroundCircles } from '../components/ui/background-circles';
import { ArrowLeft } from 'lucide-react';

export const ZazenGuidePage: React.FC = () => {
    const navigate = useNavigate();

    const sections = [
        {
            title: "1. Preparation (調身 - Choshin)",
            jp: "調身 (姿勢を整える)",
            content: "Sit on a cushion (zafu) or chair. Cross your legs in Full Lotus, Half Lotus, or simply sit comfortably with a straight spine. Keep your hands in the Cosmic Mudra (Hokkaijoin): left hand on right, thumbs touching lightly, resting on your lap.",
            icon: "🧘"
        },
        {
            title: "2. Breathing (調息 - Chosoku)",
            jp: "調息 (呼吸を整える)",
            content: "Breathe naturally through your nose. Take a few deep breaths to settle, then establish a slow, rhythmic rhythm. Focus on the exhale—long, slow, and gentle. Let the inhale happen naturally.",
            icon: "🌬️"
        },
        {
            title: "3. Mind (調心 - Choshin)",
            jp: "調心 (心を整える)",
            content: "Do not try to stop your thoughts. Let them come and go like clouds in the sky. Do not judge them, do not pursue them. Simply return your attention to your posture and breathing.",
            icon: "🧠"
        }
    ];

    return (
        <div className="min-h-screen bg-shinto-white font-serif text-jap-indigo relative overflow-y-auto">
            <Helmet>
                <title>How to Zazen | Street Spirit</title>
            </Helmet>

            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
                <BackgroundCircles variant="primary" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-24">
                {/* Header */}
                <div className="mb-12">
                    <button
                        onClick={() => navigate('/zazen')}
                        className="flex items-center gap-2 text-jap-gold-500 hover:text-jap-vermilion transition-colors mb-6 font-bold tracking-widest text-xs uppercase"
                    >
                        <ArrowLeft size={16} /> Back to Timer
                    </button>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="text-jap-vermilion font-bold tracking-[0.3em] uppercase text-xs mb-2 block">
                            THE METHOD
                        </span>
                        <h1 className="text-4xl md:text-5xl font-brush mb-6">Zazen Guide</h1>
                        <p className="text-lg opacity-70 leading-relaxed max-w-2xl">
                            Zazen (坐禅) is the practice of "just sitting". It is the gateway to mindfulness and the core of Zen practice. Here is how to begin your journey.
                        </p>
                    </motion.div>
                </div>

                {/* Steps */}
                <div className="space-y-12">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-white/80 backdrop-blur-sm p-8 rounded-sm border-l-4 border-jap-indigo shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex flex-col md:flex-row gap-6 md:items-start">
                                <div className="text-6xl select-none opacity-20 grayscale">{section.icon}</div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-1">{section.title}</h2>
                                    <div className="text-sm text-jap-gold-500 font-bold mb-4">{section.jp}</div>
                                    <p className="text-gray-600 leading-loose">
                                        {section.content}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Conclusion */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-16 text-center"
                >
                    <p className="text-xl font-serif italic mb-8 text-jap-indigo/60">
                        "Sitting silently, doing nothing, spring comes, and the grass grows by itself."
                    </p>
                    <button
                        onClick={() => navigate('/zazen')}
                        className="px-8 py-3 bg-jap-indigo text-white font-bold tracking-widest hover:bg-jap-vermilion transition-colors shadow-lg"
                    >
                        BEGIN PRACTICE
                    </button>
                </motion.div>
            </div>
        </div>
    );
};
