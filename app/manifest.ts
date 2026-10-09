import type { MetadataRoute } from 'next';
import { business } from '@/lib/business';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: business.name,
    short_name: 'Sigma',
    start_url: '/',
    display: 'browser',
    background_color: '#f3f5f7',
    theme_color: '#0a1420',
    icons: [
      { src: '/assets/sigma-appicon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/assets/sigma-appicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
