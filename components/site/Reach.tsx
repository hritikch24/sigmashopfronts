'use client';

import { usePathname } from 'next/navigation';
import { business } from '@/lib/business';
import { whatsappLink } from '@/lib/quick-line';
import QuickMessage from './QuickMessage';

/**
 * The end of every public page: three ways to reach a person, none of which
 * sends the customer somewhere else first. Sits outside <main>, like the
 * masthead, so it is not counted as page content. /enquire has its own.
 */
export default function Reach() {
  const path = usePathname();
  if (path === '/enquire') return null;
  return (
    <section id="reach" className="reach no-print" aria-labelledby="reach-title">
      <div className="frame reach__grid">
        <div>
          <h2 id="reach-title">Talk to a person at Sigma</h2>
          <p>
            Ring, WhatsApp a photo, or leave one line below. {business.emergencyPromise}
          </p>
          <div className="acts" style={{ marginTop: '1rem' }}>
            <a href={`tel:${business.phones.main.tel}`} className="act act--solid" data-dial="main">
              Call {business.phones.main.display}
            </a>
            <a href={whatsappLink(business.whatsapp)} className="act act--wa" data-dial="whatsapp" rel="noopener">
              WhatsApp us
            </a>
          </div>
        </div>
        <div>
          <QuickMessage source={`reach:${path}`} tone="ink" />
          <p className="reach__more">
            Want to add a photo or more detail? <a href="/enquire">Use the full form</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
