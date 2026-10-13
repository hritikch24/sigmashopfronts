import PageHead from '@/components/site/PageHead';
import { pageMeta } from '@/lib/seo';
import { business, tracking } from '@/lib/business';

export const metadata = pageMeta({
  path: '/privacy',
  title: 'Privacy notice',
  description: `How ${business.legalName} handles the details you send through this website.`,
});

export default function Privacy() {
  const o = business.registeredOffice;
  return (
    <>
      <PageHead trail={[{ name: 'Privacy', path: '/privacy' }]} label="Privacy notice" title="Privacy notice" lede="What we collect through this website, why, who else handles it, and what you can ask us to do with it." />
      <section className="band band--sheet">
        <div className="frame copy measure">
          <h2>Who we are</h2>
          <p>
            {business.legalName} (company number {business.companyNumber}), {o.street}, {o.locality}, {o.postcode}, is the
            controller of personal data collected through this website. Contact us at {business.email} or{' '}
            {business.phones.main.display}.
          </p>
          <h2>What we collect and why</h2>
          <ul>
            <li>
              <strong>Enquiries.</strong> Your name, phone, email, location, message and any photo you send. We use them to
              reply and, if you go ahead, to quote and carry out the work. The lawful basis is taking steps at your request
              before entering into a contract.
            </li>
            <li>
              <strong>Frontage check.</strong> The check runs in your browser. If you look up a postcode, it is sent to our
              server and on to postcodes.io to find the council; we do not store it. Your answers are only sent to us if you
              then choose to send an enquiry.
            </li>
            <li>
              <strong>Visit counts.</strong> We record which pages are viewed, the referring site, campaign tags, device type
              and the country and town your connection appears to come from, against a random identifier that lasts for one
              browser tab. We do not store your IP address and we set no cookies for this. The lawful basis is our legitimate
              interest in knowing how the site is used.
            </li>
          </ul>
          {tracking.ga4 && (
            <>
              <h2 id="adverts">Measuring our adverts</h2>
              <p>
                We use Google Analytics to see which Google adverts lead to a call, a WhatsApp message or an enquiry. It
                records the page, the advert you came from and the button you pressed. It never receives your name, phone
                number, email or message.
              </p>
              <p>
                Google only sets its cookies if you press Yes on the cookie question. If you press No, or do not answer,
                Google receives a count without cookies. You can change your answer by clearing this site&rsquo;s data in your
                browser. The lawful basis is your consent; for counts without cookies it is our legitimate interest in knowing
                which adverts work.
              </p>
            </>
          )}
          <h2>Who else handles it</h2>
          <p>
            Our website host and database provider store the data; our email provider sends and delivers enquiry emails; and
            enquiry alerts may be sent to our team through a messaging service. Each acts on our instructions. We do not sell
            your data or use it for anyone else’s marketing.
          </p>
          <h2>How long we keep it</h2>
          <p>
            Enquiries that lead to work are kept with the job records for as long as we need them for the work, our
            accounts and any legal claims. We delete enquiries that do not lead to work once they are no longer needed to deal
            with your request. Visit records contain no names, contact details or IP addresses.
          </p>
          <h2>Your rights</h2>
          <p>
            You can ask for a copy of your data, for it to be corrected or deleted, or object to how we use it. Write to{' '}
            {business.email}. If you are unhappy with our answer you can complain to the Information Commissioner’s Office.
          </p>
        </div>
      </section>
    </>
  );
}
