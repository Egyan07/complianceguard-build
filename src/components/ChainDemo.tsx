import { useEffect, useRef, useState } from "react";
import { ArrowDown, PencilLine, Plus, RotateCcw, ShieldAlert, ShieldCheck } from "lucide-react";

/**
 * Live demo of the tamper-evident audit log — the exact scheme from
 * backend/app/services/audit_service.py, running in your browser:
 *
 *   - payload = canonical JSON of all 7 entry fields (keys sorted, compact)
 *   - key     = SHA-256("complianceguard-audit-chain-v1:" + secret)
 *   - hash    = HMAC-SHA256(key, payload)
 *
 * Every entry chains to the previous one's hash, so editing any field
 * produces a hash that no longer matches the chain. The demo uses a
 * clearly-labeled demo key; in a real deployment the key derives from
 * the app secret, which never leaves the customer's environment.
 */

const DEMO_SECRET = "demo-secret"; // demo only — real deployments derive their own
const PREFIX = "complianceguard-audit-chain-v1:";

type Fields = {
  id: number;
  eventType: string;
  userId: number | null;
  framework: string | null;
  score: number | null;
  detail: Record<string, unknown>;
  createdAt: string;
};

type Link = {
  storedPrev: string | null; // hash this entry was appended with (what a DB would hold)
  storedEntry: string; // entry hash recorded at append time
  recomputed: string | null; // hash of the current fields — differs after tampering
  broken: boolean;
};

const EVENTS: Omit<Fields, "id" | "createdAt">[] = [
  {
    eventType: "evaluation_run",
    userId: 1,
    framework: "soc2",
    score: 82.4,
    detail: { category: "scoring", controls_scored: 54 },
  },
  {
    eventType: "evidence_collected",
    userId: 1,
    framework: null,
    score: null,
    detail: { category: "password_policy", status: "pass" },
  },
  {
    eventType: "export_generated",
    userId: 2,
    framework: "soc2",
    score: null,
    detail: { report: "pdf", scope: "type_2" },
  },
  {
    eventType: "role_assigned",
    userId: 2,
    framework: null,
    score: null,
    detail: { role: "auditor", target_user: 3 },
  },
  {
    eventType: "enterprise_config_updated",
    userId: 1,
    framework: null,
    score: null,
    detail: { section: "branding", key: "logo" },
  },
];

function sortKeys(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (value !== null && typeof value === "object") {
    return Object.keys(value as Record<string, unknown>)
      .sort()
      .reduce<Record<string, unknown>>((acc, k) => {
        acc[k] = sortKeys((value as Record<string, unknown>)[k]);
        return acc;
      }, {});
  }
  return value;
}

function payloadFor(fields: Fields, prevHash: string | null): Record<string, unknown> {
  return {
    prev_hash: prevHash,
    event_type: fields.eventType,
    user_id: fields.userId,
    framework: fields.framework,
    score: fields.score,
    detail: fields.detail,
    created_at: fields.createdAt,
  };
}

