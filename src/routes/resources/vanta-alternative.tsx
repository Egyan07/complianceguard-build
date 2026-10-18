import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { buildMeta, DOWNLOAD_URL, salesMailto } from "@/lib/site";
import { trackConversion } from "@/lib/analytics";
import { ArticleShell } from "@/components/ArticleShell";

export const Route = createFileRoute("/resources/vanta-alternative")({
  head: () => ({
    ...buildMeta({
      title: "Vanta Alternative for SOC 2 Evidence | ComplianceGuard",
      description:
        "Why teams switch from Vanta: endpoint-native evidence collection, air-gapped support, source-available code, and a free tier. Compare cost, coverage, and architecture.",
      path: "/resources/vanta-alternative",
      image: "/og/vanta-alternative.png",
      imageAlt: "Endpoint evidence a cloud tool cannot produce.",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "ComplianceGuard",
          applicationCategory: "SecurityApplication",
          operatingSystem: "Windows, macOS, Linux",
          description:
            "Endpoint compliance evidence collection for SOC 2, ISO 27001, HIPAA and GDPR. Evidence stays on your machine.",
          url: "https://complianceguard.cguard.workers.dev",
          offers: [
            { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Free" },
            { "@type": "Offer", price: "149", priceCurrency: "USD", name: "Pro" },
            { "@type": "Offer", price: "599", priceCurrency: "USD", name: "Enterprise" },
          ],
        }),
      },
    ],
  }),
  component: VantaAlternativePage,
});

const FAQS = [
  {
    q: "Is ComplianceGuard a full replacement for Vanta?",
    a: "For endpoint evidence, yes — ComplianceGuard reads password policies, firewall rules, disk encryption, audit logs, accounts, services, software inventory, and file permissions directly from Windows, macOS, and Linux machines, then scores them against 43 SOC 2 criteria. Where Vanta's strength is its catalog of cloud, identity, and MDM integrations, ComplianceGuard has no integration catalog by design: it collects from the machines themselves. Teams with heavy SaaS stacks often keep a cloud platform and add ComplianceGuard for the endpoint evidence neither side sees fully on its own.",
  },
  {
    q: "How much does Vanta actually cost?",
    a: "Vanta does not publish exact pricing. Multiple independent 2026 pricing guides place it roughly between $10,000 and $80,000+ per year depending on plan, company size, and frameworks, billed as an annual platform fee. ComplianceGuard is free for a single machine with no time limit, then a flat $149/month (billed annually) for Pro with all four frameworks — no per-framework upsell and no annual platform fee on the free tier.",
  },
  {
    q: "Will my auditor accept evidence from ComplianceGuard?",
    a: "Every evidence item is hashed with SHA-256 and mapped control-by-control to the AICPA Trust Services Criteria, the exact framework your SOC 2 auditor works from, and exported as a PDF evidence pack organized the way auditors expect. A formal SOC 2 report still requires a licensed CPA firm — ComplianceGuard gets you to that engagement with the evidence already collected instead of a spreadsheet full of screenshots.",
  },
  {
    q: "Do I need to choose between Vanta and ComplianceGuard?",
    a: "No. They cover different evidence surfaces: Vanta sees your cloud and SaaS stack, ComplianceGuard sees the endpoints those machines actually run on. Many compliance-conscious teams run both. If you only buy one, the question is where your missing evidence lives — if auditors keep asking for password policy, disk encryption, firewall configuration, or event logs from real machines, that evidence is on the endpoint, and that is what ComplianceGuard collects.",
  },
  {
    q: "What about air-gapped or offline environments?",
    a: "ComplianceGuard runs fully offline: evidence collection, scoring, and PDF export work with no internet connection, licensing verifies offline via Ed25519 public keys, and there is no phone-home or telemetry. This covers government, defense, and regulated-finance deployments where a cloud-first platform's always-on integration model simply does not fit the security boundary.",
  },
  {
    q: "How long does setup take?",
    a: "Install the desktop app or self-hosted web app, run a scan, and you have a per-control readiness score in about 30 seconds — typically minutes from install to first evidence pack. No admin privileges, no API keys, no agent rollout. Cloud-platform onboarding typically runs days to weeks because it starts with connecting your SaaS and identity stack.",
  },
];

