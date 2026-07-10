import { type RefObject, useLayoutEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * AnimatedBeam — draws a curved SVG path between two elements and sends a
 * glowing packet travelling along it (source → hub). Recomputes on resize.
 * Under reduced motion the packet is hidden (the resting connector remains).
 */
interface AnimatedBeamProps {
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
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
  duration = 3,
  delay = 0,
  startColor = "#6cb4ff",
  stopColor = "#0071e3",
}: AnimatedBeamProps) {
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

  return (
    <svg
      fill="none"
      width={box.w}
      height={box.h}
      className="pointer-events-none absolute inset-0"
      viewBox={`0 0 ${box.w} ${box.h}`}
      aria-hidden
    >
      {/* Resting connector */}
      <path d={d} stroke={stopColor} strokeWidth={1.5} strokeOpacity={0.2} />

      {/* Evidence packet travelling from the source into the hub */}
      {!reduce && d && (
        <g>
          <circle r={7} fill={startColor} opacity={0.28}>
            <animateMotion
              dur={`${duration}s`}
              begin={`${delay}s`}
              repeatCount="indefinite"
              path={d}
            />
          </circle>
          <circle r={3} fill={stopColor}>
            <animateMotion
              dur={`${duration}s`}
              begin={`${delay}s`}
              repeatCount="indefinite"
              path={d}
            />
          </circle>
        </g>
      )}
    </svg>
  );
}
