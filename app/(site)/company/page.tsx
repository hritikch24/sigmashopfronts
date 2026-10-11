import Link from 'next/link';
import PageHead from '@/components/site/PageHead';
import JsonLd from '@/components/site/JsonLd';
import { breadcrumbs, pageMeta } from '@/lib/seo';
import { business } from '@/lib/business';

export const metadata = pageMeta({
  path: '/company',
  title: 'The company',
  description: `${business.legalName}, company number ${business.companyNumber}, registered in Oldbury. Shopfronts, shutters and glazing fitted UK-wide; repairs within ${business.repairRadiusMiles} road miles of Birmingham.`,
});

export default function Company() {
  const o = business.registeredOffice;
  const incorporated = new Date(business.incorporated).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  return (
    <>
      <JsonLd data={breadcrumbs('/company', [{ name: 'The company', path: '/company' }])} />
      <PageHead
        trail={[{ name: 'The company', path: '/company' }]}
        title="Who you would be dealing with"
        lede={`${business.name} is the trading name of ${business.legalName}, a limited company registered in England. We make and fit shopfronts, shutters, doors and glass, and we repair them within ${business.repairRadiusMiles} road miles of Birmingham.`}
      />
      <section className="band band--sheet">
        <div className="frame">
          <dl className="titleblock">
            <div>
              <dt>Registered name</dt>
              <dd>{business.legalName}</dd>
            </div>
            <div>
              <dt>Company number</dt>
              <dd>
                <a href={business.companiesHouseUrl} rel="noopener">
                  {business.companyNumber}
                </a>
              </dd>
            </div>
            <div>
              <dt>Company started</dt>
              <dd>{incorporated}</dd>
            </div>
            <div>
              <dt>Registered office</dt>
              <dd>
                {o.street}, {o.locality}, {o.postcode}
              </dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>
                {business.phones.main.display} · {business.phones.second.display}
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{business.email}</dd>
            </div>
          </dl>
        </div>
      </section>
      <section className="band">
        <div className="frame split">
          <div className="copy measure">
            <h2>How we work</h2>
            <p>
              Many shopfront problems start before any work begins. A solid shutter goes up on a street where the council
              does not allow one. A light-up box sign goes on a protected street. Old features the council wanted kept get
              taken out. So before we give a price, we check who decides, what their rules say and whether the building is
              listed. Then we draw something the council is likely to accept.
            </p>
            <p>
              That is why this website has so much on councils. The{' '}
              <Link href="/frontage-check">permission check</Link> and the <Link href="/planning">council pages</Link> are the
              same checks we do for every job, shared with you.
            </p>
            <h2>What we do not do</h2>
            <p>
              We fit shopfronts. We are not planning consultants or architects. We make shopfront drawings and explain the
              council rules. If your application is refused, goes to appeal or is on a difficult listed building, we will tell
              you to use a planning expert.
            </p>
            <h2>Where we work</h2>
            <p>
              New shopfronts anywhere in the UK. Repairs within {business.repairRadiusMiles} road miles of Birmingham, because
              that is how far we can reach you quickly when something breaks. {business.emergencyPromise}
            </p>
          </div>
          <div className="panel panel--ink" style={{ alignSelf: 'start' }}>
            <h2 style={{ fontSize: '1.2rem' }}>What you can check</h2>
            <ul className="copy" style={{ marginTop: '0.7rem' }}>
              {business.trustBasis.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p style={{ marginTop: '0.8rem' }}>
              <a href={business.instagram} rel="noopener">
                Instagram
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
