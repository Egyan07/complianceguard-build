/**
 * Single source of truth for site-wide facts.
 * Version, URLs, and pricing must never be hand-duplicated in components.
 */
export const SITE_URL = "https://complianceguard.cguard.workers.dev";
export const VERSION = "4.2.4";

export const GITHUB_URL = "https://github.com/Egyan07/ComplianceGuard";
export const DOWNLOAD_URL = `${GITHUB_URL}/releases/latest`;
export const CONTACT_EMAIL = "getcomplianceguard@gmail.com";

/**
 * Demo video — the 60-second SaaS promo, bundled with the site itself
 * (same-origin, so it always plays; no third-party hosting dependency).
 */
export const DEMO_VIDEO_URL = "/videos/complianceguard-demo.mp4";

export const salesMailto = (subject: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

/**
 * Absolute-URL meta builder — canonical/og tags must never be relative.
 * `image` is a site-relative path to a 1200x630 card; omit it for the shared
 * brand card. Width/height/alt are declared because link previews render the
 * large card more reliably when the dimensions are known up front.
 */
export function buildMeta(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
}) {
  const url = `${SITE_URL}${opts.path}`;
  const image = `${SITE_URL}${opts.image ?? "/og-image.png"}`;
  const imageAlt = opts.imageAlt ?? opts.title;
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { property: "og:title", content: opts.title },
      { property: "og:description", content: opts.description },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: imageAlt },
      { name: "twitter:title", content: opts.title },
      { name: "twitter:description", content: opts.description },
      { name: "twitter:image", content: image },
      { name: "twitter:image:alt", content: imageAlt },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

/**
 * Pricing tiers — consumed by the landing preview and /pricing.
 * Source of truth: product README v4.2.4 "Pricing" section.
 * Two deployment models: self-hosted (you manage the server) and
 * managed hosting (we manage it). Prices are per month, billed annually.
 */
export type Tier = {
  name: string;
  /** Self-hosted price per month, billed annually. */
  monthly: number;
  /** Managed-hosting price per month, billed annually. Null = self-hosted only. */
  managedMonthly: number | null;
  tagline: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
};

export const TIERS: Tier[] = [
  {
    name: "Free",
    monthly: 0,
    managedMonthly: null,
    tagline: "See exactly where you stand on SOC 2 before you pay anything.",
    features: [
      "Evidence collection (all 8 categories, all 3 OSes)",
      "All 43 SOC 2 criteria, overall coverage score",
      "Evidence coverage and readiness trend",
      "1 machine · 1 user · community support",
    ],
    cta: { label: "Download Free", href: DOWNLOAD_URL },
  },
  {
    name: "Pro",
    monthly: 149,
    managedMonthly: 229,
    tagline: "Everything you need to walk into the audit with a complete evidence pack.",
    features: [
      "SOC 2 (43 criteria) · ISO 27001:2022 (93) · HIPAA (47) · GDPR (38)",
      "Per-control scoring, gaps, and remediation scripts",
      "Control heatmap and evidence coverage trend per framework",
      "Manual evidence upload + evaluation history",
      "PDF evidence reports, mapped control by control",
      "Cloud dashboard (up to 10 machines, 10 users)",
      "Email support",
    ],
    cta: { label: "Start with Pro", href: salesMailto("ComplianceGuard Pro") },
    featured: true,
  },
  {
    name: "Enterprise",
    monthly: 599,
    managedMonthly: 999,
    tagline: "Tamper-evident, air-gapped sovereignty for regulated industries.",
    features: [
      "Everything in Pro",
      "Tamper-evident audit log (HMAC-SHA256 hash chain)",
      "RBAC (admin and auditor roles)",
      "Custom PDF branding",
      "Full compliance data export (NDJSON)",
      "Air-gapped Docker bundle · zero telemetry",
      "Unlimited machines and users · dedicated SLA",
    ],
    cta: { label: "Contact Sales", href: salesMailto("ComplianceGuard Enterprise") },
  },
];
