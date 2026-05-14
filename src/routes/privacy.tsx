import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — ComplianceGuard" },
      {
        name: "description",
        content:
          "ComplianceGuard's privacy policy. The desktop application collects nothing on our servers. Your compliance data stays on your machine.",
      },
      { property: "og:title", content: "Privacy Policy — ComplianceGuard" },
      { property: "og:description", content: "Zero-knowledge by design. We don't collect your evidence." },
      { property: "og:url", content: "/privacy" },
      { property: "og:image", content: "/og-image.png" },
      { name: "twitter:image", content: "/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-[24px] font-bold text-navy">{title}</h2>
      <div className="mt-3 text-[16px] text-foreground leading-[1.8] space-y-4">{children}</div>
    </section>
  );
}

function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background py-16">
        <div className="container-cg max-w-[720px]">
          <h1 className="text-[40px] md:text-[48px] font-bold text-navy leading-[1.1]">Privacy Policy</h1>
          <span className="inline-block mt-4 px-3 py-1 rounded-[4px] border border-[#E2E8F0] text-[12px] text-[#9CA3AF]">
            Last updated: April 2026
          </span>

          <Section title="What We Collect">
            <p>
              ComplianceGuard the desktop application collects nothing on our servers. All evidence data, AWS
              credentials, and compliance reports are stored locally on your machine in a SQLite database. The
              ComplianceGuard website collects your email address if you voluntarily submit it via the waitlist form.
              We store this in a secured Supabase database. We do not sell, share, or rent your email to third parties.
            </p>
          </Section>

          <Section title="What We Don't Collect">
            <p>
              We do not collect: your compliance evidence, your AWS credentials, your endpoint scan results, your
              audit reports, telemetry or usage data from the desktop application, or any personally identifiable
              information beyond what you voluntarily provide.
            </p>
          </Section>

          <Section title="Cookies">
            <p>
              The ComplianceGuard website uses no tracking cookies. We use localStorage and sessionStorage for UI
              preferences only (dark mode, dismissed banners). No analytics scripts are loaded.
            </p>
          </Section>

          <Section title="Third-Party Services">
            <p>
              The website uses Supabase for email storage. Supabase's privacy policy is available at supabase.com/privacy.
              No other third-party data processors are used.
            </p>
          </Section>

          <Section title="Data Retention">
            <p>
              Email addresses submitted to the waitlist are retained until you request deletion. To request deletion,
              email alexisegyan1232@gmail.com with the subject "Delete my data."
            </p>
          </Section>

          <Section title="Your Rights">
            <p>
              You have the right to access, correct, or delete any personal data we hold about you. Contact
              alexisegyan1232@gmail.com for any data requests.
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
