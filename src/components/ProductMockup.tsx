import { Check, X } from "lucide-react";

export function ProductMockup() {
  return (
    <div className="w-full max-w-[520px] mx-auto md:rotate-[-3deg] transition-transform">
      <div className="rounded-[12px] border border-border bg-white overflow-hidden">
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
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-[13px] font-semibold uppercase tracking-wider text-foreground/60">
              Readiness Score
            </span>
            <span className="text-[12px] text-foreground/50 font-mono">v3.1.0</span>
          </div>

          <div className="flex items-end gap-3 mb-4">
            <span className="text-[56px] leading-none font-bold text-teal">67%</span>
            <span className="text-[14px] text-foreground/60 mb-2">19 of 29 controls passing</span>
          </div>

          <div className="h-2 w-full bg-[#F1F5F9] rounded-full overflow-hidden mb-6">
            <div className="h-full bg-teal cg-fill-anim rounded-full" />
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
                    c.pass
                      ? "bg-teal/10 text-teal"
                      : "bg-danger/10 text-danger"
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
    </div>
  );
}
