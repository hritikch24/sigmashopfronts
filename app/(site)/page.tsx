import Image from 'next/image';
import Link from '@/components/site/Link';
import { business } from '@/lib/business';
import { pageMeta } from '@/lib/seo';
import { shopfronts } from '@/data/shopfronts';
import { whatsappLink } from '@/lib/quick-line';
import QuickMessage from '@/components/site/QuickMessage';

export const metadata = pageMeta({
  path: '/',
  title: `${business.name} — shopfronts, shutters and repairs`,
  description:
    'Aluminium shopfronts, roller shutters, doors and glazing fitted UK-wide and repaired within 100 road miles of Birmingham, Sheffield included. Free quote and site visit; same-day call-outs for emergency repairs.',
});

/** Our own job photos, one per thing people most often ask us for. */
const CARDS: { slug: string; tag: 'New' | 'Repair'; src: string; w: number; h: number; alt: string }[] = [
  { slug: 'aluminium', tag: 'New', src: '/assets/sigma-parade-sliding-front.jpg', w: 1000, h: 680, alt: 'Dark aluminium shopfront with sliding glazed doors that we fitted in a brick parade' },
  { slug: 'roller-shutters', tag: 'New', src: '/assets/sigma-shutter-over-entrance.jpg', w: 1000, h: 680, alt: 'Roller shutter and box we fitted above a dark aluminium glazed entrance' },
  { slug: 'shutter-repairs', tag: 'Repair', src: '/assets/sigma-shutter-repair.jpg', w: 1000, h: 700, alt: 'Our fitters working on a shop roller shutter from stepladders' },
  { slug: 'security-doors', tag: 'New', src: '/assets/sigma-commercial-entrance.jpeg', w: 1024, h: 768, alt: 'Pair of glazed aluminium entrance doors with long pull handles that we fitted' },
  { slug: 'automatic-doors', tag: 'New', src: '/assets/automatic-door-sigma.jpeg', w: 480, h: 848, alt: 'Automatic sliding door in a dark aluminium frame that we fitted at a convenience store' },
  { slug: 'industrial-shutters', tag: 'New', src: '/assets/sigma-industrial-shutter.jpg', w: 1000, h: 1000, alt: 'Dark green steel roller shutter we fitted across a loading opening' },
];

