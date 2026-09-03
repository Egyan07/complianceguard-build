import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Reveal } from "./Reveal";
import { EASE_EXPO } from "@/lib/motion";

const steps = [
  {
    n: 1,
    title: "Install",
    body: "Run the installer for Windows or macOS. No admin privileges, no API keys, no agents to deploy.",
  },
  {
    n: 2,
    title: "Scan",
    body: "ComplianceGuard reads the OS directly: password policy, firewall, disk encryption, audit logging.",
  },
  {
    n: 3,
    title: "Connect AWS",
    body: "Add credentials once, encrypted locally. Cloud evidence joins the same pack automatically.",
  },
  {
    n: 4,
    title: "Hand off",
    body: "Export an auditor-ready PDF evidence pack, mapped control-by-control to the framework.",
  },
];

type LogLine = { text: string; tone?: "pass" | "warn" | "strong"; pauseAfter?: number };

const SCAN_LINES: LogLine[] = [
  { text: "ComplianceGuard 3.9.0: evidence collection started", tone: "strong", pauseAfter: 400 },
  { text: "Reading Windows Registry ✓", pauseAfter: 250 },
  { text: "Password policy: PASS", tone: "pass", pauseAfter: 200 },
  { text: "Firewall status: PASS", tone: "pass", pauseAfter: 200 },
  { text: "Disk encryption: PASS", tone: "pass", pauseAfter: 200 },
  { text: "Audit logging: NEEDS WORK", tone: "warn", pauseAfter: 250 },
  { text: "Local user accounts: PASS", tone: "pass", pauseAfter: 400 },
  { text: "Readiness score: 67% (36 of 54 SOC 2 controls passing)", tone: "strong" },
];

const TONE_COLOR: Record<string, string> = {
  pass: "#3fb950",
  warn: "#f0883e",
  strong: "#ffffff",
  default: "rgba(255,255,255,0.72)",
};

const CHAR_SPEED = 24;

/** Static log lines for the non-scan steps. */
const STEP_LOGS: Record<number, LogLine[]> = {
  0: [
    { text: "$ ./ComplianceGuard-Setup", tone: "strong" },
    { text: "no admin · no API keys · no agents" },
    { text: "Installed in 12s ✓", tone: "pass" },
  ],
  2: [
    { text: "$ link aws account", tone: "strong" },
    { text: "credentials encrypted locally (Fernet · HKDF-SHA256)" },
    { text: "IAM policies ✓", tone: "pass" },
    { text: "S3 encryption: 4 of 5 buckets", tone: "warn" },
    { text: "Security groups ✓", tone: "pass" },
  ],
  3: [
    { text: "$ export evidence pack", tone: "strong" },
    { text: "mapping controls → Trust Services Criteria" },
    { text: "signing with Ed25519 key ✓", tone: "pass" },
    { text: "complianceguard-evidence.pdf", tone: "strong" },
  ],
};

const TERMINAL_TITLE: Record<number, string> = {
  0: "ComplianceGuard · install",
  1: "ComplianceGuard · scan log",
  2: "ComplianceGuard · connect aws",
  3: "ComplianceGuard · export",
};

function TerminalFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl overflow-hidden text-left font-mono text-[13px] border border-white/10"
      style={{ background: "var(--ink)", boxShadow: "var(--shadow-float)" }}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
        <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
        <span className="ml-2 text-[12px] text-white/40">{title}</span>
      </div>
      <div className="p-6 leading-[1.9]" style={{ minHeight: 280 }}>
        {children}
      </div>
    </div>
  );
}

function LogLines({ lines }: { lines: LogLine[] }) {
  return (
    <>
      {lines.map((l, i) => (
        <div
          key={i}
          style={{
            color: TONE_COLOR[l.tone ?? "default"],
            fontWeight: l.tone === "strong" ? 600 : 400,
          }}
        >
          {l.text || " "}
        </div>
      ))}
    </>
  );
}

