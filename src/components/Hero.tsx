import { Link } from "@tanstack/react-router";
import { useReducedMotion } from "framer-motion";
import { ShieldCheck, Check, Lock } from "lucide-react";
import { Magnetic } from "./Magnetic";
import { TextRotate } from "./TextRotate";
import Floating, { FloatingElement } from "./ParallaxFloating";
import { DOWNLOAD_URL, VERSION } from "@/lib/site";

/**
 * Kinetic landing hero — a rotating value word plus on-brand tiles that drift
 * with the pointer (parallax). Adapted from danielpetho/fancy: lifestyle
 * photos replaced with product tiles in the ink/azure palette, playful words
 * replaced with real positioning. Float layer is desktop-only; mobile shows a
 * clean centred stack. Rotation + parallax pause under reduced motion.
 */

const ROTATING = ["endpoint.", "laptop.", "servers.", "network.", "own terms."];

function Tile({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl bg-snow/90 backdrop-blur px-4 py-3 select-none"
      style={{ border: "1px solid var(--hairline)", boxShadow: "var(--shadow-float)" }}
    >
      {children}
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section data-hero className="relative isolate overflow-hidden md:overflow-visible bg-snow">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 50% at 50% -10%, rgba(0,113,227,0.07), transparent 70%)",
        }}
      />
      <div aria-hidden className="absolute inset-0 ambient-grid" />

      {/* Floating product tiles — desktop only */}
      <Floating sensitivity={-0.4} className="hidden md:block z-0">
        <FloatingElement depth={0.5} className="top-[20%] left-[5%]">
          <Tile>
            <div className="flex items-center gap-3">
              <span
                className="text-[30px] font-semibold text-ink leading-none"
                style={{ fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}
              >
                67<span className="text-[16px] text-ink-3">%</span>
              </span>
              <div className="text-left">
                <p className="text-[12px] font-medium text-ink">SOC 2 ready</p>
                <p className="text-[11px] text-ink-3">36 of 54 passing</p>
              </div>
            </div>
          </Tile>
        </FloatingElement>

        <FloatingElement depth={1} className="top-[11%] left-[68%]">
          <Tile>
            <span className="inline-flex items-center gap-2 text-[13px] font-medium text-ink">
              <ShieldCheck size={15} className="text-azure" aria-hidden />
              SOC 2 Type II
            </span>
          </Tile>
        </FloatingElement>

        <FloatingElement depth={2.4} className="top-[70%] left-[9%]">
          <Tile>
            <span
              className="inline-flex items-center gap-2 text-[13px] font-medium"
              style={{ color: "var(--success)" }}
            >
              <Check size={14} strokeWidth={3} aria-hidden />
              Disk encryption
            </span>
          </Tile>
        </FloatingElement>

        <FloatingElement depth={1.6} className="top-[75%] left-[72%]">
          <Tile>
            <span className="font-mono text-[12px] text-ink-2">
              <span className="text-azure">0</span> bytes uploaded
            </span>
          </Tile>
        </FloatingElement>

        <FloatingElement depth={3} className="top-[40%] left-[84%]">
          <Tile>
            <span className="inline-flex items-center gap-2 text-[13px] font-medium text-ink">
              <Lock size={14} className="text-azure" aria-hidden />
              ISO 27001 · HIPAA
            </span>
          </Tile>
        </FloatingElement>

        <FloatingElement depth={2} className="top-[42%] left-[2%]">
          <Tile>
            <span className="font-mono text-[11px] text-ink-2">
              0x7a3f…b21c <span style={{ color: "var(--success)" }}>✓</span>
            </span>
          </Tile>
        </FloatingElement>
      </Floating>

      {/* Center column */}
      <div className="container-cg relative z-10 min-h-[88vh] flex flex-col items-center justify-center text-center py-28">
        <Link
          to="/changelog"
          className="anim-rise inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[rgba(0,113,227,0.12)]"
          style={{ background: "var(--azure-soft)", color: "var(--azure)" }}
        >
          <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-azure" />v{VERSION} &middot; now
          on Windows and macOS
          <span aria-hidden>&rsaquo;</span>
        </Link>

        <h1 className="anim-rise anim-d-1 display-1 mt-6 flex flex-col items-center">
          <span>Compliance, on your</span>
          <TextRotate
            texts={ROTATING}
            auto={!reduce}
            mainClassName="justify-center text-azure"
            staggerFrom="last"
            staggerDuration={0.02}
            rotationInterval={2600}
            splitLevelClassName="overflow-hidden pb-[0.12em]"
            transition={{ type: "spring", damping: 30, stiffness: 350 }}
          />
        </h1>

        <p className="anim-rise anim-d-2 mt-6 body-lg md:text-[20px] text-ink-2 max-w-[620px]">
          Cloud platforms scan your cloud. ComplianceGuard scans the machines your business runs on
          , collecting, scoring, and signing SOC&nbsp;2, ISO&nbsp;27001, and HIPAA evidence
          locally. Nothing leaves your network.
        </p>

        <div className="anim-rise anim-d-3 mt-9 flex flex-col sm:flex-row gap-3 justify-center">
          <Magnetic>
            <a href={DOWNLOAD_URL} className="btn-primary btn-sheen">
              Download for free
            </a>
          </Magnetic>
          <a href="#how-it-works" className="btn-ghost">
            See how it works <span aria-hidden>&rsaquo;</span>
          </a>
        </div>

        <p className="anim-rise anim-d-4 mt-7 text-[13px] text-ink-3">
          Windows 10/11 &middot; macOS 12+ (Intel &amp; Apple Silicon) &middot; ~1,075 tests passing
          &middot; Source-available under BSL 1.1
        </p>
      </div>
    </section>
  );
}