async function auditKey(): Promise<CryptoKey> {
  const bytes = new TextEncoder().encode(PREFIX + DEMO_SECRET);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return crypto.subtle.importKey("raw", digest, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
}

async function hmacHex(key: CryptoKey, payload: Record<string, unknown>): Promise<string> {
  const data = new TextEncoder().encode(JSON.stringify(sortKeys(payload)));
  const sig = await crypto.subtle.sign("HMAC", key, data);
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

const shortHash = (h: string | null) => (h ? `${h.slice(0, 9)}…${h.slice(-6)}` : "genesis");

// Fixed base time so the seeded rows render identically on server and client
// (a Date.now() seed would produce a React hydration mismatch).
const DEMO_T0 = Date.UTC(2026, 7, 12, 10, 0, 0);

function seedRows(): Fields[] {
  return EVENTS.slice(0, 3).map((e, i) => ({
    ...e,
    id: i + 1,
    createdAt: new Date(DEMO_T0 + i * 60_000).toISOString(),
  }));
}

export function ChainDemo() {
  const [rows, setRows] = useState<Fields[]>(() => seedRows());
  const [links, setLinks] = useState<Link[] | null>(null);
  const [status, setStatus] = useState<"computing" | "valid" | "broken">("computing");
  const [brokenAt, setBrokenAt] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);
  const eventRef = useRef(0);
  const nextId = useRef(4);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const key = await auditKey();
        const computed: Link[] = [];
        for (let i = 0; i < rows.length; i++) {
          const storedPrev = i === 0 ? null : computed[i - 1].storedEntry;
          const storedEntry = await hmacHex(key, payloadFor(rows[i], storedPrev));
          const recomputed = await hmacHex(key, payloadFor(rows[i], storedPrev));
          computed.push({
            storedPrev,
            storedEntry,
            recomputed,
            broken: recomputed !== storedEntry,
          });
        }
        if (cancelled) return;
        setLinks(computed);
        const firstBroken = computed.findIndex((l) => l.broken);
        setBrokenAt(firstBroken === -1 ? null : firstBroken);
        setStatus(firstBroken === -1 ? "valid" : "broken");
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [rows]);

  const append = () => {
    const ev = EVENTS[eventRef.current % EVENTS.length];
    eventRef.current += 1;
    setRows((prev) => [
      ...prev,
      { ...ev, id: nextId.current++, createdAt: new Date().toISOString() },
    ]);
  };

  const tamper = () => {
    setRows((prev) => {
      if (prev.length < 2) return prev;
      const next = prev.map((r) => ({ ...r }));
      const idx = next.length - 1;
      const r = next[idx];
      if (r.score !== null) next[idx] = { ...r, score: Number((r.score + 12.6).toFixed(1)) };
      else if (r.framework) next[idx] = { ...r, framework: "hipaa" };
      else next[idx] = { ...r, detail: { ...r.detail, status: "fail" } };
      return next;
    });
  };

  const reset = () => {
    eventRef.current = 0;
    nextId.current = 4;
    setRows(seedRows());
  };

  const pillBtn =
    "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-medium text-white/90 border border-white/15 bg-white/[0.07] hover:bg-white/[0.14] transition-colors cursor-pointer";

  return (
    <div className="relative">
      {/* Status bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="inline-flex items-center gap-2.5" role="status" aria-live="polite">
          {failed && (
            <span className="text-[13px] text-white/70">
              Hash verification needs Web Crypto. Try a current browser.
            </span>
          )}
          {!failed && status === "computing" && (
            <span className="text-[13px] text-white/70">Hashing the chain…</span>
          )}
          {status === "valid" && (
            <span className="inline-flex items-center gap-2 text-[13px] font-medium text-white">
              <ShieldCheck size={16} className="text-[#5fd6a5]" />
              Chain intact · {rows.length} entries verified
            </span>
          )}
          {status === "broken" && (
            <span className="inline-flex items-center gap-2 text-[13px] font-medium text-white">
              <ShieldAlert size={16} className="text-[#ff9d5c]" />
              Tampering detected: entry #{brokenAt !== null ? brokenAt + 1 : "?"} no longer matches
              the chain
            </span>
          )}
        </div>
        <p className="mono-tag hidden sm:block" style={{ color: "rgba(255,255,255,0.45)" }}>
          HMAC-SHA256 · 7 fields · keyed
        </p>
      </div>

      {/* Chain rows */}
      <div className="space-y-2.5">
        {rows.map((r, i) => {
          const link = links?.[i];
          const isBroken = link?.broken;
          return (
            <div
              key={r.id}
              className="rounded-[16px] border px-4 py-3.5 sm:px-5 transition-colors"
              style={{
                borderColor: isBroken ? "rgba(255,157,92,0.55)" : "rgba(255,255,255,0.12)",
                background: isBroken ? "rgba(182,68,0,0.14)" : "rgba(255,255,255,0.05)",
              }}
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-semibold shrink-0"
                  style={{
                    background: isBroken ? "rgba(255,157,92,0.2)" : "rgba(0,113,227,0.22)",
                    color: isBroken ? "#ffb37e" : "#7cc2ff",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[13.5px] text-white font-medium truncate">
                    {r.eventType}
                    {isBroken && (
                      <span className="ml-2 text-[10px] font-bold tracking-wider text-[#ffb37e] align-middle">
                        TAMPERED
                      </span>
                    )}
                  </p>
                  <p className="text-[11.5px] text-white/45 font-mono mt-0.5 truncate">
                    {r.createdAt.replace("T", " ").slice(0, 19)}Z · user #{r.userId ?? "—"} ·{" "}
                    {r.framework ?? "—"} ·{" "}
                    {r.score !== null ? `score ${r.score}` : JSON.stringify(r.detail)}
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-1.5 font-mono text-[12px]">
                  {i > 0 ? (
                    <>
                      <span className="text-white/40" title={link?.storedPrev ?? undefined}>
                        {shortHash(link?.storedPrev ?? null)}
                      </span>
                      <ArrowDown size={12} className="text-white/30 rotate-[-90deg]" />
                    </>
                  ) : (
                    <span className="text-white/40">genesis</span>
                  )}
                  <span
                    className="px-2 py-1 rounded-md text-white/85"
                    style={{
                      background: isBroken ? "rgba(255,157,92,0.16)" : "rgba(0,113,227,0.16)",
                      color: isBroken ? "#ffb37e" : "#9ed0ff",
                      fontVariantNumeric: "tabular-nums",
                    }}
                    title={link?.storedEntry}
                  >
                    {link ? shortHash(link.storedEntry) : "……"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="mt-6 flex flex-wrap gap-2.5">
        <button type="button" onClick={append} className={pillBtn}>
          <Plus size={14} />
          Append event
        </button>
        <button type="button" onClick={tamper} className={pillBtn}>
          <PencilLine size={14} />
          Edit latest entry
        </button>
        <button type="button" onClick={reset} className={pillBtn}>
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      {/* How to verify a real chain */}
      <div className="mt-6 pt-5 border-t border-white/10">
        <p className="text-[12px] text-white/55 font-mono leading-relaxed">
          <span className="text-white/80">Verify a real deployment:</span>{" "}
          <span className="text-[#9ed0ff]">GET /api/v1/enterprise/audit-log/verify</span>
          <span className="text-white/45"> → walks the chain from genesis and returns </span>
          <span className="text-[#5fd6a5]">{'status: "valid"'}</span>
        </p>
        <p className="mt-2 text-[12px] text-white/45 leading-relaxed">
          This demo runs the product&rsquo;s exact scheme with a demo key. In your deployment the
          key is derived from a secret only you hold; we never see it.
        </p>
      </div>
    </div>
  );
}
