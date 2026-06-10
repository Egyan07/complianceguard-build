import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { AmbientGrid } from "./AmbientGrid";
import { ProductMockup } from "./ProductMockup";
import { Logo } from "./Logo";
import { usePrefersReducedMotion, useMediaQuery } from "@/hooks/use-reduced-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const HEADLINE = [
  ["Compliance,"],
  ["on", "your", "machine."],
];

function WordStagger() {
  const reduced = usePrefersReducedMotion();
  let i = 0;
  return (
    <h1
      className="text-center font-semibold text-ink"
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(48px, 9vw, 104px)",
        lineHeight: 1.02,
        letterSpacing: "-0.035em",
      }}
    >
      {HEADLINE.map((line, li) => (
        <span key={li} className="block overflow-hidden pb-[0.05em]">
          {line.map((word, wi) => {
            const delay = 0.25 + i++ * 0.07;
            return (
              <motion.span
                key={wi}
                className="inline-block mr-[0.22em]"
                initial={reduced ? false : { y: "115%", opacity: 0 }}
                animate={reduced ? undefined : { y: "0%", opacity: 1 }}
                transition={{ duration: 1.1, ease: EASE, delay }}
              >
                {word}
              </motion.span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

function FloatingOrbs() {
  const reduced = usePrefersReducedMotion();
  if (reduced) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-32 -left-24 w-[520px] h-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(0,113,227,0.22), rgba(0,113,227,0) 65%)",
          filter: "blur(20px)",
        }}
        animate={{ x: [0, 40, -10, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-32 w-[620px] h-[620px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,89,128,0.16), rgba(255,89,128,0) 65%)",
          filter: "blur(20px)",
        }}
        animate={{ x: [0, -30, 20, 0], y: [0, -40, 10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 w-[480px] h-[480px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,200,80,0.16), rgba(255,200,80,0) 65%)",
          filter: "blur(20px)",
        }}
        animate={{ x: [0, 30, -20, 0], y: [0, 20, -30, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

const MARQUEE = [
  "SOC 2 Type II",
  "ISO 27001:2022",
  "HIPAA",
  "PCI DSS 4.0",
  "NIST 800-53",
  "GDPR",
  "CIS Benchmarks",
];

function FrameworkMarquee() {
  return (
    <div className="relative w-full overflow-hidden mt-14" aria-hidden>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
        style={{ background: "linear-gradient(to right, var(--snow), transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
        style={{ background: "linear-gradient(to left, var(--snow), transparent)" }}
      />
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
      >
        {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((f, i) => (
          <span
            key={i}
            className="text-[15px] font-medium"
            style={{ color: "#86868b", letterSpacing: "-0.003em" }}
          >
            {f}
            <span className="ml-12 text-[#d2d2d7]">/</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function ParallaxMockup() {
  const reduced = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const disabled = reduced || isMobile;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 20, mass: 0.7 });
  const sy = useSpring(my, { stiffness: 70, damping: 20, mass: 0.7 });
  const rotX = useTransform(sy, (v) => v * -4);
  const rotY = useTransform(sx, (v) => v * 4);
  const tx = useTransform(sx, (v) => v * 10);
  const ty = useTransform(sy, (v) => v * 10);

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
    <motion.div
      initial={reduced ? false : { opacity: 0, scale: 0.94, y: 40 }}
      animate={reduced ? undefined : { opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.3, ease: EASE, delay: 0.7 }}
      className="mt-16 md:mt-24 w-full max-w-[960px] mx-auto"
      style={{ perspective: 1400 }}
    >
      <motion.div
        className="relative"
        style={
          disabled
            ? undefined
            : { rotateX: rotX, rotateY: rotY, x: tx, y: ty, transformStyle: "preserve-3d" }
        }
      >
        {/* Soft hero shadow */}
        <div
          aria-hidden
          className="absolute -inset-x-12 -bottom-12 h-32 rounded-[50%]"
          style={{
            background: "radial-gradient(ellipse at center, rgba(0,30,80,0.18), transparent 60%)",
            filter: "blur(30px)",
          }}
        />

        <ProductMockup />

        {/* Scanning beam overlay */}
        {!reduced && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[22px] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            <motion.div
              className="absolute left-0 right-0 h-[160px]"
              style={{
                background:
                  "linear-gradient(180deg, transparent, rgba(0,113,227,0.18), transparent)",
                mixBlendMode: "screen",
              }}
              animate={{ y: ["-20%", "120%"] }}
              transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 2.4, ease: EASE }}
            />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const reduced = usePrefersReducedMotion();
  return (
    <section
      data-hero
      className="relative isolate overflow-hidden bg-snow pt-32 md:pt-40 pb-16 md:pb-24"
    >
      <AmbientGrid />
      <FloatingOrbs />

      <div className="container-cg relative z-10 flex flex-col items-center">
        {/* Animated logo + wordmark replacing plain text */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-8"
        >
          <Logo size={52} />
        </motion.div>

        {/* Eyebrow pill */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5"
          style={{
            background: "rgba(0,113,227,0.08)",
            border: "1px solid rgba(0,113,227,0.18)",
          }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-azure opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-azure" />
          </span>
          <span
            className="text-[12px] font-medium text-azure"
            style={{ letterSpacing: "0.01em" }}
          >
            v3.3.1 &middot; Air-gapped tier now available
          </span>
        </motion.div>

        <WordStagger />

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
          className="mt-8 max-w-[680px] text-[20px] md:text-[24px] font-light leading-[1.4] text-ink text-center"
          style={{ letterSpacing: "-0.01em" }}
        >
          Endpoint evidence for SOC 2, ISO 27001 and HIPAA — collected on your
          machine, scored in one pass, never uploaded to a vendor cloud.
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.0 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="https://github.com/Egyan07/ComplianceGuard/releases/latest"
            className="btn-primary group inline-flex items-center gap-2"
          >
            Download for Free
            <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
          </a>
          <a
            href="#product"
            className="text-[17px] text-cobalt-link hover:underline"
            style={{ letterSpacing: "-0.022em" }}
          >
            See how it works &rsaquo;
          </a>
        </motion.div>

        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          animate={reduced ? undefined : { opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 1.15 }}
          className="mt-4 text-[13px] text-center"
          style={{ color: "#86868b" }}
        >
          Windows &amp; macOS &middot; ~568 tests passing &middot; BSL 1.1 &middot; No account required
        </motion.p>

        <ParallaxMockup />

        <FrameworkMarquee />
      </div>
    </section>
  );
}
