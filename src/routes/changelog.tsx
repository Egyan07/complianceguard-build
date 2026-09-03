import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { WaitlistForm } from "@/components/WaitlistForm";
import { VERSION, buildMeta } from "@/lib/site";

export const Route = createFileRoute("/changelog")({
  head: () =>
    buildMeta({
      title: "Changelog | ComplianceGuard",
      description: `ComplianceGuard changelog. Latest: v${VERSION}. A unified visual redesign across the app, GDPR framework support, and hardened evidence integrity.`,
      path: "/changelog",
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
    date: "September 2026",
    version: "v3.9.0",
    title: "One design system across the app",
    tags: [{ label: "Design", tone: "blue" }],
    bullets: [
      "Visual redesign. A single design system now spans the app: one ThemeProvider and Inter typography everywhere (including auth), canonical semantic status colors, and a unified 0–100 score scale with canonical bands (≥85 Good Standing, ≥70 On Track, <70 Needs Attention) shared by the hero, trend chart, and history list.",
      "Distinctive data surfaces: the control heatmap now reads as a ledger with state rails and live per-category counts. Evidence rows and cloud machine statuses route through the shared StatusChip token, Framework Browser labels are readable, and its dark-mode surface leak is fixed.",
      "Shell polish: Settings now uses the shared PageHeader, and its sidebar navigation is real anchor navigation.",
      "Fixed: GDPR framework selection in the desktop app now routes evaluations to the scoring engine correctly, and the cross-surface score consistency issue (the 85–89 band discrepancy) is resolved.",
    ],
  },
  {
    date: "August 2026",
    version: "v3.8.0",
    title: "Electron processing test suite + release CI hardening",
    tags: [
      { label: "Feature", tone: "blue" },
      { label: "Security", tone: "red" },
    ],
    bullets: [
      "74 new tests for the canonical engine, evidence processor, report generator, remediation scripts, and evidence vocabulary.",
      "Release CI hardening: Windows installer uploads now use gh release upload instead of electron-builder's unreliable GitHub publisher.",
      "Security hardening: migration guide hardened, error handling improved, and input validation tightened across API endpoints.",
      "Docs: production deployment guide (Railway, Docker Compose, Render, VPS) and SQLite-to-Postgres migration guide.",
    ],
  },
  {
    date: "August 2026",
    version: "v3.7.0",
    title: "One authoritative evidence vocabulary & production integrity",
    tags: [
      { label: "Feature", tone: "blue" },
      { label: "Security", tone: "red" },
    ],
    bullets: [
      "Evidence vocabulary is now generated from the canonical shared data. The 97 evidence types the old UI offered that the engine could never score are gone, and every selectable type is a canonical scoring input.",
      "Unknown evidence types are rejected instead of silently stored, and the framework browser is consolidated onto the canonical YAML with a parity test so it can never drift from the scoring engine.",
      "Refresh-token rotation with reuse detection, account-aware login throttling, application-level security headers, and honest rate-limit deployment (single default worker).",
      "WAL-safe database backups via SQLite's online backup API, PostgreSQL bound to localhost only, and legacy 0–1 evaluations normalized to the 0–100 contract.",
    ],
  },
  {
    date: "August 2026",
    version: "v3.6.0",
    title: "GDPR framework, full-stack E2E, and major performance wins",
    tags: [{ label: "Feature", tone: "blue" }],
    bullets: [
      "GDPR (EU) 2016/679 framework: 38 obligations across the operational chapters in both the web app and the Electron app, with framework browser, local scoring engine, and evaluation support.",
      "Full-stack Playwright E2E suite: boots the real backend and Vite dev server, drives register/login/dashboard flows, and adds 9 E2E tests wired into CI as its own job.",
      "Login latency fixed (2.4s → ~390ms p95 at 10 concurrent): bcrypt now runs in the thread pool instead of blocking the event loop.",
      "Single source of truth for cross-repo constants (VERSION, MACHINE_LIMITS, FEATURE_GATES) via shared/constants.json. This is the exact drift that caused the v3.5.1 29-vs-54 control bug.",
      "Frontend test suite 9+ min → ~30s, fully typed Electron IPC boundary, code-splitting (829 KB bundle → 63 KB shell), and coverage reporting in CI.",
    ],
  },
  {
    date: "August 2026",
    version: "v3.5.1",
    title: "SOC 2 controls aligned to the real 54-control framework",
    tags: [{ label: "Fixed", tone: "green" }],
    bullets: [
      "SOC 2 control counts now match the real framework everywhere: desktop tier gating, the web evidence-to-control map, remediation scripts, and the UI heatmap all use the actual 54 controls. Pro/Enterprise desktop users were previously scored against only 29 of 54.",
      "Dead control references (CC6.4/6.5/6.6/6.7/7.2) removed from evidence mapping, AWS collection labels, and the heatmap.",
      "README pricing updated to match the website (Pro $149/mo, Enterprise $599/mo flat).",
    ],
  },
  {
    date: "July 2026",
    version: "v3.5.0",
    title: "Premium SOC 2 readiness report + auditor-grade features",
    tags: [{ label: "Feature", tone: "blue" }],
    bullets: [
      "Premium report redesign: the exported PDF is now a polished SOC 2 Readiness Assessment with an Apple-style layout, spacious cover, assessment statement with scope and methodology, and a recomputable SHA-256 report fingerprint.",
      "Auditor-grade control detail: every control shows its objective, the evidence collected (with dates), the evidence still required, and prioritized remediation, plus a complete evidence register.",
      "Trust Services Criteria: the report maps controls to SOC 2 TSC categories, lists the criteria in scope, and titles itself from the framework being assessed.",
      "System Description: describe infrastructure, software, people, data, and subservice organizations in report settings; renders as a dedicated SOC 2-style section.",
      "Remediation ownership: assign an owner and target date to any control; shown per control and in a prioritized Remediation Roadmap.",
      "Engagement type: choose SOC 2 Type I or Type II with an assessment period; the report frames evidence for operating-effectiveness readiness.",
    ],
  },
  {
    date: "July 2026",
    version: "v3.4.0",
    title: "Email verification, HttpOnly refresh tokens, and security hardening",
    tags: [
      { label: "Feature", tone: "blue" },
      { label: "Security", tone: "red" },
      { label: "Fixed", tone: "green" },
    ],
    bullets: [
      "Working email verification and password reset pages: the links in verification and reset emails now open in-app pages (#/verify-email, #/reset-password) that complete the action instead of pointing at a dead URL. Public, no sign-in required.",
      "Refresh tokens moved to HttpOnly cookies: web-mode refresh tokens no longer live in localStorage, removing the XSS exfiltration path.",
      "Audit chain made genuinely tamper-evident: audit-log entries are now HMAC-keyed instead of a bare hash an attacker with database access could forge. Hashing is timezone-stable across SQLite/Postgres and fork-proof under concurrent appends.",
      "Fail-closed feature gating: license tier can never be up-granted from missing or malformed data. Enterprise features are gated to dedicated deployments, with audit-log and user-list reads restricted to admins.",
      "Hardened edges: cloud server URLs validated before credentials are sent (SSRF/cleartext), path traversal blocked in evidence file writes, CORS hardened, bounded timeouts on AWS and SMTP outbound calls, explicit Postgres pool sizing, and migrations run once at startup.",
      "Account deletion cascade fixed: child evidence items are removed before collections, fixing the FK failure on account delete.",
      "CI now runs the full Electron integration suite and gates release builds on it.",
    ],
  },
  {
    date: "June 2026",
    version: "v3.3.1",
    title: "Cross-platform release polish",
    tags: [{ label: "Feature", tone: "blue" }],
    bullets: [
      "macOS builds now publish automatically alongside Windows on every release tag, so both platforms ship from a single release",
      "Improved first-run experience on macOS",
    ],
  },
  {
    date: "June 2026",
    version: "v3.3.0",
    title: "ComplianceGuard comes to macOS",
    tags: [{ label: "Feature", tone: "blue" }],
    bullets: [
      "Native macOS support: DMG installers for both Intel and Apple Silicon Macs",
      "Full evidence collection parity with Windows: password policy, firewall, FileVault disk encryption, and audit logging via the macOS unified log",
      "Cross-platform release pipeline: every future release ships Windows and macOS builds simultaneously",
    ],
  },
  {
    date: "May 2026",
    version: "v3.2.0",
    title: "Enterprise air-gapped tier, multi-framework scoring, premium UI overhaul",
    tags: [
      { label: "Feature", tone: "blue" },
      { label: "Security", tone: "red" },
      { label: "Fixed", tone: "green" },
    ],
    bullets: [
      "Enterprise tier: air-gapped Docker deployment bundle (zero outbound calls) with enterprise-bundle.sh / enterprise-install.sh / enterprise-update.sh and hardened Nginx config (TLS 1.2+, HSTS, strict headers)",
      "Tamper-evident audit log: SHA-256 hash chain covering all 7 fields per entry. GET /api/v1/enterprise/audit-log/verify walks the chain from genesis, and the Postgres app user has DELETE/UPDATE revoked",
      "Self-audit events automatically injected at service call sites: evaluation_run, evidence_collected, enterprise_config_updated, role_assigned, export_generated",
      "Custom PDF branding (Enterprise): company name, logo (PNG/JPEG only, SVG rejected at MIME + magic-byte layers, 512 KB cap), and report footer via PUT /api/v1/enterprise/branding",
      "NDJSON streaming data export: GET /api/v1/enterprise/export streams evidence, evaluations, and audit log as application/x-ndjson. Electron dialog-chosen save paths only",
      "RBAC: admin + auditor roles via /api/v1/enterprise/users with last-admin lockout guard (HTTP 409). First registered user seeded as admin",
      "ENTERPRISE_MODE Sentry guard: air-gapped deployments never make outbound calls from the application layer",
      "Multi-framework scoring in the Electron desktop app: SOC 2, ISO 27001:2013, and HIPAA Security Rule all scored from a single Windows evidence pass. YAML is now the single source of truth for both the Browse Frameworks tab and the scoring engine",
      "Web-mode ISO 27001 and HIPAA scoring: new POST /api/v1/iso27001/evaluate-from-evidence and POST /api/v1/hipaa/evaluate-from-evidence endpoints",
      "Scheduled automatic evidence collection: Daily/Weekly schedule, powerMonitor.resume catch-up after sleep, and tray notifications on success/failure",
      "Browse Frameworks tab in Electron: read-only reference library for SOC 2 / ISO 27001 / HIPAA with live search, risk-level filter, and category accordions (works fully offline)",
      "Premium UI overhaul: dual light/dark theme (Slate/Indigo tokens), frosted-glass topbar, ContextSidebar with Framer Motion sliding active pill (layoutId), animated ScoreHero with spring count-up and color transition, MotionCard hover lift, staggered list entry, and page transitions tuned to 0.14s",
      "Auth additions: GET /auth/me, POST /auth/resend-verification, PATCH /auth/profile, DELETE /auth/account (GDPR Article 17 hard-delete with password confirmation)",
      "Evidence search and status filter: ?status= and ?search= params on GET /api/v1/evidence/items. GET /evidence/items/{id}/controls returns mapped SOC 2 controls",
      "Railway one-click deploy via railway.toml at repo root",
      "Alembic migration 3cef531bbe2e creates audit_log, enterprise_config, user_roles; seeds first admin; idempotent on SQLite",
      "Fixed duplicate framework selector: Dashboard ToggleButtonGroup removed. Framework selection now lives exclusively in the sidebar URL-param flow",
      "Fixed auth API routing: 7 call sites corrected from /api/auth/* to /api/v1/auth/*",
      "Fixed naive datetime in compliance service: 4 datetime.now() calls replaced with timezone-aware equivalents",
      "Test count grown to 530 passing across backend, frontend, Electron, scheduler, and Playwright",
    ],
  },
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
      "Refresh token cleanup background task: FastAPI lifespan spawns an hourly async task that deletes expired rows from refresh_tokens",
      "Refresh token revocation with JTI tracking: POST /api/v1/auth/logout marks the jti revoked, and /refresh rejects revoked or expired JTIs",
      "Streaming file upload: extension checked first, content read in 1 MB chunks with early abort on size exceeded (no more OOM risk)",
      "Rate-limit Redis connectivity check at startup: an unreachable URI logs ERROR with credentials stripped instead of silently falling back to in-memory counters",
      "Evidence upload security tests: disallowed extension → 415, oversized → 413, path-traversal → 404, missing file → 404",
      "SSOT version drift CI check: asserts backend, frontend, and Electron all carry identical VERSION strings",
      "react-query full integration: useDashboard migrated to useQuery (staleTime 30s, refetch on focus), with mutations invalidating the dashboard cache automatically",
      "Routing unified: all API routers define resource-level paths only, with the /api/v1 prefix applied exclusively in main.py",
      "Dependency injection: module-level compliance singletons replaced with FastAPI Depends, creating the service fresh per request",
      "SOC 2 controls: 1,200-line Python constructor replaced by soc2_controls.yaml, so content edits no longer require a deployment",
      "Dashboard decomposition: the 506-line Dashboard.tsx split into useDashboard hook, DashboardHeader, and CollectionSummary",
      "Frontend routing: useState page switcher replaced with react-router HashRouter (works in Electron file:// and web)",
      "Email verification enforced on all authenticated endpoints; get_current_user_unverified added for verification-flow only",
      "N+1 query fixed on evidence collection status endpoint via selectinload",
      "Log path sanitisation: handlers log basename only, never the full host path",
    ],
  },
  {
    date: "March 2026",
    version: "v3.0.0",
    title: "Major hardening release that closes production blockers",
    tags: [
      { label: "Breaking", tone: "red" },
      { label: "Security", tone: "red" },
      { label: "Feature", tone: "blue" },
      { label: "Fixed", tone: "green" },
    ],
    bullets: [
      "Filesystem-backed evidence uploads: the DB stores a path only, not bytes, and the new GET /evidence/items/{id}/download streams files with a path-traversal guard",
      "HTTPS-ready nginx config: port 443 with HSTS, locked-down CSP, Permissions-Policy, and 404s for /docs, /redoc, /openapi.json",
      "SSOT for cross-repo constants: VERSION, license tiers, compliance levels, machine limits, and feature gates centralised across backend, frontend, and Electron",
      "Enriched /health: now returns git_sha and started_at so oncall can map an incident to a specific deploy",
      "GET /api/v1/machines pagination: ?limit (default 50, max 200) and ?offset query params",
      "CHECK constraints: users.license_tier and machines.compliance_level locked at the DB level",
      "Rate limits added to /forgot-password (3/min), /reset-password (5/min), and every AWS-credential endpoint",
      "Domain-separated credential encryption key: Fernet key derived via HKDF-SHA256, with the legacy SHA-256 derivation kept as a read-only fallback",
      "Multi-worker rate-limit backend: RATELIMIT_STORAGE_URI honoured, and WORKERS>1 without a shared backend logs a WARNING",
      "Ruff lint step added to CI before pytest",
      "Breaking: hardcoded SECRET_KEY and DB_PASSWORD docker-compose fallbacks removed, and unset values abort the stack at boot",
      "Breaking: manual evidence base64 column gone, so callers must use the new download endpoint",
      "Breaking: GET /api/v1/machines paginated by default (max 50 unless ?limit set)",
      "Fixed grace-period lockout: paid desktop users were being kicked off on the day of expiry",
      "Fixed datetime.utcnow() deprecation across all production code",
      "Fixed unbounded in-memory eval cache: now an OrderedDict capped at 100 entries (FIFO)",
      "Fixed cloud-sync plaintext fallback: secure-storage now AES-256-GCM-encrypts with a machine-derived key",
      "Fixed web-mode license activation: was returning 'Requires desktop app' instead of calling the API",
      "Alembic migrations 7a1c4f9b2d08 and 8b2e7c1d5a19: data-model hardening and evidence_collections.user_id index",
    ],
  },
  {
    date: "February 2026",
    version: "v2.9.0",
    title: "Cloud Dashboard and fleet sync",
    tags: [{ label: "Feature", tone: "blue" }],
    bullets: [
      "Cloud Dashboard: Pro/Enterprise web page showing fleet overview (total, compliant, at risk, critical, avg score) and per-machine table, with stale machines (7+ days) flagged",
      "Machine sync API: POST /api/v1/machines/sync registers and updates machine snapshots, enforcing tier limits (Free=1, Pro=10, Enterprise=unlimited)",
      "Fleet stats API: GET /api/v1/machines/fleet-stats and GET /api/v1/machines (Pro-gated)",
      "Sync to Cloud button on the Electron Dashboard when cloud sync is configured",
      "Cloud Sync settings section in Electron Settings; JWT tokens stored in SQLite",
      "New machines table with Alembic migration 2b7e3f4a9c1d",
      "17 new tests added, taking the total to 355",
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
      "Email delivery via aiosmtplib: verification and password reset, with a silent no-op when EMAIL_ENABLED=false",
      "JWT refresh tokens: a 7-day refresh token exchanged for a new access token via POST /api/auth/refresh",
      "Frontend auto-refresh: the api.ts response interceptor retries 401s after refreshing, with parallel 401s queued and replayed",
      "Web mode license enforcement: Ed25519 verification ported from Electron to Python, with the require_pro dependency returning HTTP 402 for the free tier",
      "License endpoints: POST /api/auth/activate-license verifies signature and email match, and GET /api/auth/license-info returns live expiry data",
      "Pro-gated compliance endpoints: /evaluations/history, /evaluations/{id}/control-assessments, /report, and /controls/{id}/trend",
      "Sentry error monitoring (FastAPI + React): silent no-op without DSN",
      "Fixed CORS: main.py now reads from settings.cors_origins instead of a hardcoded list",
      "Fixed PDF render timing: Electron export uses did-finish-load instead of setTimeout(1000)",
      "Fixed license sharing: the activate endpoint validates that the license email matches the authenticated user",
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
      "Password validation deduplication: shared validate_password_strength() helper extracted",
      "timezone.utc applied in compliance health check (last naive datetime fixed)",
      "execSync → async: all execSync calls in electron/system/windows.js replaced with promisify(exec), so evidence collection no longer blocks the main thread",
      "test_compliance_service.py: 49 unit tests covering scoring, status, recommendations, risk, trend, and report export",
      "test_auth_helpers.py: 29 unit tests covering register edge cases, verification, and the full forgot/reset cycle",
      "test_models.py: 22 unit tests covering evidence, evaluation, and assessment models",
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
      "Email verification: registration generates a token, /verify-email validates it, and /verification-status checks current state",
      "Password reset flow: /forgot-password generates a 1-hour token, /reset-password validates token, expiry, and complexity, and the API returns 200 on nonexistent email to prevent enumeration",
      "Playwright e2e tests: 5 tests covering login rendering, tab switching, invalid login, tagline, and logo",
      "Alembic migration adding is_verified, verification_token, reset_token, reset_token_expires to users",
      "Fixed datetime deprecation: all datetime.utcnow() replaced with datetime.now(timezone.utc) across the backend",
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
      "Password complexity enforcement: min 8 chars with upper, lower, digit, and special",
      "Rate limiting: login 5 req/min and register 3 req/min per IP via slowapi (auto-disabled in tests)",
      "Compliance evaluation persistence: new ComplianceEvaluationRecord and ControlAssessmentRecord models replace the in-memory dict",
      "Nginx reverse proxy: security headers (X-Frame-Options, X-Content-Type-Options, XSS), rate-limit zone, and SSL-ready config",
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
      "Login / Register UI: tabbed auth page for web mode, while Electron mode skips login",
      "AuthContext: React context managing JWT, user state, and login/register/logout app-wide",
      "Logout button in AppBar with user email on hover",
      "Evidence persistence: EvidenceCollection and EvidenceItem SQLAlchemy models, with endpoints now writing to and reading from the DB",
      "Evidence list endpoints: /evidence/items and /evidence/collections with pagination",
      "Alembic migrations initialised with auto-generated migration covering all 5 tables",
      "14 API integration tests covering full auth flow, evidence CRUD, compliance, and health",
      "Fixed backend auth: replaced the fake get_current_user (which accepted any bearer token) with real JWT verification + DB lookup",
      "Fixed evidence collect crash on missing AWS credentials and a handful of Docker/CI path issues",
    ],
  },
  {
    date: "November 2025",
    version: "v2.0.1",
    title: "CI fixes and README rewrite",
    tags: [{ label: "Fixed", tone: "green" }],
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
      "Pro tier licensing system: Ed25519 signed license keys with offline verification and no server dependency",
      "License key management UI: activate/deactivate from Settings",
      "Feature gating: Free tier limited to 12 of 29 SOC 2 controls with overall score only, while Pro unlocks full breakdown, recommendations, PDF reports, evidence upload, and history",
      "Upgrade prompts: contextual dialogs when free users click gated features",
      "LicenseContext: React context exposing tier state, feature checks, and license management",
      "Tier-aware compliance engine evaluates only allowed controls and redacts per-control details for free users",
      "IPC gating: the main process rejects gated IPC calls for the free tier with an upgrade_required flag",
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
      "Complete brand redesign: a clean flat SaaS identity replacing the dark/glow/shield/circuit aesthetic",
      "New logo, banner, favicon, and tray icons; Material UI theme overhauled (primary #2563EB, secondary #10B981)",
      "React ErrorBoundary wraps all page content to prevent white-screen crashes",
      "Frontend test suite: 25+ Vitest tests with @testing-library/react",
      "CI/CD pipeline: GitHub Actions running lint, format, type check, tests, and build on every push/PR",
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
      "Evidence Upload UI: dialog form for policy documents, screenshots, and text evidence mapped to SOC 2 controls",
      "Native file picker for selecting evidence files",
      "Evaluation History: timeline with score trend chart, status indicators, and control breakdowns",
      "Settings page: app info, database backup, framework list",
      "PDF report export via Electron printToPDF (cover page, score breakdown, recommendations)",
      "29 SOC 2 controls: expanded from 21 to 29 with Confidentiality (C1.1–C1.4) and Processing Integrity (PI1.1–PI1.4)",
      "App navigation: Dashboard, History, Settings",
      "Fixed Electron main process: dev server port, production build path, and missing IPC handlers",
      "Fixed SQLite DB: removed broken require('remote'), added proper async/await, and fixed the missing CRUD methods",
      "Preload security: input validation on all exposed IPC methods, and unvalidated registry access removed",
      "Frontend auto-detects desktop vs web mode (IPC vs HTTP)",
      "Context isolation enforced; external navigation blocked; window.open denied",
      "SHA-256 file hashing on all stored evidence",
    ],
  },
];

