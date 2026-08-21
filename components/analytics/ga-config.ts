/**
 * Shared GA4 config.
 *
 * Lives in its own module so the server component (GoogleAnalytics.tsx) and the
 * client component (GoogleAnalyticsPageview.tsx) can both import the ID without
 * one pulling the other across the server/client boundary.
 *
 * A GA4 Measurement ID is public by design — it ships in the page source of
 * every site that uses Analytics — so hardcoding it is correct, not a leak.
 */
export const GA_MEASUREMENT_ID = "G-QLXJ3B1L17";
