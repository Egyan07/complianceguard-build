import { Fragment } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Terminal,
  CloudCheck,
  FileText,
  Lock,
  Gauge,
  WifiOff,
  Check,
  X,
  ArrowRight,
  Award,
  Shield,
  Code2,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductMockup } from "@/components/ProductMockup";
import { FadeUp } from "@/components/FadeUp";
import { WaitlistForm } from "@/components/WaitlistForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ComplianceGuard — On-Premise SOC 2 Compliance for Bootstrapped SaaS" },
      {
        name: "description",
        content:
          "Stop paying $10,000/year for SOC 2 compliance. Auditor-ready evidence packs that never leave your network. Free to start. $49/month.",
      },
      { property: "og:title", content: "Stop Paying $10,000/Year to Prove You're Secure." },
      {
        property: "og:description",
        content:
          "ComplianceGuard generates auditor-ready SOC 2 evidence packs on your machine. No cloud upload. $49/month.",
      },
      { property: "og:url", content: "https://complianceguard.dev/" },
      { property: "og:image", content: "https://complianceguard.dev/og-image.png" },
      { name: "twitter:image", content: "https://complianceguard.dev/og-image.png" },
    ],
  }),
  component: LandingPage,
});

const features = [
  {
    icon: Terminal,
    title: "OS-Level Evidence Collection",
    body: "ComplianceGuard reads directly from Windows Registry, macOS system preferences, and Linux configs. No agent. No API key. No cloud permission required.",
  },
  {
    icon: CloudCheck,
    title: "AWS Evidence Auto-Sync",
    body: "Connect your AWS account once. ComplianceGuard pulls CloudTrail logs, S3 bucket policies, IAM configurations, and security group rules into your evidence pack automatically.",
  },
  {
    icon: FileText,
    title: "Auditor-Ready PDF Export",
    body: "Every evidence pack exports in the exact CSV, PDF, and JSON format used in successful SOC 2 Type I and Type II audits. Hand it to your auditor on day one.",
  },
  {
    icon: Lock,
    title: "Zero-Knowledge Architecture",
    body: "Your AWS credentials are encrypted at rest with HKDF-SHA256 derived keys. Evidence data stays in your local database. Our servers never see it.",
  },
  {
    icon: Gauge,
    title: "SOC 2 Readiness Score",
    body: "See your compliance score across all 29 SOC 2 Trust Services Criteria the moment you install. Know exactly what's passing and what needs work.",
  },
  {
    icon: WifiOff,
    title: "Offline Operation",
    body: "ComplianceGuard runs fully offline. No internet connection required to collect evidence or generate reports. Works in air-gapped environments.",
  },
];

const compareRows = [
  ["Starting price", "$49/month", "$10,000+/year", "$10,000+/year"],
  ["Data stays on your machine", "yes", "no", "no"],
  ["Works offline", "yes", "no", "no"],
  ["Per-seat pricing", "No", "Yes", "Yes"],
  ["OS-level evidence collection", "yes", "no", "no"],
  ["Setup time", "60 seconds", "Weeks", "Weeks"],
  ["Auditable codebase", "BSL 1.1", "Proprietary", "Proprietary"],
  ["Free tier", "yes", "no", "no"],
] as const;

const steps = [
  {
    n: 1,
    title: "Download & Install",
    body: "Run the installer for Windows or Mac. No admin privileges required. No API keys. Opens immediately.",
  },
  {
    n: 2,
    title: "Instant Scan",
    body: "ComplianceGuard scans your machine in the background: password policy, firewall, disk encryption, audit logging. Results in 30 seconds.",
  },
  {
    n: 3,
    title: "Connect AWS",
    body: "Add your AWS credentials once (encrypted locally). ComplianceGuard pulls CloudTrail, IAM, and S3 evidence automatically.",
  },
  {
    n: 4,
    title: "Export & Hand Off",
    body: "Generate your evidence pack as PDF, CSV, or JSON. Send it directly to your auditor or use it to self-certify.",
  },
];

