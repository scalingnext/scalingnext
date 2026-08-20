/**
 * GET /api/admin/stats — data for the human dashboard.
 * Protected by the session-cookie check in middleware.ts.
 *
 * Delegates to buildSnapshot so this and /admin-agent can never disagree.
 */

import { NextResponse } from "next/server";
import { buildSnapshot, normalizeDays } from "@/lib/admin/snapshot";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const days = normalizeDays(new URL(request.url).searchParams.get("days"));

  try {
    // Human dashboard shows real leads — that is its purpose.
    const snapshot = await buildSnapshot(days, true);
    return NextResponse.json(snapshot, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[admin/stats] failed:", message);
    // Surfaced verbatim: this dashboard has one operator, and the real Postgres
    // message (e.g. a missing table) is what makes the failure fixable.
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
