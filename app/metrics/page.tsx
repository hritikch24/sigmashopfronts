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
    ips: { ip: string; count: number }[];
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
  callClicks: {
    total: number;
    byPage: { page: string; count: number }[];
    daily: { date: string; count: number }[];
    recent: {
      session_id: string;
      phone: string;
      page: string;
      device: string;
      browser: string;
      ip: string;
      country: string;
      created_at: string;
    }[];
  };
}

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700 ring-blue-600/20',
  contacted: 'bg-amber-100 text-amber-700 ring-amber-600/20',
  quoted: 'bg-purple-100 text-purple-700 ring-purple-600/20',
  won: 'bg-emerald-100 text-emerald-700 ring-emerald-600/20',
  lost: 'bg-red-100 text-red-700 ring-red-600/20',
};

const STATUS_DOT: Record<string, string> = {
  new: 'bg-blue-500',
  contacted: 'bg-amber-500',
  quoted: 'bg-purple-500',
  won: 'bg-emerald-500',
  lost: 'bg-red-500',
};

function StatCard({ label, value, sub, icon, trend }: {
  label: string;
  value: string | number;
  sub?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}) {
  return (
    <div className="bg-white rounded-2xl border border-grey-200/60 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-grey-400">{label}</p>
        {icon && <div className="text-grey-300">{icon}</div>}
      </div>
      <p className="text-3xl font-heading font-bold text-navy tracking-tight">{value}</p>
      {sub && (
        <p className={`text-xs mt-1.5 font-medium ${
          trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-red-500' : 'text-grey-400'
        }`}>
          {sub}
        </p>
      )}
    </div>
  );
}

function SectionCard({ title, children, className = '' }: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white rounded-2xl border border-grey-200/60 overflow-hidden ${className}`}>
      <div className="px-6 py-4 border-b border-grey-100">
        <h2 className="font-heading font-bold text-navy text-sm">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
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
    <div className="space-y-3">
      {sliced.map((row, i) => {
        const val = Number(row[valueKey]) || 0;
        const pct = (val / max) * 100;
        return (
          <div key={i} className="group">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-grey-600 truncate max-w-[200px] group-hover:text-navy transition-colors" title={String(row[labelKey])}>
                {String(row[labelKey]) || '(direct)'}
              </span>
              <span className="text-sm font-semibold text-navy tabular-nums ml-3">{val.toLocaleString()}</span>
            </div>
            <div className="h-2 bg-grey-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${color} rounded-full transition-all duration-500`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
      {data.length === 0 && (
        <div className="text-center py-6">
          <p className="text-grey-400 text-sm">No data yet</p>
        </div>
      )}
    </div>
  );
}

