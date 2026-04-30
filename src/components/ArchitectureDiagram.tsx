import { Monitor, Cloud, Database, FileText, Lock } from "lucide-react";
import { FadeUp } from "./FadeUp";

/**
 * Animated architecture diagram showing the data flow:
 *   Your Machine + AWS  →  Local DB  →  PDF Report
 * with a "nothing leaves your network" boundary.
 */
export function ArchitectureDiagram() {
  return (
    <section className="bg-surface py-24">
      <div className="container-cg">
        <FadeUp>
          <p className="eyebrow mb-4">Architecture</p>
          <h2 className="text-[32px] md:text-[40px] font-bold text-navy max-w-3xl leading-tight">
            Nothing leaves your network.<br />Ever.
          </h2>
          <p className="mt-6 text-[18px] text-text-secondary max-w-2xl">
            Every byte of evidence stays inside the boundary you control. We don't have a database for your data, because we never see it.
          </p>
        </FadeUp>

        <FadeUp delay={0.05}>
          <div
            className="mt-12 mx-auto bg-white rounded-[12px] p-6 md:p-10 relative overflow-hidden"
            style={{ maxWidth: 980, border: "2px dashed #1A8C5F" }}
          >
            <div
              className="absolute top-3 right-4 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-teal"
            >
              <Lock size={12} />
              Your Network Boundary
            </div>

            <div className="grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-6 md:gap-2 items-center mt-6">
              {/* Sources column */}
              <div className="space-y-3">
                <Node Icon={Monitor} label="Your Machine" sub="Registry · configs · firewall" />
                <Node Icon={Cloud} label="Your AWS Account" sub="CloudTrail · IAM · S3" />
              </div>

              <Arrow />

              {/* Local processing */}
              <div>
                <Node
                  Icon={Database}
                  label="Local SQLite DB"
                  sub="Encrypted at rest"
                  highlight
                />
              </div>

              <Arrow />

              {/* Output */}
              <div>
                <Node Icon={FileText} label="PDF Evidence Pack" sub="For your auditor" />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              {[
                { stat: "0", label: "bytes uploaded to our servers" },
                { stat: "100%", label: "data stays on your machine" },
                { stat: "AES-256", label: "credential encryption" },
              ].map((s) => (
                <div key={s.label} className="border-t border-border pt-4">
                  <div className="text-[24px] font-bold text-navy">{s.stat}</div>
                  <p className="text-[12px] text-text-secondary mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function Node({
  Icon,
  label,
  sub,
  highlight,
}: {
  Icon: typeof Monitor;
  label: string;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <div
      className="rounded-[8px] p-4 text-center bg-white"
      style={{
        border: `1px solid ${highlight ? "#1A8C5F" : "#E2E8F0"}`,
        boxShadow: highlight ? "0 0 0 4px rgba(26,140,95,0.08)" : undefined,
      }}
    >
      <div
        className="w-10 h-10 mx-auto rounded-md flex items-center justify-center"
        style={{ background: highlight ? "#1A8C5F" : "#1B3A6B", color: "#fff" }}
      >
        <Icon size={20} />
      </div>
      <div className="mt-3 text-[14px] font-semibold text-navy">{label}</div>
      <div className="text-[11px] text-text-secondary mt-1">{sub}</div>
    </div>
  );
}

function Arrow() {
  return (
    <div className="hidden md:flex flex-col items-center justify-center" aria-hidden="true">
      <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
        <line x1="0" y1="10" x2="50" y2="10" stroke="#1A8C5F" strokeWidth="2" strokeDasharray="4 4">
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-16"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </line>
        <polygon points="50,4 60,10 50,16" fill="#1A8C5F" />
      </svg>
    </div>
  );
}
