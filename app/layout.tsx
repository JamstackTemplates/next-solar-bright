import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@fontsource/bagel-fat-one/latin.css';
import '@fontsource-variable/golos-text';
import '@fontsource-variable/reddit-mono';
import { ThemeProvider } from 'jamstacks';
import { ThemeScript } from 'jamstacks/server';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { business } from '../content/business';
import { asset } from '../lib/paths';
import { site } from '../lib/site';
import './tailwind.input.css';

const description = site.description || business.introduction;
const ogImage = site.url ? `${site.url}/og.png` : asset('/og.png');

export const metadata: Metadata = {
  title: { default: `${business.name} — Solar & batteries for Adelaide homes`, template: `%s — ${business.name}` },
  description,
  ...(site.url ? { metadataBase: new URL(`${site.url}/`) } : {}),
  openGraph: {
    type: 'website',
    siteName: business.name,
    title: `${business.name} — Solar & batteries for Adelaide homes`,
    description,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Sunward Solar — Solar & batteries for Adelaide homes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${business.name} — Solar & batteries for Adelaide homes`,
    description,
    images: [ogImage],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <ThemeScript />
      </head>
      <body>
        <ThemeProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
