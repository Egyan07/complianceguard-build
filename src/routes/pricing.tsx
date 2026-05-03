import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FadeUp } from "@/components/FadeUp";
import { WaitlistForm } from "@/components/WaitlistForm";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — ComplianceGuard" },
      {
        name: "description",
        content: "ComplianceGuard pricing: Free forever, Pro at $49/month, Managed at $79/month. No per-seat fees. No enterprise minimums. Cancel anytime.",
      },
      { property: "og:title", content: "ComplianceGuard Pricing — $49/month, not $10,000/year" },
      { property: "og:description", content: "Flat pricing for SOC 2 readiness. Free tier, Pro at $49/mo, Managed at $79/mo." },
      { property: "og:url", content: "https://complianceguard.cguard.workers.dev/pricing" },
      { property: "og:image", content: "https://complianceguard.cguard.workers.dev/og-image.png" },
      { name: "twitter:image", content: "https://complianceguard.cguard.workers.dev/og-image.png" },
    ],
  }),
  component: PricingPage,
});

const faqs = [
  {
    q: "Is ComplianceGuard a cloud SaaS tool?",
    a: "No. ComplianceGuard is a desktop application that runs entirely on your machine. Your evidence data, AWS credentials, and compliance reports are stored in a local database. Nothing is transmitted to our servers.",
  },
  {
    q: "What happens after the free tier?",
    a: "The free tier shows your SOC 2 readiness score and lets you see which controls you're passing or failing. To export a full evidence pack (PDF/CSV) and connect AWS for automated evidence collection, you need Pro.",
  },
  {
    q: "Can I use ComplianceGuard for ISO 27001 or HIPAA?",
    a: "Yes. ComplianceGuard now supports all three frameworks. SOC 2 Type II (29 controls), ISO 27001:2013 (47 Annex A controls), and the HIPAA Security Rule (47 safeguards across all five 45 CFR Part 164 sections). The same OS-level evidence collection feeds all three.",
  },
  {
    q: "Do you store my AWS credentials?",
    a: "Your credentials are encrypted locally using HKDF-SHA256 derived Fernet keys before being stored. They are never transmitted to ComplianceGuard servers.",
  },
  {
    q: "Can I get a refund?",
    a: "Yes. If ComplianceGuard doesn't meet your needs within 30 days, contact us for a full refund. No questions asked.",
  },
  {
    q: "What do I get with the Managed plan?",
    a: "The Managed plan is designed for freelance GRC consultants or small firms managing SOC 2 readiness for multiple clients. You get 5 separate client workspaces, white-label PDF exports, and a consultant referral link.",
  },
];

const proFeatures = [
  "All 29 SOC 2 Trust Services Criteria",
  "Unlimited evidence collection runs",
  "Full PDF, CSV, and JSON export",
  "AWS CloudTrail + IAM + S3 evidence",
  "OS-level evidence (Windows, Mac, Linux)",
  "Evidence history: 90 days",
  "Audit-ready report formatting",
  "Email support (48hr response)",
  "Installer for Windows & Mac",
];

const managedFeatures = [
  "Everything in Pro",
  "5 client workspaces (additional available)",
  "Centralized billing dashboard",
  "White-label PDF reports (logo + firm name)",
  "Priority email support (24hr response)",
  "Consultant referral programme access",
];

const freeFeatures = [
  "SOC 2 readiness score",
  "5 control areas visible",
  "Local OS scan",
  "No credit card required",
];

