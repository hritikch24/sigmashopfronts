import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHead from '@/components/site/PageHead';
import JsonLd from '@/components/site/JsonLd';
import { breadcrumbs, pageMeta, service } from '@/lib/seo';
import { whatsappLink } from '@/lib/quick-line';
import { towns } from '@/data/towns';
import { business } from '@/lib/business';
import { authorities, authorityBySlug, docStatusLabel, type Authority, type Point } from '@/data/authorities';

export const dynamicParams = false;

export function generateStaticParams() {
  return authorities.map((a) => ({ authority: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ authority: string }> }) {
  const { authority } = await params;
  const a = authorityBySlug.get(authority);
  if (!a) return {};
  return pageMeta({ path: `/planning/${a.slug}`, title: `Shopfronts and shutters in ${a.place}: what ${a.council} says`, description: a.headline });
}

const NATION: Record<Authority['nation'], string> = {
  england: 'England',
  scotland: 'Scotland',
  wales: 'Wales',
  'northern-ireland': 'Northern Ireland',
};

function Points({ a, points }: { a: Authority; points: Point[] }) {
  return (
    <ul className="rows" style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
      {points.map((p, i) => {
        const d = a.documents.find((x) => x.id === p.doc)!;
        return (
          <li key={i}>
            <p>{p.text}</p>
            <span className="ref">
              {d.title}
              {p.ref ? `, ${p.ref}` : ''}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default async function AuthorityPage({ params }: { params: Promise<{ authority: string }> }) {
  const { authority } = await params;
  const a = authorityBySlug.get(authority);
  if (!a) notFound();
  const path = `/planning/${a.slug}`;
  const repairTown = towns.find((t) => t.council === a.council);
  const trail = [
    { name: 'Planning', path: '/planning' },
    { name: a.place, path },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbs(path, trail), service(path, `Shopfronts and shutters in ${a.place}`, a.headline, 'uk', a.place)]} />
      <PageHead trail={trail} label={<><b>{a.council}</b></>} title={`Shopfronts and shutters in ${a.place}`} lede={a.headline}>
        <div className="acts" style={{ marginTop: '1.4rem' }}>
          <a href={`tel:${business.phones.main.tel}`} className="act act--solid" data-dial="main">
            Call {business.phones.main.display}
          </a>
          <a href={whatsappLink(business.whatsapp, `Hello Sigma Shopfronts, I am asking about a shopfront in ${a.place}. Postcode: `)} className="act act--wa" data-dial="whatsapp" rel="noopener">
            WhatsApp a photo
          </a>
          <Link href={`/frontage-check?council=${a.slug}`} className="act act--line">
            Check your frontage
          </Link>
        </div>
        <p style={{ marginTop: '0.8rem', fontSize: '0.95rem', color: 'var(--color-ink-3)' }}>{business.freeQuote}.</p>
      </PageHead>

      <section className="band band--sheet">
        <div className="frame">
          <dl className="titleblock">
            <div>
              <dt>Planning authority</dt>
              <dd>{a.council}</dd>
            </div>
            <div>
              <dt>Planning system</dt>
              <dd>{NATION[a.nation]}</dd>
            </div>
            <div>
              <dt>Main document</dt>
              <dd>{a.documents[0].date}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{docStatusLabel[a.documents[0].status]}</dd>
            </div>
            <div>
              <dt>Main retail streets</dt>
              <dd>{a.retailStreets.join(', ')}</dd>
            </div>
            <div>
              <dt>Our repairs</dt>
              <dd>
                {a.repairs === 'inside' ? (
                  repairTown ? (
                    <Link href={`/repair-radius/${repairTown.slug}`}>Repairs in {repairTown.name}, same-day for emergencies</Link>
                  ) : (
                    `Inside our ${business.repairRadiusMiles}-mile repair radius`
                  )
                ) : (
                  'Installation work only'
                )}
              </dd>
            </div>
          </dl>
          <div className="copy measure" style={{ marginTop: '2rem' }}>
            {a.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="frame split">
          <div className="measure">
            <h2>Shutters and security</h2>
            {a.securityOrder && (
              <ol className="copy" style={{ marginTop: '1rem' }}>
                {a.securityOrder.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            )}
            <Points a={a} points={a.shutters} />
            {a.heritage && (
              <>
                <h2 style={{ marginTop: '2.5rem' }}>Historic shopfronts</h2>
                <Points a={a} points={a.heritage} />
              </>
            )}
            {a.signage && (
              <>
                <h2 style={{ marginTop: '2.5rem' }}>Signs and lighting</h2>
                <Points a={a} points={a.signage} />
              </>
            )}
          </div>
          <aside style={{ display: 'grid', gap: '1.25rem', alignContent: 'start' }}>
            <div className="panel panel--ink">
              <p className="sheet-label" style={{ color: '#9fb0c2' }}>
                Our advice — an installer’s opinion, not council policy
              </p>
              <p style={{ marginTop: '0.6rem' }}>{a.ourAdvice}</p>
            </div>
            <div className="panel">
              <h3>Check your own frontage</h3>
              <p style={{ marginTop: '0.5rem', fontSize: '0.97rem' }}>
                Tell us what you want to fit and whether the building is listed or in a conservation area. The answer uses
                {` ${a.council}’s`} guidance above.
              </p>
              <Link href={`/frontage-check?council=${a.slug}`} className="act act--solid" style={{ marginTop: '0.9rem' }}>
                Frontage check for {a.place}
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="band band--sheet">
        <div className="frame measure">
          <h2>Sources</h2>
          <ul className="rows" style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
            {a.documents.map((d) => (
              <li key={d.id}>
                <a href={d.url} rel="noopener">
                  {d.title}
                </a>
                <span className="ref">
                  {d.date} · {docStatusLabel[d.status]} · read on {new Date(d.checked).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </li>
            ))}
          </ul>
          <p className="note" style={{ marginTop: '1.2rem' }}>
            Policies change. Before you order anything, confirm with {a.council} — a pre-application enquiry gets you a written
            view on your drawings.
          </p>
        </div>
      </section>
    </>
  );
}
