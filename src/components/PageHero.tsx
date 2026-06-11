import { motion } from "framer-motion";
import { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Optional decorative motion piece rendered behind the title */
  ornament?: "rings" | "orb" | "grid" | "none";
  align?: "left" | "center";
  children?: ReactNode;
};

function Rings() {
  const reduced = usePrefersReducedMotion();
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ perspective: 1400 }}
    >
      <motion.div
        className="relative"
        style={{ width: 720, height: 720, transformStyle: "preserve-3d", rotateX: 64 }}
        animate={reduced ? undefined : { rotateZ: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      >
        {[200, 280, 360].map((r, i) => (
          <div
            key={r}
            className="absolute rounded-full border"
            style={{
              top: `calc(50% - ${r}px)`,
              left: `calc(50% - ${r}px)`,
              width: r * 2,
              height: r * 2,
              borderColor: `rgba(0,113,227,${0.10 - i * 0.025})`,
            }}
          />
        ))}
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(0,113,227,0.08), transparent 70%)",
        }}
      />
    </div>
  );
}

function Orb() {
  const reduced = usePrefersReducedMotion();
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute top-1/2 left-1/2 w-[640px] h-[640px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0,113,227,0.18), rgba(0,113,227,0) 60%)",
          filter: "blur(20px)",
          translateX: "-50%",
          translateY: "-55%",
        }}
        animate={reduced ? undefined : { scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function Grid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "linear-gradient(rgba(29,29,31,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(29,29,31,0.05) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse 70% 50% at 50% 40%, #000 30%, transparent 90%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 50% at 50% 40%, #000 30%, transparent 90%)",
      }}
    />
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  ornament = "rings",
  align = "center",
  children,
}: Props) {
  const reduced = usePrefersReducedMotion();
  const isCenter = align === "center";
  return (
    <section className="relative isolate overflow-hidden bg-snow pt-32 md:pt-40 pb-16 md:pb-20">
      {ornament === "rings" && <Rings />}
      {ornament === "orb" && <Orb />}
      {ornament === "grid" && <Grid />}
      <div
        className={`container-cg relative z-10 max-w-4xl ${
          isCenter ? "text-center mx-auto" : ""
        }`}
      >
        {eyebrow && (
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-[12px] font-mono uppercase tracking-[0.16em] text-azure mb-5"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
          className="font-semibold text-ink"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(40px, 6vw, 76px)",
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
          }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            className={`mt-6 text-[19px] md:text-[22px] font-light leading-[1.45] text-ink/75 ${
              isCenter ? "max-w-[640px] mx-auto" : "max-w-[640px]"
            }`}
            style={{ letterSpacing: "-0.01em" }}
          >
            {subtitle}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
