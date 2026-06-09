import { motion } from "framer-motion";
import { Shield, KeyRound, FileLock2, Download, ServerCog } from "lucide-react";
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
    body: "Pre-bundled Docker images. Hardened Nginx (TLS 1.2+, HSTS, no server banner). ENTERPRISE_MODE disables Sentry. Zero outbound calls.",
  },
];

function HashChain() {
  const reduced = usePrefersReducedMotion();
  return (
    <div
      className="relative overflow-hidden p-6 md:p-8"
      style={{
        borderRadius: 28,
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px) saturate(160%)",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      <div className="flex items-center justify-between mb-5">
        <span className="text-[11px] font-mono uppercase tracking-wider text-snow/70">
          audit_log &middot; sha-256 chain
        </span>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-snow">
          <span className="h-1.5 w-1.5 rounded-full bg-snow" />
          verified
        </span>
      </div>

      <div className="space-y-2">
        {HASHES.map((h, i) => (
          <motion.div
            key={h}
            initial={reduced ? false : { opacity: 0, x: -10 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
            className="flex items-center gap-3 rounded-[14px] px-3.5 py-2.5"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span className="text-[10px] font-mono uppercase text-snow/50">
              #{(1024 + i).toString(16)}
            </span>
            <span className="font-mono text-[12px] text-snow">{h}</span>
            <div className="ml-auto hidden sm:flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase text-snow/50">prev &rsaquo;</span>
              <span className="font-mono text-[11px] text-snow/70">
                {HASHES[i - 1] ?? "genesis"}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] font-mono text-snow/70">GET /api/v1/enterprise/audit-log/verify</span>
        <span className="font-mono text-[11px] text-snow">{"{ valid: true, entries: 1029 }"}</span>
      </div>
    </div>
  );
}

export function EnterpriseSection() {
  return (
    <section className="relative py-32 md:py-40 finish-indigo">
      <div className="container-cg relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-5 text-snow">
            <Shield size={16} />
            <span className="text-[15px] font-semibold" style={{ letterSpacing: "-0.006em" }}>
              Enterprise &middot; Air-Gapped
            </span>
          </div>
          <h2
            className="text-snow font-bold"
            style={{
              fontSize: "clamp(40px, 6vw, 72px)",
              lineHeight: 1.05,
              letterSpacing: "-0.022em",
            }}
          >
            Built for the rooms
            <br />
            internet doesn&rsquo;t reach.
          </h2>
          <p
            className="mt-6 text-[20px] md:text-[22px] font-light text-snow/90"
            style={{ letterSpacing: "-0.01em", lineHeight: 1.4 }}
          >
            Government, defence and regulated finance teams need evidence that
            proves itself &mdash; without phoning home. Ships fully offline with a
            cryptographic audit trail.
          </p>
          <a
            href="mailto:alexisegyan1232@gmail.com?subject=ComplianceGuard%20Enterprise"
            className="inline-flex items-center justify-center gap-1.5 mt-8 bg-snow text-ink text-[17px] px-6 py-3 rounded-full hover:bg-fog transition-colors"
            style={{ letterSpacing: "-0.022em" }}
          >
            Talk to sales &rsaquo;
          </a>
        </div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-start">
          <div className="grid sm:grid-cols-2 gap-4">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="p-6"
                style={{
                  borderRadius: 22,
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(20px) saturate(160%)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <p.icon size={18} className="text-snow" />
                <h3 className="mt-4 text-[17px] font-semibold text-snow" style={{ letterSpacing: "-0.006em" }}>
                  {p.title}
                </h3>
                <p className="mt-2 text-[14px] text-snow/80 leading-[1.5]">
                  {p.body}
                </p>
              </div>
            ))}
          </div>

          <HashChain />
        </div>
      </div>
    </section>
  );
}
