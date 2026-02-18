import React, { useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../contexts/SoundContext';

export const AudioController: React.FC = () => {
    const { isPlaying, togglePlay } = useSound();
    const [hasInteracted, setHasInteracted] = useState(() => {
        return localStorage.getItem('street_spirit_audio_consent') === 'true';
    });

    const handleInitialPlay = () => {
        setHasInteracted(true);
        localStorage.setItem('street_spirit_audio_consent', 'true');
        if (!isPlaying) togglePlay();
    };

    // Auto-dismiss the prompt after 10 seconds to be less obtrusive
    React.useEffect(() => {
        if (!hasInteracted) {
            const timer = setTimeout(() => {
                setHasInteracted(true);
                // We don't save to localStorage here so it might show again next session, 
                // or we can save it to 'dismissed' state. For now, let's just hide it.
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [hasInteracted]);

    const handleToggle = () => {
        if (!hasInteracted) {
            handleInitialPlay();
        } else {
            togglePlay();
        }
    };

    const handleSilent = () => {
        setHasInteracted(true);
        localStorage.setItem('street_spirit_audio_consent', 'true');
    };

    return (
        <>
            {/* Fixed Toggle Button */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed bottom-4 left-4 z-50 p-3 bg-black/20 backdrop-blur-sm border border-white/10 rounded-full text-white/50 hover:text-white hover:bg-black/40 transition-all hover:scale-110"
                onClick={handleToggle}
                title={isPlaying ? "Mute Ambient Sound" : "Play Ambient Sound"}
            >
                {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </motion.button>

            {/* Initial Consent Modal */}
            <AnimatePresence>
                {!hasInteracted && !isPlaying && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-24 left-4 right-4 md:left-4 md:right-auto md:bottom-20 z-50 md:w-auto max-w-sm mx-auto md:mx-0 p-4 bg-jap-indigo/90 backdrop-blur-md border border-jap-gold-300/30 text-white rounded-lg shadow-2xl"
                    >
                        <div className="flex items-start gap-3">
                            <Music className="w-5 h-5 text-jap-gold-300 mt-1" />
                            <div>
                                <h4 className="font-serif font-bold text-sm mb-1 text-jap-gold-300">Enter the Sanctuary?</h4>
                                <p className="text-xs text-gray-300 mb-3 leading-relaxed">
                                    Enhance your experience with ambient sound.
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleInitialPlay}
                                        className="px-3 py-1 bg-jap-gold-300 text-jap-indigo text-xs font-bold rounded hover:bg-white transition-colors"
                                    >
                                        Allow Sound
                                    </button>
                                    <button
                                        onClick={handleSilent}
                                        className="px-3 py-1 text-xs text-gray-400 hover:text-white transition-colors"
                                    >
                                        Silent
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
