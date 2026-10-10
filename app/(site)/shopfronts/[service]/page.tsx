import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHead from '@/components/site/PageHead';
import JsonLd from '@/components/site/JsonLd';
import { breadcrumbs, pageMeta, questions, service as serviceLd } from '@/lib/seo';
import { business } from '@/lib/business';
import { whatsappLink } from '@/lib/quick-line';
import { consentLabel, shopfrontBySlug, shopfronts } from '@/data/shopfronts';
import { costGroups } from '@/data/costs';

export const dynamicParams = false;

export function generateStaticParams() {
  return shopfronts.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  const s = shopfrontBySlug.get(service);
  if (!s) return {};
  return pageMeta({ path: `/shopfronts/${s.slug}`, title: s.name, description: s.answer.split('. ').slice(0, 2).join('. ') + '.' });
}

const LIKELY: Record<string, { label: string; cls: string }> = {
  usually: { label: 'Usually needed', cls: 'verdict--caution' },
  often: { label: 'Often needed', cls: 'verdict--caution' },
  sometimes: { label: 'Sometimes', cls: 'verdict--unknown' },
  rarely: { label: 'Occasionally', cls: 'verdict--unknown' },
};

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  const s = shopfrontBySlug.get(service);
  if (!s) notFound();
  const path = `/shopfronts/${s.slug}`;
  const costs = s.costGroup ? costGroups[s.costGroup] : undefined;
  const trail = [
    { name: 'Shopfronts', path: '/shopfronts' },
    { name: s.name, path },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbs(path, trail),
          serviceLd(path, s.name, s.answer, s.area === 'uk' ? 'uk' : 'repair-radius'),
          questions(path, s.questions),
        ]}
      />
      <PageHead trail={trail} label={<><b>{s.area === 'uk' ? 'Installed UK-wide' : `Repairs within ${business.repairRadiusMiles} road miles of Birmingham`}</b></>} title={s.name} lede={s.answer}>
        <div className="acts" style={{ marginTop: '1.4rem' }}>
          <a href={`tel:${business.phones.main.tel}`} className="act act--solid" data-dial="main">
            Call {business.phones.main.display}
          </a>
          <a
            href={whatsappLink(business.whatsapp, `Hello Sigma Shopfronts, I am asking about ${s.name.toLowerCase()}: `)}
            className="act act--wa"
            data-dial="whatsapp"
            rel="noopener"
          >
            WhatsApp us
          </a>
          {s.area === 'uk' ? (
            <Link href="/frontage-check" className="act act--line">
              Check what your council will accept
            </Link>
          ) : (
            <a href="#reach" className="act act--line">
              Leave a one-line message
            </a>
          )}
        </div>
      </PageHead>

      <section className="band band--sheet">
        <div className="frame split">
          <div>
            <h2>Consents this work tends to involve</h2>
            <ul className="rows rows--keyed" style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
              {s.consents.map((c) => (
                <li key={c.consent}>
                  <div>
                    <strong>{consentLabel[c.consent]}</strong>
                    <div style={{ marginTop: '0.35rem' }}>
                      {c.consent === 'none-usually' ? (
                        <span className="verdict verdict--unknown">Typical case — confirm</span>
                      ) : (
                        <span className={`verdict ${LIKELY[c.likelihood].cls}`}>{LIKELY[c.likelihood].label}</span>
                      )}
                    </div>
                  </div>
                  <p>{c.why}</p>
                </li>
              ))}
            </ul>
            <p className="note" style={{ marginTop: '1rem', fontSize: '0.95rem' }}>
              An installer’s general guide; <Link href="/planning">your council</Link> decides.
            </p>
          </div>
          {s.photo && (
            <figure className="plate" style={{ alignSelf: 'start' }}>
              <Image src={s.photo.src} alt={s.photo.alt} width={s.photo.w} height={s.photo.h} sizes="(min-width: 60rem) 36vw, 100vw" />
              <figcaption>{s.photo.alt}.</figcaption>
            </figure>
          )}
        </div>
      </section>

      <section className="band">
        <div className="frame copy measure">
          {s.sections.map((sec) => (
            <div key={sec.q}>
              <h2>{sec.q}</h2>
              {sec.body.map((p, i) => (
                <p key={i} style={{ marginTop: '0.8rem' }}>
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="band band--sheet">
        <div className="frame split">
          <div>
            <h2>Standards and regulations</h2>
            <div className="table-wrap" style={{ marginTop: '1rem' }}>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Reference</th>
                    <th scope="col">What it covers</th>
                  </tr>
                </thead>
                <tbody>
                  {s.standards.map((r) => (
                    <tr key={r.ref}>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', whiteSpace: 'nowrap' }}>{r.ref}</td>
                      <td>{r.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {costs && (
            <div>
              <h2>Indicative prices</h2>
              <ul className="rows" style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
                {costs.lines.map((l) => (
                  <li key={l.item}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                      <strong>{l.item}</strong>
                      <span style={{ fontFamily: 'var(--font-mono)' }}>{l.range}</span>
                    </div>
                    <span style={{ color: 'var(--color-ink-3)', fontSize: '0.92rem' }}>{l.note}</span>
                  </li>
                ))}
              </ul>
              <p style={{ marginTop: '0.8rem', fontSize: '0.92rem' }}>
                Supply and fit, before survey. <Link href="/costs">How prices are built up</Link>.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="band">
        <div className="frame measure">
          <h2>Questions</h2>
          <div className="qa" style={{ marginTop: '1rem' }}>
            {s.questions.map((q) => (
              <details key={q.q}>
                <summary>{q.q}</summary>
                <div>{q.a}</div>
              </details>
            ))}
          </div>
          <h2 style={{ marginTop: '2.5rem' }}>Related</h2>
          <ul className="copy" style={{ marginTop: '0.8rem' }}>
            {s.related.map((r) => {
              const o = shopfrontBySlug.get(r)!;
              return (
                <li key={r}>
                  <Link href={`/shopfronts/${r}`}>{o.name}</Link> — {o.card}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
