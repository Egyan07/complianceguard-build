import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Atmospheric backdrop for the hero — an SVG grid with a soft mask, a single
 * accent glow, and a 5px mouse-reactive parallax on desktop. Designed to feel
 * inhabited without being a "WebGL shader" cliché.
 */
export function AmbientGrid() {
  const reduced = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const disabled = reduced || isMobile;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });
  const gridX = useTransform(sx, (v) => v * 6);
  const gridY = useTransform(sy, (v) => v * 6);
  const glowX = useTransform(sx, (v) => v * 18);
  const glowY = useTransform(sy, (v) => v * 18);

  useEffect(() => {
    if (disabled) return;
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mx.set((e.clientX - cx) / cx);
      my.set((e.clientY - cy) / cy);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [disabled, mx, my]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 ambient-grid"
        style={disabled ? undefined : { x: gridX, y: gridY }}
      />
      <motion.div
        className="absolute left-1/2 top-[18%] h-[640px] w-[1100px] -translate-x-1/2 accent-glow"
        style={disabled ? undefined : { x: glowX, y: glowY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* fine vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,transparent,rgba(23,23,33,0.7)_85%)]" />
    </div>
  );
}
