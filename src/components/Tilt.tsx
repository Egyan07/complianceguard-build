import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

/**
 * Tilt — mouse-tracked 3D tilt with spring physics, plus a cursor-tracking
 * specular glare. The signature "the object is reacting to you" feel from
 * Linear/Stripe hero visuals, kept subtle (max ~8°).
 *
 * SSR-safe: renders flat on the server and on first paint; tilt only engages
 * on pointer move after hydration. Disabled entirely under reduced-motion.
 */
export function Tilt({
  children,
  className,
  max = 8,
  glare = true,
  radius,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
  /** Border radius (px) applied to the tilt layer so the glare clips to it. */
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  // Normalised pointer position within the card, -0.5 … 0.5.
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const springCfg = { stiffness: 150, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), springCfg);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), springCfg);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    px.set(nx);
    py.set(ny);
    if (glare) {
      ref.current!.style.setProperty("--mx", `${(nx + 0.5) * 100}%`);
      ref.current!.style.setProperty("--my", `${(ny + 0.5) * 100}%`);
    }
  }

  function onLeave() {
    px.set(0);
    py.set(0);
  }

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={`tilt-scene ${className ?? ""}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div
        className="tilt-layer relative"
        style={{ rotateX, rotateY, borderRadius: radius }}
      >
        {children}
        {glare && <div className="tilt-glare" />}
      </motion.div>
    </div>
  );
}
