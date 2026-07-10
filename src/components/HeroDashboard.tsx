import { Fragment, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, X, RotateCw } from "lucide-react";
import { EASE_EXPO } from "@/lib/motion";

/**
 * HeroDashboard — the real ComplianceGuard readiness view, brought to life,
 * and interactive: the gauge fills, the score counts up, the "passing" bar
 * fills, and the control rows go from "Scanning…" to Pass / Needs-work. A
 * "Run sample scan" control replays the whole pass. It communicates the
 * product because it *is* the product.
 *
 * The isometric angle/depth is applied by the `.hero-deck` wrapper in Hero.
 * Reduced motion renders the resolved state immediately (no scanning phase).
 */

const SCORE = 67;
const RADIUS = 58;
const STROKE = 9;
const CIRC = 2 * Math.PI * RADIUS;
const OFFSET = CIRC * (1 - SCORE / 100);
const AZURE = "#0071e3";
const SCAN_MS = 1700;

const CONTROLS = [
  { name: "CC6.1 — Logical Access", pass: true },
  { name: "CC6.5 — Network Security", pass: true },
  { name: "CC7.1 — Event Logging", pass: false },
  { name: "CC7.2 — Vulnerability Mgmt", pass: true },
  { name: "C1.2 — Data Protection", pass: false },
  { name: "A1.4 — Backup & Recovery", pass: true },
] as const;

/** Count up to `to` once on mount; respects reduced motion. */
function useCountUp(to: number, duration = 1400) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? to : 0);
  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, reduce]);
  return n;
}

function Gauge() {
  const score = useCountUp(SCORE);
  return (
    <div className="relative shrink-0 mx-auto md:mx-0" style={{ width: 150, height: 150 }}>
      <svg
        width={150}
        height={150}
        viewBox="0 0 160 160"
        style={{ transform: "rotate(-90deg)" }}
        aria-label={`SOC 2 readiness ${SCORE}%`}
      >
        <circle cx={80} cy={80} r={RADIUS} stroke="#e8e8ed" strokeWidth={STROKE} fill="none" />
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
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-[52px] leading-none font-semibold text-ink"
          style={{ letterSpacing: "-0.022em", fontVariantNumeric: "tabular-nums" }}
        >
          {score}
          <span className="text-[22px] font-normal" style={{ color: "#86868b" }}>
            %
          </span>
        </span>
      </div>
    </div>
  );
}

/** Per-row status: neutral "Scanning…" while the pass runs, then the verdict. */
function StatusBadge({ pass, scanning }: { pass: boolean; scanning: boolean }) {
  if (scanning) {
    return (
      <span
        className="inline-flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1 rounded-full"
        style={{ color: "#86868b", background: "rgba(0,0,0,0.04)" }}
      >
        <motion.span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "#86868b" }}
          animate={{ opacity: [1, 0.25, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />
        Scanning…
      </span>
    );
  }
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: EASE_EXPO }}
      className="inline-flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1 rounded-full"
      style={
        pass
          ? { color: "var(--success)", background: "rgba(21, 115, 71, 0.08)" }
          : { color: "var(--warn)", background: "rgba(182, 68, 0, 0.08)" }
      }
    >
      {pass ? <Check size={12} strokeWidth={2.5} /> : <X size={12} strokeWidth={2.5} />}
      {pass ? "Pass" : "Needs work"}
    </motion.span>
  );
}

export function HeroDashboard() {
  const reduce = useReducedMotion();
  const [runKey, setRunKey] = useState(0);
  const [scanning, setScanning] = useState(!reduce);

  // Each run: show "Scanning…" until the gauge/score settle, then resolve.
  useEffect(() => {
    if (reduce) {
      setScanning(false);
      return;
    }
    setScanning(true);
    const t = setTimeout(() => setScanning(false), SCAN_MS);
    return () => clearTimeout(t);
  }, [runKey, reduce]);

  return (
    <div className="w-full">
      <div
        className="overflow-hidden bg-snow"
        style={{ borderRadius: 20, border: "1px solid #e8e8ed", boxShadow: "var(--shadow-float)" }}
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
            v3.3.1
          </span>
        </div>

        <div className="p-6 md:p-8 text-left">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-6">
            <div>
              <p className="text-[13px] font-medium" style={{ color: "#86868b" }}>
                Readiness score
              </p>
              <p
                className="text-[22px] font-semibold text-ink"
                style={{ letterSpacing: "-0.016em" }}
              >
                SOC 2 Type II &middot; 54 controls
              </p>
            </div>
            <button
              type="button"
              onClick={() => setRunKey((k) => k + 1)}
              disabled={scanning}
              className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[12px] font-medium transition-colors disabled:cursor-default"
              style={{ background: "rgba(0, 113, 227, 0.08)", color: AZURE }}
              aria-label="Run a sample scan"
            >
              {scanning ? (
                <>
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: AZURE }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  Scanning…
                </>
              ) : (
                <>
                  <RotateCw size={12} strokeWidth={2.5} />
                  Run sample scan
                </>
              )}
            </button>
          </div>

          {/* Animated results — re-keyed per run so the pass replays */}
          <Fragment key={runKey}>
            <div className="flex flex-col md:flex-row md:items-center md:gap-9 mb-7">
              <Gauge />
              <div className="mt-5 md:mt-0 flex-1">
                <p
                  className="text-[22px] font-semibold text-ink"
                  style={{ letterSpacing: "-0.016em" }}
                >
                  36 of 54 controls passing.
                </p>
                <div
                  className="mt-3 h-2 w-full rounded-full overflow-hidden"
                  style={{ background: "#e8e8ed" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: AZURE }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(36 / 54) * 100}%` }}
                    transition={{ duration: 1.4, ease: EASE_EXPO, delay: 0.2 }}
                  />
                </div>
                <p className="mt-3 text-[15px]" style={{ color: "#707070" }}>
                  18 need attention before audit &mdash; each with a documented remediation step.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {CONTROLS.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE_EXPO, delay: i * 0.07 }}
                  className="flex items-center justify-between py-2.5 px-4 rounded-[12px]"
                  style={{ background: "#f5f5f7" }}
                >
                  <span
                    className="text-[14px] font-medium text-ink"
                    style={{ letterSpacing: "-0.003em" }}
                  >
                    {c.name}
                  </span>
                  <StatusBadge pass={c.pass} scanning={scanning} />
                </motion.div>
              ))}
            </div>
          </Fragment>
        </div>
      </div>
    </div>
  );
}
