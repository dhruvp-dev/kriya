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
        bgIvory: '#F3F1E8',
        surfaceWhite: '#FFFDF7',
        textPrimary: '#20231F',
        textSecondary: '#70736B',
        borderIvory: '#DFDDD2',
        actionCoral: {
          DEFAULT: '#C85A3D',
          hover: '#A94730',
          soft: '#FBF0EC',
        },
        rewardGold: {
          DEFAULT: '#D9A441',
          hover: '#C28F2F',
          soft: '#FAF4E6',
        },
        successGreen: '#668F72',
        navyAccent: {
          DEFAULT: '#344653',
          soft: '#415565',
        },
        attribute: {
          strength: '#C85A3D',
          intellect: '#344653',
          discipline: '#668F72',
          creativity: '#D9A441',
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

