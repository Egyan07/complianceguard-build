import { createFileRoute } from "@tanstack/react-router";
import { VantaAlternativePage } from "@/routes/resources/vanta-alternative";
import { buildMeta } from "@/lib/site";

/**
 * Share alias for /resources/vanta-alternative.
 *
 * Why this exists: X and Discord key link-preview caches to the page's
 * canonical URL, so once the canonical /resources/vanta-alternative card was
 * cached, no query-string change could refresh it. A URL with its own canonical
 * is a new cache key.
 *
 * Trade-off: the content is identical to the canonical page, so this alias is
 * marked noindex,follow — Google keeps indexing the real page, and link equity
 * still flows through. Do not add this path to the sitemap.
 */
export const Route = createFileRoute("/r/vanta-alternative")({
  head: () => {
    const meta = buildMeta({
      title: "Vanta Alternative for SOC 2 Evidence | ComplianceGuard",
      description:
        "Why teams switch from Vanta: endpoint-native evidence collection, air-gapped support, source-available code, and a free tier. Compare cost, coverage, and architecture.",
      path: "/r/vanta-alternative",
      image: "/og/vanta-alternative.png",
      imageAlt: "Endpoint evidence a cloud tool cannot produce.",
    });
    return {
      meta: [...meta.meta, { name: "robots", content: "noindex, follow" }],
      links: meta.links,
    };
  },
  component: VantaAlternativePage,
});
