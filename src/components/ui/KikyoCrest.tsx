import React from 'react';

export const KikyoCrest: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <svg
            viewBox="0 0 100 100"
            className={className}
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Kikyo (Bellflower) Crest - Pentagon base with petal curves */}
            <path d="M50 5 L63 35 L95 35 L70 55 L80 85 L50 70 L20 85 L30 55 L5 35 L37 35 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M50 15 C55 30, 65 35, 80 35 C65 45, 60 55, 65 70 C50 60, 50 60, 35 70 C40 55, 35 45, 20 35 C35 35, 45 30, 50 15" fill="currentColor" />
            <circle cx="50" cy="50" r="8" fill="white" />
            <circle cx="50" cy="50" r="4" fill="currentColor" />
        </svg>
    );
};
