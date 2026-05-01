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
    ],
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
      <main className="flex-1 bg-background py-16">
        <div className="container-cg max-w-[720px]">
          <h1 className="text-[40px] md:text-[48px] font-bold text-navy leading-[1.1]">Security</h1>
          <span className="inline-block mt-4 px-3 py-1 rounded-[4px] border border-[#E2E8F0] text-[12px] text-[#9CA3AF]">
            Last updated: April 2026
          </span>

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
