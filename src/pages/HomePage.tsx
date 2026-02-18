import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { WagaraBackground } from '../components/WagaraBackground';
import { Hero } from '../components/Hero';
import { ColumnSection } from '../components/ColumnSection';
import { KamiParticles } from '../components/KamiParticles';
import { InputForm } from '../components/InputForm';
import { AboutSection } from '../components/AboutSection';
import { ToriiGate } from '../components/ToriiGate';
import { OfferingBox } from '../components/OfferingBox';
import { Temizu } from '../components/Temizu';
import { Worship } from '../components/Worship';
import { OmikujiBox } from '../components/OmikujiBox';
import { OmikujiPaper } from '../components/OmikujiPaper';
import { generateFortune, OmikujiResult } from '../services/gemini';
import { generateGodImage } from '../services/nanobanana';
import { useAuth } from '../contexts/AuthContext';
import { userService } from '../services/userService';
import { goshuinService } from '../services/goshuinService';
import { GoshuinReveal } from '../components/interactions/GoshuinReveal';
import { EmaWall } from '../components/EmaWall';
import { EmaModal } from '../components/interactions/EmaModal';
import { OnboardingTour } from '../components/ui/OnboardingTour';

export const HomePage: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<OmikujiResult | null>(null);
    const [godImage, setGodImage] = useState<string | null>(null);

    // Flow State
    const [showStart, setShowStart] = useState(true);
    const [showTemizu, setShowTemizu] = useState(false);
    const [showWorship, setShowWorship] = useState(false);
    const [showOffering, setShowOffering] = useState(false);
    const [showInputForm, setShowInputForm] = useState(false);
    const [showGoshuinReveal, setShowGoshuinReveal] = useState(false);
    const [showEmaModal, setShowEmaModal] = useState(false);

    // Refs for smooth scrolling
    const offeringRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLDivElement>(null);
    const resultRef = useRef<HTMLDivElement>(null);

    // Scroll Effects
    useEffect(() => {
        if (showOffering && offeringRef.current) {
            offeringRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [showOffering]);

    useEffect(() => {
        if (showInputForm && inputRef.current) {
            inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [showInputForm]);

    useEffect(() => {
        if (result && resultRef.current) {
            resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [result]);

    const handleStart = () => {
        setShowStart(false);
        setShowTemizu(true);
    };

    const handleOffered = () => {
        setShowInputForm(true);
    };

    const handleGenerate = async (input: string) => {
        if (!user) {
            alert("Connecting to the Spiritual Network... (Authenticating)");
            // In a real flow, we might force login here or allow anon with local storage
            return;
        }

        setLoading(true);
        setResult(null);
        setGodImage(null);

        try {
            // 1. Generate Fortune Analysis
            const [fortune] = await Promise.all([
                generateFortune(input),
                new Promise(resolve => setTimeout(resolve, 4500))
            ]);

            // 2. Save result to DB & Increment Count
            await userService.incrementReadingCount(user.id);

            setResult(fortune);

            // 3. Generate God Image
            if (fortune.god_prompt) {
                const imageResult = await generateGodImage(fortune.god_prompt);
                setGodImage(imageResult.imageUrl);

                // 4. Save COMPLETE reading to DB
                await userService.saveReading(user.id, input, fortune, imageResult.imageUrl);
            } else {
                await userService.saveReading(user.id, input, fortune, null);
            }
        } catch (error) {
            console.error(error);
            alert("The Spirits are silent... (API Error)");
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setResult(null);
        setGodImage(null);
        setShowInputForm(false);
        setShowOffering(false);
        setShowTemizu(false);
        setShowWorship(false);
        setShowStart(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCloseResult = async () => {
        if (user) {
            // Check and award Goshuin
            const entry = await goshuinService.awardGoshuin(user.id);
            if (entry) {
                setShowGoshuinReveal(true);
                return;
            }
        }
        handleReset();
    };

    const handleGoshuinComplete = () => {
        setShowGoshuinReveal(false);
        handleReset();
    };

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-shinto-white font-serif text-jap-indigo selection:bg-jap-violet selection:text-white">
            <Helmet>
                <title>{result ? `Your Destiny: ${result.fortune} | Street Spirit` : "Street Spirit | Digital Sanctuary & Omikuji"}</title>
                <meta name="description" content={result ? `I received a message from ${result.god_name}: "${result.waka.text}". Discover your own spirit guide at the Digital Sanctuary.` : "Enter the Digital Sanctuary. A modern spiritual space to connect with the Universe, receive guidance, and manifest your destiny through the algorithm."} />
                <meta name="keywords" content="Digital Shrine, Online Omikuji, Manifestation Tool, Daily Guidance, Spirit Guides, Japanese Spirituality, Meditation" />
                <meta property="og:title" content={result ? `My Spirit Guide: ${result.god_name}` : "Street Spirit: Digital Sanctuary"} />
            </Helmet>

            <WagaraBackground />
            <KamiParticles />
            <ToriiGate />

            <ToriiGate />

            {/* Main Flow Container */}
            <div className={`transition-opacity duration-1000 ${result ? 'opacity-0 pointer-events-none absolute inset-0' : 'opacity-100'}`}>

                {/* 1. Hero / Landing */}
                {showStart && (
                    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-12 p-4 pb-20">
                        <Hero onStart={handleStart} onShowCollection={() => navigate('/archives')} />

                        {/* New Columns Section - Now Links to Page */}
                        <div className="w-full bg-white/50 backdrop-blur-sm py-12 rounded-sm border-y border-jap-gold-100">
                            {/* Re-using ColumnSection but maybe modifying it to link? 
                                 Ideally we just link the whole section title or 'read more' to /columns 
                                 For now, let's keep the component visually but make it clickable to go to /columns effectively 
                             */}
                            <div onClick={() => navigate('/columns')} className="cursor-pointer">
                                <ColumnSection />
                            </div>
                        </div>

                        <AboutSection />

                        {/* Ema Wall Section */}
                        <div className="w-full relative py-12">
                            <h3 className="text-center text-jap-vermilion font-bold tracking-[0.2em] uppercase mb-8">
                                Community Wishes (絵馬)
                            </h3>
                            <EmaWall />
                            <div className="absolute bottom-20 left-0 right-0 flex justify-center pointer-events-none">
                                <button
                                    onClick={() => setShowEmaModal(true)}
                                    className="pointer-events-auto px-8 py-3 bg-jap-vermilion/90 text-white font-bold tracking-widest hover:bg-jap-indigo transition-colors shadow-lg rounded-full backdrop-blur-sm"
                                >
                                    MAKE A WISH
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. Temizu (Purification) */}
                {showTemizu && (
                    <Temizu onComplete={() => { setShowTemizu(false); setShowWorship(true); }} />
                )}

                {/* 3. Worship (Hai) */}
                {showWorship && (
                    <Worship onComplete={() => { setShowWorship(false); setShowOffering(true); }} />
                )}

                {/* 3. Offering Box (Saisen-bako) */}
                {showOffering && (
                    <div ref={offeringRef} className="relative z-10 min-h-[80vh] flex items-center justify-center">
                        <OfferingBox onOffered={handleOffered} />
                    </div>
                )}

                {/* 5. Input Form (Worry) */}
                {showInputForm && (
                    <div ref={inputRef} className="relative z-10 min-h-[80vh] flex flex-col items-center justify-center gap-8 pb-32">
                        <InputForm onSubmit={handleGenerate} isLoading={loading} />
                        {loading && (
                            <div className="absolute inset-x-0 bottom-0 top-0 z-20 flex items-center justify-center bg-black/80 backdrop-blur-md transition-all duration-500">
                                <OmikujiBox />
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* 4. Result (Traditional Paper) */}
            {result && (
                <div ref={resultRef} className="relative z-20 min-h-screen bg-jap-indigo">
                    <OmikujiPaper
                        result={result}
                        godImage={godImage}
                        onRetry={handleCloseResult}
                    />
                </div>
            )}

            {/* 5. Goshuin Reveal Animation */}
            {showGoshuinReveal && (
                <GoshuinReveal onComplete={handleGoshuinComplete} />
            )}

            {/* Ema Modal */}
            <EmaModal
                isOpen={showEmaModal}
                onClose={() => setShowEmaModal(false)}
                onSuccess={() => {
                    // Ideally we refresh the EmaWall here, but EmaWall polls anyway
                }}
            />

            <OnboardingTour />
        </div>
    );
}
