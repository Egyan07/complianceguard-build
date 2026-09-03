/**
 * Single source of truth for site-wide facts.
 * Version, URLs, and pricing must never be hand-duplicated in components.
 */
export const SITE_URL = "https://complianceguard.cguard.workers.dev";
export const VERSION = "3.9.0";

export const GITHUB_URL = "https://github.com/Egyan07/ComplianceGuard";
export const DOWNLOAD_URL = `${GITHUB_URL}/releases/latest`;
export const CONTACT_EMAIL = "getcomplianceguard@gmail.com";

/**
 * Demo video — the 60-second SaaS promo, hosted as a GitHub
 * user-attachments asset (served as video/mp4; free, no billing/CC
 * requirement). Uploaded by dragging the mp4 into a GitHub issue editor.
 */
export const DEMO_VIDEO_URL =
  "https://github.com/user-attachments/assets/361db401-fa40-4217-8259-681a21d914dc";

export const salesMailto = (subject: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

/** Absolute-URL meta builder — canonical/og tags must never be relative. */
export function buildMeta(opts: { title: string; description: string; path: string }) {
  const url = `${SITE_URL}${opts.path}`;
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { property: "og:title", content: opts.title },
      { property: "og:description", content: opts.description },
      { property: "og:url", content: url },
      { property: "og:image", content: `${SITE_URL}/og-image.png` },
      { name: "twitter:title", content: opts.title },
      { name: "twitter:description", content: opts.description },
      { name: "twitter:image", content: `${SITE_URL}/og-image.png` },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

/**
 * Pricing tiers — consumed by the landing preview and /pricing.
 * Source of truth: product README v3.9.0 "Pricing" section.
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
      "Evidence collection — all 8 categories",
      "12 core SOC 2 controls",
      "Overall compliance score",
      "1 machine · 1 user · community support",
    ],
    cta: { label: "Download Free", href: DOWNLOAD_URL },
  },
  {
    name: "Pro",
    monthly: 149,
    managedMonthly: 229,
    tagline: "Everything you need to hand an auditor a complete evidence pack.",
    features: [
      "All 54 SOC 2 controls · ISO 27001 (47) · HIPAA (47)",
      "Per-control scoring, gaps, and remediation scripts",
      "Control heatmap and score trend (Type II timeline)",
      "Manual evidence upload + evaluation history",
      "PDF audit-ready reports",
      "Cloud dashboard — up to 10 machines, 10 users",
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
      "Tamper-evident audit log (SHA-256 hash chain)",
      "RBAC — admin and auditor roles",
      "Custom PDF branding",
      "Full compliance data export (NDJSON)",
      "Air-gapped Docker bundle · zero telemetry",
      "Unlimited machines and users · dedicated SLA",
    ],
    cta: { label: "Contact Sales", href: salesMailto("ComplianceGuard Enterprise") },
  },
];
