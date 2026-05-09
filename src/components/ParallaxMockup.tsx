import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Wraps the hero product mockup in a parallax container that moves at 0.3x
 * scroll speed. Disabled on mobile and for reduced-motion users.
 */
export function ParallaxMockup({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const reduced = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -60]);
  const disabled = isMobile || reduced;

  return (
    <motion.div
      ref={ref}
      className="overflow-visible -mx-4 px-4 lg:mx-0 lg:px-0"
      style={disabled ? undefined : { y }}
    >
      {children}
    </motion.div>
  );
}
