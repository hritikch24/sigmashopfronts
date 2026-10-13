'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

/**
 * Google Analytics with Consent Mode. Everything starts "denied": Google gets
 * cookieless counts only, which is enough to tell which adverts bring calls.
 * The bar asks once; "Yes" lets Google set its cookies, "No" keeps them off.
 * Rendered only when a GA4 ID is configured, so without one there is no tag
 * and no bar.
 */
const KEY = 'sigma.consent';

type Choice = 'yes' | 'no';

function readChoice(): Choice | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'yes' || v === 'no' ? v : null;
  } catch {
    return null;
  }
}

function grant(on: boolean) {
  const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
  const v = on ? 'granted' : 'denied';
  gtag?.('consent', 'update', { ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v });
}

export default function AdMeasure({ ga4, ads }: { ga4?: string; ads?: string }) {
  const [ask, setAsk] = useState(false);

  // A saved answer is applied by the tag's own start-up script below.
  useEffect(() => setAsk(readChoice() === null), []);

  function choose(c: Choice) {
    try {
      localStorage.setItem(KEY, c);
    } catch {}
    grant(c === 'yes');
    setAsk(false);
  }

  if (!ga4) return null;
  const ids = [ga4, ads].filter(Boolean) as string[];

  return (
    <>
      <Script id="gtag-consent" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
var c;try{c=localStorage.getItem('${KEY}')}catch(e){}var v=c==='yes'?'granted':'denied';
gtag('consent','default',{ad_storage:v,ad_user_data:v,ad_personalization:v,analytics_storage:v,wait_for_update:500});
gtag('set','ads_data_redaction',true);gtag('set','url_passthrough',true);
gtag('js',new Date());${ids.map((id) => `gtag('config','${id}');`).join('')}`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`} strategy="afterInteractive" />
      {ask && (
        <div className="consent no-print" role="region" aria-label="Cookies">
          <p>Can Google use cookies to show us which adverts brought you here? It does not change what you see.</p>
          <div className="consent__actions">
            <button type="button" onClick={() => choose('yes')}>Yes</button>
            <button type="button" onClick={() => choose('no')} className="consent__no">No</button>
            <a href="/privacy#adverts">More</a>
          </div>
        </div>
      )}
    </>
  );
}
