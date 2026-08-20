/**
 * Server-only Supabase client.
 *
 * SECURITY: this module reads SUPABASE_SERVICE_ROLE_KEY, which bypasses Row
 * Level Security entirely. It MUST NOT be imported from any file that carries
 * the "use client" directive, or the key would be inlined into the browser
 * bundle. Only `app/api/community-signup/route.ts` imports it today.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export class MissingSupabaseConfigError extends Error {
  constructor(missing: string[]) {
    super(`Missing Supabase environment variables: ${missing.join(", ")}`);
    this.name = "MissingSupabaseConfigError";
  }
}

export function getSupabaseAdmin(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const missing: string[] = [];
  if (!url) missing.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!serviceRoleKey) missing.push("SUPABASE_SERVICE_ROLE_KEY");
  if (missing.length > 0) {
    // Fail loudly rather than returning a half-configured client that would
    // produce a confusing runtime error deeper in the request.
    throw new MissingSupabaseConfigError(missing);
  }

  return createClient(url!, serviceRoleKey!, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      // Next.js patches global fetch with its Data Cache, which caches PostgREST
      // GET responses across requests. Without this, the admin dashboard serves
      // stale counts — including replaying an empty result recorded before the
      // analytics table existed. Opt every query out explicitly.
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
    },
  });
}
