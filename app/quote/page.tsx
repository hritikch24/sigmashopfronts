import type { Metadata } from 'next';
import QuoteCalculator from '@/components/QuoteCalculator';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Instant Quote Calculator | Sigma Shopfronts',
  description:
    'Get an instant ballpark price for your aluminium shopfront, roller shutter, security door or automatic door. Free site survey to confirm the exact cost.',
  alternates: { canonical: 'https://www.sigmashopfronts.com/quote' },
};

export default function QuotePage() {
  return (
    <>
      <div className="container-max pt-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Instant Quote' }]} />
      </div>
      <QuoteCalculator />
    </>
  );
}
