import { useRef, type AnchorHTMLAttributes, type MouseEvent } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Max pixels the button shifts toward the cursor. */
  strength?: number;
};

/**
 * Anchor that subtly pulls toward the cursor on hover. Disabled on touch devices and
 * for users with prefers-reduced-motion.
 */
export function MagneticButton({ strength = 8, className, children, onMouseMove, onMouseLeave, ...rest }: Props) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
    onMouseMove?.(e);
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  };

  const handleLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    onMouseLeave?.(e);
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  return (
    <a
      ref={ref}
      className={className}
      style={{ transition: "transform 0.18s ease-out", display: "inline-flex" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...rest}
    >
      {children}
    </a>
  );
}
