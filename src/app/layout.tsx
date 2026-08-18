import type { Metadata, Viewport } from 'next';
import { Alkatra, Geist, Geist_Mono } from 'next/font/google';
import { Header } from '@/components/layout';
import { jsonLd, siteMetadata } from '@/lib/seo';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const alkatra = Alkatra({
  variable: '--font-alkatra',
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
});

export const metadata: Metadata = siteMetadata();

export const viewport: Viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${alkatra.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
