import { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Optional decorative backdrop rendered behind the title */
  ornament?: "grid" | "glow" | "none";
  align?: "left" | "center";
  children?: ReactNode;
};

/**
 * Shared hero for secondary pages. Entrances are pure CSS (.anim-rise)
 * so content is visible in server HTML and animates without JS.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  ornament = "grid",
  align = "center",
  children,
}: Props) {
  const isCenter = align === "center";
  return (
    <section className="relative isolate overflow-hidden bg-snow pt-32 md:pt-40 pb-16 md:pb-20">
      {ornament === "grid" && <div aria-hidden className="absolute inset-0 ambient-grid" />}
      {ornament !== "none" && <div aria-hidden className="absolute inset-0 accent-glow" />}
      <div
        className={`container-cg relative z-10 max-w-4xl ${isCenter ? "text-center mx-auto" : ""}`}
      >
        {eyebrow && (
          <p className="anim-rise mono-tag text-azure mb-5" style={{ color: "var(--azure)" }}>
            {eyebrow}
          </p>
        )}
        <h1 className="anim-rise anim-d-1 display-1">{title}</h1>
        {subtitle && (
          <p
            className={`anim-rise anim-d-2 mt-6 body-lg md:text-[21px] text-ink-2 ${
              isCenter ? "max-w-[640px] mx-auto" : "max-w-[640px]"
            }`}
          >
            {subtitle}
          </p>
        )}
        {children && <div className="anim-rise anim-d-3 mt-8">{children}</div>}
      </div>
    </section>
  );
}
