/**
 * POST /api/admin/login — exchanges the admin password for a signed session
 * cookie. Left open by middleware.ts, or nobody could ever sign in.
 *
 * Rate limited per IP: this is the one endpoint where guessing the password is
 * possible, so a bare-minimum brute-force brake matters. In-memory, so it is
 * per-instance and resets on cold start — it slows a casual attacker, it does
 * not stop a determined one.
 */

import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  timingSafeEqual,
} from "@/lib/admin/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 8;
const attempts = new Map<string, { count: number; resetAt: number }>();

function throttled(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);

  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    if (attempts.size > 500) {
      for (const [key, value] of attempts) {
        if (now > value.resetAt) attempts.delete(key);
      }
    }
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

export async function POST(request: Request) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    console.error("[admin/login] ADMIN_PASSWORD is not set");
    return NextResponse.json({ error: "Admin is not configured." }, { status: 503 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (throttled(ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Wait a minute and try again." },
      { status: 429 },
    );
  }

  let password = "";
  try {
    const raw = await request.text();
    if (raw.length > 1024) throw new Error("payload too large");
    const body = JSON.parse(raw) as { password?: unknown };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!timingSafeEqual(password, expected)) {
    // Deliberately vague: never reveal whether the password was close.
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: SESSION_COOKIE,
    value: await createSessionToken(expected),
    httpOnly: true, // unreadable by client JS
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return response;
}

/** DELETE /api/admin/login — logout. Clears the session cookie. */
export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}
