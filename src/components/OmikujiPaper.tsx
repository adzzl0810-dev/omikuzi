import React from 'react';
import { OmikujiResult } from '../services/gemini';
import { BackgroundCircles } from './ui/background-circles';
import { KikyoMon } from './icons/KikyoMon';
import { Download } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface OmikujiPaperProps {
    result: OmikujiResult;
    godImage?: string | null;
    onRetry: () => void;
}

export const OmikujiPaper: React.FC<OmikujiPaperProps> = ({ result, godImage, onRetry }) => {
    const [showToast, setShowToast] = useState(false);
    const paperRef = React.useRef<HTMLDivElement>(null);

    // ... (keep handleDownloadImage and handleShare same)

    const handleDownloadImage = async () => {
        if (!paperRef.current) return;

        try {
            const html2canvas = (await import('html2canvas')).default;
            const canvas = await html2canvas(paperRef.current, {
                scale: 2, // High resolution
                backgroundColor: null,
                useCORS: true // Essential for god images if external
            });

            const image = canvas.toDataURL("image/png");

            // Create download link
            const link = document.createElement('a');
            link.href = image;
            link.download = `street-spirit-omikuji-${new Date().toISOString().split('T')[0]}.png`;
            link.click();

            // Optional: Also try to share if on mobile
            if (navigator.share) {
                canvas.toBlob(async (blob) => {
                    if (blob) {
                        const file = new File([blob], 'omikuji.png', { type: 'image/png' });
                        try {
                            await navigator.share({
                                files: [file],
                                title: 'My Omikuji',
                                text: `I drew ${result.fortune} at Street Spirit.`
                            });
                        } catch (e) {
                            console.log('Share failed or cancelled', e);
                        }
                    }
                });
            }

        } catch (err) {
            console.error('Failed to capture image:', err);
            alert("Could not generate image. Please screenshot manually.");
        }
    };

    const handleShare = async () => {
        const text = `✨ My Spirit Guide: ${result.god_name}\n🔮 Destiny: ${result.fortune}\n\nDiscover your digital deity at Street Spirit. #DigitalSanctuary`;
        const url = window.location.origin;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Street Spirit Oracle',
                    text: text,
                    url: url,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            try {
                await navigator.clipboard.writeText(`${text}\n${url}`);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
            } catch (err) {
                console.error('Failed to copy API', err);
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
            }
        }
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 py-20 text-jap-indigo overflow-hidden font-serif">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 bg-shinto-white">
                <BackgroundCircles variant="primary" /> {/* Changed variant to primary (lighter) */}
            </div>

            {/* The Paper (Washi) */}
            <div ref={paperRef} className="relative z-10 w-full max-w-2xl bg-[#FCF9F2] p-8 md:p-16 shadow-2xl min-h-[800px] flex flex-col items-center border-y-8 border-double border-jap-vermilion/50">
                {/* Texture Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')]" />

                {/* Corners */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-jap-gold-300 opacity-50"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-jap-gold-300 opacity-50"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-jap-gold-300 opacity-50"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-jap-gold-300 opacity-50"></div>

                {/* Header Section */}
                <div className="flex w-full justify-between items-start mb-12 border-b border-jap-gold-300 pb-6">
                    <div className="flex flex-col">
                        <span className="text-xs font-sans font-bold text-jap-gold-500 tracking-widest uppercase mb-1">Divine Oracle</span>
                        <h1 className="text-2xl font-serif font-bold text-jap-indigo tracking-[0.3em]">御神籤</h1>
                    </div>
                    <div className="text-right flex flex-col items-end">
                        <div className="text-5xl md:text-6xl font-serif font-black text-jap-vermilion tracking-widest drop-shadow-sm leading-none">
                            {result.fortune.split(' ')[0]}
                        </div>
                        <div className="text-sm text-jap-gold-600 font-bold uppercase mt-2 tracking-widest">{result.fortune.split(' ').slice(1).join(' ')}</div>
                    </div>
                </div>

                {/* God Image & Name */}
                <div className="flex flex-col items-center gap-6 mb-12 w-full">
                    {godImage ? (
                        <div className="relative w-56 h-72 border-8 border-white shadow-xl hover:rotate-1 transition-transform duration-700 bg-gray-100">
                            {/* Frame Inner */}
                            <div className="absolute inset-0 border border-black/10 z-10 pointer-events-none"></div>
                            <img src={godImage} alt={result.god_name} className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        <div className="relative w-40 h-40 flex items-center justify-center">
                            <div className="absolute inset-0 bg-jap-gold-100 rounded-full animate-pulse blur-xl"></div>
                            <div className="relative w-32 h-32 bg-jap-indigo text-jap-gold-300 rounded-full flex items-center justify-center border-4 border-jap-gold-300 shadow-lg">
                                <span className="text-6xl font-serif font-bold pt-2 select-none">
                                    {result.god_name.charAt(0)}
                                </span>
                            </div>
                        </div>
                    )}
                    <div className="text-center">
                        <div className="text-xs text-jap-gold-500 uppercase tracking-[0.3em] mb-2">Guardian Spirit</div>
                        <h3 className="text-2xl font-bold text-jap-indigo tracking-widest border-b-2 border-jap-vermilion/30 pb-2 inline-block">
                            {result.god_name}
                        </h3>
                    </div>
                </div>

                {/* Waka (Poem) */}
                <div className="w-full bg-white/60 p-8 mb-12 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-jap-gold-300"></div>
                    <p className="text-xl font-serif text-jap-indigo mb-4 leading-loose italic tracking-wide text-center">
                        "{result.waka.text}"
                    </p>
                    <p className="text-sm text-jap-violet font-sans text-right uppercase tracking-wider opacity-80">
                        — The Spirit's Voice
                    </p>
                    <div className="mt-4 pt-4 border-t border-jap-gold-200 text-sm text-gray-600 leading-relaxed text-justify">
                        {result.waka.meaning}
                    </div>
                </div>

                {/* Detailed Advice Grid */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-sm md:text-base text-gray-700">
                    {[
                        { label: "Wish (願望)", val: result.advice.wish },
                        { label: "Love (恋愛)", val: result.advice.love },
                        { label: "Connection (待ち人)", val: result.advice.waiting_person },
                        { label: "Work (商売)", val: result.advice.business },
                        { label: "Wisdom (学問)", val: result.advice.studies },
                        { label: "Journey (旅立ち)", val: result.advice.travel },
                        { label: "Lost Items (失せ物)", val: result.advice.lost_item },
                        { label: "Lucky Key (幸運鍵)", val: result.lucky_item },
                    ].map((item, i) => (
                        <div key={i} className="border-b border-jap-gold-200 pb-2 group">
                            <span className="font-bold text-jap-vermilion block text-xs uppercase tracking-[0.2em] mb-1 group-hover:text-jap-gold-500 transition-colors">{item.label}</span>
                            <span className="leading-relaxed">{item.val}</span>
                        </div>
                    ))}
                </div>

                {/* Footer Stamp - Red Seal */}
                <div className="mt-16 opacity-80 mix-blend-multiply">
                    <div className="w-24 h-24 border-4 border-jap-vermilion rounded-lg flex items-center justify-center rotate-[-5deg]">
                        <span className="text-jap-vermilion font-serif font-bold text-xl writing-vertical-rl tracking-widest">電子神社</span>
                    </div>
                </div>
            </div>

            <div className="mt-16 flex flex-col items-center gap-6 relative z-20 w-full max-w-md mx-auto">
                {/* Share Button - Primary Action for Growth */}
                {/* Share Button - Primary Action for Growth */}
                <div className="w-full flex gap-4">
                    <button
                        onClick={handleShare}
                        className="flex-1 px-4 py-4 bg-jap-indigo text-white font-serif tracking-[0.2em] hover:bg-jap-violet transition-colors shadow-lg flex items-center justify-center gap-2 group relative overflow-hidden"
                    >
                        <KikyoMon className="w-5 h-5 text-jap-gold-300 group-hover:rotate-180 transition-transform duration-700" />
                        <span className="text-sm md:text-base">SHARE DESTINY</span>
                    </button>

                    <button
                        onClick={() => {
                            const text = `✨ My Spirit Guide: ${result.god_name}\n🔮 Destiny: ${result.fortune}\n\nDiscover your digital deity at Street Spirit. #DigitalSanctuary`;
                            const url = window.location.origin;
                            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                        }}
                        className="px-6 py-4 bg-black text-white hover:bg-gray-800 transition-colors shadow-lg flex items-center justify-center rounded-sm"
                        aria-label="Share on X (Twitter)"
                    >
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                    </button>

                    <button
                        onClick={handleDownloadImage}
                        className="px-6 py-4 bg-jap-gold-300 text-white hover:bg-jap-gold-400 transition-colors shadow-lg flex items-center justify-center rounded-sm"
                        aria-label="Save as Image"
                    >
                        <Download size={20} />
                    </button>
                </div>

                <AnimatePresence>
                    {showToast && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="absolute bottom-full mb-4 px-6 py-3 bg-jap-indigo/90 text-white text-sm font-serif tracking-widest rounded-full shadow-xl pointer-events-none whitespace-nowrap z-50 backdrop-blur-sm border border-jap-gold-300/30"
                        >
                            ✨ Copied to clipboard!
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    onClick={onRetry}
                    className="w-full px-8 py-4 border border-jap-indigo text-jap-indigo font-sans font-bold text-xs tracking-[0.3em] hover:bg-jap-indigo/5 transition-colors uppercase"
                >
                    Tie the Knot (Return)
                </button>
            </div>

            {/* Related Content / Further Guidance - Phase 10 */}
            <div className="mt-24 max-w-4xl w-full px-4 relative z-10">
                <div className="text-center mb-8">
                    <span className="text-jap-vermilion font-bold tracking-[0.2em] uppercase text-xs block mb-2">
                        DEEPEN YOUR SPIRIT
                    </span>
                    <h3 className="text-2xl font-serif text-jap-indigo">Further Guidance</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link to="/columns" className="group relative overflow-hidden bg-white border border-jap-gold-300 p-6 hover:shadow-lg transition-all duration-300">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-jap-indigo/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150"></div>
                        <h4 className="font-serif font-bold text-lg mb-2 group-hover:text-jap-vermilion transition-colors">Spiritual Insights</h4>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                            Read about the meaning behind your fortune and ancient wisdom for modern life.
                        </p>
                        <span className="text-xs font-bold uppercase tracking-widest text-jap-indigo group-hover:underline decoration-jap-vermilion underline-offset-4">
                            Read Columns &rarr;
                        </span>
                    </Link>

                    <Link to="/zazen" className="group relative overflow-hidden bg-jap-indigo text-white border border-jap-indigo p-6 hover:shadow-lg transition-all duration-300">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150"></div>
                        <h4 className="font-serif font-bold text-lg mb-2 text-jap-gold-300">Digital Zazen</h4>
                        <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                            Clear your mind and align your spirit. Experience a moment of digital silence.
                        </p>
                        <span className="text-xs font-bold uppercase tracking-widest text-white group-hover:underline decoration-jap-gold-300 underline-offset-4">
                            Enter Meditation &rarr;
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};
