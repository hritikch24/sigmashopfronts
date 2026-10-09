import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';

import { SITE_URL } from '@/lib/site';
import { business, indexingOn, tracking } from '@/lib/business';

// Self-hosted (OFL, see app/fonts/LICENSE.md): no build-time call to Google,
// which failed intermittently and would fail a deploy with it. `optional`:
// a late font never re-renders the page (that late swap was setting LCP);
// the fallbacks are metric-adjusted, so the first visit barely differs.
const display = localFont({ src: './fonts/archivo-var.woff2', weight: '500 700', variable: '--f-display', display: 'optional', preload: false, adjustFontFallback: 'Arial' });
const text = localFont({ src: './fonts/plex-sans-var.woff2', weight: '400 600', variable: '--f-text', display: 'optional', preload: false, adjustFontFallback: 'Arial' });
const mono = localFont({
  src: [
    { path: './fonts/plex-mono-400.woff2', weight: '400' },
    { path: './fonts/plex-mono-500.woff2', weight: '500' },
  ],
  variable: '--f-mono',
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s · ${business.name}`,
    // The template never applies to the segment that defines it, so the
    // default spells the brand out itself.
    default: `${business.name} — shopfronts and shutters that get through planning`,
  },
  description:
    'Aluminium shopfronts, roller shutters and glazing fitted UK-wide, specified around what your council will accept. Repairs within 100 road miles of Birmingham.',
  robots: indexingOn ? { index: true, follow: true } : { index: false, follow: true },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/assets/sigma-icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/sigma-icon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/assets/sigma-icon-180.png', sizes: '180x180' }],
  },
  manifest: '/manifest.webmanifest',
  other: {
    'geo.region': 'GB-SAW',
    'geo.placename': 'Oldbury',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a1420',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${display.variable} ${text.variable} ${mono.variable}`}>
      <head>
        {tracking.gtm && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${tracking.gtm}');`,
            }}
          />
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
