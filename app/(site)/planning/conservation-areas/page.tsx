import Link from 'next/link';
import PageHead from '@/components/site/PageHead';
import JsonLd from '@/components/site/JsonLd';
import { article, breadcrumbs, pageMeta } from '@/lib/seo';

const path = '/planning/conservation-areas';
const summary =
  'A conservation area does not ban change, but it shifts the question from “is this allowed?” to “does this preserve or enhance the area?”. For a shopfront that usually means keeping traditional elements, avoiding external shutters and lighting signs from outside.';

export const metadata = pageMeta({ path, title: 'Shopfronts in conservation areas: what actually changes', description: summary });

export default function ConservationAreas() {
  const trail = [
    { name: 'Planning', path: '/planning' },
    { name: 'Conservation areas', path },
  ];
  return (
    <>
      <JsonLd data={[breadcrumbs(path, trail), article(path, 'Shopfronts in conservation areas', summary, '2026-10-09')]} />
      <PageHead trail={trail} label={<><b>Sheet 02a</b> · The rules, explained</>} title="Shopfronts in conservation areas" lede={summary} />
      <section className="band band--sheet">
        <div className="frame copy measure">
          <h2>What the designation does</h2>
          <p>
            Councils designate conservation areas under the Planning (Listed Buildings and Conservation Areas) Act 1990 in
            England and Wales, and the 1997 equivalent in Scotland. Once a street is in one, the council must pay special
            attention to preserving or enhancing its character or appearance whenever it decides an application there. That
            duty is why the same shopfront can be approved on one street and refused a mile away.
          </p>
          <h2>Five things that change for a shop</h2>
          <ol>
            <li>
              <strong>Shutters.</strong> Every council whose guidance we track restricts solid external shutters in
              conservation areas, and several accept only internal or open-lattice designs.{' '}
              <Link href="/explained/why-solid-shutters-get-refused">Why solid shutters get refused</Link>.
            </li>
            <li>
              <strong>Illuminated signs.</strong> In England, the deemed-consent class that lets some internally lit signs go
              up without an application does not apply in a conservation area.{' '}
              <Link href="/explained/advertisement-consent">Advertisement consent</Link>.
            </li>
            <li>
              <strong>Removing historic features.</strong> Councils increasingly expect a surviving traditional shopfront to be
              repaired rather than replaced. Birmingham’s design guide, for example, will not support removing one in a
              conservation area unless repair is shown to be impossible.
            </li>
            <li>
              <strong>Demolition.</strong> Substantial demolition of an unlisted building in a conservation area needs planning
              permission in England.
            </li>
            <li>
              <strong>Article 4 directions.</strong> Many conservation areas carry one, removing particular permitted
              development rights. <Link href="/explained/article-4-directions">Article 4, explained</Link>.
            </li>
          </ol>
          <h2>How to find out if your shop is in one</h2>
          <p>
            Every council publishes its conservation areas, usually as a map and a list on its planning or heritage pages.
            Most also publish an appraisal for each area — a description of what makes it special, often with photographs of
            individual shopfronts. Read it before you design anything; it tells you what the officer will be looking for.
          </p>
          <h2>Examples from the councils we track</h2>
          <ul>
            <li>
              <Link href="/planning/gloucester">Gloucester</Link> has fourteen adopted conservation areas covering most of
              the city centre.
            </li>
            <li>
              <Link href="/planning/oxford">Oxford</Link>’s historic core lies within the Central Conservation Area, and
              Policy DH6 requires historic shopfronts there to be retained.
            </li>
            <li>
              <Link href="/planning/york">York</Link>’s Local Plan notes that the survival of historic shopfronts in its central
              historic core conservation area is particularly high, and expects dilapidated ones that matter to be repaired.
            </li>
            <li>
              <Link href="/planning/bradford">Bradford</Link> applies a higher benchmark for external security in
              conservation areas and in its named town centres.
            </li>
            <li>
              <Link href="/planning/southampton">Southampton</Link> warns that poor shopfronts and solid shutters can erode an
              area badly enough for it to lose its designation.
            </li>
          </ul>
          <p className="note">
            General explanation from an installer, not legal advice. The council’s own map and appraisal are what count.
          </p>
        </div>
      </section>
    </>
  );
}
