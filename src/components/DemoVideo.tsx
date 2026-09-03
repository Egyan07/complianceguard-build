import { Reveal } from "@/components/Reveal";
import { DEMO_VIDEO_URL } from "@/lib/site";

/**
 * Marketing demo video — the 60-second SaaS promo, bundled with the site
 * (same-origin, so it always plays — no third-party hosting dependency).
 *
 * The video wrapper intentionally breaks out of `container-cg` (1200px cap)
 * into its own wider 1600px cap so it reads larger than body copy, while the
 * heading/subhead above it stay narrow and centered for readability.
 */
export function DemoVideo() {
  return (
    <section className="bg-snow py-24 md:py-32">
      <div className="container-cg">
        <Reveal className="max-w-3xl mx-auto text-center">
          <p className="eyebrow mb-4">See it in action</p>
          <h2 className="display-2">Compliance in minutes, not months.</h2>
          <p className="mt-6 body-lg text-ink-2 max-w-2xl mx-auto">
            Continuous endpoint evidence, real-time compliance tracking, and instant
            audit-ready reports, all self-hosted and privacy-first.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.08} className="mt-12 max-w-[1600px] mx-auto px-6 md:px-10">
        <div
          className="relative w-full overflow-hidden rounded-2xl"
          style={{
            aspectRatio: "16 / 9",
            border: "1px solid var(--hairline)",
            boxShadow: "var(--shadow-float)",
            background: "#000",
          }}
        >
          <video
            src={DEMO_VIDEO_URL}
            controls
            preload="metadata"
            playsInline
            className="absolute inset-0 h-full w-full"
            title="ComplianceGuard: the 60-second story"
          />
        </div>
      </Reveal>
    </section>
  );
}