function MiniChart({ data, valueKey, height = 80 }: {
  data: { date: string; [key: string]: unknown }[];
  valueKey: string;
  height?: number;
}) {
  if (data.length < 2) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <p className="text-grey-400 text-sm">Not enough data to chart</p>
      </div>
    );
  }

  const values = data.map((d) => Number(d[valueKey]) || 0);
  const max = Math.max(...values, 1);
  const total = values.reduce((a, b) => a + b, 0);
  const avg = Math.round(total / values.length);

  return (
    <div>
      <div className="flex items-end gap-[2px]" style={{ height }}>
        {values.map((v, i) => (
          <div
            key={i}
            className="flex-1 bg-gold/20 hover:bg-gold/60 rounded-t-sm transition-colors cursor-default relative group"
            style={{ height: `${Math.max((v / max) * 100, 3)}%` }}
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-navy text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
              {data[i].date.slice(5)}: {v}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-3 text-xs text-grey-400">
        <span>{data[0].date.slice(5)}</span>
        <span className="font-medium text-grey-500">Avg: {avg}/day</span>
        <span>{data[data.length - 1].date.slice(5)}</span>
      </div>
    </div>
  );
}

function LeadRow({ lead, onStatusChange, expanded, onToggle }: {
  lead: MetricsData['leads']['recent'][0];
  onStatusChange: (id: string, status: string) => void;
  expanded: boolean;
  onToggle: () => void;
}) {
  const date = new Date(lead.createdAt);
  const ago = getTimeAgo(date);

  return (
    <>
      <tr
        className="border-b border-grey-100/60 hover:bg-grey-50/50 transition-colors cursor-pointer"
        onClick={onToggle}
      >
        <td className="py-4 px-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-navy/10 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-navy">{lead.name.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <p className="font-semibold text-navy text-sm">{lead.name}</p>
              <p className="text-xs text-grey-400">{lead.email}</p>
            </div>
          </div>
        </td>
        <td className="py-4 px-4">
          <a href={`tel:${lead.phone}`} className="text-sm text-charcoal hover:text-gold transition-colors">
            {lead.phone}
          </a>
        </td>
        <td className="py-4 px-4">
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-grey-100 text-xs font-medium text-charcoal">
            {lead.service}
          </span>
        </td>
        <td className="py-4 px-4 text-sm text-charcoal">{lead.location}</td>
        <td className="py-4 px-4">
          <select
            value={lead.status}
            onChange={(e) => { e.stopPropagation(); onStatusChange(lead.id, e.target.value); }}
            onClick={(e) => e.stopPropagation()}
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ring-1 ring-inset border-0 cursor-pointer appearance-none ${STATUS_COLORS[lead.status] || 'bg-grey-100 text-grey-800 ring-grey-600/20'}`}
          >
            {['new', 'contacted', 'quoted', 'won', 'lost'].map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </td>
        <td className="py-4 px-4">
          <span className="text-xs text-grey-400" title={date.toLocaleString('en-GB')}>{ago}</span>
        </td>
        <td className="py-4 px-2">
          <svg className={`w-4 h-4 text-grey-400 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </td>
      </tr>
      {expanded && lead.message && (
        <tr className="border-b border-grey-100/60 bg-grey-50/30">
          <td colSpan={7} className="px-4 py-3">
            <div className="ml-12">
              <p className="text-xs font-semibold text-grey-500 uppercase tracking-wider mb-1">Message</p>
              <p className="text-sm text-charcoal leading-relaxed">{lead.message}</p>
              {lead.source && (
                <p className="text-xs text-grey-400 mt-2">Source: {lead.source}</p>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
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

function ViewsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function LeadsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function ConversionIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

export default function MetricsPage() {
  const [apiKey, setApiKey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<MetricsData | null>(null);
  const [period, setPeriod] = useState('30d');
  const [expandedLead, setExpandedLead] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'traffic' | 'leads' | 'calls'>('overview');

  useEffect(() => {
    const saved = sessionStorage.getItem('_sigma_metrics_key');
    if (saved) {
      setApiKey(saved);
      setAuthenticated(true);
    }
  }, []);

  const fetchMetrics = useCallback(async (key: string, p: string) => {
    setLoading(true);
    setError('');
    try {
      const param = p.endsWith('h') ? `hours=${p.slice(0, -1)}` : `days=${p.slice(0, -1)}`;
      const res = await fetch(`/api/metrics?${param}&key=${encodeURIComponent(key)}`);
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
      fetchMetrics(apiKey, period);
    }
  }, [authenticated, apiKey, period, fetchMetrics]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      fetchMetrics(apiKey.trim(), period);
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
      <div className="min-h-screen bg-gradient-to-br from-grey-50 to-grey-100 flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-xl shadow-navy/5 p-10 w-full max-w-sm border border-grey-200/50">
          <div className="w-14 h-14 bg-gradient-to-br from-navy to-navy-light rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg shadow-navy/20">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#d4a843" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="font-heading font-bold text-2xl text-navy text-center mb-1">Sigma Metrics</h1>
          <p className="text-grey-400 text-sm text-center mb-8">Enter your admin API key to continue</p>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Admin API key"
            className="w-full px-4 py-3.5 rounded-xl border border-grey-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold mb-4 transition-all"
            autoFocus
          />
          {error && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 text-red-600 text-xs mb-4">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={!apiKey.trim() || loading}
            className="w-full bg-gold hover:bg-gold-light text-navy font-bold py-3.5 rounded-xl transition-all disabled:opacity-50 text-sm"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                Verifying...
              </span>
            ) : (
              'Access Dashboard'
            )}
          </button>
        </form>
      </div>
    );
  }

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-grey-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-grey-500 text-sm font-medium">Loading metrics...</p>
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

  const newLeads = data.leads.byStatus.find((s) => s.status === 'new')?.count || 0;

  const periodLabels: Record<string, string> = {
    '1h': 'Last hour',
    '6h': 'Last 6 hours',
    '24h': 'Last 24 hours',
    '7d': 'Last 7 days',
    '14d': 'Last 14 days',
    '30d': 'Last 30 days',
    '90d': 'Last 90 days',
    '365d': 'Last year',
  };

  return (
    <div className="min-h-screen bg-grey-50">
      {/* Header */}
      <header className="bg-navy sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-gold/20 rounded-lg flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#d4a843" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="font-heading font-bold text-gold text-lg hidden sm:block">Sigma Metrics</span>
              </div>
              {loading && (
                <div className="w-4 h-4 border-2 border-gold/50 border-t-gold rounded-full animate-spin" />
              )}
            </div>

            {/* Tabs */}
            <nav className="hidden md:flex items-center gap-1 bg-navy-light/50 rounded-lg p-1">
              {(['overview', 'traffic', 'leads', 'calls'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-gold text-navy shadow-sm'
                      : 'text-grey-300 hover:text-white'
                  }`}
                >
                  {tab === 'calls' ? 'Call Clicks' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="bg-white/10 text-white text-sm border border-white/10 rounded-lg px-3 py-2 focus:ring-gold focus:ring-2 focus:outline-none backdrop-blur-sm"
              >
                <option value="1h" className="text-navy">Last 1 hour</option>
                <option value="6h" className="text-navy">Last 6 hours</option>
                <option value="24h" className="text-navy">Last 24 hours</option>
                <option value="7d" className="text-navy">Last 7 days</option>
                <option value="14d" className="text-navy">Last 14 days</option>
                <option value="30d" className="text-navy">Last 30 days</option>
                <option value="90d" className="text-navy">Last 90 days</option>
                <option value="365d" className="text-navy">Last year</option>
              </select>
              <button
                onClick={() => fetchMetrics(apiKey, period)}
                className="p-2 text-grey-300 hover:text-gold rounded-lg hover:bg-white/5 transition-all"
                title="Refresh"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
              </button>
              <button
                onClick={() => {
                  sessionStorage.removeItem('_sigma_metrics_key');
                  setAuthenticated(false);
                  setData(null);
                  setApiKey('');
                }}
                className="p-2 text-grey-400 hover:text-red-400 rounded-lg hover:bg-white/5 transition-all"
                title="Sign out"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Tabs */}
      <div className="md:hidden sticky top-16 z-40 bg-white border-b border-grey-200">
        <div className="flex">
          {(['overview', 'traffic', 'leads', 'calls'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-semibold transition-all border-b-2 ${
                activeTab === tab
                  ? 'text-navy border-gold'
                  : 'text-grey-400 border-transparent'
              }`}
            >
              {tab === 'calls' ? 'Calls' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Period badge */}
        <div className="flex items-center gap-3 mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy/5 text-navy text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {periodLabels[period] || period}
          </span>
          {newLeads > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
              {newLeads} new lead{newLeads !== 1 ? 's' : ''} awaiting action
            </span>
          )}
        </div>

        {/* Overview / Traffic tab */}
        {(activeTab === 'overview' || activeTab === 'traffic') && (
          <div className="space-y-8">
            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <StatCard label="Page Views" value={data.traffic.totalViews.toLocaleString()} sub={periodLabels[period]} icon={<ViewsIcon />} />
              <StatCard label="Sessions" value={data.traffic.uniqueSessions.toLocaleString()} icon={<UsersIcon />} />
              <StatCard label="Pages / Session" value={pagesPerSession} />
              <StatCard label="Total Leads" value={data.leads.total} sub={periodLabels[period]} icon={<LeadsIcon />} />
              <StatCard label="Conversion" value={`${conversionRate}%`} sub="Leads / Sessions" icon={<ConversionIcon />} />
              <StatCard label="Call Clicks" value={data.callClicks?.total || 0} sub="Phone taps" icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              } />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SectionCard title="Daily Page Views">
                <MiniChart data={data.traffic.daily} valueKey="views" height={120} />
              </SectionCard>
              <SectionCard title="Daily Leads">
                <MiniChart data={data.traffic.daily.length > 0 ? data.leads.daily : []} valueKey="count" height={120} />
              </SectionCard>
            </div>

            {/* Traffic breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SectionCard title="Top Pages">
                <BarChart data={data.traffic.topPages} labelKey="path" valueKey="views" />
              </SectionCard>
              <SectionCard title="Referrers">
                <BarChart data={data.traffic.topReferrers} labelKey="referrer" valueKey="views" color="bg-blue-500" />
              </SectionCard>
              <SectionCard title="UTM Sources">
                <BarChart data={data.traffic.utmSources} labelKey="utm_source" valueKey="count" color="bg-emerald-500" />
              </SectionCard>
            </div>

            {activeTab === 'traffic' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <SectionCard title="Devices">
                  <BarChart data={data.traffic.devices} labelKey="device" valueKey="count" />
                </SectionCard>
                <SectionCard title="Browsers">
                  <BarChart data={data.traffic.browsers} labelKey="browser" valueKey="count" color="bg-indigo-500" />
                </SectionCard>
                <SectionCard title="Countries">
                  <BarChart data={data.traffic.countries} labelKey="country" valueKey="count" color="bg-sky-500" />
                </SectionCard>
                <SectionCard title="Top IPs">
                  <BarChart data={data.traffic.ips} labelKey="ip" valueKey="count" color="bg-violet-500" />
                </SectionCard>
              </div>
            )}
          </div>
        )}

        {/* Leads tab */}
        {(activeTab === 'overview' || activeTab === 'leads') && (
          <div className={`space-y-6 ${activeTab === 'overview' ? 'mt-8' : ''}`}>
            {activeTab === 'leads' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <StatCard label="Total Leads" value={data.leads.total} icon={<LeadsIcon />} />
                <StatCard label="New" value={newLeads} trend={newLeads > 0 ? 'up' : 'neutral'} />
                <StatCard label="Conversion" value={`${conversionRate}%`} icon={<ConversionIcon />} />
                <StatCard
                  label="Won"
                  value={data.leads.byStatus.find((s) => s.status === 'won')?.count || 0}
                  trend="up"
                />
              </div>
            )}

            {/* Lead breakdown charts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <SectionCard title="By Status">
                <div className="space-y-3">
                  {data.leads.byStatus.map((row) => (
                    <div key={row.status} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${STATUS_DOT[row.status] || 'bg-grey-400'}`} />
                        <span className="text-sm text-charcoal">{row.status.charAt(0).toUpperCase() + row.status.slice(1)}</span>
                      </div>
                      <span className="font-bold text-navy text-sm tabular-nums">{row.count}</span>
                    </div>
                  ))}
                  {data.leads.byStatus.length === 0 && <p className="text-grey-400 text-sm text-center py-4">No leads yet</p>}
                </div>
              </SectionCard>
              <SectionCard title="By Service">
                <BarChart data={data.leads.byService} labelKey="service" valueKey="count" />
              </SectionCard>
              <SectionCard title="By Location">
                <BarChart data={data.leads.byLocation} labelKey="location" valueKey="count" color="bg-blue-500" />
              </SectionCard>
              <SectionCard title="By Source">
                <BarChart data={data.leads.bySource} labelKey="source" valueKey="count" color="bg-emerald-500" />
              </SectionCard>
            </div>

            {/* Recent leads table */}
            <div className="bg-white rounded-2xl border border-grey-200/60 overflow-hidden">
              <div className="px-6 py-5 border-b border-grey-100 flex items-center justify-between">
                <div>
                  <h2 className="font-heading font-bold text-navy">Recent Leads</h2>
                  <p className="text-xs text-grey-400 mt-0.5">{data.leads.recent.length} shown &middot; Click row to expand</p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-grey-50/80">
                      <th className="py-3 px-4 text-[11px] font-semibold text-grey-400 uppercase tracking-wider">Contact</th>
                      <th className="py-3 px-4 text-[11px] font-semibold text-grey-400 uppercase tracking-wider">Phone</th>
                      <th className="py-3 px-4 text-[11px] font-semibold text-grey-400 uppercase tracking-wider">Service</th>
                      <th className="py-3 px-4 text-[11px] font-semibold text-grey-400 uppercase tracking-wider">Location</th>
                      <th className="py-3 px-4 text-[11px] font-semibold text-grey-400 uppercase tracking-wider">Status</th>
                      <th className="py-3 px-4 text-[11px] font-semibold text-grey-400 uppercase tracking-wider">When</th>
                      <th className="py-3 px-2 w-8"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.leads.recent.map((lead) => (
                      <LeadRow
                        key={lead.id}
                        lead={lead}
                        onStatusChange={handleStatusChange}
                        expanded={expandedLead === lead.id}
                        onToggle={() => setExpandedLead(expandedLead === lead.id ? null : lead.id)}
                      />
                    ))}
                    {data.leads.recent.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-12 text-center">
                          <div className="text-grey-300 mb-2">
                            <svg className="w-10 h-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                              <circle cx="9" cy="7" r="4" />
                            </svg>
                          </div>
                          <p className="text-grey-400 text-sm">No leads in this period</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {/* Call Clicks tab */}
        {(activeTab === 'overview' || activeTab === 'calls') && data.callClicks && (
          <div className={`space-y-6 ${activeTab === 'overview' ? 'mt-8' : ''}`}>
            {/* Call stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard
                label="Call Clicks"
                value={data.callClicks.total}
                sub={periodLabels[period]}
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                }
              />
              <StatCard
                label="Calls / Day"
                value={data.callClicks.daily.length > 0
                  ? (data.callClicks.total / data.callClicks.daily.length).toFixed(1)
                  : '0'}
                sub="Average"
              />
              <StatCard
                label="Call Rate"
                value={data.traffic.uniqueSessions > 0
                  ? `${((data.callClicks.total / data.traffic.uniqueSessions) * 100).toFixed(1)}%`
                  : '0%'}
                sub="Clicks / Sessions"
              />
              <StatCard
                label="Top Page"
                value={data.callClicks.byPage[0]?.page || '—'}
                sub={data.callClicks.byPage[0] ? `${data.callClicks.byPage[0].count} clicks` : ''}
              />
            </div>

            {/* Call charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SectionCard title="Daily Call Clicks">
                <MiniChart data={data.callClicks.daily} valueKey="count" height={120} />
              </SectionCard>
              <SectionCard title="Calls by Page">
                <BarChart data={data.callClicks.byPage} labelKey="page" valueKey="count" color="bg-orange-500" />
              </SectionCard>
            </div>

            {/* Recent call clicks table */}
            <div className="bg-white rounded-2xl border border-grey-200/60 overflow-hidden">
              <div className="px-6 py-5 border-b border-grey-100">
                <h2 className="font-heading font-bold text-navy">Recent Call Clicks</h2>
                <p className="text-xs text-grey-400 mt-0.5">
                  {data.callClicks.recent.length} shown &middot; Each row = someone tapped/clicked a phone number
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-grey-50/80">
                      <th className="py-3 px-4 text-[11px] font-semibold text-grey-400 uppercase tracking-wider">Phone Clicked</th>
                      <th className="py-3 px-4 text-[11px] font-semibold text-grey-400 uppercase tracking-wider">Page</th>
                      <th className="py-3 px-4 text-[11px] font-semibold text-grey-400 uppercase tracking-wider">Device</th>
                      <th className="py-3 px-4 text-[11px] font-semibold text-grey-400 uppercase tracking-wider">Browser</th>
                      <th className="py-3 px-4 text-[11px] font-semibold text-grey-400 uppercase tracking-wider">IP</th>
                      <th className="py-3 px-4 text-[11px] font-semibold text-grey-400 uppercase tracking-wider">Country</th>
                      <th className="py-3 px-4 text-[11px] font-semibold text-grey-400 uppercase tracking-wider">When</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.callClicks.recent.map((click, i) => {
                      const date = new Date(click.created_at);
                      return (
                        <tr key={i} className="border-b border-grey-100/60 hover:bg-grey-50/50 transition-colors">
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-navy">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-emerald-500 flex-shrink-0">
                                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                              </svg>
                              {click.phone}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-charcoal max-w-[200px] truncate">{click.page}</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2 py-0.5 rounded bg-grey-100 text-xs font-medium text-grey-600">
                              {click.device || '—'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-charcoal">{click.browser || '—'}</td>
                          <td className="py-3 px-4 text-xs text-grey-500 font-mono">{click.ip || '—'}</td>
                          <td className="py-3 px-4 text-sm text-charcoal">{click.country || '—'}</td>
                          <td className="py-3 px-4 text-xs text-grey-400" title={date.toLocaleString('en-GB')}>
                            {getTimeAgo(date)}
                          </td>
                        </tr>
                      );
                    })}
                    {data.callClicks.recent.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-12 text-center">
                          <div className="text-grey-300 mb-2">
                            <svg className="w-10 h-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                            </svg>
                          </div>
                          <p className="text-grey-400 text-sm">No call clicks recorded yet</p>
                          <p className="text-grey-300 text-xs mt-1">Clicks will appear here when visitors tap a phone number</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
