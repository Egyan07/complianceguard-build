import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Subtle light gallery backdrop — barely-there grid + soft azure glow.
 * Apple-style restraint, no atmosphere, no neon. 3px mouse parallax max.
 */
export function AmbientGrid() {
  const reduced = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const disabled = reduced || isMobile;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });
  const gridX = useTransform(sx, (v) => v * 4);
  const gridY = useTransform(sy, (v) => v * 4);
  const glowX = useTransform(sx, (v) => v * 12);
  const glowY = useTransform(sy, (v) => v * 12);

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
        className="absolute left-1/2 top-[24%] h-[520px] w-[920px] -translate-x-1/2 accent-glow"
        style={disabled ? undefined : { x: glowX, y: glowY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* fine vignette to white */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,rgba(245,245,247,0.9),transparent_70%)]" />
    </div>
  );
}
