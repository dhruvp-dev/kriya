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
        // Aesthetic SaaS Primary Neutrals
        bgPrimary: '#FFFFFF',
        surfaceSecondary: '#F7F7F8',
        surfaceSubtle: '#F3F4F5',
        textPrimary: '#070709',
        headingStrong: '#151515',
        textSecondary: '#60606C',
        textMuted: '#8B8B8B',
        borderSubtle: '#E6E6E8',
        borderStrong: '#D0D1D4',

        // KRIYA Accent Hierarchy
        terracotta: {
          DEFAULT: '#C85A3D',
          hover: '#A94730',
          soft: '#FDF4F2',
        },
        rewardOchre: {
          DEFAULT: '#D9A441',
          hover: '#BD8C31',
          soft: '#FBF5EA',
        },
        successSage: {
          DEFAULT: '#668F72',
          hover: '#52755D',
          soft: '#F1F6F3',
        },
        structuralDark: {
          DEFAULT: '#070709',
          hover: '#1B1C1F',
          soft: '#F3F4F5',
        },

        // Legacy compatibility mappings
        bgIvory: '#FFFFFF',
        surfaceWarm: '#FFFFFF',
        borderIvory: '#E6E6E8',
        actionCoral: {
          DEFAULT: '#070709',
          hover: '#1B1C1F',
          soft: '#F3F4F5',
        },
        rewardGold: {
          DEFAULT: '#D9A441',
          hover: '#BD8C31',
          soft: '#FBF5EA',
        },
        successGreen: '#668F72',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '18px',
        '3xl': '24px',
      },
      boxShadow: {
        'subtle-elevation': '0 2px 8px -2px rgba(7, 7, 9, 0.04), 0 1px 2px 0 rgba(7, 7, 9, 0.02)',
        'premium-hover': '0 8px 24px -4px rgba(7, 7, 9, 0.06), 0 2px 6px -1px rgba(7, 7, 9, 0.03)',
      },
    },
  },
  plugins: [],
};
