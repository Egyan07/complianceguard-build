import { Check, X } from "lucide-react";

const SCORE = 67;
const RADIUS = 52;
const STROKE = 10;
const CIRC = 2 * Math.PI * RADIUS;
const OFFSET = CIRC * (1 - SCORE / 100);

export function ProductMockup() {
  return (
    <div className="w-full md:max-w-[520px] mx-auto md:rotate-[-3deg] transition-transform">
      <div className="rounded-[12px] border border-border bg-white overflow-hidden shadow-sm">
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-[#FAFBFC]">
          <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <span className="w-3 h-3 rounded-full bg-[#28C840]" />
          <span className="ml-3 text-[12px] font-mono text-foreground/50">
            ComplianceGuard — SOC 2 Readiness
          </span>
        </div>

        <div className="p-6">
          <div className="flex items-baseline justify-between mb-4">
            <span className="text-[13px] font-semibold uppercase tracking-wider text-foreground/60">
              Readiness Score
            </span>
            <span className="text-[12px] text-foreground/50 font-mono">v3.1.0</span>
          </div>

          {/* Animated circular gauge + label */}
          <div className="flex items-center gap-5 mb-6">
            <div className="relative shrink-0" style={{ width: 132, height: 132 }}>
              <svg
                width={132}
                height={132}
                viewBox="0 0 132 132"
                style={{ transform: "rotate(-90deg)" }}
                aria-label={`SOC 2 readiness score ${SCORE} percent`}
              >
                <circle
                  cx={66}
                  cy={66}
                  r={RADIUS}
                  stroke="#F1F5F9"
                  strokeWidth={STROKE}
                  fill="none"
                />
                <circle
                  cx={66}
                  cy={66}
                  r={RADIUS}
                  stroke="#1A8C5F"
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
                    } as React.CSSProperties
                  }
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[36px] leading-none font-bold text-teal">{SCORE}%</span>
                <span className="text-[10px] uppercase tracking-wider text-text-secondary mt-0.5">
                  Ready
                </span>
              </div>
            </div>
            <div>
              <div className="text-[14px] text-foreground font-semibold">
                19 of 29 controls passing
              </div>
              <div className="text-[12px] text-text-secondary mt-1">
                10 need attention before audit
              </div>
              <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-teal bg-teal/10 px-2 py-1 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                Last scan: 2 minutes ago
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {[
              { name: "Access Control", pass: true },
              { name: "Encryption at Rest", pass: true },
              { name: "Audit Logging", pass: false },
              { name: "Incident Response", pass: true },
              { name: "Vendor Management", pass: false },
              { name: "Change Management", pass: true },
            ].map((c) => (
              <div
                key={c.name}
                className="flex items-center justify-between py-2 px-3 rounded-md border border-border"
              >
                <span className="text-[14px] text-foreground">{c.name}</span>
                <span
                  className={`inline-flex items-center gap-1 text-[12px] font-semibold px-2 py-1 rounded ${
                    c.pass ? "bg-teal/10 text-teal" : "bg-danger/10 text-danger"
                  }`}
                >
                  {c.pass ? <Check size={12} /> : <X size={12} />}
                  {c.pass ? "Passing" : "Needs Work"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="md:hidden mt-3 text-center text-[12px] text-text-secondary">
        Tap to see full score →
      </p>
    </div>
  );
}
