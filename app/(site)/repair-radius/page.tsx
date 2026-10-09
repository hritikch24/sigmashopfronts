import Link from 'next/link';
import PageHead from '@/components/site/PageHead';
import JsonLd from '@/components/site/JsonLd';
import { breadcrumbs, pageMeta, service } from '@/lib/seo';
import { business } from '@/lib/business';
import { towns } from '@/data/towns';

const path = '/repair-radius';
const lede = `We repair shopfronts, shutters, doors and glass at premises within ${business.repairRadiusMiles} road miles of Birmingham — every town in between, not just the cities. ${business.emergencyPromise} Then we tell you honestly when we can be there.`;

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
          breadcrumbs(path, [{ name: 'Repair radius', path }]),
          service(path, 'Shopfront, shutter and glazing repairs', lede, 'repair-radius'),
        ]}
      />
      <PageHead trail={[{ name: 'Repair radius', path }]} label={<><b>Sheet 05</b> · Repairs</>} title={`Repairs within ${business.repairRadiusMiles} road miles of Birmingham`} lede={lede}>
        <div className="acts" style={{ marginTop: '1.4rem' }}>
          <a href={`tel:${business.phones.main.tel}`} className="act act--solid" data-dial="main">
            Call {business.phones.main.display}
          </a>
          <a href={`https://wa.me/${business.whatsapp}`} className="act act--line" data-dial="whatsapp" rel="noopener">
            WhatsApp a photo of the fault
          </a>
        </div>
      </PageHead>
      <section className="band band--sheet">
        <div className="frame split">
          <div className="copy measure">
            <h2>What “two hours” means</h2>
            <p>
              A person replies to your call or message within two hours. It is a promise about answering, not about a van
              arriving — that depends on where you are and what is already booked, and we say which when we reply. Near the
              edge of the radius, or in the middle of the night, a closer contractor may reach you sooner, and we will tell you
              so rather than take the job and keep you waiting.
            </p>
            <h2>Why a radius, and why road miles</h2>
            <p>
              Repairs only work if we can get to you and back with the right part. Road miles are what the van covers, so that
              is what we measure; a straight line on a map would promise places that take far longer to reach. Beyond the
              radius we still survey, make and fit new work — just not emergency repairs.
            </p>
            <h2>What we repair</h2>
            <ul>
              <li><Link href="/shopfronts/shutter-repairs">Roller shutters and grilles</Link> — jammed, noisy, motor or spring failures</li>
              <li><Link href="/shopfronts/repairs">Aluminium shopfronts and doors</Link> — dropped doors, floor springs, closers, locks</li>
              <li><Link href="/shopfronts/glass-replacement">Shopfront glass</Link> — make safe, measure and replace</li>
              <li><Link href="/shopfronts/emergency-repairs">After a break-in</Link> — boarding and securing</li>
            </ul>
          </div>
          <div>
            <h2>Towns we cover</h2>
            <p style={{ marginTop: '0.5rem', fontSize: '0.95rem', color: 'var(--color-ink-3)' }}>
              Approximate road miles from Birmingham. Every place in between is covered too.
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
