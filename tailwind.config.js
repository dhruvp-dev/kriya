/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#EA580C', // Primary action orange
          hover: '#C2410C',
          soft: '#FFF1E8',
        },
        gold: {
          DEFAULT: '#F59E0B', // Reward currency amber/gold ONLY
        },
        dark: {
          bg: '#161310',
          surface1: '#1F1B17',
          surface2: '#26221D',
          surface3: '#2E2822',
          borderSoft: '#332D26',
          border: '#453D33',
          text: '#F5F2ED',
          textSecondary: '#A89F8F',
          textMuted: '#6B6255',
        },
        light: {
          bg: '#FAF9F6',
          surface: '#FFFFFF',
          borderSoft: '#EDEBE6',
          border: '#DEDAD2',
          borderHover: '#C7C1B5',
          text: '#1C1917',
          textSecondary: '#6B6459',
          textMuted: '#A39C8E',
        },
        rpg: {
          strength: '#EF4444',
          intellect: '#3B82F6',
          discipline: '#10B981',
          creativity: '#EC4899',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
