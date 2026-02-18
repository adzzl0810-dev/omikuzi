import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { KikyoMon } from './icons/KikyoMon';

export const Footer: React.FC = () => {
    const location = useLocation();
    const currentYear = new Date().getFullYear();

    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'Archives', path: '/archives' },
        { label: 'Insights', path: '/columns' },
        { label: 'Zazen', path: '/zazen' },
    ];

    return (
        <footer className="w-full bg-[#1a1a1a] text-stone-400 py-12 md:py-16 relative overflow-hidden font-serif border-t border-jap-gold-300/30">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/asanoha-45px.png')] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
                {/* Logo & Identity */}
                <div className="mb-10 flex flex-col items-center gap-4">
                    <KikyoMon className="w-10 h-10 text-jap-gold-500 opacity-80" />
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-stone-200 tracking-[0.2em] font-display">STREET SPIRIT</h3>
                        <p className="text-xs text-jap-gold-500/70 tracking-widest uppercase mt-1">Digital Sanctuary</p>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-10">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:text-jap-gold-300 relative group
                                ${location.pathname === item.path ? 'text-jap-gold-400 font-bold' : ''}
                            `}
                        >
                            {item.label}
                            <span className={`absolute -bottom-2 left-1/2 w-0 h-px bg-jap-gold-300 transition-all duration-300 group-hover:w-full group-hover:left-0 ${location.pathname === item.path ? 'w-full left-0' : ''}`}></span>
                        </Link>
                    ))}
                </nav>

                {/* Legal / Copyright */}
                <div className="text-xs text-stone-600 tracking-wider text-center flex flex-col md:flex-row gap-4 md:gap-8 items-center">
                    <span>&copy; {currentYear} Street Spirit. All rights reserved.</span>
                    <span className="hidden md:inline text-stone-700">|</span>
                    <a href="#" className="hover:text-stone-400 transition-colors cursor-not-allowed" title="Coming Soon">Privacy Policy</a>
                    <a href="#" className="hover:text-stone-400 transition-colors cursor-not-allowed" title="Coming Soon">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};
