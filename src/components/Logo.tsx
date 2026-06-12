/**
 * Canonical brand mark — self-contained SVG (no external asset).
 * Azure gradient tile + shield-check glyph, matching the favicon family.
 */
export function LogoMark({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="cg-mark-g" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0A84FF" />
          <stop offset="100%" stopColor="#0040DD" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="11" fill="url(#cg-mark-g)" />
      <path
        d="M24 9.5 13.5 14v8.1c0 6.9 4.5 11.6 10.5 13.4 6-1.8 10.5-6.5 10.5-13.4V14L24 9.5z"
        fill="rgba(255,255,255,0.16)"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="m19.4 23.6 3.3 3.3 6.4-6.6"
        stroke="#fff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
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
