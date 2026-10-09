/** Renders one or more schema.org objects. Built by lib/seo.ts only. */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const list = Array.isArray(data) ? data : [data];
  return (
    <>
      {list.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Escape "<" so a value can never close the script tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, '\\u003c') }}
        />
      ))}
    </>
  );
}
