import { createFileRoute } from "@tanstack/react-router";
import { Lock, ShieldCheck, KeyRound, FileCode2, Bug, RefreshCw, Mail } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { buildMeta, salesMailto, CONTACT_EMAIL, GITHUB_URL } from "@/lib/site";

export const Route = createFileRoute("/security")({
  head: () =>
    buildMeta({
      title: "Security — ComplianceGuard",
      description:
        "ComplianceGuard's security architecture: zero-knowledge by design, HKDF-SHA256 credential encryption, offline Ed25519 license verification, SHA-256 hash-chained audit log, and BSL 1.1 open core.",
      path: "/security",
    }),
  component: SecurityPage,
});

const pillars = [
  {
    icon: ShieldCheck,
    title: "Zero-knowledge by architecture",
    body: "Evidence, AWS credentials, and reports live in a local SQLite database on your machine. Nothing ships to a ComplianceGuard server unless you turn on Cloud Sync.",
  },
  {
    icon: KeyRound,
    title: "HKDF-SHA256 credential encryption",
    body: "AWS keys are encrypted at rest with Fernet keys derived via domain-separated HKDF-SHA256. The legacy SHA-256 derivation is kept read-only for migrations.",
  },
  {
    icon: Lock,
    title: "Offline public-key license verification",
    body: "Pro licenses are signed with Ed25519. Only the public key ships in the binary. Validation is offline — no phone-home required.",
  },
  {
    icon: FileCode2,
    title: "SHA-256 hash-chained audit log",
    body: "The Enterprise tier writes a tamper-evident audit log. Every entry chains to the previous SHA-256 hash. /api/v1/enterprise/audit-log/verify walks the chain from genesis.",
  },
  {
    icon: RefreshCw,
    title: "Hardened transport & rate limits",
    body: "TLS 1.2+, HSTS, strict CSP, Permissions-Policy. Login 5/min, register 3/min, forgot-password 3/min — multi-worker safe via shared backend.",
  },
  {
    icon: Bug,
    title: "BSL 1.1 open core",
    body: "Read the code that reads your system. ~1,075 tests across backend, frontend, Electron, and Playwright run green on every commit.",
  },
];

function LockMark() {
  const badges = [
    { icon: Lock, label: "AES-256 at rest" },
    { icon: ShieldCheck, label: "Zero-knowledge" },
    { icon: KeyRound, label: "Ed25519 signed" },
  ];

  return (
    <div className="mx-auto relative max-w-[480px]" aria-hidden>
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-60"
        style={{ background: "radial-gradient(circle, var(--accent-glow), transparent 70%)" }}
      />
      <div className="relative flex flex-wrap items-center justify-center gap-3">
        {badges.map((b) => (
          <div
            key={b.label}
            className="flex items-center gap-2 rounded-full bg-white border border-line px-4 py-2 shadow-sm"
          >
            <span className="w-7 h-7 rounded-full bg-azure text-white flex items-center justify-center shrink-0">
              <b.icon size={14} strokeWidth={2} />
            </span>
            <span className="text-[13px] font-medium text-ink whitespace-nowrap">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SecurityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-snow">
      <Navbar />

      <main id="main">
        <PageHero
          eyebrow="Security"
          title="Security, by architecture."
          subtitle="Zero-knowledge by design. Your evidence stays on your machine — unless you explicitly choose otherwise."
          ornament="glow"
        >
          <LockMark />
        </PageHero>

        {/* Security properties */}
        <section className="bg-snow pb-24" aria-labelledby="properties-heading">
          <div className="container-cg">
            <h2 id="properties-heading" className="sr-only">
              Security properties
            </h2>
            <RevealGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pillars.map((p) => (
                <RevealItem key={p.title} className="card-snow card-hover p-7 h-full">
                  <article>
                    <div className="w-11 h-11 rounded-2xl bg-azure text-white flex items-center justify-center mb-5">
                      <p.icon size={20} strokeWidth={1.8} />
                    </div>
                    <h3 className="text-[19px] font-semibold text-ink tracking-[-0.015em] leading-[1.3]">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-[14.5px] text-ink-2 leading-[1.65]">{p.body}</p>
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* Disclosure & support */}
        <section className="bg-fog py-24" aria-labelledby="disclosure-heading">
          <div className="container-cg max-w-[760px]">
            <Reveal>
              <p className="mono-tag mb-4">Last updated April 2026</p>
              <h2 id="disclosure-heading" className="display-2">
                Disclosure &amp; support.
              </h2>
            </Reveal>
            <div className="mt-8 space-y-10">
              <Reveal>
                <Block title="Responsible disclosure">
                  <p>
                    If you discover a security vulnerability in ComplianceGuard, please disclose it
                    responsibly by emailing{" "}
                    <a
                      href={salesMailto("Security disclosure — ComplianceGuard")}
                      className="text-link hover:underline"
                    >
                      {CONTACT_EMAIL}
                    </a>{" "}
                    with the subject &quot;Security disclosure&quot;. We respond within 72 hours and
                    credit researchers who report valid vulnerabilities.
                  </p>
                </Block>
              </Reveal>
              <Reveal>
                <Block title="Supported versions">
                  <p>
                    Only the latest release of ComplianceGuard receives security updates. Always run
                    the latest version at{" "}
                    <a href={`${GITHUB_URL}/releases`} className="text-link hover:underline">
                      github.com/Egyan07/ComplianceGuard/releases
                    </a>
                    .
                  </p>
                </Block>
              </Reveal>
              <Reveal>
                <Block title="Contact">
                  <p className="inline-flex items-center gap-2">
                    <Mail size={16} className="text-azure" />
                    <a
                      href={salesMailto("Security disclosure — ComplianceGuard")}
                      className="text-link hover:underline"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </p>
                </Block>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[22px] font-semibold text-ink tracking-[-0.02em] leading-[1.2]">
        {title}
      </h3>
      <div className="mt-3 text-[17px] text-ink-2 leading-[1.65] max-w-[680px] space-y-3">
        {children}
      </div>
    </div>
  );
}
