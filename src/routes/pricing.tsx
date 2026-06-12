import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { buildMeta, DOWNLOAD_URL, TIERS, salesMailto } from "@/lib/site";

export const Route = createFileRoute("/pricing")({
  head: () =>
    buildMeta({
      title: "Pricing — ComplianceGuard",
      description:
        "ComplianceGuard pricing: Free forever, Pro at $49/month, Managed at $79/month. One flat rate per deployment. No per-seat fees. Cancel anytime.",
      path: "/pricing",
    }),
  component: PricingPage,
});

const faqs = [
  {
    q: "Is ComplianceGuard a cloud SaaS tool?",
    a: "No. ComplianceGuard is a desktop application that runs entirely on your machine. Your evidence data, AWS credentials, and compliance reports are stored in a local database. Endpoint evidence stays on your machine until you explicitly choose to sync it.",
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
    a: "Your credentials are encrypted at rest on your machine using HKDF-SHA256-derived Fernet keys and are read only at evidence-collection time.",
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

function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-snow">
      <Navbar />

      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Flat pricing.
            <br />
            No per-seat math.
          </>
        }
        subtitle="One rate per deployment, billed monthly or annually. The core product is never gated behind a sales call."
        ornament="grid"
      >
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-snow border border-hairline">
          <button
            onClick={() => setAnnual(false)}
            className={`px-4 py-1.5 text-[13px] font-medium rounded-full transition ${
              !annual ? "bg-ink text-white" : "text-ink-2"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`px-4 py-1.5 text-[13px] font-medium rounded-full transition ${
              annual ? "bg-ink text-white" : "text-ink-2"
            }`}
          >
            Annual
          </button>
        </div>
      </PageHero>

      <section className="bg-snow pb-20">
        <RevealGroup className="container-cg grid md:grid-cols-3 gap-5">
          {TIERS.map((t) => {
            const savePct = t.annual ? Math.round((1 - t.annual / (t.monthly * 12)) * 100) : null;
            const price =
              t.monthly === 0
                ? "$0"
                : annual && t.annual
                  ? `$${Math.round(t.annual / 12)}`
                  : `$${t.monthly}`;
            const cadence = t.monthly === 0 ? "forever" : "/month";
            const sub =
              t.annual && savePct
                ? annual
                  ? `billed $${t.annual}/year — save ${savePct}%`
                  : `or $${t.annual}/year — save ${savePct}%`
                : null;
            return (
              <RevealItem key={t.name} className="relative">
                <div
                  className={`${t.featured ? "card-snow" : "card-fog"} card-hover h-full p-8 flex flex-col`}
                  style={t.featured ? { boxShadow: "0 0 0 2px var(--azure)" } : undefined}
                >
                  {t.featured && (
                    <span className="absolute -top-3 left-8 inline-flex items-center bg-azure text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                      Most popular
                    </span>
                  )}
                  <p className="mono-tag mb-3">{t.name}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="display-2 tabular-nums">{price}</span>
                    <span className="text-ink-2">{cadence}</span>
                  </div>
                  {sub && <p className="mt-1 text-[13px] text-ink-2">{sub}</p>}
                  <p className="mt-4 text-[15px] text-ink-2 leading-relaxed">{t.tagline}</p>
                  <ul className="mt-6 space-y-3 text-[15px] text-ink flex-1">
                    {t.features.map((x) => (
                      <li key={x} className="flex gap-2">
                        <Check
                          size={16}
                          className={`shrink-0 mt-1 ${t.featured ? "text-azure" : "text-ink-3"}`}
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
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal>
          <p className="mt-10 text-center caption text-ink-3 max-w-2xl mx-auto">
            30-day money-back guarantee on Pro and Managed. Email us and we&apos;ll refund within 24
            hours.
          </p>
        </Reveal>

        {/* Enterprise air-gapped band */}
        <div className="container-cg mt-14">
          <Reveal>
            <div className="finish-azure on-dark relative overflow-hidden rounded-xl p-10 md:p-14 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="relative max-w-2xl">
                <p className="mono-tag mb-3" style={{ color: "var(--azure-bright)" }}>
                  Enterprise
                </p>
                <h3 className="display-3" style={{ color: "var(--snow)" }}>
                  Air-gapped, tamper-evident, fully sovereign.
                </h3>
                <p className="mt-4 text-[15px] text-white/75 leading-relaxed">
                  SHA-256 hash-chained audit log, RBAC (admin + auditor), custom PDF branding,
                  NDJSON data export, and a hardened Docker bundle with zero outbound calls. For
                  regulated industries, government, NHS/healthcare, legal, and finance.
                </p>
              </div>
              <a
                href={salesMailto("ComplianceGuard Enterprise")}
                className="relative btn-on-navy shrink-0"
              >
                Contact Sales
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-fog py-24">
        <div className="container-cg max-w-3xl">
          <Reveal>
            <p className="mono-tag mb-3">FAQ</p>
            <h2 className="display-2">Common questions.</h2>
          </Reveal>
          <div className="mt-10 space-y-2">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.04}>
                <FaqItem q={f.q} a={f.a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-snow py-20">
        <Reveal>
          <div className="container-cg text-center max-w-2xl">
            <h2 className="display-2">Start with the free scan.</h2>
            <p className="mt-3 text-ink-2">
              Download, run the readiness scan, and see exactly where you stand in minutes.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <a href={DOWNLOAD_URL} className="btn-primary">
                Download Free
              </a>
              <Link to="/" className="btn-ghost">
                Back to Home
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card-snow overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-[16px] font-medium text-ink">{q}</span>
        <ChevronDown
          size={18}
          className={`text-ink-3 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 text-[15px] text-ink-2 leading-[1.7]">{a}</p>
        </div>
      </div>
    </div>
  );
}
