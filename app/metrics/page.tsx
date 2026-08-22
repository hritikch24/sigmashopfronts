'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';

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
    byAction: { action: string; count: number }[];
    daily: { date: string; count: number }[];
    recent: {
      action: string;
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
  sources?: {
    bySource: { source: string; count: number }[];
    landings: { path: string; source: string; sessions: number }[];
  };
  dropOff?: {
    funnel: {
      sessions: number;
      engaged: number;
      saw_offer: number;
      reached_convert: number;
      acted: number;
    } | null;
    exitPages: { path: string; views: number; exits: number }[];
    entryPages: { path: string; sessions: number; bounced: number }[];
  };
  heatmaps?: {
    views: HeatCell[];
    leads: HeatCell[];
    calls: HeatCell[];
  };
}

interface HeatCell {
  dow: number;
  hour: number;
  count: number;
}

/* ── Status styling (dark-mode safe) ────────────────────────────────── */
const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-500/15 text-blue-400 ring-blue-500/25',
  contacted: 'bg-amber-500/15 text-amber-400 ring-amber-500/25',
  quoted: 'bg-purple-500/15 text-purple-400 ring-purple-500/25',
  won: 'bg-emerald-500/15 text-emerald-400 ring-emerald-500/25',
  lost: 'bg-red-500/15 text-red-400 ring-red-500/25',
};

const STATUS_DOT: Record<string, string> = {
  new: 'bg-blue-400',
  contacted: 'bg-amber-400',
  quoted: 'bg-purple-400',
  won: 'bg-emerald-400',
  lost: 'bg-red-400',
};

const BAR_GRADIENTS: Record<string, [string, string]> = {
  gold:    ['#f0b429', '#d4960f'],
  blue:    ['#3b82f6', '#2563eb'],
  emerald: ['#10b981', '#059669'],
  orange:  ['#f97316', '#ea580c'],
  indigo:  ['#6366f1', '#4f46e5'],
  sky:     ['#0ea5e9', '#0284c7'],
  violet:  ['#8b5cf6', '#7c3aed'],
  amber:   ['#ffaa00', '#cc8800'],
  rose:    ['#ff3d6e', '#e6365f'],
};

/* ── Icons ──────────────────────────────────────────────────────────── */
const icons = {
  eye: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  users: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  leads: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" />
    </svg>
  ),
  trend: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  phone: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  refresh: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
  ),
  logout: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  sparkle: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
    </svg>
  ),
  mail: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  chevron: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  ),
};

