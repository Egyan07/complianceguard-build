import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/resources/what-is-soc2")({
  head: () => ({
    meta: [
      { title: "What is SOC 2? — ComplianceGuard" },
      {
        name: "description",
        content:
          "SOC 2 is an AICPA security framework based on five Trust Services Criteria. Learn what SOC 2 is, the difference between Type I and Type II, and what evidence auditors need.",
      },
      { property: "og:title", content: "What is SOC 2? — ComplianceGuard" },
      {
        property: "og:description",
        content: "An accessible guide to SOC 2 for SaaS founders.",
      },
    ],
  }),
  component: WhatIsSoc2Page,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-[24px] font-bold text-navy">{title}</h2>
      <div className="mt-3 text-[16px] text-foreground leading-[1.8] space-y-4">{children}</div>
    </section>
  );
}

function WhatIsSoc2Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background py-16">
        <div className="container-cg max-w-[720px]">
          <h1 className="text-[40px] md:text-[48px] font-bold text-navy leading-[1.1]">
            What is SOC 2?
          </h1>
          <span className="inline-block mt-4 px-3 py-1 rounded-[4px] border border-[#E2E8F0] text-[12px] text-[#9CA3AF]">
            Last updated: April 2026
          </span>

          <p className="mt-6 text-[18px] text-foreground/80 leading-[1.7]">
            SOC 2 is a security framework developed by the American Institute of Certified Public
            Accountants (AICPA). It defines criteria for managing customer data based on five Trust
            Services Criteria: Security, Availability, Processing Integrity, Confidentiality, and
            Privacy.
          </p>

          <Section title="Why SOC 2 Matters for SaaS Companies">
            <p>
              Enterprise buyers and their legal teams increasingly require SOC 2 compliance before
              signing contracts. A SOC 2 report proves that your systems and processes meet a
              recognised security standard — without it, you may lose deals to competitors who have
              it.
            </p>
          </Section>

          <Section title="SOC 2 Type I vs Type II">
            <p>
              There are two types of SOC 2 reports. A Type I report assesses whether your controls
              are suitably designed at a point in time. A Type II report assesses whether those
              controls operated effectively over a period of time (typically 6–12 months). Most
              enterprise prospects require Type II.
            </p>
          </Section>

          <Section title="The 29 Trust Services Criteria">
            <p>
              SOC 2 compliance is measured against 29 Trust Services Criteria (TSC) defined by the
              AICPA. These cover areas including logical access controls, encryption, audit logging,
              incident response, vendor management, and change management. ComplianceGuard maps
              evidence directly to all 29 criteria.
            </p>
          </Section>

          <Section title="What Evidence Do Auditors Need?">
            <p>
              Auditors need documented proof that your controls exist and work. This includes:
              password policy configuration, firewall rules, disk encryption status, user account
              reviews, audit logs, AWS security configurations, and incident response procedures.
              ComplianceGuard collects this evidence automatically from your machine and AWS
              environment.
            </p>
          </Section>

          <Section title="How Long Does SOC 2 Take?">
            <p>
              A SOC 2 Type I audit typically takes 4–8 weeks from starting evidence collection to
              receiving your report. A Type II audit requires an observation period of 6–12 months
              before the auditor can issue the report. Starting evidence collection early — before
              you need the report — is the most important thing you can do.
            </p>
          </Section>

          <Section title="How ComplianceGuard Helps">
            <p>
              ComplianceGuard automates the evidence collection step. Instead of manually running
              PowerShell scripts and copying output into spreadsheets, ComplianceGuard reads your
              OS and AWS environment directly and exports evidence in the exact format auditors
              accept. The free tier shows your readiness score in under 2 minutes.
            </p>
          </Section>
        </div>

        {/* Final CTA */}
        <section className="mt-20 bg-navy text-white py-16">
          <div className="container-cg max-w-[720px] text-center">
            <h2 className="text-[28px] md:text-[32px] font-bold leading-[1.2]">
              See your SOC 2 readiness score in under 2 minutes.
            </h2>
            <a
              href="https://github.com/Egyan07/ComplianceGuard/releases/latest"
              className="btn-primary mt-8 inline-flex"
            >
              Download Free
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
