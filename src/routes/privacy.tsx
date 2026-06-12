import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { buildMeta, CONTACT_EMAIL } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () =>
    buildMeta({
      title: "Privacy Policy — ComplianceGuard",
      description:
        "How ComplianceGuard handles data: evidence stays in a local database on your machine, the website stores only emails you choose to submit, and no analytics trackers run.",
      path: "/privacy",
    }),
  component: PrivacyPage,
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

function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-snow">
      <Navbar />
      <main id="main" className="flex-1">
        <PageHero
          eyebrow="Legal"
          title="Privacy policy."
          subtitle="Your compliance evidence stays on your machine. The only personal data we hold is an email address you choose to give us."
          ornament="none"
        />

        <div className="container-cg pb-24">
          <div className="mx-auto max-w-[680px]">
            <p className="mono-tag">Last updated · April 2026</p>

            <Section title="What we collect">
              <p>
                The ComplianceGuard desktop application stores all evidence data, AWS credentials,
                and compliance reports locally on your machine in a SQLite database. The desktop
                application sends none of this to our servers.
              </p>
              <p>
                The ComplianceGuard website collects your email address if you voluntarily submit it
                through the waitlist or contact form. We store it in a secured Supabase database. We
                do not sell, share, or rent your email address to third parties.
              </p>
            </Section>

            <Section title="What we don't collect">
              <p>
                We do not collect your compliance evidence, your AWS credentials, your endpoint scan
                results, your audit reports, telemetry or usage data from the desktop application,
                or any personally identifiable information beyond what you voluntarily provide.
              </p>
            </Section>

            <Section title="Cookies and local storage">
              <p>
                The ComplianceGuard website uses no tracking cookies and loads no analytics scripts.
                We use localStorage and sessionStorage for interface preferences only — for example,
                dismissed banners and saved checklist progress. This data never leaves your browser.
              </p>
            </Section>

            <Section title="Third-party services">
              <p>
                The website uses Supabase to store submitted email addresses. Supabase's privacy
                policy is available at{" "}
                <a
                  href="https://supabase.com/privacy"
                  className="text-link hover:underline"
                  rel="noreferrer"
                >
                  supabase.com/privacy
                </a>
                . No other third-party data processors are used.
              </p>
            </Section>

            <Section title="Data retention">
              <p>
                Email addresses submitted to the waitlist are retained until you request deletion.
                To request deletion, email{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-link hover:underline">
                  {CONTACT_EMAIL}
                </a>{" "}
                with the subject "Delete my data."
              </p>
            </Section>

            <Section title="Your rights">
              <p>
                You have the right to access, correct, or delete any personal data we hold about
                you. Contact{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-link hover:underline">
                  {CONTACT_EMAIL}
                </a>{" "}
                for any data request.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-link hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </Section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
