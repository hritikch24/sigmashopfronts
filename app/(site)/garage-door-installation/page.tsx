import { notFound } from 'next/navigation';
import GaragePage, { withTypes } from '@/components/site/GaragePage';
import { pageMeta } from '@/lib/seo';
import { garageDoors, garageLive } from '@/lib/business';
import { garageInstallation as page } from '@/data/garage-doors';

// Held until the owner confirms the work (lib/business.ts, garageDoors).
export function generateMetadata() {
  if (!garageLive) return {};
  return pageMeta({
    path: page.path,
    title: page.title,
    description: withTypes(page.description, garageDoors.installTypes),
    noindex: !garageDoors.published,
  });
}

export default function Page() {
  if (!garageLive) notFound();
  return <GaragePage page={page} types={garageDoors.installTypes} repair={false} />;
}