const toneStyle: Record<Tag["tone"], { bg: string; fg: string }> = {
  red: { bg: "color-mix(in srgb, var(--warn) 10%, transparent)", fg: "var(--warn)" },
  amber: { bg: "color-mix(in srgb, var(--ink-3) 12%, transparent)", fg: "var(--ink-2)" },
  green: { bg: "color-mix(in srgb, var(--success) 10%, transparent)", fg: "var(--success)" },
  blue: { bg: "var(--azure-soft)", fg: "var(--azure)" },
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
    <div className="min-h-screen flex flex-col bg-snow">
      <Navbar />

      <PageHero
        eyebrow={`v${entries[0]?.version.replace(/^v/, "")} · ${entries[0]?.date}`}
        title={
          <>
            Every change,
            <br />
            documented.
          </>
        }
        subtitle="Shipped releases for ComplianceGuard: what changed, what hardened, what broke. Read it like a release log, not marketing."
        ornament="glow"
      />

      {/* Sticky filter rail */}
      <section className="bg-snow">
        <div className="container-cg max-w-4xl">
          <div
            className="sticky top-20 z-20 -mx-2 px-2 py-3 backdrop-blur-md"
            style={{
              background: "color-mix(in srgb, var(--snow) 78%, transparent)",
              borderBottom: "1px solid var(--hairline)",
            }}
          >
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter changelog by tag">
              {FILTERS.map((f) => {
                const active = filter === f;
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(active && f !== "All" ? "All" : f)}
                    aria-pressed={active}
                    className="text-[13px] px-3.5 py-1.5 rounded-full transition-colors duration-200"
                    style={{
                      background: active ? "var(--ink)" : "var(--fog)",
                      color: active ? "var(--snow)" : "var(--ink)",
                    }}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-snow py-12">
        <div className="container-cg max-w-4xl">
          {visible.length === 0 ? (
            <p className="text-[15px] text-ink-2">No releases match this filter yet.</p>
          ) : (
            <ol className="relative space-y-5">
              {/* Vertical rail */}
              <div
                aria-hidden
                className="absolute left-[15px] top-2 bottom-2 w-px hidden md:block"
                style={{ background: "linear-gradient(to bottom, var(--hairline), transparent)" }}
              />
              {visible.map((e, i) => (
                <li key={e.version} className="relative md:pl-12">
                  {/* Dot */}
                  <span
                    aria-hidden
                    className="absolute left-[9px] top-7 w-[14px] h-[14px] rounded-full hidden md:block"
                    style={{
                      background: i === 0 ? "var(--azure)" : "var(--hairline)",
                      boxShadow: i === 0 ? "0 0 0 4px var(--azure-soft)" : "0 0 0 4px var(--snow)",
                    }}
                  />
                  <Reveal>
                    <article
                      className={`${i === 0 ? "card-snow" : "card-fog"} p-7 md:p-9`}
                      style={i === 0 ? { boxShadow: "0 0 0 2px var(--azure)" } : undefined}
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="mono-tag">{e.date}</span>
                        <span className="text-ink-3/40">·</span>
                        <span
                          className="text-[12px] font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: "var(--ink)", color: "var(--snow)" }}
                        >
                          {e.version}
                        </span>
                        {i === 0 && (
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-azure text-white">
                            Latest
                          </span>
                        )}
                        {e.tags.map((t) => {
                          const s = toneStyle[t.tone];
                          return (
                            <span
                              key={t.label}
                              className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                              style={{ background: s.bg, color: s.fg }}
                            >
                              {t.label}
                            </span>
                          );
                        })}
                      </div>
                      <h2 className="display-3">{e.title}</h2>
                      <ul className="mt-5 space-y-2.5 text-[15px] text-ink-2 leading-[1.7] list-disc pl-5 marker:text-azure">
                        {e.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      {/* Subscribe */}
      <section className="bg-fog py-20">
        <Reveal>
          <div className="container-cg max-w-2xl text-center">
            <h2 className="display-2">Get release notes as we ship.</h2>
            <p className="mt-3 text-ink-2">No marketing emails. Release notes only.</p>
            <div className="mt-6">
              <WaitlistForm
                source="changelog_updates"
                buttonLabel="Notify me of releases"
                variant="onLight"
              />
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
