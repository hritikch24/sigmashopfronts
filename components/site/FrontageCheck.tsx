'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { authorities, type Nation } from '@/data/authorities';
import { checkFrontage, type FrontageResult, type Status, type Want } from '@/lib/frontage';
import EnquiryForm from './EnquiryForm';
import { measure } from '@/lib/measure';

const STATUS: { v: Status; label: string; hint: string }[] = [
  { v: 'listed', label: 'Listed building', hint: 'On the national list, any grade' },
  { v: 'conservation', label: 'In a conservation area', hint: 'But not itself listed' },
  { v: 'neither', label: 'Neither', hint: 'You have checked both' },
  { v: 'unsure', label: 'Not sure', hint: 'We will tell you how to check' },
];

const WANTS: { v: Want; label: string }[] = [
  { v: 'fascia', label: 'Fascia and signage' },
  { v: 'shutter', label: 'Roller shutter or grille' },
  { v: 'glazing', label: 'New glazing or a new shopfront' },
  { v: 'illuminated', label: 'Illuminated sign' },
  { v: 'awning', label: 'Awning or canopy' },
];

const VERDICT: Record<string, { label: string; cls: string }> = {
  likely: { label: 'Likely needed', cls: 'verdict--caution' },
  possible: { label: 'Possibly needed', cls: 'verdict--unknown' },
  check: { label: 'Check first', cls: 'verdict--unknown' },
};

const NATIONS: { v: Nation; label: string }[] = [
  { v: 'england', label: 'England' },
  { v: 'scotland', label: 'Scotland' },
  { v: 'wales', label: 'Wales' },
  { v: 'northern-ireland', label: 'Northern Ireland' },
];

