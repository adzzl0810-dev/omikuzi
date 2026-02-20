import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { KikyoMon } from './icons/KikyoMon';

interface InputFormProps {
    onSubmit: (input: string) => void;
    isLoading: boolean;
    hasCredits?: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading, hasCredits = false }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            if (hasCredits) {
                // If user has credits, just submit (HomePage handles the rest)
                onSubmit(input);
            } else {
                // Save worry to session storage for retrieval after payment
                sessionStorage.setItem('pending_worry', input);

                // Redirect to Stripe
                const paymentLink = import.meta.env.VITE_STRIPE_PAYMENT_LINK;
                if (paymentLink) {
                    window.location.href = paymentLink;
                } else {
                    alert("Payment link not configured. Please contact the shrine.");
                }
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg mx-auto bg-black/60 backdrop-blur-md border border-neon-purple/50 p-8 rounded-xl shadow-[0_0_30px_rgba(188,19,254,0.2)] relative overflow-hidden"
        >
            {/* Decorative Corner lines */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-neon-cyan opacity-70"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-neon-pink opacity-70"></div>

            <h2 className="text-2xl font-bold text-white mb-6 text-center font-display tracking-wider">
                INPUT YOUR <span className="text-neon-pink">WORRY</span>
                <br />
                <span className="text-sm font-sans font-normal opacity-70 text-gray-300">Enter your worry to receive an oracle</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative group">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ex: I'm feeling stuck in my career and need guidance..."
                        className="w-full h-32 bg-street-dark/80 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all resize-none font-mono"
                        disabled={isLoading}
                    />
                    <div className="absolute bottom-2 right-2 text-xs text-gray-500 font-mono">
                        {input.length} chars
                    </div>
                </div>

                <div className="text-center mb-4">
                    {hasCredits ? (
                        <p className="text-sm font-bold text-neon-cyan uppercase tracking-widest animate-pulse">
                            * 1 Credit Available (No Payment Required)
                        </p>
                    ) : (
                        <p className="text-sm font-sans font-medium text-jap-gold-300">
                            * An offering of $1 is required.
                        </p>
                    )}
                    <p className="text-[10px] text-gray-500 mt-2 italic">
                        * For entertainment purposes only. No liability assumed.
                    </p>
                </div>

                <motion.button
                    whileHover="hover"
                    whileTap="tap"
                    disabled={isLoading || !input.trim()}
                    type="submit"
                    className={`w-full py-4 font-bold text-lg tracking-widest uppercase transition-all duration-300 relative overflow-hidden group 
                        ${isLoading || !input.trim()
                            ? 'bg-gray-800 text-gray-500 cursor-not-allowed border-gray-700'
                            : hasCredits
                                ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_20px_#0ff]'
                                : 'bg-jap-vermilion text-white border border-jap-vermilion hover:bg-jap-vermilion/80 hover:shadow-[0_0_20px_rgba(255,51,51,0.5)]'
                        } border`}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                            <KikyoMon className="animate-spin w-6 h-6 text-current" />
                            CONNECTING...
                        </span>
                    ) : (
                        <span>{hasCredits ? 'REVEAL (USE CREDIT)' : 'OFFER & PAY'}</span>
                    )}
                </motion.button>
            </form>
        </motion.div>
    );
};
