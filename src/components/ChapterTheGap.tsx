import { motion } from "framer-motion";


export function ChapterTheGap() {
  return (
    <section className="bg-navy text-white py-28">
      <div className="container-cg max-w-4xl">
        <p className="eyebrow mb-6">The Gap</p>

        <div className="space-y-3">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.5, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-[28px] md:text-[32px] text-white font-light leading-tight"
          >
            Your cloud is covered.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="text-[28px] md:text-[32px] text-white font-bold leading-tight"
          >
            Your endpoints are not.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
            className="text-[18px] md:text-[20px] text-teal font-normal pt-4"
          >
            Vanta doesn't scan your machines. We do.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 1.0 }}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          {stats.map((c) => (
            <div key={c.stat} className="bg-white rounded-[12px] p-8">
              <div className="text-[40px] md:text-[48px] font-bold text-navy leading-none">
                {c.stat}
              </div>
              <p className="mt-3 text-[15px] text-text-secondary">{c.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
