import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Sigma Shop Fronts',
  description:
    'Read the Terms and Conditions for Sigma Shopfronts and Shutter Limited. Our standard terms cover quotations, payment, installation, warranties, and your rights as a customer.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <main className="section-padding">
      <div className="container-max">
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs
            items={[{ label: 'Terms & Conditions' }]}
          />

          <h1 className="text-4xl md:text-5xl font-bold text-navy mt-4 mb-2">
            Terms &amp; Conditions
          </h1>
          <p className="text-grey-500 text-sm mb-10">Last updated: May 2026</p>

          <div className="prose-content space-y-10 text-grey-700 leading-relaxed">

            {/* Introduction */}
            <section>
              <p>
                These Terms and Conditions (&ldquo;Terms&rdquo;) govern all quotations, orders, and contracts entered into by <strong className="text-navy">Sigma Shopfronts and Shutter Limited</strong> (Company No: 16794487), registered in England and Wales (<strong className="text-navy">&ldquo;the Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;</strong>) with our customers (&ldquo;you&rdquo;). Please read them carefully before engaging our services.
              </p>
              <p className="mt-4">
                By accepting a quotation, placing an order, or paying a deposit, you agree to be bound by these Terms. These Terms do not affect your statutory rights.
              </p>
            </section>

            {/* 1. Definitions */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">1. Definitions</h2>
              <p>In these Terms, the following definitions apply:</p>
              <dl className="mt-4 space-y-3">
                <div className="grid grid-cols-[auto_1fr] gap-x-4">
                  <dt className="font-semibold text-navy min-w-[130px]">&ldquo;Contract&rdquo;</dt>
                  <dd>means the agreement between us and you for the supply of Goods and/or Services, incorporating these Terms and the accepted Quotation.</dd>
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-x-4">
                  <dt className="font-semibold text-navy min-w-[130px]">&ldquo;Goods&rdquo;</dt>
                  <dd>means any products, materials, or components supplied by us as part of the Services, including shopfronts, roller shutters, security grilles, and associated hardware.</dd>
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-x-4">
                  <dt className="font-semibold text-navy min-w-[130px]">&ldquo;Services&rdquo;</dt>
                  <dd>means the installation, repair, maintenance, or other works carried out by us as described in the Quotation.</dd>
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-x-4">
                  <dt className="font-semibold text-navy min-w-[130px]">&ldquo;Quotation&rdquo;</dt>
                  <dd>means the written document issued by us setting out the proposed scope, specification, and price for the Services.</dd>
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-x-4">
                  <dt className="font-semibold text-navy min-w-[130px]">&ldquo;Site&rdquo;</dt>
                  <dd>means the premises at which the Services are to be carried out, as specified in the Quotation.</dd>
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-x-4">
                  <dt className="font-semibold text-navy min-w-[130px]">&ldquo;Consumer&rdquo;</dt>
                  <dd>means an individual acting wholly or mainly for purposes outside their trade, business, craft, or profession, as defined by the Consumer Rights Act 2015.</dd>
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-x-4">
                  <dt className="font-semibold text-navy min-w-[130px]">&ldquo;Business Customer&rdquo;</dt>
                  <dd>means any customer who is not a Consumer.</dd>
                </div>
              </dl>
            </section>

            {/* 2. Scope of Services */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">2. Scope of Services</h2>
              <p>
                2.1 We specialise in the supply and installation of commercial shopfronts, aluminium framing systems, roller shutters, security grilles, fire-rated doors, and ancillary products for commercial and retail premises across the West Midlands and surrounding areas.
              </p>
              <p className="mt-4">
                2.2 The precise scope of each engagement is set out in the relevant Quotation. We will use reasonable skill and care to carry out the Services in a professional manner, in accordance with applicable building regulations and industry standards.
              </p>
              <p className="mt-4">
                2.3 We reserve the right to sub-contract any part of the Services without notice to you, provided we remain responsible for the quality of work carried out.
              </p>
              <p className="mt-4">
                2.4 We do not provide structural engineering assessments or planning permission advice. It is your responsibility to ensure that all necessary consents, approvals, and planning permissions are obtained before we commence work.
              </p>
            </section>

            {/* 3. Quotations and Pricing */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">3. Quotations and Pricing</h2>
              <p>
                3.1 All Quotations are valid for <strong className="text-navy">30 days</strong> from the date of issue unless otherwise stated in writing. After this period, we reserve the right to revise pricing to reflect changes in material costs or labour rates.
              </p>
              <p className="mt-4">
                3.2 Quotations are based on information provided at the time of enquiry or initial site visit. Final pricing is subject to a formal survey of the Site. Where a survey reveals conditions materially different from those anticipated, we will issue a revised Quotation before proceeding.
              </p>
              <p className="mt-4">
                3.3 All quoted prices include VAT at the prevailing rate where applicable. The VAT amount is shown separately on all quotations and invoices.
              </p>
              <p className="mt-4">
                3.4 Any variations to the agreed scope of work requested by you after the Contract has been formed may be subject to additional charges. We will provide written confirmation of any additional costs before carrying out variations.
              </p>
              <p className="mt-4">
                3.5 We are not bound by any typographical, clerical, or other error in any Quotation, price list, or other documentation.
              </p>
            </section>

            {/* 4. Orders and Acceptance */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">4. Orders and Acceptance</h2>
              <p>
                4.1 A binding Contract is formed when you accept our Quotation in writing (including by email) and pay the required deposit, or when we confirm acceptance of your order in writing — whichever is earlier.
              </p>
              <p className="mt-4">
                4.2 Your own purchase order terms (if any) shall not form part of the Contract unless expressly agreed by us in writing.
              </p>
              <p className="mt-4">
                4.3 We reserve the right to decline any order at our discretion prior to a Contract being formed. Where we decline an order after you have paid a deposit, we will refund the deposit in full within 14 days.
              </p>
            </section>

            {/* 5. Payment Terms */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">5. Payment Terms</h2>
              <p>
                5.1 <strong className="text-navy">Deposit:</strong> A deposit of <strong className="text-navy">50%</strong> of the Contract value (or such other amount as specified in the Quotation) is payable upon acceptance of the order and before any Goods are ordered or fabricated.
              </p>
              <p className="mt-4">
                5.2 <strong className="text-navy">Balance:</strong> The remaining balance is due upon practical completion of the installation. &ldquo;Practical completion&rdquo; means the point at which the installation is substantially complete and fit for its intended purpose, even if minor snagging items remain outstanding.
              </p>
              <p className="mt-4">
                5.3 Payment may be made by bank transfer, debit card, or such other method as we agree in writing. We do not accept cash payments above &pound;1,000.
              </p>
              <p className="mt-4">
                5.4 Time for payment is of the essence. If you fail to make payment on the due date, we reserve the right to:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Charge interest on the overdue amount at 8% per annum above the Bank of England base rate, pursuant to the Late Payment of Commercial Debts (Interest) Act 1998 (for Business Customers);</li>
                <li>Suspend further work until payment is received; and</li>
                <li>Terminate the Contract if payment remains outstanding for more than 30 days after the due date.</li>
              </ul>
              <p className="mt-4">
                5.5 All Goods supplied remain the property of Sigma Shopfronts and Shutter Limited until payment in full has been received.
              </p>
            </section>

            {/* 6. Installation */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">6. Installation</h2>
              <p>
                6.1 <strong className="text-navy">Site Access:</strong> You must ensure that we have safe, unobstructed access to the Site at all agreed times. This includes ensuring the area is clear of stock, furniture, and other obstructions before our team arrives. If access is delayed or denied, we reserve the right to charge for wasted time at our standard day rate.
              </p>
              <p className="mt-4">
                6.2 <strong className="text-navy">Timelines:</strong> We will use reasonable endeavours to meet any installation dates agreed with you. Timelines are estimates and are not guaranteed. We accept no liability for delays caused by factors outside our reasonable control (see Section 11 — Force Majeure).
              </p>
              <p className="mt-4">
                6.3 <strong className="text-navy">Structural Suitability:</strong> You warrant that the existing structure (walls, lintels, frames) at the Site is sound and capable of supporting the new installation. We accept no liability for damage caused by pre-existing structural defects that were not apparent at the time of survey.
              </p>
              <p className="mt-4">
                6.4 <strong className="text-navy">Utilities:</strong> You are responsible for identifying the location of all underground or concealed services (gas, water, electricity, telecommunications) at the Site. We accept no liability for damage to services not identified prior to works commencing.
              </p>
              <p className="mt-4">
                6.5 <strong className="text-navy">Waste Removal:</strong> We will remove all waste arising directly from our installation works from the Site on completion, unless otherwise agreed in writing.
              </p>
              <p className="mt-4">
                6.6 <strong className="text-navy">Completion:</strong> On completion, you will be asked to sign a completion certificate confirming that you are satisfied with the works. Signing this certificate does not affect your rights in relation to latent defects or warranty claims.
              </p>
            </section>

            {/* 7. Warranties */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">7. Warranties</h2>
              <p>
                7.1 <strong className="text-navy">Workmanship Warranty:</strong> We warrant that all installation work will be free from defects in workmanship for a period of <strong className="text-navy">12 months</strong> from the date of practical completion. If any defect in workmanship arises during this period, we will return to rectify it at no charge, subject to the conditions below.
              </p>
              <p className="mt-4">
                7.2 <strong className="text-navy">Manufacturer Warranties:</strong> Goods are supplied with the benefit of the relevant manufacturer&rsquo;s warranty, details of which will be provided upon completion. These warranties are separate from, and in addition to, our workmanship warranty and are subject to the relevant manufacturer&rsquo;s terms and conditions.
              </p>
              <p className="mt-4">
                7.3 <strong className="text-navy">Warranty Exclusions:</strong> Our workmanship warranty does not cover:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Damage caused by misuse, neglect, or failure to follow our maintenance guidance;</li>
                <li>Damage caused by accidental impact, vandalism, or fire;</li>
                <li>Normal wear and tear;</li>
                <li>Works carried out to the installed Goods by third parties without our prior written consent; or</li>
                <li>Damage arising from pre-existing structural defects at the Site.</li>
              </ul>
              <p className="mt-4">
                7.4 To make a warranty claim, please contact us in writing as soon as possible after discovering the defect. We will inspect and, where the defect falls within warranty, rectify it within a reasonable timeframe.
              </p>
            </section>

            {/* 8. Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">8. Limitation of Liability</h2>
              <p>
                8.1 Nothing in these Terms shall limit or exclude our liability for: (a) death or personal injury caused by our negligence; (b) fraud or fraudulent misrepresentation; (c) any liability that cannot lawfully be excluded or limited.
              </p>
              <p className="mt-4">
                8.2 Subject to clause 8.1, our total liability to Business Customers in contract, tort (including negligence), breach of statutory duty, or otherwise, arising out of or in connection with the Contract shall be limited to the total Contract price paid by you.
              </p>
              <p className="mt-4">
                8.3 We shall not be liable to Business Customers for any indirect or consequential loss, loss of profit, loss of business, business interruption, or loss of anticipated savings.
              </p>
              <p className="mt-4">
                8.4 For Consumers, these Terms do not affect your rights under the Consumer Rights Act 2015 or any other applicable consumer protection legislation.
              </p>
            </section>

            {/* 9. Cancellation */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">9. Cancellation</h2>
              <p>
                9.1 <strong className="text-navy">Consumers — Cooling-Off Period:</strong> If you are a Consumer and entered into this Contract off-premises or at a distance (e.g. by telephone or online), you have the right to cancel within <strong className="text-navy">14 calendar days</strong> of the date the Contract was formed, without giving a reason, under the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013.
              </p>
              <p className="mt-4">
                9.2 <strong className="text-navy">Bespoke Goods Exception:</strong> The 14-day cooling-off right does not apply to Goods that are clearly personalised or made to your specification (such as bespoke-fabricated aluminium frames or custom-sized shutters) once manufacturing has commenced, in accordance with Regulation 28(1)(b) of the Consumer Contracts Regulations 2013.
              </p>
              <p className="mt-4">
                9.3 <strong className="text-navy">Early Start of Services:</strong> If you request that we commence installation work within the 14-day cooling-off period, you acknowledge that you will be liable to pay for Services performed up to the point of cancellation.
              </p>
              <p className="mt-4">
                9.4 <strong className="text-navy">Cancellation by Business Customers:</strong> Business Customers do not have a statutory right to cancel once a Contract has been formed. If you wish to cancel, you must notify us in writing. We reserve the right to retain the deposit and to charge for any Goods ordered, fabricated, or otherwise committed to on your behalf prior to cancellation.
              </p>
              <p className="mt-4">
                9.5 <strong className="text-navy">Cancellation by Us:</strong> We reserve the right to cancel the Contract at any time before commencement of work if circumstances outside our control make it impracticable to proceed. In this event, we will refund any deposit paid in full within 14 days.
              </p>
            </section>

            {/* 10. Force Majeure */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">10. Force Majeure</h2>
              <p>
                10.1 We shall not be in breach of the Contract or liable for any failure or delay in performing our obligations where such failure or delay results from events beyond our reasonable control, including (but not limited to): acts of God, fire, flood, storm, civil unrest, government restrictions, pandemic, strike or industrial action, failure of utility services, or shortage of materials.
              </p>
              <p className="mt-4">
                10.2 We will notify you as soon as reasonably practicable of any such event and its anticipated duration. If the delay exceeds 60 days, either party may terminate the Contract by written notice, and we will refund any sums paid for work not yet completed.
              </p>
            </section>

            {/* 11. Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">11. Intellectual Property</h2>
              <p>
                11.1 All drawings, designs, technical specifications, quotation documents, and other materials produced by us remain our intellectual property and may not be copied, reproduced, or shared with third parties without our prior written consent.
              </p>
              <p className="mt-4">
                11.2 We may use photographs of completed installations for marketing purposes (including on our website and social media). We will not include identifiable personal information in such materials without your consent.
              </p>
            </section>

            {/* 12. Complaints Procedure */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">12. Complaints Procedure</h2>
              <p>
                12.1 We take customer satisfaction seriously. If you are unhappy with any aspect of our work or service, please contact us as soon as possible:
              </p>
              <address className="not-italic mt-4 pl-4 border-l-4 border-gold space-y-1">
                <p className="font-semibold text-navy">Sigma Shopfronts and Shutter Limited</p>
                <p>
                  Email:{' '}
                  <a
                    href="mailto:sales@sigmashopfronts.com"
                    className="text-gold hover:text-gold-light transition-colors"
                  >
                    sales@sigmashopfronts.com
                  </a>
                </p>
              </address>
              <p className="mt-4">
                12.2 We will acknowledge all written complaints within <strong className="text-navy">3 working days</strong> and aim to provide a full response within <strong className="text-navy">14 working days</strong>.
              </p>
              <p className="mt-4">
                12.3 If we are unable to resolve your complaint to your satisfaction, Consumer customers may be entitled to refer the matter to an Alternative Dispute Resolution (ADR) scheme or to the courts.
              </p>
            </section>

            {/* 13. Governing Law */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">13. Governing Law and Jurisdiction</h2>
              <p>
                13.1 These Terms and any dispute or claim arising out of or in connection with them (including non-contractual disputes or claims) shall be governed by and construed in accordance with the law of <strong className="text-navy">England and Wales</strong>.
              </p>
              <p className="mt-4">
                13.2 Each party irrevocably agrees that the courts of England and Wales shall have exclusive jurisdiction to settle any dispute or claim arising out of or in connection with these Terms or their subject matter, save that we may seek interim injunctive relief in any court of competent jurisdiction.
              </p>
            </section>

            {/* 14. General */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">14. General</h2>
              <p>
                14.1 <strong className="text-navy">Entire Agreement:</strong> These Terms, together with the accepted Quotation, constitute the entire agreement between the parties and supersede all previous discussions, correspondence, negotiations, and agreements relating to the subject matter.
              </p>
              <p className="mt-4">
                14.2 <strong className="text-navy">Severability:</strong> If any provision of these Terms is found to be unlawful, void, or unenforceable, that provision shall be deemed severable and shall not affect the validity and enforceability of the remaining provisions.
              </p>
              <p className="mt-4">
                14.3 <strong className="text-navy">Waiver:</strong> No failure or delay by us in exercising any right or remedy under these Terms shall constitute a waiver of that right or remedy.
              </p>
              <p className="mt-4">
                14.4 <strong className="text-navy">Third Parties:</strong> These Terms do not confer any rights on any third party under the Contracts (Rights of Third Parties) Act 1999.
              </p>
              <p className="mt-4">
                14.5 <strong className="text-navy">Amendments:</strong> We reserve the right to amend these Terms at any time. The version in force at the time a Contract is formed shall apply to that Contract.
              </p>
            </section>

            {/* 15. Contact */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">15. Contact Information</h2>
              <p>For all enquiries, please contact us:</p>
              <address className="not-italic mt-4 pl-4 border-l-4 border-gold space-y-1">
                <p className="font-semibold text-navy">Sigma Shopfronts and Shutter Limited</p>
                <p>Company No: 16794487</p>
                <p>West Midlands, United Kingdom</p>
                <p>
                  Email:{' '}
                  <a
                    href="mailto:sales@sigmashopfronts.com"
                    className="text-gold hover:text-gold-light transition-colors"
                  >
                    sales@sigmashopfronts.com
                  </a>
                </p>
              </address>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}
