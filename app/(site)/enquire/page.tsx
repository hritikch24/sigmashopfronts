import PageHead from '@/components/site/PageHead';
import JsonLd from '@/components/site/JsonLd';
import EnquiryForm from '@/components/site/EnquiryForm';
import { breadcrumbs, pageMeta } from '@/lib/seo';
import { business } from '@/lib/business';

export const metadata = pageMeta({
  path: '/enquire',
  title: 'Enquire',
  description: `Call ${business.phones.main.display}, WhatsApp ${business.phones.second.display} or send the form. ${business.emergencyPromise}`,
});

export default function Enquire() {
  return (
    <>
      <JsonLd data={breadcrumbs('/enquire', [{ name: 'Enquire', path: '/enquire' }])} />
      <PageHead
        trail={[{ name: 'Enquire', path: '/enquire' }]}
        label={<><b>Sheet 09</b> · Enquire</>}
        title="Tell us about the frontage"
        lede={`For a repair, the phone is fastest. For new work, a photo and the address tell us most of what we need for a first answer. ${business.emergencyPromise}`}
      />
      <section className="band band--sheet">
        <div className="frame split">
          <div>
            <EnquiryForm source="enquire" />
          </div>
          <aside style={{ display: 'grid', gap: '1.25rem', alignContent: 'start' }}>
            <div className="panel panel--ink">
              <h2 style={{ fontSize: '1.2rem' }}>Phone and WhatsApp</h2>
              <ul className="copy" style={{ marginTop: '0.7rem' }}>
                <li>
                  <a href={`tel:${business.phones.main.tel}`} data-dial="main">
                    {business.phones.main.display}
                  </a>
                </li>
                <li>
                  <a href={`tel:${business.phones.second.tel}`} data-dial="second">
                    {business.phones.second.display}
                  </a>{' '}
                  — also on{' '}
                  <a href={`https://wa.me/${business.whatsapp}`} data-dial="whatsapp" rel="noopener">
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href={`mailto:${business.email}`}>{business.email}</a>
                </li>
              </ul>
            </div>
            <div className="panel">
              <h2 style={{ fontSize: '1.2rem' }}>Where we work</h2>
              <p style={{ marginTop: '0.5rem' }}>
                New installations anywhere in the UK. Repairs within {business.repairRadiusMiles} road miles of{' '}
                {business.repairCentre}.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
