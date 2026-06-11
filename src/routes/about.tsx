import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { FadeUp } from "@/components/FadeUp";
import { AnimatedStat } from "@/components/AnimatedStat";
import { ProductMockup } from "@/components/ProductMockup";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — ComplianceGuard" },
      {
        name: "description",
        content:
          "ComplianceGuard was built by a founder who got quoted $11,000 for Vanta. Endpoint compliance for SOC 2, ISO 27001, and HIPAA — priced for real teams.",
      },
      { property: "og:title", content: "Built by a founder who got quoted $11,000 for Vanta" },
      { property: "og:description", content: "ComplianceGuard is self-funded and priced for real teams." },
      { property: "og:url", content: "/about" },
      { property: "og:image", content: "/og-image.png" },
      { name: "twitter:image", content: "/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const beliefs = [
  {
    title: "Your data is yours.",
    body: "We don't want your evidence. We don't want your AWS credentials in our database. We don't want your compliance data as a product.",
  },
  {
    title: "Privacy tools shouldn't have privacy problems.",
    body: "A compliance tool that requires you to send sensitive infrastructure data to a third-party cloud is a contradiction. We chose the harder path.",
  },
  {
    title: "Small teams deserve professional tools.",
    body: "The market has a $10,000 floor. Below that, there's almost nothing. That gap is intentional — we're building in it.",
  },
  {
    title: "Your data. Your infrastructure.",
    body: "Self-host ComplianceGuard anywhere — Docker, Railway, Render, or DigitalOcean. One command, your evidence, your control plane.",
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-snow">
      <Navbar />

      <PageHero
        eyebrow="Our story"
        title={
          <>
            Built by a founder who got
            <br />
            <span
              style={{
                backgroundImage: "linear-gradient(120deg,#0071e3,#5e9cff 60%,#ff5980)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              quoted $11,000 for Vanta.
            </span>
          </>
        }
        subtitle="Endpoint compliance for SOC 2, ISO 27001 and HIPAA. Self-funded, built in public, priced for real teams."
        ornament="rings"
      />

      {/* Story */}
      <section className="bg-snow pb-20">
        <div className="container-cg max-w-[720px]">
          <FadeUp>
            <div className="text-[17px] text-ink/85 leading-[1.85] space-y-5">
              <p>
                In 2024, I was closing my first enterprise deal. The prospect&apos;s legal team asked
                for our SOC 2 Type II report. I&apos;d been expecting this, so I&apos;d already gotten
                quotes from the compliance tools everyone recommends.
              </p>
              <p className="text-[20px] font-medium text-ink leading-[1.5]">
                Vanta: $11,200/year. Drata: $10,800/year. Secureframe: &quot;Let&apos;s get on a call.&quot;
              </p>
              <p>
                We were a 3-person team doing $8K MRR. There was no version of reality where we paid
                $11,000 for a compliance tool before we&apos;d even closed the deal that required one.
              </p>
              <p>So I spent the next four months building ComplianceGuard. A desktop app that:</p>
              <ul className="list-none space-y-2 pl-0 text-ink/80">
                <li>— Collects endpoint evidence directly on Windows and macOS</li>
                <li>— Scores SOC 2, ISO 27001, and HIPAA in a single pass</li>
                <li>— Stores everything locally — no data leaves your network</li>
                <li>— Exports a PDF your auditor can actually use</li>
                <li>— Costs $49/month flat</li>
              </ul>
              <p>
                I&apos;m not trying to compete with Vanta on integrations or auditor marketplaces.
                I&apos;m trying to make readiness accessible to the thousands of founders who get
                quoted $10K before their first enterprise dollar clears.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Stats — Apple editorial */}
      <section className="bg-fog py-24">
        <div className="container-cg max-w-4xl">
          <p className="mono-tag mb-4 text-center">By the numbers</p>
          <h2
            className="text-center font-semibold text-ink"
            style={{
              fontSize: "clamp(32px,4.4vw,56px)",
              letterSpacing: "-0.028em",
              lineHeight: 1.08,
            }}
          >
            Small team. <span className="text-text-secondary">Serious engineering.</span>
          </h2>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { value: 568, suffix: "+", l: "Tests passing across the stack" },
              { value: 123, l: "Controls (SOC 2 · ISO 27001 · HIPAA)" },
              { value: 8, l: "Evidence categories per machine" },
              { value: 2, l: "OSes supported (Win + macOS)" },
              { value: 5, l: "Green CI workflows on every commit" },
              { value: 0, l: "Bytes uploaded to a vendor cloud" },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                className="rounded-[24px] bg-white p-7 text-center"
              >
                <div
                  className="text-[48px] font-semibold leading-none text-ink tabular-nums"
                  style={{ letterSpacing: "-0.04em" }}
                >
                  <AnimatedStat value={f.value} suffix={f.suffix ?? ""} />
                </div>
                <p className="mt-3 text-[13px] text-text-secondary leading-[1.45]">{f.l}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product */}
      <section className="bg-snow py-24">
        <div className="container-cg max-w-5xl">
          <FadeUp>
            <p className="mono-tag mb-3">The product</p>
            <h2
              className="font-semibold text-ink mb-10"
              style={{ fontSize: "clamp(28px,3.6vw,44px)", letterSpacing: "-0.025em" }}
            >
              The dashboard you ship to auditors.
            </h2>
          </FadeUp>
          <ProductMockup />
        </div>
      </section>

      {/* Beliefs */}
      <section className="bg-fog py-24">
        <div className="container-cg max-w-4xl">
          <FadeUp>
            <p className="mono-tag mb-3">What we believe</p>
            <h2
              className="font-semibold text-ink"
              style={{ fontSize: "clamp(32px,4.4vw,52px)", letterSpacing: "-0.025em", lineHeight: 1.08 }}
            >
              Four convictions we won&apos;t compromise on.
            </h2>
          </FadeUp>
          <div className="mt-12 grid md:grid-cols-2 gap-4">
            {beliefs.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
                whileHover={{ y: -3 }}
                className="rounded-[24px] bg-white p-7"
              >
                <h3
                  className="font-semibold text-ink"
                  style={{ fontSize: 20, letterSpacing: "-0.018em" }}
                >
                  {b.title}
                </h3>
                <p className="mt-3 text-[15px] text-text-secondary leading-[1.7]">{b.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
