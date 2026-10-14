import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { buildMeta, DOWNLOAD_URL } from "@/lib/site";

export const Route = createFileRoute("/resources/soc2-checklist")({
  head: () => ({
    ...buildMeta({
      title: "SOC 2 Readiness Checklist | ComplianceGuard",
      description:
        "A practical SOC 2 readiness checklist covering access control, encryption, audit logging, incident response, vendor management, and change management — 24 items auditors check first.",
      path: "/resources/soc2-checklist",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: CHECKLIST_FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Soc2ChecklistPage,
});

type Faq = { q: string; a: string };

const CHECKLIST_FAQS: Faq[] = [
  {
    q: "How long does SOC 2 readiness take?",
    a: "For a small SaaS team starting from nothing: 4–8 weeks to gather evidence and pass a Type I assessment, and 6–12 months for a Type II because the audit includes an observation window during which your controls must operate continuously. Starting evidence collection early is the single biggest lever — teams that begin scanning before they need the report cut their prep time dramatically.",
  },
  {
    q: "How many of these items can be automated?",
    a: "In this checklist, 10 of 24 items are marked Auto — password policy, MFA on admin accounts, account reviews, disk encryption, event log state, and more. ComplianceGuard collects the evidence for every Auto item in a single scan, so those rows become an evidence pack instead of a to-do list. The remaining 14 items are process controls: documented once, reviewed periodically.",
  },
  {
    q: "What is the difference between SOC 2 Type I and Type II?",
    a: "Type I assesses whether your controls are suitably designed at a single point in time — a snapshot. Type II assesses whether those controls operated effectively over a period, usually 3–12 months. Enterprise buyers almost always require Type II, so if a contract is waiting on you, plan for the observation window.",
  },
  {
    q: "Do I need an auditor to start collecting evidence?",
    a: "No — and you shouldn't wait for one. Evidence collection is mechanical: read the OS, read your cloud configuration, hash and store the result. Engagement with a licensed CPA firm starts once you have the evidence pack and are ready for the formal assessment. Using ComplianceGuard, the free tier gives you a readiness score in about two minutes, before any auditor is involved.",
  },
];

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
const AUTO_ITEMS = groups.reduce((sum, g) => sum + g.items.filter((i) => i.auto).length, 0);
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
          subtitle="Assess your readiness before engaging an auditor. Check items off as you go; progress saves automatically in this browser."
          ornament="none"
        />

        <div className="container-cg pb-24">
          <div className="mx-auto max-w-[680px]">
            <p className="mono-tag">Last updated · October 2026</p>

            <p className="mt-6 text-[17px] text-ink-2 leading-[1.65]">
              This is the checklist a SOC 2 auditor works from when they assess your readiness
              against the AICPA Trust Services Criteria. It covers {TOTAL_ITEMS} concrete items
              across six control areas, from password policy to change management — the same
              categories that show up in every readiness review, whether you are preparing for Type
              I or Type II.
            </p>

            <p className="mt-4 text-[17px] text-ink-2 leading-[1.65]">
              {AUTO_ITEMS} of the {TOTAL_ITEMS} items are marked <AutoBadge />: these are technical
              controls ComplianceGuard collects automatically from your machines and AWS account
              during a single scan — evidence hashed, timestamped, and mapped to the criteria
              auditors check. The rest are process controls your team documents once. Check items
              off as you go; progress saves automatically in this browser.
            </p>

            {/* Why this matters */}
            <Reveal>
              <section className="mt-14">
                <h2 className="text-[24px] font-semibold text-ink">
                  Why auditors ask for these six areas
                </h2>
                <div className="mt-4 space-y-4 text-[17px] text-ink-2 leading-[1.65]">
                  <p>
                    SOC 2's Security category — the one every report includes — is built from common
                    criteria that map directly onto this checklist. <strong>Access control</strong>{" "}
                    proves that only the right people can reach customer data.
                    <strong> Encryption</strong> proves the data is unreadable at rest and in
                    transit. <strong>Audit logging</strong> proves you can reconstruct what happened
                    and when. <strong>Incident response</strong> proves you have a plan when
                    something goes wrong. <strong>Vendor management</strong> proves your supply
                    chain doesn't become the breach. <strong>Change management</strong> proves
                    deployments are reviewed, not improvised.
                  </p>
                  <p>
                    Auditors don't take your word for any of it — they request artefacts: a policy
                    export, a screenshot of a firewall profile, an event log with timestamps, a
                    ticket showing a code review. The most common reason a readiness review stalls
                    isn't a missing control; it's missing evidence for a control that already
                    exists. Collecting that evidence continuously, instead of the week before the
                    audit, is the whole point of automating it.
                  </p>
                </div>
              </section>
            </Reveal>

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

            {/* How to use */}
            <Reveal>
              <section className="mt-14">
                <h2 className="text-[24px] font-semibold text-ink">How to use this checklist</h2>
                <div className="mt-4 space-y-4 text-[17px] text-ink-2 leading-[1.65]">
                  <p>
                    Work top to bottom: the first pass is an evidence audit, not a fix sprint. Check
                    an item only when you can point at the artefact that proves it — a policy
                    document, a configuration export, a log with timestamps. Half-checked controls
                    are what turn into audit findings.
                  </p>
                  <p>
                    For every item marked <AutoBadge />, the fastest path is to stop checking
                    manually. A single ComplianceGuard scan collects the evidence from Windows,
                    macOS, and Linux endpoints and your AWS account, hashes each item with SHA-256,
                    and scores coverage against the criterion it maps to. What used to be a
                    fortnight of screenshots becomes a repeatable scan you run weekly, so the
                    evidence is current on the day the auditor asks rather than whatever was true
                    last quarter.
                  </p>
                  <p>
                    Keep the checklist honest: mark the two controls you can't prove as
                    <em> gaps</em>, not as done. Auditors score evidence coverage, not intention —
                    and knowing your two real gaps on day one costs nothing, while discovering them
                    during the observation window costs you the window.
                  </p>
                </div>
              </section>
            </Reveal>

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

            {/* After the checklist */}
            <Reveal>
              <section className="mt-14">
                <h2 className="text-[24px] font-semibold text-ink">
                  After the checklist: what happens next
                </h2>
                <div className="mt-4 space-y-4 text-[17px] text-ink-2 leading-[1.65]">
                  <p>
                    Once every item is either checked or logged as a known gap, three things remain.
                    First, <strong>close the gaps that are cheap to close</strong> — a missing
                    firewall rule or an disabled audit log is an afternoon of work that removes a
                    finding from your future report. Second, <strong>start the clock</strong>: a
                    Type I can be assessed at a single point in time, but Type II requires your
                    controls to operate continuously through an observation window, so the day you
                    begin collecting evidence regularly is the day that window can start.
                  </p>
                  <p>
                    Third, <strong>make the checklist boring</strong>. Auditors return yearly and
                    controls drift: new machines ship without disk encryption, a service account
                    outlives the project it was created for, log retention quietly lapses. The teams
                    for whom SOC 2 is cheap are the ones who run the same scan every week and treat
                    any newly-unchecked item as a regression to fix the same day — the evidence pack
                    then assembles itself, and the annual audit becomes a formality rather than a
                    fire drill.
                  </p>
                </div>
              </section>
            </Reveal>

            {/* FAQ */}
            <Reveal>
              <section className="mt-16">
                <h2 className="text-[24px] font-semibold text-ink">
                  Readiness checklist — common questions
                </h2>
                <div className="mt-6 space-y-6">
                  {CHECKLIST_FAQS.map((f) => (
                    <div key={f.q} className="card-fog p-6">
                      <h3 className="text-[17px] font-semibold text-ink">{f.q}</h3>
                      <p className="mt-2 text-[16px] text-ink-2 leading-[1.65]">{f.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>

            <p className="mt-10 text-[15px] text-ink-2 leading-[1.65]">
              New to the framework? Start with{" "}
              <a href="/resources/what-is-soc2" className="text-azure hover:underline">
                our plain-English guide to SOC 2
              </a>{" "}
              — report types, timelines, and what the Trust Services Criteria actually cover — or
              see how ComplianceGuard compares as a{" "}
              <a href="/resources/vanta-alternative" className="text-azure hover:underline">
                Vanta alternative
              </a>
              .
            </p>

            {/* Closing CTA */}
            <Reveal className="mt-16">
              <div className="card-fog p-8 md:p-10 text-center">
                <h2 className="display-3">Let the scan check the boxes for you.</h2>
                <p className="mx-auto mt-3 max-w-[480px] text-[16px] text-ink-2 leading-[1.6]">
                  ComplianceGuard collects the evidence for every Auto item above and shows your
                  evidence coverage across all 43 SOC 2 criteria it tracks.
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
