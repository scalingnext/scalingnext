/**
 * GET /admin-agent — machine-readable live site data for AI agents.
 *
 * Returns `text/markdown` by default (LLM-friendly: no DOM, no JS, no CSS to
 * strip) or JSON with `?format=json`. Authorised by AGENT_API_KEY in
 * middleware.ts via `Authorization: Bearer` or `?key=`.
 *
 * Implemented as a Route Handler rather than a page so the response is plain
 * text with no HTML wrapper, no hydration payload, and no framework markup for
 * an agent to parse around.
 *
 * PII is opt-in (`?pii=true`): an agent scraping on a schedule should not pull
 * names, emails, and phone numbers by default.
 */

import { NextResponse } from "next/server";
import { buildSnapshot, normalizeDays } from "@/lib/admin/snapshot";
import { renderMarkdown } from "@/lib/admin/markdown";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE = {
  "Cache-Control": "no-store, max-age=0",
  // Never let this endpoint be indexed or cited if a key ever leaks.
  "X-Robots-Tag": "noindex, nofollow, noarchive",
} as const;

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const days = normalizeDays(params.get("days"));
  const wantsJson = params.get("format") === "json";
  const includePII = params.get("pii") === "true";

  try {
    const snapshot = await buildSnapshot(days, includePII);

    if (wantsJson) {
      return NextResponse.json(
        {
          ...snapshot,
          _meta: {
            site: "https://scalingnext.in",
            piiIncluded: includePII,
            timezone: "UTC",
            notes: [
              "First-party analytics; began when tracking shipped. Absent history is not zero.",
              "No cookie or cross-session identifier is stored, so unique visitors and sessions cannot be derived.",
              "GA4 (G-QLXJ3B1L17) runs separately and its numbers will differ.",
            ],
            parameters: {
              days: "1|7|30|90|365 (default 30)",
              format: "md|json (default md)",
              pii: "true to include personal data of recent signups (default false)",
            },
          },
        },
        { headers: NO_STORE },
      );
    }

    return new NextResponse(renderMarkdown(snapshot, includePII), {
      status: 200,
      headers: { "Content-Type": "text/markdown; charset=utf-8", ...NO_STORE },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[admin-agent] failed:", message);

    // Structured even on failure, so an agent can branch on `error` rather than
    // having to interpret prose.
    if (wantsJson) {
      return NextResponse.json(
        { error: "upstream_failure", message },
        { status: 500, headers: NO_STORE },
      );
    }
    return new NextResponse(
      `# ScalingNext — Live Site Data\n\n**Status:** error\n\n**Message:** ${message}\n\nThe data source could not be reached. Retry later; do not treat this as zero traffic.\n`,
      { status: 500, headers: { "Content-Type": "text/markdown; charset=utf-8", ...NO_STORE } },
    );
  }
}
