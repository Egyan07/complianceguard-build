import { type RefObject, useId, useLayoutEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * AnimatedBeam — draws a curved SVG path between two elements and sends a
 * glowing gradient pulse travelling along it. Recomputes on resize. Adapted
 * from the magicui pattern. Under reduced motion the pulse holds still (the
 * static base line remains).
 */
interface AnimatedBeamProps {
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  startColor?: string;
  stopColor?: string;
}

export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 3,
  delay = 0,
  startColor = "#6cb4ff",
  stopColor = "#0071e3",
}: AnimatedBeamProps) {
  const id = useId();
  const reduce = useReducedMotion();
  const [d, setD] = useState("");
  const [box, setBox] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    let raf = 0;
    const compute = () => {
      const c = containerRef.current;
      const from = fromRef.current;
      const to = toRef.current;
      if (!c || !from || !to) {
        raf = requestAnimationFrame(compute);
        return;
      }
      const cRect = c.getBoundingClientRect();
      const fRect = from.getBoundingClientRect();
      const tRect = to.getBoundingClientRect();
      // Layout not ready yet (below fold / first paint) — retry next frame.
      if (cRect.width === 0) {
        raf = requestAnimationFrame(compute);
        return;
      }
      setBox({ w: cRect.width, h: cRect.height });
      const sx = fRect.left - cRect.left + fRect.width / 2;
      const sy = fRect.top - cRect.top + fRect.height / 2;
      const ex = tRect.left - cRect.left + tRect.width / 2;
      const ey = tRect.top - cRect.top + tRect.height / 2;
      const mx = (sx + ex) / 2;
      const my = (sy + ey) / 2 - curvature;
      setD(`M ${sx},${sy} Q ${mx},${my} ${ex},${ey}`);
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", compute);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, [containerRef, fromRef, toRef, curvature]);

  // Gradient travels start→end (reverse flips it).
  const coords = reverse
    ? { x1: ["90%", "-10%"], x2: ["100%", "0%"] }
    : { x1: ["10%", "110%"], x2: ["0%", "100%"] };

  return (
    <svg
      fill="none"
      width={box.w}
      height={box.h}
      className="pointer-events-none absolute inset-0"
      viewBox={`0 0 ${box.w} ${box.h}`}
      aria-hidden
    >
      <path d={d} stroke="#0071e3" strokeWidth={1.5} strokeOpacity={0.22} />
      <path d={d} stroke={`url(#${id})`} strokeWidth={2} strokeLinecap="round" />
      <defs>
        <motion.linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
          animate={
            reduce
              ? undefined
              : { x1: coords.x1, x2: coords.x2, y1: ["0%", "0%"], y2: ["0%", "0%"] }
          }
          transition={
            reduce
              ? undefined
              : { delay, duration, repeat: Infinity, ease: [0.16, 1, 0.3, 1], repeatDelay: 0 }
          }
        >
          <stop stopColor={startColor} stopOpacity={0} />
          <stop stopColor={startColor} />
          <stop offset="32.5%" stopColor={stopColor} />
          <stop offset="100%" stopColor={stopColor} stopOpacity={0} />
        </motion.linearGradient>
      </defs>
    </svg>
  );
}
