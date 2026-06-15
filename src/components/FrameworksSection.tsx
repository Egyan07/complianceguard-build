import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { Tilt } from "./Tilt";
import { DUR, EASE_EXPO, VIEWPORT } from "@/lib/motion";

const frameworks = [
  {
    finish: "finish-azure",
    short: "SOC 2",
    title: "Type II, fully scored.",
    body: "29 controls across the AICPA Trust Services Criteria, evaluated automatically. The standard for enterprise SaaS deals.",
    count: 29,
    unit: "controls",
  },
  {
    finish: "finish-indigo",
    short: "ISO 27001",
    title: "Annex A, end to end.",
    body: "47 controls mapped and scored across all 14 Annex A domains. Required for European enterprise contracts.",
    count: 47,
    unit: "controls",
  },
  {
    finish: "finish-slate",
    short: "HIPAA",
    title: "Security Rule, in one pass.",
    body: "47 safeguards across all five 45 CFR Part 164 sections, required and addressable. Built for health-tech.",
    count: 47,
    unit: "safeguards",
  },
];

/**
 * Dot-grid visual: one dot per scored control, filling in on scroll —
 * an echo of the product's control heatmap.
 */
function ControlDots({ count }: { count: number }) {
  return (
    <div aria-hidden className="grid gap-[7px]" style={{ gridTemplateColumns: "repeat(10, 8px)" }}>
      {Array.from({ length: count }, (_, i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ background: "rgba(255,255,255,0.9)" }}
          initial={{ opacity: 0.18, scale: 0.6 }}
          whileInView={{ opacity: 0.9, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, ease: EASE_EXPO, delay: 0.3 + i * 0.012 }}
        />
      ))}
    </div>
  );
}

export function FrameworksSection() {
  return (
    <section className="bg-fog py-24 md:py-32">
      <div className="container-cg">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="eyebrow mb-4">Frameworks</p>
          <h2 className="display-2">
            Three frameworks.
            <br />
            One evidence engine.
          </h2>
          <p className="mt-6 body-lg text-ink-2">
            The same OS-level evidence collection powers SOC&nbsp;2, ISO&nbsp;27001 and HIPAA
            &mdash; mapped directly to the controls auditors actually check.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {frameworks.map((f, i) => (
            <Tilt key={f.short} max={6} radius={28} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: DUR.slow, ease: EASE_EXPO, delay: i * 0.1 }}
                className={`relative overflow-hidden ${f.finish} flex flex-col rounded-[28px] p-9 h-full`}
                style={{ minHeight: 480 }}
              >
                <div className="text-snow">
                  <p className="text-[13px] font-medium uppercase tracking-wider text-snow/80">
                    {f.short}
                  </p>
                  <h3
                    className="mt-4 font-semibold text-snow"
                    style={{ fontSize: 32, lineHeight: 1.1, letterSpacing: "-0.018em" }}
                  >
                    {f.title}
                  </h3>
                  <p className="mt-4 text-[15px] text-snow/85 leading-[1.6]">{f.body}</p>
                </div>

                <div className="mt-8">
                  <ControlDots count={f.count} />
                </div>

                <div className="mt-auto pt-8 flex items-end justify-between text-snow">
                  <span
                    className="text-[64px] font-semibold leading-none"
                    style={{ letterSpacing: "-0.022em", fontVariantNumeric: "tabular-nums" }}
                  >
                    {f.count}
                  </span>
                  <span className="text-[13px] uppercase tracking-wider text-snow/70 pb-2">
                    {f.unit}
                  </span>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
