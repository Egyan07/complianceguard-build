/**
 * Aurora — drifting ambient light blobs that give a section depth and motion.
 * Pure CSS animation (transform/opacity, GPU-composited); the global
 * prefers-reduced-motion block freezes it to a static glow.
 *
 * `tone="light"` for light sections (subtle azure haze behind the hero),
 * `tone="dark"` for dark bands (richer indigo/azure glow under glass).
 */
export function Aurora({ tone = "light" }: { tone?: "light" | "dark" }) {
  const blobs =
    tone === "dark"
      ? [
          {
            c: "rgba(0,113,227,0.45)",
            cls: "cg-aurora-a",
            style: { width: "55%", height: "70%", top: "-15%", left: "-10%" },
          },
          {
            c: "rgba(60,70,177,0.40)",
            cls: "cg-aurora-b",
            style: { width: "50%", height: "65%", bottom: "-20%", right: "-8%" },
          },
          {
            c: "rgba(108,180,255,0.22)",
            cls: "cg-aurora-c",
            style: { width: "40%", height: "50%", top: "20%", left: "40%" },
          },
        ]
      : [
          {
            c: "rgba(0,113,227,0.16)",
            cls: "cg-aurora-a",
            style: { width: "50%", height: "60%", top: "-10%", left: "5%" },
          },
          {
            c: "rgba(108,180,255,0.14)",
            cls: "cg-aurora-b",
            style: { width: "45%", height: "55%", top: "0%", right: "0%" },
          },
          {
            c: "rgba(0,64,221,0.10)",
            cls: "cg-aurora-c",
            style: { width: "35%", height: "45%", top: "25%", left: "35%" },
          },
        ];

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {blobs.map((b, i) => (
        <div
          key={i}
          className={`cg-aurora-blob ${b.cls}`}
          style={{
            ...b.style,
            background: `radial-gradient(circle at center, ${b.c}, transparent 70%)`,
          }}
        />
      ))}
    </div>
  );
}
