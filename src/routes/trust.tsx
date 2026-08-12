import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FileCode2,
  GitBranch,
  HeartHandshake,
  KeyRound,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { ChainDemo } from "@/components/ChainDemo";
import {
  buildMeta,
  CONTACT_EMAIL,
  DOWNLOAD_URL,
  GITHUB_URL,
  VERSION,
  salesMailto,
} from "@/lib/site";

export const Route = createFileRoute("/trust")({
  head: () =>
    buildMeta({
      title: "Trust — ComplianceGuard",
      description:
        "ComplianceGuard's trust center: source-available under BSL 1.1, zero-knowledge by design, tamper-evident SHA-256 hash-chained audit logs you can verify yourself, honest flat pricing, and 54-control SOC 2 coverage.",
      path: "/trust",
    }),
  component: TrustPage,
});

const neverSee = [
  {
    icon: Lock,
    title: "Your evidence",
    body: "Password policies, firewall rules, event logs — collected and stored in a local database on your machine. Zero bytes are uploaded unless you explicitly turn on Cloud Sync.",
  },
  {
    icon: KeyRound,
    title: "Your credentials",
    body: "AWS keys are encrypted at rest with Fernet keys derived via domain-separated HKDF-SHA256, and read only during evidence collection. We never see them.",
  },
  {
    icon: FileCode2,
    title: "Your reports",
    body: "PDF readiness reports are generated locally and rendered on your machine. Nothing to intercept, because nothing is transmitted.",
  },
];

const openCore = [
  {
    icon: FileCode2,
    title: "Source available — BSL 1.1",
    body: "Every evidence collector, scoring rule, and report template is public on GitHub. Read the code that reads your system.",
  },
  {
    icon: ShieldCheck,
    title: "Tested on every commit",
    body: "Roughly 568 tests across backend, frontend, Electron, and Playwright run green in CI before anything ships.",
  },
  {
    icon: GitBranch,
    title: "Built from the tagged source",
    body: "Every installer is compiled by CI from a tagged release. What's on GitHub is what runs on your machine.",
  },
];

const frameworks = [
  {
    name: "SOC 2 Type II",
    stat: "54",
    unit: "controls",
    meta: "CC 19 · A 9 · C 9 · PI 9 · CA 8",
    note: "Each control mapped to the AICPA Trust Services Criteria with configurable weights and per-control scoring.",
  },
  {
    name: "ISO 27001:2013",
    stat: "47",
    unit: "controls",
    meta: "Annex A",
    note: "The same OS-level evidence pass scores the Information Security Management System controls.",
  },
  {
    name: "HIPAA Security Rule",
    stat: "47",
    unit: "safeguards",
    meta: "Admin · Physical · Technical",
    note: "Administrative, physical, and technical safeguards mapped to the HIPAA Security Rule.",
  },
];

