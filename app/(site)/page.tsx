import Image from 'next/image';
import Link from 'next/link';
import { business } from '@/lib/business';
import { pageMeta } from '@/lib/seo';
import { authorities, type HeritageExternalLine } from '@/data/authorities';
import { consentLabel, shopfronts } from '@/data/shopfronts';
import { jobs, type Job } from '@/data/jobs';
import { whatsappLink } from '@/lib/quick-line';
import QuickMessage from '@/components/site/QuickMessage';

export const metadata = pageMeta({
  path: '/',
  title: `${business.name} — shopfronts, roller shutters, doors and repairs`,
  description:
    'Aluminium shopfronts, roller shutters and commercial glazing fitted UK-wide, specified around what your council will accept. Repairs within 100 road miles of Birmingham; we reply to emergency calls within two hours.',
});

const KIND: Record<Job['kind'], string> = {
  shopfront: 'Shopfront',
  doors: 'Entrance doors',
  glazing: 'Glazing',
  screens: 'Glazed screens',
  shutters: 'Roller shutters',
};

const LINE: Record<HeritageExternalLine, { label: string; cls: string }> = {
  'not-acceptable': { label: 'Not acceptable', cls: 'verdict--refuse' },
  'normally-refused': { label: 'Normally refused', cls: 'verdict--caution' },
  'exception-only': { label: 'Named exceptions only', cls: 'verdict--caution' },
};