export default function FrontageCheck() {
  const [postcode, setPostcode] = useState('');
  const [council, setCouncil] = useState<string>('');
  // Read ?council= after hydration rather than with useSearchParams, so the
  // form is server-rendered in full and nothing shifts when it hydrates.
  useEffect(() => {
    const preset = new URLSearchParams(window.location.search).get('council');
    if (preset && authorities.some((a) => a.slug === preset)) setCouncil(preset);
  }, []);
  const [other, setOther] = useState<{ name: string; nation: Nation } | null>(null);
  const [lookup, setLookup] = useState<'idle' | 'busy' | 'error'>('idle');
  const [lookupMsg, setLookupMsg] = useState('');
  const [status, setStatus] = useState<Status | ''>('');
  const [wants, setWants] = useState<Want[]>([]);
  const [result, setResult] = useState<FrontageResult | null>(null);
  const [formError, setFormError] = useState('');

  const sorted = useMemo(() => [...authorities].sort((a, b) => a.place.localeCompare(b.place)), []);

  async function findCouncil() {
    setLookup('busy');
    setLookupMsg('');
    try {
      const r = await fetch(`/api/frontage?postcode=${encodeURIComponent(postcode)}`);
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || 'Lookup failed.');
      if (j.authority) {
        setCouncil(j.authority);
        setOther(null);
        setLookupMsg(`${j.district}: we hold this council’s shopfront guidance.`);
      } else {
        setCouncil('__other');
        setOther({ name: j.district, nation: j.nation });
        setLookupMsg(`${j.district}: we do not hold this council’s shopfront guidance. The answer will use the national rules only.`);
      }
      setLookup('idle');
    } catch (err) {
      setLookup('error');
      setLookupMsg(err instanceof Error ? err.message : 'Lookup failed.');
    }
  }

  function toggle(w: Want) {
    setWants((cur) => (cur.includes(w) ? cur.filter((x) => x !== w) : [...cur, w]));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!council) return setFormError('Choose a council, or find it from your postcode.');
    if (!status) return setFormError('Tell us whether the building is listed or in a conservation area.');
    if (!wants.length) return setFormError('Pick at least one thing you want to do.');
    setFormError('');
    const known = council !== '__other';
    const res = checkFrontage({
      authority: known ? council : null,
      councilName: known ? undefined : other?.name || 'your council',
      nation: known ? authorities.find((a) => a.slug === council)!.nation : other?.nation ?? 'england',
      status,
      wants,
    });
    setResult(res);
    measure('frontage_check', { council: res.known ? res.councilLabel : 'not held' });
    requestAnimationFrame(() => document.getElementById('answer')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }

  const summary = result
    ? [
        `Council: ${result.councilLabel}`,
        `Building: ${STATUS.find((s) => s.v === status)?.label}`,
        `Wants: ${wants.map((w) => WANTS.find((x) => x.v === w)?.label).join(', ')}`,
      ].join('\n')
    : '';

  return (
    <>
      <form onSubmit={submit} className="panel" style={{ display: 'grid', gap: '1.6rem' }} aria-describedby="fc-note">
        <fieldset style={{ border: 0, padding: 0, margin: 0, display: 'grid', gap: '0.75rem' }}>
          <legend className="field-label">1 · Where is the shop?</legend>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'end' }}>
            <div className="field" style={{ flex: '1 1 12rem' }}>
              <label htmlFor="fc-pc">Postcode</label>
              <input id="fc-pc" type="text" autoComplete="postal-code" value={postcode} onChange={(e) => setPostcode(e.target.value)} placeholder="e.g. B1 1AA" />
            </div>
            <button type="button" className="act act--line" onClick={findCouncil} disabled={lookup === 'busy' || postcode.trim().length < 5}>
              {lookup === 'busy' ? 'Finding…' : 'Find my council'}
            </button>
          </div>
          {lookupMsg && (
            <p className={lookup === 'error' ? 'note note--warn' : 'note'} role="status" style={{ fontSize: '0.95rem' }}>
              {lookupMsg}
            </p>
          )}
          <div className="field">
            <label htmlFor="fc-council">…or choose the council</label>
            <select
              id="fc-council"
              value={council}
              onChange={(e) => {
                setCouncil(e.target.value);
                if (e.target.value !== '__other') setOther(null);
                else setOther({ name: 'your council', nation: 'england' });
              }}
            >
              <option value="">Choose…</option>
              {sorted.map((a) => (
                <option key={a.slug} value={a.slug}>
                  {a.place} — {a.council}
                </option>
              ))}
              <option value="__other">Another council (we hold no data)</option>
            </select>
          </div>
          {council === '__other' && (
            <div className="field">
              <label htmlFor="fc-nation">Which nation is the shop in?</label>
              <select id="fc-nation" value={other?.nation ?? 'england'} onChange={(e) => setOther({ name: other?.name ?? 'your council', nation: e.target.value as Nation })}>
                {NATIONS.map((n) => (
                  <option key={n.v} value={n.v}>
                    {n.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </fieldset>

        <fieldset style={{ border: 0, padding: 0, margin: 0, display: 'grid', gap: '0.75rem' }}>
          <legend className="field-label">2 · Is the building listed or in a conservation area?</legend>
          <div className="choices choices--two">
            {STATUS.map((s) => (
              <label key={s.v} className="choice">
                <input type="radio" name="status" value={s.v} checked={status === s.v} onChange={() => setStatus(s.v)} />
                <span>
                  <strong>{s.label}</strong>
                  <br />
                  <span className="field-hint">{s.hint}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset style={{ border: 0, padding: 0, margin: 0, display: 'grid', gap: '0.75rem' }}>
          <legend className="field-label">3 · What do you want to do? Tick all that apply.</legend>
          <div className="choices choices--two">
            {WANTS.map((w) => (
              <label key={w.v} className="choice">
                <input type="checkbox" checked={wants.includes(w.v)} onChange={() => toggle(w.v)} />
                <span>{w.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {formError && (
          <p className="note note--warn" role="alert">
            {formError}
          </p>
        )}
        <div>
          <button type="submit" className="act act--solid">
            Show my answer
          </button>
          <p id="fc-note" className="field-hint" style={{ marginTop: '0.6rem' }}>
            No contact details needed. The answer appears straight away, below.
          </p>
        </div>
      </form>

      {result && (
        <section id="answer" aria-live="polite" style={{ marginTop: '2.5rem', display: 'grid', gap: '2rem', scrollMarginTop: '1rem' }}>
          <div>
            <p className="sheet-label">
              <b>Your answer</b> · {result.councilLabel}
            </p>
            <p className="note note--caution" style={{ marginTop: '0.75rem' }}>
              {result.disclaimer}
            </p>
          </div>

          {result.lead && (
            <div className="note note--warn">
              <h2 style={{ fontSize: '1.3rem' }}>{result.lead.title}</h2>
              <p style={{ marginTop: '0.5rem' }}>{result.lead.text}</p>
              {result.lead.cited.length > 0 && (
                <ul className="rows" style={{ listStyle: 'none', padding: 0, marginTop: '0.9rem', borderTopColor: 'var(--color-refuse)' }}>
                  {result.lead.cited.map((c, i) => (
                    <li key={i}>
                      <p>{c.text}</p>
                      <span className="ref" style={{ whiteSpace: 'normal' }}>
                        <a href={c.url} rel="noopener">
                          {c.docTitle}
                        </a>
                        {c.ref ? `, ${c.ref}` : ''} · {c.docDate}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div>
            <h2>Part one — permission you are likely to need</h2>
            <ul className="rows rows--keyed" style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
              {result.consents.map((c) => (
                <li key={c.name}>
                  <div>
                    <strong>{c.name}</strong>
                    <div style={{ marginTop: '0.35rem' }}>
                      <span className={`verdict ${VERDICT[c.verdict].cls}`}>{VERDICT[c.verdict].label}</span>
                    </div>
                  </div>
                  <p>{c.why}</p>
                </li>
              ))}
            </ul>
            {!result.known && (
              <p className="note" style={{ marginTop: '1rem' }}>
                We hold no shopfront guidance for {result.councilLabel}, so nothing above is specific to them. We do not fill
                that gap with another council’s rules.
              </p>
            )}
          </div>

          {result.councilPoints.length > 0 && (
            <div>
              <h2>What {result.councilLabel} says</h2>
              <ul className="rows" style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
                {result.councilPoints.map((c, i) => (
                  <li key={i}>
                    <p>{c.text}</p>
                    <span className="ref" style={{ whiteSpace: 'normal' }}>
                      <a href={c.url} rel="noopener">
                        {c.docTitle}
                      </a>
                      {c.ref ? `, ${c.ref}` : ''} · {c.docDate}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h2>Part two — what would suit the building</h2>
            <p style={{ marginTop: '0.4rem', color: 'var(--color-ink-3)', fontSize: '0.95rem' }}>
              What we would fit, as installers. This is not council policy.
            </p>
            <div style={{ display: 'grid', gap: '1.25rem', marginTop: '1rem' }}>
              {result.spec.map((s) => (
                <div key={s.title} className="panel">
                  <h3>{s.title}</h3>
                  <ul className="copy" style={{ marginTop: '0.6rem' }}>
                    {s.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="split split--even">
            <div className="panel">
              <h3>Grants</h3>
              {result.grant.found ? (
                <>
                  <p style={{ marginTop: '0.5rem' }}>
                    <strong>{result.grant.name}</strong> — {result.grant.status === 'open' ? 'open' : 'closed'} when we checked on{' '}
                    {new Date(result.grant.checked).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}.
                  </p>
                  <p style={{ marginTop: '0.4rem' }}>{result.grant.detail}</p>
                  <p style={{ marginTop: '0.4rem' }}>
                    <a href={result.grant.url} rel="noopener">
                      The council’s scheme page
                    </a>
                  </p>
                </>
              ) : (
                <p style={{ marginTop: '0.5rem' }}>{result.grant.text}</p>
              )}
            </div>
            <div className="panel panel--ink">
              <h3>Next step</h3>
              <p style={{ marginTop: '0.5rem' }}>{result.nextStep}</p>
              {result.sources.length > 0 && (
                <ul className="copy" style={{ marginTop: '0.6rem' }}>
                  {result.sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} rel="noopener">
                        {s.title}
                      </a>{' '}
                      ({s.date})
                    </li>
                  ))}
                </ul>
              )}
              {result.known && (
                <p style={{ marginTop: '0.6rem' }}>
                  <Link href={`/planning/${council}`}>Read our full page on this council</Link>
                </p>
              )}
            </div>
          </div>

          <div className="panel">
            <h2 style={{ fontSize: '1.35rem' }}>Want our view on your shop?</h2>
            <p style={{ marginTop: '0.4rem' }} className="measure">
              Send us a photo and we will tell you what we would fit on that building. There is no obligation. Your answers above
              are sent with it, so you will not have to repeat yourself.
            </p>
            <div style={{ marginTop: '1.25rem' }}>
              <EnquiryForm
                source="frontage-check"
                service={wants.map((w) => WANTS.find((x) => x.v === w)?.label).join(', ')}
                location={postcode}
                summary={summary}
                photoPrompt="Stand across the street and get the whole shop front in, from the sign down to the pavement."
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
