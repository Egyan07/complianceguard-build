import { motion } from "framer-motion";
import { AmbientGrid } from "./AmbientGrid";
import { ProductMockup } from "./ProductMockup";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const HEADLINE = [
  ["Compliance,"],
  ["on", "your", "machine."],
];

function WordStagger() {
  const reduced = usePrefersReducedMotion();
  let i = 0;
  return (
    <h1 className="display-1 text-center">
      {HEADLINE.map((line, li) => (
        <span key={li} className="block">
          {line.map((word, wi) => {
            const delay = 0.15 + i++ * 0.06;
            return (
              <motion.span
                key={wi}
                className="inline-block mr-[0.22em]"
                initial={reduced ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
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
      className="relative isolate overflow-hidden bg-snow pt-32 md:pt-40 pb-16 md:pb-24"
    >
      <AmbientGrid />

      <div className="container-cg relative z-10 flex flex-col items-center">
        {/* Eyebrow product name — Apple "MacBook Neo" pattern */}
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-[24px] md:text-[28px] font-semibold tracking-tight text-ink text-center mb-3"
          style={{ letterSpacing: "-0.016em" }}
        >
          ComplianceGuard
        </motion.p>

        <WordStagger />

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
          className="mt-7 max-w-[640px] text-[20px] md:text-[24px] font-light leading-[1.4] text-ink text-center"
          style={{ letterSpacing: "-0.01em" }}
        >
          Endpoint evidence for SOC 2, ISO 27001 and HIPAA — collected on your
          machine, scored in one pass, never uploaded to a vendor cloud.
        </motion.p>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.65 }}
          className="mt-3 text-[17px] text-center"
          style={{ color: "#707070" }}
        >
          From <span className="text-ink font-medium">Free</span> &middot; available on Windows &amp; macOS
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.78 }}
          className="mt-7 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="https://github.com/Egyan07/ComplianceGuard/releases/latest"
            className="btn-primary"
          >
            Download
          </a>
          <a
            href="#product"
            className="text-[17px] text-cobalt-link hover:underline"
            style={{ letterSpacing: "-0.022em" }}
          >
            Learn more &rsaquo;
          </a>
        </motion.div>

        {/* Floating product window — Apple-style centered showcase */}
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.96, y: 30 }}
          animate={reduced ? undefined : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
          className="mt-16 md:mt-24 w-full max-w-[960px]"
        >
          <ProductMockup />
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={reduced ? undefined : { opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 1.1 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-text-dim"
          style={{ color: "var(--text-dim)" }}
        >
          <span>v3.3.1</span>
          <span aria-hidden>&middot;</span>
          <span>~568 tests passing</span>
          <span aria-hidden>&middot;</span>
          <span>BSL 1.1</span>
          <span aria-hidden>&middot;</span>
          <span>No account required</span>
        </motion.div>
      </div>
    </section>
  );
}
