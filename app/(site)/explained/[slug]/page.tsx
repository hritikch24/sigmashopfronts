import Link from '@/components/site/Link';
import { notFound } from 'next/navigation';
import PageHead from '@/components/site/PageHead';
import JsonLd from '@/components/site/JsonLd';
import { article, breadcrumbs, pageMeta } from '@/lib/seo';
import { explainerBySlug, explainers, type Block } from '@/data/explainers';

export const dynamicParams = false;

export function generateStaticParams() {
  return explainers.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = explainerBySlug.get(slug);
  return e ? pageMeta({ path: `/explained/${e.slug}`, title: e.title, description: e.summary }) : {};
}

function Render({ b }: { b: Block }) {
  switch (b.t) {
    case 'h2':
      return <h2>{b.text}</h2>;
    case 'p':
      return <p>{b.text}</p>;
    case 'ul':
      return (
        <ul>
          {b.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol>
          {b.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ol>
      );
    case 'note':
      return <p className="note">{b.text}</p>;
    case 'src':
      return (
        <div>
          <p className="sheet-label">Sources</p>
          <ul>
            {b.items.map((s) => (
              <li key={s.url}>
                <a href={s.url} rel="noopener">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      );
  }
}

export default async function ExplainerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = explainerBySlug.get(slug);
  if (!e) notFound();
  const path = `/explained/${e.slug}`;
  const trail = [
    { name: 'Explained', path: '/explained' },
    { name: e.title, path },
  ];
  return (
    <>
      <JsonLd data={[breadcrumbs(path, trail), article(path, e.title, e.summary, e.updated)]} />
      <PageHead trail={trail} label={<>Updated {new Date(e.updated).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</>} title={e.title} lede={e.summary} />
      <section className="band band--sheet">
        <div className="frame split">
          <article className="copy measure">
            {e.body.map((b, i) => (
              <Render key={i} b={b} />
            ))}
          </article>
          <aside style={{ display: 'grid', gap: '1.25rem', alignContent: 'start' }}>
            <div className="panel">
              <h3>Your building, your council</h3>
              <p style={{ marginTop: '0.5rem', fontSize: '0.97rem' }}>
                The frontage check applies these rules to your address and what you want to fit.
              </p>
              <Link href="/frontage-check" className="act act--solid" style={{ marginTop: '0.9rem' }}>
                Run the frontage check
              </Link>
            </div>
            <div className="panel">
              <h3>Related</h3>
              <ul className="copy" style={{ marginTop: '0.6rem' }}>
                {e.related.map((r) => {
                  const o = explainerBySlug.get(r)!;
                  return (
                    <li key={r}>
                      <Link href={`/explained/${r}`}>{o.title}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
