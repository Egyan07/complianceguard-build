import { useEffect, useState } from "react";
import { Star, GitCommit, AlertCircle, Download } from "lucide-react";

type Stats = {
  stars: number;
  lastCommit: string;
  openIssues: number;
  downloads: number;
};

const REPO = "Egyan07/ComplianceGuard";

// Hardcoded fallbacks used when the GitHub API rate limits or fails.
const FALLBACK: Stats = {
  stars: 47,
  lastCommit: "2 days ago",
  openIssues: 3,
  downloads: 0,
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

/**
 * Live "built in public" strip with GitHub stars, last commit time, open issues,
 * and total release download count. Falls back to hardcoded values if the
 * GitHub API is rate-limited or unreachable. Shows skeleton placeholders while
 * the API call is in flight.
 */
export function GitHubStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [repoRes, commitsRes, releasesRes] = await Promise.all([
          fetch(`https://api.github.com/repos/${REPO}`),
          fetch(`https://api.github.com/repos/${REPO}/commits?per_page=1`),
          fetch(`https://api.github.com/repos/${REPO}/releases`),
        ]);
        if (cancelled) return;
        const repo = repoRes.ok ? await repoRes.json() : null;
        const commits = commitsRes.ok ? await commitsRes.json() : null;
        const releases = releasesRes.ok ? await releasesRes.json() : null;

        const downloads = Array.isArray(releases)
          ? releases.reduce(
              (sum: number, r: { assets?: { download_count?: number }[] }) =>
                sum +
                (r.assets?.reduce((s, a) => s + (a.download_count ?? 0), 0) ?? 0),
              0
            )
          : null;

        setStats({
          stars: repo?.stargazers_count ?? FALLBACK.stars,
          lastCommit: commits?.[0]?.commit?.author?.date
            ? timeAgo(commits[0].commit.author.date)
            : FALLBACK.lastCommit,
          openIssues: repo?.open_issues_count ?? FALLBACK.openIssues,
          downloads: downloads ?? FALLBACK.downloads,
        });
      } catch {
        if (!cancelled) setStats(FALLBACK);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const display = stats ?? FALLBACK;
  const items = [
    { Icon: Star, label: "GitHub stars", value: display.stars.toLocaleString() },
    { Icon: GitCommit, label: "Last commit", value: display.lastCommit },
    { Icon: AlertCircle, label: "Open issues", value: display.openIssues.toLocaleString() },
    { Icon: Download, label: "Total downloads", value: display.downloads.toLocaleString() },
  ];

  return (
    <section className="bg-surface border-y border-border py-8">
      <div className="container-cg">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-teal">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
            </span>
            Built in public
          </span>
          {items.map((it) =>
            loading ? (
              <div key={it.label} className="flex items-center gap-2">
                <it.Icon size={16} className="text-navy/40" />
                <span className="inline-block h-4 w-12 rounded bg-navy/10 animate-pulse" />
                <span className="inline-block h-4 w-20 rounded bg-navy/5 animate-pulse" />
              </div>
            ) : (
              <div key={it.label} className="flex items-center gap-2 text-[14px] text-text-secondary">
                <it.Icon size={16} className="text-navy" />
                <span className="font-semibold text-navy tabular-nums">{it.value}</span>
                <span>{it.label}</span>
              </div>
            )
          )}
          <a
            href={`https://github.com/${REPO}`}
            target="_blank"
            rel="noreferrer"
            className="text-[14px] text-teal font-semibold hover:underline"
          >
            View on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}
