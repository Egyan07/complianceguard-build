import { useEffect, useRef, useState } from "react";
import { Copy, Check } from "lucide-react";

const LINES = [
  { p: "$ ", t: "complianceguard collect --aws", c: "#1A8C5F" },
  { p: "", t: "→ Scanning Windows registry…           ✓", c: "#94A3B8" },
  { p: "", t: "→ Reading firewall configuration…      ✓", c: "#94A3B8" },
  { p: "", t: "→ Pulling CloudTrail (last 90 days)…   ✓", c: "#94A3B8" },
  { p: "", t: "→ Evaluating 29 SOC 2 controls…        ✓", c: "#94A3B8" },
  { p: "", t: "", c: "" },
  { p: "", t: "Readiness score: 67% (19 of 29 passing)", c: "#1A8C5F" },
  { p: "", t: "Evidence pack written to ./evidence-2026-04-30.pdf", c: "#E2E8F0" },
];

const FULL_COMMAND = "complianceguard collect --aws";

export function CodeSnippet() {
  const [visible, setVisible] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let i = 0;
          const id = setInterval(() => {
            i++;
            setVisible(i);
            if (i >= LINES.length) clearInterval(id);
          }, 220);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(FULL_COMMAND);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* noop */
    }
  };

  return (
    <section className="bg-background py-20">
      <div className="container-cg max-w-3xl">
        <p className="eyebrow mb-4 text-center">One Command</p>
        <h2 className="text-[28px] md:text-[36px] font-bold text-navy text-center leading-tight">
          From terminal to evidence pack<br />in under 30 seconds.
        </h2>

        <div
          ref={ref}
          className="mt-10 rounded-[12px] overflow-hidden font-mono text-[13px] md:text-[14px] relative"
          style={{ background: "#0F172A", border: "1px solid #1E293B" }}
        >
          <div
            className="flex items-center justify-between px-4 py-2.5"
            style={{ borderBottom: "1px solid #1E293B" }}
          >
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <span className="w-3 h-3 rounded-full bg-[#28C840]" />
              <span className="ml-3 text-[12px] text-white/40">~/projects/my-saas</span>
            </div>
            <button
              type="button"
              onClick={copy}
              className="text-[12px] text-white/60 hover:text-white inline-flex items-center gap-1.5"
              aria-label="Copy command"
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <div className="p-5 leading-[1.85] min-h-[260px]">
            {LINES.slice(0, visible).map((l, i) => (
              <div key={i} style={{ color: l.c || "#E2E8F0" }}>
                {l.p && <span className="text-[#64748B]">{l.p}</span>}
                {l.t || "\u00A0"}
              </div>
            ))}
            {visible < LINES.length && (
              <span className="cg-caret text-white" aria-hidden="true">
                ▍
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
