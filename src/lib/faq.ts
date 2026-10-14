/** Homepage FAQ content — shared by the HomepageFAQ component and the
 * route head's FAQPage JSON-LD so copy and schema never diverge. */
export const FAQS = [
  {
    q: "Which frameworks does ComplianceGuard cover?",
    a: "Four, from a single collection pass: SOC 2 (43 criteria from the 2017 Trust Services Criteria), ISO/IEC 27001:2022 (all 93 Annex A controls), the HIPAA Security Rule (47 safeguards), and GDPR (38 obligations). The same OS-level evidence feeds all four, each scored by evidence coverage rather than a checkbox claim of compliance.",
  },
  {
    q: "Will auditors accept the evidence pack?",
    a: "Every evidence pack is mapped criterion-by-criterion to the AICPA Trust Services Criteria, the exact framework SOC 2 auditors work from. The PDF export is organized the way auditors expect, so there's no reformatting and no back-and-forth. A formal SOC 2 report still requires a licensed CPA firm; ComplianceGuard gets you to that engagement prepared.",
  },
  {
    q: "How is this different from Vanta or Drata?",
    a: "They collect through their cloud integrations; ComplianceGuard collects on the machines themselves. Password policies, firewall rules, disk encryption, and event logs. That evidence lives on the endpoint, not in AWS. Many teams run both: a cloud platform for SaaS integrations, ComplianceGuard for the endpoint evidence those platforms structurally can't see.",
  },
  {
    q: "Why should I trust it with my compliance?",
    a: "Don't trust claims; read the code. ComplianceGuard is source-available under BSL 1.1, so every line that touches your machine is auditable. Licensing uses offline Ed25519 public-key verification, credentials are encrypted with HKDF-derived Fernet keys, and ~1,265 tests run on every commit. Most importantly, the architecture means we never receive your evidence. It stays on your disk, under your control.",
  },
  {
    q: "Can't I just collect evidence manually in a spreadsheet?",
    a: "You can, and most first SOC 2 audits start that way. ComplianceGuard automates the collection: instead of checking firewall settings by hand, running scripts, and copying output into a spreadsheet, it reads everything in about 30 seconds and formats it the way your auditor expects.",
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
    a: "No auditor marketplace. Use whichever firm you want. No 40-app integration catalog, either; the focus is evidence, not workflow chrome. And no lock-in: evidence is stored locally in standard formats, so you can export it and switch tools at any time.",
  },
];
