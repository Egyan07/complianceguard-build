/**
 * Canonical brand mark — self-contained SVG (no external asset).
 * Azure gradient tile + shield-check glyph, matching the favicon family.
 */
export function LogoMark({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient
          id="cg-mark-g"
          x1="0"
          y1="0"
          x2="512"
          y2="512"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#0A84FF" />
          <stop offset="100%" stopColor="#0040DD" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="112" fill="url(#cg-mark-g)" />
      <text
        x="256"
        y="256"
        dy="0.35em"
        fontFamily="-apple-system, 'SF Pro Display', 'Inter Tight', 'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontSize="220"
        fontWeight={700}
        fill="#FFFFFF"
        textAnchor="middle"
        style={{ letterSpacing: "-8px" }}
      >
        CG
      </text>
    </svg>
  );
}

export function Logo({
  size = 28,
  withWordmark = true,
}: {
  size?: number;
  withWordmark?: boolean;
  /** kept for call-site compatibility; the mark no longer animates */
  animated?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark size={size} />
      {withWordmark && (
        <span
          className="text-[22px] md:text-[26px] font-semibold text-ink"
          style={{ letterSpacing: "-0.018em" }}
        >
          ComplianceGuard
        </span>
      )}
    </span>
  );
}
