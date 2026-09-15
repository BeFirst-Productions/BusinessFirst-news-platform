import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        display: ['var(--font-noto-sans-display)', 'sans-serif'],
        newsreader: ['var(--font-newsreader)', 'Newsreader', 'Georgia', 'serif'],
        serif: ['var(--font-newsreader)', 'Newsreader', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
