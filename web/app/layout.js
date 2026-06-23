import './globals.css';

export const metadata = {
  title: 'Neuroid — Integrated Growth & Creative Studio for D2C brands',
  description:
    'Neuroid blends performance marketing and content that people feel — one team running one loop, so creative and growth compound together.',
  metadataBase: new URL('https://neuroidmedia.com'),
  openGraph: {
    title: 'Neuroid — Integrated Growth & Creative Studio',
    description:
      'The creative people feel and the media that scales it — designed together, run together, by one team that acts like yours.',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
