import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin', '/metrics'],
      },
    ],
    sitemap: 'https://www.sigmashopfronts.com/sitemap.xml',
  };
}
