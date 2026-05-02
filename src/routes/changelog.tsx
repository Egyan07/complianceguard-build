import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FadeUp } from "@/components/FadeUp";
import { WaitlistForm } from "@/components/WaitlistForm";

export const Route = createFileRoute("/changelog")({
  head: () => ({
    meta: [
      { title: "Changelog — ComplianceGuard" },
      { name: "description", content: "ComplianceGuard changelog — every release documented. Latest: v3.1.0 with JTI token revocation and streaming file uploads." },
      { property: "og:title", content: "ComplianceGuard Changelog" },
      { property: "og:description", content: "Every change to ComplianceGuard, documented." },
      { property: "og:url", content: "https://complianceguard.alexisegyan1232.workers.dev/changelog" },
      { property: "og:image", content: "https://complianceguard.alexisegyan1232.workers.dev/favicon.svg" },
      { name: "twitter:image", content: "https://complianceguard.alexisegyan1232.workers.dev/favicon.svg" },
    ],
  }),
  component: ChangelogPage,
});

type Tag = { label: string; tone: "red" | "amber" | "green" | "blue" };

const entries: {
  date: string;
  version: string;
  title: string;
  tags: Tag[];
  bullets: string[];
}[] = [
  {
    date: "April 2026",
    version: "v3.1.0",
    title: "Security hardening and architecture completion",
    tags: [
      { label: "Security", tone: "red" },
      { label: "Performance", tone: "amber" },
      { label: "Fixed", tone: "green" },
    ],
    bullets: [
      "Refresh token cleanup background task — FastAPI lifespan spawns an hourly async task that deletes expired rows from refresh_tokens",
      "Refresh token revocation with JTI tracking — POST /api/v1/auth/logout marks the jti revoked; /refresh rejects revoked or expired JTIs",
      "Streaming file upload — extension checked first, content read in 1 MB chunks with early abort on size exceeded (no more OOM risk)",
      "Rate-limit Redis connectivity check at startup — unreachable URI logs ERROR with credentials stripped instead of silently falling back to in-memory counters",
      "Evidence upload security tests — disallowed extension → 415, oversized → 413, path-traversal → 404, missing file → 404",
      "SSOT version drift CI check — asserts backend, frontend, and Electron all carry identical VERSION strings",
      "react-query full integration — useDashboard migrated to useQuery (staleTime 30s, refetch on focus); mutations invalidate the dashboard cache automatically",
      "Routing unified — all API routers define resource-level paths only; /api/v1 prefix applied exclusively in main.py",
      "Dependency injection — module-level compliance singletons replaced with FastAPI Depends; service created fresh per request",
      "SOC 2 controls — 1,200-line Python constructor replaced by soc2_controls.yaml; content edits no longer require a deployment",
      "Dashboard decomposition — 506-line Dashboard.tsx split into useDashboard hook, DashboardHeader, and CollectionSummary",
      "Frontend routing — useState page switcher replaced with react-router HashRouter (works in Electron file:// and web)",
      "Email verification enforced on all authenticated endpoints; get_current_user_unverified added for verification-flow only",
      "N+1 query fixed on evidence collection status endpoint via selectinload",
      "Log path sanitisation — handlers log basename only, never the full host path",
    ],
  },
  {
    date: "March 2026",
    version: "v3.0.0",
    title: "Major hardening release — production blockers closed",
    tags: [
      { label: "Breaking", tone: "red" },
      { label: "Security", tone: "red" },
      { label: "Feature", tone: "blue" },
      { label: "Fixed", tone: "green" },
    ],
    bullets: [
      "Filesystem-backed evidence uploads — DB stores a path only, not bytes; new GET /evidence/items/{id}/download streams files with a path-traversal guard",
      "HTTPS-ready nginx config — port 443 with HSTS, locked-down CSP, Permissions-Policy, and 404s for /docs, /redoc, /openapi.json",
      "SSOT for cross-repo constants — VERSION, license tiers, compliance levels, machine limits, and feature gates centralised across backend, frontend, and Electron",
      "Enriched /health — now returns git_sha and started_at so oncall can map an incident to a specific deploy",
      "GET /api/v1/machines pagination — ?limit (default 50, max 200) and ?offset query params",
      "CHECK constraints — users.license_tier and machines.compliance_level locked at the DB level",
      "Rate limits added to /forgot-password (3/min), /reset-password (5/min), and every AWS-credential endpoint",
      "Domain-separated credential encryption key — Fernet key derived via HKDF-SHA256; legacy SHA-256 derivation kept as a read-only fallback",
      "Multi-worker rate-limit backend — RATELIMIT_STORAGE_URI honoured; WORKERS>1 without a shared backend logs a WARNING",
      "Ruff lint step added to CI before pytest",
      "Breaking — hardcoded SECRET_KEY and DB_PASSWORD docker-compose fallbacks removed; unset values abort the stack at boot",
      "Breaking — manual evidence base64 column gone; callers must use the new download endpoint",
      "Breaking — GET /api/v1/machines paginated by default (max 50 unless ?limit set)",
      "Fixed grace-period lockout — paid desktop users were being kicked off on the day of expiry",
      "Fixed datetime.utcnow() deprecation across all production code",
      "Fixed unbounded in-memory eval cache — now an OrderedDict capped at 100 entries (FIFO)",
      "Fixed cloud-sync plaintext fallback — secure-storage now AES-256-GCM-encrypts with a machine-derived key",
      "Fixed web-mode license activation — was returning 'Requires desktop app' instead of calling the API",
      "Alembic migrations 7a1c4f9b2d08 and 8b2e7c1d5a19 — data-model hardening and evidence_collections.user_id index",
    ],
  },
  {
    date: "February 2026",
    version: "v2.9.0",
    title: "Cloud Dashboard and fleet sync",
    tags: [
      { label: "Feature", tone: "blue" },
    ],
    bullets: [
      "Cloud Dashboard — Pro/Enterprise web page showing fleet overview (total, compliant, at risk, critical, avg score) and per-machine table; stale machines (7+ days) flagged",
      "Machine sync API — POST /api/v1/machines/sync registers and updates machine snapshots; enforces tier limits (Free=1, Pro=10, Enterprise=unlimited)",
      "Fleet stats API — GET /api/v1/machines/fleet-stats and GET /api/v1/machines (Pro-gated)",
      "Sync to Cloud button on the Electron Dashboard when cloud sync is configured",
      "Cloud Sync settings section in Electron Settings; JWT tokens stored in SQLite",
      "New machines table with Alembic migration 2b7e3f4a9c1d",
      "17 new tests added — total now 311",
    ],
  },
  {
    date: "February 2026",
    version: "v2.8.0",
    title: "Email delivery, refresh tokens, and license enforcement",
    tags: [
      { label: "Feature", tone: "blue" },
      { label: "Security", tone: "red" },
      { label: "Fixed", tone: "green" },
    ],
    bullets: [
      "Email delivery via aiosmtplib — verification and password reset; silent no-op when EMAIL_ENABLED=false",
      "JWT refresh tokens — 7-day refresh token exchanged for a new access token via POST /api/auth/refresh",
      "Frontend auto-refresh — api.ts response interceptor retries 401s after refreshing; parallel 401s queued and replayed",
      "Web mode license enforcement — Ed25519 verification ported from Electron to Python; require_pro dependency returns HTTP 402 for free tier",
      "License endpoints — POST /api/auth/activate-license verifies signature and email match; GET /api/auth/license-info returns live expiry data",
      "Pro-gated compliance endpoints — /evaluations/history, /evaluations/{id}/control-assessments, /report, and /controls/{id}/trend",
      "Sentry error monitoring (FastAPI + React) — silent no-op without DSN",
      "Fixed CORS — main.py now reads from settings.cors_origins instead of a hardcoded list",
      "Fixed PDF render timing — Electron export uses did-finish-load instead of setTimeout(1000)",
      "Fixed license sharing — activate endpoint validates the license email matches the authenticated user",
      "Test count: 175 backend + 114 frontend unit + 5 e2e = 294 tests",
    ],
  },
  {
    date: "January 2026",
    version: "v2.3.1",
    title: "Test coverage expansion and async cleanup",
    tags: [
      { label: "Performance", tone: "amber" },
      { label: "Fixed", tone: "green" },
    ],
    bullets: [
      "Password validation deduplication — shared validate_password_strength() helper extracted",
      "timezone.utc applied in compliance health check (last naive datetime fixed)",
      "execSync → async — all execSync calls in electron/system/windows.js replaced with promisify(exec); evidence collection no longer blocks the main thread",
      "test_compliance_service.py — 49 unit tests covering scoring, status, recommendations, risk, trend, and report export",
      "test_auth_helpers.py — 29 unit tests covering register edge cases, verification, and full forgot/reset cycle",
      "test_models.py — 22 unit tests covering evidence, evaluation, and assessment models",
      "e2e tests wired into the backend-tests CI job via --run-e2e",
      "Total test count: 142 backend + 119 frontend unit + 5 e2e = 266 tests",
    ],
  },
  {
    date: "January 2026",
    version: "v2.3.0",
    title: "Email verification and password reset",
    tags: [
      { label: "Feature", tone: "blue" },
      { label: "Security", tone: "red" },
    ],
    bullets: [
      "Email verification — registration generates a token; /verify-email validates it; /verification-status checks current state",
      "Password reset flow — /forgot-password generates a 1-hour token; /reset-password validates token, expiry, and complexity; returns 200 on nonexistent email to prevent enumeration",
      "Playwright e2e tests — 5 tests covering login rendering, tab switching, invalid login, tagline, and logo",
      "Alembic migration adding is_verified, verification_token, reset_token, reset_token_expires to users",
      "Fixed datetime deprecation — all datetime.utcnow() replaced with datetime.now(timezone.utc) across the backend",
      "Total test count: 34 backend + 37 frontend + 5 e2e = 76 tests",
    ],
  },
  {
    date: "December 2025",
    version: "v2.2.0",
    title: "Password complexity, rate limiting, evaluation persistence",
    tags: [
      { label: "Feature", tone: "blue" },
      { label: "Security", tone: "red" },
    ],
    bullets: [
      "Password complexity enforcement — min 8 chars, upper, lower, digit, special",
      "Rate limiting — login 5 req/min, register 3 req/min per IP via slowapi (auto-disabled in tests)",
      "Compliance evaluation persistence — new ComplianceEvaluationRecord and ControlAssessmentRecord models replace the in-memory dict",
      "Nginx reverse proxy — security headers (X-Frame-Options, X-Content-Type-Options, XSS), rate-limit zone, SSL-ready config",
      "App startup runs alembic upgrade head instead of Base.metadata.create_all",
      "Compliance evaluate and history endpoints now require JWT auth",
      "Total test count: 29 backend + 37 frontend = 66 tests",
    ],
  },
  {
    date: "December 2025",
    version: "v2.1.0",
    title: "Auth UI, evidence persistence, integration tests",
    tags: [
      { label: "Feature", tone: "blue" },
      { label: "Fixed", tone: "green" },
    ],
    bullets: [
      "Login / Register UI — tabbed auth page for web mode; Electron mode skips login",
      "AuthContext — React context managing JWT, user state, and login/register/logout app-wide",
      "Logout button in AppBar with user email on hover",
      "Evidence persistence — EvidenceCollection and EvidenceItem SQLAlchemy models; endpoints now write to and read from the DB",
      "Evidence list endpoints — /evidence/items and /evidence/collections with pagination",
      "Alembic migrations initialised with auto-generated migration covering all 5 tables",
      "14 API integration tests covering full auth flow, evidence CRUD, compliance, and health",
      "Fixed backend auth — replaced fake get_current_user (accepted any bearer token) with real JWT verification + DB lookup",
      "Fixed evidence collect crash on missing AWS credentials and a handful of Docker/CI path issues",
    ],
  },
  {
    date: "November 2025",
    version: "v2.0.1",
    title: "CI fixes and README rewrite",
    tags: [
      { label: "Fixed", tone: "green" },
    ],
    bullets: [
      "Added missing vite-env.d.ts type reference (broke import.meta.env on CI)",
      "Fixed Page type mismatch on onNavigate; removed unused tier variable in ComplianceScore",
      "Updated ComplianceScore test to match free-tier gating behaviour",
      "README rewritten for the dual-mode (Desktop + Web/Docker) architecture",
    ],
  },
  {
    date: "November 2025",
    version: "v2.0.0",
    title: "Pro tier licensing and feature gating",
    tags: [
      { label: "Breaking", tone: "red" },
      { label: "Feature", tone: "blue" },
    ],
    bullets: [
      "Pro tier licensing system — Ed25519 signed license keys, offline verification, no server dependency",
      "License key management UI — activate/deactivate from Settings",
      "Feature gating — Free tier limited to 12 of 29 SOC 2 controls with overall score only; Pro unlocks full breakdown, recommendations, PDF reports, evidence upload, and history",
      "Upgrade prompts — contextual dialogs when free users click gated features",
      "LicenseContext — React context exposing tier state, feature checks, and license management",
      "Tier-aware compliance engine evaluates only allowed controls and redacts per-control details for free users",
      "IPC gating — main process rejects gated IPC calls for free tier with upgrade_required flag",
      "FREE / PRO badge in the AppBar",
      "License key generator dev CLI for Ed25519 keypairs and signed test keys",
    ],
  },
  {
    date: "October 2025",
    version: "v1.1.0",
    title: "Brand redesign, error boundary, CI/CD",
    tags: [
      { label: "Feature", tone: "blue" },
      { label: "Fixed", tone: "green" },
    ],
    bullets: [
      "Complete brand redesign — clean flat SaaS identity replacing the dark/glow/shield/circuit aesthetic",
      "New logo, banner, favicon, and tray icons; Material UI theme overhauled (primary #2563EB, secondary #10B981)",
      "React ErrorBoundary wraps all page content to prevent white-screen crashes",
      "Frontend test suite — 25+ Vitest tests with @testing-library/react",
      "CI/CD pipeline — GitHub Actions running lint, format, type check, tests, and build on every push/PR",
      "Prettier config and Vitest configuration added",
      "Version bump 0.1.0-beta → 1.1.0 across all files",
    ],
  },
  {
    date: "October 2025",
    version: "v0.1.0-beta",
    title: "Initial public beta",
    tags: [
      { label: "Feature", tone: "blue" },
      { label: "Security", tone: "red" },
    ],
    bullets: [
      "Evidence Upload UI — dialog form for policy documents, screenshots, and text evidence mapped to SOC 2 controls",
      "Native file picker for selecting evidence files",
      "Evaluation History — timeline with score trend chart, status indicators, and control breakdowns",
      "Settings page — app info, database backup, framework list",
      "PDF report export via Electron printToPDF (cover page, score breakdown, recommendations)",
      "29 SOC 2 controls — expanded from 21 to 29 with Confidentiality (C1.1–C1.4) and Processing Integrity (PI1.1–PI1.4)",
      "App navigation — Dashboard, History, Settings",
      "Fixed Electron main process — dev server port, production build path, missing IPC handlers",
      "Fixed SQLite DB — removed broken require('remote'), proper async/await, missing CRUD methods added",
      "Preload security — input validation on all exposed IPC methods; removed unvalidated registry access",
      "Frontend auto-detects desktop vs web mode (IPC vs HTTP)",
      "Context isolation enforced; external navigation blocked; window.open denied",
      "SHA-256 file hashing on all stored evidence",
    ],
  },
];

