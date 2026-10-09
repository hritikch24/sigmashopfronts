import Link from 'next/link';
import PageHead from '@/components/site/PageHead';
import JsonLd from '@/components/site/JsonLd';
import { breadcrumbs, pageMeta } from '@/lib/seo';
import { authorities, docStatusLabel, type HeritageExternalLine } from '@/data/authorities';

export const metadata = pageMeta({
  path: '/planning',
  title: 'Shopfront and shutter rules, council by council',
  description:
    'What eighteen UK councils’ own planning documents say about shopfronts, shutters and signs — each point cited to the document and paragraph, with the date we checked it.',
});

const LINE: Record<HeritageExternalLine, { label: string; cls: string }> = {
  'not-acceptable': { label: 'Not acceptable', cls: 'verdict--refuse' },
  'normally-refused': { label: 'Normally refused', cls: 'verdict--caution' },
  'exception-only': { label: 'Named exceptions only', cls: 'verdict--caution' },
};

export default function PlanningIndex() {
  const sorted = [...authorities].sort((a, b) => a.place.localeCompare(b.place));
  return (
    <>
      <JsonLd data={breadcrumbs('/planning', [{ name: 'Planning', path: '/planning' }])} />
      <PageHead
        trail={[{ name: 'Planning', path: '/planning' }]}
        label={<><b>Sheet 02</b> · Planning by council</>}
        title="Shopfront rules, council by council"
        lede="Councils genuinely differ on shopfronts — different documents, different conservation areas, different tolerance of shutters. Each page below is built from that council’s own published guidance, with every point referenced so you can check it."
      />
      <section className="band band--sheet">
        <div className="frame">
          <div className="table-wrap">
            <table style={{ minWidth: '44rem' }}>
              <thead>
                <tr>
                  <th scope="col">Council</th>
                  <th scope="col">External shutters, heritage settings</th>
                  <th scope="col">Main document</th>
                  <th scope="col">Our repairs</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((a) => {
                  const d = a.documents[0];
                  return (
                    <tr key={a.slug}>
                      <td>
                        <Link href={`/planning/${a.slug}`}>
                          <strong>{a.place}</strong>
                        </Link>
                        <div style={{ fontSize: '0.88rem', color: 'var(--color-ink-3)' }}>{a.council}</div>
                      </td>
                      <td>
                        <span className={`verdict ${LINE[a.heritageExternal].cls}`}>{LINE[a.heritageExternal].label}</span>
                      </td>
                      <td style={{ fontSize: '0.92rem' }}>
                        {d.title}
                        <div className="ref">
                          {d.date} · {docStatusLabel[d.status]}
                        </div>
                      </td>
                      <td style={{ fontSize: '0.92rem' }}>{a.repairs === 'inside' ? 'Inside our radius' : 'Installation only'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="band">
        <div className="frame split">
          <div className="copy measure">
            <h2>Why only these councils</h2>
            <p>
              A page here exists only where we could read the council’s current shopfront guidance on its own website and
              cite it. Where a council’s documents were unavailable to us, out of date beyond use, or silent on shopfronts, it
              does not get a page — a page that guesses at policy is worse than none.
            </p>
            <p>
              That leaves out places we work in, including Manchester, Liverpool, Sheffield, Wolverhampton, Stoke-on-Trent and
              Cardiff. The frontage check still works for them: it tells you plainly that we hold no data for that council and
              what the national rules suggest.
            </p>
          </div>
          <div className="panel">
            <h3>Read next</h3>
            <ul className="copy" style={{ marginTop: '0.7rem' }}>
              <li><Link href="/planning/conservation-areas">What a conservation area changes for a shopfront</Link></li>
              <li><Link href="/explained/why-solid-shutters-get-refused">Why solid shutters get refused</Link></li>
              <li><Link href="/explained/advertisement-consent">Advertisement consent for shop signs</Link></li>
              <li><Link href="/grants">Shopfront grants we can verify</Link></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
