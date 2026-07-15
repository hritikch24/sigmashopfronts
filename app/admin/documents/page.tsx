'use client';

import { useState, useEffect, useCallback } from 'react';

interface LineItem {
  description: string;
  qty: number;
  unitPrice: number;
}

interface Doc {
  id: string;
  type: string;
  number: string;
  customerName: string;
  customerEmail: string | null;
  customerPhone: string | null;
  customerAddress: string | null;
  lineItems: LineItem[];
  subtotal: number;
  vatRate: number;
  vatAmount: number;
  total: number;
  notes: string | null;
  depositPercent: number | null;
  validUntil: string | null;
  dueDate: string | null;
  status: string;
  paidAt: string | null;
  createdAt: string;
}

interface CustomerLite {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  location: string;
}

const WA_NUMBER = '447397066538';
const SITE_URL = 'https://www.sigmashopfronts.com';

const QUOTE_STATUSES = [
  { value: 'sent', label: 'Sent', color: 'bg-blue-100 text-blue-700' },
  { value: 'accepted', label: 'Accepted', color: 'bg-emerald-100 text-emerald-700' },
  { value: 'declined', label: 'Declined', color: 'bg-red-100 text-red-700' },
  { value: 'expired', label: 'Expired', color: 'bg-grey-100 text-grey-500' },
];

