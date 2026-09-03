import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { AnimatedStat } from "@/components/AnimatedStatValue";
import { ProductMockup } from "@/components/ProductMockup";
import { buildMeta, VERSION } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () =>
    buildMeta({
      title: "About | ComplianceGuard",
      description:
        "ComplianceGuard collects, scores, and signs compliance evidence on the endpoint where it originates. SOC 2, ISO 27001, and HIPAA. Local-first and source-available.",
      path: "/about",
    }),
  component: AboutPage,
});

const principles = [
  {
    title: "Data sovereignty by default",
    body: "Evidence, credentials, and reports live in a local database on your machine. Nothing leaves your network unless you explicitly choose to send it.",
  },
  {
    title: "Evidence you can audit",
    body: "The collector is source-available under BSL 1.1. You can read every line of the code that reads your systems, and so can your auditor.",
  },
  {
    title: "Honest scope",
    body: "ComplianceGuard does endpoint evidence, scoring, and reporting. It does them rigorously. We don't claim integrations or services we don't ship.",
  },
];

const stats = [
  { value: "568+", label: "Tests passing across the stack" },
  { value: "123", label: "Controls (SOC 2 · ISO 27001 · HIPAA)" },
  { value: "8", label: "Evidence categories per machine" },
  { value: "2", label: "OSes supported (Windows + macOS)" },
  { value: "5", label: "Green CI workflows on every commit" },
  { value: "0", label: "Bytes uploaded to a vendor cloud" },
];

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-snow">
      <Navbar />

      <main id="main">
        <PageHero
          eyebrow="About"
          title="Compliance evidence should live where the evidence lives."
          subtitle="ComplianceGuard collects, scores, and signs endpoint evidence for SOC 2, ISO 27001, and HIPAA, locally, on the machines being audited."
          ornament="grid"
        />

        {/* Why we exist */}
        <section className="bg-snow pb-24" aria-labelledby="why-heading">
          <div className="container-cg">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">
              <Reveal>
                <h2 id="why-heading" className="display-3 mb-6">
                  Why ComplianceGuard exists.
                </h2>
                <div className="text-[17px] text-ink-2 leading-[1.65] space-y-5">
                  <p>
                    Compliance platforms moved to the cloud, but the evidence didn&apos;t. Disk
                    encryption status, firewall configuration, OS patch level, and screen-lock policy. These are the controls auditors actually check, and
                    they live on endpoints, where cloud integrations can&apos;t see them.
                  </p>
                  <p>
                    Cloud-first platforms such as Vanta solve a different problem well:
                    orchestrating SaaS and infrastructure integrations at scale. But they ask teams
                    to ship sensitive evidence to a vendor cloud to get it, and they leave the
                    endpoint layer largely uncovered.
                  </p>
                  <p>
                    Our founder saw that gap and took the architectural position that defines this
                    product: evidence should be collected, scored, and cryptographically signed on
                    the machine where it originates: a local-first desktop application, not another
                    cloud you hand your infrastructure to.
                  </p>
                  <p>
                    The result is readiness you can hand to an auditor without handing your
                    infrastructure to anyone else.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div
                  className="lg:sticky lg:top-28 card-snow p-8"
                  style={{ boxShadow: "var(--shadow-card)" }}
                >
                  <p className="mono-tag mb-5">What it actually does</p>
                  <ul className="space-y-4">
                    {[
                      "Collects endpoint evidence directly on Windows and macOS",
                      "Scores SOC 2, ISO 27001, and HIPAA in a single pass",
                      "Stores everything locally; no data leaves your network",
                      "Exports a signed PDF evidence pack your auditor can verify",
                    ].map((item) => (
                      <li key={item} className="flex gap-3">
                        <span
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                          style={{ background: "var(--azure-soft)" }}
                        >
                          <Check size={12} strokeWidth={3} className="text-azure" />
                        </span>
                        <span className="text-[15px] text-ink leading-[1.5]">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 pt-5 border-t border-hairline text-[13px] text-ink-3">
                    One collection pass &middot; three frameworks &middot; zero telemetry.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-fog py-24" aria-labelledby="numbers-heading">
          <div className="container-cg max-w-4xl">
            <Reveal>
              <p className="mono-tag mb-4 text-center">By the numbers</p>
              <h2 id="numbers-heading" className="display-2 text-center">
                Engineering you can verify.
              </h2>
            </Reveal>

            <RevealGroup className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-3">
              {stats.map((s) => (
                <RevealItem key={s.label} className="card-snow card-hover p-7 text-center">
                  <div className="text-[48px] font-semibold leading-none text-ink tabular-nums tracking-[-0.04em]">
                    <AnimatedStat value={s.value} />
                  </div>
                  <p className="mt-3 caption text-ink-3 leading-[1.45]">{s.label}</p>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal>
              <p className="mt-8 text-center caption text-ink-3 max-w-[560px] mx-auto">
                Source-available under BSL 1.1. Version {VERSION} ships cross-platform: Windows
                installer plus macOS builds for Intel and Apple silicon.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Product */}
        <section className="bg-snow py-24" aria-labelledby="product-heading">
          <div className="container-cg max-w-5xl">
            <Reveal>
              <p className="mono-tag mb-3">The product</p>
              <h2 id="product-heading" className="display-2 mb-10">
                The dashboard you ship to auditors.
              </h2>
            </Reveal>
            <ProductMockup />
          </div>
        </section>

        {/* Principles */}
        <section className="bg-fog py-24" aria-labelledby="principles-heading">
          <div className="container-cg max-w-4xl">
            <Reveal>
              <p className="mono-tag mb-3">Principles</p>
              <h2 id="principles-heading" className="display-2">
                Three commitments we build against.
              </h2>
            </Reveal>
            <RevealGroup className="mt-12 grid md:grid-cols-3 gap-4">
              {principles.map((p) => (
                <RevealItem key={p.title} className="card-snow card-hover p-7 h-full">
                  <h3 className="text-[20px] font-semibold text-ink tracking-[-0.018em]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[15px] text-ink-2 leading-[1.7]">{p.body}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
