import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)', ...defaultTheme.fontFamily.sans],
        heading: ['Clash Display', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.3rem' }],
        'base': ['1rem', { lineHeight: '1.6rem' }],
        'lg': ['1.125rem', { lineHeight: '1.8rem' }],
        'xl': ['1.25rem', { lineHeight: '1.8rem' }],
        '2xl': ['1.5rem', { lineHeight: '2.1rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.3rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.6rem' }],
        '5xl': ['3rem', { lineHeight: '3.5rem' }],
        '6xl': ['3.75rem', { lineHeight: '4rem' }],
      },
      spacing: {
        '4xs': '2px',
        '3xs': '4px',
        '2xs': '8px',
        'xs': '12px',
        'sm': '16px',
        'md': '24px',
        'lg': '32px',
        'xl': '40px',
        '2xl': '48px',
      },
      colors: {
        content: {
          white: '#ffffff',
          black: '#0b1220',
          surface: '#151d2b',
          elevated: '#1f2937',
          coral: {
            DEFAULT: '#f4632a',
            light: '#f89673',
            dark: '#d94e1a',
            50: '#fef2ee',
            100: '#fde1d6',
            200: '#fac0aa',
            300: '#f89673',
            400: '#f67a4e',
            500: '#f4632a',
            600: '#d94e1a',
            700: '#b83d12',
            800: '#96310f',
            900: '#7a2913'
          },
          navy: {
            DEFAULT: '#0b1220',
            light: '#151d2b',
            dark: '#060a14',
          },
          accent: { DEFAULT: '#f4632a', light: '#f89673', dark: '#d94e1a' },
          cta:    { DEFAULT: '#f4632a', light: '#f89673', dark: '#d94e1a' },
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-in': 'slideIn 0.3s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'scale': 'scale 0.3s ease-out forwards',
        'lift': 'lift 0.3s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'bubble-rise': 'bubble-rise 4s ease-in-out infinite',
        'formula-appear': 'formula-appear 0.5s ease-out forwards',
        'progress-glow': 'progress-glow 2s ease-in-out infinite',
        'status-breathe': 'status-breathe 2.5s ease-in-out infinite',
        'marquee-left': 'marquee-left 160s linear infinite',
        'marquee-right': 'marquee-right 176s linear infinite',
        'research-bubble': 'research-bubble 2.5s ease-out infinite',
        'scan-line': 'scan-line 4s linear infinite',
        'hazard-slide': 'hazard-slide 1s linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'aurora-1': 'aurora-1 15s ease-in-out infinite',
        'aurora-2': 'aurora-2 18s ease-in-out infinite',
        'aurora-3': 'aurora-3 20s ease-in-out infinite'
      },
      boxShadow: {
        'soft': '0 2px 10px 0 rgba(0, 0, 0, 0.05)',
        'hover': '0 15px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -5px rgba(0, 0, 0, 0.05)',
        'focus': '0 0 0 3px rgba(244, 99, 42, 0.5)',
        'glass': '0 8px 32px 0 rgba(22, 27, 36, 0.3)',
        'neumorphic': '12px 12px 24px #d1d9e6, -12px -12px 24px #ffffff'
      },
      borderRadius: {
        'xs': '4px',
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
        '4xl': '32px'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        glow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(244, 99, 42, 0.5)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 30px rgba(244, 99, 42, 0.8)' }
        },
        'bubble-rise': {
          '0%': { transform: 'translateY(0) translateX(0) scale(1)', opacity: '0.7' },
          '25%': { transform: 'translateY(-25%) translateX(6px) scale(1.05)', opacity: '0.6' },
          '50%': { transform: 'translateY(-50%) translateX(-4px) scale(0.95)', opacity: '0.4' },
          '75%': { transform: 'translateY(-75%) translateX(3px) scale(0.9)', opacity: '0.2' },
          '100%': { transform: 'translateY(-100%) translateX(-2px) scale(0.85)', opacity: '0' }
        },
        'formula-appear': {
          from: { opacity: '0', transform: 'scale(0.92)', filter: 'blur(4px)' },
          to: { opacity: '1', transform: 'scale(1)', filter: 'blur(0)' }
        },
        'progress-glow': {
          '0%, 100%': { boxShadow: '0 0 4px rgba(244, 99, 42, 0.3), 0 0 8px rgba(244, 99, 42, 0.2)' },
          '50%': { boxShadow: '0 0 8px rgba(244, 99, 42, 0.6), 0 0 16px rgba(244, 99, 42, 0.4)' }
        },
        'status-breathe': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(0.98)' }
        },
        'marquee-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'marquee-right': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' }
        },
        'research-bubble': {
          '0%':   { transform: 'translateY(0) scale(1)', opacity: '0.7' },
          '20%':  { transform: 'translateY(-16px) translateX(3px) scale(0.9)', opacity: '0.6' },
          '40%':  { transform: 'translateY(-35px) translateX(-2px) scale(0.75)', opacity: '0.45' },
          '60%':  { transform: 'translateY(-52px) translateX(4px) scale(0.6)', opacity: '0.3' },
          '80%':  { transform: 'translateY(-68px) translateX(-1px) scale(0.45)', opacity: '0.12' },
          '100%': { transform: 'translateY(-85px) translateX(2px) scale(0.3)', opacity: '0' }
        },
        'scan-line': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(400%)' }
        },
        'hazard-slide': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '18px 18px' }
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'aurora-1': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -20px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 15px) scale(0.95)' }
        },
        'aurora-2': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(-25px, 25px) scale(1.05)' },
          '66%': { transform: 'translate(20px, -15px) scale(1.1)' }
        },
        'aurora-3': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1.05)' },
          '33%': { transform: 'translate(15px, 20px) scale(1)' },
          '66%': { transform: 'translate(-30px, -10px) scale(1.1)' }
        }
      }
    },
  },
  plugins: [
    function({ addUtilities }: { addUtilities: Function }) {
      const newUtilities = {
        '.text-shadow-sm': {
          textShadow: '0 1px 1px rgba(0, 0, 0, 0.05)'
        },
        '.text-shadow': {
          textShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        },
        '.text-shadow-lg': {
          textShadow: '0 2px 5px rgba(0, 0, 0, 0.2)'
        },
        '.text-shadow-xl': {
          textShadow: '0 3px 6px rgba(0, 0, 0, 0.3)'
        },
        '.backdrop-blur-xs': {
          backdropFilter: 'blur(2px)'
        },
        '.backdrop-blur-2xl': {
          backdropFilter: 'blur(40px)'
        },
        '.backdrop-blur-3xl': {
          backdropFilter: 'blur(64px)'
        },
        '.glass': {
          background: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.18)'
        },
        '.glass-dark': {
          background: 'rgba(15, 23, 42, 0.25)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(15, 23, 42, 0.18)'
        }
      }
      addUtilities(newUtilities)
    }
  ],
};

export default config;
