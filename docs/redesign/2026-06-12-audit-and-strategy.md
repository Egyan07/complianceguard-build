# ComplianceGuard Website — Full Audit & Redesign Strategy

**Date:** 2026-06-12 · **Scope:** complianceguard-build (marketing site) · **Goal:** premium, trustworthy, authoritative, enterprise-grade — Apple/Stripe/Linear caliber.

Method: six parallel deep audits (design system, landing sections/conversion, motion, chrome/secondary pages, product positioning vs README/CHANGELOG v3.3.1, performance/accessibility) plus full-page visual review at 1440px and 390px (page measured **20,526px tall on desktop — ~23 viewports**).

---

## 1. Design Audit

**Verdict: three design systems stacked as retrofits, reconciled with `!important`.**

- **Palette:** ~90 distinct colors in circulation across three generations: legacy Lovable navy/teal/green (`#1B3A6B`, `#1A8C5F`, `#C0392B`), the shadcn semantic layer, and an Apple-style ink/fog/snow/azure layer bolted on via a 22-rule `!important` override block (`styles.css:112–134`) that even overrides CSS-escaped arbitrary classes (`.bg-\[\#FAFBFC\]`). The off-brand green `#1A8C5F` survives in 14 places **including the ring around the featured Pro pricing card**. The hero headline introduces a fourth accent family (azure→`#5e9cff`→**pink `#ff5980`**) that exists nowhere else, repeated on every secondary page hero.
- **Broken classes (silent bugs):** `text-cobalt-link` (6 uses), `border-silver-mist` (4), `text-text-dim` (2) are referenced but never mapped in `@theme` — Tailwind v4 generates **nothing** for them. Footer/hero "links" render black instead of blue. Navbar.tsx:163 already patches one instance with an inline style.
- **Typography:** 24 distinct arbitrary `text-[Npx]` sizes (252 occurrences, incl. `text-[14.5px]`), 9 different inline `clamp()` heading recipes, 19 inline letter-spacing values. The purpose-built `display-1/2/3` utilities have 0/2/0 usages — the hero hand-rolls its own clamp inline.
- **Radius:** ~15 distinct radii across three mechanisms; the global `--radius: 999px` is consumed by nothing.
- **Live rendering bugs found in screenshots:** the Problem section stat renders **"$10,NaN000+"** (AnimatedStat's regex is double-escaped — the count-up has *never* worked); the navbar/hero logo is a **broken image** (it imports a Lovable-internal `/__l5e/assets-v1/...` URL that 404s outside Lovable hosting).

## 2. UX Audit

- **SSR self-sabotage (critical):** framer-motion `initial` props serialize `opacity:0` into server HTML — the hero headline and nearly every section are invisible until ~197KB gzip of JS hydrates. LCP is gated on hydration; no-JS users see a blank page.
- **Accessibility:** zero `:focus-visible` styles site-wide (and explicit `outline:none` on the calculator slider); ExitIntentModal is a fake dialog (no focus trap/Escape/restore); Resources dropdown links stay keyboard-focusable while invisible; no `<main>` landmark on 5 of 8 routes; no skip link; heading outline broken (sections with `<p>` headlines, h3/h4 jumps).
- **Contrast failures (WCAG AA):** `#86868b` tertiary text = 3.62:1 on white (used at 10–13px); azure eyebrows on navy = 3.58:1; green `#1A8C5F` on white = 4.23:1 at small sizes.
- **Reduced motion:** `FadeUp` — the primitive wrapping ~27 homepage sections — ignores `prefers-reduced-motion`; zero CSS `@media (prefers-reduced-motion)` blocks.
- **Layout bugs:** AnnouncementBanner renders in normal flow *behind* the fixed blurred navbar — illegible and its dismiss button unclickable; it also mounts post-hydration causing guaranteed CLS.
- **Performance:** hero runs 10+ perpetual animations (three ~500px `blur(20px)` orbs, an 80s 3D orbit, a radar pulse animating `width/height` — relayout every frame, forever, never paused off-screen). 5 unauthenticated client-side GitHub API calls per landing view (60/hr/IP limit) silently fall back to **fabricated stats** ("47 stars"). ~35 unused npm packages kept alive by 46 orphaned shadcn files nothing imports. 370KB favicon.ico. Render-blocking Google Fonts with 11 weights; "SF Pro" names in font stacks never match (dead tokens).

## 3. Conversion Audit

- **Two irreconcilable voices.** Scrappy-indie dominates: "this is extortion with a compliance badge on it", "Built for teams that can't afford the Enterprise Tax", "$8K MRR", "Is this really audit-ready, or is it a toy?", "Why should I trust a one-person project?". This voice anchors the product on cheapness, volunteers smallness, and repels the enterprise buyers courted two scrolls later ("Built for the rooms internet doesn't reach"). The premium voice already exists in pockets — standardize on it.
- **Four pricing touchpoints** on one page (Problem stats, comparison table, CostCalculator, full 3-card grid) + price in meta tags. CostCalculator's competitor numbers are **invented formulas** (`max($10000, team*500)`) presented as authoritative.
- **Three competing conversion mechanisms:** Download CTA vs "Get Early Access" waitlist (for a GA v3.3.1 product!) vs exit-intent modal whose code admits the promised checklist is never sent (`TODO` at ExitIntentModal.tsx:49 — then shows "Checklist sent. Check your inbox." — deceptive).
- **Anti-social-proof:** GitHubStats proudly renders "1 star · 10 downloads"; fallbacks fabricate "47 stars".
- **Trust-killers:** every paid CTA is `mailto:` to a personal Gmail; canonical domain is a personal `workers.dev` subdomain; footer "all systems operational" dot is decoration; "Built with auditors" with no named auditors; "Zero trust architecture" describing a license check.
- **Factual conflicts vs product docs (v3.3.1 README):** site pricing $49/$79 vs README $399/$1,299/mo SKUs (**flagged for owner decision — not changed silently**); "CloudTrail" claimed but not documented; "Evidence history (90 days)" limitation invented; "use it to self-certify" contradicts README's own FAQ; 30s/60s/2min setup claims conflict on one page; ISO 27001**:2013** cited with "47 Annex A controls" (the 2013 standard had 114 and was withdrawn — wrong facts in front of a compliance-literate audience); changelog page stops at v3.2.0 while the banner advertises v3.3.1.

## 4. Visual Hierarchy Audit

- 22 stacked sections with **three near-identical stat-card triads**, **two identical fake terminals** (same fabricated "67% · 19/29" output), and **two mockup systems** — while the only *real* product screenshots live in a component (`ScreenshotShowcase`) that is never rendered.
- FeatureSpotlights consumes ~5 viewports with 200px lucide icons at 15% opacity as "visuals" — the #1 template-site tell.
- ControlsExplorer dumps a 29-card searchable reference grid mid-funnel (~3 viewports), killing momentum before pricing.
- Hero stacks 8 simultaneous effects (orbit ring, radar pulse, orbs, beam, marquee, floating cards, gradient word, mockup) — premium heroes pick one signature move.
- Section rhythm is monotone: eyebrow → headline → cards, repeated ~14 times with the same FadeUp.

## 5. Landing Page Structure — Recommendation (22 → 9 sections)

| # | Section | Action |
|---|---------|--------|
| 1 | **Hero** | Rewrite: calm, one signature visual (refined product mockup + ambient grid), kill orbit/orbs/pulse/marquee/pink gradient |
| 2 | **The Gap** (ChapterTheGap + Problem merged) | Lead with "Your cloud is covered. Your endpoints are not." — architecture framing, no price outrage |
| 3 | **How it works** (4 steps + terminal demo merged) | One definitive demonstration, early |
| 4 | **Product** (FeatureSpotlights rewritten) | 4 spotlights, real screenshots replace giant icons; keep the excellent technical copy |
| 5 | **Frameworks** | Keep card treatment, brand-consistent colors, fix "Pick your finish." → framework-truthful copy |
| 6 | **Trust & Architecture** (ArchitectureDiagram + Trust cards merged) | The anchor trust band — "Nothing leaves your network. Ever." |
| 7 | **Comparison** | Keep table, reframe headline around architecture not affordability, fix claims |
| 8 | **Enterprise** | Keep (best section); fix CTA path, tone down unverifiable absolutes |
| 9 | **Pricing preview + FAQ + Final CTA** | Single-sourced pricing data, rewritten FAQ phrasing, one CTA intent |

**Removed:** TechCredibilityBar (fake logo-bar of your own web stack), GitHubStats (proves smallness; fabricated fallbacks), CostCalculator (invented competitor math, 4th price display), ControlsExplorer (reference docs, not a landing section), CodeSnippet (duplicate terminal), FounderNote (maximum anti-enterprise density), NotIncluded (2–3 honest items fold into FAQ), ExitIntentModal (gimmick + deceptive), WaitlistForm on landing (contradicts GA), DownloadCounter/CursorBlob/TypingHeadline/WordReveal/ParallaxMockup/GitHubStarButton/ThemeToggle/AnimatedStat-dup/ScrollProgress (dead or off-strategy).

## 6. Animation Strategy

**Principle: fewer, slower, intentional — every animation argues precision and trust.**

1. **One motion module** (`src/lib/motion.ts`): duration scale (fast .2 / base .5 / slow .8 / hero 1.1), two easings (expo-out `[0.16,1,0.3,1]` for reveals; gentle spring for interactive), shared viewport config, stagger constants. Mirrored as CSS vars.
2. **One `<Reveal>` primitive** (replaces FadeUp + ad-hoc motion.*): SSR-visible by default (no hidden content in server HTML), staggered children via variants, reduced-motion aware.
3. **Global guards:** `<MotionConfig reducedMotion="user">` at root + one CSS `prefers-reduced-motion` block.
4. **Signature moments only:** masked word-stagger on the hero h1 (post-hydration), subtle mockup parallax, scroll-linked scan terminal, animated count-ups (fixed), hover micro-interactions on cards/buttons (translate + shadow-opacity, GPU-only).
5. **Kill list:** orbit scene, floating blur orbs, radar pulse (animates layout properties), cursor blob, typing headline, magnetic button, scroll progress bar.
6. **Performance rules:** transform/opacity only; infinite loops must pause off-screen; no `blur()` on large animated layers.

## 7. Section Removal — see §5 table. Net effect

~22 sections → 9; page height target ≤ 11,000px desktop; JS target ≤ 80KB gzip first load; every remaining section has a distinct visual treatment and a single job.

---

## Implementation phases

1. Design system overhaul: rewrite `styles.css` (single token set, type ramp, radii, shadows, focus-visible, reduced-motion), delete `!important` layer, fix broken classes, inline SVG logo.
2. Motion system: `src/lib/motion.ts`, `Reveal`, MotionConfig, fix AnimatedStat NaN, SSR-visible content.
3. Landing restructure per §5 with enterprise-grade copy rewrite.
4. Chrome: Navbar (active states, a11y, dropdown semantics), Footer (single version source, real marks), banner stacking fix, SEO absolute URLs.
5. Secondary pages: pricing single-sourced, changelog +v3.3.0/v3.3.1, privacy/resources restyled to the system.
6. Hygiene: remove dead components, prune unused deps, slim favicon, font weights.
7. Verify: build + full-page visual re-review at 1440/390, contrast & keyboard pass.

**Explicitly NOT changed without owner sign-off:** pricing numbers ($49/$79 on site vs $399+/mo in README — conflict reported, site values retained), custom domain, real checkout/sales infrastructure.
