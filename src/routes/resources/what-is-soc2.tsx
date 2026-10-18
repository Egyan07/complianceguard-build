import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { buildMeta, DOWNLOAD_URL } from "@/lib/site";
import { trackConversion } from "@/lib/analytics";
import { ArticleShell } from "@/components/ArticleShell";

export const Route = createFileRoute("/resources/what-is-soc2")({
  head: () => ({
    ...buildMeta({
      title: "What is SOC 2? | ComplianceGuard",
      description:
        "SOC 2 explained: Type I vs Type II, the Trust Services Criteria, the evidence auditors sample, how long an audit takes, and what it costs.",
      path: "/resources/what-is-soc2",
      image: "/og/what-is-soc2.png",
      imageAlt: "SOC 2 asks for a statement and the record behind it.",
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
    ],
  }),
  component: WhatIsSoc2Page,
});

const FAQS = [
  {
    q: "Is SOC 2 a certification?",
    a: "No. SOC 2 is an attestation report, not a certification: an independent CPA firm examines your controls against the Trust Services Criteria and issues an opinion for a defined period. Vendor claims of being 'SOC 2 certified' are technically inaccurate — the correct phrasing is 'SOC 2 compliant' or 'has a SOC 2 report'.",
  },
  {
    q: "What is the difference between SOC 2 Type I and Type II?",
    a: "A Type I report evaluates whether your controls are suitably designed at a single point in time. A Type II adds operating effectiveness over a period, typically 3 to 12 months. Most enterprise buyers require Type II, because a design-only report proves the control exists but not that it actually works day to day.",
  },
  {
    q: "Which Trust Services Categories do I need?",
    a: "Security is mandatory in every SOC 2 report. Availability, Processing Integrity, Confidentiality, and Privacy are additive: include each one only where you make explicit commitments to customers about it. Every extra category adds scope, cost, and evidence — scoping tightly is normal and expected for a first audit.",
  },
  {
    q: "How long does a SOC 2 audit take?",
    a: "A Type I engagement typically runs 4 to 8 weeks from readiness to report. A Type II requires an observation window — commonly 3 to 12 months — before fieldwork can begin, so teams that start evidence collection early reach their Type II report much sooner than those who wait for the observation period to start.",
  },
  {
    q: "How much does SOC 2 cost?",
    a: "There are three cost lines: the audit fee, the compliance platform, and your team's time. Audit fees for a first SOC 2 commonly run five figures depending on scope and firm; automation platforms like Vanta or Drata add an annual subscription, typically reported in the $10k–$80k range. ComplianceGuard's free tier covers readiness scoring, with flat paid tiers for full evidence packs.",
  },
  {
    q: "Do auditors accept automatically collected evidence?",
    a: "Auditors accept machine-collected evidence as long as it is attributable, timestamped, and traceable to the criterion it supports — the same qualities auditors look for in any evidence. What they will not accept are screenshots with no provenance or spreadsheet claims with nothing behind them. ComplianceGuard exports evidence with criterion mapping built in.",
  },
];

const TOC: { id: string; label: string }[] = [
  { id: "why-soc-2-matters-for-saas-companies", label: "Why SOC 2 matters for SaaS companies" },
  { id: "who-requires-soc-2", label: "Who requires SOC 2?" },
  { id: "soc-2-type-i-vs-type-ii", label: "SOC 2 Type I vs Type II" },
  { id: "the-trust-services-criteria", label: "The Trust Services Criteria" },
  { id: "what-evidence-do-auditors-need", label: "What evidence do auditors need?" },
  { id: "how-long-does-soc-2-take", label: "How long does SOC 2 take?" },
  { id: "how-much-does-soc-2-cost", label: "How much does SOC 2 cost?" },
  { id: "common-mistakes-first-time-audits-make", label: "Common mistakes first-time audits make" },
  { id: "how-complianceguard-helps", label: "How ComplianceGuard helps" },
  { id: "beyond-soc-2-iso-27001-and-hipaa", label: "Beyond SOC 2: ISO 27001 and HIPAA" },
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

        <article>
          <ArticleShell toc={TOC}>
            <p className="mono-tag">Last updated · October 2026</p>

            <p className="mt-6 text-[17px] text-ink-2 leading-[1.65]">
              SOC 2 is a security framework developed by the American Institute of Certified Public
              Accountants (AICPA). It defines criteria for managing customer data across five Trust
              Services Categories: Security, Availability, Processing Integrity, Confidentiality,
              and Privacy.
            </p>

            <Section
              id="why-soc-2-matters-for-saas-companies"
              title="Why SOC 2 matters for SaaS companies"
            >
              <p>
                Enterprise buyers and their legal teams increasingly require SOC 2 before signing
                contracts. In procurement, the report has become a pass/fail gate: a security
                questionnaire that asks for a SOC 2 report and receives nothing usually ends the
                conversation, regardless of how strong the product is. For companies selling into
                healthcare, finance, or government-adjacent markets, it is frequently the single
                fastest way to unblock a stalled deal.
              </p>
              <p>
                The report also does real work beyond sales. Preparing for one forces the habits
                that matter anyway — least-privilege access, encrypted devices, monitored changes,
                tested incident response. Teams that complete a first audit almost universally
                describe the same outcome: the security posture improved, and it stayed improved
                because the controls are now evidenced rather than assumed.
              </p>
            </Section>

            <Section id="who-requires-soc-2" title="Who requires SOC 2?">
              <p>
                Nothing in law mandates SOC 2 the way HIPAA mandates safeguards for health data — it
                is a market expectation, not a regulation. In practice, three groups ask for it:
                enterprise procurement teams, security reviewers during vendor onboarding, and
                cyber-insurance underwriters, who increasingly treat it as a signal that basic
                controls exist. If your customers have customers of their own (a B2B SaaS selling to
                other B2B SaaS), the request tends to arrive earlier than founders expect.
              </p>
              <p>
                The flip side is scope: SOC 2 covers the systems <em>you</em> operate in delivering
                your service — your cloud accounts, your laptops, your CI/CD — not your customers'
                environments and not your product's security properties in the abstract. Agreeing
                that boundary with your auditor before fieldwork starts is the single
                highest-leverage decision in the whole process.
              </p>
            </Section>

            <Section id="soc-2-type-i-vs-type-ii" title="SOC 2 Type I vs Type II">
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
                    typically 3–12 months. Most enterprise prospects require Type II.
                  </p>
                </div>
              </div>
              <p>
                Most first-time audits start with a Type I: it is faster, cheaper, and proves your
                control design is sound. The Type II observation window then runs in the background
                while you keep operating, and the follow-up report comes with real operating
                evidence behind it. What buyers read as "having SOC 2" is almost always the Type II
                report covering the trailing 6–12 months.
              </p>
            </Section>

            <Section id="the-trust-services-criteria" title="The Trust Services Criteria">
              <p>
                SOC 2 audits are conducted against the AICPA Trust Services Criteria, the framework
                that defines what auditors evaluate. The criteria span areas including logical
                access controls, encryption, audit logging, incident response, vendor management,
                and change management. Security is the only mandatory category; the other four are
                added based on the commitments you make to customers.
              </p>
              <ul className="space-y-2 text-[16px] text-ink-2">
                <li>
                  <strong className="text-ink">Security</strong> — the common criteria every report
                  includes: access controls, encryption, logging, incident response, vendor and
                  change management.
                </li>
                <li>
                  <strong className="text-ink">Availability</strong> — uptime and capacity
                  commitments you make in an SLA.
                </li>
                <li>
                  <strong className="text-ink">Processing Integrity</strong> — that processing is
                  complete, valid, accurate, timely, and authorised.
                </li>
                <li>
                  <strong className="text-ink">Confidentiality</strong> — information designated as
                  confidential is protected as promised.
                </li>
                <li>
                  <strong className="text-ink">Privacy</strong> — personal information is collected,
                  used, retained, and disposed of according to your notice.
                </li>
              </ul>
              <p>
                Scoping the categories is a business decision before it is a technical one: every
                category you add is another set of criteria an auditor will test, so most teams
                start with Security alone and add categories only when a customer contract
                explicitly commits to them.
              </p>
              <Callout>
                ComplianceGuard maps endpoint and AWS evidence to 43 criteria across the Trust
                Services Criteria, so you can see per-criterion evidence coverage before you ever
                engage an auditor.
              </Callout>
            </Section>

            <Section id="what-evidence-do-auditors-need" title="What evidence do auditors need?">
              <p>
                Auditors need documented proof that your controls exist and work — and they work
                from samples, not summaries. Expect to be asked for things like: the password and
                MFA policy alongside proof it is enforced; firewall rules and disk-encryption status
                from actual machines; a user access review with dates and approvals; audit logs
                showing who accessed what; change-management records tying deployments to reviews;
                AWS configuration snapshots; and an incident-response procedure with a drill or
                tabletop exercise behind it.
              </p>
              <p>
                The pattern across every request is the same: an assertion ("we enforce MFA") plus
                machine-generated proof (the identity provider configuration showing it). Evidence
                that only exists as a policy document is a finding waiting to happen, because the
                auditor's next question is always "show me it operating."
              </p>
              <Callout>
                ComplianceGuard collects this evidence automatically from your machine and AWS
                environment — each artifact mapped to the exact criterion it supports, so sample
                requests become a PDF export instead of a scramble.
              </Callout>
            </Section>

            <Section id="how-long-does-soc-2-take" title="How long does SOC 2 take?">
              <p>
                A SOC 2 Type I audit typically takes 4–8 weeks from starting evidence collection to
                receiving your report. A Type II audit adds an observation period — commonly 3–6
                months for a first report, sometimes 12 — before the auditor can issue the report,
                because effectiveness has to be demonstrated over time, not at a moment.
              </p>
              <p>
                The timeline consequence is simple: the observation window starts whenever your
                evidence collection starts, not when the audit does. Teams that begin collecting
                evidence before they “need” the report reach their Type II months earlier than those
                who wait for a prospect to demand one. Starting early is the single most important
                thing you can do.
              </p>
            </Section>

            <Section id="how-much-does-soc-2-cost" title="How much does SOC 2 cost?">
              <p>
                Three cost lines: the audit fee, the compliance platform, and your team's time.
                Audit fees for a first SOC 2 commonly land in the five figures and vary with scope —
                number of systems in the observation window, categories beyond Security, and whether
                the firm is a Big Four or a specialist boutique. Platforms like Vanta and Drata are
                typically reported in the $10k–$80k per year range depending on modules and company
                size.
              </p>
              <p>
                The line item teams underestimate is internal time: writing policies, chasing
                evidence, and preparing for sample requests. This is exactly where automation pays
                back — ComplianceGuard's free tier scores your readiness at no cost, and paid tiers
                are flat-priced rather than a percentage of headcount.
              </p>
            </Section>

            <p className="mt-4 text-[17px] text-ink-2 leading-[1.65]">
              Comparing platforms? Read our honest breakdown of{" "}
              <a href="/resources/vanta-alternative" className="text-azure hover:underline">
                ComplianceGuard as a Vanta alternative
              </a>
              , or work through the{" "}
              <a href="/resources/soc2-checklist" className="text-azure hover:underline">
                24-item SOC 2 readiness checklist
              </a>{" "}
              auditors start from.
            </p>

            <Section
              id="common-mistakes-first-time-audits-make"
              title="Common mistakes first-time audits make"
            >
              <p>
                Most failed or painful SOC 2 engagements trace back to the same handful of errors:
                scoping too broadly (every extra system multiplies evidence work), treating the
                report as a point-in-time project instead of an operating habit, writing policies
                nobody follows because auditors test practice not prose, starting the observation
                window late so the Type II report arrives long after the deal that needed it, and
                leaving evidence collection to the week of fieldwork when screenshots cannot prove
                how a control behaved six months ago.
              </p>
              <p>
                The antidote to all five is the same: collect evidence continuously from the systems
                themselves, keep scope tight, and review coverage monthly the way you would any
                other operational metric.
              </p>
            </Section>

            <Section id="how-complianceguard-helps" title="How ComplianceGuard helps">
              <p>
                ComplianceGuard automates the evidence collection step. Instead of manually running
                PowerShell scripts and copying output into spreadsheets, ComplianceGuard reads your
                OS and AWS environment directly and exports evidence in the exact format auditors
                accept. The free tier shows your readiness score in under 2 minutes.
              </p>
            </Section>

            <Section
              id="beyond-soc-2-iso-27001-and-hipaa"
              title="Beyond SOC 2: ISO 27001 and HIPAA"
            >
              <p>
                If your clients are in Europe, they may require ISO 27001 certification instead of,
                or in addition to, SOC 2. If you work with healthcare data, HIPAA compliance is
                mandatory. ComplianceGuard supports four frameworks from the same evidence
                collection run: alongside its 43 SOC 2 criteria, it scores all 93 ISO/IEC 27001:2022
                Annex A controls, 47 HIPAA safeguards, and 38 GDPR obligations. One scan, four
                reports.
              </p>
            </Section>

            <Section id="frequently-asked-questions" title="Frequently asked questions">
              <div className="space-y-3">
                {FAQS.map((f) => (
                  <div key={f.q} className="card-fog p-6">
                    <h3 className="text-[16px] font-semibold text-ink">{f.q}</h3>
                    <p className="mt-2 text-[15px] text-ink-2 leading-[1.6]">{f.a}</p>
                  </div>
                ))}
              </div>
            </Section>
            {/* Closing CTA */}
            <Reveal className="mt-20">
              <div className="card-fog p-8 md:p-10 text-center">
                <h2 className="display-3">See your SOC 2 readiness score in under 2 minutes.</h2>
                <a
                  href={DOWNLOAD_URL}
                  className="btn-primary mt-6 inline-flex"
                  onClick={() => trackConversion("download_click", "what-is-soc2-cta")}
                >
                  Download Free
                </a>
              </div>
            </Reveal>
          </ArticleShell>
        </article>
      </main>
      <Footer />
    </div>
  );
}
