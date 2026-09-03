import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { AnimatedStat } from "./AnimatedStatValue";

const stats = [
  {
    stat: "123",
    label: "Controls scored across SOC 2, ISO 27001, and HIPAA in a single collection pass",
  },
  {
    stat: "0",
    label: "Bytes of evidence leave your network unless you explicitly choose to sync",
  },
  {
    stat: "30 sec",
    label: "From first scan to a per-control readiness score on the machine itself",
  },
];

/**
 * The positioning wedge: cloud platforms can't see endpoint evidence.
 * Dark band — merged from ChapterTheGap + the old Problem section.
 */
export function TheGap() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink text-snow py-20 md:py-28">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 12% 0%, rgba(0,113,227,0.20), transparent 60%), radial-gradient(ellipse 45% 50% at 90% 100%, rgba(60,70,177,0.14), transparent 60%)",
        }}
      />
      <div className="container-cg relative">
        <Reveal>
          <h2 className="display-2 !text-snow max-w-3xl">
            Your cloud is covered.
            <br />
            <span className="text-snow/50">Your endpoints are not.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-7 body-lg text-snow/70 max-w-2xl">
            Cloud compliance platforms see your AWS account. They cannot see the password policy,
            disk encryption, firewall rules, or event logs on the machines your business actually
            runs on. That evidence lives on the endpoint, and auditors ask for it.
            ComplianceGuard lives there too.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid md:grid-cols-3 gap-5">
          {stats.map((c) => (
            <RevealItem key={c.stat}>
              <div className="glass glass-edge card-hover rounded-2xl p-8 h-full">
                <div
                  className="text-[44px] font-semibold leading-none text-snow"
                  style={{ fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}
                >
                  <AnimatedStat value={c.stat} />
                </div>
                <p className="mt-4 text-[15px] leading-[1.6] text-snow/60">{c.label}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
