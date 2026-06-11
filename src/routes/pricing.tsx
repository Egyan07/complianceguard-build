import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { FadeUp } from "@/components/FadeUp";
import { WaitlistForm } from "@/components/WaitlistForm";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — ComplianceGuard" },
      {
        name: "description",
        content:
          "ComplianceGuard pricing: Free forever, Pro at $49/month, Managed at $79/month. No per-seat fees. No enterprise minimums. Cancel anytime.",
      },
      { property: "og:title", content: "ComplianceGuard Pricing — $49/month, not $10,000/year" },
      {
        property: "og:description",
        content: "Flat pricing for SOC 2, ISO 27001 and HIPAA readiness. Free tier, Pro at $49/mo.",
      },
      { property: "og:url", content: "/pricing" },
      { property: "og:image", content: "/og-image.png" },
      { name: "twitter:image", content: "/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
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
    a: "Yes. ComplianceGuard supports all three frameworks. SOC 2 Type II (29 controls), ISO 27001:2013 (47 Annex A controls), and the HIPAA Security Rule (47 safeguards). The same OS-level evidence pass feeds all three.",
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
    a: "The Managed plan is designed for freelance GRC consultants or small firms managing readiness for multiple clients. You get 5 separate client workspaces, white-label PDF exports, and a consultant referral link.",
  },
];

const freeFeatures = [
  "SOC 2 readiness score",
  "5 control areas visible",
  "Local OS scan (Windows + macOS)",
  "No credit card required",
];

const proFeatures = [
  "SOC 2 (29) · ISO 27001 (47) · HIPAA (47)",
  "Unlimited evidence collection runs",
  "Full PDF, CSV, and JSON export",
  "AWS CloudTrail + IAM + S3 evidence",
  "Windows 10/11 + macOS (Intel & Apple Silicon)",
  "Evidence history: 90 days",
  "Audit-ready report formatting",
  "Email support (48hr response)",
];

const managedFeatures = [
  "Everything in Pro",
  "5 client workspaces (additional available)",
  "Centralized billing dashboard",
  "White-label PDF reports",
  "Priority email support (24hr response)",
  "Consultant referral programme access",
];

type Tier = {
  name: string;
  price: string;
  cadence: string;
  sub?: string;
  tagline: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
};

