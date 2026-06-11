import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Lock, ShieldCheck, KeyRound, FileCode2, Bug, RefreshCw, Mail } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security — ComplianceGuard" },
      {
        name: "description",
        content:
          "ComplianceGuard's security architecture: zero-knowledge by design, encrypted credentials, Ed25519 license signing, SHA-256 hash-chained audit log, and BSL 1.1 open core.",
      },
      { property: "og:title", content: "Security — ComplianceGuard" },
      { property: "og:description", content: "Zero-knowledge architecture. Your evidence never leaves your machine." },
      { property: "og:url", content: "/security" },
      { property: "og:image", content: "/og-image.png" },
      { name: "twitter:image", content: "/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "/security" }],
  }),
  component: SecurityPage,
});

const pillars = [
  {
    icon: ShieldCheck,
    title: "Zero-knowledge by architecture",
    body:
      "Evidence, AWS credentials, and reports live in a local SQLite database on your machine. Nothing ships to a ComplianceGuard server unless you turn on Cloud Sync.",
  },
  {
    icon: KeyRound,
    title: "HKDF-SHA256 credential encryption",
    body:
      "AWS keys are encrypted at rest with Fernet keys derived via domain-separated HKDF-SHA256. The legacy SHA-256 derivation is kept read-only for migrations.",
  },
  {
    icon: Lock,
    title: "Ed25519 license verification",
    body:
      "Pro licenses are signed with Ed25519. Only the public key ships in the binary. Validation is offline — no phone-home required.",
  },
  {
    icon: FileCode2,
    title: "SHA-256 hash-chained audit log",
    body:
      "The Enterprise tier writes a tamper-evident audit log. Every entry chains to the previous SHA-256 hash. /api/v1/enterprise/audit-log/verify walks the chain from genesis.",
  },
  {
    icon: RefreshCw,
    title: "Hardened transport & rate limits",
    body:
      "TLS 1.2+, HSTS, strict CSP, Permissions-Policy. Login 5/min, register 3/min, forgot-password 3/min — multi-worker safe via shared backend.",
  },
  {
    icon: Bug,
    title: "BSL 1.1 open core",
    body:
      "Read the code that reads your system. ~568 tests across backend, frontend, Electron, and Playwright run green on every commit.",
  },
];

function Lockicon() {
  const reduced = usePrefersReducedMotion();
  return (
    <div className="mx-auto mb-10 relative w-[140px] h-[140px]" aria-hidden>
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,113,227,0.25), transparent 70%)",
          filter: "blur(8px)",
        }}
        animate={reduced ? undefined : { scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        initial={reduced ? false : { rotateY: -30, opacity: 0 }}
        animate={reduced ? undefined : { rotateY: 0, opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: "preserve-3d", perspective: 1000 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div
          className="w-[96px] h-[96px] rounded-[28px] flex items-center justify-center text-white"
          style={{
            background: "linear-gradient(135deg, #0a84ff 0%, #0040dd 100%)",
            boxShadow: "0 30px 60px -20px rgba(0,64,221,0.55), inset 0 1px 0 rgba(255,255,255,0.25)",
          }}
        >
          <Lock size={42} strokeWidth={1.8} />
        </div>
      </motion.div>
    </div>
  );
}

function SecurityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-snow">
      <Navbar />

      <PageHero
        eyebrow="Trust · Last updated April 2026"
        title={
          <>
            Security, by{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(120deg,#0071e3,#5e9cff 60%,#ff5980)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              architecture.
            </span>
          </>
        }
        subtitle="Zero-knowledge by design. Your evidence stays on your machine — unless you explicitly choose otherwise."
        ornament="rings"
      >
        <Lockicon />
      </PageHero>

      {/* Pillars */}
      <section className="bg-snow pb-24">
        <div className="container-cg grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillars.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
              whileHover={{ y: -3 }}
              className="rounded-[28px] p-7 h-full"
              style={{ background: "var(--fog)" }}
            >
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-white mb-5"
                style={{ background: "linear-gradient(135deg,#0a84ff,#0040dd)" }}
              >
                <p.icon size={20} strokeWidth={1.8} />
              </div>
              <h3
                className="font-semibold text-ink"
                style={{ fontSize: 19, letterSpacing: "-0.015em", lineHeight: 1.3 }}
              >
                {p.title}
              </h3>
              <p className="mt-2 text-[14.5px] text-text-secondary leading-[1.65]">{p.body}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Long-form sections */}
      <section className="bg-fog py-24">
        <div className="container-cg max-w-[760px]">
          <h2
            className="font-semibold text-ink"
            style={{ fontSize: "clamp(28px,3.6vw,44px)", letterSpacing: "-0.025em", lineHeight: 1.1 }}
          >
            Disclosure &amp; support.
          </h2>
          <div className="mt-8 space-y-10">
            <Block title="Responsible disclosure">
              <p>
                If you discover a security vulnerability in ComplianceGuard, please disclose it
                responsibly by emailing{" "}
                <a href="mailto:alexisegyan1232@gmail.com" className="text-cobalt-link hover:underline">
                  alexisegyan1232@gmail.com
                </a>{" "}
                with the subject &quot;Security Disclosure&quot;. We respond within 72 hours and
                credit researchers who report valid vulnerabilities.
              </p>
            </Block>
            <Block title="Supported versions">
              <p>
                Only the latest release of ComplianceGuard receives security updates. Always run the
                latest version at{" "}
                <a
                  href="https://github.com/Egyan07/ComplianceGuard/releases"
                  className="text-cobalt-link hover:underline"
                >
                  github.com/Egyan07/ComplianceGuard/releases
                </a>
                .
              </p>
            </Block>
            <Block title="Contact">
              <p className="inline-flex items-center gap-2">
                <Mail size={16} className="text-azure" />
                <a href="mailto:alexisegyan1232@gmail.com" className="text-cobalt-link hover:underline">
                  alexisegyan1232@gmail.com
                </a>
              </p>
            </Block>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3
        className="font-semibold text-ink"
        style={{ fontSize: 22, letterSpacing: "-0.02em", lineHeight: 1.2 }}
      >
        {title}
      </h3>
      <div className="mt-3 text-[16px] text-ink/80 leading-[1.75] space-y-3">{children}</div>
    </div>
  );
}
