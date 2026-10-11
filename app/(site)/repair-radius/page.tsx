import Link from 'next/link';
import PageHead from '@/components/site/PageHead';
import JsonLd from '@/components/site/JsonLd';
import { breadcrumbs, pageMeta, service } from '@/lib/seo';
import { business } from '@/lib/business';
import { towns } from '@/data/towns';
import { whatsappLink } from '@/lib/quick-line';

const path = '/repair-radius';
const lede = `We repair shopfronts, shutters, doors and glass for shops and businesses within ${business.repairRadiusMiles} road miles of Birmingham — every town in between, not just the cities. ${business.emergencyPromise} Quotes and site visits are free.`;

export const metadata = pageMeta({
  path,
  title: `Shopfront and shutter repairs within ${business.repairRadiusMiles} miles of Birmingham`,
  description: lede,
});

export default function RepairRadius() {
  const byMiles = [...towns].sort((a, b) => a.miles - b.miles);
  return (
    <>
      <JsonLd
        data={[
          breadcrumbs(path, [{ name: 'Repair area', path }]),
          service(path, 'Shopfront, shutter and glazing repairs', lede, 'repair-radius'),
        ]}
      />
      <PageHead trail={[{ name: 'Repair area', path }]} title={`Repairs within ${business.repairRadiusMiles} road miles of Birmingham`} lede={lede}>
        <div className="acts" style={{ marginTop: '1.4rem' }}>
          <a href={`tel:${business.phones.main.tel}`} className="act act--solid" data-dial="main">
            Call {business.phones.main.display}
          </a>
          <a href={whatsappLink(business.whatsapp, 'Hello Sigma Shopfronts, I need a repair. Photo attached. Postcode: ')} className="act act--wa" data-dial="whatsapp" rel="noopener">
            WhatsApp a photo of the fault
          </a>
        </div>
      </PageHead>
      <section className="band band--sheet">
        <div className="frame split">
          <div className="copy measure">
            <h2>What “two hours” and “same day” mean</h2>
            <p>
              A person replies to your call or message within two hours. For an emergency, someone comes out the same day.
              When we reply, we tell you what time we can be there, so you are not left waiting.
            </p>
            <h2>Why 100 road miles?</h2>
            <p>
              A repair only works if we can reach you quickly with the right part. We measure by road, because that is how far
              the van drives. A straight line on a map would include places that take much longer to reach. Further away, we
              still visit, make and fit new shopfronts. We just do not do emergency repairs there.
            </p>
            <h2>What we repair</h2>
            <ul>
              <li><Link href="/shopfronts/shutter-repairs">Roller shutters and grilles</Link> — stuck, noisy, broken motor or spring</li>
              <li><Link href="/shopfronts/repairs">Aluminium shopfronts and doors</Link> — dropped doors, door closers, locks</li>
              <li><Link href="/shopfronts/glass-replacement">Shopfront glass</Link> — make safe, measure and replace</li>
              <li><Link href="/shopfronts/emergency-repairs">After a break-in</Link> — boarding up and making safe</li>
            </ul>
          </div>
          <div>
            <h2>Towns we cover</h2>
            <p style={{ marginTop: '0.5rem', fontSize: '0.95rem', color: 'var(--color-ink-3)' }}>
              Road miles from Birmingham, roughly. Every place in between is covered too.
            </p>
            <ul className="rows" style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
              {byMiles.map((t) => (
                <li key={t.slug} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                  <Link href={`/repair-radius/${t.slug}`}>{t.name}</Link>
                  <span className="ref">{t.miles} mi</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