/* ── Reusable Components ────────────────────────────────────────────── */
function GlassCard({ children, className = '', hover = true }: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div className={`
      relative rounded-2xl border border-white/[0.08]
      bg-white/[0.06] backdrop-blur-xl
      ${hover ? 'hover:border-gold/20 hover:bg-white/[0.09] transition-all duration-300' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
}

function StatCard({ label, value, sub, icon, accent = false }: {
  label: string;
  value: string | number;
  sub?: string;
  icon?: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <GlassCard className="p-5">
      <div className="flex items-start justify-between mb-3">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">{label}</p>
        {icon && <div className="text-zinc-500">{icon}</div>}
      </div>
      <p className={`text-3xl font-heading font-bold tracking-tight ${accent ? 'text-gold' : 'text-white'}`}>
        {value}
      </p>
      {sub && <p className="text-xs mt-1.5 text-zinc-500">{sub}</p>}
    </GlassCard>
  );
}

function SectionCard({ title, children, className = '' }: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <GlassCard className={`overflow-hidden ${className}`} hover={false}>
      <div className="px-5 py-4 border-b border-white/[0.07]">
        <h2 className="font-heading font-semibold text-white text-sm tracking-wide">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </GlassCard>
  );
}

/* ── Drop-off ──────────────────────────────────────────────────────────
   Every stage is counted per session, so these numbers describe people
   rather than page loads. The gap between two bars is the leak.          */
function Funnel({ funnel }: { funnel: NonNullable<NonNullable<MetricsData['dropOff']>['funnel']> }) {
  const stages = [
    { key: 'sessions', label: 'Visited the site', value: funnel.sessions, note: 'All sessions in this period' },
    { key: 'engaged', label: 'Looked at a 2nd page', value: funnel.engaged, note: 'Did not bounce off the landing page' },
    { key: 'saw_offer', label: 'Reached a service or area page', value: funnel.saw_offer, note: 'Found something relevant to them' },
    { key: 'reached_convert', label: 'Opened quote or contact', value: funnel.reached_convert, note: 'Showed real intent' },
    { key: 'acted', label: 'Tapped call or WhatsApp', value: funnel.acted, note: 'Actually made contact' },
  ];
  const top = Math.max(funnel.sessions, 1);

  return (
    <div className="space-y-1">
      {stages.map((s, i) => {
        const prev = i === 0 ? null : stages[i - 1].value;
        const lost = prev === null ? 0 : prev - s.value;
        const dropPct = prev && prev > 0 ? (lost / prev) * 100 : 0;
        const widthPct = (s.value / top) * 100;
        const ofTotal = top > 0 ? (s.value / top) * 100 : 0;
        // Anything shedding more than half its remaining visitors is the story.
        const severe = dropPct >= 50;

        return (
          <div key={s.key}>
            {prev !== null && (
              <div className="flex items-center gap-2 py-1 pl-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2.5" className={severe ? 'text-red-400' : 'text-grey-500'} aria-hidden="true">
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
                <span className={`text-xs font-semibold ${severe ? 'text-red-400' : 'text-grey-500'}`}>
                  {lost.toLocaleString()} lost here ({dropPct.toFixed(0)}%)
                </span>
              </div>
            )}
            <div className="relative overflow-hidden rounded-lg border border-white/[0.07] bg-white/[0.02]">
              <div
                className="absolute inset-y-0 left-0 bg-gold/20"
                style={{ width: `${Math.max(widthPct, 1.5)}%` }}
                aria-hidden="true"
              />
              <div className="relative flex items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{s.label}</p>
                  <p className="truncate text-xs text-grey-500">{s.note}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="font-heading text-lg font-bold text-white tabular-nums">
                    {s.value.toLocaleString()}
                  </p>
                  <p className="text-[11px] text-grey-500 tabular-nums">{ofTotal.toFixed(1)}% of all</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Weekday x hour grid. Row 0 is Sunday, matching Postgres EXTRACT(DOW). */
function Heatmap({ cells, accent = 'gold' }: { cells: HeatCell[]; accent?: 'gold' | 'emerald' }) {
  const grid = new Map<string, number>();
  let max = 0;
  for (const c of cells) {
    grid.set(`${c.dow}-${c.hour}`, c.count);
    if (c.count > max) max = c.count;
  }
  if (max === 0) return <p className="text-grey-500 text-sm">No data for this period yet</p>;

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const rgb = accent === 'emerald' ? '52, 211, 153' : '201, 168, 76';

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[560px]">
        <div className="mb-1 flex gap-[2px] pl-9">
          {Array.from({ length: 24 }, (_, h) => (
            <div key={h} className="flex-1 text-center text-[9px] text-grey-500 tabular-nums">
              {h % 3 === 0 ? h : ''}
            </div>
          ))}
        </div>
        {days.map((day, d) => (
          <div key={day} className="mb-[2px] flex items-center gap-[2px]">
            <div className="w-9 flex-shrink-0 text-[10px] text-grey-500">{day}</div>
            {Array.from({ length: 24 }, (_, h) => {
              const v = grid.get(`${d}-${h}`) ?? 0;
              const intensity = v === 0 ? 0 : 0.12 + (v / max) * 0.88;
              return (
                <div
                  key={h}
                  className="h-6 flex-1 rounded-[2px] border border-white/[0.04]"
                  style={{ background: v === 0 ? 'rgba(255,255,255,0.02)' : `rgba(${rgb}, ${intensity})` }}
                  title={`${day} ${String(h).padStart(2, '0')}:00 — ${v}`}
                />
              );
            })}
          </div>
        ))}
        <div className="mt-2 flex items-center justify-end gap-2 text-[10px] text-grey-500">
          <span>0</span>
          {[0.15, 0.35, 0.6, 0.85, 1].map((f) => (
            <div key={f} className="h-3 w-5 rounded-[2px]" style={{ background: `rgba(${rgb}, ${f})` }} />
          ))}
          <span className="tabular-nums">{max}</span>
        </div>
      </div>
    </div>
  );
}

/** Pages ranked by how many sessions ended there. */
function LeakTable({ rows }: { rows: { path: string; views: number; exits: number }[] }) {
  if (!rows.length) return <p className="text-grey-500 text-sm">Not enough data yet</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-white/[0.07]">
            <th className="pb-2 text-[11px] font-semibold uppercase tracking-wider text-grey-500">Page</th>
            <th className="pb-2 text-right text-[11px] font-semibold uppercase tracking-wider text-grey-500">Views</th>
            <th className="pb-2 text-right text-[11px] font-semibold uppercase tracking-wider text-grey-500">Left here</th>
            <th className="pb-2 text-right text-[11px] font-semibold uppercase tracking-wider text-grey-500">Exit rate</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const rate = r.views > 0 ? (r.exits / r.views) * 100 : 0;
            const bad = rate >= 70 && r.views >= 10;
            return (
              <tr key={r.path} className="border-b border-white/[0.04]">
                <td className="py-2 pr-3 text-sm text-grey-300">
                  <span className="block max-w-[280px] truncate" title={r.path}>{r.path}</span>
                </td>
                <td className="py-2 text-right text-sm text-grey-400 tabular-nums">{r.views.toLocaleString()}</td>
                <td className="py-2 text-right text-sm text-white tabular-nums">{r.exits.toLocaleString()}</td>
                <td className={`py-2 text-right text-sm font-semibold tabular-nums ${bad ? 'text-red-400' : 'text-grey-400'}`}>
                  {rate.toFixed(0)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function BarChart({ data, labelKey, valueKey, maxBars = 8, color = 'gold' }: {
  data: Record<string, unknown>[];
  labelKey: string;
  valueKey: string;
  maxBars?: number;
  color?: string;
}) {
  const sliced = data.slice(0, maxBars);
  const max = Math.max(...sliced.map((d) => Number(d[valueKey]) || 0), 1);
  const gradients = BAR_GRADIENTS[color] || BAR_GRADIENTS.gold;

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-zinc-500 text-sm">No data yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sliced.map((row, i) => {
        const val = Number(row[valueKey]) || 0;
        const pct = (val / max) * 100;
        return (
          <div key={i} className="group">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-zinc-400 truncate max-w-[180px] group-hover:text-white transition-colors" title={String(row[labelKey])}>
                {String(row[labelKey]) || '(direct)'}
              </span>
              <span className="text-sm font-semibold text-white tabular-nums ml-3">{val.toLocaleString()}</span>
            </div>
            <div className="h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${pct}%`,
                  background: `linear-gradient(90deg, ${gradients[0]}, ${gradients[1]})`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AreaChart({ data, valueKey, height = 130 }: {
  data: { date: string; [key: string]: unknown }[];
  valueKey: string;
  height?: number;
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (data.length < 2) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <p className="text-zinc-500 text-sm">Not enough data to chart</p>
      </div>
    );
  }

  const values = data.map((d) => Number(d[valueKey]) || 0);
  const max = Math.max(...values, 1);
  const total = values.reduce((a, b) => a + b, 0);
  const avg = Math.round(total / values.length);
  const w = 500;
  const h = height;
  const pad = { top: 10, bottom: 30, left: 0, right: 0 };
  const chartW = w - pad.left - pad.right;
  const chartH = h - pad.top - pad.bottom;

  const points = values.map((v, i) => ({
    x: pad.left + (i / (values.length - 1)) * chartW,
    y: pad.top + chartH - (v / max) * chartH,
  }));

  // Smooth line path
  const linePath = points.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(' ');
  // Area fill path
  const areaPath = `${linePath} L${points[points.length - 1].x},${pad.top + chartH} L${points[0].x},${pad.top + chartH} Z`;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }} preserveAspectRatio="none">
        <defs>
          <linearGradient id={`areaGrad-${valueKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((frac) => (
          <line key={frac} x1={pad.left} y1={pad.top + chartH * (1 - frac)} x2={w - pad.right} y2={pad.top + chartH * (1 - frac)}
            stroke="white" strokeOpacity="0.08" strokeDasharray="4 4" />
        ))}
        {/* Area fill */}
        <path d={areaPath} fill={`url(#areaGrad-${valueKey})`} />
        {/* Line */}
        <path d={linePath} fill="none" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Hover zones */}
        {points.map((p, i) => (
          <g key={i}>
            <rect x={p.x - chartW / values.length / 2} y={pad.top} width={chartW / values.length} height={chartH}
              fill="transparent" onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)} />
            {hoveredIdx === i && (
              <>
                <line x1={p.x} y1={pad.top} x2={p.x} y2={pad.top + chartH} stroke="var(--color-gold)" strokeOpacity="0.3" strokeDasharray="3 3" />
                <circle cx={p.x} cy={p.y} r="4" fill="var(--color-gold)" stroke="var(--color-navy)" strokeWidth="2" />
              </>
            )}
          </g>
        ))}
      </svg>
      {/* Tooltip */}
      {hoveredIdx !== null && (
        <div
          className="absolute -top-1 pointer-events-none z-10 px-2.5 py-1 rounded-lg bg-zinc-800 border border-white/[0.12] text-xs text-white shadow-xl"
          style={{ left: `${(hoveredIdx / (values.length - 1)) * 100}%`, transform: 'translateX(-50%)' }}
        >
          <span className="text-zinc-500">{data[hoveredIdx].date.slice(5)}</span>
          <span className="ml-1.5 font-bold text-gold">{values[hoveredIdx]}</span>
        </div>
      )}
      {/* X-axis labels */}
      <div className="flex items-center justify-between mt-2 text-[11px] text-zinc-500">
        <span>{data[0].date.slice(5)}</span>
        <span className="font-medium text-zinc-400">Avg: {avg}/day</span>
        <span>{data[data.length - 1].date.slice(5)}</span>
      </div>
    </div>
  );
}

