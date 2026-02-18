import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { KikyoMon } from './icons/KikyoMon';

interface InputFormProps {
    onSubmit: (input: string) => void;
    isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            onSubmit(input);
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
                <span className="text-sm font-sans font-normal opacity-70 text-gray-300">悩みを入力して神託を得る</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative group">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="例：最近、仕事のモチベーションが上がらない..."
                        className="w-full h-32 bg-street-dark/80 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all resize-none font-mono"
                        disabled={isLoading}
                    />
                    <div className="absolute bottom-2 right-2 text-xs text-gray-500 font-mono">
                        {input.length} chars
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoading || !input.trim()}
                    type="submit"
                    className={`w-full py-4 font-bold text-lg tracking-widest uppercase transition-all duration-300 relative overflow-hidden group 
                        ${isLoading || !input.trim()
                            ? 'bg-gray-800 text-gray-500 cursor-not-allowed border-gray-700'
                            : 'bg-neon-purple/20 text-neon-purple border border-neon-purple hover:bg-neon-purple hover:text-white hover:shadow-[0_0_20px_#bc13fe]'
                        } border`}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                            <KikyoMon className="animate-spin w-6 h-6 text-current" />
                            CONNECTING TO ORACLE...
                        </span>
                    ) : (
                        <span>OFFER PRAYER (送信)</span>
                    )}
                </motion.button>
            </form>
        </motion.div>
    );
};