const toneClass: Record<Tag["tone"], string> = {
  red: "bg-danger/10 text-danger",
  amber: "bg-[#F59E0B]/10 text-[#B45309]",
  green: "bg-teal/10 text-teal",
  blue: "bg-navy/10 text-navy",
};

const FILTERS = ["All", "Feature", "Security", "Performance", "Fixed", "Breaking"] as const;
type Filter = (typeof FILTERS)[number];

function ChangelogPage() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(() => {
    if (filter === "All") return entries;
    return entries.filter((e) => e.tags.some((t) => t.label === filter));
  }, [filter]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-background pt-20 pb-8">
        <div className="container-cg max-w-3xl">
          <FadeUp>
            <h1 className="text-[36px] md:text-[48px] font-bold text-navy">Changelog</h1>
            <p className="mt-4 text-[18px] text-text-secondary">
              Every change to ComplianceGuard, documented.
            </p>
          </FadeUp>

          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter changelog by tag">
            {FILTERS.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(active && f !== "All" ? "All" : f)}
                  aria-pressed={active}
                  className="text-[13px] px-3 py-1.5 rounded-[4px] border transition-colors duration-200"
                  style={{
                    borderColor: "#E2E8F0",
                    backgroundColor: active ? "#1B3A6B" : "#ffffff",
                    color: active ? "#ffffff" : "#1B3A6B",
                  }}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-background pb-16">
        <div className="container-cg max-w-3xl space-y-6">
          {visible.length === 0 ? (
            <p className="text-[15px] text-text-secondary">No releases match this filter yet.</p>
          ) : (
            visible.map((e, i) => (
              <FadeUp key={e.version} delay={i * 0.05}>
                <article
                  className="bg-white border border-border rounded-[12px] overflow-hidden"
                  style={{ borderLeft: "3px solid #1A8C5F" }}
                >
                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="bg-teal text-white text-[13px] font-semibold px-2.5 py-1 rounded">
                        {e.date}
                      </span>
                      <span className="bg-navy text-white text-[13px] font-semibold px-2.5 py-1 rounded">
                        {e.version}
                      </span>
                      {e.tags.map((t) => (
                        <span
                          key={t.label}
                          className={`text-[12px] font-semibold px-2 py-0.5 rounded ${toneClass[t.tone]}`}
                        >
                          {t.label}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-[22px] md:text-[24px] font-bold text-navy">{e.title}</h2>
                    <ul className="mt-5 space-y-2.5 text-[15px] text-text-secondary leading-[1.7] list-disc pl-5">
                      {e.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              </FadeUp>
            ))
          )}
        </div>
      </section>

      <section className="bg-background pb-24">
        <div className="container-cg max-w-3xl">
          <div
            className="rounded-[12px] bg-white"
            style={{ border: "1px solid #E2E8F0", padding: 32 }}
          >
            <p className="text-[16px] font-semibold text-navy">
              Get notified when new versions ship.
            </p>
            <p className="mt-1 text-[14px] text-text-secondary">
              No marketing emails. Release notes only.
            </p>
            <div className="mt-5">
              <WaitlistForm source="changelog_updates" buttonLabel="Notify Me" variant="onLight" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
