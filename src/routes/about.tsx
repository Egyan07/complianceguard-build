import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FadeUp } from "@/components/FadeUp";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — ComplianceGuard" },
      {
        name: "description",
        content: "Built by a founder who got quoted $11,000 for Vanta. ComplianceGuard makes SOC 2 prep accessible for real teams.",
      },
      { property: "og:title", content: "Built by a founder who got quoted $11,000 for Vanta" },
      { property: "og:description", content: "ComplianceGuard is self-funded and priced for real teams." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-background pt-20 pb-12">
        <div className="container-cg max-w-3xl">
          <FadeUp>
            <h1 className="text-[36px] md:text-[48px] font-bold text-navy leading-[1.1]">
              Built by a founder who got<br />quoted $11,000 for Vanta.
            </h1>
          </FadeUp>
        </div>
      </section>

      <section className="bg-background pb-16">
        <div className="container-cg max-w-[720px]">
          <FadeUp>
            <div className="text-[17px] text-foreground leading-[1.8] space-y-5">
              <p>
                In 2024, I was closing my first enterprise deal. The prospect's legal team asked for
                our SOC 2 Type II report. I'd been expecting this, so I'd already gotten quotes from
                the compliance tools everyone recommends.
              </p>
              <p>
                Vanta: $11,200/year. Drata: $10,800/year. Secureframe: "Let's get on a call."
              </p>
              <p>
                We were a 3-person team doing $8K MRR. There was no version of reality where we
                paid $11,000 for a compliance tool before we'd even closed the deal that required one.
              </p>
              <p>
                So I spent the next four months building ComplianceGuard. A desktop app that:
              </p>
              <ul className="list-none space-y-2 pl-0">
                <li>— Collects evidence directly from your machine and AWS account</li>
                <li>— Stores everything locally — no data leaves your network</li>
                <li>— Exports a PDF your auditor can actually use</li>
                <li>— Costs $49/month flat</li>
              </ul>
              <p>
                I'm not trying to compete with Vanta on integrations or auditor marketplaces.
                I'm trying to make SOC 2 prep accessible to the thousands of founders who get
                quoted $10K before their first enterprise dollar clears.
              </p>
              <p>
                ComplianceGuard is self-funded, built in public, and priced for real teams.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-cg max-w-3xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { n: "v3.1.0", l: "Current release" },
              { n: "29", l: "SOC 2 controls covered" },
              { n: "$149/yr", l: "Pro plan, billed annually" },
            ].map((f) => (
              <div key={f.l}>
                <div className="text-[40px] font-bold text-teal leading-none">{f.n}</div>
                <p className="mt-3 text-[14px] text-text-secondary">{f.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="container-cg max-w-[720px]">
          <FadeUp>
            <h2 className="text-[28px] md:text-[32px] font-bold text-navy">What we believe</h2>
          </FadeUp>
          <div className="mt-8 space-y-6 text-[17px] text-text-secondary leading-[1.8]">
            <p>
              <span className="font-bold text-navy">Your data is yours. </span>
              We don't want your evidence. We don't want your AWS credentials in our database. We don't want your compliance data as a product.
            </p>
            <p>
              <span className="font-bold text-navy">Privacy tools shouldn't have privacy problems. </span>
              A compliance tool that requires you to send sensitive infrastructure data to a third-party cloud is a contradiction. We chose the harder path.
            </p>
            <p>
              <span className="font-bold text-navy">Small teams deserve professional tools. </span>
              The market has a $10,000 floor. Below that, there's almost nothing. That gap is intentional — we're building in it.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
