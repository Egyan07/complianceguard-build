/**
 * Stage-5 conversion tracking (content calendar, week 1).
 *
 * Two goals, decided 2026-10-15:
 *   - download_click        primary conversion (free-tier download)
 *   - contact_sales_click   high-intent (sales mailto CTAs)
 * Every event carries a `location` prop naming the exact placement
 * (hero, navbar, footer, pricing-pro, …) so CTA performance compares.
 *
 * Calls `window.umami.track()` directly instead of data-umami-event
 * attributes: umami's attribute path intercepts clicks before other
 * listeners run (their docs note "other event listeners inside the
 * element will not be triggered"), which can swallow React's delegated
 * handlers. The JS path leaves SPA routing untouched and no-ops when
 * the tracker is absent (dev/local builds without VITE_UMAMI_WEBSITE_ID).
 */

export type ConversionEvent = "download_click" | "contact_sales_click";

declare global {
  interface Window {
    umami?: { track: (event: string, data?: { props?: Record<string, string> }) => void };
  }
}

export function trackConversion(event: ConversionEvent, location: string): void {
  if (typeof window === "undefined" || typeof window.umami?.track !== "function") return;
  void window.umami.track(event, { props: { location } });
}