function PricingPage() {
  const [annual, setAnnual] = useState(false);

  const proPrice = annual ? "$33" : "$49";
  const proSub = annual ? "billed $399/year" : "or $399/year — save 32%";
  const managedPrice = annual ? "$63" : "$79";
  const managedSub = annual ? "billed $759/year" : "or $759/year";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-background pt-20 pb-12 text-center">
        <div className="container-cg">
          <FadeUp>
            <h1 className="text-[40px] md:text-[52px] font-bold text-navy leading-[1.1]">
              Pricing that scales with your team,<br />not against it.
            </h1>
            <p className="mt-6 text-[18px] md:text-[20px] text-text-secondary max-w-[540px] mx-auto">
              No per-seat tax. No "let's get on a call" pricing. No enterprise minimums.
              Just a flat rate that makes sense for a real company.
            </p>

            <div className="mt-10 inline-flex items-center gap-1 p-1 border border-border rounded-md bg-white">
              <button
                onClick={() => setAnnual(false)}
                className={`px-4 py-2 text-[14px] font-semibold rounded ${!annual ? "bg-navy text-white" : "text-text-secondary"}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`px-4 py-2 text-[14px] font-semibold rounded inline-flex items-center gap-2 ${annual ? "bg-navy text-white" : "text-text-secondary"}`}
              >
                Annual
                <span className={`text-[11px] px-1.5 py-0.5 rounded ${annual ? "bg-teal text-white" : "bg-teal/10 text-teal"}`}>−32%</span>
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="bg-background pb-20">
        <div className="container-cg grid md:grid-cols-3 gap-6">
          {/* Free */}
          <div className="bg-white border border-border rounded-[12px] p-8 flex flex-col">
            <h3 className="text-[18px] font-bold text-navy">Free</h3>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-[48px] font-bold text-navy leading-none">$0</span>
              <span className="text-text-secondary">forever</span>
            </div>
            <p className="mt-3 text-[15px] text-text-secondary">See exactly where you fail SOC 2 before you pay a cent.</p>
            <ul className="mt-6 space-y-3 text-[15px] flex-1">
              {freeFeatures.map((x) => (
                <li key={x} className="flex gap-2"><Check size={18} className="text-teal shrink-0 mt-0.5" />{x}</li>
              ))}
            </ul>
            <a href="https://github.com/Egyan07/ComplianceGuard/releases/latest" className="btn-ghost mt-8 w-full">Download Free</a>
          </div>

          {/* Pro */}
          <div className="relative bg-white rounded-[12px] p-8 flex flex-col order-first md:order-none" style={{ boxShadow: "0 0 0 2px #1A8C5F" }}>
            <span className="absolute -top-3 left-8 bg-teal text-white text-[13px] font-semibold px-3 py-1 rounded">
              Most Popular
            </span>
            <h3 className="text-[18px] font-bold text-navy">Pro</h3>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-[48px] font-bold text-navy leading-none">{proPrice}</span>
              <span className="text-text-secondary">/month</span>
            </div>
            <p className="mt-1 text-[14px] text-text-secondary">{proSub}</p>
            <p className="mt-3 text-[15px] text-text-secondary">Everything you need to hand an auditor a complete evidence pack.</p>
            <ul className="mt-6 space-y-3 text-[15px] flex-1">
              {proFeatures.map((x) => (
                <li key={x} className="flex gap-2"><Check size={18} className="text-teal shrink-0 mt-0.5" />{x}</li>
              ))}
            </ul>
            <a href="mailto:alexisegyan1232@gmail.com?subject=ComplianceGuard%20Pro%20Trial" className="btn-primary mt-8 w-full">Start Pro Trial</a>
          </div>

          {/* Managed */}
          <div className="bg-white border border-border rounded-[12px] p-8 flex flex-col">
            <h3 className="text-[18px] font-bold text-navy">Managed</h3>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-[48px] font-bold text-navy leading-none">{managedPrice}</span>
              <span className="text-text-secondary">/month</span>
            </div>
            <p className="mt-1 text-[14px] text-text-secondary">{managedSub}</p>
            <p className="mt-3 text-[15px] text-text-secondary">For consultants managing SOC 2 for multiple clients.</p>
            <ul className="mt-6 space-y-3 text-[15px] flex-1">
              {managedFeatures.map((x) => (
                <li key={x} className="flex gap-2"><Check size={18} className="text-teal shrink-0 mt-0.5" />{x}</li>
              ))}
            </ul>
            <a href="mailto:alexisegyan1232@gmail.com?subject=ComplianceGuard%20Managed%20Plan" className="btn-ghost mt-8 w-full">Contact Us</a>
          </div>
        </div>

        <p className="mt-10 text-center text-[15px] text-text-secondary max-w-2xl mx-auto">
          30-day money-back guarantee on Pro and Managed. No questions asked. Email us and we&apos;ll refund within 24 hours.
        </p>
        <p className="mt-3 text-center text-[14px] text-text-secondary max-w-2xl mx-auto">
          Self-hosting? Deploy to Railway, Render, or any Docker host in one command. Full instructions in the GitHub README.
        </p>
      </section>

      {/* FAQ */}
      <section className="bg-surface py-24">
        <div className="container-cg max-w-3xl">
          <FadeUp>
            <h2 className="text-[28px] md:text-[36px] font-bold text-navy">Common questions</h2>
          </FadeUp>
          <div className="mt-10 space-y-3">
            {faqs.map((f, i) => (
              <FadeUp key={f.q} delay={i * 0.04}>
                <FaqItem q={f.q} a={f.a} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist mini CTA */}
      <section className="bg-navy text-white py-20">
        <div className="container-cg text-center">
          <h2 className="text-[28px] md:text-[36px] font-bold">Want updates as we ship?</h2>
          <p className="mt-3 text-white/75">No spam. Just release notes and the occasional rant about Vanta.</p>
          <div className="mt-6">
            <WaitlistForm source="pricing_cta" />
          </div>
          <div className="mt-6">
            <Link to="/" className="btn-ghost-on-navy">Back to Home</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-border rounded-[8px]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-[16px] font-semibold text-navy">{q}</span>
        <ChevronDown size={18} className={`text-text-secondary transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-[15px] text-text-secondary leading-[1.7]">{a}</p>
        </div>
      </div>
    </div>
  );
}
