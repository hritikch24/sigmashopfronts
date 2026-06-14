import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactForm from '@/components/ContactForm';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact Sigma Shop Fronts for a free site survey and quotation. Call 07414 779594, WhatsApp +44 7397 066538, or email sales@sigmashopfronts.com. West Midlands, UK.',
  alternates: {
    canonical: '/contact',
  },
};

const contactDetails = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: 'Phone',
    value: '07414 779594',
    href: 'tel:+447414779594',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: 'WhatsApp',
    value: '+44 7397 066538',
    href: 'https://wa.me/447397066538',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: 'Email',
    value: 'sales@sigmashopfronts.com',
    href: 'mailto:sales@sigmashopfronts.com',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: 'Address',
    value: 'West Midlands, United Kingdom',
    href: null,
  },
];

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.sigmashopfronts.com' }, { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://www.sigmashopfronts.com/contact' }] }) }} />
      <SchemaMarkup type="LocalBusiness" />

      {/* Hero */}
      <section className="bg-gradient-dark section-padding">
        <div className="container-max">
          <Breadcrumbs items={[{ label: 'Contact' }]} />
          <h1 className="mt-6 text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
            Get in <span className="text-gradient-gold">Touch</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-grey-300 leading-relaxed">
            Whether you need a free site survey, a budget quotation, or emergency callout assistance — our
            team is ready to help. Fill in the form or reach us directly using the details below.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid lg:grid-cols-[1fr_420px] gap-12 items-start">
            {/* Left — Contact Form */}
            <div>
              <h2 className="text-2xl font-heading font-bold text-navy mb-2">Send Us a Message</h2>
              <p className="text-grey-500 mb-6 text-sm">
                We aim to respond to all enquiries within one business day.
              </p>
              <ContactForm />
            </div>

            {/* Right — Contact Details */}
            <aside className="space-y-6">
              {/* Details Card */}
              <div className="card-surface rounded-xl p-6">
                <h2 className="text-xl font-heading font-bold text-navy mb-5">Contact Details</h2>
                <ul className="space-y-4">
                  {contactDetails.map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <span className="mt-0.5 flex-shrink-0 w-10 h-10 rounded-lg bg-navy text-gold flex items-center justify-center">
                        {item.icon}
                      </span>
                      <div>
                        <p className="text-xs text-grey-400 font-medium uppercase tracking-wide mb-0.5">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-navy font-semibold hover:text-gold transition-colors break-all"
                            target={item.href.startsWith('http') ? '_blank' : undefined}
                            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-navy font-semibold">{item.value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Working Hours */}
              <div className="card-surface rounded-xl p-6">
                <h3 className="text-lg font-heading font-bold text-navy mb-4">Working Hours</h3>
                <ul className="space-y-2 text-sm text-grey-600">
                  <li className="flex justify-between">
                    <span>Monday – Friday</span>
                    <span className="font-semibold text-navy">08:00 – 18:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-semibold text-navy">09:00 – 16:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-semibold text-navy">By appointment</span>
                  </li>
                </ul>
                <p className="mt-4 text-xs text-grey-400">
                  Emergency callout is available 24/7 — call us any time.
                </p>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/447397066538"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full p-4 rounded-xl bg-[#25D366] text-white font-heading font-bold hover:bg-[#20ba5a] transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                </svg>
                <span>Chat on WhatsApp</span>
              </a>

              {/* Map Placeholder */}
              <div className="rounded-xl overflow-hidden border border-grey-200">
                <div className="bg-grey-100 h-48 flex flex-col items-center justify-center text-grey-400 gap-2">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-sm font-medium">Map coming soon</p>
                  <p className="text-xs">West Midlands, United Kingdom</p>
                </div>
              </div>

              {/* Company registration note */}
              <p className="text-xs text-grey-400 text-center">
                Sigma Shopfronts and Shutter Ltd · Companies House No.{' '}
                <span className="font-semibold">16794487</span> · West Midlands, UK
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* Reassurance strip */}
      <section className="section-padding bg-grey-50">
        <div className="container-max">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              { heading: 'Free Site Survey', body: 'No-obligation visit from one of our specialists, with a detailed written quotation to follow.' },
              { heading: 'Fast Response', body: 'We aim to respond to all enquiries within one business day, and emergency calls are answered immediately.' },
              { heading: 'Fully Insured', body: 'All our work is covered by comprehensive public liability and employers\' liability insurance.' },
            ].map((item) => (
              <div key={item.heading}>
                <h3 className="text-lg font-heading font-bold text-navy mb-2">{item.heading}</h3>
                <p className="text-grey-500 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
