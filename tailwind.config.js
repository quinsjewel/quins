/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          bg: '#04130d',
          surface: '#071f16',
          card: '#0b2a1f',
          border: 'rgba(212, 175, 55, 0.22)',
        },
        gold: {
          50: '#fffdf5',
          100: '#fbf3d3',
          200: '#f6e6a6',
          300: '#edd274',
          400: '#e2ba41',
          500: '#d4af37',
          600: '#b58c25',
          700: '#8c671b',
        },
        ruby: {
          core: '#881337',
          bright: '#e11d48',
        }
      },
      fontFamily: {
        royal: ['Cinzel', 'serif'],
        serif: ['Cormorant Garamond', 'Garamond', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
