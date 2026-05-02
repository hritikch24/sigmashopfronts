import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href
        ? { item: `https://www.sigmashopfronts.com${item.href}` }
        : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="py-3">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-grey-500">
          {items.map((item, index) => (
            <li key={index} className={index > 0 ? 'flex items-center gap-1.5' : undefined}>
              {index > 0 && (
                <span aria-hidden="true" className="text-grey-300 select-none">&rsaquo;</span>
              )}
              {item.href ? (
                <Link href={item.href} className="hover:text-gold transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-navy font-medium" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
