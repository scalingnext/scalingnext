"use client";

/**
 * Client-side analytics beacon.
 *
 * Fires a `pageview` on mount and on every App Router navigation, and captures
 * clicks on any WhatsApp community link anywhere on the site via a single
 * document-level listener (rather than editing all six FlowButton call sites).
 *
 * Uses sendBeacon so the request survives the page unloading when someone
 * clicks through to WhatsApp — a plain fetch would be cancelled mid-flight.
 */

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function deviceBucket(): "desktop" | "mobile" | "tablet" {
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

function send(event: string, path: string) {
  const payload = JSON.stringify({
    event,
    path,
    referrer: document.referrer || null,
    device: deviceBucket(),
  });

  // sendBeacon is fire-and-forget and survives unload; fetch is the fallback
  // for the rare browser without it.
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/track", new Blob([payload], { type: "application/json" }));
  } else {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  }
}

export function Tracker() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  // Pageviews. Guarded by a ref so React Strict Mode's double-invoked effect
  // in development does not double-count.
  useEffect(() => {
    if (!pathname || lastPath.current === pathname) return;
    lastPath.current = pathname;
    send("pageview", pathname);
  }, [pathname]);

  // One delegated listener for every WhatsApp CTA on the site.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      if (href.includes("chat.whatsapp.com")) {
        send("whatsapp_click", window.location.pathname);
      }
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
