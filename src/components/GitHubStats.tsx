import { useEffect, useState } from "react";
import { Star, GitCommit, AlertCircle, Download } from "lucide-react";

type Stats = {
  stars: number | null;
  lastCommit: string | null;
  openIssues: number | null;
  downloads: number | null;
};

const REPO = "Egyan07/ComplianceGuard";

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
 * and total release download count. Falls back to a static "live" badge if the
 * GitHub API is rate-limited or unreachable.
 */
export function GitHubStats() {
  const [stats, setStats] = useState<Stats>({
    stars: null,
    lastCommit: null,
    openIssues: null,
    downloads: null,
  });

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
          stars: repo?.stargazers_count ?? null,
          lastCommit: commits?.[0]?.commit?.author?.date ?? null,
          openIssues: repo?.open_issues_count ?? null,
          downloads,
        });
      } catch {
        // Silent fallback — strip still renders with em-dashes
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const items = [
    {
      Icon: Star,
      label: "GitHub stars",
      value: stats.stars !== null ? stats.stars.toLocaleString() : "—",
    },
    {
      Icon: GitCommit,
      label: "Last commit",
      value: stats.lastCommit ? timeAgo(stats.lastCommit) : "—",
    },
    {
      Icon: AlertCircle,
      label: "Open issues",
      value: stats.openIssues !== null ? stats.openIssues.toLocaleString() : "—",
    },
    {
      Icon: Download,
      label: "Total downloads",
      value: stats.downloads !== null ? stats.downloads.toLocaleString() : "—",
    },
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
          {items.map((it) => (
            <div key={it.label} className="flex items-center gap-2 text-[14px] text-text-secondary">
              <it.Icon size={16} className="text-navy" />
              <span className="font-semibold text-navy tabular-nums">{it.value}</span>
              <span>{it.label}</span>
            </div>
          ))}
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
