import { motion } from "framer-motion";

const results = [
  { stat: "29", label: "SOC 2 Trust Services Criteria", sub: "All mapped and scored automatically" },
  { stat: "< 2min", label: "From install to readiness score", sub: "No configuration required" },
  { stat: "3", label: "Export formats", sub: "PDF, CSV, and JSON — auditor-ready" },
];

export function ChapterTheResult() {
  return (
    <section className="bg-surface py-28">
      <div className="container-cg">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center text-[36px] md:text-[48px] font-bold text-navy leading-tight"
        >
          29 controls. 2 minutes. Audit-ready.
        </motion.h2>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {results.map((r, i) => (
            <motion.div
              key={r.stat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
              className="bg-white rounded-[12px] border border-border p-8 text-center"
            >
              <div className="text-[48px] font-bold text-teal leading-none">{r.stat}</div>
              <div className="mt-3 text-[16px] font-semibold text-navy">{r.label}</div>
              <div className="mt-1 text-[14px] text-text-secondary">{r.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
