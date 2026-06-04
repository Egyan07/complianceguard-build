import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}) {
  const reduced = usePrefersReducedMotion();
  const initial = reduced ? false : { opacity: 0, y: 18 };
  const whileInView = reduced ? undefined : { opacity: 1, y: 0 };

  return (
    <div
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <motion.p
          initial={initial}
          whileInView={whileInView}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="eyebrow mb-5"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        initial={initial}
        whileInView={whileInView}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.06 }}
        className="display-2"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={initial}
          whileInView={whileInView}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.14 }}
          className={`mt-5 text-[17px] leading-[1.7] text-text-secondary ${
            align === "center" ? "max-w-xl mx-auto" : "max-w-xl"
          }`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
