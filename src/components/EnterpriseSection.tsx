import { motion } from "framer-motion";
import { Shield, KeyRound, FileLock2, Download, ServerCog } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const HASHES = [
  "0x7a3f…b21c",
  "0x14de…9f08",
  "0xc9b2…5e7d",
  "0x4f80…ae33",
  "0x2bce…c640",
];

const PILLARS = [
  {
    icon: FileLock2,
    title: "Tamper-evident audit log",
    body: "Every evaluation, evidence collection and config change is appended to a SHA-256 hash chain. One altered byte breaks the chain — verifiable end-to-end in one request.",
  },
  {
    icon: KeyRound,
    title: "RBAC: admin + auditor",
    body: "Separate read-only auditor accounts. Last-admin lockout guard. First registered user seeded as admin via Alembic migration.",
  },
  {
    icon: Download,
    title: "NDJSON streaming export",
    body: "Stream every evidence item, evaluation and audit row as newline-delimited JSON. Scoped to the authenticated tenant — zero cross-tenant leakage.",
  },
  {
    icon: ServerCog,
    title: "Hardened, air-gapped deploy",
    body: "Pre-bundled Docker images. Hardened Nginx (TLS 1.2+, HSTS, no server banner). ENTERPRISE_MODE disables Sentry. Zero outbound calls from the app layer.",
  },
];

function HashChain() {
  const reduced = usePrefersReducedMotion();
  return (
    <div className="relative rounded-[14px] border border-hairline bg-midnight/70 backdrop-blur-md p-6 md:p-8 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <span className="mono-tag">audit_log · sha-256 chain</span>
        <span
          className="inline-flex items-center gap-1.5 mono-tag"
          style={{ color: "var(--accent-color)" }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--accent-color)" }}
          />
          verified
        </span>
      </div>

      <div className="space-y-2.5">
        {HASHES.map((h, i) => (
          <motion.div
            key={h}
            initial={reduced ? false : { opacity: 0, x: -10 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
            className="flex items-center gap-3 rounded-md border border-hairline bg-graphite/60 px-4 py-2.5"
          >
            <span className="mono-tag" style={{ color: "var(--text-dim)" }}>
              #{(1024 + i).toString(16)}
            </span>
            <span className="font-mono text-[13px] text-starlight">{h}</span>
            <div className="ml-auto flex items-center gap-2">
              <span className="mono-tag">prev →</span>
              <span className="font-mono text-[12px] text-text-secondary">
                {HASHES[i - 1] ?? "genesis"}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 hairline-divider pt-5 flex items-center justify-between">
        <span className="mono-tag">GET /api/v1/enterprise/audit-log/verify</span>
        <span
          className="font-mono text-[12px]"
          style={{ color: "var(--accent-color)" }}
        >
          { '{ valid: true, entries: 1029 }' }
        </span>
      </div>
    </div>
  );
}

export function EnterpriseSection() {
  return (
    <section className="bg-deepspace py-28 md:py-32 relative">
      <div className="container-cg relative">
        <div className="flex items-center gap-3 mb-6">
          <Shield size={18} style={{ color: "var(--accent-color)" }} />
          <span className="eyebrow">Enterprise · Air-Gapped</span>
        </div>

        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-16 items-start">
          <div>
            <SectionHeading
              title={
                <>
                  Built for the rooms <br />
                  internet doesn't reach.
                </>
              }
              description={
                <>
                  Government, NHS, defence contractors and regulated finance teams
                  need compliance evidence that proves itself — without phoning home.
                  ComplianceGuard Enterprise ships a hardened, fully offline
                  deployment with a cryptographic audit trail and role-separated
                  access.
                </>
              }
            />

            <div className="mt-12 grid sm:grid-cols-2 gap-6">
              {PILLARS.map((p) => (
                <div
                  key={p.title}
                  className="rounded-[12px] border border-hairline bg-midnight/50 p-6 card-lift"
                >
                  <p.icon size={18} style={{ color: "var(--accent-color)" }} />
                  <h3 className="mt-4 text-[16px] font-medium text-starlight tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[14px] text-text-secondary leading-[1.65]">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="mailto:alexisegyan1232@gmail.com?subject=ComplianceGuard%20Enterprise"
              className="btn-primary mt-10"
            >
              Talk to sales
            </a>
          </div>

          <HashChain />
        </div>
      </div>
    </section>
  );
}
