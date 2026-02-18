import React from 'react';

interface KikyoMonProps {
    className?: string;
}

export const KikyoMon: React.FC<KikyoMonProps> = ({ className = "w-6 h-6" }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className={className}
            fill="currentColor"
        >
            {/* Kikyo-mon (Japanese Bellflower Crest) - Standard 5-petal design */}
            {/* Using a star-like pentagon base with curved edges for petals */}
            <path d="M50 5 
                     C55 25, 60 35, 90 40 
                     C75 55, 70 60, 75 90 
                     C55 80, 50 75, 50 75 
                     C50 75, 45 80, 25 90 
                     C30 60, 25 55, 10 40 
                     C40 35, 45 25, 50 5 Z"
            />
            {/* Center Circle (Pistil) */}
            <circle cx="50" cy="50" r="8" />
        </svg>
    );
};
