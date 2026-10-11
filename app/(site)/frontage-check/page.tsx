import Link from 'next/link';
import PageHead from '@/components/site/PageHead';
import JsonLd from '@/components/site/JsonLd';
import FrontageCheck from '@/components/site/FrontageCheck';
import { absolute, breadcrumbs, ORG_ID, pageMeta } from '@/lib/seo';
import { authorities } from '@/data/authorities';

const path = '/frontage-check';
const lede =
  'Tell us where the shop is, whether the building is listed or in a conservation area, and what you want to fit. You get two answers straight away: the consents you are likely to need, and what would suit the building — drawn from the council’s own guidance where we hold it.';

export const metadata = pageMeta({
  path,
  title: 'Frontage check: what am I allowed to put on my shop?',
  description:
    'Free shopfront planning check. Likely consents for signs, shutters, glazing and awnings, what your council’s own guidance says, and the specification an installer would put forward. No contact details needed.',
});

export default function FrontageCheckPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbs(path, [{ name: 'Frontage check', path }]),
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            '@id': `${absolute(path)}#tool`,
            name: 'Frontage check',
            url: absolute(path),
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Any',
            isAccessibleForFree: true,
            description: lede,
            provider: { '@id': ORG_ID },
          },
        ]}
      />
      <PageHead trail={[{ name: 'Frontage check', path }]} title="What am I allowed to put here — and what will look right?" lede={lede} />
      <section className="band band--sheet">
        <div className="frame split">
          <div>
            <FrontageCheck />
          </div>
          <aside style={{ display: 'grid', gap: '1.25rem', alignContent: 'start' }}>
            <div className="panel panel--ink">
              <h2 style={{ fontSize: '1.2rem' }}>What this is — and is not</h2>
              <ul className="copy" style={{ marginTop: '0.7rem' }}>
                <li>Guidance from shopfront installers, not a planning consultant, and not a planning decision.</li>
                <li>It never tells you consent is unnecessary. The best it can say is “check first”.</li>
                <li>Council-specific points come only from documents we have read and cite, with dates.</li>
                <li>Where we hold nothing for your council, it says so rather than borrowing a neighbour’s rules.</li>
                <li>A grant is mentioned only with a dated source on the council’s own website.</li>
              </ul>
            </div>
            <div className="panel">
              <h2 style={{ fontSize: '1.2rem' }}>Councils with full data</h2>
              <p style={{ marginTop: '0.5rem', fontSize: '0.95rem' }}>
                {authorities
                  .map((a) => a.place)
                  .sort()
                  .join(', ')}
                . <Link href="/planning">See them all</Link>.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
