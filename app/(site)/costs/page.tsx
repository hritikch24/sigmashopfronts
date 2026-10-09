import Link from 'next/link';
import PageHead from '@/components/site/PageHead';
import JsonLd from '@/components/site/JsonLd';
import { breadcrumbs, pageMeta } from '@/lib/seo';
import { costGroups } from '@/data/costs';

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
        label={<><b>Sheet 08</b> · Costs</>}
        title="What it costs"
        lede="Indicative supply-and-fit ranges before a survey. They are a starting point for a budget, not a quotation: your price comes in writing once we have measured the opening and know what the council will accept."
      />
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
