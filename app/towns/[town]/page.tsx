import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { towns, townBySlug } from '@/data/towns';
import { services } from '@/data/services';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQSection from '@/components/FAQSection';
import ContactForm from '@/components/ContactForm';
import { SITE_URL } from '@/lib/site';

export const dynamicParams = false;

export async function generateStaticParams() {
  return towns.map((t) => ({ town: t.slug }));
}

interface PageProps { params: Promise<{ town: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { town: slug } = await params;
  const town = townBySlug[slug];
  if (!town) return {};
  return {
    title: `Shopfronts & Shutter Repairs in ${town.name}`,
    description: `Shopfront installation and roller shutter repairs in ${town.name}, ${town.county}. ${town.miles} miles from Birmingham — inside our repair radius, two-hour reply. ${town.council} planning handled.`,
    alternates: { canonical: `${SITE_URL}/towns/${town.slug}` },
    openGraph: {
      title: `Shopfronts & Shutter Repairs in ${town.name}`,
      description: `Shopfront and shutter work across ${town.name}. ${town.retail.slice(0, 3).join(', ')}.`,
      url: `${SITE_URL}/towns/${town.slug}`,
    },
  };
}

/** The four services that actually bring people to a town page. */
const REPAIR_FIRST = ['shutter-repair', 'emergency-callout', 'shopfront-repairs', 'roller-shutters'];

export default async function TownPage({ params }: PageProps) {
  const { town: slug } = await params;
  const town = townBySlug[slug];
  if (!town) notFound();

  // only link towns that actually exist as pages
  const neighbours = town.near.map((s) => townBySlug[s]).filter(Boolean);
  const repairServices = REPAIR_FIRST.map((s) => services.find((x) => x.slug === s)).filter(Boolean);

  const faqs = [
    {
      question: `How fast can you get to ${town.name} for an emergency shutter repair?`,
      answer: `${town.name} is about ${town.miles} miles from Birmingham, well inside our repair radius. We reply to emergency calls within two hours. If your shutter has failed in the open position and the unit is insecure, say so when you call — that changes how we schedule it.`,
    },
    {
      question: `Do I need planning permission for a new shopfront in ${town.name}?`,
      answer: `Usually yes. ${town.council} determines planning permission and advertisement consent for shopfronts here. Replacing a frontage is a material alteration to the building's external appearance, and any illuminated or projecting sign needs advertisement consent as a separate application.${town.conservation ? ' ' + town.conservation : ''} We prepare the drawings and handle the application.`,
    },
    {
      question: `What does a shopfront cost in ${town.name}?`,
      answer: `It depends far more on the opening than on the town. A straightforward aluminium frontage in an existing square opening is a different job from one that needs the opening altered, a new lintel, or a listed building consent. We survey before quoting rather than giving a rate per metre that changes once we see it.`,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                  { '@type': 'ListItem', position: 2, name: 'Towns We Cover', item: `${SITE_URL}/towns` },
                  { '@type': 'ListItem', position: 3, name: town.name, item: `${SITE_URL}/towns/${town.slug}` },
                ],
              },
              {
                '@type': 'Service',
                name: `Shopfront and shutter repairs in ${town.name}`,
                serviceType: 'Shopfront installation and roller shutter repair',
                provider: { '@id': `${SITE_URL}/#organization` },
                areaServed: { '@type': 'City', name: town.name, containedInPlace: { '@type': 'AdministrativeArea', name: town.county } },
              },
              {
                '@type': 'FAQPage',
                mainEntity: faqs.map((f) => ({
                  '@type': 'Question',
                  name: f.question,
                  acceptedAnswer: { '@type': 'Answer', text: f.answer },
                })),
              },
            ],
          }),
        }}
      />

      {/* Hero */}
      <section className="section-padding bg-gradient-dark">
        <div className="container-max">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Towns', href: '/towns' }, { label: town.name }]} />
          <div className="flex flex-wrap items-center gap-3 mt-7 mb-5">
            <span className="text-cyan font-mono" style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              {town.county}
            </span>
            <span className="text-grey-600">·</span>
            <span className="text-grey-600 font-mono" style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              {town.miles} miles from Birmingham
            </span>
          </div>
          <h1 className="font-heading text-white font-bold text-3xl sm:text-4xl lg:text-5xl mb-5">
            Shopfronts &amp; shutter repairs in {town.name}
          </h1>
          <p className="text-charcoal max-w-3xl" style={{ fontSize: '1.05rem', lineHeight: 1.75 }}>
            {town.name} is inside our repair radius. We reply to emergency calls within two
            hours, and we cover installation, shutter repair and out-of-hours make-safe across
            {' '}{town.retail.slice(0, 3).join(', ')} and the surrounding trade units.
          </p>
        </div>
      </section>

      {/* The local detail — the part no template can fake */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid gap-10" style={{ gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)' }}>
            <div>
              <h2 className="font-heading text-white font-bold text-2xl sm:text-3xl mb-5">
                Working in {town.name}
              </h2>
              <p className="text-charcoal mb-7" style={{ fontSize: '1rem', lineHeight: 1.85 }}>{town.note}</p>

              {town.conservation && (
                <div className="card-surface" style={{ padding: '1.5rem', borderLeft: '3px solid var(--color-gold)' }}>
                  <span className="text-gold font-mono" style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Heritage constraint
                  </span>
                  <p className="text-charcoal mt-3 mb-0" style={{ fontSize: '0.95rem', lineHeight: 1.75 }}>
                    {town.conservation}
                  </p>
                </div>
              )}
            </div>

            <aside>
              <div className="card-surface" style={{ padding: '1.5rem' }}>
                <h3 className="font-heading text-white font-semibold mb-4" style={{ fontSize: '1rem' }}>
                  The facts for {town.name}
                </h3>
                <dl style={{ margin: 0 }}>
                  {[
                    ['Planning authority', town.council],
                    ['County', town.county],
                    ['From Birmingham', `${town.miles} miles`],
                    ['Emergency reply', 'Within two hours'],
                  ].map(([k, v]) => (
                    <div key={k} style={{ padding: '0.7rem 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                      <dt className="text-grey-600 font-mono" style={{ fontSize: '0.68rem', letterSpacing: '0.09em', textTransform: 'uppercase' }}>{k}</dt>
                      <dd className="text-white mt-1 mb-0" style={{ fontSize: '0.92rem', lineHeight: 1.5 }}>{v}</dd>
                    </div>
                  ))}
                </dl>
                <div style={{ paddingTop: '0.9rem' }}>
                  <span className="text-grey-600 font-mono" style={{ fontSize: '0.68rem', letterSpacing: '0.09em', textTransform: 'uppercase' }}>
                    Retail areas
                  </span>
                  <p className="text-charcoal mt-2 mb-0" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
                    {town.retail.join(' · ')}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Services, repair-first */}
      <section className="section-padding bg-space-light">
        <div className="container-max">
          <h2 className="font-heading text-white font-bold text-2xl sm:text-3xl mb-3">
            What we do in {town.name}
          </h2>
          <p className="text-charcoal mb-9 max-w-3xl" style={{ lineHeight: 1.7 }}>
            Repairs first, because that is what people in {town.name} usually call about.
          </p>
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {repairServices.map((s) => s && (
              <Link key={s.slug} href={`/services/${s.slug}`} className="card-surface" style={{ padding: '1.4rem', display: 'block', textDecoration: 'none' }}>
                <h3 className="font-heading text-white font-semibold mb-2" style={{ fontSize: '1.02rem' }}>{s.name}</h3>
                <p className="text-charcoal mb-0" style={{ fontSize: '0.9rem', lineHeight: 1.65 }}>{s.shortDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {neighbours.length > 0 && (
        <section className="section-padding">
          <div className="container-max">
            <h2 className="font-heading text-white font-bold text-2xl mb-6">Nearby</h2>
            <div className="flex flex-wrap gap-3">
              {neighbours.map((n) => (
                <Link key={n.slug} href={`/towns/${n.slug}`} className="card-surface" style={{ padding: '0.7rem 1.1rem', textDecoration: 'none', fontSize: '0.92rem' }}>
                  <span className="text-white">{n.name}</span>
                  <span className="text-grey-600"> · {n.miles} mi</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FAQSection faqs={faqs} title={`${town.name} — common questions`} />

      <section className="section-padding bg-gradient-dark">
        <div className="container-max">
          <h2 className="font-heading text-white font-bold text-2xl sm:text-3xl mb-4">
            Get a quote for {town.name}
          </h2>
          <p className="text-charcoal mb-8 max-w-2xl" style={{ lineHeight: 1.7 }}>
            Tell us the unit and what has happened. If it is an emergency, say so — we reply
            within two hours.
          </p>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
