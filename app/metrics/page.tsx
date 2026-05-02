'use client';

import { useState, useEffect, useCallback } from 'react';

interface MetricsData {
  period: { days: number; since: string };
  traffic: {
    totalViews: number;
    uniqueSessions: number;
    topPages: { path: string; views: number }[];
    topReferrers: { referrer: string; views: number }[];
    devices: { device: string; count: number }[];
    browsers: { browser: string; count: number }[];
    countries: { country: string; count: number }[];
    utmSources: { utm_source: string; count: number }[];
    daily: { date: string; views: number }[];
  };
  leads: {
    total: number;
    byStatus: { status: string; count: number }[];
    byService: { service: string; count: number }[];
    byLocation: { location: string; count: number }[];
    bySource: { source: string; count: number }[];
    daily: { date: string; count: number }[];
    recent: {
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
    }[];
  };
}

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  quoted: 'bg-purple-100 text-purple-800',
  won: 'bg-green-100 text-green-800',
  lost: 'bg-red-100 text-red-800',
};

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-white rounded-xl border border-grey-200 p-5">
      <p className="text-sm text-grey-500 font-medium">{label}</p>
      <p className="text-3xl font-heading font-bold text-navy mt-1">{value}</p>
      {sub && <p className="text-xs text-grey-400 mt-1">{sub}</p>}
    </div>
  );
}

function BarChart({ data, labelKey, valueKey, maxBars = 10, color = 'bg-gold' }: {
  data: Record<string, unknown>[];
  labelKey: string;
  valueKey: string;
  maxBars?: number;
  color?: string;
}) {
  const sliced = data.slice(0, maxBars);
  const max = Math.max(...sliced.map((d) => Number(d[valueKey]) || 0), 1);

  return (
    <div className="space-y-2">
      {sliced.map((row, i) => {
        const val = Number(row[valueKey]) || 0;
        const pct = (val / max) * 100;
        return (
          <div key={i} className="flex items-center gap-3 text-sm">
            <span className="w-36 truncate text-grey-600 flex-shrink-0" title={String(row[labelKey])}>
              {String(row[labelKey])}
            </span>
            <div className="flex-1 h-6 bg-grey-100 rounded overflow-hidden">
              <div className={`h-full ${color} rounded`} style={{ width: `${pct}%` }} />
            </div>
            <span className="w-12 text-right font-medium text-navy flex-shrink-0">{val}</span>
          </div>
        );
      })}
      {data.length === 0 && <p className="text-grey-400 text-sm">No data yet</p>}
    </div>
  );
}

function MiniChart({ data, valueKey, height = 60 }: {
  data: { date: string; [key: string]: unknown }[];
  valueKey: string;
  height?: number;
}) {
  if (data.length < 2) return <p className="text-grey-400 text-sm">Not enough data to chart</p>;

  const values = data.map((d) => Number(d[valueKey]) || 0);
  const max = Math.max(...values, 1);
  const w = 100 / values.length;

  return (
    <div className="flex items-end gap-px" style={{ height }}>
      {values.map((v, i) => (
        <div
          key={i}
          className="bg-gold/80 hover:bg-gold rounded-t transition-colors cursor-default"
          style={{ width: `${w}%`, height: `${Math.max((v / max) * 100, 2)}%` }}
          title={`${data[i].date}: ${v}`}
        />
      ))}
    </div>
  );
}

