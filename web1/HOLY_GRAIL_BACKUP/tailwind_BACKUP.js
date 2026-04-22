/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'alfa-pulse': 'alfaPulse 2.5s ease-in-out infinite',
        'rainbow': 'rainbow 3s linear infinite',
      },
      keyframes: {
        alfaPulse: {
          '0%, 100%': { opacity: 0.3, transform: 'scale(0.9)', filter: 'blur(15px)' },
          '50%': { opacity: 0.8, transform: 'scale(1.2)', filter: 'blur(30px)' },
        },
        rainbow: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      }
    },
  },
  plugins: [],
}