function PricingPage() {
  const [annual, setAnnual] = useState(false);

  const proPrice = annual ? "$33" : "$49";
  const proSub = annual ? "billed $399/year" : "or $399/year — save 32%";
  const managedPrice = annual ? "$63" : "$79";
  const managedSub = annual ? "billed $759/year" : "or $759/year";

  const tiers: Tier[] = [
    {
      name: "Free",
      price: "$0",
      cadence: "forever",
      tagline: "See exactly where you fail SOC 2 before you pay a cent.",
      features: freeFeatures,
      cta: { label: "Download Free", href: "https://github.com/Egyan07/ComplianceGuard/releases/latest" },
    },
    {
      name: "Pro",
      price: proPrice,
      cadence: "/month",
      sub: proSub,
      tagline: "Everything you need to hand an auditor a complete evidence pack.",
      features: proFeatures,
      cta: {
        label: "Start Pro Trial",
        href: "mailto:alexisegyan1232@gmail.com?subject=ComplianceGuard%20Pro%20Trial",
      },
      featured: true,
    },
    {
      name: "Managed",
      price: managedPrice,
      cadence: "/month",
      sub: managedSub,
      tagline: "For consultants managing readiness for multiple clients.",
      features: managedFeatures,
      cta: {
        label: "Contact Us",
        href: "mailto:alexisegyan1232@gmail.com?subject=ComplianceGuard%20Managed%20Plan",
      },
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-snow">
      <Navbar />

      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Flat pricing.
            <br />
            <span
              style={{
                backgroundImage: "linear-gradient(120deg,#0071e3,#5e9cff 60%,#ff5980)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              No enterprise tax.
            </span>
          </>
        }
        subtitle="No per-seat math. No 'let's get on a call' pricing. Just a rate that makes sense for a real company."
        ornament="rings"
      >
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white border border-[var(--silver-mist)]">
          <button
            onClick={() => setAnnual(false)}
            className={`px-4 py-1.5 text-[13px] font-medium rounded-full transition ${
              !annual ? "bg-ink text-white" : "text-text-secondary"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`px-4 py-1.5 text-[13px] font-medium rounded-full inline-flex items-center gap-2 transition ${
              annual ? "bg-ink text-white" : "text-text-secondary"
            }`}
          >
            Annual
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                annual ? "bg-azure text-white" : "bg-azure/10 text-azure"
              }`}
            >
              −32%
            </span>
          </button>
        </div>
      </PageHero>

      <section className="bg-snow pb-20">
        <div className="container-cg grid md:grid-cols-3 gap-5">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="relative"
            >
              <div
                className="h-full p-8 flex flex-col"
                style={{
                  borderRadius: 28,
                  background: t.featured
                    ? "linear-gradient(160deg, #f0f6ff 0%, #ffffff 60%)"
                    : "var(--fog)",
                  border: t.featured ? "1px solid #c3dafe" : "1px solid transparent",
                }}
              >
                {t.featured && (
                  <span className="absolute -top-3 left-8 inline-flex items-center gap-1.5 bg-azure text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80 opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    Most popular
                  </span>
                )}
                <p className="mono-tag mb-3">{t.name}</p>
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-[56px] font-semibold leading-none text-ink tabular-nums"
                    style={{ letterSpacing: "-0.04em" }}
                  >
                    {t.price}
                  </span>
                  <span className="text-text-secondary">{t.cadence}</span>
                </div>
                {t.sub && <p className="mt-1 text-[13px] text-text-secondary">{t.sub}</p>}
                <p className="mt-4 text-[15px] text-text-secondary leading-relaxed">{t.tagline}</p>
                <ul className="mt-6 space-y-3 text-[15px] text-ink/85 flex-1">
                  {t.features.map((x) => (
                    <li key={x} className="flex gap-2">
                      <Check
                        size={16}
                        className={`shrink-0 mt-1 ${t.featured ? "text-azure" : "text-ink/60"}`}
                      />
                      {x}
                    </li>
                  ))}
                </ul>
                <a
                  href={t.cta.href}
                  className={`mt-8 w-full text-center ${t.featured ? "btn-primary" : "btn-dark"}`}
                >
                  {t.cta.label}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-[14px] text-text-secondary max-w-2xl mx-auto">
          30-day money-back guarantee on Pro and Managed. Email and we&apos;ll refund within 24 hours.
          Self-hosting? Deploy to Railway, Render, or any Docker host in one command.
        </p>

        {/* Enterprise air-gapped band */}
        <div className="container-cg mt-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[28px] p-10 md:p-14 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            style={{
              background:
                "linear-gradient(135deg, #050816 0%, #0b1530 45%, #112a5e 100%)",
            }}
          >
            <div
              aria-hidden
              className="absolute -right-32 -top-32 w-[420px] h-[420px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(0,113,227,0.45), transparent 60%)",
                filter: "blur(40px)",
              }}
            />
            <div className="relative max-w-2xl">
              <p className="text-[12px] font-mono uppercase tracking-[0.14em] text-azure/90 mb-3">
                New in v3.2.0 &middot; Enterprise
              </p>
              <h3
                className="font-semibold"
                style={{ fontSize: "clamp(28px,3.4vw,40px)", letterSpacing: "-0.025em", lineHeight: 1.1 }}
              >
                Air-gapped, tamper-evident, fully sovereign.
              </h3>
              <p className="mt-4 text-[15px] text-white/75 leading-relaxed">
                SHA-256 hash-chained audit log, RBAC (admin + auditor), custom PDF branding,
                NDJSON data export, and a hardened Docker bundle with zero outbound calls.
                For regulated industries, government, NHS/healthcare, legal, and finance.
              </p>
            </div>
            <a
              href="mailto:alexisegyan1232@gmail.com?subject=ComplianceGuard%20Enterprise%20(Air-Gapped)"
              className="relative btn-on-navy shrink-0"
            >
              Contact Sales
            </a>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-fog py-24">
        <div className="container-cg max-w-3xl">
          <FadeUp>
            <p className="mono-tag mb-3">FAQ</p>
            <h2
              className="font-semibold text-ink"
              style={{ fontSize: "clamp(32px,4.4vw,52px)", letterSpacing: "-0.025em", lineHeight: 1.08 }}
            >
              Common questions.
            </h2>
          </FadeUp>
          <div className="mt-10 space-y-2">
            {faqs.map((f, i) => (
              <FadeUp key={f.q} delay={i * 0.04}>
                <FaqItem q={f.q} a={f.a} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section className="bg-snow py-20">
        <div className="container-cg text-center max-w-2xl">
          <h2
            className="font-semibold text-ink"
            style={{ fontSize: "clamp(28px,3.6vw,44px)", letterSpacing: "-0.025em" }}
          >
            Get release notes as we ship.
          </h2>
          <p className="mt-3 text-text-secondary">No spam. Just changelog highlights.</p>
          <div className="mt-6">
            <WaitlistForm source="pricing_cta" variant="onLight" />
          </div>
          <div className="mt-6">
            <Link to="/" className="btn-ghost">
              Back to Home
            </Link>
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
    <div className="bg-white rounded-2xl border border-[var(--silver-mist)] overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-[16px] font-medium text-ink">{q}</span>
        <ChevronDown
          size={18}
          className={`text-text-secondary transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 text-[15px] text-text-secondary leading-[1.7]">{a}</p>
        </div>
      </div>
    </div>
  );
}
