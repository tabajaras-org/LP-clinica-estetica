import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        maison: {
          surface: 'var(--maison-surface)',
          surface2: 'var(--maison-surface-2)',
          soft: 'var(--maison-soft)',
          ink: 'var(--maison-ink)',
          muted: 'var(--maison-muted)',
          gold: 'var(--maison-gold)',
          champagne: 'var(--maison-champagne)',
          nude: 'var(--maison-nude)',
          line: 'var(--maison-line)',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'serif'],
        body: ['var(--font-body)', 'Inter', 'sans-serif'],
        caption: ['var(--font-caption)', 'sans-serif'],
      },
      boxShadow: {
        maison: '0 28px 70px -28px rgba(51, 32, 15, 0.22)',
        glass: '0 18px 42px -16px rgba(51, 32, 15, 0.22)',
      },
    },
  },
  plugins: [],
} satisfies Config;
