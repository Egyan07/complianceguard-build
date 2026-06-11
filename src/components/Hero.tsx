import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import { AmbientGrid } from "./AmbientGrid";
import { ProductMockup } from "./ProductMockup";
import { Logo } from "./Logo";
import { usePrefersReducedMotion, useMediaQuery } from "@/hooks/use-reduced-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const HEADLINE = [
  ["Compliance,", "on", "your"],
  ["endpoint."],
];

function WordStagger() {
  const reduced = usePrefersReducedMotion();
  let i = 0;
  return (
    <h1
      className="text-center font-semibold text-ink"
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(44px, 8.4vw, 104px)",
        lineHeight: 1.02,
        letterSpacing: "-0.038em",
      }}
    >
      {HEADLINE.map((line, li) => (
        <span key={li} className="block overflow-hidden pb-[0.05em]">
          {line.map((word, wi) => {
            const delay = 0.25 + i++ * 0.06;
            const isAccent = word === "endpoint.";
            return (
              <motion.span
                key={wi}
                className="inline-block mr-[0.22em]"
                initial={reduced ? false : { y: "115%", opacity: 0 }}
                animate={reduced ? undefined : { y: "0%", opacity: 1 }}
                transition={{ duration: 1.05, ease: EASE, delay }}
                style={
                  isAccent
                    ? {
                        backgroundImage:
                          "linear-gradient(120deg, #0071e3 0%, #5e9cff 45%, #ff5980 100%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                      }
                    : undefined
                }
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

/* ----------------------------- 3D Orbiting Scene ----------------------------- */

const FRAMEWORKS = [
  { label: "SOC 2", tone: "#0071e3" },
  { label: "ISO 27001", tone: "#7c3aed" },
  { label: "HIPAA", tone: "#10b981" },
  { label: "PCI DSS", tone: "#f59e0b" },
  { label: "NIST 800-53", tone: "#ef4444" },
  { label: "GDPR", tone: "#0ea5e9" },
];

function OrbitScene() {
  const reduced = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");
  if (isMobile) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      style={{ perspective: 1600 }}
    >
      <motion.div
        className="relative"
        style={{
          width: 760,
          height: 760,
          transformStyle: "preserve-3d",
          rotateX: 62,
        }}
        animate={reduced ? undefined : { rotateZ: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {/* concentric rings */}
        {[260, 360, 460].map((r, idx) => (
          <div
            key={r}
            className="absolute rounded-full border"
            style={{
              top: `calc(50% - ${r}px)`,
              left: `calc(50% - ${r}px)`,
              width: r * 2,
              height: r * 2,
              borderColor: `rgba(0,113,227,${0.10 - idx * 0.025})`,
              boxShadow: `inset 0 0 60px rgba(0,113,227,${0.04 - idx * 0.01})`,
            }}
          />
        ))}

        {/* radial spokes */}
        <svg
          className="absolute inset-0"
          viewBox="0 0 760 760"
          style={{ opacity: 0.35 }}
        >
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            const x2 = 380 + Math.cos(a) * 460;
            const y2 = 380 + Math.sin(a) * 460;
            return (
              <line
                key={i}
                x1={380}
                y1={380}
                x2={x2}
                y2={y2}
                stroke="rgba(0,113,227,0.08)"
                strokeWidth={1}
              />
            );
          })}
        </svg>

        {/* orbiting framework chips */}
        {FRAMEWORKS.map((f, i) => {
          const angle = (i / FRAMEWORKS.length) * Math.PI * 2;
          const radius = 360;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <motion.div
              key={f.label}
              className="absolute top-1/2 left-1/2 rounded-full px-4 py-2 backdrop-blur-md"
              style={{
                background: "rgba(255,255,255,0.85)",
                border: `1px solid ${f.tone}33`,
                boxShadow: `0 8px 24px ${f.tone}1f`,
                transform: `translate3d(${x - 60}px, ${y - 18}px, 0) rotateX(-62deg)`,
                color: f.tone,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.02em",
                width: 120,
                textAlign: "center",
              }}
              animate={reduced ? undefined : { y: [y - 18, y - 26, y - 18] }}
              transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
            >
              {f.label}
            </motion.div>
          );
        })}

        {/* scanning pulse */}
        {!reduced && (
          <motion.div
            className="absolute top-1/2 left-1/2 rounded-full"
            style={{
              width: 0,
              height: 0,
              border: "1px solid rgba(0,113,227,0.5)",
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              width: [0, 920],
              height: [0, 920],
              opacity: [0.6, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.div>
    </div>
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
            "radial-gradient(circle at 50% 50%, rgba(255,89,128,0.14), rgba(255,89,128,0) 65%)",
          filter: "blur(20px)",
        }}
        animate={{ x: [0, -30, 20, 0], y: [0, -40, 10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 w-[480px] h-[480px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(124,58,237,0.14), rgba(124,58,237,0) 65%)",
          filter: "blur(20px)",
        }}
        animate={{ x: [0, 30, -20, 0], y: [0, 20, -30, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

const MARQUEE = [
  "Windows 10 / 11",
  "macOS Sonoma",
  "Apple Silicon",
  "SOC 2 Type II",
  "ISO 27001:2013",
  "HIPAA Security Rule",
  "BSL 1.1",
  "Air-gapped",
  "~568 tests passing",
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
  const rotX = useTransform(sy, (v) => v * -5);
  const rotY = useTransform(sx, (v) => v * 5);
  const tx = useTransform(sx, (v) => v * 14);
  const ty = useTransform(sy, (v) => v * 14);

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
      className="mt-16 md:mt-20 w-full max-w-[1000px] mx-auto"
      style={{ perspective: 1600 }}
    >
      <motion.div
        className="relative"
        style={
          disabled
            ? undefined
            : { rotateX: rotX, rotateY: rotY, x: tx, y: ty, transformStyle: "preserve-3d" }
        }
      >
        {/* hero shadow */}
        <div
          aria-hidden
          className="absolute -inset-x-16 -bottom-16 h-40 rounded-[50%]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,30,80,0.22), transparent 60%)",
            filter: "blur(36px)",
          }}
        />

        {/* floating side cards (3D) */}
        {!disabled && (
          <>
            <motion.div
              className="absolute -left-24 top-16 z-20 rounded-2xl bg-white/95 backdrop-blur-md px-4 py-3 border"
              style={{
                borderColor: "rgba(0,0,0,0.06)",
                boxShadow: "0 18px 40px -12px rgba(0,30,80,0.18)",
                transform: "translateZ(80px)",
              }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="text-[10px] uppercase tracking-[0.12em] text-[#86868b]">
                Evidence collected
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-[22px] font-semibold text-ink tabular-nums">8</span>
                <span className="text-[12px] text-[#86868b]">categories &middot; on-device</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute -right-20 top-32 z-20 rounded-2xl bg-white/95 backdrop-blur-md px-4 py-3 border"
              style={{
                borderColor: "rgba(0,0,0,0.06)",
                boxShadow: "0 18px 40px -12px rgba(0,30,80,0.18)",
                transform: "translateZ(120px)",
              }}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <div className="text-[10px] uppercase tracking-[0.12em] text-[#86868b]">
                Frameworks scored
              </div>
              <div className="mt-1 text-[13px] font-medium text-ink">
                SOC 2 &middot; ISO 27001 &middot; HIPAA
              </div>
            </motion.div>

            <motion.div
              className="absolute -right-10 -bottom-6 z-20 rounded-2xl px-4 py-3 border"
              style={{
                background: "linear-gradient(135deg, #0071e3, #0040dd)",
                color: "white",
                borderColor: "rgba(255,255,255,0.2)",
                boxShadow: "0 22px 50px -12px rgba(0,113,227,0.55)",
                transform: "translateZ(160px)",
              }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="text-[10px] uppercase tracking-[0.12em] opacity-80">
                Never uploaded
              </div>
              <div className="mt-0.5 text-[13px] font-semibold">0 bytes left your machine</div>
            </motion.div>
          </>
        )}

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
              className="absolute left-0 right-0 h-[180px]"
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
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.2]);

  return (
    <section
      ref={ref}
      data-hero
      className="relative isolate overflow-hidden bg-snow pt-32 md:pt-40 pb-16 md:pb-24"
    >
      <AmbientGrid />
      <FloatingOrbs />
      <motion.div style={{ y: sceneY, opacity: sceneOpacity }} className="absolute inset-0">
        <OrbitScene />
      </motion.div>

      <div className="container-cg relative z-10 flex flex-col items-center">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-8"
        >
          <Logo size={56} />
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
            v3.3.1 &middot; macOS DMG now shipping &middot; Windows + Apple Silicon
          </span>
        </motion.div>

        <WordStagger />

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
          className="mt-8 max-w-[720px] text-[20px] md:text-[24px] font-light leading-[1.4] text-ink text-center"
          style={{ letterSpacing: "-0.01em" }}
        >
          Vanta scans your cloud. ComplianceGuard scans your machine.
          Endpoint evidence for SOC 2, ISO 27001 and HIPAA — collected, scored and signed
          locally. Nothing uploaded to a vendor cloud.
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
          Windows 10/11 &middot; macOS (Intel + Apple Silicon) &middot; ~568 tests passing &middot;
          BSL 1.1 &middot; No account required
        </motion.p>

        <ParallaxMockup />

        <FrameworkMarquee />
      </div>
    </section>
  );
}
