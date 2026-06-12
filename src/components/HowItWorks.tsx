import { useEffect, useRef, useState } from "react";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

const steps = [
  {
    n: 1,
    title: "Install",
    body: "Run the installer for Windows or macOS. No admin privileges, no API keys, no agents to deploy.",
  },
  {
    n: 2,
    title: "Scan",
    body: "ComplianceGuard reads the OS directly — password policy, firewall, disk encryption, audit logging.",
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

const LINES: LogLine[] = [
  { text: "ComplianceGuard 3.3.1 — evidence collection started", tone: "strong", pauseAfter: 400 },
  { text: "Reading Windows Registry ✓", pauseAfter: 250 },
  { text: "Password policy — PASS", tone: "pass", pauseAfter: 200 },
  { text: "Firewall status — PASS", tone: "pass", pauseAfter: 200 },
  { text: "Disk encryption — PASS", tone: "pass", pauseAfter: 200 },
  { text: "Audit logging — NEEDS WORK", tone: "warn", pauseAfter: 250 },
  { text: "Local user accounts — PASS", tone: "pass", pauseAfter: 400 },
  { text: "AWS — IAM policies ✓ · S3 encryption 4 of 5 buckets", pauseAfter: 500 },
  { text: "", pauseAfter: 100 },
  {
    text: "Readiness score: 67% — 19 of 29 SOC 2 controls passing",
    tone: "strong",
    pauseAfter: 150,
  },
  { text: "Evidence pack exported → complianceguard-evidence.pdf", tone: "strong" },
];

const TONE_COLOR: Record<string, string> = {
  pass: "#3fb950",
  warn: "#f0883e",
  strong: "#ffffff",
  default: "rgba(255,255,255,0.72)",
};

const CHAR_SPEED = 28;

function ScanLog() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [started, setStarted] = useState(false);
  const [line, setLine] = useState(0);
  const [char, setChar] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStarted(true);
      setLine(LINES.length);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started || line >= LINES.length) return;
    const current = LINES[line];
    if (char < current.text.length) {
      const t = window.setTimeout(() => setChar((c) => c + 1), CHAR_SPEED);
      return () => clearTimeout(t);
    }
    const t = window.setTimeout(() => {
      setLine((l) => l + 1);
      setChar(0);
    }, current.pauseAfter ?? 200);
    return () => clearTimeout(t);
  }, [started, line, char]);

  const done = line >= LINES.length;

  return (
    <div
      ref={ref}
      className="rounded-[20px] overflow-hidden text-left font-mono text-[13px] border border-white/10"
      style={{ background: "var(--ink)" }}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
        <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
        <span className="ml-2 text-[12px] text-white/40">ComplianceGuard — scan log</span>
      </div>
      <div className="p-6 leading-[1.9]" style={{ minHeight: 300 }}>
        {LINES.map((l, idx) => {
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
              {text || " "}
              {isCurrent && (
                <span className="cg-caret" aria-hidden="true" style={{ color: "#fff" }}>
                  █
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** One definitive "how it works" moment: four steps + a live scan demonstration. */
export function HowItWorks() {
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

        <RevealGroup className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s) => (
            <RevealItem key={s.n}>
              <div className="w-9 h-9 rounded-full bg-azure text-snow flex items-center justify-center text-[15px] font-semibold">
                {s.n}
              </div>
              <h3 className="mt-4 text-[18px] font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-[15px] text-ink-2 leading-[1.65]">{s.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-16 max-w-3xl mx-auto">
          <ScanLog />
          <p className="mt-4 text-[13px] text-ink-3 text-center">
            Output shown is illustrative. Actual results depend on your machine configuration.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
