import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { JsonLd } from '@/components/seo/JsonLd';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

const SITE_URL = 'https://www.quickunitswap.com';
const SITE_NAME = 'Total Unit Converter';
const DESCRIPTION =
  'Free online unit converter with 20 categories and 180+ units — length, area, volume, weight, temperature, energy, electricity, pressure, data, fuel economy, and more. Instant results, no ads.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — 180+ Units, 20 Categories`,
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
    'electricity converter',
    'data storage converter',
    'fuel economy converter',
    'metric imperial',
    'free unit calculator',
    'unit conversion tool',
  ],
  authors: [{ name: 'Total Unit Converter', url: SITE_URL }],
  creator: 'Total Unit Converter',
  publisher: 'Total Unit Converter',
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
    title: `${SITE_NAME} — 180+ Units, 20 Categories`,
    description: DESCRIPTION,
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Total Unit Converter — convert between 180+ units across 20 categories',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — 180+ Units, 20 Categories`,
    description: DESCRIPTION,
    images: ['/og.png'],
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

