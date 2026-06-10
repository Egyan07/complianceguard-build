import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security — ComplianceGuard" },
      {
        name: "description",
        content:
          "ComplianceGuard's security architecture: zero-knowledge, encrypted credentials, Ed25519 license signing, and BSL 1.1 open-core source.",
      },
      { property: "og:title", content: "Security — ComplianceGuard" },
      { property: "og:description", content: "Zero-knowledge architecture. Your data never leaves your machine." },
      { property: "og:url", content: "/security" },
      { property: "og:image", content: "/og-image.png" },
      { name: "twitter:image", content: "/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "/security" }],
  }),
  component: SecurityPage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-[24px] font-bold text-navy">{title}</h2>
      <div className="mt-3 text-[16px] text-foreground leading-[1.8] space-y-4">{children}</div>
    </section>
  );
}

function SecurityPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-snow pt-32 pb-20">
        <div className="container-cg max-w-[760px]">
          <p className="text-[13px] font-mono uppercase tracking-[0.12em] text-text-dim mb-6">
            Trust &middot; Last updated April 2026
          </p>
          <h1
            className="font-semibold text-ink"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(44px, 7vw, 80px)",
              lineHeight: 1.04,
              letterSpacing: "-0.035em",
            }}
          >
            Security.
          </h1>
          <p className="mt-6 text-[20px] md:text-[22px] font-light text-ink/80 leading-[1.5]" style={{ letterSpacing: "-0.01em" }}>
            Zero-knowledge by architecture. Your evidence stays on your machine.
          </p>

          <Section title="Architecture">
            <p>
              ComplianceGuard is designed with a zero-knowledge architecture. Your compliance evidence, AWS
              credentials, and audit reports never leave your machine unless you explicitly choose to sync them. The
              desktop application stores all data in a local SQLite database encrypted at the application layer.
            </p>
          </Section>

          <Section title="AWS Credential Handling">
            <p>
              AWS credentials are encrypted at rest using HKDF-SHA256 derived Fernet keys before being stored locally.
              They are never transmitted to ComplianceGuard servers.
            </p>
          </Section>

          <Section title="License Verification">
            <p>
              Pro license verification uses Ed25519 public-key cryptography. Only the public key ships with the binary.
              License validation is performed locally — no network call is required to verify a valid license.
            </p>
          </Section>

          <Section title="Open Core">
            <p>
              ComplianceGuard is BSL 1.1 open-core. The full source code is readable at{" "}
              <a href="https://github.com/Egyan07/ComplianceGuard" className="text-teal hover:underline">
                github.com/Egyan07/ComplianceGuard
              </a>
              . You can audit exactly what the application reads from your machine.
            </p>
          </Section>

          <Section title="Responsible Disclosure">
            <p>
              If you discover a security vulnerability in ComplianceGuard, please disclose it responsibly by emailing
              alexisegyan1232@gmail.com with the subject "Security Disclosure." We will respond within 72 hours. We do
              not currently offer a bug bounty programme but will credit researchers who report valid vulnerabilities.
            </p>
          </Section>

          <Section title="Supported Versions">
            <p>
              Only the latest release of ComplianceGuard receives security updates. We recommend always running the
              latest version available at{" "}
              <a href="https://github.com/Egyan07/ComplianceGuard/releases" className="text-teal hover:underline">
                github.com/Egyan07/ComplianceGuard/releases
              </a>
              .
            </p>
          </Section>

          <Section title="Contact">
            <p>
              <a href="mailto:alexisegyan1232@gmail.com" className="text-teal hover:underline">
                alexisegyan1232@gmail.com
              </a>
            </p>
          </Section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
