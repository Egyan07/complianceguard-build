import { type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "@tanstack/react-router";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Fades the route outlet out (150ms) and the new route in (200ms) on
 * pathname change. Skips the animation when prefers-reduced-motion is set.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
