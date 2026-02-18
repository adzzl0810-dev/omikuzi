import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    type: 'orb' | 'kanji';
    content?: string;
}

const KANJI_LIST = ['神', '霊', '運', '命', '魂', '道', '結', '兆'];

export const KamiParticles: React.FC = () => {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const particleCount = 30; // Number of floating spirits
        const newParticles: Particle[] = [];

        for (let i = 0; i < particleCount; i++) {
            const isKanji = Math.random() > 0.7; // 30% chance to be a Kanji
            newParticles.push({
                id: i,
                x: Math.random() * 100, // percentage
                y: Math.random() * 100 + 20, // start slightly lower
                size: isKanji ? Math.random() * 20 + 10 : Math.random() * 6 + 2, // Kanji bigger
                duration: Math.random() * 10 + 10, // slow floating
                delay: Math.random() * 5,
                type: isKanji ? 'kanji' : 'orb',
                content: isKanji ? KANJI_LIST[Math.floor(Math.random() * KANJI_LIST.length)] : undefined,
            });
        }
        setParticles(newParticles);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className={`absolute ${p.type === 'orb' ? 'rounded-full bg-jap-gold-400/30 blur-[1px]' : 'text-jap-violet/20 font-serif font-bold'}`}
                    style={{
                        left: `${p.x}%`,
                        width: p.type === 'orb' ? p.size : 'auto',
                        height: p.type === 'orb' ? p.size : 'auto',
                        fontSize: p.type === 'kanji' ? `${p.size}px` : undefined,
                        textShadow: p.type === 'kanji' ? '0 0 2px rgba(75, 0, 130, 0.1)' : undefined,
                    }}
                    initial={{ y: "110vh", opacity: 0 }}
                    animate={{
                        y: "-10vh",
                        opacity: [0, 0.4, 0.8, 0.4, 0],
                        x: [`${p.x}%`, `${p.x + (Math.random() * 10 - 5)}%`, `${p.x}%`], // Slight horizontal drift
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear",
                    }}
                >
                    {p.type === 'kanji' ? p.content : ''}
                </motion.div>
            ))}
        </div>
    );
};
