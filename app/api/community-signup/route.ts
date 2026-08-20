/**
 * POST /api/community-signup
 *
 * Public, unauthenticated write endpoint backing the /twitter, /insta, and /yt
 * signup forms. Order of operations:
 *   1. size-cap + parse the body
 *   2. re-validate every field server-side (client validation is not trusted)
 *   3. per-IP rate limit
 *   4. insert into Supabase
 *   5. send the confirmation email
 *
 * SECURITY NOTE: rate limiting here is in-memory, so it is per-instance and
 * resets on cold start. It deters casual abuse; it does not stop a determined
 * attacker. A CAPTCHA (Cloudflare Turnstile) is the real fix if this endpoint
 * ever gets targeted.
 */

import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { sendMail } from "@/lib/email";
import { buildWelcomeEmail } from "@/lib/emails/welcome";
import { validateLead, type LeadInput } from "@/lib/validation/lead";
import { SOURCE_LABELS, WHATSAPP_INVITE_URL } from "@/components/community/channels";

// nodemailer requires Node APIs; it cannot run on the Edge runtime.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 4096;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    // Opportunistic cleanup so the map cannot grow without bound.
    if (hits.size > 1000) {
      for (const [key, value] of hits) {
        if (now > value.resetAt) hits.delete(key);
      }
    }
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  // 1. Size cap before parsing, so a huge body is rejected cheaply.
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Payload too large." }, { status: 413 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (typeof payload !== "object" || payload === null) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // 2. Server-side validation. Only allowlisted fields are read; anything else
  //    in the payload is discarded rather than passed through to the database.
  const result = validateLead(payload as Partial<LeadInput>);
  if (!result.ok) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", fields: result.errors },
      { status: 400 },
    );
  }
  const lead = result.value;

  // 3. Rate limit (after validation so garbage traffic does not consume quota
  //    for a legitimate user behind the same NAT).
  if (rateLimited(clientIp(request))) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again in a minute." },
      { status: 429 },
    );
  }

  // 4. Persist.
  let supabase;
  try {
    supabase = getSupabaseAdmin();
  } catch (error) {
    console.error("[community-signup] Supabase not configured:", error);
    return NextResponse.json(
      { error: "Signup is temporarily unavailable. Please try again later." },
      { status: 500 },
    );
  }

  const { error: insertError } = await supabase.from("community_leads").insert({
    name: lead.name,
    email: lead.email,
    country: lead.country,
    phone_code: lead.phoneCode,
    phone: lead.phone,
    knows_coding: lead.knowsCoding,
    role: lead.role,
    experience: lead.experience,
    marketing_opt_in: lead.marketingOptIn,
    source: lead.source,
  });

  let alreadyJoined = false;
  if (insertError) {
    if (insertError.code === "23505") {
      // Unique violation on (lower(email), source). This person already signed
      // up through this channel — show them success, not a confusing error.
      alreadyJoined = true;
    } else {
      console.error("[community-signup] Insert failed:", insertError);
      return NextResponse.json(
        { error: "Could not save your details. Please try again." },
        { status: 500 },
      );
    }
  }

  // 5. Send the confirmation email. A send failure is logged but does NOT fail
  //    the request: the lead is already captured, and discarding it would be
  //    strictly worse than a missing email.
  let emailSent = false;
  try {
    const { subject, html, text } = buildWelcomeEmail({
      name: lead.name,
      channelLabel: SOURCE_LABELS[lead.source],
      inviteUrl: WHATSAPP_INVITE_URL,
    });
    await sendMail({ to: lead.email, subject, html, text });
    emailSent = true;
  } catch (error) {
    console.error("[community-signup] Email send failed:", error);
  }

  return NextResponse.json(
    { ok: true, alreadyJoined, emailSent, inviteUrl: WHATSAPP_INVITE_URL },
    { status: alreadyJoined ? 200 : 201 },
  );
}
