import Link from '@/components/site/Link';
import PageHead from '@/components/site/PageHead';
import JsonLd from '@/components/site/JsonLd';
import { breadcrumbs, pageMeta } from '@/lib/seo';
import { costGroups } from '@/data/costs';
import { business } from '@/lib/business';
import { whatsappLink } from '@/lib/quick-line';

export const metadata = pageMeta({
  path: '/costs',
  title: 'What shopfronts, shutters and doors cost',
  description:
    'Typical supply-and-fit prices for aluminium shopfronts, roller shutters and shop doors, and the planning choices that change the price most.',
});

export default function Costs() {
  return (
    <>
      <JsonLd data={breadcrumbs('/costs', [{ name: 'Costs', path: '/costs' }])} />
      <PageHead
        trail={[{ name: 'Costs', path: '/costs' }]}
        title="What it costs"
        lede="Typical prices, including fitting. Use them to plan your budget. Your real price comes in writing after we measure, and once we know what the council will accept."
      >
        <p className="price-next measure">
          <strong>The visit to measure and the written quote are free.</strong> Send a photo of the opening and the
          postcode and we will tell you which line below your job sits on.
        </p>
        <div className="acts" style={{ marginTop: '1rem' }}>
          <a href={whatsappLink(business.whatsapp, 'Hello Sigma Shopfronts, I would like a price. Photo attached. Postcode: ')} className="act act--wa" data-dial="whatsapp" rel="noopener">
            WhatsApp a photo for a price
          </a>
          <a href={`tel:${business.phones.main.tel}`} className="act act--line" data-dial="main">
            Call {business.phones.main.display}
          </a>
        </div>
      </PageHead>
      <section className="band band--sheet">
        <div className="frame" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))' }}>
          {Object.values(costGroups).map((g) => (
            <div key={g.title}>
              <h2 style={{ fontSize: '1.3rem' }}>{g.title}</h2>
              <ul className="rows" style={{ listStyle: 'none', padding: 0, marginTop: '0.8rem' }}>
                {g.lines.map((l) => (
                  <li key={l.item}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                      <strong>{l.item}</strong>
                      <span style={{ fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>{l.range}</span>
                    </div>
                    <span style={{ color: 'var(--color-ink-3)', fontSize: '0.92rem' }}>{l.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section className="band">
        <div className="frame copy measure">
          <h2>What changes the price most</h2>
          <p>
            Usually not the aluminium. The biggest changes come from choices made before anything is ordered:
          </p>
          <ul>
            <li>
              <strong>What the council will accept.</strong> The council may not allow a solid shutter on the outside. Then you
              might need strong glass and a grille inside instead. That can cost more or less. It is much cheaper to know this
              before the work than after the council says no.
            </li>
            <li>
              <strong>Glass.</strong> Laminated security glass (it holds together when broken) costs more than toughened glass.
              Big panes also cost more, because they are harder to carry and lift.
            </li>
            <li>
              <strong>What is behind the old front.</strong> Rotten wood, a missing support beam or an uneven floor only shows
              when the old shopfront comes out. Ask any installer, us included, what their quote assumes about this.
            </li>
            <li>
              <strong>Access and hours.</strong> Streets closed to traffic, shopping-centre rules and night work all add time.
            </li>
            <li>
              <strong>Colour.</strong> Standard colours are quicker and cheaper than a special colour match.
            </li>
          </ul>
          <p>
            For repairs, we find the fault first. Then we confirm the price in writing before we start. For grants that can
            help pay for work on old buildings, see <Link href="/grants">the grants we have checked</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
