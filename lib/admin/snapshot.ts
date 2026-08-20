/**
 * Site snapshot builder — the single source of truth for both the human
 * dashboard (/api/admin/stats) and the agent endpoint (/admin-agent).
 *
 * Keeping one builder means the two surfaces can never disagree about the
 * numbers, and a new metric appears in both at once.
 */

import { getSupabaseAdmin } from "@/lib/supabase/server";

export type Slice = { name: string; value: number };

export type LeadRecord = {
  name: string;
  email: string;
  country: string;
  phone_code: string;
  phone: string;
  role: string;
  experience: string;
  knows_coding: boolean;
  marketing_opt_in: boolean;
  source: string;
  created_at: string;
};

export type Snapshot = {
  generatedAt: string;
  days: number;
  totals: {
    pageviews: number;
    whatsappClicks: number;
    signups: number;
    totalSignupsAllTime: number;
    totalPageviewsAllTime: number;
    clickRate: number | null;
    conversionRate: number | null;
  };
  timeline: { date: string; pageviews: number; whatsappClicks: number; signups: number }[];
  topPages: Slice[];
  referrers: Slice[];
  devices: Slice[];
  countries: Slice[];
  leadsBySource: Slice[];
  leadsByRole: Slice[];
  leadsByExperience: Slice[];
  leadsByCountry: Slice[];
  coding: Slice[];
  marketingOptIn: Slice[];
  recentLeads: LeadRecord[];
};

type EventRow = {
  event: string;
  path: string;
  referrer: string | null;
  device: string | null;
  country: string | null;
  created_at: string;
};

type LeadAggRow = {
  source: string;
  country: string;
  role: string;
  experience: string;
  knows_coding: boolean;
  marketing_opt_in: boolean;
  created_at: string;
};

function tally<T>(rows: T[], pick: (row: T) => string | null): Slice[] {
  const counts = new Map<string, number>();
  for (const row of rows) {
    const key = pick(row);
    if (!key) continue;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return Array.from(counts, ([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
}

function buildTimeline(events: EventRow[], leads: LeadAggRow[], days: number) {
  const series = new Map<
    string,
    { date: string; pageviews: number; whatsappClicks: number; signups: number }
  >();

  // Pre-seed every day so the chart and the markdown table have no gaps.
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setUTCHours(0, 0, 0, 0);
    d.setUTCDate(d.getUTCDate() - i);
    const key = d.toISOString().slice(0, 10);
    series.set(key, { date: key, pageviews: 0, whatsappClicks: 0, signups: 0 });
  }

  for (const e of events) {
    const bucket = series.get(e.created_at.slice(0, 10));
    if (!bucket) continue;
    if (e.event === "pageview") bucket.pageviews++;
    else if (e.event === "whatsapp_click") bucket.whatsappClicks++;
  }

  for (const l of leads) {
    const bucket = series.get(l.created_at.slice(0, 10));
    if (bucket) bucket.signups++;
  }

  return Array.from(series.values());
}

export function normalizeDays(raw: string | null): number {
  const parsed = Number(raw);
  return [1, 7, 30, 90, 365].includes(parsed) ? parsed : 30;
}

/**
 * @param includePII when false, `recentLeads` comes back empty. The agent
 *        endpoint defaults to false so a scraping agent does not pull real
 *        names, emails, and phone numbers unless explicitly asked.
 */
export async function buildSnapshot(days: number, includePII: boolean): Promise<Snapshot> {
  const since = new Date();
  since.setUTCHours(0, 0, 0, 0);
  since.setUTCDate(since.getUTCDate() - (days - 1));
  const sinceIso = since.toISOString();

  const supabase = getSupabaseAdmin();

  const [events, leads, recent, totalLeads, totalViews] = await Promise.all([
    supabase
      .from("analytics_events")
      .select("event, path, referrer, device, country, created_at")
      .gte("created_at", sinceIso)
      .order("created_at", { ascending: false })
      .limit(50000),
    supabase
      .from("community_leads")
      .select("source, country, role, experience, knows_coding, marketing_opt_in, created_at")
      .gte("created_at", sinceIso),
    includePII
      ? supabase
          .from("community_leads")
          .select(
            "name, email, country, phone_code, phone, role, experience, knows_coding, marketing_opt_in, source, created_at",
          )
          .order("created_at", { ascending: false })
          .limit(100)
      : Promise.resolve({ data: [], error: null }),
    supabase.from("community_leads").select("id", { count: "exact", head: true }),
    supabase
      .from("analytics_events")
      .select("id", { count: "exact", head: true })
      .eq("event", "pageview"),
  ]);

  const firstError =
    events.error || leads.error || recent.error || totalLeads.error || totalViews.error;
  if (firstError) throw new Error(firstError.message);

  const eventRows = (events.data ?? []) as EventRow[];
  const leadRows = (leads.data ?? []) as LeadAggRow[];

  const pageviews = eventRows.filter((e) => e.event === "pageview");
  const clicks = eventRows.filter((e) => e.event === "whatsapp_click");

  return {
    generatedAt: new Date().toISOString(),
    days,
    totals: {
      pageviews: pageviews.length,
      whatsappClicks: clicks.length,
      signups: leadRows.length,
      totalSignupsAllTime: totalLeads.count ?? 0,
      totalPageviewsAllTime: totalViews.count ?? 0,
      // null rather than 0 when there is no traffic, so consumers can render
      // "—" instead of a misleading 0%.
      clickRate: pageviews.length ? (clicks.length / pageviews.length) * 100 : null,
      conversionRate: pageviews.length ? (leadRows.length / pageviews.length) * 100 : null,
    },
    timeline: buildTimeline(eventRows, leadRows, days),
    topPages: tally(pageviews, (e) => e.path).slice(0, 20),
    referrers: tally(pageviews, (e) => e.referrer).slice(0, 15),
    devices: tally(pageviews, (e) => e.device),
    countries: tally(pageviews, (e) => e.country).slice(0, 15),
    leadsBySource: tally(leadRows, (l) => l.source),
    leadsByRole: tally(leadRows, (l) => l.role),
    leadsByExperience: tally(leadRows, (l) => l.experience),
    leadsByCountry: tally(leadRows, (l) => l.country).slice(0, 15),
    coding: tally(leadRows, (l) => (l.knows_coding ? "Knows coding" : "No coding")),
    marketingOptIn: tally(leadRows, (l) => (l.marketing_opt_in ? "Opted in" : "Opted out")),
    recentLeads: (recent.data ?? []) as LeadRecord[],
  };
}
