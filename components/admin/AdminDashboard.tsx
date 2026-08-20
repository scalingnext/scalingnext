"use client";

/**
 * ScalingNext admin dashboard.
 *
 * Everything renders from one /api/admin/stats request so the refresh button is
 * a single round trip. Auth is handled upstream by middleware.ts, so this
 * component assumes it is already authorised.
 */

import { useCallback, useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  RefreshCw,
  Eye,
  MessageCircle,
  UserPlus,
  TrendingUp,
  AlertTriangle,
  LogOut,
} from "lucide-react";

type Slice = { name: string; value: number };

type Stats = {
  generatedAt: string;
  days: number;
  totals: {
    pageviews: number;
    whatsappClicks: number;
    signups: number;
    totalSignupsAllTime: number;
    clickRate: number | null;
  };
  timeline: { date: string; pageviews: number; whatsappClicks: number; signups: number }[];
  topPages: Slice[];
  referrers: Slice[];
  devices: Slice[];
  leadsBySource: Slice[];
  leadsByRole: Slice[];
  leadsByExperience: Slice[];
  leadsByCountry: Slice[];
  coding: Slice[];
  recentLeads: {
    name: string;
    email: string;
    country: string;
    phone_code: string;
    phone: string;
    role: string;
    experience: string;
    knows_coding: boolean;
    source: string;
    created_at: string;
  }[];
};

const RANGES = [7, 30, 90] as const;
const DONUT_COLORS = ["#FF5000", "#FF8A5B", "#FFB38F", "#6B6B6B", "#3F3F3F", "#2A2A2A"];

const CARD = "rounded-2xl border border-[#222222] bg-[#111111] p-5";
const AXIS = { stroke: "#5A5A5A", fontSize: 11 };

const TOOLTIP_STYLE = {
  contentStyle: {
    background: "#161616",
    border: "1px solid #2A2A2A",
    borderRadius: 12,
    fontSize: 12,
  },
  labelStyle: { color: "#B0B0B0" },
} as const;

