'use client';

import { useState, useEffect, useCallback } from 'react';

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  location: string;
  service: string;
  jobType: string;
  status: string;
  price: number | null;
  notes: string | null;
  source: string | null;
  completedAt: string | null;
  lastContact: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Stats {
  total: number;
  completed: number;
  byStatus: { status: string; count: number }[];
}

const COMPANY = 'Sigma Shop Fronts';
const WA_NUMBER = '447397066538';

const SERVICES = [
  'Aluminium Shopfront', 'Roller Shutter', 'Security Door', 'Automatic Door',
  'Bi-Fold Door', 'Fire Door', 'Shopfront Repair', 'Shutter Repair',
  'Door Repair', 'Emergency Callout', 'Other',
];

const STATUSES = [
  { value: 'enquiry', label: 'New Enquiry', color: 'bg-blue-100 text-blue-700' },
  { value: 'quoted', label: 'Quoted', color: 'bg-purple-100 text-purple-700' },
  { value: 'booked', label: 'Booked In', color: 'bg-indigo-100 text-indigo-700' },
  { value: 'in_progress', label: 'In Progress', color: 'bg-amber-100 text-amber-700' },
  { value: 'completed', label: 'Completed', color: 'bg-emerald-100 text-emerald-700' },
  { value: 'follow_up', label: 'Follow Up', color: 'bg-cyan-100 text-cyan-700' },
  { value: 'did_not_proceed', label: "Didn't Proceed", color: 'bg-grey-100 text-grey-500' },
];

