/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                shinto: {
                    white: '#FDFBF7', // Washi / Hodomura
                    paper: '#FCF9F2',
                },
                jap: {
                    violet: '#4B0082', // Ancient nobility (Kodai-murasaki)
                    indigo: '#121420', // Kachiro (Darker Indigo for better contrast)
                    vermilion: '#C93618', // Torii Red (Slightly darker for white text contrast)
                    gold: {
                        100: '#F8F1D2',
                        200: '#F3E5AB',
                        300: '#C59D2F', // Darkened from #D4AF37 for better text contrast
                        400: '#A8760A', // Darkened from #B8860B
                        500: '#8A6008', // Darker
                        600: '#6B4006',
                    }
                },
                neon: {
                    purple: '#BC13FE',
                    pink: '#FE019A',
                    cyan: '#00F0FF',
                },
                street: {
                    dark: '#0a0a0f', // Deep dark for cyberpunk backgrounds
                    gray: '#2a2a35'
                },
                'sumi': {
                    900: '#050510', // Deepest black ink
                    800: '#1a1a1a',
                    700: '#2d2d2d',
                }
            },
            fontFamily: {
                sans: ['"Zen Old Mincho"', '"Shippori Mincho"', 'serif'],
                serif: ['"Zen Old Mincho"', '"Shippori Mincho"', 'serif'],
                display: ['"Zen Old Mincho"', 'serif'],
                brush: ['"Yuji Syuku"', 'serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            backgroundImage: {
                'washi': "url('https://www.transparenttextures.com/patterns/rice-paper-2.png')",
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 12s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            },
        },
    },
    plugins: [],
}