/** The Scan step: lines type out. Restarts whenever it (re)mounts. */
function ScanLog() {
  const reduce =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [line, setLine] = useState(reduce ? SCAN_LINES.length : 0);
  const [char, setChar] = useState(0);

  useEffect(() => {
    if (reduce || line >= SCAN_LINES.length) return;
    const current = SCAN_LINES[line];
    if (char < current.text.length) {
      const t = window.setTimeout(() => setChar((c) => c + 1), CHAR_SPEED);
      return () => clearTimeout(t);
    }
    const t = window.setTimeout(() => {
      setLine((l) => l + 1);
      setChar(0);
    }, current.pauseAfter ?? 200);
    return () => clearTimeout(t);
  }, [line, char, reduce]);

  const done = line >= SCAN_LINES.length;
  return (
    <>
      {SCAN_LINES.map((l, idx) => {
        if (idx > line) return null;
        const isCurrent = idx === line && !done;
        const text = isCurrent ? l.text.slice(0, char) : l.text;
        return (
          <div
            key={idx}
            style={{
              color: TONE_COLOR[l.tone ?? "default"],
              fontWeight: l.tone === "strong" ? 600 : 400,
            }}
          >
            {text || " "}
            {isCurrent && (
              <span className="cg-caret" aria-hidden="true" style={{ color: "#fff" }}>
                █
              </span>
            )}
          </div>
        );
      })}
    </>
  );
}

function StepVisual({ index }: { index: number }) {
  return (
    <TerminalFrame title={TERMINAL_TITLE[index]}>
      {index === 1 ? <ScanLog /> : <LogLines lines={STEP_LOGS[index]} />}
    </TerminalFrame>
  );
}

/** One definitive "how it works" moment: four steps + a pinned, live terminal.
 * The active step is derived deterministically from the steps column's scroll
 * progress, so it can never desync or land in a dead zone. */
export function HowItWorks() {
  const stepsRef = useRef<HTMLOListElement | null>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ["start center", "end center"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)));
    setActive(i);
  });

  return (
    <section id="how-it-works" className="bg-snow py-24 md:py-32 scroll-mt-14">
      <div className="container-cg">
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-4">How it works</p>
          <h2 className="display-2">
            From install to audit-ready,
            <br />
            in minutes.
          </h2>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-2 gap-10 lg:gap-20">
          {/* Steps — scroll past; the centred one is active */}
          <ol className="relative" ref={stepsRef}>
            {steps.map((s, i) => {
              const isActive = i === active;
              return (
                <li
                  key={s.n}
                  className="relative pl-14 lg:min-h-[34vh] flex flex-col justify-center"
                >
                  {/* rail */}
                  {i < steps.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute left-[18px] top-[50%] w-px"
                      style={{ height: "100%", background: "var(--hairline)" }}
                    />
                  )}
                  <span
                    aria-hidden
                    className="absolute left-0 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full text-[15px] font-semibold transition-colors duration-300"
                    style={{
                      background: isActive ? "var(--azure)" : "var(--fog)",
                      color: isActive ? "#fff" : "var(--ink-3)",
                      boxShadow: isActive ? "0 0 0 6px rgba(0,113,227,0.10)" : "none",
                    }}
                  >
                    {s.n}
                  </span>
                  <motion.div
                    animate={{ opacity: isActive ? 1 : 0.4 }}
                    transition={{ duration: 0.35, ease: EASE_EXPO }}
                  >
                    <h3 className="text-[20px] font-semibold text-ink tracking-[-0.015em]">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[15px] text-ink-2 leading-[1.65] max-w-[420px]">
                      {s.body}
                    </p>
                  </motion.div>
                </li>
              );
            })}
          </ol>

          {/* Pinned terminal — swaps content per active step */}
          <div className="lg:sticky lg:top-28 lg:self-start lg:h-[360px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: EASE_EXPO }}
              >
                <StepVisual index={active} />
              </motion.div>
            </AnimatePresence>
            <p className="mt-4 text-[13px] text-ink-3 text-center">
              Output shown is illustrative. Actual results depend on your machine configuration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