function statusMeta(val: string) {
  return STATUSES.find((s) => s.value === val) || { value: val, label: val, color: 'bg-grey-100 text-grey-500' };
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return mins + 'm ago';
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return hrs + 'h ago';
  const days = Math.floor(hrs / 24);
  if (days < 30) return days + 'd ago';
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function waMessage(type: string, name: string, service: string) {
  const first = name.split(' ')[0];
  if (type === 'feedback') {
    return 'Hi ' + first + ', hope you\'re well! We recently completed your ' + service + ' and wanted to check everything is working perfectly. If you need any adjustments or have feedback, we\'d love to hear from you. — ' + COMPANY;
  }
  return 'Hi ' + first + ', hope all is well! Just checking in to see if you need any shopfront services — new installations, repairs, or upgrades. We\'d be happy to help with a free quote. — ' + COMPANY;
}

function emailContent(type: string, name: string, service: string) {
  const first = name.split(' ')[0];
  if (type === 'feedback') {
    return {
      subject: 'How\'s everything going? — ' + COMPANY,
      body: 'Hi ' + first + ',\n\nHope you\'re doing well! We recently completed your ' + service + ' and wanted to check that everything is working perfectly.\n\nIf you need any adjustments or have any feedback, please don\'t hesitate to let us know.\n\nBest regards,\n' + COMPANY,
    };
  }
  return {
    subject: 'Need any shopfront work? — ' + COMPANY,
    body: 'Hi ' + first + ',\n\nHope all is well! Just reaching out to see if you need any shopfront services — new installations, repairs, or upgrades.\n\nWe\'d be happy to come out for a free site survey and quote.\n\nBest regards,\n' + COMPANY,
  };
}

export default function AdminPage() {
  const [apiKey, setApiKey] = useState('');
  const [authed, setAuthed] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, completed: 0, byStatus: [] });
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [msgCustomer, setMsgCustomer] = useState<Customer | null>(null);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '', phone: '', email: '', location: '', service: SERVICES[0],
    jobType: 'installation', status: 'enquiry', price: '', notes: '',
  });

  const makeHeaders = useCallback(() => ({ Authorization: 'Bearer ' + apiKey, 'Content-Type': 'application/json' }), [apiKey]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter !== 'all') params.set('status', filter);
      if (search) params.set('search', search);
      const res = await fetch('/api/admin/customers?' + params.toString(), { headers: makeHeaders() });
      if (res.status === 401) { setAuthed(false); return; }
      const data = await res.json();
      setCustomers(data.customers || []);
      setStats(data.stats || { total: 0, completed: 0, byStatus: [] });
    } catch {
      setError('Failed to load data');
    }
    setLoading(false);
  }, [apiKey, filter, search, makeHeaders]);

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_key');
    if (saved) { setApiKey(saved); setAuthed(true); }
  }, []);

  useEffect(() => { if (authed) fetchData(); }, [authed, filter, search, fetchData]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    sessionStorage.setItem('admin_key', apiKey);
    setAuthed(true);
  }

  function openAdd() {
    setEditingId(null);
    setForm({ name: '', phone: '', email: '', location: '', service: SERVICES[0], jobType: 'installation', status: 'enquiry', price: '', notes: '' });
    setShowForm(true);
  }

  function openEdit(c: Customer) {
    setEditingId(c.id);
    setForm({
      name: c.name, phone: c.phone, email: c.email || '', location: c.location,
      service: c.service, jobType: c.jobType, status: c.status,
      price: c.price ? String(c.price) : '', notes: c.notes || '',
    });
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const payload = { ...form, price: form.price ? parseFloat(form.price) : null };
    try {
      const url = editingId ? '/api/admin/customers/' + editingId : '/api/admin/customers';
      const method = editingId ? 'PATCH' : 'POST';
      const res = await fetch(url, { method, headers: makeHeaders(), body: JSON.stringify(payload) });
      if (!res.ok) { const d = await res.json(); setError(d.error || 'Save failed'); return; }
      setShowForm(false);
      fetchData();
    } catch {
      setError('Network error');
    }
  }

  async function markContacted(id: string) {
    await fetch('/api/admin/customers/' + id, {
      method: 'PATCH', headers: makeHeaders(),
      body: JSON.stringify({ markContacted: true }),
    });
    fetchData();
  }

  async function deleteCustomer(id: string) {
    if (!confirm('Remove this job record?')) return;
    await fetch('/api/admin/customers/' + id, { method: 'DELETE', headers: makeHeaders() });
    fetchData();
  }

  function openWhatsApp(c: Customer, type: string) {
    if (!c.phone) { alert('No phone number for this customer'); return; }
    const msg = waMessage(type, c.name, c.service);
    const phone = c.phone.replace(/[\s\-()]/g, '').replace(/^0/, '44');
    window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(msg), '_blank');
    markContacted(c.id);
  }

  function openEmail(c: Customer, type: string) {
    if (!c.email) { alert('No email address for this customer'); return; }
    const content = emailContent(type, c.name, c.service);
    window.open('mailto:' + c.email + '?subject=' + encodeURIComponent(content.subject) + '&body=' + encodeURIComponent(content.body), '_blank');
    markContacted(c.id);
  }

  // ── Auth Screen ─────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-grey-50 p-4">
        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm space-y-4">
          <h1 className="text-2xl font-heading font-bold text-navy text-center">Job Tracker</h1>
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

  const activeJobs = stats.byStatus.filter(s => ['enquiry', 'quoted', 'booked', 'in_progress'].includes(s.status)).reduce((a, b) => a + b.count, 0);
  const followUps = stats.byStatus.find(s => s.status === 'follow_up')?.count || 0;

  return (
    <div className="min-h-screen bg-grey-50">
      {/* Header */}
      <header className="bg-white border-b border-grey-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-heading font-bold text-navy">Job Tracker</h1>
            <p className="text-xs text-grey-400">Manage jobs &amp; follow up with customers</p>
          </div>
          <button onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-navy text-white text-sm font-semibold rounded-lg hover:bg-navy/90 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
            Add Job
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {error && (
          <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm flex justify-between items-center">
            {error}
            <button onClick={() => setError('')} className="text-red-400 hover:text-red-600 text-lg font-bold ml-4">&times;</button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Customers', value: stats.total, sub: 'All time' },
            { label: 'Active Jobs', value: activeJobs, sub: 'In pipeline' },
            { label: 'Completed', value: stats.completed, sub: 'Jobs done' },
            { label: 'Follow Ups', value: followUps, sub: 'Pending outreach' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-grey-200/60 p-4">
              <span className="text-xs font-medium text-grey-400 uppercase tracking-wide">{s.label}</span>
              <p className="text-2xl font-heading font-bold text-navy mt-1">{s.value}</p>
              <p className="text-xs text-grey-400 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, phone, location..."
            className="flex-1 px-4 py-2.5 border border-grey-200 rounded-lg text-sm focus:ring-2 focus:ring-gold/40 focus:border-gold outline-none" />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2.5 border border-grey-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-gold/40 outline-none">
            <option value="all">All Statuses</option>
            {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>

        {/* Customer Table */}
        <div className="bg-white rounded-2xl border border-grey-200/60 overflow-hidden">
          {loading ? (
            <div className="py-20 text-center text-grey-400">Loading...</div>
          ) : customers.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-grey-400 text-sm">No jobs found</p>
              <button onClick={openAdd} className="mt-3 text-sm text-gold font-semibold hover:underline">Add your first job</button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-grey-50/80 border-b border-grey-100">
                    <th className="py-3 px-4 text-[11px] font-semibold text-grey-400 uppercase tracking-wider">Customer</th>
                    <th className="py-3 px-4 text-[11px] font-semibold text-grey-400 uppercase tracking-wider">Service</th>
                    <th className="py-3 px-4 text-[11px] font-semibold text-grey-400 uppercase tracking-wider">Location</th>
                    <th className="py-3 px-4 text-[11px] font-semibold text-grey-400 uppercase tracking-wider">Status</th>
                    <th className="py-3 px-4 text-[11px] font-semibold text-grey-400 uppercase tracking-wider">Added</th>
                    <th className="py-3 px-4 text-[11px] font-semibold text-grey-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((c) => {
                    const st = statusMeta(c.status);
                    return (
                      <tr key={c.id} className="border-b border-grey-100/60 hover:bg-grey-50/50 transition-colors">
                        <td className="py-3 px-4">
                          <p className="text-sm font-semibold text-navy">{c.name}</p>
                          <p className="text-xs text-grey-400">{c.phone}{c.email ? ' · ' + c.email : ''}</p>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-sm text-charcoal">{c.service}</p>
                          <p className="text-xs text-grey-400 capitalize">{c.jobType}</p>
                        </td>
                        <td className="py-3 px-4 text-sm text-charcoal">{c.location}</td>
                        <td className="py-3 px-4">
                          <span className={'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ' + st.color}>
                            {st.label}
                          </span>
                          {c.price !== null && c.price > 0 && (
                            <p className="text-[10px] text-grey-400 mt-0.5">{'£'}{c.price.toLocaleString()}</p>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-xs text-grey-400">{timeAgo(c.createdAt)}</p>
                          {c.lastContact && <p className="text-[10px] text-grey-300">Contacted {timeAgo(c.lastContact)}</p>}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <button onClick={() => openEdit(c)} title="Edit"
                              className="p-1.5 rounded hover:bg-grey-100 text-grey-400 hover:text-navy transition-colors">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                            </button>
                            {(c.phone || c.email) && (
                              <button onClick={() => setMsgCustomer(c)} title="Send Message"
                                className="p-1.5 rounded hover:bg-green-50 text-grey-400 hover:text-green-600 transition-colors">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                              </button>
                            )}
                            <button onClick={() => deleteCustomer(c.id)} title="Remove"
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

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-[10vh] px-4 overflow-y-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-4 mb-10">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-heading font-bold text-navy">{editingId ? 'Edit Job' : 'Add New Job'}</h2>
              <button type="button" onClick={() => setShowForm(false)} className="text-grey-400 hover:text-navy text-xl">&times;</button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-medium text-grey-500 mb-1">Customer Name *</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 border border-grey-200 rounded-lg text-sm focus:ring-2 focus:ring-gold/40 outline-none" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-medium text-grey-500 mb-1">Phone</label>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-grey-200 rounded-lg text-sm focus:ring-2 focus:ring-gold/40 outline-none" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-medium text-grey-500 mb-1">Email</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 border border-grey-200 rounded-lg text-sm focus:ring-2 focus:ring-gold/40 outline-none" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-medium text-grey-500 mb-1">Location / Area *</label>
                <input required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full px-3 py-2 border border-grey-200 rounded-lg text-sm focus:ring-2 focus:ring-gold/40 outline-none" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-medium text-grey-500 mb-1">Service *</label>
                <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full px-3 py-2 border border-grey-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-gold/40 outline-none">
                  {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-medium text-grey-500 mb-1">Job Type</label>
                <select value={form.jobType} onChange={(e) => setForm({ ...form, jobType: e.target.value })}
                  className="w-full px-3 py-2 border border-grey-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-gold/40 outline-none">
                  <option value="installation">Installation</option>
                  <option value="repair">Repair</option>
                  <option value="emergency">Emergency</option>
                  <option value="survey">Survey / Quote</option>
                </select>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-medium text-grey-500 mb-1">Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full px-3 py-2 border border-grey-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-gold/40 outline-none">
                  {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-medium text-grey-500 mb-1">Job Value <span className="text-grey-300">(optional)</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-400 text-sm">{'£'}</span>
                  <input type="number" step="0.01" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full pl-7 pr-3 py-2 border border-grey-200 rounded-lg text-sm focus:ring-2 focus:ring-gold/40 outline-none" placeholder="0.00" />
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-grey-500 mb-1">Notes</label>
                <textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-grey-200 rounded-lg text-sm focus:ring-2 focus:ring-gold/40 outline-none resize-none" placeholder="Any details about the job..." />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setShowForm(false)}
                className="flex-1 py-2.5 border border-grey-200 text-grey-500 text-sm font-semibold rounded-lg hover:bg-grey-50 transition-colors">
                Cancel
              </button>
              <button type="submit"
                className="flex-1 py-2.5 bg-navy text-white text-sm font-semibold rounded-lg hover:bg-navy/90 transition-colors">
                {editingId ? 'Save Changes' : 'Add Job'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Message Modal */}
      {msgCustomer && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-[10vh] px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-heading font-bold text-navy">Message {msgCustomer.name.split(' ')[0]}</h2>
              <button onClick={() => setMsgCustomer(null)} className="text-grey-400 hover:text-navy text-xl">&times;</button>
            </div>
            <p className="text-xs text-grey-400">{msgCustomer.phone}{msgCustomer.email ? ' · ' + msgCustomer.email : ''}</p>

            <div className="space-y-3">
              {/* Feedback template */}
              <div className="border border-grey-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-navy mb-3">Ask for Feedback</p>
                <div className="flex gap-2">
                  {msgCustomer.phone && (
                    <button onClick={() => { openWhatsApp(msgCustomer, 'feedback'); setMsgCustomer(null); }}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-[#25D366] text-white text-sm font-semibold rounded-lg hover:bg-[#20ba5a] transition-colors">
                      WhatsApp
                    </button>
                  )}
                  {msgCustomer.email && (
                    <button onClick={() => { openEmail(msgCustomer!, 'feedback'); setMsgCustomer(null); }}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-navy text-white text-sm font-semibold rounded-lg hover:bg-navy/90 transition-colors">
                      Email
                    </button>
                  )}
                </div>
              </div>

              {/* New work template */}
              <div className="border border-grey-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-navy mb-3">Check for New Work</p>
                <div className="flex gap-2">
                  {msgCustomer.phone && (
                    <button onClick={() => { openWhatsApp(msgCustomer, 'new_work'); setMsgCustomer(null); }}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-[#25D366] text-white text-sm font-semibold rounded-lg hover:bg-[#20ba5a] transition-colors">
                      WhatsApp
                    </button>
                  )}
                  {msgCustomer.email && (
                    <button onClick={() => { openEmail(msgCustomer!, 'new_work'); setMsgCustomer(null); }}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-navy text-white text-sm font-semibold rounded-lg hover:bg-navy/90 transition-colors">
                      Email
                    </button>
                  )}
                </div>
              </div>

              {/* Custom WhatsApp */}
              {msgCustomer.phone && (
                <div className="border border-grey-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-navy mb-3">Custom Message</p>
                  <button onClick={() => {
                    const phone = msgCustomer!.phone.replace(/[\s\-()]/g, '').replace(/^0/, '44');
                    window.open('https://wa.me/' + phone, '_blank');
                    markContacted(msgCustomer!.id);
                    setMsgCustomer(null);
                  }} className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-[#25D366] text-white text-sm font-semibold rounded-lg hover:bg-[#20ba5a] transition-colors">
                    Open WhatsApp Chat
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
