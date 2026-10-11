import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHead from '@/components/site/PageHead';
import JsonLd from '@/components/site/JsonLd';
import { breadcrumbs, pageMeta, service } from '@/lib/seo';
import { whatsappLink } from '@/lib/quick-line';
import { business } from '@/lib/business';
import { townBySlug, towns } from '@/data/towns';
import { authorities } from '@/data/authorities';

export const dynamicParams = false;

export function generateStaticParams() {
  return towns.map((t) => ({ town: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ town: string }> }) {
  const { town } = await params;
  const t = townBySlug[town];
  if (!t) return {};
  return pageMeta({
    path: `/repair-radius/${t.slug}`,
    title: `Shutter and shopfront repairs in ${t.name}`,
    description: `${t.name} is about ${t.miles} road miles from Birmingham, inside our repair radius. ${t.note.split('. ')[0]}.`,
  });
}

export default async function TownPage({ params }: { params: Promise<{ town: string }> }) {
  const { town } = await params;
  const t = townBySlug[town];
  if (!t) notFound();
  const path = `/repair-radius/${t.slug}`;
  const trail = [
    { name: 'Repair radius', path: '/repair-radius' },
    { name: t.name, path },
  ];
  const ours = authorities.find((a) => a.council === t.council);
  return (
    <>
      <JsonLd
        data={[
          breadcrumbs(path, trail),
          service(path, `Shopfront, shutter and door repairs in ${t.name}`, t.note.split('. ')[0] + '.', 'repair-radius', t.name),
        ]}
      />
      <PageHead trail={trail} label={<><b>{t.miles} road miles</b> from Birmingham</>} title={`Repairs in ${t.name}`} lede={t.note}>
        <div className="acts" style={{ marginTop: '1.4rem' }}>
          <a href={`tel:${business.phones.main.tel}`} className="act act--solid" data-dial="main">
            Call {business.phones.main.display}
          </a>
          <a href={whatsappLink(business.whatsapp, `Hello Sigma Shopfronts, I need a repair in ${t.name}. Postcode: `)} className="act act--wa" data-dial="whatsapp" rel="noopener">
            WhatsApp a photo
          </a>
        </div>
      </PageHead>
      <section className="band band--sheet">
        <div className="frame">
          <div>
            <dl className="titleblock">
              <div>
                <dt>Planning authority</dt>
                <dd>{ours ? <Link href={`/planning/${ours.slug}`}>{t.council}</Link> : t.council}</dd>
              </div>
              <div>
                <dt>County</dt>
                <dd>{t.county}</dd>
              </div>
              <div>
                <dt>Retail streets and centres</dt>
                <dd>{t.retail.join(', ')}</dd>
              </div>
            </dl>
            {t.conservation && (
              <p className="note" style={{ marginTop: '1.25rem' }}>
                <strong>Heritage: </strong>
                {t.conservation}
              </p>
            )}
            {t.near.length > 0 && (
              <p style={{ marginTop: '1.25rem' }}>
                Nearby:{' '}
                {t.near.map((n, i) => (
                  <span key={n}>
                    {i > 0 && ', '}
                    <Link href={`/repair-radius/${n}`}>{townBySlug[n].name}</Link>
                  </span>
                ))}
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
