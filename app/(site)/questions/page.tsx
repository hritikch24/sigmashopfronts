import Link from 'next/link';
import PageHead from '@/components/site/PageHead';
import JsonLd from '@/components/site/JsonLd';
import { breadcrumbs, pageMeta, questions } from '@/lib/seo';
import { questionGroups } from '@/data/questions';

export const metadata = pageMeta({
  path: '/questions',
  title: 'Questions about shopfront consent, shutters, enforcement and grants',
  description: 'Straight answers on planning permission, advertisement consent, listed buildings, conservation areas, shutter refusals, enforcement notices and shopfront grants.',
});

export default function Questions() {
  const all = questionGroups.flatMap((g) => g.items);
  return (
    <>
      <JsonLd data={[breadcrumbs('/questions', [{ name: 'Questions', path: '/questions' }]), questions('/questions', all)]} />
      <PageHead
        trail={[{ name: 'Questions', path: '/questions' }]}
        title="Questions people ask before a shopfront job"
        lede="Mostly about council permission, because that is where shopfront jobs most often go wrong. These are general answers. Your council has the final word."
      />
      <section className="band band--sheet">
        <div className="frame measure">
          {questionGroups.map((g) => (
            <div key={g.title} style={{ marginBottom: '2.5rem' }}>
              <h2>{g.title}</h2>
              <div className="qa" style={{ marginTop: '1rem' }}>
                {g.items.map((q) => (
                  <details key={q.q}>
                    <summary>{q.q}</summary>
                    <div>
                      <p>{q.a}</p>
                      {q.more && (
                        <p style={{ marginTop: '0.5rem' }}>
                          <Link href={q.more.href}>{q.more.label} →</Link>
                        </p>
                      )}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
