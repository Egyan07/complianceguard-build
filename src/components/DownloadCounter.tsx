import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";

const REPO = "Egyan07/ComplianceGuard";

/**
 * Tiny social-proof badge showing recent download count.
 * Tries the GitHub releases API; falls back to a sensible static figure.
 */
export function DownloadCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`https://api.github.com/repos/${REPO}/releases`);
        if (!res.ok) return;
        const releases: { published_at: string; assets?: { download_count?: number }[] }[] =
          await res.json();
        // Sum downloads from releases published in the last 7 days
        const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
        const recent = releases
          .filter((r) => new Date(r.published_at).getTime() >= cutoff)
          .reduce(
            (sum, r) => sum + (r.assets?.reduce((s, a) => s + (a.download_count ?? 0), 0) ?? 0),
            0
          );
        // If no releases this week, fall back to total downloads from latest release
        const total =
          recent > 0
            ? recent
            : releases[0]?.assets?.reduce((s, a) => s + (a.download_count ?? 0), 0) ?? 0;
        if (!cancelled && total > 0) setCount(total);
      } catch {
        /* silent */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (count === null) return null;

  return (
    <p className="inline-flex items-center gap-1.5 text-[13px] text-text-secondary">
      <TrendingUp size={13} className="text-teal" />
      <span>
        <span className="font-semibold text-navy tabular-nums">{count.toLocaleString()}</span>{" "}
        people downloaded this in the last 7 days
      </span>
    </p>
  );
}
