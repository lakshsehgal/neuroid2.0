import localFont from 'next/font/local';
import Script from 'next/script';
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
        {/* Meta Pixel — loads site-wide; fires PageView on every page load */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '523876770030049');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }} alt=""
            src="https://www.facebook.com/tr?id=523876770030049&ev=PageView&noscript=1" />
        </noscript>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
