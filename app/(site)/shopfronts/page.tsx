import Link from '@/components/site/Link';
import PageHead from '@/components/site/PageHead';
import JsonLd from '@/components/site/JsonLd';
import { breadcrumbs, pageMeta } from '@/lib/seo';
import { shopfronts } from '@/data/shopfronts';
import { garageDoors } from '@/lib/business';

export const metadata = pageMeta({
  path: '/shopfronts',
  title: 'Shopfronts, shutters, doors and glazing',
  description:
    `${shopfronts.length} things we make, fit and repair — shopfronts, shutters, doors and windows — each explained from the planning and compliance side: what consent it usually needs and which standards apply.`,
});

export default function ShopfrontsIndex() {
  const install = shopfronts.filter((s) => s.area === 'uk');
  const repair = shopfronts.filter((s) => s.area === 'repair-radius');
  return (
    <>
      <JsonLd data={breadcrumbs('/shopfronts', [{ name: 'Shopfronts', path: '/shopfronts' }])} />
      <PageHead
        trail={[{ name: 'Shopfronts', path: '/shopfronts' }]}
        title="Shopfronts, shutters, doors and glass"
        lede="Each page gives you a straight answer and typical prices first. Then it tells you if you are likely to need council permission, and which safety standards apply."
      />
      <section className="band">
        <div className="frame">
          <h2>Installed anywhere in the UK</h2>
          <div className="sheets" style={{ marginTop: '1.2rem' }}>
            {install.map((s) => (
              <Link key={s.slug} href={`/shopfronts/${s.slug}`}>
                <span className="sheet-title">{s.name}</span>
                <span className="sheet-meta">{s.card}</span>
              </Link>
            ))}
            {garageDoors.published && (
              <Link href="/garage-door-installation">
                <span className="sheet-title">Garage doors</span>
                <span className="sheet-meta">New and replacement garage doors, made to measure.</span>
              </Link>
            )}
          </div>
        </div>
      </section>
      <section className="band band--sheet">
        <div className="frame">
          <h2>Repaired within 100 road miles of Birmingham</h2>
          <div className="sheets" style={{ marginTop: '1.2rem' }}>
            {repair.map((s) => (
              <Link key={s.slug} href={`/shopfronts/${s.slug}`}>
                <span className="sheet-title">{s.name}</span>
                <span className="sheet-meta">{s.card}</span>
              </Link>
            ))}
            {garageDoors.published && (
              <Link href="/garage-door-repairs">
                <span className="sheet-title">Garage door repairs</span>
                <span className="sheet-meta">Springs, cables, motors and remotes on garage doors.</span>
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
