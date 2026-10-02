import { Metadata } from 'next';
import Link from 'next/link';
import { towns } from '@/data/towns';
import Breadcrumbs from '@/components/Breadcrumbs';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Towns We Cover for Shutter Repairs — 100 Miles of Birmingham',
  description:
    'Every town inside our repair radius, with the planning authority, retail areas and distance from Birmingham. Emergency reply within two hours across all of them.',
  alternates: { canonical: `${SITE_URL}/towns` },
};

export default function TownsIndexPage() {
  const byCounty = towns.reduce<Record<string, typeof towns>>((acc, t) => {
    (acc[t.county] ??= []).push(t);
    return acc;
  }, {});
  const counties = Object.keys(byCounty).sort();

  return (
    <>
      <section className="section-padding bg-gradient-dark">
        <div className="container-max">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Towns' }]} />
          <h1 className="font-heading text-white font-bold text-3xl sm:text-4xl lg:text-5xl mt-7 mb-5">
            Towns inside our repair radius
          </h1>
          <p className="text-charcoal max-w-3xl" style={{ fontSize: '1.05rem', lineHeight: 1.75 }}>
            Our installation work is UK-wide. Repairs are different — they only mean anything if
            we can actually get to you. These {towns.length} towns sit within 100 road miles of
            Birmingham, and we reply to emergency calls across all of them within two hours.
            Each page carries the local planning authority, the retail areas we work in, and what
            is genuinely different about working there.
          </p>
        </div>
      </section>

      {counties.map((county) => (
        <section key={county} className="section-padding" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
          <div className="container-max">
            <h2 className="font-heading text-white font-bold text-xl mb-5">{county}</h2>
            <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
              {byCounty[county].sort((a, b) => a.miles - b.miles).map((t) => (
                <Link key={t.slug} href={`/towns/${t.slug}`} className="card-surface" style={{ padding: '1.1rem 1.25rem', textDecoration: 'none', display: 'block' }}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-white font-heading font-semibold" style={{ fontSize: '1rem' }}>{t.name}</span>
                    <span className="text-cyan font-mono" style={{ fontSize: '0.72rem' }}>{t.miles} mi</span>
                  </div>
                  <p className="text-grey-600 mt-2 mb-0" style={{ fontSize: '0.82rem', lineHeight: 1.5 }}>{t.council}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
