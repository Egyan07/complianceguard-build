import { motion } from "framer-motion";
import cgLogo from "@/assets/cg-logo.png.asset.json";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Logo({
  size = 56,
  withWordmark = true,
  animated = true,
}: {
  size?: number;
  withWordmark?: boolean;
  animated?: boolean;
}) {
  return (
    <div className="inline-flex items-center gap-3">
      <motion.div
        initial={animated ? { opacity: 0, scale: 0.85, rotate: -8 } : undefined}
        animate={animated ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
        transition={{ duration: 0.9, ease: EASE }}
        whileHover={{ scale: 1.05, rotate: -2 }}
        style={{
          width: size,
          height: size,
          borderRadius: Math.round(size * 0.22),
          overflow: "hidden",
          position: "relative",
          boxShadow:
            "0 10px 30px -10px rgba(10,132,255,0.45), 0 2px 6px -2px rgba(10,132,255,0.25)",
        }}
        aria-label="ComplianceGuard logo"
      >
        <img
          src={cgLogo.url}
          alt="ComplianceGuard"
          width={size}
          height={size}
          style={{ display: "block", width: "100%", height: "100%" }}
        />
        {animated && (
          <motion.div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)",
              mixBlendMode: "screen",
            }}
            initial={{ x: "-120%" }}
            animate={{ x: "120%" }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.5 }}
          />
        )}
      </motion.div>
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
