import '../site.css';
import Masthead from '@/components/site/Masthead';
import Colophon from '@/components/site/Colophon';
import CallBar from '@/components/site/CallBar';
import Footfall from '@/components/site/Footfall';
import Reach from '@/components/site/Reach';
import JsonLd from '@/components/site/JsonLd';
import AdMeasure from '@/components/site/AdMeasure';
import { organisation, website } from '@/lib/seo';
import { tracking } from '@/lib/business';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="public" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <JsonLd data={[organisation(), website()]} />
      <Masthead />
      <main id="content" style={{ flex: 1 }}>
        {children}
      </main>
      <Reach />
      <Colophon />
      <CallBar />
      <Footfall />
      <AdMeasure ga4={tracking.ga4} ads={tracking.googleAds} />
    </div>
  );
}
