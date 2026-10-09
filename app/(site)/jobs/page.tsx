import Image from 'next/image';
import PageHead from '@/components/site/PageHead';
import JsonLd from '@/components/site/JsonLd';
import { breadcrumbs, pageMeta } from '@/lib/seo';
import { jobs, videos } from '@/data/jobs';

export const metadata = pageMeta({
  path: '/jobs',
  title: 'Our work',
  description: 'Photographs and video of shopfronts, entrance doors, automatic doors and glazed screens we have fitted. Captions describe what is in the picture and nothing more.',
});

export default function Jobs() {
  return (
    <>
      <JsonLd data={breadcrumbs('/jobs', [{ name: 'Our work', path: '/jobs' }])} />
      <PageHead
        trail={[{ name: 'Our work', path: '/jobs' }]}
        label={<><b>Sheet 07</b> · Our work</>}
        title="Work we have fitted"
        lede="Our own photographs, captioned with what you can see. We name the town, the business and what we fitted only once a client has agreed to it — so for now the pictures speak for themselves."
      />
      <section className="band band--sheet">
        <div className="frame">
          <div className="plates">
            {jobs.map((j, i) => (
              <figure key={j.src} className="plate">
                <Image src={j.src} alt={j.what} width={j.w} height={j.h} priority={i < 2} quality={65} sizes="(min-width: 60rem) 33vw, (min-width: 40rem) 50vw, 100vw" style={{ aspectRatio: '4 / 3', objectFit: 'cover' }} />
                <figcaption>{j.what}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section className="band">
        <div className="frame">
          <h2>Automatic doors in use</h2>
          <div className="plates" style={{ marginTop: '1.2rem', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 15rem), 1fr))' }}>
            {videos.map((v) => (
              <figure key={v.src} className="plate" style={{ maxWidth: 360 }}>
                <video controls preload="none" playsInline poster={v.poster} style={{ aspectRatio: '9 / 16', objectFit: 'cover' }}>
                  <source src={v.src} type="video/mp4" />
                </video>
                <figcaption>{v.what}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
