import { motion } from "framer-motion";
import { DUR, EASE_EXPO, VIEWPORT, groupVariants, itemVariants } from "@/lib/motion";

/**
 * The single scroll-reveal primitive. Below-fold sections only —
 * hero/above-fold content uses CSS entrance animations so it is
 * never hidden in server-rendered HTML.
 * Reduced motion is handled globally by <MotionConfig reducedMotion="user">.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: DUR.base, ease: EASE_EXPO, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Parent that staggers its <RevealItem> children as one orchestrated group. */
export function RevealGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={groupVariants}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
