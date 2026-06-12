import type { Variants } from "framer-motion";

/**
 * Motion tokens — the single source of truth for animation timing.
 * Mirrored as CSS custom properties in styles.css (--ease-expo, --dur-*).
 */
export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

export const DUR = {
  fast: 0.2,
  base: 0.5,
  slow: 0.8,
  hero: 1.1,
} as const;

export const STAGGER = 0.07;

/** Shared whileInView viewport config — fire once, slightly before entry. */
export const VIEWPORT = { once: true, margin: "-80px" } as const;

/** Parent/child variants for orchestrated group reveals. */
export const groupVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER } },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE_EXPO },
  },
};
