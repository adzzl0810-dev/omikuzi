import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

interface SoundContextType {
    isPlaying: boolean;
    isMuted: boolean;
    volume: number; // 0.0 to 1.0
    currentTrack: string | null;
    togglePlay: () => void;
    setVolume: (vol: number) => void;
    setTrack: (url: string | null) => void;
    fadeTo: (url: string | null, duration?: number) => void;
    setMuted: (muted: boolean) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const useSound = () => {
    const context = useContext(SoundContext);
    if (!context) {
        throw new Error('useSound must be used within a SoundProvider');
    }
    return context;
};

// Default Ambient Track
const DEFAULT_BGM = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3";

export const SoundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.3);
    const [currentTrack, setCurrentTrack] = useState<string | null>(DEFAULT_BGM);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const fadeInterval = useRef<NodeJS.Timeout | null>(null);

    // Initialize Audio
    useEffect(() => {
        audioRef.current = new Audio();
        audioRef.current.loop = true;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    // Handle Track Changes & Playback
    useEffect(() => {
        if (!audioRef.current) return;

        // If track changed, update src
        if (currentTrack && audioRef.current.src !== currentTrack) {
            audioRef.current.src = currentTrack;
            if (isPlaying) {
                audioRef.current.play().catch(e => console.log("Audio play failed:", e));
            }
        }

        // Handle Play/Pause
        if (isPlaying && !isMuted && currentTrack) {
            audioRef.current.play().catch(e => console.log("Audio play failed:", e));
        } else {
            audioRef.current.pause();
        }

        // Handle Volume
        audioRef.current.volume = isMuted ? 0 : volume;

    }, [isPlaying, isMuted, volume, currentTrack]);

    const togglePlay = () => {
        setIsPlaying(prev => !prev);
    };

    const setMutedState = (muted: boolean) => {
        setIsMuted(muted);
    };

    const fadeTo = (newTrack: string | null, duration: number = 2000) => {
        if (!audioRef.current) return;

        // Simple crossfade logic (fade out -> change track -> fade in)
        // For simplicity, we'll just fade out, swap, and fade in volume

        const steps = 20;
        const stepTime = duration / steps;
        const originalVolume = volume;
        let currentStep = 0;

        if (fadeInterval.current) clearInterval(fadeInterval.current);

        // Fade Out
        fadeInterval.current = setInterval(() => {
            if (!audioRef.current) return;
            currentStep++;
            const newVol = originalVolume * (1 - currentStep / steps);
            audioRef.current.volume = Math.max(0, newVol);

            if (currentStep >= steps) {
                if (fadeInterval.current) clearInterval(fadeInterval.current);

                // Swap Track
                setCurrentTrack(newTrack);

                // Fade In
                currentStep = 0;
                fadeInterval.current = setInterval(() => {
                    if (!audioRef.current) return;
                    currentStep++;
                    const vol = originalVolume * (currentStep / steps);
                    audioRef.current.volume = Math.min(originalVolume, vol);

                    if (currentStep >= steps) {
                        if (fadeInterval.current) clearInterval(fadeInterval.current);
                    }
                }, stepTime);
            }
        }, stepTime);
    };

    return (
        <SoundContext.Provider value={{
            isPlaying,
            isMuted,
            volume,
            currentTrack,
            togglePlay,
            setVolume,
            setTrack: setCurrentTrack,
            fadeTo,
            setMuted: setMutedState
        }}>
            {children}
        </SoundContext.Provider>
    );
};
