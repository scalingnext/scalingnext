"use client";

/**
 * GA4 SPA pageview tracking.
 *
 * `gtag('config')` in GoogleAnalytics.tsx fires exactly one pageview, on the
 * initial document load. App Router navigations are client-side, so without
 * this hook a visitor going / -> /about registers as a single pageview in GA4.
 *
 * `send_page_view: false` on the config call means this component owns every
 * pageview, including the first one. That avoids the classic double-count where
 * both the config call and a route effect report the same landing page.
 */

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { GA_MEASUREMENT_ID } from "./ga-config";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function GoogleAnalyticsPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Guards against React Strict Mode double-invoking effects in development,
  // which would otherwise report each pageview twice.
  const lastSent = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;

    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    if (lastSent.current === url) return;

    // gtag.js loads with strategy="afterInteractive", so on a cold load this
    // effect can run before gtag() is defined. Pushing to dataLayer directly
    // still works — gtag.js replays the queue once it initialises, so no
    // pageview is lost to a race.
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push([
      "event",
      "page_view",
      {
        page_path: url,
        page_location: window.location.href,
        page_title: document.title,
        send_to: GA_MEASUREMENT_ID,
      },
    ]);

    lastSent.current = url;
  }, [pathname, searchParams]);

  return null;
}
