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
        bgIvory: '#FAF8F5',
        surfaceWarm: '#FFFFFF',
        surfaceParchment: '#F6F2EA',
        surfaceMuted: '#EFEBE1',
        textPrimary: '#192420',
        textSecondary: '#667770',
        borderIvory: '#E8E1D3',
        forestDark: {
          DEFAULT: '#1B4332',
          hover: '#133226',
          soft: '#E8F1EC',
        },
        warmOchre: {
          DEFAULT: '#D97706',
          hover: '#B45309',
          soft: '#FEF3C7',
        },
        terracotta: {
          DEFAULT: '#C85A3D',
          hover: '#A94328',
          soft: '#FAECE7',
        },
        dustyTeal: {
          DEFAULT: '#2A7A78',
          hover: '#1F5B5A',
          soft: '#E6F3F2',
        },
        actionCoral: {
          DEFAULT: '#1B4332',
          hover: '#133226',
          soft: '#E8F1EC',
        },
        rewardGold: {
          DEFAULT: '#D97706',
          hover: '#B45309',
          soft: '#FEF3C7',
        },
        successGreen: '#1B4332',
        navyAccent: {
          DEFAULT: '#223843',
          soft: '#EEF2F4',
        },
        attribute: {
          strength: '#C85A3D',
          intellect: '#2A7A78',
          discipline: '#1B4332',
          creativity: '#D97706',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        technical: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
