import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Emergency Shopfront Boarding: What to Do When Your Shop Is Broken Into',
  description:
    'Step-by-step guide on what to do after a shopfront break-in, including securing your premises with emergency boarding, dealing with police and insurers, and arranging permanent repairs.',
  alternates: {
    canonical: 'https://www.sigmashopfronts.com/blog/emergency-shopfront-boarding-what-to-do',
  },
};

const faqs = [
  {
    question: 'How quickly can emergency boarding be fitted after a break-in?',
    answer:
      'Most specialist shopfront companies offering a 24/7 emergency service aim to have an operative on site within two to four hours, depending on your location and the time of call. In major cities and towns across England and Wales, response times are usually at the shorter end of that range. The boarding itself typically takes one to three hours to complete, depending on the size of the opening and the extent of the damage.',
  },
  {
    question: 'Will my insurance cover emergency boarding costs?',
    answer:
      'Yes, in the vast majority of cases. Most commercial property and combined business insurance policies cover the reasonable cost of emergency boarding as part of the claims process. You should keep all invoices and photographs, and notify your insurer as soon as possible. Some policies require you to use an insurer-approved contractor, so check your policy wording or call your broker before instructing the work if time permits.',
  },
  {
    question: 'Should I clean up before the police arrive?',
    answer:
      'No. Do not touch, move, or clean anything until the police have attended and, if applicable, a forensic examination has been carried out. Disturbing the scene can destroy fingerprint, footwear, and DNA evidence that may be critical to identifying the offender. Only take action to prevent further loss or danger — for example, turning off a water supply if a pipe has been damaged.',
  },
  {
    question: 'How long does it take to get a permanent replacement shopfront after a break-in?',
    answer:
      'This depends on the complexity of the shopfront and the availability of materials. A standard aluminium shopfront replacement can often be manufactured and installed within two to three weeks. Bespoke or heritage-style frontages may take longer. Your emergency boarding will keep the premises secure in the interim, and a good installer will prioritise break-in repairs to minimise the period of disruption.',
  },
];

