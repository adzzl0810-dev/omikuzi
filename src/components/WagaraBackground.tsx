import React from 'react';

export const WagaraBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-shinto-white">
            {/* Kikko (Tortoise Shell) Pattern - Full Background - Very Subtle Gold */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='68' viewBox='0 0 40 68' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 11.5V34.5L20 46L0 34.5V11.5L20 0zM20 68L0 56.5V34.5L20 23L40 34.5V56.5L20 68z' fill='none' stroke='%23D4AF37' stroke-width='0.5'/%3E%3C/svg%3E")`,
                    backgroundSize: '40px 68px',
                }}
            />

            {/* Seigaiha (Waves) Pattern - Bottom Overlay - Muted Violet */}
            <div className="absolute bottom-0 left-0 right-0 h-64 opacity-20"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='40' viewBox='0 0 80 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0c22.09 0 40 17.91 40 40H0c0-22.09 17.91-40 40-40z' fill='none' stroke='%234B0082' stroke-width='1.5'/%3E%3C/svg%3E")`,
                    backgroundSize: '160px 80px',
                    maskImage: 'linear-gradient(to top, black, transparent)',
                    WebkitMaskImage: 'linear-gradient(to top, black, transparent)'
                }}
            />

            {/* Asanoha (Hemp) Pattern - Top Right Overlay - Soft Gray */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-10"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='34.64' viewBox='0 0 60 34.64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l-15 8.66L0 0l15-8.66L30 0zm0 34.64l-15-8.66L0 34.64l15 8.66L30 34.64zM60 0l-15 8.66L30 0l15-8.66L60 0zm0 34.64l-15-8.66L30 34.64l15 8.66L60 34.64zM45 25.98l-7.5-4.33L37.5 17.32l7.5 4.33 7.5-4.33v8.66l-7.5 4.33zM15 25.98l-7.5-4.33L7.5 17.32l7.5 4.33 7.5-4.33v8.66l-7.5 4.33zM45 8.66l-7.5-4.33L37.5 0l7.5 4.33 7.5-4.33v8.66L45 8.66zM15 8.66l-7.5-4.33L7.5 0l7.5 4.33 7.5-4.33v8.66L15 8.66z' fill='none' stroke='%23333' stroke-width='1'/%3E%3C/svg%3E")`,
                    backgroundSize: '60px 34.64px',
                    maskImage: 'radial-gradient(circle at top right, black, transparent)',
                    WebkitMaskImage: 'radial-gradient(circle at top right, black, transparent)'
                }}
            />

            {/* Paper Texture Overlay */}
            <div className="absolute inset-0 bg-washi opacity-50 pointer-events-none mix-blend-multiply"></div>
        </div>
    );
};
