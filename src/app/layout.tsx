import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { CartProvider } from '@/components/cart';
import { Footer, Header, PrototypeBar, WhatsAppButton } from '@/components/chrome';
import { JsonLd } from '@/components/ui';
import { SITE } from '@/data/site';

const serif = localFont({
  src: [
    { path: '../fonts/playfair-display-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/playfair-display-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/playfair-display-latin-600-normal.woff2', weight: '600', style: 'normal' },
    { path: '../fonts/playfair-display-latin-400-italic.woff2', weight: '400', style: 'italic' },
  ], variable: '--font-serif', display: 'swap',
});
const sans = localFont({
  src: [
    { path: '../fonts/jost-latin-300-normal.woff2', weight: '300', style: 'normal' },
    { path: '../fonts/jost-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/jost-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/jost-latin-600-normal.woff2', weight: '600', style: 'normal' },
  ], variable: '--font-sans', display: 'swap',
});

// The prototype must never be indexed. Set NEXT_PUBLIC_ALLOW_INDEXING=true only on the real production site.
const indexable = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'Kizora Skincare | Slow-made skincare from near Kanha, MP', template: '%s' },
  description: 'Small-batch aloe gels, face mists, oils and natural soaps made near Kanha, Madhya Pradesh. Simple morning and evening rituals, with ingredients explained clearly.',
  robots: indexable ? { index: true, follow: true } : { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  openGraph: { type: 'website', siteName: 'Kizora Skincare', locale: 'en_IN', images: [{ url: '/images/home/og.webp', width: 1200, height: 630 }] },
};
export const viewport: Viewport = { themeColor: '#F6F1E8', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-cream focus:p-3">Skip to content</a>
        <CartProvider>
          <PrototypeBar />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
        <JsonLd data={{
          '@context': 'https://schema.org', '@type': 'Organization', name: SITE.name, legalName: SITE.legal, url: SITE.url,
          logo: `${SITE.url}/images/logo.webp`, email: SITE.email, telephone: SITE.phone,
          address: { '@type': 'PostalAddress', streetAddress: 'WW-24, Malibu Town', addressLocality: 'Gurugram', addressRegion: 'Haryana', addressCountry: 'IN' },
          sameAs: ['https://www.instagram.com/kizora.skincare/', 'https://www.facebook.com/kizora.life'],
        }} />
      </body>
    </html>
  );
}
