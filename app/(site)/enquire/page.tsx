import PageHead from '@/components/site/PageHead';
import JsonLd from '@/components/site/JsonLd';
import EnquiryForm from '@/components/site/EnquiryForm';
import QuickMessage from '@/components/site/QuickMessage';
import { whatsappLink } from '@/lib/quick-line';
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
        title="Tell us about the frontage"
        lede={`For a repair, the phone is fastest. For new work, a photo and the address tell us most of what we need for a first answer. ${business.emergencyPromise}`}
      >
        <div className="acts" style={{ marginTop: '1.4rem' }}>
          <a href={`tel:${business.phones.main.tel}`} className="act act--solid" data-dial="main">
            Call {business.phones.main.display}
          </a>
          <a href={whatsappLink(business.whatsapp)} className="act act--wa" data-dial="whatsapp" rel="noopener">
            WhatsApp {business.phones.second.display}
          </a>
        </div>
      </PageHead>
      <section className="band band--sheet">
        <div className="frame split">
          <div style={{ display: 'grid', gap: '2rem', alignContent: 'start' }}>
            <div id="reach">
              <h2 style={{ fontSize: '1.25rem' }}>Quickest: one line</h2>
              <p style={{ margin: '0.4rem 0 0.9rem' }}>No name or form needed. Put your number or email in, and we reply.</p>
              <QuickMessage source="enquire-line" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem' }}>Or the full form, with a photo</h2>
              <div style={{ marginTop: '0.9rem' }}>
                <EnquiryForm source="enquire" />
              </div>
            </div>
          </div>
          <aside style={{ display: 'grid', gap: '1.25rem', alignContent: 'start' }}>
            <div className="panel">
              <h2 style={{ fontSize: '1.2rem' }}>What happens next</h2>
              <ul className="copy" style={{ marginTop: '0.7rem' }}>
                <li>A person at Sigma replies, not an automated system.</li>
                <li>{business.freeQuote}, in writing before any work.</li>
                <li>{business.sameDay}.</li>
              </ul>
            </div>
            <div className="panel">
              <h2 style={{ fontSize: '1.2rem' }}>Rather email?</h2>
              <p style={{ marginTop: '0.5rem' }}>
                <a href={`mailto:${business.email}`}>{business.email}</a>
              </p>
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
