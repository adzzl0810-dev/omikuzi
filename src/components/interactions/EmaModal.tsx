import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { emaService } from '../../services/emaService';
import { useAuth } from '../../contexts/AuthContext';
import { KikyoLoader } from '../KikyoLoader';
import { X } from 'lucide-react';

interface EmaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export const EmaModal: React.FC<EmaModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const { user } = useAuth();
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [isPublic, setIsPublic] = useState(true);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !content.trim()) return;

        setLoading(true);
        try {
            await emaService.postEma(user.id, content);
            setContent('');
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Failed to submit Ema', error);
            alert('Failed to offer Ema. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal Content - Ema Shape */}
                    <motion.div
                        className="relative w-full max-w-md bg-[#e6cca8] rounded-t-lg shadow-2xl border-4 border-[#d4b08c] p-8 aspect-[4/3]"
                        style={{
                            clipPath: "polygon(50% 0%, 100% 15%, 100% 100%, 0% 100%, 0% 15%)"
                        }}
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 50 }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-[#8b5a2b] hover:text-jap-vermilion transition-colors z-20"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex flex-col h-full items-center justify-center text-center relative z-10">
                            <h2 className="text-2xl font-serif font-bold text-jap-indigo mb-2">Offer a Wish</h2>
                            <p className="text-xs text-[#8b5a2b] mb-6">Write your wish on this Ema plate.</p>

                            <form onSubmit={handleSubmit} className="w-full flex-1 flex flex-col items-center">
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="I wish for..."
                                    className="w-full h-32 bg-white/50 border border-[#d4b08c] rounded p-4 font-serif text-jap-indigo placeholder:text-[#d4b08c] focus:outline-none focus:ring-2 focus:ring-jap-vermilion resize-none mb-4"
                                    maxLength={140}
                                    disabled={loading}
                                />
                                <div className="text-right w-full text-xs text-[#8b5a2b] mb-4">
                                    {content.length}/140
                                </div>

                                {/* Privacy Toggle (Optional, defaulted to Public) */}
                                <label className="flex items-center gap-2 text-sm text-[#8b5a2b] mb-6 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isPublic}
                                        onChange={(e) => setIsPublic(e.target.checked)}
                                        className="accent-jap-vermilion"
                                    />
                                    Share with others (Anonymous)
                                </label>

                                <button
                                    type="submit"
                                    disabled={loading || !content.trim()}
                                    className="px-8 py-2 bg-jap-vermilion text-white font-bold rounded shadow-md hover:bg-jap-red transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {loading ? <KikyoLoader /> : 'Hang Ema'}
                                </button>
                            </form>
                        </div>

                        {/* Decoration */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                            <span className="text-9xl text-jap-vermilion">叶</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
