/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { 
          orange: '#F97316', // AUDIT TRUE ORANGE
          purple: '#8B5CF6', 
          dark: '#050505' 
        }
      },
      animation: { 
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #F97316' },
          '100%': { boxShadow: '0 0 20px #F97316, 0 0 10px #8B5CF6' }
        }
      }
    },
  },
  plugins: [],
}
