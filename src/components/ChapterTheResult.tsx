import { motion } from "framer-motion";

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
      </div>
    </section>
  );
}
