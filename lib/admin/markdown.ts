/**
 * Markdown renderer for the agent endpoint.
 *
 * Design constraints, because the consumer is an LLM and not a browser:
 *   - plain text/markdown, so no JS execution or DOM parsing is needed
 *   - every number labelled inline; no reliance on column position
 *   - explicit units, ISO-8601 timestamps, and stated date ranges
 *   - a "Notes" section stating what the data does NOT cover, so an agent does
 *     not infer absent data as zero
 */

import type { Slice, Snapshot } from "./snapshot";

function table(headers: string[], rows: (string | number)[][]): string {
  if (rows.length === 0) return "_No data in this period._\n";
  const head = `| ${headers.join(" | ")} |`;
  const rule = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows.map((r) => `| ${r.join(" | ")} |`).join("\n");
  return `${head}\n${rule}\n${body}\n`;
}

function sliceTable(label: string, slices: Slice[], total?: number): string {
  return table(
    [label, "Count", "Share"],
    slices.map((s) => [
      s.name,
      s.value,
      total && total > 0 ? `${((s.value / total) * 100).toFixed(1)}%` : "—",
    ]),
  );
}

function pct(value: number | null): string {
  return value === null ? "n/a (no pageviews in period)" : `${value.toFixed(2)}%`;
}

export function renderMarkdown(snapshot: Snapshot, includePII: boolean): string {
  const { totals, days } = snapshot;

  const from = snapshot.timeline[0]?.date ?? "n/a";
  const to = snapshot.timeline[snapshot.timeline.length - 1]?.date ?? "n/a";

  const lines: string[] = [];

  lines.push("# ScalingNext — Live Site Data");
  lines.push("");
  lines.push("- **Site:** https://scalingnext.in");
  lines.push(`- **Generated at:** ${snapshot.generatedAt} (UTC, ISO-8601)`);
  lines.push(`- **Window:** last ${days} day(s), ${from} to ${to} inclusive (UTC dates)`);
  lines.push("- **Data source:** first-party analytics + signup database (live, not cached)");
  lines.push(`- **PII included:** ${includePII ? "yes" : "no (add &pii=true to include)"}`);
  lines.push("");

  lines.push("## Summary");
  lines.push("");
  lines.push(`- Pageviews in window: **${totals.pageviews}**`);
  lines.push(`- WhatsApp community clicks in window: **${totals.whatsappClicks}**`);
  lines.push(`- Signups in window: **${totals.signups}**`);
  lines.push(`- Click-through rate (WhatsApp clicks / pageviews): **${pct(totals.clickRate)}**`);
  lines.push(`- Conversion rate (signups / pageviews): **${pct(totals.conversionRate)}**`);
  lines.push(`- Total signups all time: **${totals.totalSignupsAllTime}**`);
  lines.push(`- Total pageviews all time: **${totals.totalPageviewsAllTime}**`);
  lines.push("");

  lines.push("## Daily timeline");
  lines.push("");
  lines.push(
    table(
      ["Date (UTC)", "Pageviews", "WhatsApp clicks", "Signups"],
      snapshot.timeline.map((d) => [d.date, d.pageviews, d.whatsappClicks, d.signups]),
    ),
  );

  lines.push("## Top pages by pageviews");
  lines.push("");
  lines.push(
    table(
      ["Rank", "Path", "Pageviews", "Share"],
      snapshot.topPages.map((p, i) => [
        i + 1,
        p.name,
        p.value,
        totals.pageviews > 0 ? `${((p.value / totals.pageviews) * 100).toFixed(1)}%` : "—",
      ]),
    ),
  );

  lines.push("## Traffic sources (referrer hostnames)");
  lines.push("");
  lines.push(sliceTable("Referrer", snapshot.referrers, totals.pageviews));
  lines.push("_Direct traffic and visits with no referrer header are not listed here._");
  lines.push("");

  lines.push("## Devices");
  lines.push("");
  lines.push(sliceTable("Device", snapshot.devices, totals.pageviews));

  lines.push("## Visitor countries");
  lines.push("");
  lines.push(sliceTable("Country (ISO 3166-1 alpha-2)", snapshot.countries, totals.pageviews));
  lines.push("_Resolved at the CDN edge. Absent in local development._");
  lines.push("");

  lines.push("## Signups by channel");
  lines.push("");
  lines.push(sliceTable("Channel", snapshot.leadsBySource, totals.signups));
  lines.push(
    "_Channel maps to landing page: `twitter` = /twitter, `instagram` = /insta, `youtube` = /yt._",
  );
  lines.push("");

  lines.push("## Signup audience breakdown");
  lines.push("");
  lines.push("### By role");
  lines.push("");
  lines.push(sliceTable("Role", snapshot.leadsByRole, totals.signups));
  lines.push("### By years of experience");
  lines.push("");
  lines.push(sliceTable("Experience", snapshot.leadsByExperience, totals.signups));
  lines.push("### By country");
  lines.push("");
  lines.push(sliceTable("Country", snapshot.leadsByCountry, totals.signups));
  lines.push("### By coding ability");
  lines.push("");
  lines.push(sliceTable("Coding", snapshot.coding, totals.signups));
  lines.push("### By marketing opt-in");
  lines.push("");
  lines.push(sliceTable("Opt-in", snapshot.marketingOptIn, totals.signups));

  if (includePII) {
    lines.push("## Recent signups (personal data)");
    lines.push("");
    lines.push("> Contains personal information: names, email addresses, and phone numbers.");
    lines.push("> Do not republish, forward, or store outside authorised systems.");
    lines.push("");
    lines.push(
      table(
        [
          "Created at (UTC)",
          "Name",
          "Email",
          "Phone",
          "Country",
          "Role",
          "Experience",
          "Codes",
          "Channel",
        ],
        snapshot.recentLeads.map((l) => [
          l.created_at,
          l.name,
          l.email,
          `${l.phone_code} ${l.phone}`,
          l.country,
          l.role,
          l.experience,
          l.knows_coding ? "yes" : "no",
          l.source,
        ]),
      ),
    );
  }

  lines.push("## Notes and limitations");
  lines.push("");
  lines.push(
    "- Analytics are **first-party** and began when tracking shipped. Traffic before that date is not represented and must not be read as zero.",
  );
  lines.push(
    "- Google Analytics 4 (`G-QLXJ3B1L17`) runs separately and its numbers will differ; GA4 is subject to ad-blocker loss, this dataset is not.",
  );
  lines.push(
    "- Pageview events carry no cookie or cross-session identifier, so **unique visitors and sessions cannot be derived** from this data — only raw pageview counts.",
  );
  lines.push("- No IP addresses or user-agent strings are stored.");
  lines.push("- All dates and timestamps are UTC. Day buckets are UTC calendar days.");
  lines.push("- Counts are live at `generatedAt`; re-request for fresher numbers.");
  lines.push("");

  lines.push("## How to query this endpoint");
  lines.push("");
  lines.push("```");
  lines.push("GET /admin-agent");
  lines.push("Authorization: Bearer <AGENT_API_KEY>");
  lines.push("");
  lines.push("Query parameters:");
  lines.push("  days=1|7|30|90|365   Window length. Default 30.");
  lines.push("  format=md|json       Response format. Default md.");
  lines.push("  pii=true             Include personal data of recent signups. Default false.");
  lines.push("  key=<AGENT_API_KEY>  Alternative to the Authorization header.");
  lines.push("```");
  lines.push("");

  return lines.join("\n");
}