const compareRows: [string, string, string][] = [
  ["Evidence source", "The endpoint itself", "Cloud + SaaS/identity/MDM integrations"],
  [
    "Endpoint controls (password policy, firewall, disk encryption, event logs)",
    "Native — reads the OS directly",
    "Via MDM/agent integrations, where configured",
  ],
  ["Data residency", "Stays on your machine", "Processed in vendor cloud"],
  ["Works offline / air-gapped", "yes", "no"],
  ["Free tier", "Yes — 1 machine, no time limit", "No published free tier"],
  ["Publicly reported annual price", "Free · then $149/mo flat", "~$10,000–$80,000+/yr reported"],
  ["Setup time", "Minutes", "Days to weeks"],
  ["Source code", "BSL 1.1 source-available", "Proprietary"],
  ["Frameworks in one scan", "SOC 2 · ISO 27001 · HIPAA · GDPR", "Broad multi-framework coverage"],
] as const;

function CompareCell({ value, isCG }: { value: string; isCG: boolean }) {
  if (value === "yes") {
    return (
      <span className={`inline-flex items-center ${isCG ? "text-azure" : "text-ink-3"}`}>
        <Check size={18} strokeWidth={2.5} aria-label="Yes" />
      </span>
    );
  }
  if (value === "no") {
    return (
      <span className="inline-flex items-center text-ink-3">
        <X size={18} strokeWidth={2.5} aria-label="No" />
      </span>
    );
  }
  return <span className={isCG ? "text-azure font-medium" : "text-ink-2"}>{value}</span>;
}

const TOC: { id: string; label: string }[] = [
  {
    id: "why-endpoint-evidence-is-a-different-problem",
    label: "Why endpoint evidence is a different problem",
  },
  { id: "the-honest-cost-comparison", label: "The honest cost comparison" },
  { id: "when-vanta-is-the-right-choice", label: "When Vanta is the right choice" },
  {
    id: "when-complianceguard-is-the-right-choice",
    label: "When ComplianceGuard is the right choice",
  },
  { id: "switching-cost-usually-zero", label: "Switching cost: usually zero" },
  { id: "frequently-asked-questions", label: "Frequently asked questions" },
];

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <section id={id} className="mt-14 scroll-mt-28">
        <h2 className="text-[24px] font-semibold text-ink">{title}</h2>
        <div className="mt-4 space-y-4 text-[17px] text-ink-2 leading-[1.65]">{children}</div>
      </section>
    </Reveal>
  );
}

