"use client";

/**
 * Admin login form. Replaces the HTTP Basic Auth popup.
 *
 * Includes a hidden readonly username field: that is what makes Chrome/Safari
 * password managers treat this as a saveable login rather than a bare text
 * input, so the credential gets offered for saving and autofilled next time.
 */

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Loader2, Lock } from "lucide-react";

export function AdminLogin() {
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const inFlight = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Only ever redirect to a same-site absolute path, so a crafted
  // ?next=https://evil.example cannot turn this into an open redirect.
  const nextPath = (() => {
    const raw = params.get("next") ?? "/admin";
    return raw.startsWith("/") && !raw.startsWith("//") ? raw : "/admin";
  })();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    if (!password) {
      setError("Enter your password.");
      return;
    }

    inFlight.current = true;
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(data?.error ?? "Could not sign in.");
        setSubmitting(false);
        inFlight.current = false;
        return;
      }

      // Full navigation rather than router.push: the middleware must re-run and
      // see the freshly-set cookie.
      window.location.href = nextPath;
    } catch {
      setError("Network error. Try again.");
      setSubmitting(false);
      inFlight.current = false;
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] px-5 text-white">
      <div className="w-full max-w-[380px]">
        <div className="mb-7 text-center">
          <span className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#262626] bg-[#151515]">
            <Lock size={17} className="text-[#C4C4C4]" strokeWidth={1.8} />
          </span>
          <h1 className="text-[22px] font-bold tracking-[-0.02em]">ScalingNext Admin</h1>
          <p className="mt-1.5 text-[13px] text-[#7A7A7A]">Enter your password to continue.</p>
        </div>

        <form
          onSubmit={onSubmit}
          className="relative rounded-2xl border border-[#222222] bg-[#111111] p-6"
          autoComplete="on"
        >
          {/* Present so password managers treat this as a saveable login. */}
          <input
            type="text"
            name="username"
            value="admin"
            readOnly
            autoComplete="username"
            aria-hidden
            tabIndex={-1}
            className="pointer-events-none absolute h-0 w-0 opacity-0"
          />

          <label
            htmlFor="admin-password"
            className="mb-2 block text-[13px] font-medium text-[#C4C4C4]"
          >
            Password
          </label>
          <input
            ref={inputRef}
            id="admin-password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError(null);
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "admin-password-error" : undefined}
            className="w-full rounded-xl border border-[#2A2A2A] bg-[#0F0F0F] px-4 py-3 text-[15px] text-white outline-none transition-colors placeholder:text-[#4A4A4A] focus:border-[#4A4A4A] focus:ring-1 focus:ring-[#4A4A4A]"
          />

          {error && (
            <p id="admin-password-error" role="alert" className="mt-2 text-[12.5px] text-[#E58A8A]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-[14px] text-[15px] font-semibold text-[#111111] transition-colors hover:bg-[#EDEDED] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Signing in…
              </>
            ) : (
              <>
                Continue
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>

        <p className="mt-5 text-center text-[11.5px] text-[#5A5A5A]">
          You&apos;ll stay signed in on this device for 30 days.
        </p>
      </div>
    </div>
  );
}
