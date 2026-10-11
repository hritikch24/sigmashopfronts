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
        lede={`${business.name} is the trading name of ${business.legalName}, a private limited company registered in England. We make and fit shopfronts, shutters, doors and commercial glazing, and repair them within ${business.repairRadiusMiles} road miles of Birmingham.`}
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
              <dt>Incorporated</dt>
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
            <h2>How we approach a job</h2>
            <p>
              Most shopfront problems we are called about were decided before anyone picked up a tool: a solid shutter on a
              street where the council will not have one, an illuminated box sign in a conservation area, a new front that
              stripped out the pilasters the planning officer wanted kept. So we start with the setting — who decides, what
              their guidance says, whether the building is listed — and draw something that can be approved before we price it.
            </p>
            <p>
              That is also why this website spends more words on councils than on aluminium. The{' '}
              <Link href="/frontage-check">frontage check</Link> and the <Link href="/planning">council pages</Link> are the
              same reading we do for every job, made public.
            </p>
            <h2>What we are not</h2>
            <p>
              We are installers, not planning consultants or architects. We prepare shopfront drawings and explain what the
              guidance says; for a contested application, an appeal or a complex listed building, we will tell you to bring in
              a planning professional.
            </p>
            <h2>Where we work</h2>
            <p>
              Installations anywhere in the UK. Repairs within {business.repairRadiusMiles} road miles of Birmingham, because
              that is where we can actually reach people when something fails. {business.emergencyPromise}
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
