import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TheGap } from "@/components/TheGap";
import { HowItWorks } from "@/components/HowItWorks";
import { FeatureSpotlights } from "@/components/FeatureSpotlights";
import { FrameworksSection } from "@/components/FrameworksSection";
import { TrustArchitecture } from "@/components/TrustArchitecture";
import { EnterpriseSection } from "@/components/EnterpriseSection";
import { HomepageFAQ } from "@/components/HomepageFAQ";
import { Footer } from "@/components/Footer";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { DUR, EASE_EXPO, VIEWPORT } from "@/lib/motion";
import { buildMeta, DOWNLOAD_URL, TIERS, salesMailto } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () =>
    buildMeta({
      title: "ComplianceGuard — Endpoint Compliance Evidence for SOC 2, ISO 27001 & HIPAA",
      description:
        "ComplianceGuard collects, scores, and signs compliance evidence directly from your Windows and macOS endpoints. Three frameworks, one scan — and nothing leaves your network.",
      path: "/",
    }),
  component: LandingPage,
});

const compareRows = [
  ["Evidence source", "The endpoint itself", "Cloud APIs only", "Cloud APIs only"],
  ["Data stays on your machine", "yes", "no", "no"],
  ["Works offline / air-gapped", "yes", "no", "no"],
  ["Compliance frameworks", "SOC 2 · ISO 27001 · HIPAA", "SOC 2 · ISO 27001", "SOC 2 · ISO 27001"],
  ["Per-seat pricing", "No — flat rate", "Yes", "Yes"],
  ["Setup time", "Minutes", "Weeks", "Weeks"],
  ["Source code", "BSL 1.1 source-available", "Proprietary", "Proprietary"],
  ["Free tier", "yes", "no", "no"],
] as const;

function CompareCell({ value, isCG }: { value: string; isCG: boolean }) {
  if (value === "yes") {
    return (
      <span
        className={`inline-flex items-center justify-center ${isCG ? "text-azure" : "text-ink-3"}`}
      >
        <Check size={18} strokeWidth={2.5} aria-label="Yes" />
      </span>
    );
  }
  if (value === "no") {
    return (
      <span className="inline-flex items-center justify-center text-ink-3">
        <X size={18} strokeWidth={2.5} aria-label="No" />
      </span>
    );
  }
  return <span className={isCG ? "text-azure font-medium" : "text-ink-2"}>{value}</span>;
}

function Comparison() {
  return (
    <section className="bg-snow py-24 md:py-32">
      <div className="container-cg">
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-4">How we compare</p>
          <h2 className="display-2">Different by architecture.</h2>
          <p className="mt-6 body-lg text-ink-2 max-w-2xl">
            Cloud compliance platforms and ComplianceGuard solve different layers of the same
            problem. The difference is where the evidence comes from &mdash; and where it stays.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 overflow-x-auto">
            <table
              className="w-full text-[15px] card-snow overflow-hidden"
              style={{ borderCollapse: "separate", borderSpacing: 0 }}
            >
              <thead>
                <tr className="bg-ink text-snow">
                  <th className="text-left px-6 py-4 font-semibold w-[30%]">
                    <span className="sr-only">Capability</span>
                  </th>
                  <th className="text-left px-6 py-4 font-semibold">ComplianceGuard</th>
                  <th className="text-left px-6 py-4 font-medium text-snow/80">Vanta</th>
                  <th className="text-left px-6 py-4 font-medium text-snow/80">Drata</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, idx) => (
                  <motion.tr
                    key={row[0]}
                    className="border-t border-hairline"
                    style={{ height: 54 }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={VIEWPORT}
                    transition={{ duration: DUR.fast, ease: EASE_EXPO, delay: idx * 0.04 }}
                  >
                    <td className="px-6 font-medium text-ink">{row[0]}</td>
                    <td className="px-6">
                      <CompareCell value={row[1]} isCG />
                    </td>
                    <td className="px-6">
                      <CompareCell value={row[2]} isCG={false} />
                    </td>
                    <td className="px-6">
                      <CompareCell value={row[3]} isCG={false} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-[13px] text-ink-3">
            Competitor capabilities based on publicly available information as of 2026.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function PricingPreview() {
  return (
    <section className="bg-fog py-24 md:py-32">
      <div className="container-cg">
        <Reveal className="text-center max-w-2xl mx-auto">
          <p className="eyebrow mb-4">Pricing</p>
          <h2 className="display-2">Start free. Scale when ready.</h2>
        </Reveal>

        <RevealGroup className="mt-14 grid md:grid-cols-3 gap-5 items-stretch">
          {TIERS.map((t) => (
            <RevealItem key={t.name} className="h-full">
              <div
                className={`relative card-snow card-hover p-8 h-full flex flex-col ${t.featured ? "" : ""}`}
                style={t.featured ? { boxShadow: "0 0 0 2px var(--azure)" } : undefined}
              >
                {t.featured && (
                  <span className="absolute -top-3 left-8 bg-azure text-snow text-[12px] font-semibold px-3 py-1 rounded-full">
                    Most popular
                  </span>
                )}
                <h3 className="text-[17px] font-semibold text-ink">{t.name}</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span
                    className="text-[44px] font-semibold text-ink leading-none"
                    style={{ letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}
                  >
                    ${t.monthly.toLocaleString("en-US")}
                  </span>
                  <span className="text-[15px] text-ink-3">
                    {t.monthly === 0 ? "forever" : "/month"}
                  </span>
                </div>
                <p className="mt-3 text-[14px] text-ink-2 leading-[1.6]">{t.tagline}</p>
                <ul className="mt-6 space-y-2.5 text-[14px] text-ink-2 flex-1">
                  {t.features.slice(0, 4).map((x) => (
                    <li key={x} className="flex gap-2.5">
                      <Check size={16} className="text-azure shrink-0 mt-0.5" aria-hidden />
                      {x}
                    </li>
                  ))}
                </ul>
                <a
                  href={t.cta.href}
                  className={`${t.featured ? "btn-primary" : "btn-ghost"} mt-8 w-full`}
                >
                  {t.cta.label}
                </a>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-10 text-center">
          <p className="text-[13px] text-ink-3 mb-3">
            Self-hosted pricing, billed annually. Managed hosting available.
          </p>
          <Link to="/pricing" className="text-[15px] text-link hover:underline">
            Compare all plans and managed hosting <span aria-hidden>&rsaquo;</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="on-dark bg-ink text-snow py-24 md:py-32">
      <div className="container-cg text-center">
        <Reveal>
          <h2 className="display-2 !text-snow">
            Your next enterprise deal
            <br />
            is waiting on a SOC&nbsp;2 report.
          </h2>
          <p className="mt-6 body-lg text-snow/70 max-w-[560px] mx-auto">
            Get audit-ready with evidence collected from the machines themselves &mdash; scored,
            signed, and under your control.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <a href={DOWNLOAD_URL} className="btn-on-navy">
              Download for free
            </a>
            <a href={salesMailto("ComplianceGuard — sales enquiry")} className="btn-ghost-on-navy">
              Contact sales
            </a>
          </div>
          <p className="mt-7 text-[13px] text-snow/50">
            No account required. No cloud storage. No credit card for the free tier.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main id="main">
        <Hero />
        <TheGap />
        <HowItWorks />
        <FeatureSpotlights />
        <FrameworksSection />
        <TrustArchitecture />
        <Comparison />
        <EnterpriseSection />
        <PricingPreview />
        <HomepageFAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
