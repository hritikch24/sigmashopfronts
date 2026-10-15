'use client';

import { useCallback, useState } from 'react';
import type { Draft, DocType } from '@/lib/document-parse';
import { useDictation } from './useDictation';

/**
 * "Say it or type it, check it, create it." What was said becomes a draft; the card
 * shows only the details that were given. Create saves it through the normal
 * documents API. "Edit all fields" hands the draft to the full form, where
 * every option is available.
 */

interface Props {
  tab: DocType;
  headers: () => Record<string, string>;
  onCreated: (doc: unknown, type: DocType) => void;
  onEditAll: (draft: Draft) => void;
}

const EXAMPLE =
  'Invoice for Hritik, email hritik@example.com, phone 07123 456789, job: replace shutter motor, price £450 plus VAT. ' +
  'Or: proforma for Royal Way, Loughborough LE11 5XR, supply and fit a double door, letter box and cladding, £6,630 plus VAT, 40% deposit';

const TYPE_LABEL: Record<DocType, string> = { quote: 'Quote', invoice: 'Invoice', proforma: 'Proforma' };
const billing = (t: DocType) => t === 'invoice' || t === 'proforma';

const gbp = (n: number) => '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const isoInDays = (days: number) => new Date(Date.now() + days * 86400000).toISOString().split('T')[0];
const DEFAULT_DESCRIPTION = 'Works as agreed';
const ENGINE_LABEL: Record<string, string> = { groq: 'Groq', grok: 'Grok', openai: 'ChatGPT', claude: 'Claude', rules: 'built-in rules' };

/** The body the existing POST /api/admin/documents expects. */
export function payloadFromDraft(d: Draft) {
  const meta = {
    projectReference: d.projectReference || undefined,
    ...(d.type === 'quote' ? { scope: d.scope || undefined, leadTime: d.leadTime || undefined } : {}),
  };
  return {
    type: d.type,
    customerId: null,
    customerName: d.customerName,
    customerEmail: d.customerEmail || null,
    customerPhone: d.customerPhone || null,
    customerAddress: d.customerAddress || null,
    lineItems: d.lineItems.map((li) => ({ ...li, description: li.description.trim() || DEFAULT_DESCRIPTION })),
    vatRate: d.vatRate,
    notes: d.notes || null,
    depositPercent: billing(d.type) && d.depositPercent ? d.depositPercent : null,
    issueDate: null,
    validUntil: d.type === 'quote' && d.validForDays ? isoInDays(d.validForDays) : null,
    dueDate: billing(d.type) && d.dueInDays ? isoInDays(d.dueInDays) : null,
    meta: Object.values(meta).some(Boolean) ? meta : null,
  };
}

