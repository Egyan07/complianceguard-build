import { motion } from "framer-motion";

const frameworks = [
  {
    finish: "finish-indigo",
    short: "SOC 2",
    title: "Type II, fully scored.",
    body: "All 29 Trust Services Criteria evaluated automatically. The standard for enterprise SaaS deals.",
    count: "29 controls",
  },
  {
    finish: "finish-citrus",
    short: "ISO 27001",
    title: "Annex A, end to end.",
    body: "Every 14 Annex A domain (A.5–A.18) mapped and scored. Required for European enterprise contracts.",
    count: "47 controls",
  },
  {
    finish: "finish-blush",
    short: "HIPAA",
    title: "Security Rule, in one pass.",
    body: "All five 45 CFR Part 164 sections including required and addressable safeguards. For health-tech.",
    count: "47 safeguards",
  },
];

export function FrameworksSection() {
  return (
    <section className="bg-snow py-24 md:py-32">
      <div className="container-cg">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[24px] font-semibold text-ink" style={{ letterSpacing: "-0.016em" }}>
            Three frameworks. One scan.
          </p>
          <h2
            className="mt-3 font-bold text-ink"
            style={{
              fontSize: "clamp(40px, 6vw, 72px)",
              lineHeight: 1.05,
              letterSpacing: "-0.022em",
            }}
          >
            Pick your finish.
          </h2>
          <p
            className="mt-6 text-[20px] font-light text-ink/80"
            style={{ letterSpacing: "-0.01em", lineHeight: 1.4 }}
          >
            The same OS-level evidence collection powers SOC 2, ISO 27001 and HIPAA &mdash;
            mapped directly to the controls auditors actually check.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {frameworks.map((f, i) => (
            <motion.div
              key={f.short}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className={`relative overflow-hidden ${f.finish} flex flex-col`}
              style={{
                borderRadius: 28,
                minHeight: 520,
                padding: 36,
              }}
            >
              <div className="text-snow">
                <p className="text-[13px] font-medium uppercase tracking-wider text-snow/80">
                  {f.short}
                </p>
                <h3
                  className="mt-4 font-bold text-snow"
                  style={{ fontSize: 36, lineHeight: 1.07, letterSpacing: "-0.019em" }}
                >
                  {f.title}
                </h3>
                <p className="mt-4 text-[16px] text-snow/85 leading-[1.5]">
                  {f.body}
                </p>
              </div>
              <div className="mt-auto pt-8 flex items-end justify-between text-snow">
                <span
                  className="text-[72px] font-bold leading-none"
                  style={{ letterSpacing: "-0.022em", fontVariantNumeric: "tabular-nums" }}
                >
                  {f.count.split(" ")[0]}
                </span>
                <span className="text-[13px] uppercase tracking-wider text-snow/70 pb-2">
                  {f.count.split(" ").slice(1).join(" ")}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
