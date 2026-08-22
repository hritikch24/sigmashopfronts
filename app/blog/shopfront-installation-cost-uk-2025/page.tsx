import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: {
    canonical: '/blog/shopfront-installation-cost-uk-2026',
  },
};

export default function ShopfrontCostUK2025Redirect() {
  redirect('/blog/shopfront-installation-cost-uk-2026');
}