export default function QuickBuild({ tab, headers, onCreated, onEditAll }: Props) {
  const [text, setText] = useState('');
  const [busy, setBusy] = useState<'reading' | 'creating' | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [missing, setMissing] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [engine, setEngine] = useState('');
  const addHeard = useCallback((heard: string) => setText((t) => (t.trim() ? t.trimEnd() + ' ' : '') + heard.trim()), []);
  const dictation = useDictation(headers, addHeard);
  const mmss = (n: number) => `${Math.floor(n / 60)}:${String(n % 60).padStart(2, '0')}`;

  async function read() {
    if (text.trim().length < 3 || busy) return;
    setBusy('reading');
    setError('');
    try {
      const res = await fetch('/api/admin/documents/parse', { method: 'POST', headers: headers(), body: JSON.stringify({ text, type: tab }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not read that.');
      setDraft(data.draft);
      setMissing(data.missing);
      setEngine(data.engine);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not read that.');
    }
    setBusy(null);
  }

  async function create() {
    if (!draft || missing.length || busy) return;
    setBusy('creating');
    setError('');
    try {
      const res = await fetch('/api/admin/documents', { method: 'POST', headers: headers(), body: JSON.stringify(payloadFromDraft(draft)) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed.');
      onCreated(data.document, draft.type);
      reset();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed.');
    }
    setBusy(null);
  }

  function reset() {
    setText('');
    setDraft(null);
    setMissing([]);
    setError('');
  }

  const subtotal = draft ? draft.lineItems.reduce((s, li) => s + li.qty * li.unitPrice, 0) : 0;
  const vat = draft ? subtotal * (draft.vatRate / 100) : 0;
  const label = draft ? TYPE_LABEL[draft.type] : 'Quote';

  // Only what was given. Name and price are always shown (they are required).
  const given: [string, string][] = draft
    ? ([
        ['Email', draft.customerEmail],
        ['Phone', draft.customerPhone],
        ['Address', draft.customerAddress],
        ['Reference', draft.projectReference],
        ['Deposit', billing(draft.type) && draft.depositPercent ? `${draft.depositPercent}%` : undefined],
        ['Payment due', billing(draft.type) && draft.dueInDays ? `in ${draft.dueInDays} days` : undefined],
        ['Valid for', draft.type === 'quote' && draft.validForDays ? `${draft.validForDays} days` : undefined],
        ['Scope', draft.type === 'quote' ? draft.scope : undefined],
        ['Lead time', draft.type === 'quote' ? draft.leadTime : undefined],
        ['Notes', draft.notes],
      ].filter(([, v]) => v) as [string, string][])
    : [];

  return (
    <section className="bg-white rounded-2xl border border-slate-200/60 p-5 space-y-4" aria-labelledby="quick-build-title">
      <div>
        <h2 id="quick-build-title" className="text-base font-heading font-bold text-slate-800">Quick create</h2>
        <p className="text-xs text-slate-400">
          Type it, or press Speak and say it as you would to a colleague: who it is for, the address, the work, the price, VAT and any deposit.
          Customer name and price are needed; anything else you mention is added, and nothing is guessed.
        </p>
      </div>

      {!draft && (
        <>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) read();
            }}
            rows={4}
            placeholder={EXAMPLE}
            aria-label="Describe the quote, invoice or proforma"
            className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 outline-none"
          />
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={read}
              disabled={busy !== null || text.trim().length < 3}
              className="px-4 py-2.5 bg-slate-800 text-white text-sm font-semibold rounded-lg hover:bg-slate-800/90 disabled:opacity-50"
            >
              {busy === 'reading' ? 'Reading…' : 'Build'}
            </button>
            {dictation.available && (
              <button
                type="button"
                onClick={dictation.state === 'recording' ? dictation.stop : dictation.start}
                disabled={dictation.state === 'transcribing' || busy !== null}
                aria-pressed={dictation.state === 'recording'}
                className={
                  'px-4 py-2.5 text-sm font-semibold rounded-lg border disabled:opacity-50 ' +
                  (dictation.state === 'recording' ? 'bg-red-600 border-red-600 text-white' : 'border-slate-200 text-slate-800 hover:bg-slate-50')
                }
              >
                {dictation.state === 'recording'
                  ? `■ Stop ${mmss(dictation.seconds)}`
                  : dictation.state === 'transcribing'
                    ? 'Writing it down…'
                    : '🎤 Speak'}
              </button>
            )}
            <span className="text-xs text-slate-400">
              {dictation.state === 'recording' ? `Up to ${mmss(dictation.maxSeconds)}. Press Stop when you have finished.` : 'Ctrl/⌘ + Enter'}
            </span>
          </div>
          {dictation.error && <p className="text-sm text-red-600" role="alert">{dictation.error}</p>}
        </>
      )}

      {draft && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400">Make this a</span>
            {(['quote', 'proforma', 'invoice'] as DocType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setDraft({ ...draft, type: t })}
                className={'px-3 py-1 text-xs font-semibold rounded-full ' + (draft.type === t ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-800')}
              >
                {TYPE_LABEL[t]}
              </button>
            ))}
          </div>

          {missing.length > 0 && (
            <div className="bg-amber-50 text-amber-800 px-4 py-3 rounded-lg text-sm" role="alert">
              Still needed: <strong>{missing.join(' and ')}</strong>. Add {missing.length > 1 ? 'them' : 'it'} to the sentence and build again, or use Edit all fields.
            </div>
          )}

          <dl className="grid grid-cols-[7rem_1fr] gap-x-4 gap-y-1.5 text-sm">
            <dt className="text-slate-400">Customer</dt>
            <dd className={draft.customerName ? 'font-semibold text-slate-800' : 'text-amber-700'}>{draft.customerName || 'Not found'}</dd>
            {given.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-slate-400">{k}</dt>
                <dd className="text-slate-700 break-words">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="border border-slate-200 rounded-lg divide-y divide-slate-100">
            {draft.lineItems.length === 0 && <p className="px-4 py-3 text-sm text-amber-700">No price found</p>}
            {draft.lineItems.map((li, i) => (
              <div key={i} className="flex items-start gap-3 px-4 py-2.5">
                <textarea
                  rows={Math.max(1, Math.min(6, li.description.split('\n').length))}
                  value={li.description}
                  onChange={(e) =>
                    setDraft({ ...draft, lineItems: draft.lineItems.map((x, j) => (j === i ? { ...x, description: e.target.value } : x)) })
                  }
                  placeholder={DEFAULT_DESCRIPTION}
                  aria-label={`Line ${i + 1} description`}
                  className="flex-1 min-w-0 px-2 py-1 border border-transparent hover:border-slate-200 focus:border-blue-500 rounded text-sm text-slate-800 outline-none resize-y"
                />
                <span className="text-xs text-slate-400 whitespace-nowrap">
                  {li.qty} × {gbp(li.unitPrice)}
                </span>
                <span className="text-sm font-semibold text-slate-800 whitespace-nowrap">{gbp(li.qty * li.unitPrice)}</span>
              </div>
            ))}
            {draft.lineItems.length > 0 && (
              <div className="px-4 py-2.5 text-sm flex justify-end gap-6 bg-slate-50">
                {draft.vatRate > 0 && <span className="text-slate-500">VAT {draft.vatRate}%: {gbp(vat)}</span>}
                <span className="font-bold text-slate-800">Total {gbp(subtotal + vat)}</span>
              </div>
            )}
          </div>

          {error && <p className="text-sm text-red-600" role="alert">{error}</p>}

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={create}
              disabled={missing.length > 0 || busy !== null}
              className="px-4 py-2.5 bg-slate-800 text-white text-sm font-semibold rounded-lg hover:bg-slate-800/90 disabled:opacity-50"
            >
              {busy === 'creating' ? 'Creating…' : `Create ${label}`}
            </button>
            <button
              type="button"
              onClick={() => onEditAll(draft)}
              className="px-4 py-2.5 border border-slate-200 text-slate-800 text-sm font-semibold rounded-lg hover:bg-slate-50"
            >
              Edit all fields
            </button>
            <button type="button" onClick={reset} className="px-4 py-2.5 text-slate-500 text-sm hover:text-slate-800">
              Start again
            </button>
          </div>
          <p className="text-[11px] text-slate-400">Read by {ENGINE_LABEL[engine] ?? engine}, checked against what you typed.</p>
        </div>
      )}

      {!draft && error && <p className="text-sm text-red-600" role="alert">{error}</p>}
    </section>
  );
}
