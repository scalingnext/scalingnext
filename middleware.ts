/**
 * Auth gate for the admin surfaces.
 *
 *   /admin, /api/admin/*  → signed httpOnly session cookie (login form)
 *   /admin-agent          → Bearer token / ?key= (for AI agents, no cookies)
 *
 * Replaced HTTP Basic Auth: the native browser popup could not be styled and
 * had no logout. A signed 30-day cookie means one login per month, and Chrome's
 * password manager still offers to save the form.
 *
 * Fails closed: if ADMIN_PASSWORD (or AGENT_API_KEY) is unset, the matching
 * route returns 503 rather than allowing access.
 */

import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken, timingSafeEqual } from "@/lib/admin/session";

const LOGIN_PATH = "/admin/login";

function misconfigured(what: string): NextResponse {
  return new NextResponse(`${what} is not configured on the server.`, {
    status: 503,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // ── Agent endpoint: token auth, machine-readable errors ──────────────────
  if (pathname.startsWith("/admin-agent")) {
    const key = process.env.AGENT_API_KEY;
    if (!key) return misconfigured("AGENT_API_KEY");

    const header = request.headers.get("authorization") ?? "";
    const bearer = header.startsWith("Bearer ") ? header.slice(7) : "";
    const queryKey = request.nextUrl.searchParams.get("key") ?? "";

    if (!timingSafeEqual(bearer, key) && !timingSafeEqual(queryKey, key)) {
      return NextResponse.json(
        {
          error: "unauthorized",
          message:
            "Provide the agent key as `Authorization: Bearer <AGENT_API_KEY>` or `?key=<AGENT_API_KEY>`.",
        },
        { status: 401, headers: { "Cache-Control": "no-store" } },
      );
    }

    return NextResponse.next();
  }

  // ── Login page and its API stay open, or nobody could ever sign in ───────
  if (pathname === LOGIN_PATH || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  const password = process.env.ADMIN_PASSWORD;
  if (!password) return misconfigured("ADMIN_PASSWORD");

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (await verifySessionToken(token, password)) {
    return NextResponse.next();
  }

  // API calls get JSON so the dashboard's fetch can react; page loads get a
  // redirect carrying `next` so login returns the user where they aimed.
  if (pathname.startsWith("/api/")) {
    return NextResponse.json(
      { error: "unauthorized", message: "Session expired. Reload and sign in again." },
      { status: 401, headers: { "Cache-Control": "no-store" } },
    );
  }

  const loginUrl = new URL(LOGIN_PATH, request.url);
  loginUrl.searchParams.set("next", pathname + search);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  // /api/track stays public — it is how visitors report pageviews.
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*", "/admin-agent", "/admin-agent/:path*"],
};