/** "2026-08-20" → "Aug 20" */
function shortDate(iso: string): string {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function AdminDashboard() {
  const [days, setDays] = useState<number>(30);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (range: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/stats?days=${range}`, { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error ?? `Request failed (${response.status})`);
      setStats(data as Stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load stats.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(days);
  }, [days, load]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-[24px] font-bold tracking-[-0.02em]">ScalingNext Admin</h1>
            <p className="mt-1 text-[13px] text-[#7A7A7A]">
              {stats
                ? `Updated ${new Date(stats.generatedAt).toLocaleTimeString()} · last ${stats.days} days`
                : "Loading…"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-xl border border-[#242424] bg-[#131313] p-1">
              {RANGES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setDays(r)}
                  className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors ${
                    days === r ? "bg-[#242424] text-white" : "text-[#8A8A8A] hover:text-white"
                  }`}
                >
                  {r}d
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => void load(days)}
              disabled={loading}
              aria-label="Refresh data"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#242424] bg-[#131313] text-[#C4C4C4] transition-colors hover:border-[#333333] hover:text-white disabled:opacity-50"
            >
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            </button>
            <button
              type="button"
              onClick={async () => {
                await fetch("/api/admin/login", { method: "DELETE" });
                // Full navigation so middleware re-runs against the cleared cookie.
                window.location.href = "/admin/login";
              }}
              aria-label="Sign out"
              title="Sign out"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#242424] bg-[#131313] text-[#8A8A8A] transition-colors hover:border-[#333333] hover:text-white"
            >
              <LogOut size={15} />
            </button>
          </div>
        </header>

        {error && (
          <div
            role="alert"
            className="mt-6 flex items-start gap-3 rounded-2xl border border-[#4A2A2A] bg-[#1C1414] p-4"
          >
            <AlertTriangle size={16} className="mt-0.5 shrink-0 text-[#E58A8A]" />
            <div>
              <p className="text-[13px] font-medium text-[#E5A3A3]">Could not load stats</p>
              <p className="mt-1 font-mono text-[12px] leading-relaxed text-[#B08080]">{error}</p>
            </div>
          </div>
        )}

        {stats && (
          <>
            <section className="mt-7 grid grid-cols-2 gap-3.5 lg:grid-cols-4">
              <Stat icon={Eye} label="Pageviews" value={stats.totals.pageviews.toLocaleString()} />
              <Stat
                icon={MessageCircle}
                label="WhatsApp clicks"
                value={stats.totals.whatsappClicks.toLocaleString()}
              />
              <Stat
                icon={UserPlus}
                label="Signups"
                value={stats.totals.signups.toLocaleString()}
                sub={`${stats.totals.totalSignupsAllTime.toLocaleString()} all time`}
              />
              <Stat
                icon={TrendingUp}
                label="Click rate"
                value={
                  stats.totals.clickRate === null ? "—" : `${stats.totals.clickRate.toFixed(1)}%`
                }
                sub="clicks per pageview"
              />
            </section>

            <section className={`${CARD} mt-4`}>
              <h2 className="text-[14px] font-semibold">Traffic over time</h2>
              <div className="mt-4 h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={stats.timeline}
                    margin={{ top: 4, right: 8, bottom: 0, left: -18 }}
                  >
                    <defs>
                      <linearGradient id="gPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FF5000" stopOpacity={0.32} />
                        <stop offset="100%" stopColor="#FF5000" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gWa" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4A9EFF" stopOpacity={0.28} />
                        <stop offset="100%" stopColor="#4A9EFF" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#1E1E1E" vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickFormatter={shortDate}
                      tick={AXIS}
                      axisLine={false}
                      tickLine={false}
                      minTickGap={24}
                    />
                    <YAxis tick={AXIS} axisLine={false} tickLine={false} allowDecimals={false} />
                    <Tooltip {...TOOLTIP_STYLE} labelFormatter={(v) => shortDate(String(v))} />
                    <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                    <Area
                      type="monotone"
                      dataKey="pageviews"
                      name="Pageviews"
                      stroke="#FF5000"
                      strokeWidth={2}
                      fill="url(#gPv)"
                    />
                    <Area
                      type="monotone"
                      dataKey="whatsappClicks"
                      name="WhatsApp clicks"
                      stroke="#4A9EFF"
                      strokeWidth={2}
                      fill="url(#gWa)"
                    />
                    <Area
                      type="monotone"
                      dataKey="signups"
                      name="Signups"
                      stroke="#FFFFFF"
                      strokeWidth={2}
                      fill="transparent"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
              <HBar title="Top pages by pageviews" data={stats.topPages} />
              <Donut title="Signups by channel" data={stats.leadsBySource} />
              <HBar title="Referrers" data={stats.referrers} empty="No external referrers yet." />
              <Donut title="Devices" data={stats.devices} />
              <HBar title="Signups by role" data={stats.leadsByRole} />
              <Donut title="Coding experience" data={stats.coding} />
            </section>

            <section className={`${CARD} mt-4 overflow-hidden`}>
              <h2 className="text-[14px] font-semibold">Recent signups</h2>
              {stats.recentLeads.length === 0 ? (
                <Empty>No signups yet.</Empty>
              ) : (
                <div className="mt-4 -mx-5 overflow-x-auto px-5">
                  <table className="w-full min-w-[720px] text-left text-[12.5px]">
                    <thead>
                      <tr className="border-b border-[#222222] text-[11px] uppercase tracking-wider text-[#6B6B6B]">
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Phone</Th>
                        <Th>Country</Th>
                        <Th>Role</Th>
                        <Th>Exp</Th>
                        <Th>Codes</Th>
                        <Th>Source</Th>
                        <Th>When</Th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentLeads.map((lead) => (
                        <tr
                          key={`${lead.email}-${lead.source}-${lead.created_at}`}
                          className="border-b border-[#1A1A1A] text-[#C4C4C4]"
                        >
                          <Td className="text-white">{lead.name}</Td>
                          <Td>{lead.email}</Td>
                          <Td className="whitespace-nowrap">
                            {lead.phone_code} {lead.phone}
                          </Td>
                          <Td>{lead.country}</Td>
                          <Td>{lead.role}</Td>
                          <Td className="whitespace-nowrap">{lead.experience}</Td>
                          <Td>{lead.knows_coding ? "Yes" : "No"}</Td>
                          <Td className="capitalize">{lead.source}</Td>
                          <Td className="whitespace-nowrap text-[#7A7A7A]">
                            {new Date(lead.created_at).toLocaleDateString()}
                          </Td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <p className="mt-6 text-center text-[11.5px] leading-relaxed text-[#5A5A5A]">
              Analytics are first-party and begin from the moment tracking shipped — earlier
              traffic is not included. GA4 continues to run separately.
            </p>
          </>
        )}

        {loading && !stats && !error && (
          <p className="mt-10 text-center text-[13px] text-[#6B6B6B]">Loading dashboard…</p>
        )}
      </div>
    </div>
  );
}

/* ── Building blocks ──────────────────────────────────────────────────────── */

function Stat({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: typeof Eye;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className={CARD}>
      <div className="flex items-center gap-2 text-[#7A7A7A]">
        <Icon size={14} strokeWidth={1.8} />
        <span className="text-[11.5px] font-medium uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-3 text-[26px] font-bold leading-none tracking-[-0.02em]">{value}</p>
      {sub && <p className="mt-1.5 text-[11.5px] text-[#6B6B6B]">{sub}</p>}
    </div>
  );
}

function HBar({ title, data, empty }: { title: string; data: Slice[]; empty?: string }) {
  return (
    <div className={CARD}>
      <h2 className="text-[14px] font-semibold">{title}</h2>
      {data.length === 0 ? (
        <Empty>{empty ?? "No data yet."}</Empty>
      ) : (
        <div className="mt-4" style={{ height: Math.max(160, data.length * 32) }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: -8, right: 16 }}>
              <CartesianGrid stroke="#1E1E1E" horizontal={false} />
              <XAxis
                type="number"
                tick={AXIS}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={AXIS}
                axisLine={false}
                tickLine={false}
                width={120}
              />
              <Tooltip {...TOOLTIP_STYLE} cursor={{ fill: "#ffffff08" }} />
              <Bar dataKey="value" name="Count" fill="#FF5000" radius={[0, 5, 5, 0]} barSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

function Donut({ title, data }: { title: string; data: Slice[] }) {
  return (
    <div className={CARD}>
      <h2 className="text-[14px] font-semibold">{title}</h2>
      {data.length === 0 ? (
        <Empty>No data yet.</Empty>
      ) : (
        <div className="mt-4 h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius="55%"
                outerRadius="80%"
                paddingAngle={2}
                stroke="#111111"
                strokeWidth={2}
              >
                {data.map((entry, i) => (
                  <Cell key={entry.name} fill={DONUT_COLORS[i % DONUT_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip {...TOOLTIP_STYLE} />
              <Legend wrapperStyle={{ fontSize: 11.5 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="mt-6 pb-6 text-center text-[12.5px] text-[#5A5A5A]">{children}</p>;
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="py-2.5 pr-4 font-medium">{children}</th>;
}

function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`py-2.5 pr-4 ${className}`}>{children}</td>;
}
