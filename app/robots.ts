import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

const PRIVATE = ['/admin', '/metrics', '/quote/', '/invoice/', '/api/'];
const AI = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'Claude-SearchBot', 'Google-Extended'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: PRIVATE },
      { userAgent: AI, allow: '/', disallow: PRIVATE },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
