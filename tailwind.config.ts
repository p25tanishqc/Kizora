import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F6F1E8',
        paper: '#FBF8F2',
        ink: '#3A2F2A',
        ink2: '#6B5D55',
        line: '#E3D9C8',
        sage: { DEFAULT: '#879E81', deep: '#5F7559', mist: '#E7EDE3' },
        gold: { DEFAULT: '#C9A04A', deep: '#A47E2F' },
        butter: '#EFE3B5',
        blush: '#EBDAD3',
        clay: '#D9C3A8',
        dusk: '#4A3C33',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { eyebrow: '0.2em' },
      maxWidth: { site: '1240px' },
    },
  },
  plugins: [],
};
export default config;
