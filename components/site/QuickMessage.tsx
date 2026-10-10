'use client';

import { useState } from 'react';
import { business } from '@/lib/business';
import { readLine, whatsappLink } from '@/lib/quick-line';

/**
 * The shortest way to reach us: one box. The customer types their number or
 * email, where the shop is and what is wrong, in any order; we show what we
 * picked up before they send, so nobody is left wondering whether it worked.
 */
export default function QuickMessage({ source, tone = 'paper' }: { source: string; tone?: 'paper' | 'ink' }) {
  const [line, setLine] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');
  const found = readLine(line);
  const reachable = Boolean(found.phone || found.email);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!reachable) {
      setError('Add a phone number or an email address so we can reply.');
      setState('error');
      return;
    }
    setState('sending');
    setError('');
    const fd = new FormData(e.currentTarget);
    fd.set('quick', '1');
    try {
      fd.set('sessionId', sessionStorage.getItem('sigma.visit') ?? '');
    } catch {}
    try {
      const r = await fetch('/api/enquire', { method: 'POST', body: fd });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j.ok) throw new Error(j.error || 'Something went wrong.');
      setState('sent');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setState('error');
    }
  }

  if (state === 'sent') {
    return (
      <div className={`quick quick--${tone} quick--done`} role="status">
        <strong>Sent. A person at Sigma will reply to {found.phone || found.email}.</strong>
        <span>
          Need it faster? <a href={`tel:${business.phones.main.tel}`} data-dial="main">Call {business.phones.main.display}</a> or{' '}
          <a href={whatsappLink(business.whatsapp, `Hello Sigma Shopfronts, I have just sent this from your website: ${line}`)} data-dial="whatsapp" rel="noopener">
            send it on WhatsApp
          </a>
          .
        </span>
      </div>
    );
  }

  return (
    <form className={`quick quick--${tone}`} onSubmit={onSubmit} noValidate>
      <input type="hidden" name="source" value={source} />
      <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
        <label>
          Leave this empty <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label htmlFor={`quick-${source}`} className="quick__label">
        Write it in one line: your number or email, the postcode, and what you need
      </label>
      <div className="quick__row">
        <textarea
          id={`quick-${source}`}
          name="line"
          rows={2}
          maxLength={1500}
          value={line}
          onChange={(e) => {
            setLine(e.target.value);
            if (state === 'error') setState('idle');
          }}
          placeholder="07123 456789, B69 4RJ, shutter jammed half-open on our takeaway"
        />
        <button type="submit" className="act act--solid" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : 'Send'}
        </button>
      </div>
      {line.trim() && (
        <p className="quick__found" aria-live="polite">
          <span className={found.phone ? 'is-on' : ''}>{found.phone ? `Phone ${found.phone}` : 'No phone yet'}</span>
          <span className={found.email ? 'is-on' : ''}>{found.email ? `Email ${found.email}` : 'No email'}</span>
          <span className={found.postcode ? 'is-on' : ''}>{found.postcode ? `Postcode ${found.postcode}` : 'No postcode'}</span>
        </p>
      )}
      {state === 'error' && (
        <p className="note note--warn" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