function CompareCell({ value, isCG }: { value: string; isCG: boolean }) {
  if (value === "yes") {
    return (
      <span className={`inline-flex items-center justify-center ${isCG ? "text-teal" : "text-teal"}`}>
        <Check size={18} strokeWidth={3} />
      </span>
    );
  }
  if (value === "no") {
    return (
      <span className="inline-flex items-center justify-center text-danger">
        <X size={18} strokeWidth={3} />
      </span>
    );
  }
  return <span className={isCG ? "text-teal font-semibold" : "text-foreground"}>{value}</span>;
}

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* HERO */}
      <section className="bg-background pt-16 md:pt-24 pb-16 md:pb-24">
        <div className="container-cg grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <p className="eyebrow mb-4">On-Premise SOC 2 Compliance</p>
            <h1 className="text-[36px] md:text-[56px] font-bold text-navy leading-[1.05] tracking-tight">
              Stop Paying $10,000<br />
              a Year to Prove<br />
              You're Secure.
            </h1>
            <p className="mt-6 text-[18px] md:text-[20px] text-text-secondary max-w-[480px]">
              ComplianceGuard scans your machines and AWS environment to generate
              auditor-ready SOC 2 evidence packs — without sending a single byte
              to our servers. Free to start. $49/month to finish an audit.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a href="https://github.com/Egyan07/ComplianceGuard/releases/latest" className="btn-primary">
                Download Free — Windows & Mac
              </a>
              <a href="#how-it-works" className="text-teal font-semibold hover:underline">
                See how it works ↓
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-text-secondary">
              <span className="inline-flex items-center gap-2"><Check size={16} className="text-teal" />No cloud storage of your evidence</span>
              <span className="inline-flex items-center gap-2"><Check size={16} className="text-teal" />Auditor-ready PDF export</span>
              <span className="inline-flex items-center gap-2"><Check size={16} className="text-teal" />AWS evidence auto-collection</span>
            </div>
          </div>
          <div className="overflow-hidden -mx-4 px-4 lg:mx-0 lg:px-0">
            <ProductMockup />
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="bg-navy text-white py-24">
        <div className="container-cg">
          <FadeUp>
            <p className="eyebrow mb-4">The Problem</p>
            <h2 className="text-[32px] md:text-[40px] font-bold leading-tight max-w-3xl">
              Enterprise compliance tools were<br />built for enterprise budgets.
            </h2>
            <p className="mt-6 text-[18px] text-white/75 max-w-2xl">
              Vanta starts at $10,000/year. Drata starts at $10,000/year.
              Secureframe won't even show you a price until you book a call.
              <br /><br />
              If you're a 3-person SaaS doing $8K MRR trying to close your first
              enterprise deal, this is extortion with a compliance badge on it.
            </p>
          </FadeUp>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { stat: "$10,000+", label: "Average cost of Vanta or Drata per year" },
              { stat: "4–8 weeks", label: "Typical setup time for cloud-based compliance tools" },
              { stat: "100%", label: "Of your evidence uploaded to their servers" },
            ].map((c, i) => (
              <FadeUp key={c.stat} delay={i * 0.08}>
                <div className="bg-white rounded-[12px] p-8">
                  <div className="text-[48px] font-bold text-navy leading-none">{c.stat}</div>
                  <p className="mt-3 text-[15px] text-text-secondary">{c.label}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION + features */}
      <section id="features" className="bg-background py-24">
        <div className="container-cg">
          <FadeUp>
            <p className="eyebrow mb-4">The Solution</p>
            <h2 className="text-[32px] md:text-[40px] font-bold text-navy max-w-3xl leading-tight">
              Professional SOC 2 readiness.<br />
              On your machine. Under your control.
            </h2>
            <p className="mt-6 text-[18px] text-text-secondary max-w-2xl">
              ComplianceGuard installs in 60 seconds and immediately scans your
              OS and AWS environment. Your evidence never leaves your network.
              Your auditor gets exactly the file format they need.
            </p>
          </FadeUp>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FadeUp key={f.title} delay={i * 0.05}>
                <div className="border border-border rounded-[12px] p-6 h-full">
                  <div className="w-10 h-10 rounded-md bg-teal flex items-center justify-center text-white">
                    <f.icon size={20} />
                  </div>
                  <h3 className="mt-5 text-[18px] font-semibold text-navy">{f.title}</h3>
                  <p className="mt-2 text-[15px] text-text-secondary leading-[1.65]">{f.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="bg-surface py-24">
        <div className="container-cg">
          <FadeUp>
            <p className="eyebrow mb-4">How We Compare</p>
            <h2 className="text-[32px] md:text-[40px] font-bold text-navy max-w-3xl leading-tight">
              Built for teams that can't afford<br />the Enterprise Tax.
            </h2>
          </FadeUp>

          <FadeUp delay={0.05}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full border border-border rounded-[12px] overflow-hidden bg-white text-[15px]">
                <thead>
                  <tr className="bg-navy text-white">
                    <th className="text-left px-6 py-4 font-semibold w-[34%]"></th>
                    <th className="text-left px-6 py-4 font-semibold">ComplianceGuard</th>
                    <th className="text-left px-6 py-4 font-semibold">Vanta</th>
                    <th className="text-left px-6 py-4 font-semibold">Drata</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row, idx) => (
                    <tr key={idx} className="border-t border-border" style={{ height: 52 }}>
                      <td className="px-6 font-medium text-foreground">{row[0]}</td>
                      <td className="px-6"><CompareCell value={row[1]} isCG /></td>
                      <td className="px-6"><CompareCell value={row[2]} isCG={false} /></td>
                      <td className="px-6"><CompareCell value={row[3]} isCG={false} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-center text-[14px] italic text-text-secondary">
              Competitor pricing based on publicly available information as of 2026.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-background py-24">
        <div className="container-cg">
          <FadeUp>
            <p className="eyebrow mb-4">How It Works</p>
            <h2 className="text-[32px] md:text-[40px] font-bold text-navy max-w-3xl leading-tight">
              From install to audit-ready<br />in under 2 minutes.
            </h2>
          </FadeUp>

          <div className="mt-14 grid md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-6 items-start">
            {steps.map((s, i) => (
              <Fragment key={s.n}>
                <FadeUp delay={i * 0.05} className="md:col-auto">
                  <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center font-bold">
                    {s.n}
                  </div>
                  <h3 className="mt-4 text-[18px] font-bold text-navy">{s.title}</h3>
                  <p className="mt-2 text-[15px] text-text-secondary leading-[1.65]">{s.body}</p>
                </FadeUp>
                {i < steps.length - 1 && (
                  <div className="hidden md:flex pt-2 text-text-secondary/60">
                    <ArrowRight size={20} />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="bg-surface py-24">
        <div className="container-cg">
          <FadeUp>
            <h2 className="text-[32px] md:text-[40px] font-bold text-navy text-center">
              Start free. Pay when you're ready.
            </h2>
          </FadeUp>

          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {/* Free */}
            <FadeUp>
              <div className="bg-white border border-border rounded-[12px] p-8 h-full flex flex-col">
                <h3 className="text-[18px] font-bold text-navy">Free</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-[48px] font-bold text-navy leading-none">$0</span>
                  <span className="text-text-secondary">forever</span>
                </div>
                <p className="mt-3 text-[15px] text-text-secondary">See exactly where you fail SOC 2 before you pay a cent.</p>
                <ul className="mt-6 space-y-3 text-[15px] flex-1">
                  {["SOC 2 readiness score","5 control areas visible","Local OS scan","No credit card required"].map((x) => (
                    <li key={x} className="flex gap-2"><Check size={18} className="text-teal shrink-0 mt-0.5" />{x}</li>
                  ))}
                </ul>
                <a href="https://github.com/Egyan07/ComplianceGuard/releases/latest" className="btn-ghost mt-8 w-full">Download Free</a>
              </div>
            </FadeUp>

            {/* Pro - featured */}
            <FadeUp delay={0.05}>
              <div className="relative bg-white rounded-[12px] p-8 h-full flex flex-col" style={{ boxShadow: "0 0 0 2px #1A8C5F" }}>
                <span className="absolute -top-3 left-8 bg-teal text-white text-[13px] font-semibold px-3 py-1 rounded">
                  Most Popular
                </span>
                <h3 className="text-[18px] font-bold text-navy">Pro</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-[48px] font-bold text-navy leading-none">$49</span>
                  <span className="text-text-secondary">/month</span>
                </div>
                <p className="mt-1 text-[14px] text-text-secondary">or $399/year — save 32%</p>
                <p className="mt-3 text-[15px] text-text-secondary">Everything you need to hand an auditor a complete evidence pack.</p>
                <ul className="mt-6 space-y-3 text-[15px] flex-1">
                  {["All 29 SOC 2 controls","Full PDF + CSV export","AWS evidence auto-sync","Evidence history (90 days)","Email support"].map((x) => (
                    <li key={x} className="flex gap-2"><Check size={18} className="text-teal shrink-0 mt-0.5" />{x}</li>
                  ))}
                </ul>
                <a href="mailto:alexisegyan1232@gmail.com?subject=ComplianceGuard%20Pro%20Trial" className="btn-primary mt-8 w-full">Start Pro Trial</a>
              </div>
            </FadeUp>

            {/* Managed */}
            <FadeUp delay={0.1}>
              <div className="bg-white border border-border rounded-[12px] p-8 h-full flex flex-col">
                <h3 className="text-[18px] font-bold text-navy">Managed</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-[48px] font-bold text-navy leading-none">$79</span>
                  <span className="text-text-secondary">/month</span>
                </div>
                <p className="mt-3 text-[15px] text-text-secondary">For consultants managing SOC 2 for multiple clients.</p>
                <ul className="mt-6 space-y-3 text-[15px] flex-1">
                  {["Everything in Pro","Up to 5 client workspaces","Consultant billing dashboard","Priority email support"].map((x) => (
                    <li key={x} className="flex gap-2"><Check size={18} className="text-teal shrink-0 mt-0.5" />{x}</li>
                  ))}
                </ul>
                <a href="mailto:alexisegyan1232@gmail.com?subject=ComplianceGuard%20Managed%20Plan" className="btn-ghost mt-8 w-full">Contact Us</a>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="bg-background py-24">
        <div className="container-cg">
          <FadeUp>
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-[28px] font-bold text-navy">Built with auditors, not just for them.</h3>
              <p className="mt-4 text-[17px] text-text-secondary">
                ComplianceGuard evidence packs are mapped to the AICPA Trust Services Criteria.
                The exact format we export is what real auditors accept for SOC 2 Type I and Type II reports.
              </p>
            </div>
          </FadeUp>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { Icon: Award, title: "AICPA TSC-Mapped", body: "Every control mapped to the official Trust Services Criteria framework." },
              { Icon: Shield, title: "Ed25519 Signed", body: "License verification uses public-key cryptography. Zero trust architecture." },
              { Icon: Code2, title: "BSL 1.1 Open Core", body: "You can read the code that reads your system. No black boxes." },
            ].map((t, i) => (
              <FadeUp key={t.title} delay={i * 0.05}>
                <div className="border border-border rounded-[12px] p-6 h-full">
                  <div className="w-10 h-10 rounded-md bg-teal flex items-center justify-center text-white">
                    <t.Icon size={20} />
                  </div>
                  <h4 className="mt-5 text-[18px] font-semibold text-navy">{t.title}</h4>
                  <p className="mt-2 text-[15px] text-text-secondary">{t.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-navy text-white py-24">
        <div className="container-cg text-center">
          <FadeUp>
            <h2 className="text-[36px] md:text-[44px] font-bold leading-tight">
              Your next enterprise deal<br />is waiting for a SOC 2 report.
            </h2>
            <p className="mt-6 text-[18px] md:text-[20px] text-white/75 max-w-[560px] mx-auto">
              Stop losing deals to a compliance gap. ComplianceGuard gets you
              audit-ready without the $10,000 bill.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://github.com/Egyan07/ComplianceGuard/releases/latest" className="btn-on-navy">Download Free</a>
              <Link to="/pricing" className="btn-ghost-on-navy">See Pricing</Link>
            </div>
            <p className="mt-6 text-[14px] text-white/50">
              No account required. No cloud storage. No credit card for the free tier.
            </p>

            <div className="mt-10 max-w-md mx-auto">
              <WaitlistForm source="landing_cta" />
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
