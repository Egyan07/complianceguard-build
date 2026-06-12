import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { ProductMockup } from "./ProductMockup";
import { DOWNLOAD_URL, VERSION } from "@/lib/site";

/**
 * Landing hero. Text entrances are pure CSS (.anim-rise) so the headline —
 * the LCP element — is rendered visible in server HTML and animates without
 * JS. The only JS-driven motion is a subtle scroll parallax on the mockup.
 */
export function Hero() {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <section
      data-hero
      className="relative isolate overflow-hidden bg-snow pt-32 md:pt-40 pb-16 md:pb-24"
    >
      <div aria-hidden className="absolute inset-0 ambient-grid" />
      <div aria-hidden className="absolute inset-0 accent-glow" />

      <div className="container-cg relative z-10">
        <div className="max-w-[820px] mx-auto text-center">
          <Link
            to="/changelog"
            className="anim-rise inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[rgba(0,113,227,0.12)]"
            style={{ background: "var(--azure-soft)", color: "var(--azure)" }}
          >
            <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-azure" />v{VERSION} &mdash; now
            on Windows and macOS
            <span aria-hidden>&rsaquo;</span>
          </Link>

          <h1 className="anim-rise anim-d-1 display-1 mt-6">
            Compliance, on your{" "}
            <span
              style={{
                background: "linear-gradient(110deg, #0071e3 10%, #0040dd 90%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              endpoint.
            </span>
          </h1>

          <p className="anim-rise anim-d-2 mt-6 body-lg md:text-[21px] text-ink-2 max-w-[660px] mx-auto">
            Cloud platforms scan your cloud. ComplianceGuard scans the machines your business runs
            on &mdash; collecting, scoring, and signing SOC&nbsp;2, ISO&nbsp;27001, and HIPAA
            evidence locally. Nothing leaves your network.
          </p>

          <div className="anim-rise anim-d-3 mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <a href={DOWNLOAD_URL} className="btn-primary">
              Download for free
            </a>
            <a href="#how-it-works" className="btn-ghost">
              See how it works <span aria-hidden>&rsaquo;</span>
            </a>
          </div>

          <p className="anim-rise anim-d-4 mt-7 text-[13px] text-ink-3">
            Windows 10/11 &middot; macOS 12+ (Intel &amp; Apple Silicon) &middot; ~568 tests passing
            &middot; Source-available under BSL 1.1
          </p>
        </div>

        {/* Product visual — subtle scroll parallax, GPU transform only */}
        <div
          ref={frameRef}
          className="anim-rise anim-d-4 relative max-w-[980px] mx-auto mt-16 md:mt-20"
        >
          <div
            aria-hidden
            className="absolute -inset-x-8 -top-10 bottom-0"
            style={{
              background:
                "radial-gradient(ellipse 65% 55% at 50% 38%, rgba(0,113,227,0.10), transparent 70%)",
            }}
          />
          <motion.div
            style={{ y, boxShadow: "var(--shadow-float)", borderRadius: 22 }}
            className="relative"
          >
            <ProductMockup />
          </motion.div>
        </div>

        <p className="mono-tag text-center mt-14">
          SOC 2 Type II &middot; ISO 27001 &middot; HIPAA Security Rule &middot; Air-gap ready
        </p>
      </div>
    </section>
  );
}