export default function Home() {
  const name = (slug: string) => shopfronts.find((s) => s.slug === slug)!.name;
  const others = shopfronts.filter((s) => !CARDS.some((c) => c.slug === s.slug));
  return (
    <>
      <section className="hero">
        <div className="frame">
          <div className="hero__top">
            <div>
              <p className="hero__where">{business.name} · Oldbury, West Midlands</p>
              <h1>Shopfronts, roller shutters and doors, fitted and repaired</h1>
              <p className="lede measure" style={{ marginTop: '1rem' }}>
                New aluminium shopfronts, shutters, security doors and glass fitted anywhere in the UK, and repairs within{' '}
                {business.repairRadiusMiles} road miles of {business.repairCentre}.
              </p>
              <ul className="ticks">
                <li>Registered company {business.companyNumber}</li>
                <li>Insured</li>
                <li>Free quote and site visit</li>
                <li>Same-day emergency call-outs</li>
              </ul>
            </div>
            <figure className="plate hero__photo">
              <Image
                src="/assets/sigma-retail-front.jpeg"
                alt="A dark grey aluminium restaurant front we fitted, with a glazed door, fixed display glazing and a painted fascia"
                width={1600}
                height={1200}
                priority
                quality={60}
                sizes="(min-width: 60rem) 440px, 92vw"
              />
              <figcaption>A restaurant front we fitted: dark grey aluminium, single door, painted fascia.</figcaption>
            </figure>
          </div>

          <div className="fork">
            <div className="fork__card fork__card--urgent">
              <h2>Something broken right now?</h2>
              <p>
                Shutter stuck, glass smashed, door that will not lock. Within {business.repairRadiusMiles} road miles of{' '}
                {business.repairCentre}.
              </p>
              <div className="fork__acts">
                <a href={`tel:${business.phones.main.tel}`} className="act act--solid" data-dial="main">
                  Call {business.phones.main.display}
                </a>
                <a
                  href={whatsappLink(business.whatsapp, 'Hello Sigma Shopfronts, something is broken at my shop. Postcode: ')}
                  className="act act--wa"
                  data-dial="whatsapp"
                  rel="noopener"
                >
                  WhatsApp a photo of it
                </a>
              </div>
              <p className="fork__small">{business.emergencyPromise}</p>
            </div>
            <div className="fork__card">
              <h2>Planning something new?</h2>
              <p>A new shopfront, shutters, doors or glass, anywhere in the UK. One line is enough to start.</p>
              <QuickMessage
                source="home-new"
                label="Your number or email, the postcode, and what you have in mind"
                placeholder="07123 456789, LS1 4AP, new front and shutter for a café"
              />
              <p className="fork__small">
                Have photos of your shop?{' '}
                <a
                  href={whatsappLink(business.whatsapp, 'Hello Sigma Shopfronts, I would like a quote for new work. Photos attached. Postcode: ')}
                  data-dial="whatsapp"
                  rel="noopener"
                >
                  Send them on WhatsApp
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="band band--sheet">
        <div className="frame">
          <h2>What happens after you get in touch</h2>
          <ol className="steps">
            <li>
              <strong>You send a photo or ring</strong>
              <span>A photo of the whole shop front and your postcode tell us most of what we need.</span>
            </li>
            <li>
              <strong>A person replies</strong>
              <span>
                Emergency repair calls get a reply within two hours and someone comes out the same day. For new work we
                arrange a free visit to look at the opening and measure up.
              </span>
            </li>
            <li>
              <strong>A free written quote, then the work</strong>
              <span>The price is in writing before anything starts. Nothing is fitted until you agree it.</span>
            </li>
          </ol>
        </div>
      </section>

      <section className="band">
        <div className="frame">
          <h2>What we fit and repair</h2>
          <div className="cards">
            {CARDS.map((c) => (
              <Link key={c.slug} href={`/shopfronts/${c.slug}`} className="card">
                <Image src={c.src} alt={c.alt} width={c.w} height={c.h} quality={60} sizes="(min-width: 60rem) 30vw, (min-width: 40rem) 46vw, 92vw" />
                <span className="card__body">
                  <span className={`card__tag card__tag--${c.tag.toLowerCase()}`}>
                    {c.tag === 'New' ? 'Fitted UK-wide' : `Within ${business.repairRadiusMiles} miles of ${business.repairCentre}`}
                  </span>
                  <span className="card__name">{name(c.slug)} →</span>
                </span>
              </Link>
            ))}
          </div>
          <p className="also">
            <span>We also do:</span>{' '}
            {others.map((s, i) => (
              <span key={s.slug}>
                <Link href={`/shopfronts/${s.slug}`}>{s.name}</Link>
                {i < others.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </p>
          <p style={{ marginTop: '1rem' }}>
            <Link href="/jobs" className="act act--line">
              See more of our work
            </Link>
          </p>
        </div>
      </section>

      <section className="band band--sheet">
        <div className="frame">
          <h2>Common questions</h2>
          <div className="answers">
            <div>
              <h3>Do you cover my area?</h3>
              <p>
                New installations: anywhere in England, Scotland, Wales and Northern Ireland. Repairs: any town within{' '}
                {business.repairRadiusMiles} road miles of {business.repairCentre}, as far as{' '}
                <Link href="/repair-radius/sheffield">Sheffield</Link>, <Link href="/repair-radius/rotherham">Rotherham</Link> and{' '}
                <Link href="/repair-radius/chesterfield">Chesterfield</Link>.
              </p>
              <Link href="/repair-radius">Towns we cover for repairs →</Link>
            </div>
            <div>
              <h3>What will it cost?</h3>
              <p>It depends on the width, the glass and the shutter. The visit and the quote are free. Our prices page shows typical prices, so you know before you call.</p>
              <Link href="/costs">See typical prices →</Link>
            </div>
            <div>
              <h3>Do I need permission from the council?</h3>
              <p>
                Often yes for a new shopfront, sign or outside shutter. Usually not for a repair that keeps the same look. Our
                free check tells you in a minute, and asks for no details.
              </p>
              <Link href="/frontage-check">Do I need permission? Free check →</Link>
            </div>
            <div>
              <h3>Who are you?</h3>
              <p>
                {business.legalName}, based in Oldbury. Our fitters carry CSCS cards; ask for our insurance certificate
                with your quote.
              </p>
              <a href={business.companiesHouseUrl} rel="noopener">
                Our Companies House record →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
