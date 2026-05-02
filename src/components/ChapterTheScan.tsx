import { useEffect, useRef, useState } from "react";

type Line = {
  text: string;
  /** ms to pause AFTER this line completes, before next starts */
  pauseAfter?: number;
  color?: string;
  bold?: boolean;
};

const LINES: Line[] = [
  { text: "$ complianceguard scan --aws", color: "#9CA3AF", pauseAfter: 400 },
  { text: "✓ Initializing scanner...", color: "rgba(255,255,255,0.7)", pauseAfter: 200 },
  { text: "✓ Reading Windows Registry...", color: "rgba(255,255,255,0.7)", pauseAfter: 300 },
  { text: "✓ Checking password policy... PASS", color: "#1A8C5F", pauseAfter: 200 },
  { text: "✓ Checking firewall status... PASS", color: "#1A8C5F", pauseAfter: 200 },
  { text: "✓ Checking disk encryption... PASS", color: "#1A8C5F", pauseAfter: 200 },
  { text: "✓ Checking audit logging... FAIL", color: "#C0392B", pauseAfter: 200 },
  { text: "✓ Checking user accounts... PASS", color: "#1A8C5F", pauseAfter: 400 },
  { text: "→ Connecting to AWS...", color: "#F59E0B", pauseAfter: 600 },
  { text: "✓ CloudTrail: enabled across 3 regions", color: "rgba(255,255,255,0.7)", pauseAfter: 200 },
  { text: "✓ IAM: no root access keys detected", color: "rgba(255,255,255,0.7)", pauseAfter: 200 },
  { text: "✓ S3: 4/5 buckets encrypted", color: "rgba(255,255,255,0.7)", pauseAfter: 400 },
  { text: "", pauseAfter: 0 },
  { text: "SOC 2 Readiness Score: 67% (19/29 controls passing)", color: "#FFFFFF", bold: true, pauseAfter: 100 },
  {
    text: "Evidence pack saved to: ./complianceguard-evidence-2026-04-29.pdf",
    color: "#FFFFFF",
    bold: true,
  },
];

const CHAR_SPEED = 30;

export function ChapterTheScan() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [started, setStarted] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [completedLines, setCompletedLines] = useState<number[]>([]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (currentLine >= LINES.length) return;

    const line = LINES[currentLine];
    if (currentChar < line.text.length) {
      const t = window.setTimeout(() => setCurrentChar((c) => c + 1), CHAR_SPEED);
      return () => clearTimeout(t);
    }
    // line complete
    const pause = line.pauseAfter ?? 200;
    const t = window.setTimeout(() => {
      setCompletedLines((arr) => [...arr, currentLine]);
      setCurrentLine((l) => l + 1);
      setCurrentChar(0);
    }, pause);
    return () => clearTimeout(t);
  }, [started, currentLine, currentChar]);

  const allDone = currentLine >= LINES.length;

  return (
    <section className="bg-background py-28">
      <div className="container-cg max-w-3xl text-center">
        <p className="eyebrow mb-4">Watch It Work</p>
        <h2 className="text-[32px] md:text-[40px] font-bold text-navy leading-tight">
          Scan complete in 30 seconds.
        </h2>
        <p className="mt-5 text-[18px] text-text-secondary max-w-xl mx-auto">
          ComplianceGuard reads your OS directly. No setup. No configuration. Run
          it once and see exactly where you stand.
        </p>

        <div
          ref={ref}
          className="mt-10 rounded-[12px] overflow-hidden text-left font-mono text-[13px]"
          style={{ background: "#1a1a2e", border: "1px solid #1E293B" }}
        >
          <div
            className="flex items-center gap-2 px-4 py-2.5"
            style={{ borderBottom: "1px solid #1E293B" }}
          >
            <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <span className="w-3 h-3 rounded-full bg-[#28C840]" />
            <span className="ml-3 text-[12px] text-white/40">~/projects/my-saas</span>
          </div>
          <div
            className="p-5 leading-[1.85]"
            style={{ minHeight: 320, fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
          >
            {LINES.map((line, idx) => {
              if (idx > currentLine) return null;
              const isCurrent = idx === currentLine && !allDone;
              const text = isCurrent ? line.text.slice(0, currentChar) : line.text;
              const showCaret = isCurrent;
              if (line.text === "" && completedLines.includes(idx)) {
                return <div key={idx}>&nbsp;</div>;
              }
              return (
                <div
                  key={idx}
                  style={{
                    color: line.color || "rgba(255,255,255,0.7)",
                    fontWeight: line.bold ? 700 : 400,
                  }}
                >
                  {text || "\u00A0"}
                  {showCaret && (
                    <span className="cg-caret" aria-hidden="true" style={{ color: "#FFFFFF" }}>
                      █
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-4 text-[14px] text-text-secondary">
          Output shown is illustrative. Your actual results depend on your machine
          configuration.
        </p>
      </div>
    </section>
  );
}
