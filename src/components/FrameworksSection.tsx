import { FadeUp } from "./FadeUp";

const frameworks = [
  {
    n: "29",
    title: "Trust Services Criteria",
    body: "The standard for enterprise SaaS deals. All 29 TSC controls scored automatically.",
    name: "SOC 2 Type II",
  },
  {
    n: "47",
    title: "Annex A Controls",
    body: "All 14 Annex A domains (A.5–A.18) mapped and evaluated. Required for European enterprise contracts.",
    name: "ISO 27001:2013",
  },
  {
    n: "47",
    title: "Security Safeguards",
    body: "All five 45 CFR Part 164 sections including required and addressable safeguards. For healthcare and health-tech clients.",
    name: "HIPAA Security Rule",
  },
];

export function FrameworksSection() {
  return (
    <section className="bg-background py-24">
      <div className="container-cg">
        <FadeUp>
          <p className="eyebrow mb-4 text-center">Frameworks</p>
          <h2 className="text-center text-[32px] md:text-[40px] font-bold text-navy leading-tight">
            Three frameworks. One tool.
          </h2>
          <p className="mt-6 text-[18px] text-text-secondary max-w-[600px] mx-auto text-center leading-[1.6]">
            ComplianceGuard maps evidence directly to the controls auditors
            check. Whether you need SOC 2 for enterprise deals, ISO 27001 for
            European contracts, or HIPAA for healthcare clients — the same
            OS-level scan covers all three.
          </p>
        </FadeUp>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {frameworks.map((f, i) => (
            <FadeUp key={f.name} delay={i * 0.06}>
              <div className="bg-white border border-border rounded-[12px] p-8 h-full flex flex-col">
                <div className="text-[48px] font-bold text-teal leading-none">{f.n}</div>
                <h3 className="mt-4 text-[16px] font-semibold text-navy">{f.title}</h3>
                <p className="mt-1 text-[13px] uppercase tracking-wider text-text-secondary">{f.name}</p>
                <p className="mt-4 text-[14px] text-text-secondary leading-[1.6] flex-1">{f.body}</p>
                <span className="mt-6 inline-flex self-start bg-teal text-white text-[12px] font-semibold px-2 py-1 rounded-[4px]">
                  Available Now
                </span>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
