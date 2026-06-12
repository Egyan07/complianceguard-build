import { createFileRoute } from "@tanstack/react-router";
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
      title: "About — ComplianceGuard",
      description:
        "ComplianceGuard collects, scores, and signs compliance evidence on the endpoint where it originates. SOC 2, ISO 27001, and HIPAA — local-first, source-available.",
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
    body: "The collector is source-available under BSL 1.1. You can read every line of the code that reads your systems — and so can your auditor.",
  },
  {
    title: "Honest scope",
    body: "ComplianceGuard does endpoint evidence, scoring, and reporting — and does them rigorously. We don't claim integrations or services we don't ship.",
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
          subtitle="ComplianceGuard collects, scores, and signs endpoint evidence for SOC 2, ISO 27001, and HIPAA — locally, on the machines being audited."
          ornament="grid"
        />

        {/* Why we exist */}
        <section className="bg-snow pb-20" aria-labelledby="why-heading">
          <div className="container-cg max-w-[720px]">
            <Reveal>
              <h2 id="why-heading" className="display-3 mb-6">
                Why ComplianceGuard exists.
              </h2>
              <div className="text-[17px] text-ink-2 leading-[1.65] max-w-[680px] space-y-5">
                <p>
                  Compliance platforms moved to the cloud, but the evidence didn&apos;t. Disk
                  encryption status, firewall configuration, OS patch level, screen-lock policy —
                  the controls auditors actually check live on endpoints, where cloud integrations
                  can&apos;t see them.
                </p>
                <p>
                  Cloud-first platforms such as Vanta solve a different problem well: orchestrating
                  SaaS and infrastructure integrations at scale. But they ask teams to ship
                  sensitive evidence to a vendor cloud to get it, and they leave the endpoint layer
                  largely uncovered.
                </p>
                <p>
                  Our founder saw that gap and took the architectural position that defines this
                  product: evidence should be collected, scored, and cryptographically signed on the
                  machine where it originates. A desktop application that:
                </p>
                <ul className="list-none space-y-2 pl-0">
                  <li>— Collects endpoint evidence directly on Windows and macOS</li>
                  <li>— Scores SOC 2, ISO 27001, and HIPAA in a single pass</li>
                  <li>— Stores everything locally — no data leaves your network</li>
                  <li>— Exports a signed PDF evidence pack your auditor can verify</li>
                </ul>
                <p>
                  The result is readiness you can hand to an auditor without handing your
                  infrastructure to anyone else.
                </p>
              </div>
            </Reveal>
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
                Source-available under BSL 1.1. Version {VERSION} ships cross-platform — Windows
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
