import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import './globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import MobileStickyBar from '@/components/MobileStickyBar';
import StickyDesktopCTA from '@/components/StickyDesktopCTA';
import ExitIntentPopup from '@/components/ExitIntentPopup';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import OfferBanner from '@/components/OfferBanner';
import Analytics from '@/components/Analytics';
import CallTracker from '@/components/CallTracker';
import SiteChrome from '@/components/SiteChrome';
import { Suspense } from 'react';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const siteUrl = 'https://www.sigmashopfronts.com';

export const metadata: Metadata = {
  title: {
    template: '%s | Sigma Shop Fronts',
    default: 'Sigma Shop Fronts | Professional Shopfront Installation UK',
  },
  description:
    'Leading UK shopfront specialists — aluminium shopfronts, roller shutters, security & automatic doors. Nationwide installation, 24/7 emergency callout, free site surveys. Companies House registered.',
  keywords: [
    'shopfront installation UK',
    'aluminium shopfronts',
    'roller shutters',
    'security doors',
    'automatic doors',
    'bi-fold doors',
    'fire doors',
    'shopfront repairs',
    'emergency shopfront callout',
    'shop front company UK',
    'Sigma Shop Fronts',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: siteUrl,
    siteName: 'Sigma Shop Fronts',
    title: 'Sigma Shop Fronts | Professional Shopfront Installation UK',
    description:
      'Leading UK shopfront specialists — aluminium shopfronts, roller shutters, security & automatic doors. Nationwide installation, 24/7 emergency callout, free site surveys.',
    images: [
      {
        url: `${siteUrl}/assets/sigma-hero-1.jpeg`,
        width: 1200,
        height: 630,
        alt: 'Sigma Shop Fronts — Professional Shopfront Installation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
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
  alternates: {
    canonical: siteUrl,
    languages: {
      'en-GB': siteUrl,
    },
  },
  metadataBase: new URL(siteUrl),
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1a1a2e',
};

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${plusJakartaSans.variable} ${outfit.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://www.sigmashopfronts.com/#website",
              "name": "Sigma Shop Fronts",
              "url": "https://www.sigmashopfronts.com",
              "publisher": {"@id": "https://www.sigmashopfronts.com/#organization"},
              "inLanguage": "en-GB",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {"@type": "EntryPoint", "urlTemplate": "https://www.sigmashopfronts.com/services?q={search_term_string}"},
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SiteNavigationElement",
              "@id": "https://www.sigmashopfronts.com/#navigation",
              "name": "Main Navigation",
              "url": "https://www.sigmashopfronts.com",
              "hasPart": [
                {"@type": "SiteNavigationElement", "name": "Services", "url": "https://www.sigmashopfronts.com/services"},
                {"@type": "SiteNavigationElement", "name": "Areas We Cover", "url": "https://www.sigmashopfronts.com/areas"},
                {"@type": "SiteNavigationElement", "name": "About Us", "url": "https://www.sigmashopfronts.com/about"},
                {"@type": "SiteNavigationElement", "name": "Gallery", "url": "https://www.sigmashopfronts.com/gallery"},
                {"@type": "SiteNavigationElement", "name": "Blog", "url": "https://www.sigmashopfronts.com/blog"},
                {"@type": "SiteNavigationElement", "name": "Cost Guide", "url": "https://www.sigmashopfronts.com/cost-guide"},
                {"@type": "SiteNavigationElement", "name": "FAQ", "url": "https://www.sigmashopfronts.com/faq"},
                {"@type": "SiteNavigationElement", "name": "Reviews", "url": "https://www.sigmashopfronts.com/reviews"},
                {"@type": "SiteNavigationElement", "name": "Contact", "url": "https://www.sigmashopfronts.com/contact"}
              ]
            }),
          }}
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/assets/sigma-hero-1.jpeg" />
        <link rel="apple-touch-icon" href="/assets/sigma-hero-1.jpeg" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        )}
        {/* Google Ads gtag */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-16801337867" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-16801337867');

function gtagSendEvent(url) {
  var callback = function () {
    if (typeof url === 'string') {
      window.location = url;
    }
  };
  gtag('event', 'conversion', {
    'send_to': 'AW-16801337867/TcCuCK3Jk7IcEIukwMs-',
    'event_callback': callback,
    'event_timeout': 2000,
  });
  gtag('event', 'conversion', {
    'send_to': 'AW-16801337867/u-x7CNe428gcEIukwMs-',
  });
  return false;
}

function gtag_report_conversion(url) {
  var callback = function () {
    if (typeof url !== 'undefined') {
      window.location = url;
    }
  };
  gtag('event', 'conversion', {
    'send_to': 'AW-16801337867/TcCuCK3Jk7IcEIukwMs-',
    'event_callback': callback,
  });
  gtag('event', 'conversion', {
    'send_to': 'AW-16801337867/u-x7CNe428gcEIukwMs-',
  });
  return false;
}`,
          }}
        />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="Oldbury, West Midlands, United Kingdom" />
        <meta name="geo.position" content="52.4912;-2.0150" />
        <meta name="ICBM" content="52.4912, -2.0150" />
        <link rel="alternate" hrefLang="en-gb" href="https://www.sigmashopfronts.com" />
      </head>
      <body className="min-h-full flex flex-col font-body bg-white text-charcoal">
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <SiteChrome>
          <OfferBanner />
          <Header />
        </SiteChrome>
        <main className="flex-1">{children}</main>
        <SiteChrome>
          <Footer />
          <ChatWidget />
          <MobileStickyBar />
          <StickyDesktopCTA />
          <FloatingWhatsApp />
          <ExitIntentPopup />
        </SiteChrome>
        <Suspense fallback={null}>
          <Analytics />
          <CallTracker />
        </Suspense>
      </body>
    </html>
  );
}
