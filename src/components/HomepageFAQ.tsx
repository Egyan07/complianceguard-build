import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Reveal } from "./Reveal";

const FAQS = [
  {
    q: "Which frameworks does ComplianceGuard cover?",
    a: "Three, from a single collection pass: SOC 2 Type II (29 controls across the AICPA Trust Services Criteria), ISO 27001 (47 scored controls spanning all 14 Annex A domains), and the HIPAA Security Rule (47 safeguards across all five 45 CFR Part 164 sections). The same OS-level evidence feeds all three.",
  },
  {
    q: "Will auditors accept the evidence pack?",
    a: "Every evidence pack is mapped control-by-control to the AICPA Trust Services Criteria — the exact framework SOC 2 auditors work from. The PDF export follows the format used in successful SOC 2 Type I and Type II audits, so there's no reformatting and no back-and-forth. A formal SOC 2 report still requires a licensed CPA firm; ComplianceGuard gets you to that engagement prepared.",
  },
  {
    q: "How is this different from Vanta or Drata?",
    a: "They scan cloud infrastructure; ComplianceGuard scans the machines themselves. Password policies, firewall rules, disk encryption, event logs — that evidence lives on the endpoint, not in AWS. Many teams run both: a cloud platform for SaaS integrations, ComplianceGuard for the endpoint evidence those platforms structurally can't see.",
  },
  {
    q: "Why should I trust it with my compliance?",
    a: "Don't trust claims — read the code. ComplianceGuard is source-available under BSL 1.1: every line that touches your machine is auditable. Licensing uses offline Ed25519 public-key verification, credentials are encrypted with HKDF-derived Fernet keys, and ~568 tests run on every commit. Most importantly, the architecture means we never receive your evidence — it stays on your disk, under your control.",
  },
  {
    q: "Can't I just collect evidence manually in a spreadsheet?",
    a: "You can — most first SOC 2 audits start that way. ComplianceGuard automates the collection: instead of checking firewall settings by hand, running scripts, and copying output into a spreadsheet, it reads everything in about 30 seconds and formats it the way your auditor expects.",
  },
  {
    q: "What happens to my data?",
    a: "It stays on your machine. ComplianceGuard reads from your OS and your AWS account, writes to a local SQLite database, and exports a PDF when you ask. There is no upload step and no telemetry. Evidence only moves if you explicitly enable the optional multi-machine dashboard sync.",
  },
  {
    q: "How are my AWS credentials protected?",
    a: "Credentials are encrypted at rest using a Fernet key derived via HKDF-SHA256 from your local secret key. They are decrypted in memory only at evidence-collection time and are never transmitted anywhere. The source code is available, so you can verify this yourself.",
  },
  {
    q: "What does ComplianceGuard intentionally leave out?",
    a: "No auditor marketplace — use whichever firm you want. No 40-app integration catalog — the focus is evidence, not workflow chrome. And no lock-in: evidence is stored locally in standard formats, so you can export it and switch tools at any time.",
  },
];

export function HomepageFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-fog py-24 md:py-32">
      <div className="container-cg max-w-3xl">
        <Reveal>
          <p className="eyebrow mb-4">FAQ</p>
          <h2 className="display-2">Common questions.</h2>
        </Reveal>

        <div className="mt-10 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={Math.min(i * 0.04, 0.2)}>
                <div className="card-snow overflow-hidden">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-fog/60 transition-colors"
                    >
                      <span className="text-[16px] font-semibold text-ink">{f.q}</span>
                      <span className="shrink-0 text-azure" aria-hidden>
                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                      </span>
                    </button>
                  </h3>
                  <div
                    className="grid transition-[grid-template-rows] duration-300"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      transitionTimingFunction: "var(--ease-expo)",
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-[15px] text-ink-2 leading-[1.7]">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
