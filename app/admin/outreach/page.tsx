'use client';

import { useState, useEffect, useCallback } from 'react';

/* ── Types ────────────────────────────────────────────────────────────── */

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  service: string;
  message?: string | null;
  source?: string | null;
  status: string;
  createdAt: string;
  emailCount: number;
}

interface EmailMsg {
  id: string;
  leadId: string;
  direction: string;
  subject: string;
  body: string;
  toEmail: string;
  status: string;
  createdAt: string;
}

/* ── Constants ────────────────────────────────────────────────────────── */

const COMPANY = 'Sigma Shopfronts';

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-amber-100 text-amber-700',
  quoted: 'bg-purple-100 text-purple-700',
  won: 'bg-emerald-100 text-emerald-700',
  lost: 'bg-red-100 text-red-700',
};

/* ── Main Page ────────────────────────────────────────────────────────── */

export default function OutreachPage() {
  const [apiKey, setApiKey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [emails, setEmails] = useState<EmailMsg[]>([]);
  const [threadLoading, setThreadLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');

  // AI compose state
  const [composing, setComposing] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [draftSubject, setDraftSubject] = useState('');
  const [draftBody, setDraftBody] = useState('');
  const [instruction, setInstruction] = useState('');
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<{ ok: boolean; msg: string } | null>(null);

  const headers = useCallback(
    () => ({ Authorization: 'Bearer ' + apiKey, 'Content-Type': 'application/json' }),
    [apiKey]
  );

  /* ── Fetch leads ─────────────────────────────────────────────────────── */

  const fetchLeads = useCallback(async (key: string) => {
    setLoading(true);
    try {
      const qs = statusFilter ? `&status=${statusFilter}` : '';
      const res = await fetch(`/api/admin/outreach?key=${encodeURIComponent(key)}${qs}`);
      const data = await res.json();
      if (data.leads) {
        setLeads(data.leads);
        setAuthenticated(true);
      }
    } catch { /* ignore */ }
    setLoading(false);
  }, [statusFilter]);

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_key');
    if (saved) { setApiKey(saved); fetchLeads(saved); }
  }, [fetchLeads]);

  const handleLogin = () => {
    if (apiKey.trim()) {
      sessionStorage.setItem('admin_key', apiKey);
      fetchLeads(apiKey);
    }
  };

  useEffect(() => {
    if (authenticated && apiKey) fetchLeads(apiKey);
  }, [statusFilter, authenticated, apiKey, fetchLeads]);

  /* ── Fetch thread ────────────────────────────────────────────────────── */

  const openThread = async (lead: Lead) => {
    setSelectedLead(lead);
    setEmails([]);
    setComposing(false);
    setDraftSubject('');
    setDraftBody('');
    setInstruction('');
    setSendResult(null);
    setThreadLoading(true);
    try {
      const res = await fetch(`/api/admin/outreach?leadId=${lead.id}`, { headers: headers() });
      const data = await res.json();
      if (data.emails) setEmails(data.emails);
    } catch { /* ignore */ }
    setThreadLoading(false);
  };

  /* ── AI compose ──────────────────────────────────────────────────────── */

  const aiCompose = async () => {
    if (!selectedLead) return;
    setAiLoading(true);
    try {
      const res = await fetch('/api/ai/outreach-compose', {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ leadId: selectedLead.id, instruction: instruction.trim() || undefined }),
      });
      const data = await res.json();
      if (data.reply) {
        setDraftSubject(data.reply.subject);
        setDraftBody(data.reply.body);
        setComposing(true);
      }
    } catch { /* ignore */ }
    setAiLoading(false);
  };

  /* ── Send email ──────────────────────────────────────────────────────── */

  const sendEmail = async () => {
    if (!selectedLead || !draftSubject.trim() || !draftBody.trim()) return;
    setSending(true);
    setSendResult(null);
    try {
      const res = await fetch('/api/admin/outreach', {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ leadId: selectedLead.id, subject: draftSubject, body: draftBody }),
      });
      const data = await res.json();
      if (data.ok) {
        setSendResult({ ok: true, msg: 'Email sent successfully!' });
        setDraftSubject('');
        setDraftBody('');
        setInstruction('');
        setComposing(false);
        // Refresh thread
        openThread({ ...selectedLead, emailCount: selectedLead.emailCount + 1 });
        // Update lead in list
        setLeads((prev) => prev.map((l) =>
          l.id === selectedLead.id ? { ...l, status: l.status === 'new' ? 'contacted' : l.status, emailCount: l.emailCount + 1 } : l
        ));
      } else {
        setSendResult({ ok: false, msg: data.error || 'Failed to send.' });
      }
    } catch {
      setSendResult({ ok: false, msg: 'Network error.' });
    }
    setSending(false);
  };

  /* ── Login screen ────────────────────────────────────────────────────── */

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-grey-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-grey-200/60 p-8 w-full max-w-sm space-y-4">
          <h1 className="text-xl font-bold text-navy text-center">{COMPANY}</h1>
          <p className="text-sm text-grey-400 text-center">Email Outreach</p>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Admin key"
            className="w-full px-4 py-3 rounded-xl border border-grey-200 focus:border-navy focus:ring-1 focus:ring-navy outline-none text-sm"
          />
          <button
            onClick={handleLogin}
            disabled={!apiKey.trim() || loading}
            className="w-full py-3 bg-navy text-white rounded-xl font-semibold text-sm hover:bg-navy/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Loading…' : 'Enter'}
          </button>
        </div>
      </div>
    );
  }

  /* ── Main layout ─────────────────────────────────────────────────────── */

  return (
    <div className="min-h-screen bg-grey-50">
      {/* Header */}
      <div className="bg-white border-b border-grey-200/60 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-navy">{COMPANY} — Email Outreach</h1>
            <p className="text-xs text-grey-400">{leads.length} leads</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-sm border border-grey-200 rounded-lg px-3 py-1.5 bg-white text-navy"
            >
              <option value="">All statuses</option>
              {['new', 'contacted', 'quoted', 'won', 'lost'].map((s) => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
            <button
              onClick={() => fetchLeads(apiKey)}
              className="text-sm text-navy hover:text-gold transition-colors font-medium"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6" style={{ height: 'calc(100vh - 73px)' }}>
        {/* Left: Lead list */}
        <div className="w-96 flex-shrink-0 overflow-y-auto space-y-2">
          {leads.map((lead) => (
            <button
              key={lead.id}
              onClick={() => openThread(lead)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selectedLead?.id === lead.id
                  ? 'bg-navy/5 border-navy/30 shadow-sm'
                  : 'bg-white border-grey-200/60 hover:border-grey-300'
              }`}
            >
              <div className="flex items-start justify-between mb-1">
                <p className="font-semibold text-navy text-sm truncate pr-2">{lead.name}</p>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${STATUS_COLORS[lead.status] || 'bg-grey-100 text-grey-700'}`}>
                  {lead.status}
                </span>
              </div>
              <p className="text-xs text-charcoal truncate">{lead.service} · {lead.location}</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-[10px] text-grey-400">{new Date(lead.createdAt).toLocaleDateString('en-GB')}</p>
                {lead.emailCount > 0 && (
                  <span className="text-[10px] text-grey-400 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                    {lead.emailCount}
                  </span>
                )}
              </div>
            </button>
          ))}
          {leads.length === 0 && !loading && (
            <p className="text-sm text-grey-400 text-center py-12">No leads found</p>
          )}
        </div>

        {/* Right: Thread + compose */}
        <div className="flex-1 flex flex-col min-w-0 bg-white rounded-2xl border border-grey-200/60 overflow-hidden">
          {!selectedLead ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto text-grey-200 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                <p className="text-sm text-grey-400">Select a lead to view their email thread</p>
              </div>
            </div>
          ) : (
            <>
              {/* Lead header */}
              <div className="p-5 border-b border-grey-100 flex-shrink-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-navy">{selectedLead.name}</h2>
                    <p className="text-sm text-charcoal">{selectedLead.service} · {selectedLead.location}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-grey-400">
                      <span>{selectedLead.email}</span>
                      <span>{selectedLead.phone}</span>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[selectedLead.status] || 'bg-grey-100 text-grey-700'}`}>
                    {selectedLead.status}
                  </span>
                </div>
                {selectedLead.message && (
                  <div className="mt-3 p-3 bg-grey-50 rounded-lg">
                    <p className="text-[10px] font-semibold text-grey-400 uppercase tracking-wider mb-1">Original enquiry</p>
                    <p className="text-sm text-charcoal">{selectedLead.message}</p>
                  </div>
                )}
              </div>

              {/* Email thread */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {threadLoading && <p className="text-sm text-grey-400 text-center py-6">Loading thread…</p>}

                {!threadLoading && emails.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-sm text-grey-400 mb-1">No emails sent yet</p>
                    <p className="text-xs text-grey-300">Use AI to compose the first outreach email</p>
                  </div>
                )}

                {emails.map((email) => (
                  <div key={email.id} className="p-4 rounded-xl bg-blue-50/50 border border-blue-100/60">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-navy">{email.subject}</p>
                      <div className="flex items-center gap-2">
                        {email.status === 'sent' && (
                          <span className="text-[10px] text-emerald-600 font-medium">✓ Sent</span>
                        )}
                        {email.status === 'failed' && (
                          <span className="text-[10px] text-red-600 font-medium">✗ Failed</span>
                        )}
                        <span className="text-[10px] text-grey-400">
                          {new Date(email.createdAt).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-charcoal whitespace-pre-wrap leading-relaxed">{email.body}</p>
                  </div>
                ))}
              </div>

              {/* Compose area */}
              <div className="border-t border-grey-100 p-5 flex-shrink-0 space-y-3">
                {sendResult && (
                  <div className={`text-sm px-3 py-2 rounded-lg ${sendResult.ok ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                    {sendResult.msg}
                  </div>
                )}

                {!composing ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={instruction}
                      onChange={(e) => setInstruction(e.target.value)}
                      placeholder="Optional: tell AI what to write (e.g. 'follow up about site visit', 'ask about budget')…"
                      className="flex-1 px-4 py-2.5 rounded-xl border border-grey-200 text-sm focus:border-navy focus:ring-1 focus:ring-navy outline-none"
                      onKeyDown={(e) => e.key === 'Enter' && aiCompose()}
                    />
                    <button
                      onClick={aiCompose}
                      disabled={aiLoading}
                      className="px-5 py-2.5 bg-navy text-white rounded-xl text-sm font-semibold hover:bg-navy/90 transition-colors disabled:opacity-50 flex items-center gap-2 flex-shrink-0"
                    >
                      {aiLoading ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4 31.4" strokeLinecap="round" /></svg>
                          Composing…
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
                          AI Compose
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-semibold text-grey-400 uppercase tracking-wider mb-1 block">Subject</label>
                      <input
                        type="text"
                        value={draftSubject}
                        onChange={(e) => setDraftSubject(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-grey-200 text-sm focus:border-navy focus:ring-1 focus:ring-navy outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-grey-400 uppercase tracking-wider mb-1 block">Email Body</label>
                      <textarea
                        value={draftBody}
                        onChange={(e) => setDraftBody(e.target.value)}
                        rows={6}
                        className="w-full px-4 py-2 rounded-lg border border-grey-200 text-sm focus:border-navy focus:ring-1 focus:ring-navy outline-none resize-y"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <button
                          onClick={sendEmail}
                          disabled={sending || !draftSubject.trim() || !draftBody.trim()}
                          className="px-5 py-2 bg-gold text-navy rounded-lg text-sm font-bold hover:bg-gold/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                          {sending ? (
                            <>
                              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4 31.4" strokeLinecap="round" /></svg>
                              Sending…
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
                              Send Email
                            </>
                          )}
                        </button>
                        <button
                          onClick={aiCompose}
                          disabled={aiLoading}
                          className="px-4 py-2 bg-grey-100 text-charcoal rounded-lg text-sm font-medium hover:bg-grey-200 transition-colors disabled:opacity-50"
                        >
                          {aiLoading ? 'Regenerating…' : 'Regenerate'}
                        </button>
                      </div>
                      <button
                        onClick={() => { setComposing(false); setDraftSubject(''); setDraftBody(''); }}
                        className="text-sm text-grey-400 hover:text-charcoal transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