export default function Home() {
  const featured = ['aluminium', 'roller-shutters', 'glass-replacement', 'automatic-doors', 'shutter-repairs', 'emergency-repairs'];
  return (
    <>
      <section className="paper-grid">
        <div className="frame split" style={{ paddingBlock: 'clamp(2.25rem, 1.5rem + 4vw, 5rem)', alignItems: 'center' }}>
          <div>
            <p className="sheet-label">
              <b>Sheet 00</b> · Shopfronts, shutters, glazing
            </p>
            <h1 style={{ marginTop: '0.6rem', maxWidth: '20ch' }}>Shopfronts, roller shutters and doors, fitted and repaired</h1>
            <p className="lede measure" style={{ marginTop: '1.1rem' }}>
              New aluminium shopfronts, shutters, security doors and glass fitted anywhere in the UK. Broken shutter or smashed
              glass within {business.repairRadiusMiles} road miles of Birmingham? Call or WhatsApp and a person answers.
            </p>
            <div className="acts" style={{ marginTop: '1.6rem' }}>
              <a href={`tel:${business.phones.main.tel}`} className="act act--solid" data-dial="main">
                Call {business.phones.main.display}
              </a>
              <a href={whatsappLink(business.whatsapp)} className="act act--wa" data-dial="whatsapp" rel="noopener">
                WhatsApp a photo
              </a>
            </div>
            <p style={{ marginTop: '1rem', fontSize: '0.95rem', color: 'var(--color-ink-3)' }}>{business.emergencyPromise}</p>
            <div style={{ marginTop: '1.4rem', maxWidth: '36rem' }}>
              <QuickMessage source="home-hero" />
            </div>
          </div>
          <figure className="plate" style={{ maxWidth: 520, justifySelf: 'end', width: '100%' }}>
            <Image
              src="/assets/sigma-retail-front.jpeg"
              alt="A dark grey aluminium restaurant front we fitted, with a glazed door, fixed display glazing and a painted fascia"
              width={1600}
              height={1200}
              priority
              quality={60}
              sizes="(min-width: 60rem) 520px, 92vw"
            />
            <figcaption>Dark grey aluminium front, single door, painted fascia — one of our installations.</figcaption>
          </figure>
        </div>
      </section>

      <section className="band">
        <div className="frame">
          <p className="sheet-label">What we fit</p>
          <h2 style={{ marginTop: '0.4rem' }}>Shopfronts, shutters, doors and glass</h2>
          <div className="sheets" style={{ marginTop: '1.4rem' }}>
            {featured.map((slug) => {
              const s = shopfronts.find((x) => x.slug === slug)!;
              return (
                <Link key={slug} href={`/shopfronts/${slug}`}>
                  <span className="sheet-title">{s.name}</span>
                  <span className="sheet-meta">
                    {s.area === 'uk' ? 'Fitted UK-wide' : 'Repairs near Birmingham'} ·{' '}
                    {s.consents
                      .filter((c) => c.likelihood === 'usually' && c.consent !== 'none-usually')
                      .map((c) => consentLabel[c.consent].toLowerCase())
                      .join(', ') || 'consent depends on the building'}
                  </span>
                </Link>
              );
            })}
          </div>
          <p style={{ marginTop: '1rem' }}>
            <Link href="/shopfronts">Everything we make and fit →</Link>
          </p>
        </div>
      </section>

      <section className="band band--sheet">
        <div className="frame split">
          <div>
            <p className="sheet-label">Repairs</p>
            <h2 style={{ marginTop: '0.4rem' }}>Within {business.repairRadiusMiles} road miles of Birmingham</h2>
            <p className="measure" style={{ marginTop: '0.9rem' }}>
              Stuck shutters, dropped doors, smashed glass. We are based in Oldbury, and we take repair work only where we can
              actually get to you — every town within {business.repairRadiusMiles} road miles of Birmingham, not just the
              cities. Call or message and a person replies within two hours; we then tell you honestly when we can be there.
              Installation work goes anywhere in the UK.
            </p>
            <div className="acts" style={{ marginTop: '1.2rem' }}>
              <Link href="/repair-radius" className="act act--line">
                Towns we cover for repairs
              </Link>
            </div>
          </div>
          <div className="panel panel--ink">
            <h3>What you can check before you hire us</h3>
            <ul className="copy" style={{ marginTop: '0.8rem' }}>
              {business.trustBasis.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p style={{ marginTop: '0.9rem', fontSize: '0.92rem' }}>
              <a href={business.companiesHouseUrl} rel="noopener">
                See our Companies House record
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="frame">
          <p className="sheet-label">Our work</p>
          <h2 style={{ marginTop: '0.4rem' }}>Shopfronts, doors and shutters we have fitted</h2>
          <div className="plates" style={{ marginTop: '1.4rem' }}>
            {jobs.filter((j) => j.home).map((j) => (
              <figure key={j.src} className="plate">
                <Image src={j.src} alt={j.what} width={j.w} height={j.h} quality={65} sizes="(min-width: 60rem) 33vw, (min-width: 40rem) 50vw, 100vw" style={{ aspectRatio: '4 / 3', objectFit: 'cover' }} />
                <figcaption>{KIND[j.kind]}</figcaption>
              </figure>
            ))}
          </div>
          <p style={{ marginTop: '1rem' }}>
            <Link href="/jobs">More of our work →</Link>
          </p>
        </div>
      </section>
      <section className="band band--sheet">
        <div className="frame">
          <div className="split split--even" style={{ alignItems: 'start' }}>
            <div>
              <p className="sheet-label">Planning help, if you need it</p>
              <h2 style={{ marginTop: '0.4rem' }}>Not sure if a new shopfront needs council permission?</h2>
              <p style={{ marginTop: '0.9rem' }} className="measure">
                Give the frontage check your postcode, whether the building is listed or in a conservation area, and what you
                want to fit. It tells you which consents you are likely to need, what that council’s own guidance says, and
                the specification we would put in front of their planning officer. The answer comes first. If you then want
                our view on your actual building, you can send a photo.
              </p>
              <div className="acts" style={{ marginTop: '1.2rem' }}>
                <Link href="/frontage-check" className="act act--solid">
                  Start the frontage check
                </Link>
                <Link href="/planning" className="act act--line">
                  Browse councils
                </Link>
              </div>
            </div>
            <div>
              <p className="sheet-label">External shutters on a conservation-area or listed frontage — in the council’s own words</p>
              <ul className="rows" style={{ listStyle: 'none', padding: 0, marginTop: '0.75rem' }}>
                {authorities.slice(0, 9).map((a) => (
                  <li key={a.slug} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center' }}>
                    <Link href={`/planning/${a.slug}`}>{a.place}</Link>
                    <span className={`verdict ${LINE[a.heritageExternal].cls}`}>{LINE[a.heritageExternal].label}</span>
                  </li>
                ))}
              </ul>
              <p style={{ marginTop: '0.75rem', fontSize: '0.92rem' }}>
                <Link href="/planning">All {authorities.length} councils, with sources →</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