export default function EmergencyBoardingPage() {
  return (
    <>
      <SchemaMarkup
        type="FAQPage"
        data={{
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        }}
      />

      <article className="section-padding bg-white">
        <div className="container-max max-w-3xl">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: 'Emergency Shopfront Boarding' },
            ]}
          />

          <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy mt-4 mb-6">
            Emergency Shopfront Boarding: What to Do When Your Shop Is Broken Into
          </h1>

          <p className="text-charcoal leading-relaxed mb-6">
            Discovering that your shop has been broken into is a deeply stressful experience. Glass everywhere, stock disturbed or stolen, and the immediate worry that the premises are now completely unsecured. In those first chaotic minutes it is difficult to think clearly, but the steps you take in the next few hours will have a significant impact on your insurance claim, the police investigation, and how quickly your business gets back on its feet.
          </p>
          <p className="text-charcoal leading-relaxed mb-6">
            This guide walks you through exactly what to do — from the moment you discover the break-in through to arranging a permanent repair.
          </p>

          <h2 className="font-heading text-2xl font-semibold text-navy mt-10 mb-4">
            Step 1: Ensure Personal Safety
          </h2>
          <p className="text-charcoal leading-relaxed mb-6">
            Before anything else, make sure you and your staff are safe. Do not enter the premises if there is any possibility that the intruder is still inside. Stand well back, call 999, and wait for the police to arrive and confirm the building is clear. If you arrive to find the break-in has already occurred and the building is obviously empty, you may enter — but remain cautious and avoid touching anything unnecessarily.
          </p>

          <h2 className="font-heading text-2xl font-semibold text-navy mt-10 mb-4">
            Step 2: Call the Police
          </h2>
          <p className="text-charcoal leading-relaxed mb-6">
            Report the break-in to the police as soon as possible. If the crime is in progress or has just occurred, dial 999. If you discover the aftermath some time later, call 101 to report it as a non-emergency. You will be given a crime reference number — keep this safe, as your insurer will require it. In some cases, a scenes-of-crime officer (SOCO) will attend to gather forensic evidence such as fingerprints, footwear marks, and DNA samples. Do not clean up or disturb the scene until they have finished.
          </p>

          <h2 className="font-heading text-2xl font-semibold text-navy mt-10 mb-4">
            Step 3: Secure the Premises
          </h2>
          <p className="text-charcoal leading-relaxed mb-6">
            Once the police have attended and given you the all-clear to proceed, your immediate priority is to secure the building against further intrusion, weather damage, and public liability risk. Broken glass on a high street is a danger to passers-by, and an open shopfront is an open invitation to opportunistic theft.
          </p>
          <p className="text-charcoal leading-relaxed mb-6">
            This is where emergency shopfront boarding comes in. A specialist contractor will attend — often within two to four hours — and secure the opening with heavy-duty plywood, steel sheeting, or temporary shuttering. The boarding should be robust enough to deter further break-in attempts and weatherproof enough to protect your stock and interior until a permanent repair can be arranged. Our{' '}
            <Link href="/services/emergency-callout" className="text-gold font-medium hover:underline">
              24/7 emergency callout service
            </Link>{' '}
            covers emergency boarding, temporary shutter fitting, and emergency glass replacement across our service area.
          </p>

          <h2 className="font-heading text-2xl font-semibold text-navy mt-10 mb-4">
            Step 4: Document Everything
          </h2>
          <p className="text-charcoal leading-relaxed mb-6">
            Before any clean-up begins, photograph and video the damage thoroughly. Capture wide shots showing the full extent of the break-in point, close-ups of damaged locks, frames, and glass, and images of any displaced or stolen stock. If you have CCTV, secure the footage immediately — many systems overwrite after a set period, so download or back up the relevant files without delay. Make a written list of all stolen or damaged items as soon as you can, while the details are fresh.
          </p>

          <h2 className="font-heading text-2xl font-semibold text-navy mt-10 mb-4">
            Step 5: Notify Your Insurer
          </h2>
          <p className="text-charcoal leading-relaxed mb-6">
            Contact your insurance company or broker as soon as practically possible — ideally the same day. Most commercial policies have a notification window (often 30 days, but sometimes shorter for theft claims), and early notification demonstrates good faith. Have the following information ready:
          </p>
          <ul className="list-disc pl-6 text-charcoal leading-relaxed mb-6 space-y-2">
            <li>Your policy number.</li>
            <li>The police crime reference number.</li>
            <li>A description of how entry was gained.</li>
            <li>A preliminary list of stolen or damaged items with estimated values.</li>
            <li>Photographs and video of the damage.</li>
            <li>The emergency boarding invoice (your insurer will normally reimburse this as part of the claim).</li>
          </ul>
          <p className="text-charcoal leading-relaxed mb-6">
            Some policies require you to use an insurer-approved contractor for repairs. Ask your broker about this before commissioning permanent work, as using an unapproved supplier could jeopardise the claim.
          </p>

          <h2 className="font-heading text-2xl font-semibold text-navy mt-10 mb-4">
            Step 6: Arrange a Permanent Repair
          </h2>
          <p className="text-charcoal leading-relaxed mb-6">
            Emergency boarding is a temporary measure. As soon as your insurer has authorised the repair — or given you the go-ahead to obtain quotes — arrange for a permanent replacement shopfront. A standard aluminium shopfront can typically be manufactured and installed within two to three weeks. If you are upgrading security at the same time (for example, adding a roller shutter or specifying laminated glass), discuss this with your installer at the quotation stage so the work can be combined.
          </p>

          <h2 className="font-heading text-2xl font-semibold text-navy mt-10 mb-4">
            Preventing Future Break-Ins
          </h2>
          <p className="text-charcoal leading-relaxed mb-4">
            A break-in is a painful but powerful prompt to review your security. Consider the following measures:
          </p>
          <ul className="list-disc pl-6 text-charcoal leading-relaxed mb-6 space-y-2">
            <li><strong>Roller shutters</strong> — External or internal shutters provide a physical barrier that deters opportunistic break-ins and can significantly reduce insurance premiums.</li>
            <li><strong>Laminated or anti-bandit glass</strong> — Standard toughened glass shatters into small pieces on impact. Laminated glass holds together, making it far harder to create an entry hole.</li>
            <li><strong>Upgraded locks and multi-point locking systems</strong> — Ensure your door hardware meets at least BS 3621 for insurance purposes.</li>
            <li><strong>CCTV and alarm systems</strong> — Visible cameras and monitored alarms are proven deterrents. Ensure your system is regularly maintained and the footage is stored for at least 30 days.</li>
            <li><strong>Improved lighting</strong> — Well-lit frontages are less attractive targets. Consider timer-controlled or motion-activated lighting for after-hours periods.</li>
          </ul>

          <p className="text-charcoal leading-relaxed mb-10">
            No business owner wants to go through a break-in twice. Taking prompt, methodical action in the aftermath — and investing in better security for the future — will minimise the disruption and help you get back to trading as quickly as possible.
          </p>

          {/* Visual FAQ section */}
          <section className="border-t border-grey-200 pt-10">
            <h2 className="font-heading text-2xl font-semibold text-navy mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <h3 className="font-heading text-lg font-medium text-navy mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-charcoal leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
