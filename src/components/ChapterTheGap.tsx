import { motion } from "framer-motion";


export function ChapterTheGap() {
  return (
    <section className="bg-navy text-white pt-28 pb-0">
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

      </div>
    </section>
  );
}
