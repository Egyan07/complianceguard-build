import { createFileRoute } from "@tanstack/react-router";
import { Soc2ChecklistPage } from "@/routes/resources/soc2-checklist";
import { buildMeta } from "@/lib/site";

/**
 * Share alias for /resources/soc2-checklist — see the note in
 * /r/vanta-alternative for the cache reason. Self-canonical, noindex,follow.
 */
export const Route = createFileRoute("/r/soc2-checklist")({
  head: () => {
    const meta = buildMeta({
      title: "SOC 2 Readiness Checklist (24 Items) | ComplianceGuard",
      description:
        "A practical SOC 2 readiness checklist covering access control, encryption, audit logging, incident response, vendor management, and change management — 24 items auditors check first.",
      path: "/r/soc2-checklist",
      image: "/og/soc2-checklist.png",
      imageAlt: "24 SOC 2 checklist items, 10 collected from the machine.",
    });
    return {
      meta: [...meta.meta, { name: "robots", content: "noindex, follow" }],
      links: meta.links,
    };
  },
  component: Soc2ChecklistPage,
});
