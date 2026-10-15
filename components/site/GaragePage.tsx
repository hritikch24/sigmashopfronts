import Link from '@/components/site/Link';
import PageHead from '@/components/site/PageHead';
import JsonLd from '@/components/site/JsonLd';
import EnquiryForm from '@/components/site/EnquiryForm';
import { breadcrumbs, questions, service as serviceLd } from '@/lib/seo';
import { business, garageDoors, type GarageDoorType } from '@/lib/business';
import { whatsappLink } from '@/lib/quick-line';
import { consentLabel } from '@/data/shopfronts';
import { doorTypeName, type GaragePage as Page } from '@/data/garage-doors';

/** "a, b and c" */
function list(words: string[]): string {
  return words.length < 2 ? words.join('') : `${words.slice(0, -1).join(', ')} and ${words.at(-1)}`;
}

export function withTypes(text: string, types: GarageDoorType[]): string {
  return text.replace('{types}', list(types.map((t) => doorTypeName[t])));
}

/**
 * The two garage door pages. Same parts as a /shopfronts page, plus the door
 * types, the steps, what changes the price and what we do not do.
 */
export default function GaragePage({ page, types, repair }: { page: Page; types: GarageDoorType[]; repair: boolean }) {
  const answer = withTypes(page.answer, types);
  const trail = [{ name: page.name, path: page.path }];
  const sections = page.sections.filter((s) => s.id !== 'automation' || garageDoors.automation);
  const serviceType = repair ? 'garage-repair' : 'garage-install';

  return (
    <>
      <JsonLd
        data={[
          breadcrumbs(page.path, trail),
          serviceLd(page.path, page.name, answer, repair ? 'repair-radius' : 'uk'),
          questions(page.path, page.questions),
        ]}
      />
      <PageHead
        trail={trail}
        label={<b>{repair ? `Repairs within ${business.repairRadiusMiles} road miles of Birmingham` : 'Fitted anywhere in the UK'}</b>}
        title={page.name}
        lede={answer}
      >
        {!garageDoors.published && (
          <p className="note note--warn" role="note" style={{ marginTop: '1rem' }}>
            Draft for the owner to check. This page is not public.
          </p>
        )}
        <div className="acts" style={{ marginTop: '1.4rem' }}>
          <a href={`tel:${business.phones.main.tel}`} className="act act--solid" data-dial="main">
            Call {business.phones.main.display}
          </a>
          <a
            href={whatsappLink(business.whatsapp, `Hello Sigma Shopfronts, I am asking about ${page.name.toLowerCase()}. Photo attached. Postcode: `)}
            className="act act--wa"
            data-dial="whatsapp"
            rel="noopener"
          >
            WhatsApp a photo
          </a>
          <a href="#garage-form" className="act act--line">
            Send the form
          </a>
        </div>
      </PageHead>

      <section className="band band--sheet">
        <div className="frame measure">
          <h2>{page.typesHeading}</h2>
          <ul className="rows" style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
            {types.map((t) => (
              <li key={t}>
                <strong>{doorTypeName[t][0].toUpperCase() + doorTypeName[t].slice(1)} doors</strong>
                <p style={{ marginTop: '0.35rem' }}>{page.types[t]}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band">
        <div className="frame copy measure">
          {sections.map((sec) => (
            <div key={sec.q} id={sec.id}>
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
            <h2>How it works</h2>
            <ol className="copy" style={{ marginTop: '0.8rem' }}>
              {page.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <h2 style={{ marginTop: '2rem' }}>What changes the price</h2>
            <ul className="copy" style={{ marginTop: '0.8rem' }}>
              {page.priceFactors.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p style={{ marginTop: '0.8rem' }}>{business.freeQuote}. You get the price in writing before any work.</p>
            <h2 style={{ marginTop: '2rem' }}>What we do not do</h2>
            <ul className="copy" style={{ marginTop: '0.8rem' }}>
              {page.notCovered.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Do you need council permission?</h2>
            <ul className="rows rows--keyed" style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
              {page.consents.map((c) => (
                <li key={c.consent}>
                  <strong>{consentLabel[c.consent]}</strong>
                  <p>{c.why}</p>
                </li>
              ))}
            </ul>
            <h2 style={{ marginTop: '2rem' }}>Safety standards</h2>
            <div className="table-wrap" style={{ marginTop: '1rem' }}>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Standard</th>
                    <th scope="col">What it covers</th>
                  </tr>
                </thead>
                <tbody>
                  {page.standards.map((r) => (
                    <tr key={r.ref}>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', whiteSpace: 'nowrap' }}>{r.ref}</td>
                      <td>{r.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="frame split">
          <div>
            <h2>Questions</h2>
            <div className="qa" style={{ marginTop: '1rem' }}>
              {page.questions.map((q) => (
                <details key={q.q}>
                  <summary>{q.q}</summary>
                  <div>{q.a}</div>
                </details>
              ))}
            </div>
            <h2 style={{ marginTop: '2.5rem' }}>Related</h2>
            <ul className="copy" style={{ marginTop: '0.8rem' }}>
              {page.related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href}>{r.label}</Link>, {r.why}
                </li>
              ))}
            </ul>
          </div>
          <div id="garage-form">
            <h2>Ask about your garage door</h2>
            <p style={{ margin: '0.4rem 0 0.9rem' }}>A phone number or an email is enough. A photo helps most.</p>
            <EnquiryForm
              source={repair ? 'garage-repairs' : 'garage-installation'}
              serviceType={serviceType}
              doorTypes={types}
              garage
              photoPrompt={
                repair
                  ? 'The whole door from outside, and the label on the motor if it is electric.'
                  : 'The opening from outside, taken straight on. Rough sizes help too.'
              }
            />
          </div>
        </div>
      </section>
    </>
  );
}
