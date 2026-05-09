import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

type Props = HTMLMotionProps<"div"> & {
  children: ReactNode;
};

/**
 * Wraps content in a motion.div that lifts on hover.
 * Respects prefers-reduced-motion.
 */
export const HoverCard = forwardRef<HTMLDivElement, Props>(function HoverCard(
  { children, className, style, ...rest },
  ref
) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      whileHover={
        reduced
          ? undefined
          : { y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.08)" }
      }
      transition={{ duration: 0.2, ease: "easeOut" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
});
