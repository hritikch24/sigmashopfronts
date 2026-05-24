import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Shopfront Installation Guides & Articles',
  description:
    'Expert guides on shopfront maintenance, planning permission, fire doors, security ratings, and emergency boarding from Sigma Shop Fronts.',
  alternates: {
    canonical: 'https://www.sigmashopfronts.com/blog',
  },
  openGraph: {
    title: 'Shopfront Installation Guides & Articles | Sigma Shop Fronts',
    description:
      'Expert guides on shopfront maintenance, planning permission, fire doors, security ratings, and emergency boarding from Sigma Shop Fronts.',
    url: 'https://www.sigmashopfronts.com/blog',
  },
};

const posts = [
  {
    slug: 'how-to-maintain-commercial-roller-shutters',
    title: 'How to Maintain Commercial Roller Shutters: A Complete Guide',
    description:
      'Learn the essential inspection schedules, lubrication routines, and cleaning methods that keep commercial roller shutters operating reliably for years.',
  },
  {
    slug: 'aluminium-shopfront-planning-permission-uk',
    title: 'Do You Need Planning Permission for an Aluminium Shopfront?',
    description:
      'Understand when permitted development rights apply, what changes in conservation areas, and how to navigate the UK planning application process.',
  },
  {
    slug: 'fd30-vs-fd60-fire-door-commercial-premises',
    title: 'FD30 vs FD60 Fire Doors: Which Does Your Business Need?',
    description:
      'A clear comparison of FD30 and FD60 fire resistance ratings, Building Regulations requirements, and how to choose the right door for your premises.',
  },
  {
    slug: 'what-is-lps-1175-security-rating',
    title: 'What Is the LPS 1175 Security Rating? A Business Owner\'s Guide',
    description:
      'Demystifying the LPS 1175 standard — what the security rating levels mean, how they affect insurance, and which level your business should target.',
  },
  {
    slug: 'emergency-shopfront-boarding-what-to-do',
    title: 'Emergency Shopfront Boarding: What to Do When Your Shop Is Broken Into',
    description:
      'Step-by-step advice on securing your premises after a break-in, dealing with insurers, and arranging permanent repairs quickly.',
  },
  {
    slug: 'shopfront-installation-cost-uk-2025',
    title: 'Shopfront Installation Costs in the UK (2025): What to Expect',
    description:
      'A detailed breakdown of shopfront installation costs across the UK in 2025, covering aluminium shopfronts, roller shutters, security doors, and what factors affect pricing.',
  },
  {
    slug: 'best-shopfront-company-uk-how-to-choose',
    title: 'How to Choose the Best Shopfront Company in the UK',
    description:
      'A practical checklist for finding a reliable, professional shopfront installation company in the UK. What to look for, red flags to avoid, and questions to ask before signing.',
  },
];

export default function BlogIndex() {
  return (
    <>
      <section className="section-padding bg-white">
        <div className="container-max">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog' },
            ]}
          />

          <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy mt-4 mb-4">
            Shopfront Installation Guides &amp; Articles
          </h1>
          <p className="text-grey-600 max-w-2xl mb-10">
            Practical advice from our installation team — covering maintenance,
            regulations, security standards, and what to do in an emergency.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card-surface rounded-2xl p-6 flex flex-col hover:shadow-md transition-shadow"
              >
                <h2 className="font-heading text-lg font-semibold text-navy mb-2">
                  {post.title}
                </h2>
                <p className="text-charcoal text-sm leading-relaxed flex-1">
                  {post.description}
                </p>
                <span className="mt-4 text-sm font-medium text-gold">
                  Read article &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
