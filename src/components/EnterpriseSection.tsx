import { motion } from "framer-motion";
import { Shield, KeyRound, FileLock2, Download, ServerCog } from "lucide-react";
import { DUR, EASE_EXPO, VIEWPORT } from "@/lib/motion";
import { Aurora } from "./Aurora";
import { salesMailto } from "@/lib/site";

const HASHES = ["0x7a3f…b21c", "0x14de…9f08", "0xc9b2…5e7d", "0x4f80…ae33", "0x2bce…c640"];

const PILLARS = [
  {
    icon: FileLock2,
    title: "Tamper-evident audit log",
    body: "Every evaluation, evidence collection and config change is appended to a SHA-256 hash chain. One altered byte breaks the chain — verifiable end-to-end in one request.",
  },
  {
    icon: KeyRound,
    title: "RBAC: admin + auditor",
    body: "Separate read-only auditor accounts. Last-admin lockout guard. First registered user seeded as admin via migration.",
  },
  {
    icon: Download,
    title: "NDJSON streaming export",
    body: "Stream every evidence item, evaluation and audit row as newline-delimited JSON, scoped to the authenticated tenant.",
  },
  {
    icon: ServerCog,
    title: "Hardened, air-gapped deploy",
    body: "Pre-bundled Docker images. Hardened Nginx (TLS 1.2+, HSTS, no server banner). ENTERPRISE_MODE disables telemetry. Zero outbound calls.",
  },
];

function HashChain() {
  return (
    <div className="glass glass-edge relative overflow-hidden p-6 md:p-8 rounded-[28px]">
      <div className="flex items-center justify-between mb-5">
        <span className="text-[11px] font-mono uppercase tracking-wider text-snow/70">
          audit_log &middot; sha-256 chain
        </span>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-snow">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#3fb950" }} />
          verified
        </span>
      </div>

      <div className="space-y-2">
        {HASHES.map((h, i) => (
          <motion.div
            key={h}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: DUR.base, ease: EASE_EXPO, delay: i * 0.08 }}
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
        <span className="text-[11px] font-mono text-snow/70">
          GET /api/v1/enterprise/audit-log/verify
        </span>
        <span className="font-mono text-[11px]" style={{ color: "#3fb950" }}>
          {"{ valid: true }"}
        </span>
      </div>
    </div>
  );
}

export function EnterpriseSection() {
  return (
    <section className="on-dark relative isolate overflow-hidden py-28 md:py-36 finish-indigo">
      <Aurora tone="dark" />
      <div className="container-cg relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-5 text-snow">
            <Shield size={16} aria-hidden />
            <span className="text-[14px] font-semibold" style={{ letterSpacing: "-0.006em" }}>
              Enterprise &middot; Air-gapped
            </span>
          </div>
          <h2 className="display-2 !text-snow">
            Built for the rooms
            <br />
            internet doesn&rsquo;t reach.
          </h2>
          <p className="mt-6 body-lg text-snow/85">
            Government, defence and regulated finance teams need evidence that proves itself &mdash;
            without phoning home. Ships fully offline with a cryptographic audit trail.
          </p>
          <a href={salesMailto("ComplianceGuard Enterprise")} className="btn-on-navy mt-8">
            Contact sales <span aria-hidden>&rsaquo;</span>
          </a>
        </div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-start">
          <div className="grid sm:grid-cols-2 gap-4">
            {PILLARS.map((p) => (
              <div key={p.title} className="glass glass-edge card-hover p-6 rounded-[22px]">
                <p.icon size={18} className="text-snow" aria-hidden />
                <h3
                  className="mt-4 text-[17px] font-semibold text-snow"
                  style={{ letterSpacing: "-0.006em" }}
                >
                  {p.title}
                </h3>
                <p className="mt-2 text-[14px] text-snow/80 leading-[1.55]">{p.body}</p>
              </div>
            ))}
          </div>

          <HashChain />
        </div>
      </div>
    </section>
  );
}
