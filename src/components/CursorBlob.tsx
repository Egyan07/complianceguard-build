import { useEffect, useRef } from "react";

/**
 * Soft radial gradient blob that follows the cursor inside its parent.
 * Parent must be position: relative; this fills it absolutely with pointer-events: none.
 * Hidden on touch devices and for prefers-reduced-motion.
 */
export function CursorBlob({ color = "26, 140, 95" }: { color?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia?.("(hover: none)").matches) return;
    const parent = el.parentElement;
    if (!parent) return;

    el.style.opacity = "0";
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;
      el.style.opacity = "1";
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };
    const tick = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      el.style.transform = `translate(${cx - 250}px, ${cy - 250}px)`;
      raf = requestAnimationFrame(tick);
    };
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 500,
        height: 500,
        background: `radial-gradient(circle at center, rgba(${color}, 0.15), rgba(${color}, 0) 60%)`,
        pointerEvents: "none",
        opacity: 0,
        transition: "opacity 0.3s ease",
        zIndex: 0,
      }}
    />
  );
}
