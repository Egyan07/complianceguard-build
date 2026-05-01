import { useEffect, useState } from "react";
import { Github } from "lucide-react";

const REPO = "Egyan07/ComplianceGuard";
const FALLBACK_STARS = 47;

/**
 * Small bordered "Star on GitHub" pill with live star count from the GitHub API.
 * Falls back to a hardcoded star count if the API is rate-limited or fails.
 */
export function GitHubStarButton() {
  const [stars, setStars] = useState<number>(FALLBACK_STARS);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`https://api.github.com/repos/${REPO}`);
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && typeof data?.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      } catch {
        // Keep fallback
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <a
      href={`https://github.com/${REPO}`}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 border border-border rounded-[4px] px-3 py-2 hover:border-navy/40 transition-colors"
      aria-label={`Star ComplianceGuard on GitHub (${stars} stars)`}
    >
      <Github size={14} className="text-navy" />
      <span className="text-[13px] font-semibold text-navy">Star on GitHub</span>
      <span className="text-[13px] font-semibold text-navy bg-[#F3F4F6] rounded px-2 py-0.5 tabular-nums">
        {stars.toLocaleString()}
      </span>
    </a>
  );
}
