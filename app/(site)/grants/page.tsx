import Link from 'next/link';
import PageHead from '@/components/site/PageHead';
import JsonLd from '@/components/site/JsonLd';
import { breadcrumbs, pageMeta } from '@/lib/seo';
import { grants } from '@/data/authorities';

export const metadata = pageMeta({
  path: '/grants',
  title: 'Shopfront grants we can verify',
  description:
    'Council shopfront and heritage grant schemes we have checked on the council’s own website, with the date checked and whether each was open or closed. No source, no listing.',
});

const fmt = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export default function Grants() {
  return (
    <>
      <JsonLd data={breadcrumbs('/grants', [{ name: 'Grants', path: '/grants' }])} />
      <PageHead
        trail={[{ name: 'Grants', path: '/grants' }]}
        label={<><b>Sheet 03</b> · Heritage and shopfront grants</>}
        title="Shopfront grants we can verify"
        lede="Shopfront grants are local, short-lived and often fully allocated within months. We list a scheme only when we can point to it on the council’s own website, and we say when we checked and whether it was open."
      />
      <section className="band band--sheet">
        <div className="frame" style={{ display: 'grid', gap: '1.25rem' }}>
          {grants.map((g) => (
            <article key={g.name} className="panel">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h2 style={{ fontSize: '1.3rem' }}>{g.council}</h2>
                <span className={`verdict ${g.status === 'open' ? 'verdict--fine' : 'verdict--unknown'}`}>
                  {g.status === 'open' ? 'Open when checked' : 'Closed when checked'}
                </span>
              </div>
              <p className="sheet-label" style={{ marginTop: '0.3rem' }}>
                {g.name} · {g.area}
              </p>
              <p style={{ marginTop: '0.8rem' }} className="measure">
                {g.detail}
              </p>
              <p className="ref" style={{ marginTop: '0.6rem', whiteSpace: 'normal' }}>
                Source: <a href={g.url} rel="noopener">{g.url.replace(/^https?:\/\//, '')}</a> · checked {fmt(g.checked)}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="band">
        <div className="frame copy measure">
          <h2>Not listed here?</h2>
          <p>
            Then we hold no verified scheme for that council — which is not the same as there being none. Ask the council’s
            regeneration or conservation team directly, and search its website for “shopfront grant”. If you find a live
            scheme near Birmingham, we are happy to price a scheme-compliant design for the application.
          </p>
          <p>
            <Link href="/explained/heritage-shopfront-grants">How heritage shopfront grants usually work</Link> — and the
            mistakes that cost people the money.
          </p>
        </div>
      </section>
    </>
  );
}
