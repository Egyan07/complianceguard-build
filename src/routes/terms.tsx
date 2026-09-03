import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { buildMeta, CONTACT_EMAIL, DOWNLOAD_URL } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () =>
    buildMeta({
      title: "Terms of Service | ComplianceGuard",
      description:
        "The terms that govern using ComplianceGuard: the BSL 1.1 software license, license keys and paid tiers, acceptable use, and our no-warranty, no-liability stance.",
      path: "/terms",
    }),
  component: TermsPage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section className="mt-14">
        <h2 className="text-[24px] font-semibold text-ink">{title}</h2>
        <div className="mt-4 space-y-4 text-[17px] text-ink-2 leading-[1.65]">{children}</div>
      </section>
    </Reveal>
  );
}

function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-snow">
      <Navbar />
      <main id="main" className="flex-1">
        <PageHero
          eyebrow="Legal"
          title="Terms of service."
          subtitle="The short version: the software is source-available under BSL 1.1, your evidence is yours, and we provide the tool as-is."
          ornament="none"
        />

        <div className="container-cg pb-24">
          <div className="mx-auto max-w-[680px]">
            <p className="mono-tag">Last updated · September 2026</p>

            <Section title="What these terms cover">
              <p>
                These terms govern your use of the ComplianceGuard website, the desktop
                application for Windows and macOS, and any related services we offer. By
                downloading, installing, or using ComplianceGuard, you agree to these terms. If
                you are accepting them for a company or other organisation, you confirm that you
                have authority to bind that organisation.
              </p>
            </Section>

            <Section title="The software license">
              <p>
                The ComplianceGuard source code is released under the{" "}
                <a
                  href="https://github.com/Egyan07/ComplianceGuard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link hover:underline"
                >
                  Business Source License 1.1
                </a>
                . The licence grants you the right to use, copy, and modify the software for
                non-production purposes, and to use it in production under the terms of your
                purchased licence key. The full licence text ships with the source code and on
                our GitHub repository.
              </p>
              <p>
                You may read, audit, and modify the code that runs on your machine. You may not
                redistribute the software or your licence key, sublicense it, or offer it as a
                hosted service to third parties without a separate agreement with us.
              </p>
            </Section>

            <Section title="Licence keys and paid tiers">
              <p>
                ComplianceGuard is free for a single machine with a core set of SOC 2 controls.
                Pro and Enterprise features require a paid licence key, purchased through us or
                an authorised reseller. Licence keys are verified offline using Ed25519
                signatures, so activation never requires sending data to our servers.
              </p>
              <p>
                Keys are issued for your use only and are tied to the email address on the
                order. If you believe a key has been compromised, contact us and we will revoke
                and reissue it.
              </p>
            </Section>

            <Section title="Your data stays yours">
              <p>
                Evidence collection, scoring, and reporting happen on your machine. Your
                compliance data, credentials, and reports are stored locally and are never
                uploaded unless you explicitly enable the optional multi-machine cloud sync. See
                our <Link to="/privacy" className="text-link hover:underline">privacy policy</Link>{" "}
                for the full detail.
              </p>
            </Section>

            <Section title="Acceptable use">
              <p>
                You agree not to misuse the software or website: you will not attempt to defeat
                licence enforcement, interfere with the operation of our services, or use
                ComplianceGuard to violate any law or regulation. The evidence ComplianceGuard
                collects is intended to support compliance efforts; it does not by itself make
                you compliant with SOC 2, ISO 27001, HIPAA, GDPR, or any other framework, and a
                formal attestation still requires a licensed auditor.
              </p>
            </Section>

            <Section title="No warranty">
              <p>
                ComplianceGuard is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;,
                without warranty of any kind, express or implied, including warranties of
                merchantability, fitness for a particular purpose, and non-infringement. We do
                not warrant that the software will be error-free, that collected evidence will
                satisfy any particular auditor, or that results will be uninterrupted.
              </p>
            </Section>

            <Section title="Limitation of liability">
              <p>
                To the maximum extent permitted by law, ComplianceGuard shall not be liable for
                any indirect, incidental, special, consequential, or punitive damages, or for
                any loss of profits, data, or goodwill, arising out of or relating to your use
                of the software or website. Our total liability for any claim shall not exceed
                the amount you paid us for the software in the twelve months preceding the
                claim.
              </p>
            </Section>

            <Section title="Changes to these terms">
              <p>
                We may update these terms from time to time. Material changes will be noted on
                this page with an updated &ldquo;Last updated&rdquo; date and, where practical,
                flagged in our release notes. Continued use of ComplianceGuard after changes
                take effect means you accept the revised terms.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                Questions about these terms, the software licence, or your licence key? Email{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-link hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>{" "}
                and a human will reply. You can also download the current release from{" "}
                <a
                  href={DOWNLOAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link hover:underline"
                >
                  GitHub
                </a>
                .
              </p>
            </Section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}