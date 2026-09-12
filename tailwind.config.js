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
        rpg: {
          bg: '#0F172A',
          card: '#1E293B',
          border: '#334155',
          gold: '#F59E0B',
          xp: '#8B5CF6',
          streak: '#EF4444',
          strength: '#EF4444',
          intellect: '#3B82F6',
          discipline: '#10B981',
          creativity: '#EC4899',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
