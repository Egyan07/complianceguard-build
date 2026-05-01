import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FadeUp } from "./FadeUp";

const FAQS = [
  {
    q: "Is this really audit-ready, or is it a toy?",
    a: "Every evidence pack is mapped to the AICPA Trust Services Criteria — the exact framework SOC 2 auditors use. The PDF, CSV, and JSON exports follow the format used in successful SOC 2 Type I and Type II reports. You hand it to your auditor; they don't ask you to reformat anything.",
  },
  {
    q: "What if I need integrations Vanta has?",
    a: "Then you should buy Vanta. ComplianceGuard is built for teams who don't have $10K to spend on an auditor marketplace and 40 SaaS integrations they won't use. If your compliance gap is 'I need a Slack integration', we are not the right tool. If your gap is 'I need an evidence pack and I refuse to pay $10K for one', we are.",
  },
  {
    q: "Why should I trust a one-person project with my compliance?",
    a: "You shouldn't trust me — you should trust the code. ComplianceGuard is BSL 1.1 source-available: read every line that touches your machine. The crypto uses Ed25519 signing and HKDF-derived Fernet encryption (industry standard). 311+ tests run on every commit. And critically: we never receive your evidence, so even if I disappeared tomorrow, your data is on your disk, not on a server I control.",
  },
  {
    q: "Can't I just collect evidence manually in a spreadsheet?",
    a: "You can. Most first SOC 2 audits start that way. ComplianceGuard doesn't replace that process — it automates the collection part. Instead of manually checking firewall settings, running PowerShell scripts, and copying output into a spreadsheet, ComplianceGuard reads it all in 30 seconds and formats it exactly how your auditor needs it.",
  },
  {
    q: "What happens to my data?",
    a: "Nothing. It stays on your machine. ComplianceGuard reads from your OS and your AWS account, writes to a local SQLite database, and exports a PDF when you ask. There is no upload step. There is no telemetry. There is no 'sync to cloud' unless you explicitly enable the optional Pro fleet dashboard.",
  },
  {
    q: "How do I know my AWS credentials are safe?",
    a: "Credentials are encrypted at rest using a Fernet key derived via HKDF-SHA256 from your local SECRET_KEY. They never leave your machine and are decrypted in-memory only when collecting evidence. Source code is open so you can verify this yourself — see app/core/license.py and the evidence collector.",
  },
  {
    q: "What if I outgrow it?",
    a: "Switch to Vanta or Drata when you can afford the $10K. We'll consider that a win — we got you to the point where you have $10K for compliance tooling. The evidence pack format is auditor-standard, so nothing is locked in.",
  },
];

export function HomepageFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-surface py-24">
      <div className="container-cg max-w-3xl">
        <FadeUp>
          <p className="eyebrow mb-4">FAQ</p>
          <h2 className="text-[32px] md:text-[40px] font-bold text-navy leading-tight">
            The objections we get most.
          </h2>
        </FadeUp>

        <div className="mt-10 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <FadeUp key={f.q} delay={i * 0.03}>
                <div className="border border-border rounded-[12px] bg-white overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-surface/50 transition-colors"
                  >
                    <span className="text-[16px] font-semibold text-navy">{f.q}</span>
                    <span className="shrink-0 text-teal">
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-[15px] text-text-secondary leading-[1.7]">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
