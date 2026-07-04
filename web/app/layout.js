import localFont from 'next/font/local';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';

// Self-hosted, preloaded fonts. next/font eliminates the flash-of-unstyled-text
// (FOUT) by preloading and applying a size-adjusted fallback to avoid layout
// shift. Each exposes a CSS variable consumed by the design tokens in globals.css.
const dmSans = localFont({
  src: [
    { path: '../public/fonts/DMSans-Variable.ttf', weight: '100 1000', style: 'normal' },
    { path: '../public/fonts/DMSans-Italic-Variable.ttf', weight: '100 1000', style: 'italic' },
  ],
  variable: '--font-dm-sans',
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
  adjustFontFallback: 'Arial',
});

const ppEditorial = localFont({
  src: '../public/fonts/PPEditorialNew-Italic.otf',
  weight: '400',
  style: 'italic',
  variable: '--font-pp-editorial',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

const fhLecturis = localFont({
  src: '../public/fonts/FHLecturis-Bold.otf',
  weight: '700',
  style: 'normal',
  variable: '--font-fh-lecturis',
  display: 'swap',
  fallback: ['sans-serif'],
});

export const metadata = {
  title: 'Neuroid — Integrated Growth & Creative Studio for D2C brands',
  description:
    'Neuroid blends performance marketing and content that people feel — one team running one loop, so creative and growth compound together.',
  metadataBase: new URL('https://neuroidmedia.com'),
  openGraph: {
    title: 'Neuroid — Integrated Growth & Creative Studio',
    description:
      'Scroll-stopping creatives and the performance marketing that scales it — built by one team, run on one loop, so your ROAS and your brand grow together.',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${ppEditorial.variable} ${fhLecturis.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
