import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FadeUp } from "@/components/FadeUp";
import { WaitlistForm } from "@/components/WaitlistForm";

export const Route = createFileRoute("/changelog")({
  head: () => ({
    meta: [
      { title: "Changelog — ComplianceGuard" },
      { name: "description", content: "ComplianceGuard changelog — every release documented. Latest: v3.1.0 with JTI token revocation and streaming file uploads." },
      { property: "og:title", content: "ComplianceGuard Changelog" },
      { property: "og:description", content: "Every change to ComplianceGuard, documented." },
      { property: "og:url", content: "https://complianceguard.dev/changelog" },
      { property: "og:image", content: "https://complianceguard.dev/og-image.png" },
      { name: "twitter:image", content: "https://complianceguard.dev/og-image.png" },
    ],
  }),
  component: ChangelogPage,
});

type Tag = { label: string; tone: "red" | "amber" | "green" | "blue" };

const entries: {
  date: string;
  version: string;
  title: string;
  tags: Tag[];
  bullets: string[];
}[] = [
  {
    date: "April 2026",
    version: "v3.1.0",
    title: "Security hardening and architecture completion",
    tags: [
      { label: "Security", tone: "red" },
      { label: "Performance", tone: "amber" },
      { label: "Fixed", tone: "green" },
    ],
    bullets: [
      "Added refresh token revocation with JTI tracking — stolen tokens can no longer be used after logout",
      "Added streaming file upload — oversized files rejected before loading into memory",
      "Fixed N+1 query on evidence collection status endpoint",
      "Fixed email verification enforcement on all authenticated routes",
      "Moved SOC 2 control definitions from hardcoded Python to YAML — framework changes no longer require deployment",
      "Unified API routing — all routes now follow /api/v1/* convention",
      "Removed unused frontend dependencies (4 packages removed, bundle size reduced)",
      "Added CI test asserting version string is identical across Python, TypeScript, and Electron files",
    ],
  },
  {
    date: "March 2026",
    version: "v3.0.0",
    title: "Major release — dual-mode SaaS/desktop architecture",
    tags: [
      { label: "Breaking", tone: "red" },
      { label: "Feature", tone: "blue" },
    ],
    bullets: [
      "Launched Electron desktop app alongside web SaaS version",
      "Ed25519 license signing — only public key ships with the binary",
      "AWS credential encryption using HKDF-SHA256 derived Fernet keys",
      "SOC 2 readiness score dashboard",
      "PDF evidence pack export",
      "Initial AWS CloudTrail and IAM evidence collection",
    ],
  },
];

const toneClass: Record<Tag["tone"], string> = {
  red: "bg-danger/10 text-danger",
  amber: "bg-[#F59E0B]/10 text-[#B45309]",
  green: "bg-teal/10 text-teal",
  blue: "bg-navy/10 text-navy",
};

const FILTERS = ["All", "Feature", "Security", "Performance", "Fixed", "Breaking"] as const;
type Filter = (typeof FILTERS)[number];

function ChangelogPage() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(() => {
    if (filter === "All") return entries;
    return entries.filter((e) => e.tags.some((t) => t.label === filter));
  }, [filter]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-background pt-20 pb-8">
        <div className="container-cg max-w-3xl">
          <FadeUp>
            <h1 className="text-[36px] md:text-[48px] font-bold text-navy">Changelog</h1>
            <p className="mt-4 text-[18px] text-text-secondary">
              Every change to ComplianceGuard, documented.
            </p>
          </FadeUp>

          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter changelog by tag">
            {FILTERS.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(active && f !== "All" ? "All" : f)}
                  aria-pressed={active}
                  className="text-[13px] px-3 py-1.5 rounded-[4px] border transition-colors duration-200"
                  style={{
                    borderColor: "#E2E8F0",
                    backgroundColor: active ? "#1B3A6B" : "#ffffff",
                    color: active ? "#ffffff" : "#1B3A6B",
                  }}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-background pb-16">
        <div className="container-cg max-w-3xl space-y-6">
          {visible.length === 0 ? (
            <p className="text-[15px] text-text-secondary">No releases match this filter yet.</p>
          ) : (
            visible.map((e, i) => (
              <FadeUp key={e.version} delay={i * 0.05}>
                <article
                  className="bg-white border border-border rounded-[12px] overflow-hidden"
                  style={{ borderLeft: "3px solid #1A8C5F" }}
                >
                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="bg-teal text-white text-[13px] font-semibold px-2.5 py-1 rounded">
                        {e.date}
                      </span>
                      <span className="bg-navy text-white text-[13px] font-semibold px-2.5 py-1 rounded">
                        {e.version}
                      </span>
                      {e.tags.map((t) => (
                        <span
                          key={t.label}
                          className={`text-[12px] font-semibold px-2 py-0.5 rounded ${toneClass[t.tone]}`}
                        >
                          {t.label}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-[22px] md:text-[24px] font-bold text-navy">{e.title}</h2>
                    <ul className="mt-5 space-y-2.5 text-[15px] text-text-secondary leading-[1.7] list-disc pl-5">
                      {e.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              </FadeUp>
            ))
          )}
        </div>
      </section>

      <section className="bg-background pb-24">
        <div className="container-cg max-w-3xl">
          <div
            className="rounded-[12px] bg-white"
            style={{ border: "1px solid #E2E8F0", padding: 32 }}
          >
            <p className="text-[16px] font-semibold text-navy">
              Get notified when new versions ship.
            </p>
            <p className="mt-1 text-[14px] text-text-secondary">
              No marketing emails. Release notes only.
            </p>
            <div className="mt-5">
              <WaitlistForm source="changelog_updates" buttonLabel="Notify Me" variant="onLight" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
