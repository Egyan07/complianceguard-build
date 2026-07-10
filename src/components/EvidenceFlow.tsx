import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Monitor, Cloud, FileCog, ScrollText, Database } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatedBeam } from "./AnimatedBeam";

/**
 * EvidenceFlow — four sources feed a central "Local evidence store" via glowing
 * beams that pulse *inward*, all inside the network boundary. Real node cards
 * (icon + label) with a prominent, softly-glowing hub. Beams + hub pulse pause
 * under reduced motion.
 */

function NodeCard({
  innerRef,
  icon: Icon,
  title,
  caption,
  className,
}: {
  innerRef: React.RefObject<HTMLDivElement | null>;
  icon: LucideIcon;
  title: string;
  caption: string;
  className: string;
}) {
  return (
    <div
      ref={innerRef}
      className={`absolute z-10 flex items-center gap-3 rounded-2xl bg-snow px-3.5 py-3 ${className}`}
      style={{ border: "1px solid var(--hairline)", boxShadow: "var(--shadow-card)" }}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-ink text-snow">
        <Icon size={17} strokeWidth={2} aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block text-[14px] font-semibold text-ink leading-tight">{title}</span>
        <span className="block text-[12px] text-ink-3 leading-tight mt-0.5">{caption}</span>
      </span>
    </div>
  );
}

export function EvidenceFlow() {
  const reduce = useReducedMotion();
  const container = useRef<HTMLDivElement>(null);
  const hub = useRef<HTMLDivElement>(null);
  const tl = useRef<HTMLDivElement>(null);
  const tr = useRef<HTMLDivElement>(null);
  const bl = useRef<HTMLDivElement>(null);
  const br = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={container}
      className="relative mx-auto w-full max-w-[760px]"
      style={{ height: "clamp(320px, 46vw, 400px)" }}
    >
      {/* Beams (behind cards) — light travels from each source into the hub */}
      <AnimatedBeam
        containerRef={container}
        fromRef={tl}
        toRef={hub}
        curvature={38}
        duration={3}
        delay={0}
      />
      <AnimatedBeam
        containerRef={container}
        fromRef={tr}
        toRef={hub}
        curvature={38}
        duration={3}
        delay={0.4}
      />
      <AnimatedBeam
        containerRef={container}
        fromRef={bl}
        toRef={hub}
        curvature={-38}
        duration={3}
        delay={0.8}
      />
      <AnimatedBeam
        containerRef={container}
        fromRef={br}
        toRef={hub}
        curvature={-38}
        duration={3}
        delay={1.2}
      />

      {/* Source nodes */}
      <NodeCard
        innerRef={tl}
        icon={Monitor}
        title="Your machine"
        caption="Registry · firewall · disk"
        className="top-0 left-0"
      />
      <NodeCard
        innerRef={tr}
        icon={Cloud}
        title="Your AWS"
        caption="IAM · S3 · groups"
        className="top-0 right-0"
      />
      <NodeCard
        innerRef={bl}
        icon={FileCog}
        title="OS configs"
        caption="Policies · patch level"
        className="bottom-0 left-0"
      />
      <NodeCard
        innerRef={br}
        icon={ScrollText}
        title="Event logs"
        caption="Audit trail"
        className="bottom-0 right-0"
      />

      {/* Central hub */}
      <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        {/* Glow + pulsing rings */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -z-10 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,113,227,0.16), transparent 70%)" }}
        />
        {!reduce &&
          [0, 0.6].map((delay, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="absolute left-1/2 top-1/2 -z-10 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ border: "1px solid rgba(0,113,227,0.35)" }}
              animate={{ scale: [0.8, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay }}
            />
          ))}
        <div
          ref={hub}
          className="relative flex flex-col items-center rounded-2xl px-6 py-4 text-center"
          style={{
            background: "linear-gradient(180deg, #0b4f9e, #0071e3)",
            boxShadow: "0 12px 40px rgba(0,113,227,0.4)",
          }}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-white/15 text-white">
            <Database size={20} strokeWidth={2} aria-hidden />
          </span>
          <span className="mt-2.5 text-[15px] font-semibold text-white leading-tight">
            Local evidence store
          </span>
          <span className="mt-1 font-mono text-[11px] uppercase tracking-wider text-white/70">
            SQLite · encrypted
          </span>
        </div>
      </div>
    </div>
  );
}