function LeadRow({ lead, onStatusChange, expanded, onToggle, apiKey }: {
  lead: MetricsData['leads']['recent'][0];
  onStatusChange: (id: string, status: string) => void;
  expanded: boolean;
  onToggle: () => void;
  apiKey: string;
}) {
  const [aiReply, setAiReply] = useState<{ subject: string; body: string } | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [copied, setCopied] = useState<'subject' | 'body' | null>(null);

  const suggestReply = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (aiLoading) return;
    setAiLoading(true);
    try {
      const res = await fetch('/api/ai/lead-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ name: lead.name, service: lead.service, location: lead.location, message: lead.message, email: lead.email }),
      });
      const data = await res.json();
      if (data.reply) setAiReply(data.reply);
    } catch { /* ignore */ }
    setAiLoading(false);
  };

  const copyText = async (text: string, field: 'subject' | 'body') => {
    await navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const ago = getTimeAgo(new Date(lead.createdAt));

  return (
    <>
      <tr className="border-b border-white/[0.06] hover:bg-white/[0.04] transition-colors cursor-pointer group" onClick={onToggle}>
        <td className="py-4 px-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-gold">{lead.name.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <p className="font-semibold text-white text-sm">{lead.name}</p>
              <p className="text-xs text-zinc-500">{lead.email}</p>
            </div>
          </div>
        </td>
        <td className="py-4 px-4">
          <a href={`tel:${lead.phone}`} className="text-sm text-zinc-400 hover:text-gold transition-colors" onClick={(e) => e.stopPropagation()}>
            {lead.phone}
          </a>
        </td>
        <td className="py-4 px-4">
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-white/[0.06] text-xs font-medium text-zinc-400">
            {lead.service}
          </span>
        </td>
        <td className="py-4 px-4 text-sm text-zinc-400">{lead.location}</td>
        <td className="py-4 px-4">
          <select
            value={lead.status}
            onChange={(e) => { e.stopPropagation(); onStatusChange(lead.id, e.target.value); }}
            onClick={(e) => e.stopPropagation()}
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ring-1 ring-inset border-0 cursor-pointer appearance-none bg-transparent ${STATUS_COLORS[lead.status] || 'bg-white/[0.06] text-zinc-400 ring-zinc-500/20'}`}
          >
            {['new', 'contacted', 'quoted', 'won', 'lost'].map((s) => (
              <option key={s} value={s} className="bg-navy text-white">{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </td>
        <td className="py-4 px-4">
          <span className="text-xs text-zinc-500" title={new Date(lead.createdAt).toLocaleString('en-GB')}>{ago}</span>
        </td>
        <td className="py-4 px-2">
          <div className={`text-zinc-500 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>{icons.chevron}</div>
        </td>
      </tr>
      {expanded && (
        <tr className="border-b border-white/[0.06] bg-white/[0.05]">
          <td colSpan={7} className="px-4 py-4">
            <div className="ml-12 space-y-3">
              {lead.message && (
                <div>
                  <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-1">Message</p>
                  <p className="text-sm text-zinc-300 leading-relaxed">{lead.message}</p>
                </div>
              )}
              {lead.source && <p className="text-xs text-zinc-500">Source: <span className="text-zinc-400">{lead.source}</span></p>}
              <div className="flex items-center gap-2">
                <button
                  onClick={suggestReply}
                  disabled={aiLoading}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold/10 text-gold text-xs font-medium hover:bg-gold/20 transition-colors disabled:opacity-50 border border-gold/20"
                >
                  {aiLoading ? (
                    <><div className="w-3 h-3 border-2 border-gold/30 border-t-gold rounded-full animate-spin" /> Generating...</>
                  ) : (
                    <>{icons.sparkle} {aiReply ? 'Regenerate' : 'Suggest Reply'}</>
                  )}
                </button>
              </div>
              {aiReply && (
                <div className="p-4 rounded-xl bg-white/[0.08] border border-white/[0.08] space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">Subject</p>
                      <button onClick={() => copyText(aiReply.subject, 'subject')} className="text-xs text-gold hover:text-gold-light transition-colors">
                        {copied === 'subject' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <p className="text-sm font-medium text-white">{aiReply.subject}</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">Email Body</p>
                      <button onClick={() => copyText(aiReply.body, 'body')} className="text-xs text-gold hover:text-gold-light transition-colors">
                        {copied === 'body' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">{aiReply.body}</p>
                  </div>
                  <a
                    href={`mailto:${lead.email}?subject=${encodeURIComponent(aiReply.subject)}&body=${encodeURIComponent(aiReply.body)}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold text-white text-xs font-semibold hover:bg-gold-light transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {icons.mail} Open in Email
                  </a>
                </div>
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

const TABS = ['overview', 'traffic', 'sources', 'leads', 'calls'] as const;
type Tab = typeof TABS[number];

const PERIODS: Record<string, string> = {
  '1h': 'Last hour', '6h': 'Last 6 hours', '24h': 'Last 24 hours',
  '7d': 'Last 7 days', '14d': 'Last 14 days', '30d': 'Last 30 days',
  '90d': 'Last 90 days', '365d': 'Last year',
};

/* ── Main Page ──────────────────────────────────────────────────────── */
export default function MetricsPage() {
  const [apiKey, setApiKey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<MetricsData | null>(null);
  const [period, setPeriod] = useState('30d');
  const [expandedLead, setExpandedLead] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  useEffect(() => {
    const saved = sessionStorage.getItem('_grewal_metrics_key');
    if (saved) { setApiKey(saved); setAuthenticated(true); }
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
        sessionStorage.removeItem('_grewal_metrics_key');
        return;
      }
      if (!res.ok) throw new Error('Failed');
      const json = await res.json();
      setData(json);
      setAuthenticated(true);
      sessionStorage.setItem('_grewal_metrics_key', key);
    } catch {
      setError('Failed to load metrics.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authenticated && apiKey) fetchMetrics(apiKey, period);
  }, [authenticated, apiKey, period, fetchMetrics]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) fetchMetrics(apiKey.trim(), period);
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ status }),
      });
      if (res.ok && data) {
        setData({ ...data, leads: { ...data.leads, recent: data.leads.recent.map((l) => l.id === id ? { ...l, status } : l) } });
      }
    } catch { /* retry manually */ }
  };

  const stats = useMemo(() => {
    if (!data) return null;
    const convRate = data.traffic.uniqueSessions > 0 ? ((data.leads.total / data.traffic.uniqueSessions) * 100).toFixed(1) : '0';
    const pps = data.traffic.uniqueSessions > 0 ? (data.traffic.totalViews / data.traffic.uniqueSessions).toFixed(1) : '0';
    const newLeads = data.leads.byStatus.find((s) => s.status === 'new')?.count || 0;
    const wonLeads = data.leads.byStatus.find((s) => s.status === 'won')?.count || 0;
    return { convRate, pps, newLeads, wonLeads };
  }, [data]);

  /* ── Login Screen ──────────────────────────────────────────────── */
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber/5 rounded-full blur-[120px]" />
        </div>
        <form onSubmit={handleLogin} className="relative bg-white/[0.09] backdrop-blur-2xl rounded-2xl p-10 w-full max-w-sm border border-white/[0.08] shadow-2xl">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto overflow-hidden">
            <img src="/assets/grewal-icon-512.png" alt="Grewal" className="w-full h-full object-contain" />
          </div>
          <h1 className="font-heading font-bold text-2xl text-white text-center mb-1">Grewal Metrics</h1>
          <p className="text-zinc-500 text-sm text-center mb-8">Enter your admin API key</p>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="API key"
            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.08] border border-white/[0.08] text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 mb-4 transition-all"
            autoFocus
          />
          {error && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs mb-4">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={!apiKey.trim() || loading}
            className="w-full bg-gold hover:bg-gold-light text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-40 text-sm"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                Verifying...
              </span>
            ) : 'Access Dashboard'}
          </button>
        </form>
      </div>
    );
  }

  /* ── Loading State ──────────────────────────────────────────────── */
  if (loading && !data) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-4" />
          <p className="text-zinc-500 text-sm font-medium">Loading metrics...</p>
        </div>
      </div>
    );
  }

  if (!data || !stats) return null;

  /* ── Dashboard ─────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-navy">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/3 w-[600px] h-[600px] bg-gold/3 rounded-full blur-[200px]" />
        <div className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] bg-amber/3 rounded-full blur-[180px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-navy/80 backdrop-blur-2xl border-b border-white/[0.06]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
                  <img src="/assets/grewal-icon-512.png" alt="Grewal" className="w-full h-full object-contain" />
                </div>
                <span className="font-heading font-bold text-gold text-lg hidden sm:block">Grewal Metrics</span>
              </div>
              {loading && <div className="w-4 h-4 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />}
            </div>

            {/* Desktop Tabs */}
            <nav className="hidden md:flex items-center gap-0.5 bg-white/[0.06] rounded-xl p-1 border border-white/[0.06]">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? 'bg-gold text-white shadow-lg shadow-gold/20'
                      : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="bg-white/[0.06] text-zinc-400 text-sm border border-white/[0.07] rounded-lg px-3 py-2 focus:ring-gold/40 focus:ring-2 focus:outline-none"
              >
                {Object.entries(PERIODS).map(([k, v]) => (
                  <option key={k} value={k} className="bg-navy text-white">{v}</option>
                ))}
              </select>
              <button onClick={() => fetchMetrics(apiKey, period)}
                className="p-2 text-zinc-500 hover:text-gold rounded-lg hover:bg-white/[0.05] transition-all" title="Refresh">
                {icons.refresh}
              </button>
              <button onClick={() => { sessionStorage.removeItem('_grewal_metrics_key'); setAuthenticated(false); setData(null); setApiKey(''); }}
                className="p-2 text-zinc-500 hover:text-red-400 rounded-lg hover:bg-white/[0.05] transition-all" title="Sign out">
                {icons.logout}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Tabs */}
      <div className="md:hidden sticky top-16 z-40 bg-navy/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="flex">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-semibold transition-all border-b-2 ${
                activeTab === tab ? 'text-gold border-gold' : 'text-zinc-500 border-transparent'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <main className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Period + Alert badges */}
        <div className="flex items-center gap-3 mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.07] text-zinc-400 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {PERIODS[period] || period}
          </span>
          {stats.newLeads > 0 && (
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
              {stats.newLeads} new lead{stats.newLeads !== 1 ? 's' : ''} awaiting action
            </span>
          )}
        </div>

        {/* ── OVERVIEW / TRAFFIC ─────────────────────────────────────── */}
        {(activeTab === 'overview' || activeTab === 'traffic') && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <StatCard label="Page Views" value={data.traffic.totalViews.toLocaleString()} sub={PERIODS[period]} icon={icons.eye} accent />
              <StatCard label="Sessions" value={data.traffic.uniqueSessions.toLocaleString()} icon={icons.users} />
              <StatCard label="Pages / Session" value={stats.pps} />
              <StatCard label="Total Leads" value={data.leads.total} sub={PERIODS[period]} icon={icons.leads} />
              <StatCard label="Conversion" value={`${stats.convRate}%`} sub="Leads / Sessions" icon={icons.trend} accent />
              <StatCard label="Call Clicks" value={data.callClicks?.total || 0} sub="Phone taps" icon={icons.phone} />
            </div>

            {/* Drop-off comes first: it is the question the dashboard exists
                to answer, and it frames everything below it. */}
            {data.dropOff?.funnel && (
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3">
                  <SectionCard title="Where people drop out">
                    <Funnel funnel={data.dropOff.funnel} />
                  </SectionCard>
                </div>
                <div className="lg:col-span-2">
                  <SectionCard title="Biggest leaks — pages people leave from">
                    <LeakTable rows={data.dropOff.exitPages} />
                  </SectionCard>
                </div>
              </div>
            )}

            {data.heatmaps && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SectionCard title="When people visit (UK time)">
                  <Heatmap cells={data.heatmaps.views} />
                </SectionCard>
                <SectionCard title="When they actually make contact (UK time)">
                  <Heatmap
                    cells={[...(data.heatmaps.leads ?? []), ...(data.heatmaps.calls ?? [])]}
                    accent="emerald"
                  />
                </SectionCard>
              </div>
            )}

            {data.dropOff?.entryPages && data.dropOff.entryPages.length > 0 && (
              <SectionCard title="Landing pages — how many leave without a second click">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/[0.07]">
                        <th className="pb-2 text-[11px] font-semibold uppercase tracking-wider text-grey-500">Landing page</th>
                        <th className="pb-2 text-right text-[11px] font-semibold uppercase tracking-wider text-grey-500">Sessions</th>
                        <th className="pb-2 text-right text-[11px] font-semibold uppercase tracking-wider text-grey-500">Bounced</th>
                        <th className="pb-2 text-right text-[11px] font-semibold uppercase tracking-wider text-grey-500">Bounce rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.dropOff.entryPages.map((r) => {
                        const rate = r.sessions > 0 ? (r.bounced / r.sessions) * 100 : 0;
                        const bad = rate >= 70 && r.sessions >= 10;
                        return (
                          <tr key={r.path} className="border-b border-white/[0.04]">
                            <td className="py-2 pr-3 text-sm text-grey-300">
                              <span className="block max-w-[420px] truncate" title={r.path}>{r.path}</span>
                            </td>
                            <td className="py-2 text-right text-sm text-grey-400 tabular-nums">{r.sessions.toLocaleString()}</td>
                            <td className="py-2 text-right text-sm text-white tabular-nums">{r.bounced.toLocaleString()}</td>
                            <td className={`py-2 text-right text-sm font-semibold tabular-nums ${bad ? 'text-red-400' : 'text-grey-400'}`}>
                              {rate.toFixed(0)}%
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </SectionCard>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SectionCard title="Daily Page Views">
                <AreaChart data={data.traffic.daily} valueKey="views" />
              </SectionCard>
              <SectionCard title="Daily Leads">
                <AreaChart data={data.leads.daily} valueKey="count" />
              </SectionCard>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SectionCard title="Top Pages">
                <BarChart data={data.traffic.topPages} labelKey="path" valueKey="views" />
              </SectionCard>
              <SectionCard title="Referrers">
                <BarChart data={data.traffic.topReferrers} labelKey="referrer" valueKey="views" color="blue" />
              </SectionCard>
              <SectionCard title="UTM Sources">
                <BarChart data={data.traffic.utmSources} labelKey="utm_source" valueKey="count" color="emerald" />
              </SectionCard>
            </div>

            {activeTab === 'traffic' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <SectionCard title="Devices"><BarChart data={data.traffic.devices} labelKey="device" valueKey="count" color="amber" /></SectionCard>
                <SectionCard title="Browsers"><BarChart data={data.traffic.browsers} labelKey="browser" valueKey="count" color="indigo" /></SectionCard>
                <SectionCard title="Countries"><BarChart data={data.traffic.countries} labelKey="country" valueKey="count" color="sky" /></SectionCard>
                <SectionCard title="Top IPs"><BarChart data={data.traffic.ips} labelKey="ip" valueKey="count" color="violet" /></SectionCard>
              </div>
            )}
          </div>
        )}

        {/* ── SOURCES ────────────────────────────────────────────────── */}
        {activeTab === 'sources' && data.sources && (
          <div className="space-y-8">
            {/* Source breakdown stats */}
            {(() => {
              const s = data.sources.bySource;
              const total = s.reduce((a, b) => a + b.count, 0) || 1;
              const google = s.find((x) => x.source === 'Google Organic')?.count || 0;
              const ads = s.find((x) => x.source === 'Google Ads')?.count || 0;
              const direct = s.find((x) => x.source === 'Direct')?.count || 0;
              const other = total - google - ads - direct;
              return (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <StatCard label="Google Organic" value={google.toLocaleString()} sub={`${((google / total) * 100).toFixed(1)}% of traffic`} accent />
                  <StatCard label="Google Ads" value={ads.toLocaleString()} sub={`${((ads / total) * 100).toFixed(1)}% of traffic`} />
                  <StatCard label="Direct" value={direct.toLocaleString()} sub={`${((direct / total) * 100).toFixed(1)}% of traffic`} />
                  <StatCard label="Other" value={other.toLocaleString()} sub={`${((other / total) * 100).toFixed(1)}% of traffic`} />
                </div>
              );
            })()}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Traffic source donut-style bar chart */}
              <SectionCard title="Traffic Sources">
                <BarChart data={data.sources.bySource} labelKey="source" valueKey="count" maxBars={12} color="blue" />
              </SectionCard>

              {/* Referrers (existing) */}
              <SectionCard title="Raw Referrers">
                <BarChart data={data.traffic.topReferrers} labelKey="referrer" valueKey="views" maxBars={10} color="violet" />
              </SectionCard>
            </div>

            {/* Landing pages by source */}
            <SectionCard title="Landing Pages by Source">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      {['Landing Page', 'Source', 'Sessions'].map((h) => (
                        <th key={h} className="py-3 px-4 text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.sources.landings.map((row, i) => (
                      <tr key={i} className="border-b border-white/[0.06] hover:bg-white/[0.04] transition-colors">
                        <td className="py-3 px-4 text-sm text-white font-medium max-w-[300px] truncate">{row.path}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold ${
                            row.source === 'Google Organic' ? 'bg-emerald-500/15 text-emerald-400' :
                            row.source === 'Google Ads' ? 'bg-blue-500/15 text-blue-400' :
                            row.source === 'Direct' ? 'bg-amber-500/15 text-amber-400' :
                            row.source === 'Bing' ? 'bg-sky-500/15 text-sky-400' :
                            'bg-white/[0.06] text-zinc-400'
                          }`}>
                            {row.source}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm font-bold text-white tabular-nums">{row.sessions}</td>
                      </tr>
                    ))}
                    {data.sources.landings.length === 0 && (
                      <tr>
                        <td colSpan={3} className="py-12 text-center text-zinc-500 text-sm">No landing page data yet</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </SectionCard>

            {/* Info note about search queries */}
            <div className="flex items-start gap-3 px-5 py-4 rounded-xl bg-blue-500/5 border border-blue-500/15">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 flex-shrink-0 mt-0.5">
                <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
              </svg>
              <p className="text-sm text-zinc-400">
                <span className="font-semibold text-blue-400">Search queries not available from referrer.</span>{' '}
                Google encrypts search queries since 2011 — the referrer only shows the domain (google.com), not what the user searched.
                To see actual search queries, use <span className="text-white font-medium">Google Search Console</span> (Performance &gt; Queries).
                The landing pages above show which pages attract organic traffic, which indirectly tells you which queries are working.
              </p>
            </div>
          </div>
        )}

        {/* ── LEADS ──────────────────────────────────────────────────── */}
        {(activeTab === 'overview' || activeTab === 'leads') && (
          <div className={`space-y-6 ${activeTab === 'overview' ? 'mt-8' : ''}`}>
            {activeTab === 'leads' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <StatCard label="Total Leads" value={data.leads.total} icon={icons.leads} accent />
                <StatCard label="New" value={stats.newLeads} />
                <StatCard label="Conversion" value={`${stats.convRate}%`} icon={icons.trend} />
                <StatCard label="Won" value={stats.wonLeads} accent />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <SectionCard title="By Status">
                <div className="space-y-3">
                  {data.leads.byStatus.map((row) => (
                    <div key={row.status} className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-2 h-2 rounded-full ${STATUS_DOT[row.status] || 'bg-zinc-500'}`} />
                        <span className="text-sm text-zinc-400">{row.status.charAt(0).toUpperCase() + row.status.slice(1)}</span>
                      </div>
                      <span className="font-bold text-white text-sm tabular-nums">{row.count}</span>
                    </div>
                  ))}
                  {data.leads.byStatus.length === 0 && <p className="text-zinc-500 text-sm text-center py-4">No leads yet</p>}
                </div>
              </SectionCard>
              <SectionCard title="By Service"><BarChart data={data.leads.byService} labelKey="service" valueKey="count" /></SectionCard>
              <SectionCard title="By Location"><BarChart data={data.leads.byLocation} labelKey="location" valueKey="count" color="blue" /></SectionCard>
              <SectionCard title="By Source"><BarChart data={data.leads.bySource} labelKey="source" valueKey="count" color="emerald" /></SectionCard>
            </div>

            {/* Recent Leads Table */}
            <GlassCard className="overflow-hidden" hover={false}>
              <div className="px-5 py-4 border-b border-white/[0.07] flex items-center justify-between">
                <div>
                  <h2 className="font-heading font-semibold text-white">Recent Leads</h2>
                  <p className="text-xs text-zinc-500 mt-0.5">{data.leads.recent.length} shown &middot; Click to expand</p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      {['Contact', 'Phone', 'Service', 'Location', 'Status', 'When', ''].map((h) => (
                        <th key={h} className="py-3 px-4 text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.leads.recent.map((lead) => (
                      <LeadRow key={lead.id} lead={lead} onStatusChange={handleStatusChange}
                        expanded={expandedLead === lead.id} onToggle={() => setExpandedLead(expandedLead === lead.id ? null : lead.id)}
                        apiKey={apiKey} />
                    ))}
                    {data.leads.recent.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-16 text-center">
                          <div className="text-zinc-400 mb-3">{icons.leads}</div>
                          <p className="text-zinc-500 text-sm">No leads in this period</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </div>
        )}

        {/* ── CALL CLICKS ────────────────────────────────────────────── */}
        {(activeTab === 'overview' || activeTab === 'calls') && data.callClicks && (
          <div className={`space-y-6 ${activeTab === 'overview' ? 'mt-8' : ''}`}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard label="Call Clicks" value={data.callClicks.total} sub={PERIODS[period]} icon={icons.phone} accent />
              <StatCard label="Calls / Day" value={data.callClicks.daily.length > 0 ? (data.callClicks.total / data.callClicks.daily.length).toFixed(1) : '0'} sub="Average" />
              <StatCard label="Call Rate" value={data.traffic.uniqueSessions > 0 ? `${((data.callClicks.total / data.traffic.uniqueSessions) * 100).toFixed(1)}%` : '0%'} sub="Clicks / Sessions" />
              <StatCard label="Top Page" value={data.callClicks.byPage[0]?.page || '--'} sub={data.callClicks.byPage[0] ? `${data.callClicks.byPage[0].count} clicks` : ''} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SectionCard title="Daily Call Clicks">
                <AreaChart data={data.callClicks.daily} valueKey="count" />
              </SectionCard>
              <SectionCard title="By Action Type">
                <BarChart
                  data={(data.callClicks.byAction || []).map(a => ({
                    ...a,
                    action: a.action === 'whatsapp_click' ? 'WhatsApp' : a.action === 'phone_copy' ? 'Phone Copy' : 'Call Click'
                  }))}
                  labelKey="action" valueKey="count" color="orange"
                />
              </SectionCard>
            </div>

            <SectionCard title="By Page">
              <BarChart data={data.callClicks.byPage} labelKey="page" valueKey="count" color="amber" />
            </SectionCard>

            {/* Recent Contact Events */}
            <GlassCard className="overflow-hidden" hover={false}>
              <div className="px-5 py-4 border-b border-white/[0.07]">
                <h2 className="font-heading font-semibold text-white">Recent Contact Events</h2>
                <p className="text-xs text-zinc-500 mt-0.5">{data.callClicks.recent.length} shown</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      {['Action', 'Phone', 'Page', 'Device', 'Browser', 'IP', 'Country', 'When'].map((h) => (
                        <th key={h} className="py-3 px-4 text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.callClicks.recent.map((click, i) => {
                      const date = new Date(click.created_at);
                      return (
                        <tr key={i} className="border-b border-white/[0.06] hover:bg-white/[0.04] transition-colors">
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold ${
                              click.action === 'whatsapp_click' ? 'bg-green-500/15 text-green-400' :
                              click.action === 'phone_copy' ? 'bg-amber-500/15 text-amber-400' :
                              'bg-blue-500/15 text-blue-400'
                            }`}>
                              {click.action === 'whatsapp_click' ? 'WhatsApp' : click.action === 'phone_copy' ? 'Copied' : 'Called'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm font-medium text-white">{click.phone}</td>
                          <td className="py-3 px-4 text-sm text-zinc-400 max-w-[200px] truncate">{click.page}</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2 py-0.5 rounded bg-white/[0.05] text-xs font-medium text-zinc-500">{click.device || '--'}</span>
                          </td>
                          <td className="py-3 px-4 text-sm text-zinc-400">{click.browser || '--'}</td>
                          <td className="py-3 px-4 text-xs text-zinc-500 font-mono">{click.ip || '--'}</td>
                          <td className="py-3 px-4 text-sm text-zinc-400">{click.country || '--'}</td>
                          <td className="py-3 px-4 text-xs text-zinc-500" title={date.toLocaleString('en-GB')}>{getTimeAgo(date)}</td>
                        </tr>
                      );
                    })}
                    {data.callClicks.recent.length === 0 && (
                      <tr>
                        <td colSpan={8} className="py-16 text-center">
                          <div className="text-zinc-400 mb-3">{icons.phone}</div>
                          <p className="text-zinc-500 text-sm">No contact events recorded yet</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </div>
        )}
      </main>
    </div>
  );
}
