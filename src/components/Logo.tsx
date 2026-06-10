import { motion } from "framer-motion";

export function Logo({
  size = 56,
  withWordmark = true,
  animated = true,
}: {
  size?: number;
  withWordmark?: boolean;
  animated?: boolean;
}) {
  const draw = animated
    ? { initial: { pathLength: 0, opacity: 0 }, animate: { pathLength: 1, opacity: 1 } }
    : {};

  return (
    <div className="inline-flex items-center gap-3">
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={animated ? { opacity: 0, scale: 0.9, rotate: -6 } : undefined}
        animate={animated ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        aria-label="ComplianceGuard logo"
      >
        <defs>
          <linearGradient id="cg-shield" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0A84FF" />
            <stop offset="100%" stopColor="#0040DD" />
          </linearGradient>
          <linearGradient id="cg-shine" x1="0" y1="0" x2="64" y2="64">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M32 3 L57 12 V31 C57 47 46 57 32 61 C18 57 7 47 7 31 V12 Z"
          fill="url(#cg-shield)"
        />
        <path
          d="M32 3 L57 12 V31 C57 47 46 57 32 61 C18 57 7 47 7 31 V12 Z"
          fill="url(#cg-shine)"
        />
        <motion.path
          d="M20 33 L29 42 L46 23"
          stroke="#ffffff"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
          {...draw}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
        />
      </motion.svg>
      {withWordmark && (
        <span
          className="text-[22px] md:text-[26px] font-semibold text-ink"
          style={{ letterSpacing: "-0.018em" }}
        >
          ComplianceGuard
        </span>
      )}
    </div>
  );
}