function TrustPage() {
  return (
    <div className="min-h-screen flex flex-col bg-snow">
      <Navbar />

      <main id="main">
        <PageHero
          eyebrow="Trust center"
          title={
            <>
              Don&rsquo;t believe us.
              <br />
              Verify us.
            </>
          }
          subtitle="We're a small, independent tool asking to sit inside your network. So here's everything you'd want to check before saying yes — the source, the data flow, the tamper-evidence, and the pricing."
          ornament="glow"
        />

        {/* ═══ The tamper-evident audit log demo ═══ */}
        <section className="bg-fog py-24 md:py-28">
          <div className="container-cg max-w-4xl">
            <Reveal>
              <p className="mono-tag mb-4" style={{ color: "var(--azure)" }}>
                Enterprise · tamper-evident audit log
              </p>
              <h2 className="display-2">
                Break the chain.
                <br />
                Watch it get caught.
              </h2>
              <p className="mt-5 body-lg text-ink-2 max-w-2xl">
                Every Enterprise deployment appends to a hash-chained audit log. Each entry is keyed
                with HMAC-SHA256 over all seven fields and linked to the entry before it — so a
                single edit anywhere breaks the chain, and the verify endpoint will say so. Try it
                below: append events, then edit one.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="mt-10">
              <div className="finish-slate on-dark relative overflow-hidden rounded-[28px] p-6 md:p-10">
                {/* ambient aurora blobs */}
                <div
                  aria-hidden
                  className="cg-aurora-blob cg-aurora-a w-[420px] h-[420px] -top-40 -right-32 opacity-30"
                  style={{
                    background: "radial-gradient(circle, rgba(0,113,227,0.55), transparent 70%)",
                  }}
                />
                <div
                  aria-hidden
                  className="cg-aurora-blob cg-aurora-b w-[340px] h-[340px] -bottom-44 -left-28 opacity-25"
                  style={{
                    background: "radial-gradient(circle, rgba(108,180,255,0.5), transparent 70%)",
                  }}
                />
                <div className="relative">
                  <ChainDemo />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══ What we never see ═══ */}
        <section className="bg-snow py-24" aria-labelledby="never-see-heading">
          <div className="container-cg">
            <Reveal>
              <p className="mono-tag mb-4" style={{ color: "var(--azure)" }}>
                Data sovereignty
              </p>
              <h2 id="never-see-heading" className="display-2">
                Nothing we can leak.
              </h2>
              <p className="mt-5 body-lg text-ink-2 max-w-2xl">
                There is no ComplianceGuard database full of customer evidence, because there is
                nothing to put in it.
              </p>
            </Reveal>

            <RevealGroup className="mt-12 grid md:grid-cols-3 gap-5">
              {neverSee.map((c) => (
                <RevealItem key={c.title}>
                  <article className="card-snow card-hover p-7 h-full">
                    <div className="w-11 h-11 rounded-2xl bg-azure text-white flex items-center justify-center mb-5">
                      <c.icon size={20} strokeWidth={1.8} />
                    </div>
                    <h3 className="text-[19px] font-semibold text-ink tracking-[-0.015em] leading-[1.3]">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-[14.5px] text-ink-2 leading-[1.65]">{c.body}</p>
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.1} className="mt-10">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-fog px-6 py-5">
                <p className="text-[15px] text-ink-2">
                  Deep dive: transport, encryption keys, rate limits, and the air-gapped deployment
                  bundle.
                </p>
                <Link to="/security" className="btn-ghost shrink-0">
                  Read the security architecture →
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══ Open core ═══ */}
        <section className="bg-fog py-24" aria-labelledby="open-core-heading">
          <div className="container-cg">
            <Reveal>
              <p className="mono-tag mb-4" style={{ color: "var(--azure)" }}>
                Open core
              </p>
              <h2 id="open-core-heading" className="display-2">
                Read the code that reads your system.
              </h2>
            </Reveal>

            <RevealGroup className="mt-12 grid md:grid-cols-3 gap-5">
              {openCore.map((c) => (
                <RevealItem key={c.title}>
                  <article className="card-snow card-hover p-7 h-full">
                    <div className="w-11 h-11 rounded-2xl bg-azure text-white flex items-center justify-center mb-5">
                      <c.icon size={20} strokeWidth={1.8} />
                    </div>
                    <h3 className="text-[19px] font-semibold text-ink tracking-[-0.015em] leading-[1.3]">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-[14.5px] text-ink-2 leading-[1.65]">{c.body}</p>
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.1} className="mt-10">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-snow border border-hairline px-6 py-5">
                <p className="text-[15px] text-ink-2">
                  Current release{" "}
                  <span className="font-mono text-[13.5px] font-medium text-ink">v{VERSION}</span> —
                  every release ships Windows and macOS installers built from source.
                </p>
                <div className="flex flex-wrap gap-2 shrink-0">
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                  >
                    Browse the source
                  </a>
                  <Link to="/changelog" className="btn-ghost">
                    Release notes
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══ Framework coverage ═══ */}
        <section className="bg-snow py-24" aria-labelledby="frameworks-heading">
          <div className="container-cg">
            <Reveal>
              <p className="mono-tag mb-4" style={{ color: "var(--azure)" }}>
                Coverage, precisely stated
              </p>
              <h2 id="frameworks-heading" className="display-2">
                The exact numbers. Not marketing.
              </h2>
            </Reveal>

            <RevealGroup className="mt-12 grid md:grid-cols-3 gap-5">
              {frameworks.map((f) => (
                <RevealItem key={f.name}>
                  <article className="card-fog card-hover p-7 h-full flex flex-col">
                    <p className="mono-tag">{f.name}</p>
                    <p className="mt-4 flex items-baseline gap-2">
                      <span
                        className="text-[40px] font-semibold text-ink leading-none"
                        style={{ fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}
                      >
                        {f.stat}
                      </span>
                      <span className="text-[15px] text-ink-2">{f.unit}</span>
                    </p>
                    <p className="mt-1 font-mono text-[12px] text-ink-3">{f.meta}</p>
                    <p className="mt-4 text-[14.5px] text-ink-2 leading-[1.65]">{f.note}</p>
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* ═══ How we make money ═══ */}
        <section className="bg-fog py-24" aria-labelledby="honesty-heading">
          <div className="container-cg max-w-[760px]">
            <Reveal>
              <p className="mono-tag mb-4" style={{ color: "var(--azure)" }}>
                Honest by default
              </p>
              <h2 id="honesty-heading" className="display-2">
                How we make money: we sell the app.
              </h2>
            </Reveal>
            <div className="mt-8 space-y-6">
              <Reveal>
                <div className="card-snow p-7">
                  <ul className="space-y-4 text-[15.5px] text-ink-2 leading-[1.7]">
                    <li className="flex gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-azure shrink-0" />
                      <span>
                        <strong className="text-ink font-semibold">
                          Flat pricing, no per-seat math.
                        </strong>{" "}
                        One rate per deployment — Pro $149/mo and Enterprise $599/mo (billed
                        annually, self-hosted), or managed hosting. No surprises at renewal.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-azure shrink-0" />
                      <span>
                        <strong className="text-ink font-semibold">
                          The free tier is a real product.
                        </strong>{" "}
                        Full evidence collection, 12 core controls, and an overall score on one
                        machine. It exists so you can judge the output before paying anything.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-azure shrink-0" />
                      <span>
                        <strong className="text-ink font-semibold">No data monetization.</strong>{" "}
                        There is no data to monetize — we don&rsquo;t see your evidence, and we
                        never will.
                      </span>
                    </li>
                  </ul>
                  <div className="mt-6 pt-5 border-t border-hairline flex flex-wrap items-center gap-3">
                    <Link to="/pricing" className="btn-ghost">
                      See full pricing →
                    </Link>
                    <span className="text-[13px] text-ink-3">
                      Every price is published. Nothing is behind &ldquo;talk to sales.&rdquo;
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══ People, not a ticket queue ═══ */}
        <section className="bg-snow py-24" aria-labelledby="people-heading">
          <div className="container-cg max-w-[760px]">
            <Reveal>
              <p className="mono-tag mb-4" style={{ color: "var(--azure)" }}>
                Direct line
              </p>
              <h2 id="people-heading" className="display-2">
                A human, in under a day.
              </h2>
              <p className="mt-4 body-lg text-ink-2">
                You&rsquo;re evaluating a tool that touches your audit trail — you deserve a direct
                line, not a ticket queue.
              </p>
            </Reveal>
            <div className="mt-8 space-y-5">
              <Reveal>
                <a
                  href={salesMailto("Question before evaluating — ComplianceGuard")}
                  className="card-snow card-hover flex items-center gap-4 p-6"
                >
                  <span className="w-11 h-11 rounded-2xl bg-azure text-white flex items-center justify-center shrink-0">
                    <Mail size={20} strokeWidth={1.8} />
                  </span>
                  <span>
                    <span className="block text-[17px] font-semibold text-ink">
                      Ask us anything, first
                    </span>
                    <span className="block mt-0.5 text-[14px] text-ink-2">
                      {CONTACT_EMAIL} — answers from a person who wrote the code
                    </span>
                  </span>
                </a>
              </Reveal>
              <Reveal>
                <div className="card-snow p-6">
                  <div className="flex items-center gap-4">
                    <span className="w-11 h-11 rounded-2xl bg-fog text-ink flex items-center justify-center shrink-0">
                      <HeartHandshake size={20} strokeWidth={1.8} />
                    </span>
                    <div>
                      <p className="text-[17px] font-semibold text-ink">Responsible disclosure</p>
                      <p className="mt-0.5 text-[14px] text-ink-2">
                        Found a flaw? We respond within 72 hours and credit valid reports.{" "}
                        <Link to="/security" className="text-link hover:underline">
                          See the policy →
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══ Closing CTA ═══ */}
        <section className="bg-fog py-24">
          <Reveal>
            <div className="container-cg max-w-2xl text-center">
              <h2 className="display-2">Verify it yourself.</h2>
              <p className="mt-3 text-ink-2">
                Download, run a readiness scan, and judge the output with your own eyes — before you
                pay a cent.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                <a href={DOWNLOAD_URL} className="btn-primary btn-sheen">
                  Download Free
                </a>
                <a href={salesMailto("ComplianceGuard — pre-sales question")} className="btn-dark">
                  Talk to a human
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
