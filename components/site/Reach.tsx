'use client';

import { useEffect } from 'react';
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
  // "Message" links land on the box with the cursor in it, so the keyboard is
  // already up on a phone. /enquire has its own #reach box, which this finds too.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element) || !e.target.closest('a[href="#reach"]')) return;
      const box = document.querySelector<HTMLTextAreaElement>('#reach textarea');
      if (!box) return;
      e.preventDefault();
      box.scrollIntoView({ behavior: 'smooth', block: 'center' });
      box.focus({ preventScroll: true });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  if (path === '/enquire') return null;
  return (
    <section id="reach" className="reach no-print" aria-labelledby="reach-title">
      <div className="frame reach__grid">
        <div>
          <h2 id="reach-title">Talk to a person at Sigma</h2>
          <p>
            Call, WhatsApp a photo, or write one line below. {business.emergencyPromise} {business.freeQuote}.
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
