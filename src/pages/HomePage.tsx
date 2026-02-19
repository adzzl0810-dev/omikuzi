import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEOHead } from '../components/seo/SEOHead';
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

    // Handle Return from Stripe
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const status = query.get('status');
        const pendingWorry = sessionStorage.getItem('pending_worry');

        console.log("Checking payment return:", { status, pendingWorry, user: !!user });

        if (user && status === 'paid' && pendingWorry) {
            // NOTE: We relaxed the 'status=paid' check to allow just returning to the site to trigger it for now, 
            // incase Stripe redirect doesn't perfectly preserve params or user navigates back manually.
            // In production, we should strictly check status=paid or verify session_id.

            // Auto-trigger generation
            setShowStart(false);
            setShowTemizu(false);
            setShowWorship(false);
            setShowOffering(false);
            setShowInputForm(true); // Show form logic (loading state)

            // Execute
            handleGenerate(pendingWorry, true); // true = isPaid

            // Cleanup
            sessionStorage.removeItem('pending_worry');
            // Remove query params to prevent re-trigger on refresh
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, [user]); // Re-run when user auth is settled

    const handleStart = () => {
        setShowStart(false);
        setShowTemizu(true);
    };

    const handleOffered = () => {
        setShowInputForm(true);
    };

    const handleGenerate = async (input: string, isPaid: boolean = false) => {
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

            // 2. Perform Secure Reading Transaction (RPC)
            // This handles DB insert && user count increment in one go
            // Determine amount (Mocking $1.00 for now if paid)
            const amount = isPaid ? 1.00 : 0;
            await userService.performReading(input, fortune, null, isPaid, amount);

            setResult(fortune);

            // 3. (Legacy Image Logic Removed)
        } catch (error: any) {
            console.error(error);
            const msg = error.message || "Unknown Error";
            alert(`The Spirits are silent... (API Error: ${msg})`);
            // Set error state to display in UI (need to add state variable first)
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
            <SEOHead
                title={result ? `Your Destiny: ${result.fortune} | Street Spirit` : "Street Spirit | Digital Sanctuary & Omikuji"}
                description={result ? `I received a message from ${result.god_name}: "${result.waka.text}". Discover your own spirit guide at the Digital Sanctuary.` : "Enter the Digital Sanctuary. A modern spiritual space to connect with the Universe, receive guidance, and manifest your destiny through the algorithm."}
                image="/pwa-512x512.png"
            />

            <WagaraBackground />
            <KamiParticles />
            {/* 1. Hero / Landing Section (One Viewport) */}
            {showStart && (
                <>
                    <div className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
                        <ToriiGate />
                        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4">
                            <Hero onStart={handleStart} onShowCollection={() => navigate('/archives')} />
                        </div>

                        {/* Scroll Indicator */}
                        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center animate-bounce">
                            <span className="text-white/50 text-xs tracking-widest uppercase">Scroll for Wisdom</span>
                        </div>
                    </div>

                    {/* Content Below Hero (No Torii Overlap) */}
                    <div className="relative z-10 bg-shinto-white">

                        {/* Access to Columns */}
                        <div className="max-w-4xl mx-auto py-12 px-4">
                            <div onClick={() => navigate('/columns')} className="cursor-pointer transform hover:scale-[1.01] transition-transform">
                                <ColumnSection />
                            </div>
                        </div>

                        <AboutSection />

                        {/* Ema Wall Section */}
                        <div className="w-full relative py-20 pb-40 bg-gradient-to-b from-shinto-white to-[#f0f0f0]">
                            <h3 className="text-center text-jap-vermilion font-bold tracking-[0.2em] uppercase mb-12">
                                Community Wishes (EMA)
                            </h3>
                            <EmaWall />
                            <div className="absolute bottom-20 left-0 right-0 flex justify-center pointer-events-none z-30">
                                <button
                                    onClick={() => setShowEmaModal(true)}
                                    className="pointer-events-auto px-8 py-3 bg-jap-vermilion/90 text-white font-bold tracking-widest hover:bg-jap-indigo transition-colors shadow-lg rounded-full backdrop-blur-sm"
                                >
                                    MAKE A WISH
                                </button>
                            </div>
                        </div>
                    </div>
                </>
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

            {/* 4. Result (Traditional Paper) */}
            {
                result && (
                    <div ref={resultRef} className="relative z-20 min-h-screen bg-jap-indigo">
                        <OmikujiPaper
                            result={result}
                            godImage={godImage}
                            onRetry={handleCloseResult}
                        />
                    </div>
                )
            }

            {/* 5. Goshuin Reveal Animation */}
            {
                showGoshuinReveal && (
                    <GoshuinReveal onComplete={handleGoshuinComplete} />
                )
            }

            {/* Ema Modal */}
            <EmaModal
                isOpen={showEmaModal}
                onClose={() => setShowEmaModal(false)}
                onSuccess={() => {
                    // Ideally we refresh the EmaWall here, but EmaWall polls anyway
                }}
            />

            <OnboardingTour />
        </div >
    );
}
