import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SITE_CONFIG } from '@/lib/constants';
import { CriticalCSS } from '@/components/shared/CriticalCSS';
import ClientLayout from './ClientLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Glovanta Exim | Premium Quality Exports from India',
    template: `%s | Glovanta Exim`,
  },
  description: SITE_CONFIG.description,
  keywords: 'export, spices, dehydrated products, textile, India, global export, premium quality',
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
    ],
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'jobH6JlK37sNRbMTO3HhEAh-ZTlEu_7JNtCr3CQyPVI',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Critical CSS inline - prevents render blocking */}
        <CriticalCSS />
        
        {/* Preload critical fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload hero images for better LCP */}
        <link rel="preload" as="image" href="/hero-bg-mobile.avif" media="(max-width: 640px)" />
        <link rel="preload" as="image" href="/hero-bg-tablet.avif" media="(min-width: 641px) and (max-width: 1024px)" />
        <link rel="preload" as="image" href="/hero-bg-desktop.avif" media="(min-width: 1025px)" />
        
        {/* DNS prefetch for external services */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        
        {/* Google Analytics - loaded after interactive */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-WG7MYLJK9C"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WG7MYLJK9C', {
                'page_path': window.location.pathname,
                'send_page_view': false
              });
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
