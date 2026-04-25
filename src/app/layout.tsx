import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { JsonLd } from '@/components/seo/JsonLd';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

const SITE_URL = 'https://www.quickunitswap.com';
const SITE_NAME = 'QuickUnitSwap';
const DESCRIPTION =
  'Free online unit converter and calculator — 15 categories, 150+ units. Convert and calculate length, area, volume, weight, temperature, speed, energy, pressure, data, fuel economy, and more. Instant results, no ads.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — 150+ Units, 15 Categories`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: [
    'unit converter',
    'online converter',
    'length converter',
    'weight converter',
    'temperature converter',
    'volume converter',
    'energy converter',
    'pressure converter',
    'data storage converter',
    'fuel economy converter',
    'metric imperial',
    'free unit calculator',
    'unit conversion tool',
  ],
  authors: [{ name: 'QuickUnitSwap', url: SITE_URL }],
  creator: 'QuickUnitSwap',
  publisher: 'QuickUnitSwap',
  category: 'tools',
  applicationName: SITE_NAME,
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — 150+ Units, 15 Categories`,
    description: DESCRIPTION,
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'QuickUnitSwap — convert and calculate with 150+ units across 15 categories',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — 150+ Units, 15 Categories`,
    creator: '@quickunitswap',
  },
  icons: {
    icon: [
      { url: '/favicon.ico',            sizes: 'any' },
      { url: '/icon-16.png',            sizes: '16x16', type: 'image/png' },
      { url: '/icon-32.png',            sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png',           sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png',   sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  other: {
    'msapplication-TileColor': '#6366f1',
    'theme-color': '#6366f1',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#6366f1' },
    { media: '(prefers-color-scheme: dark)',  color: '#818cf8' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const t=localStorage.getItem('tuc:theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch{}`,
          }}
        />
      </head>
      <body className={inter.className}>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}

