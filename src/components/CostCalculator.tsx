import { useEffect, useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { FadeUp } from "./FadeUp";

const CG_ANNUAL = 588; // $49 * 12

const formatCurrency = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function useCountUp(target: number) {
  const [value, setValue] = useState(target);
  const rafRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (rafRef.current) clearInterval(rafRef.current);
    const start = value;
    const diff = target - start;
    if (diff === 0) return;
    const steps = 12;
    const stepSize = diff / steps;
    let i = 0;
    rafRef.current = setInterval(() => {
      i++;
      if (i >= steps) {
        setValue(target);
        if (rafRef.current) clearInterval(rafRef.current);
      } else {
        setValue(Math.round(start + stepSize * i));
      }
    }, 50);
    return () => {
      if (rafRef.current) clearInterval(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return value;
}

export function CostCalculator() {
  const [team, setTeam] = useState(5);

  const clamp = (n: number) => Math.max(1, Math.min(200, Math.floor(n || 1)));
  const setTeamClamped = (n: number) => setTeam(clamp(n));

  const vantaTarget = Math.max(10000, team * 500);
  const drataTarget = Math.max(10000, team * 600);
  const cgTarget = CG_ANNUAL;
  const savingsTarget = Math.max(0, vantaTarget - cgTarget);

  const vanta = useCountUp(vantaTarget);
  const drata = useCountUp(drataTarget);
  const cg = useCountUp(cgTarget);
  const savings = useCountUp(savingsTarget);

  return (
    <section className="bg-background py-24">
      <div className="container-cg">
        <FadeUp>
          <p className="eyebrow mb-4">The Math</p>
          <h2 className="text-[32px] md:text-[40px] font-bold text-navy max-w-3xl leading-tight">
            See exactly how much you're overpaying.
          </h2>
          <p className="mt-6 text-[18px] text-text-secondary max-w-2xl">
            Enter your team size. See what Vanta and Drata would charge you — versus what ComplianceGuard costs.
          </p>
        </FadeUp>

        <FadeUp delay={0.05}>
          <div
            className="mt-12 mx-auto bg-white border border-border rounded-[12px] p-6 md:p-12"
            style={{ maxWidth: 720 }}
          >
            {/* Input */}
            <label className="block text-[14px] font-semibold text-navy text-center">
              How many engineers on your team?
            </label>

            <div className="mt-5 flex items-center justify-center gap-4">
              <button
                type="button"
                aria-label="Decrease team size"
                onClick={() => setTeamClamped(team - 1)}
                className="w-10 h-10 rounded-[8px] border border-border text-navy flex items-center justify-center hover:bg-surface transition-colors"
              >
                <Minus size={18} />
              </button>
              <input
                type="number"
                min={1}
                max={200}
                value={team}
                onChange={(e) => setTeamClamped(parseInt(e.target.value, 10))}
                className="w-24 text-center text-[32px] font-bold text-navy bg-transparent border-0 focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                type="button"
                aria-label="Increase team size"
                onClick={() => setTeamClamped(team + 1)}
                className="w-10 h-10 rounded-[8px] border border-border text-navy flex items-center justify-center hover:bg-surface transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>

            <input
              type="range"
              min={1}
              max={200}
              value={team}
              onChange={(e) => setTeamClamped(parseInt(e.target.value, 10))}
              className="cg-range mt-6 w-full"
              aria-label="Team size slider"
            />

            {/* Results */}
            <div className="mt-10 border-t border-border">
              {[
                { name: "Vanta", sub: "per-seat, billed annually", value: vanta, color: "#C0392B" },
                { name: "Drata", sub: "per-seat, billed annually", value: drata, color: "#C0392B" },
                { name: "ComplianceGuard", sub: "flat rate, all team sizes", value: cg, color: "#1A8C5F", suffix: "/year" },
              ].map((row) => (
                <div
                  key={row.name}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-5 border-b border-border"
                >
                  <div>
                    <div className="text-navy font-semibold text-[16px]">{row.name}</div>
                    <div className="text-[13px] text-text-secondary">{row.sub}</div>
                  </div>
                  <div className="text-[28px] font-bold" style={{ color: row.color }}>
                    {formatCurrency(row.value)}
                    {row.suffix ? <span className="text-[16px] font-semibold">{row.suffix}</span> : null}
                  </div>
                </div>
              ))}
            </div>

            {/* Savings callout */}
            <div
              className="mt-6 rounded-[8px] p-4 text-[16px] text-navy"
              style={{ background: "#F0FDF4", border: "1px solid #BBF7D0" }}
            >
              With ComplianceGuard, a team of <span className="font-semibold">{team}</span> saves{" "}
              <span className="font-bold text-teal">{formatCurrency(savings)}</span> per year compared to Vanta.
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3">
            <a
              href="https://github.com/Egyan07/ComplianceGuard/releases/latest"
              className="btn-primary"
            >
              Start Free — No Credit Card
            </a>
            <p className="text-[13px] text-text-secondary">
              Pro plan is $49/month flat. Same price for 1 engineer or 200.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
