import './site.css';
import Link from 'next/link';
import Masthead from '@/components/site/Masthead';
import Colophon from '@/components/site/Colophon';

export const metadata = { title: 'Page not found', robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <div className="public" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Masthead />
      <main id="content" style={{ flex: 1 }}>
        <section className="paper-grid">
          <div className="frame" style={{ paddingBlock: '4rem' }}>
            <p className="sheet-label">404</p>
            <h1 style={{ marginTop: '0.5rem' }}>There is no page here</h1>
            <p className="lede measure" style={{ marginTop: '1rem' }}>
              Try the <Link href="/frontage-check">frontage check</Link>, the <Link href="/planning">council pages</Link> or the{' '}
              <Link href="/">home page</Link>.
            </p>
          </div>
        </section>
      </main>
      <Colophon />
    </div>
  );
}
