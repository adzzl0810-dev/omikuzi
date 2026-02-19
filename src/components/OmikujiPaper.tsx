import React, { useState } from 'react';
import { OmikujiResult } from '../services/gemini';
import { BackgroundCircles } from './ui/background-circles';
import { KikyoMon } from './icons/KikyoMon';
import { Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getAmazonSearchUrl } from '../utils/affiliate';
import { ShrineSeal } from './ui/ShrineSeal';

interface OmikujiPaperProps {
    result: OmikujiResult;
    godImage?: string | null;
    onRetry: () => void;
}

export const OmikujiPaper: React.FC<OmikujiPaperProps> = ({ result, godImage, onRetry }) => {
    const [showToast, setShowToast] = useState(false);
    const paperRef = React.useRef<HTMLDivElement>(null);

    const handleDownloadImage = async () => {
        if (!paperRef.current) return;
        try {
            const html2canvas = (await import('html2canvas')).default;
            const canvas = await html2canvas(paperRef.current, {
                scale: 2,
                backgroundColor: '#FCF9F2',
                useCORS: true
            });
            const image = canvas.toDataURL("image/png");
            const link = document.createElement('a');
            link.href = image;
            link.download = `street-spirit-omikuji-${new Date().toISOString().split('T')[0]}.png`;
            link.click();
        } catch (err) {
            console.error('Failed to capture image:', err);
            alert("Could not generate image. Please screenshot manually.");
        }
    };

    const handleShare = async () => {
        const text = `✨ 守護神: ${result.god_name}\n🔮 運勢: ${result.fortune}\n\n電子神社「Street Spirit」で神託を授かりました。\n#StreetSpirit #電子神籤`;
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
                console.error('Failed to copy', err);
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
            }
        }
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 py-20 text-jap-indigo overflow-hidden font-serif">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 bg-shinto-white">
                <BackgroundCircles variant="primary" />
            </div>

            {/* The Paper (Washi) */}
            <div ref={paperRef} className="relative z-10 w-full max-w-2xl bg-[#FCF9F2] p-8 md:p-16 shadow-2xl min-h-[900px] flex flex-col items-center border border-jap-gold-200">
                {/* Texture Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')]" />

                {/* Header Section */}
                <div className="flex w-full justify-between items-center mb-12 border-b-2 border-jap-vermilion pb-6">
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-serif font-bold text-jap-indigo tracking-[0.5em] writing-vertical-rl">御神籤</h1>
                    </div>
                    <div className="text-right flex flex-col items-end">
                        <div className="text-6xl font-serif font-black text-jap-vermilion tracking-widest drop-shadow-sm leading-none whitespace-pre-line">
                            {result.fortune.replace(' ', '\n')}
                        </div>
                    </div>
                </div>

                {/* Main Content Area: Traditional Grid Layout */}
                <div className="w-full flex flex-col md:flex-row gap-12 items-start mb-12">
                    {/* Left side: Waka (Vertical) */}
                    <div className="w-full md:w-1/3 flex flex-col items-center">
                        <div className="bg-white/40 p-6 border-x border-jap-gold-300 min-h-[400px] flex items-center justify-center">
                            <p className="text-2xl font-serif text-jap-indigo leading-loose tracking-[0.2em] writing-vertical-rl h-[350px]">
                                {result.waka.text}
                            </p>
                        </div>
                        <p className="mt-4 text-[10px] text-jap-gold-500 uppercase tracking-widest italic">Divine Poem</p>
                    </div>

                    {/* Right side: God and Meaning */}
                    <div className="w-full md:w-2/3 space-y-8">
                        {godImage && (
                            <div className="relative w-full aspect-[4/5] border border-jap-gold-200 shadow-lg overflow-hidden group">
                                <img src={godImage} alt={result.god_name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            </div>
                        )}

                        <div className="border-l-4 border-jap-vermilion pl-6 py-2">
                            <h3 className="text-xl font-bold text-jap-indigo tracking-widest mb-2">
                                {result.god_name}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed italic">
                                {result.waka.meaning}
                            </p>
                        </div>

                        {/* Advice Items */}
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm border-t border-jap-gold-200 pt-6">
                            {[
                                { label: "願望", val: result.advice.wish },
                                { label: "恋愛", val: result.advice.love },
                                { label: "待人", val: result.advice.waiting_person },
                                { label: "学問", val: result.advice.studies },
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col gap-1">
                                    <span className="text-[10px] font-bold text-jap-vermilion uppercase tracking-widest">{item.label}</span>
                                    <span className="text-jap-indigo font-medium">{item.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Lucky Item Section */}
                <div className="w-full bg-jap-indigo/5 p-6 border border-jap-gold-200/50 mb-12">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-[10px] font-bold text-jap-gold-600 uppercase tracking-widest block mb-1">Lucky Key (幸運の鍵)</span>
                            <span className="text-lg font-bold text-jap-indigo">{result.lucky_item}</span>
                        </div>
                        <a
                            href={getAmazonSearchUrl(result.lucky_item)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-white px-4 py-2 border border-jap-gold-300 rounded text-xs font-bold hover:bg-jap-gold-100 transition-colors"
                        >
                            Amazon <span>&rarr;</span>
                        </a>
                    </div>
                </div>

                {/* Footer Stamp - The New ShrineSeal */}
                <div className="w-full flex justify-end items-end mt-4">
                    <div className="text-right mr-4 mb-4">
                        <p className="text-[10px] font-serif opacity-40">Street Spirit Shrine</p>
                        <p className="text-[10px] font-serif opacity-40">Digital Sanctuary Alpha</p>
                    </div>
                    <ShrineSeal className="opacity-90" />
                </div>
            </div>

            <div className="mt-16 flex flex-col items-center gap-6 relative z-20 w-full max-w-md mx-auto">
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
                            const text = `✨ 守護神: ${result.god_name}\n🔮 運勢: ${result.fortune}\n\n電子神社「Street Spirit」で神託を授かりました。\n#StreetSpirit #電子神籤`;
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
