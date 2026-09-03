import { Lock, Award, KeyRound, Code2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { EvidenceFlow } from "./EvidenceFlow";

/**
 * Trust band: the data-sovereignty architecture, visualized — every source of
 * evidence streams inward to a local store that never leaves the customer's
 * network boundary.
 */

const stats = [
  { stat: "0", label: "bytes uploaded to our servers" },
  { stat: "100%", label: "of evidence stays on your machine" },
  { stat: "AES-256", label: "credential encryption at rest" },
];

const trust = [
  {
    n: "01",
    icon: Award,
    title: "AICPA TSC-mapped",
    body: "Every control mapped to the Trust Services Criteria, the exact format auditors accept for SOC 2 Type I and Type II.",
  },
  {
    n: "02",
    icon: KeyRound,
    title: "Offline-verified licensing",
    body: "Ed25519 public-key license verification with no license server and no phone-home, which fits the air-gap story.",
  },
  {
    n: "03",
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
            className="relative rounded-[20px] p-7 md:p-12"
            style={{ border: "2px dashed rgba(0,113,227,0.4)" }}
          >
            <span className="absolute -top-3 left-8 inline-flex items-center gap-1.5 bg-fog px-3 text-[12px] font-semibold uppercase tracking-wider text-azure">
              <Lock size={12} strokeWidth={2.5} aria-hidden />
              Your network boundary
            </span>

            <div className="pt-4 pb-2">
              <EvidenceFlow />
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

        {/* Trust pillars — numbered rows, distinct from the icon-card grids */}
        <div className="mt-16 border-t border-hairline">
          {trust.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.05}>
              <div className="flex items-start gap-5 py-7 border-b border-hairline">
                <span aria-hidden className="font-mono text-[13px] text-ink-3 pt-1 w-9 shrink-0">
                  {t.n}
                </span>
                <t.icon size={19} className="text-azure shrink-0 mt-1" strokeWidth={2} />
                <div>
                  <h3 className="text-[18px] font-semibold text-ink">{t.title}</h3>
                  <p className="mt-1.5 text-[15px] text-ink-2 leading-[1.65] max-w-2xl">
                    {t.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
