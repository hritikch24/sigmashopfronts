import Link from 'next/link';
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
    'Indicative supply-and-fit ranges for aluminium shopfronts, roller shutters, security, automatic, folding and fire doors — and the planning decisions that move the price more than the hardware does.',
});

export default function Costs() {
  return (
    <>
      <JsonLd data={breadcrumbs('/costs', [{ name: 'Costs', path: '/costs' }])} />
      <PageHead
        trail={[{ name: 'Costs', path: '/costs' }]}
        title="What it costs"
        lede="Indicative supply-and-fit ranges before a survey. They are a starting point for a budget, not a quotation: your price comes in writing once we have measured the opening and know what the council will accept."
      >
        <p className="price-next measure">
          <strong>The visit to measure and the written quotation cost nothing.</strong> Send a photo of the opening and the
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
          <h2>What moves the price most</h2>
          <p>
            Not usually the aluminium. The biggest swings come from decisions made before anything is ordered:
          </p>
          <ul>
            <li>
              <strong>What the council will accept.</strong> Swapping a planned solid external shutter for laminated glass and an
              internal grille changes the cost — sometimes up, sometimes down — and is far cheaper than doing it after a refusal
              or an enforcement notice.
            </li>
            <li>
              <strong>Glass.</strong> Laminated security glass costs more than toughened, and large panes cost more per square
              metre than small ones because of handling and lifting.
            </li>
            <li>
              <strong>What is behind the old front.</strong> A rotten timber sub-frame, a missing lintel or an uneven floor only
              shows when the old shopfront comes out. Ask what any quotation — ours included — assumes about it.
            </li>
            <li>
              <strong>Access and hours.</strong> Pedestrianised streets, shopping-centre rules and out-of-hours working all add
              time.
            </li>
            <li>
              <strong>Finish.</strong> Standard powder-coat colours are quicker and cheaper than a special match.
            </li>
          </ul>
          <p>
            Repairs are priced once the fault is found, and confirmed in writing before the work. For grants that can offset
            the cost of heritage work, see <Link href="/grants">the schemes we can verify</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
