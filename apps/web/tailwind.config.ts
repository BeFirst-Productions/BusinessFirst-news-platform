import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-merriweather)', 'Merriweather', 'Georgia', 'serif'],
        serif: ['var(--font-merriweather)', 'Merriweather', 'Georgia', 'serif'],
        display: ['var(--font-merriweather)', 'Merriweather', 'Georgia', 'serif'],
        newsreader: ['var(--font-merriweather)', 'Merriweather', 'Georgia', 'serif'],
        merriweather: ['var(--font-merriweather)', 'Merriweather', 'Georgia', 'serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
