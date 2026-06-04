import { motion } from "framer-motion";
import { ArrowRight, Apple, Monitor } from "lucide-react";
import { AmbientGrid } from "./AmbientGrid";
import { ProductMockup } from "./ProductMockup";
import { ParallaxMockup } from "./ParallaxMockup";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const HEADLINE = [
  ["Endpoint", "compliance,"],
  ["on", "your", "terms."],
];

function WordStagger() {
  const reduced = usePrefersReducedMotion();
  let i = 0;
  return (
    <h1 className="display-1">
      {HEADLINE.map((line, li) => (
        <span key={li} className="block">
          {line.map((word, wi) => {
            const delay = 0.15 + i++ * 0.06;
            const isAccent = li === 1 && wi === 2; // "terms."
            return (
              <motion.span
                key={wi}
                className={`inline-block mr-[0.22em] ${isAccent ? "italic" : ""}`}
                style={isAccent ? { color: "var(--accent-color)" } : undefined}
                initial={reduced ? false : { opacity: 0, y: 28, filter: "blur(8px)" }}
                animate={reduced ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, ease: EASE, delay }}
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

export function Hero() {
  const reduced = usePrefersReducedMotion();
  return (
    <section
      data-hero
      className="relative isolate overflow-hidden bg-deepspace pt-28 md:pt-36 pb-20 md:pb-28"
      style={{ minHeight: "92vh" }}
    >
      <AmbientGrid />

      <div className="container-cg relative z-10 grid lg:grid-cols-[1.15fr_1fr] gap-14 lg:gap-20 items-center">
        <div>
          {/* meta chip */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-hairline bg-midnight/60 backdrop-blur-md px-3 py-1.5 mb-8"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                style={{ background: "var(--accent-color)" }}
              />
              <span
                className="relative inline-flex h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--accent-color)" }}
              />
            </span>
            <span className="mono-tag" style={{ color: "var(--starlight)" }}>
              v3.3.1 · macOS now shipping
            </span>
          </motion.div>

          <WordStagger />

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
            className="mt-8 max-w-[520px] text-[18px] leading-[1.7] text-text-secondary"
          >
            ComplianceGuard collects evidence directly from Windows and macOS endpoints,
            scores it against{" "}
            <span className="text-starlight">SOC 2</span>,{" "}
            <span className="text-starlight">ISO 27001</span> and{" "}
            <span className="text-starlight">HIPAA</span> in a single pass, and tells you
            exactly where the gaps are — without sending a byte to a vendor cloud.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3"
          >
            <a
              href="https://github.com/Egyan07/ComplianceGuard/releases/latest"
              className="btn-primary group"
            >
              Download free
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </a>
            <a href="#product" className="btn-ghost">
              See it in action
            </a>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 1 }}
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 mono-tag"
          >
            <span className="inline-flex items-center gap-1.5">
              <Monitor size={12} /> Windows 10/11
            </span>
            <span className="opacity-30">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Apple size={12} /> macOS 12+ (Intel / Apple Silicon)
            </span>
            <span className="opacity-30">·</span>
            <span>~568 tests passing</span>
            <span className="opacity-30">·</span>
            <span>BSL 1.1</span>
          </motion.div>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.96, y: 20 }}
          animate={reduced ? undefined : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.4 }}
        >
          <ParallaxMockup>
            <ProductMockup />
          </ParallaxMockup>
        </motion.div>
      </div>
    </section>
  );
}
