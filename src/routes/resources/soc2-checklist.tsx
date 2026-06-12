import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { buildMeta, DOWNLOAD_URL } from "@/lib/site";

export const Route = createFileRoute("/resources/soc2-checklist")({
  head: () =>
    buildMeta({
      title: "SOC 2 Readiness Checklist — ComplianceGuard",
      description:
        "A practical SOC 2 readiness checklist covering access control, encryption, audit logging, incident response, vendor management, and change management.",
      path: "/resources/soc2-checklist",
    }),
  component: Soc2ChecklistPage,
});

type Item = { id: string; text: string; auto?: boolean };
type Group = { heading: string; items: Item[] };

const groups: Group[] = [
  {
    heading: "Access Control",
    items: [
      { id: "ac-1", text: "Password policy enforces minimum length and complexity", auto: true },
      {
        id: "ac-2",
        text: "Multi-factor authentication enabled for all admin accounts",
        auto: true,
      },
      { id: "ac-3", text: "User account list reviewed quarterly", auto: true },
      { id: "ac-4", text: "Terminated employee accounts disabled within 24 hours", auto: true },
      { id: "ac-5", text: "Access provisioning process documented" },
    ],
  },
  {
    heading: "Encryption",
    items: [
      { id: "enc-1", text: "Disk encryption enabled on all endpoint machines", auto: true },
      { id: "enc-2", text: "AWS S3 buckets encrypted at rest", auto: true },
      { id: "enc-3", text: "Data in transit encrypted with TLS 1.2 or higher" },
      { id: "enc-4", text: "Database encryption enabled" },
    ],
  },
  {
    heading: "Audit Logging",
    items: [
      { id: "log-1", text: "Windows Event Log / macOS audit log enabled", auto: true },
      { id: "log-2", text: "AWS CloudTrail enabled in all regions", auto: true },
      { id: "log-3", text: "Log retention policy defined (minimum 90 days)" },
      { id: "log-4", text: "Logs reviewed regularly for anomalies" },
    ],
  },
  {
    heading: "Incident Response",
    items: [
      { id: "ir-1", text: "Incident response plan documented" },
      { id: "ir-2", text: "Security event alerting configured", auto: true },
      { id: "ir-3", text: "Incident response plan tested in last 12 months" },
      { id: "ir-4", text: "Incident log maintained" },
    ],
  },
  {
    heading: "Vendor Management",
    items: [
      { id: "vm-1", text: "Third-party vendor list maintained" },
      { id: "vm-2", text: "Vendor security reviews conducted annually" },
      { id: "vm-3", text: "Vendor contracts include security requirements" },
    ],
  },
  {
    heading: "Change Management",
    items: [
      { id: "cm-1", text: "Software inventory maintained", auto: true },
      { id: "cm-2", text: "Code review process documented" },
      { id: "cm-3", text: "Deployment process documented" },
      { id: "cm-4", text: "Change log maintained" },
    ],
  },
];

const TOTAL_ITEMS = groups.reduce((sum, g) => sum + g.items.length, 0);
const STORAGE_KEY = "cg-soc2-checklist";

function AutoBadge() {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full bg-azure/10 px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.04em] text-azure">
      Auto
    </span>
  );
}

function Soc2ChecklistPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  // localStorage is browser-only — hydrate saved progress after mount.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setChecked(JSON.parse(raw) as Record<string, boolean>);
    } catch {
      // Ignore malformed saved state.
    }
  }, []);

  function toggle(id: string) {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Storage unavailable (private mode, quota) — state still works in-memory.
      }
      return next;
    });
  }

  const done = groups.reduce(
    (sum, g) => sum + g.items.filter((item) => checked[item.id]).length,
    0,
  );

  return (
    <div className="min-h-screen flex flex-col bg-snow">
      <Navbar />
      <main id="main" className="flex-1">
        <PageHero
          eyebrow="Resources"
          title="SOC 2 readiness checklist."
          subtitle="Assess your readiness before engaging an auditor. Check items off as you go — progress saves automatically in this browser."
          ornament="none"
        />

        <div className="container-cg pb-24">
          <div className="mx-auto max-w-[680px]">
            <p className="text-[17px] text-ink-2 leading-[1.65]">
              ComplianceGuard automates the evidence collection for every item marked <AutoBadge />.
              The rest are process controls your team documents once.
            </p>

            {/* Progress */}
            <div className="mt-10">
              <div className="flex items-baseline justify-between">
                <p className="caption font-semibold text-ink">
                  {done} of {TOTAL_ITEMS} complete
                </p>
                <p className="caption text-ink-3">{Math.round((done / TOTAL_ITEMS) * 100)}%</p>
              </div>
              <div
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={TOTAL_ITEMS}
                aria-valuenow={done}
                aria-label="Checklist progress"
                className="mt-2 h-1 w-full overflow-hidden rounded-full bg-fog"
              >
                <div
                  className="h-full rounded-full bg-azure transition-[width] duration-500"
                  style={{ width: `${(done / TOTAL_ITEMS) * 100}%` }}
                />
              </div>
            </div>

            {/* Groups */}
            <div className="mt-12 space-y-12">
              {groups.map((group) => (
                <Reveal key={group.heading}>
                  <section>
                    <h2 className="text-[20px] font-semibold text-ink">{group.heading}</h2>
                    <div className="card-snow mt-4 overflow-hidden">
                      {group.items.map((item, i) => {
                        const isChecked = Boolean(checked[item.id]);
                        return (
                          <label
                            key={item.id}
                            className={`flex cursor-pointer items-center gap-3 px-5 py-3.5 transition-colors hover:bg-fog ${
                              i > 0 ? "border-t border-hairline" : ""
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggle(item.id)}
                              className="h-[18px] w-[18px] shrink-0 cursor-pointer"
                              style={{ accentColor: "var(--azure)" }}
                            />
                            <span
                              className={`flex-1 text-[15px] leading-[1.5] ${
                                isChecked ? "text-ink-3 line-through" : "text-ink-2"
                              }`}
                            >
                              {item.text}
                            </span>
                            {item.auto && <AutoBadge />}
                          </label>
                        );
                      })}
                    </div>
                  </section>
                </Reveal>
              ))}
            </div>

            {/* Closing CTA */}
            <Reveal className="mt-16">
              <div className="card-fog p-8 md:p-10 text-center">
                <h2 className="display-3">Let the scan check the boxes for you.</h2>
                <p className="mx-auto mt-3 max-w-[480px] text-[16px] text-ink-2 leading-[1.6]">
                  ComplianceGuard collects the evidence for every Auto item above and shows your
                  readiness score across all 29 SOC 2 controls it tracks.
                </p>
                <a href={DOWNLOAD_URL} className="btn-primary mt-6 inline-flex">
                  Download Free
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