function LeadRow({ lead, onStatusChange }: {
  lead: MetricsData['leads']['recent'][0];
  onStatusChange: (id: string, status: string) => void;
}) {
  const date = new Date(lead.createdAt);
  const ago = getTimeAgo(date);

  return (
    <tr className="border-b border-grey-100 hover:bg-grey-50 transition-colors">
      <td className="py-3 px-3">
        <p className="font-semibold text-navy text-sm">{lead.name}</p>
        <p className="text-xs text-grey-500">{lead.email}</p>
      </td>
      <td className="py-3 px-3 text-sm text-charcoal">{lead.phone}</td>
      <td className="py-3 px-3 text-sm text-charcoal">{lead.service}</td>
      <td className="py-3 px-3 text-sm text-charcoal">{lead.location}</td>
      <td className="py-3 px-3">
        <select
          value={lead.status}
          onChange={(e) => onStatusChange(lead.id, e.target.value)}
          className={`text-xs font-semibold px-2 py-1 rounded-full border-0 cursor-pointer ${STATUS_COLORS[lead.status] || 'bg-grey-100 text-grey-800'}`}
        >
          {['new', 'contacted', 'quoted', 'won', 'lost'].map((s) => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      </td>
      <td className="py-3 px-3 text-xs text-grey-500" title={date.toLocaleString('en-GB')}>{ago}</td>
    </tr>
  );
}

function getTimeAgo(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export default function MetricsPage() {
  const [apiKey, setApiKey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<MetricsData | null>(null);
  const [days, setDays] = useState(30);

  useEffect(() => {
    const saved = sessionStorage.getItem('_sigma_metrics_key');
    if (saved) {
      setApiKey(saved);
      setAuthenticated(true);
    }
  }, []);

  const fetchMetrics = useCallback(async (key: string, period: number) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/metrics?days=${period}&key=${encodeURIComponent(key)}`);
      if (res.status === 401) {
        setError('Invalid API key');
        setAuthenticated(false);
        sessionStorage.removeItem('_sigma_metrics_key');
        return;
      }
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      setData(json);
      setAuthenticated(true);
      sessionStorage.setItem('_sigma_metrics_key', key);
    } catch {
      setError('Failed to load metrics. Check your connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authenticated && apiKey) {
      fetchMetrics(apiKey, days);
    }
  }, [authenticated, apiKey, days, fetchMetrics]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      fetchMetrics(apiKey.trim(), days);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok && data) {
        setData({
          ...data,
          leads: {
            ...data.leads,
            recent: data.leads.recent.map((l) => (l.id === id ? { ...l, status } : l)),
          },
        });
      }
    } catch {
      // Silently fail — they can retry
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-grey-50 flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center mb-4 mx-auto">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#d4a843" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="font-heading font-bold text-xl text-navy text-center mb-1">Sigma Metrics</h1>
          <p className="text-grey-500 text-sm text-center mb-6">Enter your admin API key to continue</p>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Admin API key"
            className="w-full px-4 py-3 rounded-lg border border-grey-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold mb-3"
            autoFocus
          />
          {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
          <button
            type="submit"
            disabled={!apiKey.trim() || loading}
            className="w-full btn-gold py-3 disabled:opacity-50"
          >
            {loading ? 'Checking...' : 'Access Dashboard'}
          </button>
        </form>
      </div>
    );
  }

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-grey-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-3 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-grey-500 text-sm">Loading metrics...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const conversionRate = data.traffic.uniqueSessions > 0
    ? ((data.leads.total / data.traffic.uniqueSessions) * 100).toFixed(1)
    : '0';

  const pagesPerSession = data.traffic.uniqueSessions > 0
    ? (data.traffic.totalViews / data.traffic.uniqueSessions).toFixed(1)
    : '0';

  return (
    <div className="min-h-screen bg-grey-50">
      <header className="bg-navy border-b border-navy-light sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-heading font-bold text-gold text-lg">Sigma Metrics</span>
            {loading && (
              <div className="w-4 h-4 border-2 border-gold border-t-transparent rounded-full animate-spin" />
            )}
          </div>
          <div className="flex items-center gap-3">
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="bg-navy-light text-white text-sm border border-navy-light rounded-lg px-3 py-1.5 focus:ring-gold focus:ring-2 focus:outline-none"
            >
              <option value={7}>Last 7 days</option>
              <option value={14}>Last 14 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
              <option value={365}>Last year</option>
            </select>
            <button
              onClick={() => fetchMetrics(apiKey, days)}
              className="text-gold hover:text-gold-light text-sm font-medium transition-colors"
            >
              Refresh
            </button>
            <button
              onClick={() => {
                sessionStorage.removeItem('_sigma_metrics_key');
                setAuthenticated(false);
                setData(null);
                setApiKey('');
              }}
              className="text-grey-400 hover:text-white text-sm transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Top stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard label="Page Views" value={data.traffic.totalViews.toLocaleString()} sub={`${days}d period`} />
          <StatCard label="Unique Sessions" value={data.traffic.uniqueSessions.toLocaleString()} />
          <StatCard label="Pages / Session" value={pagesPerSession} />
          <StatCard label="Total Leads" value={data.leads.total} sub={`${days}d period`} />
          <StatCard label="Conversion Rate" value={`${conversionRate}%`} sub="Leads / Sessions" />
          <StatCard
            label="New Leads"
            value={data.leads.byStatus.find((s) => s.status === 'new')?.count || 0}
            sub="Awaiting action"
          />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-grey-200 p-5">
            <h2 className="font-heading font-bold text-navy text-sm mb-4">Daily Page Views</h2>
            <MiniChart data={data.traffic.daily} valueKey="views" height={100} />
          </div>
          <div className="bg-white rounded-xl border border-grey-200 p-5">
            <h2 className="font-heading font-bold text-navy text-sm mb-4">Daily Leads</h2>
            <MiniChart data={data.leads.daily} valueKey="count" height={100} />
          </div>
        </div>

        {/* Traffic breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-grey-200 p-5">
            <h2 className="font-heading font-bold text-navy text-sm mb-4">Top Pages</h2>
            <BarChart data={data.traffic.topPages} labelKey="path" valueKey="views" />
          </div>
          <div className="bg-white rounded-xl border border-grey-200 p-5">
            <h2 className="font-heading font-bold text-navy text-sm mb-4">Referrers</h2>
            <BarChart data={data.traffic.topReferrers} labelKey="referrer" valueKey="views" color="bg-navy" />
          </div>
          <div className="bg-white rounded-xl border border-grey-200 p-5">
            <h2 className="font-heading font-bold text-navy text-sm mb-4">UTM Sources</h2>
            <BarChart data={data.traffic.utmSources} labelKey="utm_source" valueKey="count" color="bg-green-500" />
          </div>
        </div>

        {/* Device / Browser / Country */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-grey-200 p-5">
            <h2 className="font-heading font-bold text-navy text-sm mb-4">Devices</h2>
            <BarChart data={data.traffic.devices} labelKey="device" valueKey="count" />
          </div>
          <div className="bg-white rounded-xl border border-grey-200 p-5">
            <h2 className="font-heading font-bold text-navy text-sm mb-4">Browsers</h2>
            <BarChart data={data.traffic.browsers} labelKey="browser" valueKey="count" color="bg-navy-light" />
          </div>
          <div className="bg-white rounded-xl border border-grey-200 p-5">
            <h2 className="font-heading font-bold text-navy text-sm mb-4">Countries</h2>
            <BarChart data={data.traffic.countries} labelKey="country" valueKey="count" color="bg-blue-500" />
          </div>
        </div>

        {/* Leads breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl border border-grey-200 p-5">
            <h2 className="font-heading font-bold text-navy text-sm mb-4">Leads by Status</h2>
            <div className="space-y-2">
              {data.leads.byStatus.map((row) => (
                <div key={row.status} className="flex items-center justify-between">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[row.status] || 'bg-grey-100 text-grey-700'}`}>
                    {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                  </span>
                  <span className="font-bold text-navy text-sm">{row.count}</span>
                </div>
              ))}
              {data.leads.byStatus.length === 0 && <p className="text-grey-400 text-sm">No leads yet</p>}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-grey-200 p-5">
            <h2 className="font-heading font-bold text-navy text-sm mb-4">Leads by Service</h2>
            <BarChart data={data.leads.byService} labelKey="service" valueKey="count" />
          </div>
          <div className="bg-white rounded-xl border border-grey-200 p-5">
            <h2 className="font-heading font-bold text-navy text-sm mb-4">Leads by Location</h2>
            <BarChart data={data.leads.byLocation} labelKey="location" valueKey="count" color="bg-navy" />
          </div>
          <div className="bg-white rounded-xl border border-grey-200 p-5">
            <h2 className="font-heading font-bold text-navy text-sm mb-4">Leads by Source</h2>
            <BarChart data={data.leads.bySource} labelKey="source" valueKey="count" color="bg-green-500" />
          </div>
        </div>

        {/* Recent leads table */}
        <div className="bg-white rounded-xl border border-grey-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-grey-100 flex items-center justify-between">
            <h2 className="font-heading font-bold text-navy">Recent Leads</h2>
            <span className="text-xs text-grey-400">{data.leads.recent.length} shown</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-grey-50">
                <tr>
                  <th className="py-2.5 px-3 text-xs font-semibold text-grey-500 uppercase">Contact</th>
                  <th className="py-2.5 px-3 text-xs font-semibold text-grey-500 uppercase">Phone</th>
                  <th className="py-2.5 px-3 text-xs font-semibold text-grey-500 uppercase">Service</th>
                  <th className="py-2.5 px-3 text-xs font-semibold text-grey-500 uppercase">Location</th>
                  <th className="py-2.5 px-3 text-xs font-semibold text-grey-500 uppercase">Status</th>
                  <th className="py-2.5 px-3 text-xs font-semibold text-grey-500 uppercase">When</th>
                </tr>
              </thead>
              <tbody>
                {data.leads.recent.map((lead) => (
                  <LeadRow key={lead.id} lead={lead} onStatusChange={handleStatusChange} />
                ))}
                {data.leads.recent.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-grey-400 text-sm">
                      No leads in this period
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
