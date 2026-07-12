'use client';

import dynamic from 'next/dynamic';

const AIRecommender = dynamic(() => import('@/components/AIRecommender'), {
  ssr: false,
  loading: () => null,
});

export default function AIRecommenderWrapper() {
  return <AIRecommender />;
}
