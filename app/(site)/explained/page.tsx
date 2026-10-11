import Link from 'next/link';
import PageHead from '@/components/site/PageHead';
import JsonLd from '@/components/site/JsonLd';
import { breadcrumbs, pageMeta } from '@/lib/seo';
import { explainers } from '@/data/explainers';

export const metadata = pageMeta({
  path: '/explained',
  title: 'Shopfront consent, explained',
  description: 'Plain-English guides to advertisement consent, Article 4 directions, listed building consent, enforcement notices, heritage grants and why solid shutters get refused.',
});

export default function ExplainedIndex() {
  return (
    <>
      <JsonLd data={breadcrumbs('/explained', [{ name: 'Explained', path: '/explained' }])} />
      <PageHead
        trail={[{ name: 'Explained', path: '/explained' }]}
        title="The consent side of a shopfront job"
        lede="Six guides to the parts of a shopfront project that cause the delays, the refusals and the enforcement letters. Written by installers who deal with them, and clear about where you need a planning professional instead."
      />
      <section className="band band--sheet">
        <div className="frame">
          <div className="sheets">
            {explainers.map((e) => (
              <Link key={e.slug} href={`/explained/${e.slug}`}>
                <span className="sheet-title">{e.title}</span>
                <span className="sheet-meta">{e.summary}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
