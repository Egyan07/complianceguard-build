import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { buildMeta, DOWNLOAD_URL } from "@/lib/site";

export const Route = createFileRoute("/resources/what-is-soc2")({
  head: () =>
    buildMeta({
      title: "What is SOC 2? | ComplianceGuard",
      description:
        "SOC 2 is an AICPA security framework built on the Trust Services Criteria. Learn the difference between Type I and Type II, what evidence auditors need, and how long an audit takes.",
      path: "/resources/what-is-soc2",
    }),
  component: WhatIsSoc2Page,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section className="mt-14">
        <h2 className="text-[24px] font-semibold text-ink">{title}</h2>
        <div className="mt-4 space-y-4 text-[17px] text-ink-2 leading-[1.65]">{children}</div>
      </section>
    </Reveal>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return <div className="card-fog p-6 text-[16px] text-ink-2 leading-[1.65]">{children}</div>;
}

function WhatIsSoc2Page() {
  return (
    <div className="min-h-screen flex flex-col bg-snow">
      <Navbar />
      <main id="main" className="flex-1">
        <PageHero
          eyebrow="Resources"
          title="What is SOC 2?"
          subtitle="An accessible guide to the AICPA framework for SaaS founders: report types, the Trust Services Criteria, evidence, and timelines."
          ornament="none"
        />

        <article className="container-cg pb-24">
          <div className="mx-auto max-w-[680px]">
            <p className="mono-tag">Last updated · April 2026</p>

            <p className="mt-6 text-[17px] text-ink-2 leading-[1.65]">
              SOC 2 is a security framework developed by the American Institute of Certified Public
              Accountants (AICPA). It defines criteria for managing customer data across five Trust
              Services Categories: Security, Availability, Processing Integrity, Confidentiality,
              and Privacy.
            </p>

            <Section title="Why SOC 2 matters for SaaS companies">
              <p>
                Enterprise buyers and their legal teams increasingly require SOC 2 compliance before
                signing contracts. A SOC 2 report proves that your systems and processes meet a
                recognised security standard. Without it, you may lose deals to competitors who
                have it.
              </p>
            </Section>

            <Section title="SOC 2 Type I vs Type II">
              <p>There are two types of SOC 2 reports, and the distinction matters to buyers.</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="card-fog p-6">
                  <h3 className="text-[17px] font-semibold text-ink">Type I</h3>
                  <p className="mt-2 text-[15px] text-ink-2 leading-[1.6]">
                    Assesses whether your controls are suitably designed at a single point in time.
                    Faster to obtain; a common first milestone.
                  </p>
                </div>
                <div className="card-fog p-6">
                  <h3 className="text-[17px] font-semibold text-ink">Type II</h3>
                  <p className="mt-2 text-[15px] text-ink-2 leading-[1.6]">
                    Assesses whether those controls operated effectively over a period of time,
                    typically 6–12 months. Most enterprise prospects require Type II.
                  </p>
                </div>
              </div>
            </Section>

            <Section title="The Trust Services Criteria">
              <p>
                SOC 2 audits are conducted against the AICPA Trust Services Criteria, the framework
                that defines what auditors evaluate. The criteria span areas including logical
                access controls, encryption, audit logging, incident response, vendor management,
                and change management. Security is the only mandatory category; the other four are
                added based on the commitments you make to customers.
              </p>
              <Callout>
                ComplianceGuard maps endpoint and AWS evidence to 54 controls across the Trust
                Services Criteria, so you can see per-control readiness before you ever engage an
                auditor.
              </Callout>
            </Section>

            <Section title="What evidence do auditors need?">
              <p>
                Auditors need documented proof that your controls exist and work. This includes
                password policy configuration, firewall rules, disk encryption status, user account
                reviews, audit logs, AWS security configurations, and incident response procedures.
                ComplianceGuard collects this evidence automatically from your machine and AWS
                environment.
              </p>
            </Section>

            <Section title="How long does SOC 2 take?">
              <p>
                A SOC 2 Type I audit typically takes 4–8 weeks from starting evidence collection to
                receiving your report. A Type II audit requires an observation period of 6–12 months
                before the auditor can issue the report. Starting evidence collection early, before
                you need the report, is the most important thing you can do.
              </p>
            </Section>

            <Section title="How ComplianceGuard helps">
              <p>
                ComplianceGuard automates the evidence collection step. Instead of manually running
                PowerShell scripts and copying output into spreadsheets, ComplianceGuard reads your
                OS and AWS environment directly and exports evidence in the exact format auditors
                accept. The free tier shows your readiness score in under 2 minutes.
              </p>
            </Section>

            <Section title="Beyond SOC 2: ISO 27001 and HIPAA">
              <p>
                If your clients are in Europe, they may require ISO 27001 certification instead of,
                or in addition to, SOC 2. If you work with healthcare data, HIPAA compliance is
                mandatory. ComplianceGuard supports all three frameworks from the same evidence
                collection run: alongside its 54 SOC 2 controls, it scores 47 ISO 27001 controls and
                47 HIPAA controls. One scan, three reports.
              </p>
            </Section>
          </div>

          {/* Closing CTA */}
          <Reveal className="mx-auto mt-20 max-w-[680px]">
            <div className="card-fog p-8 md:p-10 text-center">
              <h2 className="display-3">See your SOC 2 readiness score in under 2 minutes.</h2>
              <a href={DOWNLOAD_URL} className="btn-primary mt-6 inline-flex">
                Download Free
              </a>
            </div>
          </Reveal>
        </article>
      </main>
      <Footer />
    </div>
  );
}
