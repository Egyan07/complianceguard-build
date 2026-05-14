import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/resources/soc2-checklist")({
  head: () => ({
    meta: [
      { title: "SOC 2 Readiness Checklist — ComplianceGuard" },
      {
        name: "description",
        content:
          "A practical SOC 2 readiness checklist covering access control, encryption, audit logging, incident response, vendor management, and change management.",
      },
      { property: "og:title", content: "SOC 2 Readiness Checklist — ComplianceGuard" },
      {
        property: "og:description",
        content: "Use this checklist to assess your SOC 2 readiness before engaging an auditor.",
      },
      { property: "og:url", content: "/resources/soc2-checklist" },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "/og-image.png" },
      { name: "twitter:image", content: "/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "/resources/soc2-checklist" }],
  }),
  component: Soc2ChecklistPage,
});

type Item = { text: string; auto?: boolean };
type Group = { heading: string; items: Item[] };

const groups: Group[] = [
  {
    heading: "Access Control",
    items: [
      { text: "Password policy enforces minimum length and complexity", auto: true },
      { text: "Multi-factor authentication enabled for all admin accounts", auto: true },
      { text: "User account list reviewed quarterly", auto: true },
      { text: "Terminated employee accounts disabled within 24 hours", auto: true },
      { text: "Access provisioning process documented" },
    ],
  },
  {
    heading: "Encryption",
    items: [
      { text: "Disk encryption enabled on all endpoint machines", auto: true },
      { text: "AWS S3 buckets encrypted at rest", auto: true },
      { text: "Data in transit encrypted with TLS 1.2 or higher" },
      { text: "Database encryption enabled" },
    ],
  },
  {
    heading: "Audit Logging",
    items: [
      { text: "Windows Event Log / macOS audit log enabled", auto: true },
      { text: "AWS CloudTrail enabled in all regions", auto: true },
      { text: "Log retention policy defined (minimum 90 days)" },
      { text: "Logs reviewed regularly for anomalies" },
    ],
  },
  {
    heading: "Incident Response",
    items: [
      { text: "Incident response plan documented" },
      { text: "Security event alerting configured", auto: true },
      { text: "Incident response plan tested in last 12 months" },
      { text: "Incident log maintained" },
    ],
  },
  {
    heading: "Vendor Management",
    items: [
      { text: "Third-party vendor list maintained" },
      { text: "Vendor security reviews conducted annually" },
      { text: "Vendor contracts include security requirements" },
    ],
  },
  {
    heading: "Change Management",
    items: [
      { text: "Software inventory maintained", auto: true },
      { text: "Code review process documented" },
      { text: "Deployment process documented" },
      { text: "Change log maintained" },
    ],
  },
];

function AutoBadge() {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] bg-teal/10 text-teal text-[11px] font-semibold uppercase tracking-wider flex-shrink-0">
      Auto
    </span>
  );
}

function ChecklistRow({ item, index }: { item: Item; index: number }) {
  const bg = index % 2 === 0 ? "bg-white" : "bg-[#F8F9FA]";
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 border-b border-[#E2E8F0] ${bg}`}
    >
      <span
        aria-hidden
        className="inline-block w-4 h-4 rounded-[3px] border border-[#CBD5E1] bg-white flex-shrink-0"
      />
      <span className="flex-1 text-[15px] text-foreground/85">{item.text}</span>
      {item.auto && <AutoBadge />}
    </div>
  );
}

function Soc2ChecklistPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background py-16">
        <div className="container-cg max-w-[720px]">
          <h1 className="text-[40px] md:text-[48px] font-bold text-navy leading-[1.1]">
            SOC 2 Readiness Checklist
          </h1>
          <span className="inline-block mt-4 px-3 py-1 rounded-[4px] border border-[#E2E8F0] text-[12px] text-[#9CA3AF]">
            Last updated: April 2026
          </span>

          <p className="mt-6 text-[18px] text-foreground/80 leading-[1.7]">
            Use this checklist to assess your SOC 2 readiness before engaging an auditor.
            ComplianceGuard automates the evidence collection for all items marked with the{" "}
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-[4px] bg-teal/10 text-teal text-[11px] font-semibold uppercase tracking-wider align-middle">
              Auto
            </span>{" "}
            badge.
          </p>

          <div className="mt-10 space-y-10">
            {groups.map((group) => (
              <div key={group.heading}>
                <h3 className="text-[18px] font-semibold text-navy mb-3">{group.heading}</h3>
                <div className="rounded-[8px] overflow-hidden border border-[#E2E8F0]">
                  {group.items.map((item, i) => (
                    <ChecklistRow key={item.text} item={item} index={i} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-12 rounded-[12px] p-6 border"
            style={{ background: "#F0FDF4", borderColor: "#BBF7D0" }}
          >
            <p className="text-[15px] text-foreground/85 leading-[1.6]">
              ComplianceGuard automates evidence collection for all items marked{" "}
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-[4px] bg-teal/10 text-teal text-[11px] font-semibold uppercase tracking-wider align-middle">
                Auto
              </span>{" "}
              above. Download free to see your current score across all 29 SOC 2 controls.
            </p>
            <a
              href="https://github.com/Egyan07/ComplianceGuard/releases/latest"
              className="btn-primary mt-5 inline-flex"
            >
              Download Free
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
