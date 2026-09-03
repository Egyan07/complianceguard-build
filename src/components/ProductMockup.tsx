import { Check, X } from "lucide-react";

const SCORE = 67;
const RADIUS = 58;
const STROKE = 9;
const CIRC = 2 * Math.PI * RADIUS;
const OFFSET = CIRC * (1 - SCORE / 100);
const AZURE = "#0071e3";

export function ProductMockup() {
  return (
    <div className="w-full mx-auto" id="product">
      <div
        className="overflow-hidden bg-snow"
        style={{
          borderRadius: 22,
          border: "1px solid #e8e8ed",
        }}
      >
        {/* Window chrome */}
        <div
          className="flex items-center gap-2 px-4 py-3 border-b"
          style={{ background: "#f5f5f7", borderColor: "#e8e8ed" }}
        >
          <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
          <span
            className="mx-auto text-[12px] font-medium"
            style={{ color: "#86868b", letterSpacing: "-0.003em" }}
          >
            ComplianceGuard &mdash; SOC 2 readiness
          </span>
          <span className="text-[11px] font-mono" style={{ color: "#86868b" }}>
            v3.9.0
          </span>
        </div>

        <div className="p-7 md:p-10">
          {/* Headline row */}
          <div className="flex items-baseline justify-between mb-7">
            <div>
              <p className="text-[13px] font-medium" style={{ color: "#86868b", letterSpacing: 0 }}>
                Readiness score
              </p>
              <p
                className="text-[28px] font-semibold text-ink"
                style={{ letterSpacing: "-0.016em" }}
              >
                SOC 2 Type II &middot; 54 controls
              </p>
            </div>
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium"
              style={{
                background: "rgba(0, 113, 227, 0.08)",
                color: AZURE,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: AZURE }} />
              Scanned 2 min ago
            </span>
          </div>

          {/* Gauge */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-10 mb-8">
            <div className="relative shrink-0 mx-auto md:mx-0" style={{ width: 160, height: 160 }}>
              <svg
                width={160}
                height={160}
                viewBox="0 0 160 160"
                style={{ transform: "rotate(-90deg)" }}
                aria-label={`SOC 2 readiness ${SCORE}%`}
              >
                <circle
                  cx={80}
                  cy={80}
                  r={RADIUS}
                  stroke="#e8e8ed"
                  strokeWidth={STROKE}
                  fill="none"
                />
                <circle
                  cx={80}
                  cy={80}
                  r={RADIUS}
                  stroke={AZURE}
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
                <span
                  className="text-[56px] leading-none font-semibold text-ink"
                  style={{ letterSpacing: "-0.022em", fontVariantNumeric: "tabular-nums" }}
                >
                  {SCORE}
                  <span className="text-[24px] font-normal" style={{ color: "#86868b" }}>
                    %
                  </span>
                </span>
              </div>
            </div>
            <div className="mt-6 md:mt-0 text-center md:text-left">
              <p
                className="text-[24px] font-semibold text-ink"
                style={{ letterSpacing: "-0.016em" }}
              >
                36 of 54 controls passing.
              </p>
              <p
                className="mt-2 text-[17px]"
                style={{ color: "#707070", letterSpacing: "-0.003em" }}
              >
                18 need attention before audit. Estimated 4&ndash;6 hours of remediation work, fully
                documented in your evidence pack.
              </p>
            </div>
          </div>

          {/* Control rows */}
          <div className="space-y-2">
            {[
              { name: "CC6.1 — Logical Access", pass: true },
              { name: "CC6.5 — Network Security", pass: true },
              { name: "CC7.1 — Event Logging", pass: false },
              { name: "CC7.2 — Vulnerability Mgmt", pass: true },
              { name: "C1.2 — Data Protection", pass: false },
              { name: "A1.4 — Backup & Recovery", pass: true },
            ].map((c) => (
              <div
                key={c.name}
                className="flex items-center justify-between py-3 px-4 rounded-[14px]"
                style={{ background: "#f5f5f7" }}
              >
                <span
                  className="text-[14px] font-medium text-ink"
                  style={{ letterSpacing: "-0.003em" }}
                >
                  {c.name}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1 rounded-full"
                  style={
                    c.pass
                      ? { color: "var(--success)", background: "rgba(21, 115, 71, 0.08)" }
                      : { color: "var(--warn)", background: "rgba(182, 68, 0, 0.08)" }
                  }
                >
                  {c.pass ? (
                    <Check size={12} strokeWidth={2.5} />
                  ) : (
                    <X size={12} strokeWidth={2.5} />
                  )}
                  {c.pass ? "Pass" : "Needs work"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
