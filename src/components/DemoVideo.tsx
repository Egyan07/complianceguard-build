import { Reveal } from "@/components/Reveal";
import { YOUTUBE_VIDEO_ID } from "@/lib/site";

/**
 * Marketing demo video, embedded from YouTube (unlisted). Chosen over
 * bundling the raw file (110MB+, no business being in the Worker build) and
 * over Cloudflare Stream (requires a payment method on file even for
 * pay-as-you-go usage).
 *
 * The video wrapper intentionally breaks out of `container-cg` (1200px cap)
 * into its own wider 1600px cap so it reads larger than body copy, while the
 * heading/subhead above it stay narrow and centered for readability.
 */
export function DemoVideo() {
  const src = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&vq=hd1080&modestbranding=1`;

  return (
    <section className="bg-snow py-24 md:py-32">
      <div className="container-cg">
        <Reveal className="max-w-3xl mx-auto text-center">
          <p className="eyebrow mb-4">See it in action</p>
          <h2 className="display-2">Two minutes, start to finish.</h2>
          <p className="mt-6 body-lg text-ink-2 max-w-2xl mx-auto">
            Watch ComplianceGuard scan an endpoint, score it against SOC&nbsp;2, and produce
            signed evidence &mdash; no cloud round-trip required.
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
          }}
        >
          <iframe
            src={src}
            loading="lazy"
            className="absolute inset-0 h-full w-full"
            style={{ border: "none" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            title="ComplianceGuard product demo"
          />
        </div>
      </Reveal>
    </section>
  );
}