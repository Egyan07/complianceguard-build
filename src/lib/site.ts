/**
 * Single source of truth for site-wide facts.
 * Version, URLs, and pricing must never be hand-duplicated in components.
 */
export const SITE_URL = "https://complianceguard.alexisegyan1232.workers.dev";
export const VERSION = "3.3.1";

export const GITHUB_URL = "https://github.com/Egyan07/ComplianceGuard";
export const DOWNLOAD_URL = `${GITHUB_URL}/releases/latest`;
export const CONTACT_EMAIL = "alexisegyan1232@gmail.com";

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

/** Pricing tiers — consumed by the landing preview and /pricing. */
export type Tier = {
  name: string;
  monthly: number;
  annual: number | null;
  tagline: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
};

export const TIERS: Tier[] = [
  {
    name: "Free",
    monthly: 0,
    annual: null,
    tagline: "See exactly where you stand on SOC 2 before you pay anything.",
    features: [
      "SOC 2 readiness score",
      "5 control areas visible",
      "Local OS scan (Windows + macOS)",
      "No account, no credit card",
    ],
    cta: { label: "Download Free", href: DOWNLOAD_URL },
  },
  {
    name: "Pro",
    monthly: 49,
    annual: 399,
    tagline: "Everything you need to hand an auditor a complete evidence pack.",
    features: [
      "SOC 2 (29) · ISO 27001 (47) · HIPAA (47)",
      "Per-control scoring, gaps, and remediation scripts",
      "AWS evidence auto-sync",
      "PDF evidence pack export",
      "Evaluation history and score trends",
      "Email support",
    ],
    cta: { label: "Start with Pro", href: salesMailto("ComplianceGuard Pro") },
    featured: true,
  },
  {
    name: "Managed",
    monthly: 79,
    annual: 759,
    tagline: "For consultants managing compliance readiness for multiple clients.",
    features: [
      "Everything in Pro",
      "Up to 5 client workspaces",
      "Centralized billing dashboard",
      "White-label PDF reports",
      "Priority email support",
    ],
    cta: { label: "Contact Sales", href: salesMailto("ComplianceGuard Managed") },
  },
];
