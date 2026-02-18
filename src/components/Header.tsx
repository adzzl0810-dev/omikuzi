import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { KikyoCrest } from './ui/KikyoCrest';

interface HeaderProps {
    onHome: () => void;
    onLogin: () => void;
    showLogin?: boolean;
    showLogo?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onHome, onLogin, showLogin = true, showLogo = true }) => {
    const { user } = useAuth();

    return (
        <header className="fixed top-0 left-0 right-0 h-20 z-50 flex items-center justify-between px-6 pointer-events-none">
            {/* Logo / Home Button - Always Visible if showLogo is true */}
            <div className={`transition-opacity duration-500 ${showLogo ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <motion.button
                    onClick={onHome}
                    className="flex items-center gap-3 group relative"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="w-12 h-12 bg-jap-vermilion rounded-sm flex items-center justify-center shadow-lg border border-jap-gold-300 relative overflow-hidden group-hover:bg-jap-indigo transition-colors duration-500">
                        <KikyoCrest className="w-8 h-8 text-white relative z-10" />
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </div>

                    <div className="hidden md:flex flex-col items-start bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-sm border border-jap-gold-100 shadow-sm">
                        <span className="text-jap-indigo font-brush text-xl leading-none tracking-widest group-hover:text-jap-vermilion transition-colors">Omikuji</span>
                        <span className="text-[10px] text-jap-gold-500 tracking-[0.2em] uppercase font-serif font-bold mt-0.5">Digital Sanctuary</span>
                    </div>
                </motion.button>
            </div>

            {/* Login / Collection Button */}
            {showLogin && (
                <motion.button
                    onClick={onLogin}
                    className="pointer-events-auto flex items-center gap-3 px-6 py-2.5 bg-white/90 backdrop-blur-md border border-jap-gold-300 text-jap-indigo font-serif text-xs hover:bg-jap-indigo hover:text-jap-gold-300 transition-all duration-300 uppercase tracking-widest rounded-sm shadow-xl group border-l-4 border-l-jap-gold-400"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="text-xl group-hover:rotate-12 transition-transform drop-shadow-sm">
                        {user ? '📜' : '🔐'}
                    </span>
                    <span className="font-bold hidden md:block">
                        {user ? 'MY ARCHIVES' : 'CONNECT SPIRIT'}
                    </span>
                    <span className="font-bold md:hidden">
                        {user ? 'ARCHIVES' : 'CONNECT'}
                    </span>
                </motion.button>
            )}
        </header>
    );
};
