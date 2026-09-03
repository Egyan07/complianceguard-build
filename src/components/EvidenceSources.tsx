import { Reveal } from "./Reveal";

const categories = [
  { name: "Event logs", detail: "Security, System, and Application logs" },
  { name: "Security settings", detail: "Password and audit policies, registry options" },
  { name: "Services", detail: "Defender, Windows Update, firewall service status" },
  { name: "Firewall", detail: "Domain, Private, and Public profile configuration" },
  { name: "User accounts", detail: "Local accounts and admin group membership" },
  { name: "Network", detail: "Interfaces, open ports, routing tables" },
  { name: "Software", detail: "Registry-based inventory of installed programs" },
  { name: "File permissions", detail: "ACLs on critical system paths" },
];

/**
 * What the product actually reads — the evidence ledger. A quiet ledger panel
 * (echoing the product's evidence rows) rather than another icon-card grid.
 */
export function EvidenceSources() {
  return (
    <section className="bg-fog py-24 md:py-28">
      <div className="container-cg grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <Reveal>
          <p className="eyebrow mb-4">What it collects</p>
          <h2 className="display-2">
            Eight categories.
            <br />
            One scan.
          </h2>
          <p className="mt-6 body-lg text-ink-2">
            ComplianceGuard reads each source directly from the operating system, with no agent to
            deploy and no API key. Every item is hashed with SHA-256 and mapped to the controls
            auditors actually check.
          </p>
          <p className="mt-4 text-[15px] text-ink-2 leading-[1.65]">
            The same collection pass covers the macOS equivalents, and connecting your AWS account
            once brings IAM, S3 bucket policies, and security groups into the same evidence pack.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="card-snow overflow-hidden rounded-2xl"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-hairline">
              <span className="mono-tag">evidence sources</span>
              <span className="text-[12px] text-ink-3">collected locally</span>
            </div>
            <ul className="divide-y divide-hairline">
              {categories.map((c, i) => (
                <li key={c.name} className="flex items-start gap-4 px-6 py-3.5">
                  <span
                    aria-hidden
                    className="font-mono text-[12px] text-ink-3 pt-0.5 w-6 shrink-0"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[15px] font-medium text-ink">{c.name}</p>
                    <p className="text-[13px] text-ink-2 leading-[1.55]">{c.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="px-6 py-4 border-t border-hairline flex flex-wrap items-center gap-x-5 gap-y-1">
              <span className="font-mono text-[11px] text-ink-3">sha256:{` 9f3a…c21d`}</span>
              <span className="text-[12px] text-ink-3">every item hashed &amp; audit-logged</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
