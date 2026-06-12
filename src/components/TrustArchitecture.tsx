import { Monitor, Cloud, Database, FileCheck, Lock, Award, KeyRound, Code2 } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

/**
 * Trust band: the data-sovereignty architecture, visualized — every node of
 * the evidence pipeline lives inside the customer's network boundary.
 * Merges the old ArchitectureDiagram + Trust sections.
 */

function Node({
  icon: Icon,
  title,
  caption,
  accent = false,
}: {
  icon: typeof Monitor;
  title: string;
  caption: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`card-snow p-6 text-center ${accent ? "border-azure/40" : ""}`}
      style={
        accent ? { boxShadow: "0 0 0 1px rgba(0,113,227,0.25), var(--shadow-card)" } : undefined
      }
    >
      <div
        className={`mx-auto w-11 h-11 rounded-[12px] flex items-center justify-center ${
          accent ? "bg-azure text-snow" : "bg-ink text-snow"
        }`}
      >
        <Icon size={20} strokeWidth={2} />
      </div>
      <p className="mt-4 text-[15px] font-semibold text-ink">{title}</p>
      <p className="mt-1 text-[13px] text-ink-3">{caption}</p>
    </div>
  );
}

/** Animated connector — drifting dashes flowing toward the next node. */
function FlowConnector({ vertical = false }: { vertical?: boolean }) {
  return (
    <svg
      aria-hidden
      width={vertical ? 2 : "100%"}
      height={vertical ? 28 : 2}
      className={vertical ? "mx-auto" : "self-center"}
      style={{ overflow: "visible" }}
    >
      <line
        x1={0}
        y1={vertical ? 0 : 1}
        x2={vertical ? 0 : "100%"}
        y2={vertical ? 28 : 1}
        stroke="var(--azure)"
        strokeWidth={2}
        strokeDasharray="6 6"
        className="cg-dash-flow"
        opacity={0.55}
      />
    </svg>
  );
}

const stats = [
  { stat: "0", label: "bytes uploaded to our servers" },
  { stat: "100%", label: "of evidence stays on your machine" },
  { stat: "AES-256", label: "credential encryption at rest" },
];

const trust = [
  {
    icon: Award,
    title: "AICPA TSC-mapped",
    body: "Every control mapped to the Trust Services Criteria — the exact format auditors accept for SOC 2 Type I and Type II.",
  },
  {
    icon: KeyRound,
    title: "Offline-verified licensing",
    body: "Ed25519 public-key license verification with no license server and no phone-home — coherent with the air-gap story.",
  },
  {
    icon: Code2,
    title: "Source-available, BSL 1.1",
    body: "You can read the code that reads your system. Every line of evidence collection and scoring logic is auditable.",
  },
];

export function TrustArchitecture() {
  return (
    <section className="bg-fog py-24 md:py-32">
      <div className="container-cg">
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-4">Architecture</p>
          <h2 className="display-2">
            Nothing leaves your network.
            <br />
            Ever.
          </h2>
          <p className="mt-6 body-lg text-ink-2 max-w-2xl">
            Every byte of evidence stays inside the boundary you control. We don&rsquo;t have a
            database for your data, because we never see it.
          </p>
        </Reveal>

        {/* The boundary */}
        <Reveal delay={0.1} className="mt-14">
          <div
            className="relative rounded-[28px] p-7 md:p-12"
            style={{ border: "2px dashed rgba(0,113,227,0.4)" }}
          >
            <span className="absolute -top-3 left-8 inline-flex items-center gap-1.5 bg-fog px-3 text-[12px] font-semibold uppercase tracking-wider text-azure">
              <Lock size={12} strokeWidth={2.5} aria-hidden />
              Your network boundary
            </span>

            <div className="grid md:grid-cols-[1fr_24px_1fr_24px_1fr] gap-4 md:gap-2 items-center">
              <div className="flex flex-col gap-4">
                <Node icon={Monitor} title="Your machine" caption="Registry · configs · firewall" />
                <Node icon={Cloud} title="Your AWS account" caption="IAM · S3 · security groups" />
              </div>
              <div className="hidden md:block">
                <FlowConnector />
              </div>
              <div className="md:hidden">
                <FlowConnector vertical />
              </div>
              <Node
                icon={Database}
                title="Local evidence store"
                caption="SQLite · encrypted at rest"
                accent
              />
              <div className="hidden md:block">
                <FlowConnector />
              </div>
              <div className="md:hidden">
                <FlowConnector vertical />
              </div>
              <Node icon={FileCheck} title="PDF evidence pack" caption="For your auditor" />
            </div>

            <div className="mt-10 pt-8 border-t border-hairline grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              {stats.map((s) => (
                <div key={s.label}>
                  <p
                    className="text-[32px] font-semibold text-ink leading-none"
                    style={{ fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}
                  >
                    {s.stat}
                  </p>
                  <p className="mt-2 text-[14px] text-ink-2">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Trust pillars */}
        <RevealGroup className="mt-16 grid md:grid-cols-3 gap-5">
          {trust.map((t) => (
            <RevealItem key={t.title}>
              <div className="card-snow card-hover p-7 h-full">
                <div className="w-10 h-10 rounded-[12px] bg-azure flex items-center justify-center text-snow">
                  <t.icon size={20} strokeWidth={2} />
                </div>
                <h3 className="mt-5 text-[17px] font-semibold text-ink">{t.title}</h3>
                <p className="mt-2 text-[14px] text-ink-2 leading-[1.65]">{t.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
