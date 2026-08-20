/**
 * Signed session token for /admin, shared by the Edge middleware and the Node
 * route handlers.
 *
 * Uses Web Crypto HMAC-SHA256 rather than a JWT library: it is available on
 * both the Edge and Node runtimes, and a signed expiry is the entire payload we
 * need. No session store, no extra dependency.
 *
 * The cookie is httpOnly + sameSite=lax + signed, so it cannot be read by
 * client JavaScript and cannot be forged without ADMIN_PASSWORD.
 */

export const SESSION_COOKIE = "sn_admin";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

function base64url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sign(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return base64url(new Uint8Array(signature));
}

/**
 * Builds a `<expiryMillis>.<hmac>` token. The secret is ADMIN_PASSWORD itself,
 * so changing the password invalidates every existing session for free.
 */
export async function createSessionToken(secret: string): Promise<string> {
  const expiry = String(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);
  return `${expiry}.${await sign(expiry, secret)}`;
}

export async function verifySessionToken(
  token: string | undefined,
  secret: string,
): Promise<boolean> {
  if (!token) return false;

  const separator = token.lastIndexOf(".");
  if (separator === -1) return false;

  const expiry = token.slice(0, separator);
  const signature = token.slice(separator + 1);

  if (!/^\d+$/.test(expiry) || Number(expiry) < Date.now()) return false;

  return timingSafeEqual(signature, await sign(expiry, secret));
}

/**
 * Compares two strings without an early return, so a matching prefix does not
 * resolve faster than a mismatched one. crypto.timingSafeEqual is unavailable
 * on the Edge runtime; charCodeAt past the end yields NaN, normalised by `|| 0`.
 */
export function timingSafeEqual(a: string, b: string): boolean {
  let mismatch = a.length ^ b.length;
  const length = Math.max(a.length, b.length);
  for (let i = 0; i < length; i++) {
    mismatch |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return mismatch === 0;
}