export function VantaAlternativePage() {
  return (
    <div className="min-h-screen flex flex-col bg-snow">
      <Navbar />
      <main id="main" className="flex-1">
        <PageHero
          eyebrow="Comparisons"
          title="Vanta alternative."
          subtitle="Same frameworks, different evidence source: ComplianceGuard collects SOC 2, ISO 27001, HIPAA, and GDPR evidence on your own machines — with a free tier and no annual platform fee."
          ornament="none"
        />

        <article>
          <ArticleShell toc={TOC}>
            <p className="mono-tag">Last updated · October 2026</p>

            <p className="mt-6 text-[17px] text-ink-2 leading-[1.65]">
              Vanta is the name most teams encounter first when a customer asks for a SOC 2 report.
              It is a capable cloud-compliance platform: it connects to your SaaS tools, identity
              provider, and cloud accounts, monitors integrations, and manages the audit workflow.
              But three things send teams searching for a Vanta alternative — the annual price tag
              that starts around five figures, a security posture that requires your evidence to
              leave your network, and a structural blind spot: a cloud platform sees your cloud, not
              the password policy, disk encryption state, firewall rules, and event logs on the
              machines your business actually runs on. That last set is exactly what auditors ask
              for first.
            </p>

            <p className="mt-4 text-[17px] text-ink-2 leading-[1.65]">
              ComplianceGuard takes the opposite architectural position. It installs on the endpoint
              itself, reads the operating system directly, scores what it finds against 43 SOC 2
              criteria (plus all 93 ISO 27001:2022 Annex A controls, 47 HIPAA safeguards, and 38
              GDPR obligations), and never sends a byte anywhere. This page compares the two
              honestly — including the cases where Vanta is genuinely the better fit.
            </p>

            {/* Comparison table */}
            <Reveal className="mt-12">
              <div className="overflow-x-auto">
                <table
                  className="w-full text-[15px] card-snow overflow-hidden"
                  style={{ borderCollapse: "separate", borderSpacing: 0 }}
                >
                  <thead>
                    <tr className="bg-ink text-snow">
                      <th className="text-left px-5 py-4 font-semibold w-[38%]">Capability</th>
                      <th className="text-left px-5 py-4 font-semibold">ComplianceGuard</th>
                      <th className="text-left px-5 py-4 font-medium text-snow/80">Vanta</th>
                    </tr>
                  </thead>
                  <tbody>
                    {compareRows.map(([label, cg, vanta]) => (
                      <tr key={label} className="border-t border-hairline">
                        <td className="px-5 py-3.5 font-medium text-ink align-top">{label}</td>
                        <td className="px-5 py-3.5 align-top">
                          <CompareCell value={cg} isCG />
                        </td>
                        <td className="px-5 py-3.5 align-top">
                          <CompareCell value={vanta} isCG={false} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-[13px] text-ink-3">
                Vanta details based on publicly available information as of 2026; Vanta does not
                publish exact pricing, so third-party estimates are shown.
              </p>
            </Reveal>

            <Section
              id="why-endpoint-evidence-is-a-different-problem"
              title="Why endpoint evidence is a different problem"
            >
              <p>
                Cloud compliance platforms work through integrations: connect AWS, your identity
                provider, your ticketing system, your MDM, and the platform monitors those surfaces
                continuously. It is a clean model — until an auditor asks a question that lives
                below the cloud layer. Is disk encryption enabled on the laptop that holds the
                production database credentials? What is the local password policy on the domain
                controller? Which firewall profile is active on the build machine? Which admin
                accounts exist on the machine no MDM manages?
              </p>
              <p>
                Those answers live in the operating system, and reaching them the integration way
                means deploying an agent or MDM profile to every machine and scripting one-off
                checks per OS. ComplianceGuard skips that indirection: one collection pass reads
                event logs, security settings, services, firewall configuration, user accounts,
                network state, software inventory, and file permissions directly, on Windows, macOS,
                and Linux, in about 30 seconds per machine. The same pass feeds all four frameworks,
                so ISO 27001 and HIPAA evidence is not a second project.
              </p>
            </Section>

            <Section id="the-honest-cost-comparison" title="The honest cost comparison">
              <p>
                Vanta's pricing is quote-based. Independent 2026 pricing guides consistently place
                it between roughly $10,000 and $80,000+ per year depending on plan, headcount, and
                frameworks — always as an annual platform commitment, with the SOC 2 audit fee paid
                separately to your CPA firm on top.
              </p>
              <p>
                ComplianceGuard's free tier runs indefinitely on one machine and already scores all
                43 SOC 2 criteria, so you can see your real readiness before deciding anything. Pro
                is a flat $149/month billed annually for all four frameworks, up to 10 machines, and
                PDF evidence packs — less than a single month at the low end of the cloud-platform
                range. Enterprise ($599/month) adds the tamper-evident audit log, RBAC, air-gapped
                deployment, and unlimited machines. Audit fees are still yours to pay to whichever
                firm you choose; we don't run an auditor marketplace and take no cut.
              </p>
            </Section>

            <Section id="when-vanta-is-the-right-choice" title="When Vanta is the right choice">
              <p>
                Honesty saves everyone time. If your company already runs a mature SaaS/identity
                stack with MDM on every device, has in-house GRC staff who live in a platform UI
                daily, needs the breadth of a 100+ app integration catalog, or wants a single vendor
                for auditor networking and workflow management, Vanta's ecosystem is genuinely
                stronger and ComplianceGuard is not trying to replace it. You may also have
                contractual reasons — some enterprise buyers name specific platforms in their vendor
                requirements.
              </p>
            </Section>

            <Section
              id="when-complianceguard-is-the-right-choice"
              title="When ComplianceGuard is the right choice"
            >
              <p>
                You are a small team that wants the evidence without the platform fee. Your auditors
                keep asking for endpoint artefacts your cloud tool cannot produce. You are
                pre-revenue or pre-PMF and need a SOC 2 readiness number today, for free, before
                committing to an annual contract. You must pass evidence through an air gap, so
                "works offline" is a hard requirement, not a checkbox. Or you simply believe the
                code that reads your systems should be readable — ComplianceGuard is
                source-available under BSL 1.1, with ~1,265 tests and every line of collection and
                scoring logic auditable.
              </p>
            </Section>

            <Section id="switching-cost-usually-zero" title="Switching cost: usually zero">
              <p>
                There is no migration. ComplianceGuard does not import your Vanta history, need your
                SaaS credentials, or touch your cloud account unless you explicitly connect AWS.
                Install it, scan, and you have an independent endpoint readiness score in under two
                minutes — running alongside your existing platform if you keep one. Evidence is
                stored in a local database in standard formats and exported as PDF or NDJSON, so
                there is no lock-in in either direction: your evidence remains yours whether you
                stay or leave.
              </p>
            </Section>

            {/* FAQ */}
            <Reveal>
              <section id="frequently-asked-questions" className="mt-14 scroll-mt-28">
                <h2 className="text-[24px] font-semibold text-ink">Frequently asked questions</h2>
                <div className="mt-6 space-y-6">
                  {FAQS.map((f) => (
                    <div key={f.q} className="card-fog p-6">
                      <h3 className="text-[17px] font-semibold text-ink">{f.q}</h3>
                      <p className="mt-2 text-[16px] text-ink-2 leading-[1.65]">{f.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>

            <p className="mt-10 text-[15px] text-ink-2 leading-[1.65]">
              Still deciding? Read{" "}
              <Link to="/resources/what-is-soc2" className="text-azure hover:underline">
                what an auditor actually checks in SOC 2
              </Link>
              , work through the{" "}
              <Link to="/resources/soc2-checklist" className="text-azure hover:underline">
                SOC 2 readiness checklist
              </Link>
              , or compare full plan details on the{" "}
              <Link to="/pricing" className="text-azure hover:underline">
                pricing page
              </Link>
              .
            </p>
            {/* Closing CTA */}
            <Reveal className="mt-20">
              <div className="card-fog p-8 md:p-10 text-center">
                <h2 className="display-3">See your own readiness score — free, in 2 minutes.</h2>
                <p className="mx-auto mt-3 max-w-[520px] text-[16px] text-ink-2 leading-[1.6]">
                  Install, scan, done. No credit card, no annual commitment, and no evidence leaves
                  your machine while you decide.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={DOWNLOAD_URL}
                    className="btn-primary inline-flex"
                    onClick={() => trackConversion("download_click", "vanta-cta")}
                  >
                    Download Free
                  </a>
                  <a
                    href={salesMailto("ComplianceGuard vs Vanta question")}
                    className="btn-ghost inline-flex"
                    onClick={() => trackConversion("contact_sales_click", "vanta-cta")}
                  >
                    Ask a question
                  </a>
                </div>
              </div>
            </Reveal>
          </ArticleShell>
        </article>
      </main>
      <Footer />
    </div>
  );
}
