/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'aura-bg': '#0B0D11',
        'aura-cyan': '#22D3EE',
        'aura-purple': '#A855F7',
        'aura-orange': '#F97316',
      },
      animation: {
        'alfa-pulse': 'alfaPulse 1.5s ease-in-out infinite',
        'rainbow': 'rainbow 3s linear infinite',
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marqueeReverse 25s linear infinite',
      },
      keyframes: {
        alfaPulse: {
          '0%, 100%': { opacity: 0.5, transform: 'scale(0.9)', filter: 'blur(20px)' },
          '50%': { opacity: 1.0, transform: 'scale(1.4)', filter: 'blur(40px)' },
        },
        rainbow: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}