import { motion } from "framer-motion";
import { ProductMockup } from "./ProductMockup";

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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mt-14 flex justify-center cg-result-mockup"
          style={{
            filter: "drop-shadow(0 25px 50px rgba(15, 23, 42, 0.15))",
          }}
        >
          <div className="cg-no-tilt">
            <ProductMockup />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
