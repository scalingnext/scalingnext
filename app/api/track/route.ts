/**
 * POST /api/track — public, unauthenticated analytics beacon.
 *
 * Deliberately permissive: this is fire-and-forget telemetry from the browser,
 * so it never returns an error the visitor could notice and never blocks
 * navigation. Unknown or malformed payloads are dropped silently.
 *
 * PRIVACY: no IP address, no raw user-agent, no cookie, no cross-session ID is
 * stored. Only an event name, path, referrer host, coarse device bucket, and a
 * timestamp. Nothing here can re-identify a visitor.
 */

import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EVENTS = new Set(["pageview", "whatsapp_click", "form_submit"]);
const DEVICES = new Set(["desktop", "mobile", "tablet"]);
const MAX_BODY_BYTES = 1024;

export async function POST(request: Request) {
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return new NextResponse(null, { status: 204 });

    const body = JSON.parse(raw) as Record<string, unknown>;

    const event = typeof body.event === "string" ? body.event : "";
    if (!EVENTS.has(event)) return new NextResponse(null, { status: 204 });

    const path = typeof body.path === "string" ? body.path.slice(0, 200) : "/";

    // Store only the referrer's host, never the full URL — full URLs can carry
    // search terms or session tokens in query strings.
    let referrer: string | null = null;
    if (typeof body.referrer === "string" && body.referrer) {
      try {
        referrer = new URL(body.referrer).hostname.slice(0, 120);
      } catch {
        referrer = null;
      }
    }

    const device =
      typeof body.device === "string" && DEVICES.has(body.device) ? body.device : null;

    // Vercel resolves this at the edge; absent locally, which is expected.
    const country = request.headers.get("x-vercel-ip-country")?.slice(0, 2) ?? null;

    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from("analytics_events")
      .insert({ event, path, referrer, device, country });

    if (error) {
      console.error("[track] insert failed:", error.message);
    }
  } catch (error) {
    // Swallowed on purpose: a broken beacon must not surface to the visitor.
    // Logged so a systemic failure is still visible in server logs.
    console.error("[track] dropped event:", error);
  }

  return new NextResponse(null, { status: 204 });
}
