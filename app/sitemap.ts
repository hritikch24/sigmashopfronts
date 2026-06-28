import { MetadataRoute } from 'next';

const siteUrl = 'https://www.sigmashopfronts.com';

const serviceSlugs = [
  'aluminium-shopfronts',
  'roller-shutters',
  'security-doors',
  'automatic-doors',
  'bi-fold-doors',
  'fire-doors',
  'shopfront-repairs',
  'emergency-callout',
  'shutter-repair',
  'glass-replacement',
];

const citySlugs = [
  'london',
  'birmingham',
  'manchester',
  'leeds',
  'liverpool',
  'bristol',
  'sheffield',
  'glasgow',
  'cardiff',
  'newcastle',
  'nottingham',
  'leicester',
  'edinburgh',
  'southampton',
  'brighton',
  'coventry',
];

const blogSlugs = [
  'how-to-maintain-commercial-roller-shutters',
  'aluminium-shopfront-planning-permission-uk',
  'fd30-vs-fd60-fire-door-commercial-premises',
  'what-is-lps-1175-security-rating',
  'emergency-shopfront-boarding-what-to-do',
  'shopfront-installation-cost-uk-2026',
  'best-shopfront-company-uk-how-to-choose',
  'shopfront-design-trends-uk-2026',
  'commercial-security-shutters-guide-uk',
  'shopfront-regulations-building-standards-uk-2026',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/gallery`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/areas`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/cost-guide`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/why-choose-us`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/reviews`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ];

  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${siteUrl}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const cityPages: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: `${siteUrl}/areas/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...cityPages, ...blogPages];
}
