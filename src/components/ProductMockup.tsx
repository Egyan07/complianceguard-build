import { Check, X } from "lucide-react";

const SCORE = 67;
const RADIUS = 52;
const STROKE = 8;
const CIRC = 2 * Math.PI * RADIUS;
const OFFSET = CIRC * (1 - SCORE / 100);
const ACCENT = "#5266EB";

export function ProductMockup() {
  return (
    <div className="w-full md:max-w-[540px] mx-auto md:rotate-[-2deg] transition-transform">
      <div
        className="rounded-[14px] border border-hairline overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #1E1E2A 0%, #1A1A24 100%)",
          boxShadow:
            "0 40px 80px -32px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Window chrome */}
        <div
          className="flex items-center gap-2 px-4 py-3 border-b border-hairline"
          style={{ background: "rgba(15,15,24,0.6)" }}
        >
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
          <span className="ml-3 mono-tag">complianceguard — soc 2</span>
          <span className="ml-auto mono-tag" style={{ color: "var(--accent-color)" }}>
            v3.3.1
          </span>
        </div>

        <div className="p-7">
          <div className="flex items-baseline justify-between mb-5">
            <span className="mono-tag">Readiness · SOC 2</span>
            <span className="mono-tag">29 controls</span>
          </div>

          {/* Gauge + label */}
          <div className="flex items-center gap-6 mb-7">
            <div className="relative shrink-0" style={{ width: 132, height: 132 }}>
              <svg
                width={132}
                height={132}
                viewBox="0 0 132 132"
                style={{ transform: "rotate(-90deg)" }}
                aria-label={`SOC 2 readiness ${SCORE}%`}
              >
                <circle
                  cx={66}
                  cy={66}
                  r={RADIUS}
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth={STROKE}
                  fill="none"
                />
                <circle
                  cx={66}
                  cy={66}
                  r={RADIUS}
                  stroke={ACCENT}
                  strokeWidth={STROKE}
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={CIRC}
                  strokeDashoffset={CIRC}
                  className="cg-gauge-stroke"
                  style={
                    {
                      "--cg-gauge-circumference": `${CIRC}`,
                      "--cg-gauge-offset": `${OFFSET}`,
                      filter: `drop-shadow(0 0 8px ${ACCENT}66)`,
                    } as React.CSSProperties
                  }
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className="text-[40px] leading-none font-light text-starlight"
                  style={{ letterSpacing: "-0.04em", fontVariantNumeric: "tabular-nums" }}
                >
                  {SCORE}
                  <span className="text-[20px] text-text-secondary">%</span>
                </span>
                <span className="mono-tag mt-1">on track</span>
              </div>
            </div>
            <div>
              <div className="text-[14px] text-starlight">
                19 of 29 controls passing
              </div>
              <div className="text-[13px] text-text-secondary mt-1">
                10 need attention before audit
              </div>
              <div
                className="mt-3 inline-flex items-center gap-1.5 px-2 py-1 rounded mono-tag"
                style={{
                  background: "rgba(82,102,235,0.12)",
                  color: ACCENT,
                  border: "1px solid rgba(82,102,235,0.24)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
                scan · 2 min ago
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            {[
              { name: "CC6.1 · Logical Access", pass: true },
              { name: "CC6.5 · Network Security", pass: true },
              { name: "CC7.1 · Event Logging", pass: false },
              { name: "CC7.2 · Vulnerability Mgmt", pass: true },
              { name: "C1.2 · Data Protection", pass: false },
              { name: "A1.4 · Backup & Recovery", pass: true },
            ].map((c) => (
              <div
                key={c.name}
                className="flex items-center justify-between py-2.5 px-3.5 rounded-md border border-hairline"
                style={{ background: "rgba(39,39,53,0.4)" }}
              >
                <span className="font-mono text-[12.5px] text-text-secondary">
                  {c.name}
                </span>
                <span
                  className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded mono-tag"
                  style={
                    c.pass
                      ? { color: ACCENT, background: "rgba(82,102,235,0.10)" }
                      : { color: "#F87171", background: "rgba(248,113,113,0.10)" }
                  }
                >
                  {c.pass ? <Check size={10} /> : <X size={10} />}
                  {c.pass ? "pass" : "fail"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="md:hidden mt-3 text-center mono-tag">tap to expand →</p>
    </div>
  );
}
