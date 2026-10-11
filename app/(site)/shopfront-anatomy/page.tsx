import PageHead from '@/components/site/PageHead';
import JsonLd from '@/components/site/JsonLd';
import { article, breadcrumbs, pageMeta } from '@/lib/seo';

const path = '/shopfront-anatomy';
const summary =
  'The names of the parts of a shopfront — fascia, cornice, console, pilaster, stallriser, transom and the rest — as a conservation officer or a council design guide uses them, with a labelled elevation.';

export const metadata = pageMeta({ path, title: 'Parts of a shopfront, named', description: summary });

const PARTS: { term: string; def: string }[] = [
  { term: 'Cornice', def: 'The projecting moulding along the top of the shopfront. It throws rain clear of the fascia and gives the front a finished top edge. Often the first thing lost when a deep modern fascia is fixed over an old one.' },
  { term: 'Fascia', def: 'The horizontal board carrying the shop’s name. Its depth is the single most common point of argument with a council: guides usually want it no deeper than the original, and below the first-floor windows.' },
  { term: 'Console (corbel)', def: 'The decorative bracket at each end of the fascia, sitting on top of the pilaster. It frames the sign and marks where one shop ends and the next begins.' },
  { term: 'Pilaster', def: 'The flat column on each side of the shopfront, framing it vertically. Shutter guides and alarm cables bolted over pilasters are a frequent reason for refusal.' },
  { term: 'Stallriser', def: 'The solid panel under the display window. It protects the glass from feet, trolleys and kicks, and gives the front a base. Many councils now treat a reinforced stallriser as part of the security answer.' },
  { term: 'Cill (sill)', def: 'The ledge at the bottom of the window, shedding water off the stallriser.' },
  { term: 'Transom', def: 'A horizontal bar across the glazing, often at door-head height, dividing the display window from the toplights above.' },
  { term: 'Toplight / fanlight', def: 'The glazing above the transom. Over a door, often called a fanlight.' },
  { term: 'Mullion', def: 'A vertical bar dividing one area of glass from the next.' },
  { term: 'Glazing bar', def: 'A slim bar dividing a window into smaller panes. Lining these up with the windows above is what makes a new front sit in an old terrace.' },
  { term: 'Recessed entrance', def: 'A doorway set back from the shopfront line. It shelters the door and increases window area, but can be misused after hours — some councils accept a gate across it.' },
  { term: 'Shutter box', def: 'The housing for a rolled-up shutter. Councils almost always want it hidden behind the fascia rather than fixed to the face of the building.' },
];

export default function Anatomy() {
  return (
    <>
      <JsonLd data={[breadcrumbs(path, [{ name: 'Parts of a shopfront', path }]), article(path, 'Parts of a shopfront, named', summary, '2026-10-09')]} />
      <PageHead trail={[{ name: 'Parts of a shopfront', path }]} title="Parts of a shopfront, named" lede={summary} />
      <section className="band band--sheet">
        <div className="frame">
          <figure className="plate" style={{ padding: 'clamp(0.75rem, 2vw, 1.5rem)' }}>
            <svg className="elevation" viewBox="-50 0 700 420" role="img" aria-labelledby="elev-title">
              <title id="elev-title">Front elevation of a traditional shopfront with its parts labelled</title>
              <rect className="ln" x="70" y="40" width="420" height="22" />
              <rect className="ln" x="70" y="62" width="420" height="48" />
              <rect className="ln" x="70" y="62" width="26" height="48" />
              <rect className="ln" x="464" y="62" width="26" height="48" />
              <rect className="ln" x="74" y="110" width="22" height="270" />
              <rect className="ln" x="464" y="110" width="22" height="270" />
              <line className="ln" x1="96" y1="160" x2="464" y2="160" />
              <rect className="glass" x="96" y="110" width="250" height="50" />
              <rect className="glass" x="96" y="160" width="250" height="160" />
              <line className="ln-thin" x1="179" y1="110" x2="179" y2="320" />
              <line className="ln-thin" x1="263" y1="110" x2="263" y2="320" />
              <rect className="ln" x="96" y="320" width="250" height="60" />
              <line className="ln" x1="92" y1="320" x2="350" y2="320" />
              <rect className="glass" x="346" y="110" width="118" height="50" />
              <rect className="ln" x="356" y="168" width="98" height="212" />
              <rect className="glass" x="366" y="178" width="78" height="120" />
              <line className="ln" x1="40" y1="380" x2="600" y2="380" />
              <text x="260" y="93" textAnchor="middle">SHOP NAME</text>
              <g>
                <line className="lead" x1="490" y1="51" x2="530" y2="51" /><text className="tag" x="535" y="55">Cornice</text>
                <line className="lead" x1="490" y1="86" x2="530" y2="86" /><text className="tag" x="535" y="90">Fascia</text>
                <line className="lead" x1="477" y1="70" x2="530" y2="70" /><text className="tag" x="535" y="74">Console</text>
                <line className="lead" x1="486" y1="240" x2="530" y2="240" /><text className="tag" x="535" y="244">Pilaster</text>
                <line className="lead" x1="440" y1="135" x2="530" y2="135" /><text className="tag" x="535" y="139">Fanlight</text>
                <line className="lead" x1="454" y1="330" x2="530" y2="330" /><text className="tag" x="535" y="334">Recessed door</text>
                <line className="lead" x1="60" y1="160" x2="96" y2="160" /><text className="tag" x="56" y="164" textAnchor="end">Transom</text>
                <line className="lead" x1="60" y1="135" x2="96" y2="135" /><text className="tag" x="56" y="139" textAnchor="end">Toplight</text>
                <line className="lead" x1="60" y1="230" x2="179" y2="230" /><text className="tag" x="56" y="234" textAnchor="end">Mullion</text>
                <line className="lead" x1="60" y1="320" x2="96" y2="320" /><text className="tag" x="56" y="324" textAnchor="end">Cill</text>
                <line className="lead" x1="60" y1="352" x2="96" y2="352" /><text className="tag" x="56" y="356" textAnchor="end">Stallriser</text>
              </g>
            </svg>
            <figcaption>Front elevation, traditional shopfront. Not to scale.</figcaption>
          </figure>
        </div>
      </section>
      <section className="band">
        <div className="frame measure">
          <dl className="rows rows--keyed" style={{ margin: 0 }}>
            {PARTS.map((p) => (
              <div key={p.term}>
                <dt style={{ fontWeight: 650, fontFamily: 'var(--font-display)' }}>{p.term}</dt>
                <dd style={{ margin: 0 }}>{p.def}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
