
# ComplianceGuard — "Mountain Top Command Center" redesign

A full visual + motion transformation of the marketing site. Committed dark mode, editorial typography, restrained accent, cinematic scroll choreography. Copy and product facts re-aligned to v3.3.1.

## Product facts to reflect (from README + CHANGELOG)

- v3.3.1 — **Windows AND macOS** (Intel + Apple Silicon DMG)
- 3 frameworks at parity: **SOC 2 (29) · ISO 27001 (47) · HIPAA (47)**
- **~568 tests** (replace stale "530+" / "355+" copy)
- **Enterprise air-gapped tier** — tamper-evident SHA-256 audit chain, RBAC, custom PDF branding, NDJSON export, hardened Nginx, no-telemetry mode
- Score Trend (monotone Bézier), Control Heatmap, Remediation Scripts (Pro)
- Self-host or hosted-by-us; Railway one-click deploy; BSL 1.1

## Visual system (locked tokens)

Committed dark theme — remove light mode and ThemeToggle.

```text
Background     #171721   Deep space
Surface        #1E1E2A   Midnight slate
Raised         #272735   Graphite
Hairline       #2A2A38 (solid) / rgba(112,112,125,.18)
Text primary   #EDEDF3   Starlight
Text muted     #C3C3CC
Text dim       #8A8A96
Accent         #5266EB   CTAs · focus · active only (single use)
```

Typography: Geist Sans (display + body) + Geist Mono (eyebrows, version stamps, control IDs). Headlines `weight 300–400`, tracking `-0.025em`, sizes 56 / 72 / 96. Body 16 / 1.7. Eyebrows mono 12px, uppercase, 0.18em tracking. No drop shadows. Radii: 6 / 10 / 14 only.

## Motion system

- **Lenis** smooth scroll provider (~2KB)
- **Framer Motion** for component motion and scroll-linked reveals
- Global easing `[0.16, 1, 0.3, 1]` (expo-out)
- Every animation respects `prefers-reduced-motion` (existing hook)

Choreography:
- Hero: ambient SVG grid + single soft accent glow, 0.05× parallax; mouse-reactive depth (≤5px); word-by-word headline reveal re-tuned to expo-out
- Section reveals: 24px y + opacity, 600ms, 60ms stagger, fire at 25% in view
- Cards: 2px lift + border shift to `#3A3A4E` on hover (no glow bloom)
- Buttons: magnetic 6px pull (retune existing); accent CTA gets subtle inner-glow on hover only
- Sticky-scroll storytelling for product walkthrough (mockup pins, copy cross-fades)

No Three.js / GSAP / WebGL — the brief specifies restraint; Lenis + Framer Motion + SVG hits the bar without 200KB of WebGL the product doesn't need.

## Page structure (homepage)

1. **Hero** — full-bleed dark, ambient grid, editorial 72px headline ("Endpoint compliance, on your terms."), 18px sub, primary + ghost CTA, metadata row (v3.3.1 · 568 tests · BSL 1.1)
2. **Trust strip** — "Built on" Electron · FastAPI · SQLite · React (mono, low opacity)
3. **The Gap** — "Vanta scans the cloud. We scan the machine." split-screen, evidence types animate in
4. **Live product** — sticky-scroll storytelling: Collect → Evaluate → Remediate
5. **Frameworks** — SOC 2 / ISO 27001 / HIPAA — three tall cards, control IDs marquee
6. **Compare table** — dark; accent only on the ComplianceGuard column
7. **Architecture diagram** — redrawn in dark, animated dataflow dashes
8. **Enterprise / Air-Gapped** — new section: SHA-256 hash chain visual, RBAC, NDJSON export, hardened Nginx
9. **Pricing** — Free · Pro · Managed · Enterprise (contact sales)
10. **FAQ** — restyled to dark tokens
11. **Final CTA** — single full-width band
12. **Footer** — redesigned, mono v3.3.1 stamp

## Files

**New**
- `src/components/SmoothScroll.tsx` (Lenis provider)
- `src/components/AmbientGrid.tsx` (SVG grid + accent glow)
- `src/components/Hero.tsx` (cinematic hero)
- `src/components/StickyStory.tsx` (pinned scroll storytelling)
- `src/components/EnterpriseSection.tsx` (air-gapped + hash chain)
- `src/components/SectionHeading.tsx` (eyebrow + headline primitive)

**Heavy rewrites**
- `src/styles.css` — full token reset, dark-only
- `src/routes/__root.tsx` — Geist fonts, dark `<body>`, mount SmoothScroll
- `src/routes/index.tsx` — recomposed with new sections + v3.3.1 copy
- `src/routes/{pricing,about,changelog,security,privacy}.tsx` + `resources/*` — restyled
- `src/components/Navbar.tsx` — frosted dark, scroll-aware, accent CTA, ThemeToggle removed
- `src/components/Footer.tsx` — dark redesign, v3.3.1 mono stamp
- `src/components/ProductMockup.tsx` — dark chrome, monotone gauge, accent
- `src/components/{ChapterTheGap,ChapterTheScan,ChapterTheResult,FrameworksSection,FeatureSpotlights,ArchitectureDiagram,ControlsExplorer,HomepageFAQ,AnnouncementBanner}.tsx` — restyled to tokens, copy updated

**Deletions**
- `src/components/ThemeToggle.tsx`, `CursorBlob.tsx` — incompatible with restraint brief
- Hard-coded green glow gradients and `text-white`/`bg-white` literals across components

## Dependencies

`bun add lenis geist` — Lenis 2KB, Geist font package self-hosted (no Google Fonts network roundtrip, faster + privacy-friendly).

## Quality bar

- TypeScript clean, build passes
- Reduced-motion fallback for every animation
- No hardcoded colors — all via tokens
- Lighthouse Performance ≥ 90
- Mobile parity (parallax disabled, sticky-story collapses to stacked sections)

## Scope note

This is one large coordinated pass — touching ~30 files. After you approve, I'll execute it in a single coherent push and verify the build, not piecemeal.
