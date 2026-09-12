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
        bgIvory: '#F7F5F0',
        surfaceWhite: '#FFFFFF',
        textPrimary: '#171A21',
        textSecondary: '#686C73',
        borderIvory: '#E5E1D9',
        actionCoral: {
          DEFAULT: '#F05A3C',
          hover: '#D9482B',
          soft: '#FDF0ED',
        },
        rewardGold: {
          DEFAULT: '#FFB547',
          hover: '#E09B30',
          soft: '#FFF8EC',
        },
        successGreen: '#2E9B72',
        navyAccent: {
          DEFAULT: '#202B3C',
          soft: '#283548',
        },
        attribute: {
          strength: '#E54D42',
          intellect: '#3B82F6',
          discipline: '#2E9B72',
          creativity: '#8B5CF6',
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

