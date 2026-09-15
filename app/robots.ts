import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/admin', '/metrics'] },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Anthropic-ai', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
    ],
    // sitemap-retire.xml is temporary: it exists only so Google recrawls the
    // noindexed service x city pages and drops them. Remove both it and this
    // line once they are out of the index.
    sitemap: [
      'https://www.sigmashopfronts.com/sitemap.xml',
      'https://www.sigmashopfronts.com/sitemap-retire.xml',
    ],
  };
}
