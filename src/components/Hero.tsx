import { Link } from "@tanstack/react-router";
import { Aurora } from "./Aurora";
import { Magnetic } from "./Magnetic";
import { HeroDashboard } from "./HeroDashboard";
import { DOWNLOAD_URL, VERSION } from "@/lib/site";

/**
 * Landing hero — asymmetric split. Copy + CTAs sit left (LCP headline is
 * pure-CSS .anim-rise so it's visible in server HTML), and the live readiness
 * dashboard sits right at an isometric angle, bleeding off the edge. Stacks to
 * a single centred column below lg.
 */
export function Hero() {
  return (
    <section
      data-hero
      className="relative isolate overflow-hidden bg-snow pt-32 md:pt-40 pb-20 md:pb-28"
    >
      <Aurora tone="light" />
      <div aria-hidden className="absolute inset-0 ambient-grid" />

      <div className="container-cg relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-14 lg:gap-10 items-center">
          {/* ── Copy column ── */}
          <div className="text-center lg:text-left max-w-[560px] mx-auto lg:mx-0">
            <Link
              to="/changelog"
              className="anim-rise inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[rgba(0,113,227,0.12)]"
              style={{ background: "var(--azure-soft)", color: "var(--azure)" }}
            >
              <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-azure" />v{VERSION} &mdash;
              now on Windows and macOS
              <span aria-hidden>&rsaquo;</span>
            </Link>

            <h1 className="anim-rise anim-d-1 display-1 mt-6">
              Compliance, on your{" "}
              <span
                style={{
                  background: "linear-gradient(110deg, #0071e3 10%, #0040dd 90%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                endpoint.
              </span>
            </h1>

            <p className="anim-rise anim-d-2 mt-6 body-lg md:text-[20px] text-ink-2">
              Cloud platforms scan your cloud. ComplianceGuard scans the machines your business runs
              on &mdash; collecting, scoring, and signing SOC&nbsp;2, ISO&nbsp;27001, and HIPAA
              evidence locally. Nothing leaves your network.
            </p>

            <div className="anim-rise anim-d-3 mt-9 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Magnetic>
                <a href={DOWNLOAD_URL} className="btn-primary btn-sheen">
                  Download for free
                </a>
              </Magnetic>
              <a href="#how-it-works" className="btn-ghost">
                See how it works <span aria-hidden>&rsaquo;</span>
              </a>
            </div>

            <p className="anim-rise anim-d-4 mt-7 text-[13px] text-ink-3">
              Windows 10/11 &middot; macOS 12+ (Intel &amp; Apple Silicon) &middot; ~568 tests
              passing &middot; Source-available under BSL 1.1
            </p>
          </div>

          {/* ── Dashboard column — angled, with a slight bleed past the edge ── */}
          <div className="anim-rise anim-d-3 relative lg:w-[108%]">
            <div
              aria-hidden
              className="absolute -inset-x-10 -inset-y-8"
              style={{
                background:
                  "radial-gradient(ellipse 60% 60% at 55% 45%, rgba(0,113,227,0.12), transparent 70%)",
              }}
            />
            <div className="hero-deck relative">
              <HeroDashboard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