const INVOICE_STATUSES = [
  { value: 'sent', label: 'Sent', color: 'bg-blue-100 text-blue-700' },
  { value: 'paid', label: 'Paid', color: 'bg-emerald-100 text-emerald-700' },
  { value: 'overdue', label: 'Overdue', color: 'bg-red-100 text-red-700' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-grey-100 text-grey-500' },
];

function statusMeta(type: string, val: string) {
  const list = type === 'invoice' ? INVOICE_STATUSES : QUOTE_STATUSES;
  return list.find((s) => s.value === val) || { value: val, label: val, color: 'bg-grey-100 text-grey-500' };
}

function emptyForm() {
  return {
    customerId: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
    lineItems: [{ description: '', qty: 1, unitPrice: 0 }] as LineItem[],
    vatEnabled: false,
    vatRate: 20,
    notes: '',
    depositPercent: '',
    validUntil: '',
    dueDate: '',
  };
}

export default function DocumentsAdminPage() {
  const [apiKey, setApiKey] = useState('');
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<'quote' | 'invoice'>('quote');
  const [documents, setDocuments] = useState<Doc[]>([]);
  const [customers, setCustomers] = useState<CustomerLite[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm());
  const [error, setError] = useState('');
  const [createdDoc, setCreatedDoc] = useState<Doc | null>(null);

  const makeHeaders = useCallback(() => ({ Authorization: 'Bearer ' + apiKey, 'Content-Type': 'application/json' }), [apiKey]);

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/documents?type=' + tab, { headers: makeHeaders() });
      if (res.status === 401) { setAuthed(false); return; }
      const data = await res.json();
      setDocuments(data.documents || []);
    } catch {
      setError('Failed to load documents');
    }
    setLoading(false);
  }, [apiKey, tab, makeHeaders]);

  const fetchCustomers = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/customers', { headers: makeHeaders() });
      if (!res.ok) return;
      const data = await res.json();
      setCustomers((data.customers || []).map((c: CustomerLite) => ({ id: c.id, name: c.name, phone: c.phone, email: c.email, location: c.location })));
    } catch {
      // non-critical
    }
  }, [makeHeaders]);

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_key');
    if (saved) { setApiKey(saved); setAuthed(true); }
  }, []);

  useEffect(() => { if (authed) { fetchDocuments(); fetchCustomers(); } }, [authed, tab, fetchDocuments, fetchCustomers]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    sessionStorage.setItem('admin_key', apiKey);
    setAuthed(true);
  }

  function openCreate() {
    setForm(emptyForm());
    setCreatedDoc(null);
    setError('');
    setShowForm(true);
  }

  function pickCustomer(id: string) {
    const c = customers.find((x) => x.id === id);
    if (!c) { setForm({ ...form, customerId: '' }); return; }
    setForm({ ...form, customerId: c.id, customerName: c.name, customerPhone: c.phone, customerEmail: c.email || '', customerAddress: c.location });
  }

  function updateLineItem(idx: number, patch: Partial<LineItem>) {
    const items = [...form.lineItems];
    items[idx] = { ...items[idx], ...patch };
    setForm({ ...form, lineItems: items });
  }

  function addLineItem() {
    setForm({ ...form, lineItems: [...form.lineItems, { description: '', qty: 1, unitPrice: 0 }] });
  }

  function removeLineItem(idx: number) {
    setForm({ ...form, lineItems: form.lineItems.filter((_, i) => i !== idx) });
  }

  const subtotal = form.lineItems.reduce((sum, li) => sum + (Number(li.qty) || 0) * (Number(li.unitPrice) || 0), 0);
  const vatAmount = form.vatEnabled ? subtotal * (form.vatRate / 100) : 0;
  const total = subtotal + vatAmount;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const validItems = form.lineItems.filter((li) => li.description.trim());
    if (!form.customerName.trim() || validItems.length === 0) {
      setError('Customer name and at least one line item description are required.');
      return;
    }

    const payload = {
      type: tab,
      customerId: form.customerId || null,
      customerName: form.customerName,
      customerEmail: form.customerEmail || null,
      customerPhone: form.customerPhone || null,
      customerAddress: form.customerAddress || null,
      lineItems: validItems,
      vatRate: form.vatEnabled ? form.vatRate : 0,
      notes: form.notes || null,
      depositPercent: tab === 'invoice' && form.depositPercent ? Number(form.depositPercent) : null,
      validUntil: tab === 'quote' && form.validUntil ? form.validUntil : null,
      dueDate: tab === 'invoice' && form.dueDate ? form.dueDate : null,
    };

    try {
      const res = await fetch('/api/admin/documents', { method: 'POST', headers: makeHeaders(), body: JSON.stringify(payload) });
      if (!res.ok) { const d = await res.json(); setError(d.error || 'Save failed'); return; }
      const data = await res.json();
      setCreatedDoc(data.document);
      fetchDocuments();
    } catch {
      setError('Network error');
    }
  }

  async function updateStatus(doc: Doc, status: string) {
    await fetch('/api/admin/documents/' + doc.id, { method: 'PATCH', headers: makeHeaders(), body: JSON.stringify({ status }) });
    fetchDocuments();
  }

  async function deleteDoc(id: string) {
    if (!confirm('Delete this document? This cannot be undone.')) return;
    await fetch('/api/admin/documents/' + id, { method: 'DELETE', headers: makeHeaders() });
    fetchDocuments();
  }

  function linkFor(doc: Doc) {
    return SITE_URL + '/' + doc.type + '/' + doc.id;
  }

  function copyLink(doc: Doc) {
    navigator.clipboard.writeText(linkFor(doc));
    alert('Link copied to clipboard');
  }

  function sendWhatsApp(doc: Doc) {
    if (!doc.customerPhone) { alert('No phone number for this customer'); return; }
    const label = doc.type === 'invoice' ? 'invoice' : 'quote';
    const msg = `Hi ${doc.customerName.split(' ')[0]}, here's your ${label} ${doc.number} from Sigma Shopfronts:\n${linkFor(doc)}`;
    const phone = doc.customerPhone.replace(/[\s\-()]/g, '').replace(/^0/, '44');
    window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(msg), '_blank');
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-grey-50 p-4">
        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm space-y-4">
          <h1 className="text-2xl font-heading font-bold text-navy text-center">Quotes &amp; Invoices</h1>
          <p className="text-sm text-grey-400 text-center">Enter your admin key to continue</p>
          <input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="Admin key"
            className="w-full px-4 py-3 border border-grey-200 rounded-lg text-sm focus:ring-2 focus:ring-gold/40 focus:border-gold outline-none" />
          <button type="submit" className="w-full py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy/90 transition-colors">
            Sign In
          </button>
        </form>
      </div>
    );
  }

  const statusList = tab === 'invoice' ? INVOICE_STATUSES : QUOTE_STATUSES;

  return (
    <div className="min-h-screen bg-grey-50">
      <header className="bg-white border-b border-grey-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-heading font-bold text-navy">Quotes &amp; Invoices</h1>
            <p className="text-xs text-grey-400">Create shareable quotes and invoices for customers</p>
          </div>
          <a href="/admin" className="text-sm text-grey-500 hover:text-navy">&larr; Job Tracker</a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {error && (
          <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm flex justify-between items-center">
            {error}
            <button onClick={() => setError('')} className="text-red-400 hover:text-red-600 text-lg font-bold ml-4">&times;</button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="inline-flex bg-white rounded-lg border border-grey-200 p-1">
            <button onClick={() => setTab('quote')}
              className={'px-4 py-2 text-sm font-semibold rounded-md transition-colors ' + (tab === 'quote' ? 'bg-navy text-white' : 'text-grey-500 hover:text-navy')}>
              Quotes
            </button>
            <button onClick={() => setTab('invoice')}
              className={'px-4 py-2 text-sm font-semibold rounded-md transition-colors ' + (tab === 'invoice' ? 'bg-navy text-white' : 'text-grey-500 hover:text-navy')}>
              Invoices
            </button>
          </div>
          <button onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2.5 bg-navy text-white text-sm font-semibold rounded-lg hover:bg-navy/90 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
            New {tab === 'quote' ? 'Quote' : 'Invoice'}
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-grey-200/60 overflow-hidden">
          {loading ? (
            <div className="py-20 text-center text-grey-400">Loading...</div>
          ) : documents.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-grey-400 text-sm">No {tab === 'quote' ? 'quotes' : 'invoices'} yet</p>
              <button onClick={openCreate} className="mt-3 text-sm text-gold font-semibold hover:underline">Create the first one</button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-grey-50/80 border-b border-grey-100">
                    <th className="py-3 px-4 text-[11px] font-semibold text-grey-400 uppercase tracking-wider">Number</th>
                    <th className="py-3 px-4 text-[11px] font-semibold text-grey-400 uppercase tracking-wider">Customer</th>
                    <th className="py-3 px-4 text-[11px] font-semibold text-grey-400 uppercase tracking-wider">Total</th>
                    <th className="py-3 px-4 text-[11px] font-semibold text-grey-400 uppercase tracking-wider">Status</th>
                    <th className="py-3 px-4 text-[11px] font-semibold text-grey-400 uppercase tracking-wider">Created</th>
                    <th className="py-3 px-4 text-[11px] font-semibold text-grey-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc) => {
                    const st = statusMeta(doc.type, doc.status);
                    return (
                      <tr key={doc.id} className="border-b border-grey-100/60 hover:bg-grey-50/50 transition-colors">
                        <td className="py-3 px-4 text-sm font-semibold text-navy">{doc.number}</td>
                        <td className="py-3 px-4">
                          <p className="text-sm text-charcoal">{doc.customerName}</p>
                          <p className="text-xs text-grey-400">{doc.customerPhone}</p>
                        </td>
                        <td className="py-3 px-4 text-sm text-charcoal">£{doc.total.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <select value={doc.status} onChange={(e) => updateStatus(doc, e.target.value)}
                            className={'text-xs font-semibold rounded-full px-2.5 py-1 border-0 outline-none cursor-pointer ' + st.color}>
                            {statusList.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                          </select>
                        </td>
                        <td className="py-3 px-4 text-xs text-grey-400">{new Date(doc.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <a href={linkFor(doc).replace(SITE_URL, '')} target="_blank" title="View"
                              className="p-1.5 rounded hover:bg-grey-100 text-grey-400 hover:text-navy transition-colors">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                            </a>
                            <button onClick={() => copyLink(doc)} title="Copy link"
                              className="p-1.5 rounded hover:bg-grey-100 text-grey-400 hover:text-navy transition-colors">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                            </button>
                            {doc.customerPhone && (
                              <button onClick={() => sendWhatsApp(doc)} title="Send via WhatsApp"
                                className="p-1.5 rounded hover:bg-green-50 text-grey-400 hover:text-green-600 transition-colors">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                              </button>
                            )}
                            <button onClick={() => deleteDoc(doc.id)} title="Delete"
                              className="p-1.5 rounded hover:bg-red-50 text-grey-400 hover:text-red-500 transition-colors">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-[6vh] px-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 mb-10">
            {createdDoc ? (
              <div className="space-y-4">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <h2 className="text-lg font-heading font-bold text-navy text-center">{createdDoc.number} created</h2>
                <div className="bg-grey-50 rounded-lg p-3 text-sm text-charcoal break-all text-center">{linkFor(createdDoc)}</div>
                <div className="flex gap-2">
                  <button onClick={() => copyLink(createdDoc)} className="flex-1 py-2.5 border border-grey-200 text-navy text-sm font-semibold rounded-lg hover:bg-grey-50">Copy Link</button>
                  {createdDoc.customerPhone && (
                    <button onClick={() => sendWhatsApp(createdDoc)} className="flex-1 py-2.5 bg-[#25D366] text-white text-sm font-semibold rounded-lg hover:bg-[#20ba5a]">Send WhatsApp</button>
                  )}
                </div>
                <button onClick={() => setShowForm(false)} className="w-full py-2.5 bg-navy text-white text-sm font-semibold rounded-lg hover:bg-navy/90">Done</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-heading font-bold text-navy">New {tab === 'quote' ? 'Quote' : 'Invoice'}</h2>
                  <button type="button" onClick={() => setShowForm(false)} className="text-grey-400 hover:text-navy text-xl">&times;</button>
                </div>

                {customers.length > 0 && (
                  <div>
                    <label className="block text-xs font-medium text-grey-500 mb-1">Link to existing customer <span className="text-grey-300">(optional)</span></label>
                    <select value={form.customerId} onChange={(e) => pickCustomer(e.target.value)}
                      className="w-full px-3 py-2 border border-grey-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-gold/40 outline-none">
                      <option value="">— Manual entry —</option>
                      {customers.map((c) => <option key={c.id} value={c.id}>{c.name} · {c.phone}</option>)}
                    </select>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-medium text-grey-500 mb-1">Customer Name *</label>
                    <input required value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                      className="w-full px-3 py-2 border border-grey-200 rounded-lg text-sm focus:ring-2 focus:ring-gold/40 outline-none" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-medium text-grey-500 mb-1">Phone</label>
                    <input value={form.customerPhone} onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
                      className="w-full px-3 py-2 border border-grey-200 rounded-lg text-sm focus:ring-2 focus:ring-gold/40 outline-none" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-medium text-grey-500 mb-1">Email</label>
                    <input type="email" value={form.customerEmail} onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
                      className="w-full px-3 py-2 border border-grey-200 rounded-lg text-sm focus:ring-2 focus:ring-gold/40 outline-none" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-medium text-grey-500 mb-1">Address / Location</label>
                    <input value={form.customerAddress} onChange={(e) => setForm({ ...form, customerAddress: e.target.value })}
                      className="w-full px-3 py-2 border border-grey-200 rounded-lg text-sm focus:ring-2 focus:ring-gold/40 outline-none" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-medium text-grey-500">Line Items *</label>
                    <button type="button" onClick={addLineItem} className="text-xs text-gold font-semibold hover:underline">+ Add item</button>
                  </div>
                  <div className="space-y-2">
                    {form.lineItems.map((li, idx) => (
                      <div key={idx} className="flex gap-2 items-start">
                        <input placeholder="Description" value={li.description} onChange={(e) => updateLineItem(idx, { description: e.target.value })}
                          className="flex-1 px-3 py-2 border border-grey-200 rounded-lg text-sm focus:ring-2 focus:ring-gold/40 outline-none" />
                        <input type="number" min="0" step="1" placeholder="Qty" value={li.qty} onChange={(e) => updateLineItem(idx, { qty: Number(e.target.value) })}
                          className="w-16 px-2 py-2 border border-grey-200 rounded-lg text-sm focus:ring-2 focus:ring-gold/40 outline-none" />
                        <div className="relative w-28">
                          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-grey-400 text-sm">£</span>
                          <input type="number" min="0" step="0.01" placeholder="Price" value={li.unitPrice} onChange={(e) => updateLineItem(idx, { unitPrice: Number(e.target.value) })}
                            className="w-full pl-6 pr-2 py-2 border border-grey-200 rounded-lg text-sm focus:ring-2 focus:ring-gold/40 outline-none" />
                        </div>
                        <button type="button" onClick={() => removeLineItem(idx)} disabled={form.lineItems.length === 1}
                          className="p-2 text-grey-400 hover:text-red-500 disabled:opacity-30">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between bg-grey-50 rounded-lg p-3">
                  <label className="flex items-center gap-2 text-sm text-charcoal">
                    <input type="checkbox" checked={form.vatEnabled} onChange={(e) => setForm({ ...form, vatEnabled: e.target.checked })} />
                    Add VAT
                  </label>
                  {form.vatEnabled && (
                    <div className="flex items-center gap-1">
                      <input type="number" min="0" max="100" step="0.5" value={form.vatRate} onChange={(e) => setForm({ ...form, vatRate: Number(e.target.value) })}
                        className="w-16 px-2 py-1 border border-grey-200 rounded text-sm text-right" />
                      <span className="text-sm text-grey-500">%</span>
                    </div>
                  )}
                </div>

                <div className="text-right space-y-1 text-sm">
                  <p className="text-grey-500">Subtotal: <span className="text-charcoal font-medium">£{subtotal.toFixed(2)}</span></p>
                  {form.vatEnabled && <p className="text-grey-500">VAT ({form.vatRate}%): <span className="text-charcoal font-medium">£{vatAmount.toFixed(2)}</span></p>}
                  <p className="text-navy font-heading font-bold text-lg">Total: £{total.toFixed(2)}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {tab === 'quote' ? (
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-medium text-grey-500 mb-1">Valid Until</label>
                      <input type="date" value={form.validUntil} onChange={(e) => setForm({ ...form, validUntil: e.target.value })}
                        className="w-full px-3 py-2 border border-grey-200 rounded-lg text-sm focus:ring-2 focus:ring-gold/40 outline-none" />
                    </div>
                  ) : (
                    <>
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-xs font-medium text-grey-500 mb-1">Due Date</label>
                        <input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                          className="w-full px-3 py-2 border border-grey-200 rounded-lg text-sm focus:ring-2 focus:ring-gold/40 outline-none" />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-xs font-medium text-grey-500 mb-1">Deposit Required <span className="text-grey-300">(% of total, optional)</span></label>
                        <input type="number" min="0" max="100" step="5" placeholder="e.g. 40" value={form.depositPercent}
                          onChange={(e) => setForm({ ...form, depositPercent: e.target.value })}
                          className="w-full px-3 py-2 border border-grey-200 rounded-lg text-sm focus:ring-2 focus:ring-gold/40 outline-none" />
                      </div>
                    </>
                  )}
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-grey-500 mb-1">Notes <span className="text-grey-300">(payment details, terms, etc.)</span></label>
                    <textarea rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className="w-full px-3 py-2 border border-grey-200 rounded-lg text-sm focus:ring-2 focus:ring-gold/40 outline-none resize-none" />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowForm(false)}
                    className="flex-1 py-2.5 border border-grey-200 text-grey-500 text-sm font-semibold rounded-lg hover:bg-grey-50 transition-colors">
                    Cancel
                  </button>
                  <button type="submit"
                    className="flex-1 py-2.5 bg-navy text-white text-sm font-semibold rounded-lg hover:bg-navy/90 transition-colors">
                    Create {tab === 'quote' ? 'Quote' : 'Invoice'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
