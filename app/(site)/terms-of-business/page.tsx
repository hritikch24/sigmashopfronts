import PageHead from '@/components/site/PageHead';
import { pageMeta } from '@/lib/seo';
import { business } from '@/lib/business';

export const metadata = pageMeta({
  path: '/terms-of-business',
  title: 'Terms of business',
  description: `The basis on which ${business.legalName} provides information on this website and quotes for work.`,
});

export default function Terms() {
  return (
    <>
      <PageHead trail={[{ name: 'Terms of business', path: '/terms-of-business' }]} label="Terms" title="Terms of business" lede="How to read the information on this website, and how quotations work." />
      <section className="band band--sheet">
        <div className="frame copy measure">
          <h2>Information on this website</h2>
          <p>
            The frontage check, the council pages and the guides are general information from a shopfront installer. They are
            not planning, legal or professional advice, and they are not a decision by any council. Council policies change; we
            show the date we read each document. Before ordering work or relying on anything here, confirm the position with
            the council concerned.
          </p>
          <p>
            Prices on this website are indicative ranges for budgeting. They are not offers and do not form a contract.
          </p>
          <h2>Quotations</h2>
          <p>
            Work is carried out against a written quotation from {business.legalName}. The quotation sets out what is
            included, what has been assumed, how long it is valid and the payment terms. Where a job depends on planning,
            advertisement or listed building consent, the quotation says who is responsible for obtaining it, and work does
            not start until it is in place.
          </p>
          <h2>Links to other websites</h2>
          <p>
            We link to council documents and other sources so you can check what we say. We are not responsible for their
            content or for changes made after we read them.
          </p>
          <h2>The company</h2>
          <p>
            {business.legalName}, registered in England and Wales, company number {business.companyNumber}.
          </p>
        </div>
      </section>
    </>
  );
}
