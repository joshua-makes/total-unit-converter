import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Total Unit Converter',
  description: 'Fast, clean unit converter for length, weight, temperature, volume, and speed.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('tuc:theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch {}
            `,
          }}
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
