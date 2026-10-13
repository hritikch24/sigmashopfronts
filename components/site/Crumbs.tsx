import Link from '@/components/site/Link';

export interface Crumb {
  name: string;
  path: string;
}

/** Visible trail. The matching BreadcrumbList comes from lib/seo.ts. */
export default function Crumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="sheet-label" style={{ marginBottom: '1rem' }}>
      <ol style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', listStyle: 'none', padding: 0, margin: 0 }}>
        <li>
          <Link href="/">Home</Link>
        </li>
        {trail.map((c, i) => (
          <li key={c.path} style={{ display: 'flex', gap: '0.4rem' }}>
            <span aria-hidden="true">/</span>
            {i === trail.length - 1 ? <span aria-current="page">{c.name}</span> : <Link href={c.path}>{c.name}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
