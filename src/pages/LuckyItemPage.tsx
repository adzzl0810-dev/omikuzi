
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WagaraBackground } from '../components/WagaraBackground';
import { KamiParticles } from '../components/KamiParticles';
import { ShoppingBag, Sparkles } from 'lucide-react';
import { getAmazonSearchUrl } from '../utils/affiliate';

// Simplified lucky items list
const LUCKY_ITEMS = [
    { name: "パワーストーン ブレスレット", en: "Power Stone Bracelet" },
    { name: "招き猫", en: "Maneki Neko" },
    { name: "御守", en: "Omamori" },
    { name: "水晶", en: "Crystal" },
    { name: "お香", en: "Incense" },
    { name: "風鈴", en: "Wind Chime" },
    { name: "達磨", en: "Daruma Doll" },
    { name: "数珠", en: "Juzu Beads" },
    { name: "盛り塩 セット", en: "Morishio Set" },
    { name: "朱肉", en: "Shuniku (Vermilion Ink)" },
    { name: "万年筆", en: "Fountain Pen" },
    { name: "手帳", en: "Notebook" }
];

const LuckyItemPage: React.FC = () => {
    const [birthMonth, setBirthMonth] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [result, setResult] = useState<{ name: string; en: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate calculation time for effect
        setTimeout(() => {
            if (!birthMonth || !birthDay || !birthYear) return;

            // Simple deterministic algorithm based on date string
            const birthdayStr = `${birthYear}-${birthMonth}-${birthDay}`;
            const sum = birthdayStr.split('').reduce((acc, char) => acc + (parseInt(char) || 0), 0);
            const index = sum % LUCKY_ITEMS.length;
            setResult(LUCKY_ITEMS[index]);
            setLoading(false);
        }, 1500);
    };

    const amazonLink = result
        ? getAmazonSearchUrl(result.en)
        : '#';

    // Debug logging
    React.useEffect(() => {
        if (result) {
            console.log("Generating Amazon Link:", {
                item: result.en,
                tag: import.meta.env.VITE_AMAZON_ASSOCIATE_TAG,
                url: amazonLink
            });
        }
    }, [result, amazonLink]);

    return (
        <div className="min-h-screen relative overflow-hidden font-serif text-white pt-24 pb-20 px-4 md:px-8">
            <WagaraBackground />
            <KamiParticles />

            <div className="absolute inset-0 bg-street-dark/80 backdrop-blur-sm z-0"></div>

            <div className="relative z-10 max-w-xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-3xl md:text-4xl font-bold font-display tracking-widest mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan via-white to-neon-cyan">
                            GUARDIAN ORACLE
                        </span>
                    </h1>
                    <p className="text-sm tracking-[0.3em] uppercase text-neon-cyan font-bold opacity-80">
                        Reveal Your Lucky Item
                    </p>
                </motion.div>

                {/* Input Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-black/60 backdrop-blur-md p-8 rounded-xl border border-neon-cyan/30 shadow-[0_0_30px_rgba(0,255,255,0.1)] mb-8 relative z-20"
                >
                    <form onSubmit={handleCalculate} className="space-y-6">
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                                Date of Birth <span className="text-[10px] opacity-50">(MM/DD/YYYY)</span>
                            </label>

                            <div className="flex gap-4">
                                {/* Month */}
                                <div className="relative flex-1">
                                    <select
                                        value={birthMonth}
                                        onChange={(e) => setBirthMonth(e.target.value)}
                                        className="w-full bg-black/40 border-b border-gray-600 focus:border-neon-cyan py-3 px-2 focus:outline-none transition-all font-mono text-lg text-white appearance-none cursor-pointer"
                                        required
                                    >
                                        <option value="" disabled className="text-gray-500">MM</option>
                                        {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                                            <option key={m} value={m} className="bg-black text-white">
                                                {String(m).padStart(2, '0')}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
                                </div>

                                {/* Day */}
                                <div className="relative flex-1">
                                    <select
                                        value={birthDay}
                                        onChange={(e) => setBirthDay(e.target.value)}
                                        className="w-full bg-black/40 border-b border-gray-600 focus:border-neon-cyan py-3 px-2 focus:outline-none transition-all font-mono text-lg text-white appearance-none cursor-pointer"
                                        required
                                    >
                                        <option value="" disabled className="text-gray-500">DD</option>
                                        {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                                            <option key={d} value={d} className="bg-black text-white">
                                                {String(d).padStart(2, '0')}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
                                </div>

                                {/* Year */}
                                <div className="flex-1">
                                    <input
                                        type="number"
                                        placeholder="YYYY"
                                        min="1900"
                                        max={new Date().getFullYear()}
                                        value={birthYear}
                                        onChange={(e) => setBirthYear(e.target.value)}
                                        className="w-full bg-black/40 border-b border-gray-600 focus:border-neon-cyan py-3 px-2 focus:outline-none transition-all font-mono text-lg text-white appearance-none"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading || !birthMonth || !birthDay || !birthYear}
                            className={`w-full py-4 font-bold tracking-[0.2em] transition-all duration-300 border relative z-20
                                ${loading
                                    ? "bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed"
                                    : "bg-neon-cyan/20 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_20px_#0ff] cursor-pointer"
                                }`}
                        >
                            {loading ? "DIVINING..." : "REVEAL LUCKY ITEM"}
                        </button>
                    </form>
                </motion.div>

                {/* Result Display */}
                {result && !loading && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-br from-jap-indigo/80 to-black p-8 rounded-xl border border-jap-gold-300 text-center relative overflow-hidden group z-20"
                    >
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>

                        <Sparkles className="w-12 h-12 text-jap-gold-300 mx-auto mb-4 animate-pulse relative z-10" />

                        <h3 className="text-gray-400 text-xs uppercase tracking-widest mb-2 relative z-10">Your Guardian Object</h3>
                        <h2 className="text-3xl font-bold text-white mb-2 font-display relative z-10">{result.en}</h2>
                        <p className="text-neon-cyan font-mono text-sm mb-8 relative z-10">{result.name}</p>

                        <a
                            href={amazonLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#FF9900] text-black font-bold py-3 px-8 rounded-full hover:bg-[#ffad33] transition-colors shadow-lg hover:shadow-xl relative z-30 cursor-pointer pointer-events-auto"
                        >
                            <ShoppingBag size={20} />
                            Find on Amazon
                        </a>

                        <p className="mt-4 text-[10px] text-gray-500 relative z-10">
                            * Uses Amazon Associate Program
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default LuckyItemPage;
