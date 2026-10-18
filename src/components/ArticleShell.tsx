import type { ReactNode } from "react";
import { DOWNLOAD_URL } from "@/lib/site";
import { trackConversion } from "@/lib/analytics";

export type TocItem = { id: string; label: string };

/**
 * Two-column layout for long-form resource pages.
 *
 * The prose column stays at 680px — that width keeps lines at ~75 characters,
 * which is what makes the text readable. Before this shell the page was a
 * single centred strip, so on a wide monitor two thirds of the viewport was
 * empty and the page had exactly one call to action, at the very bottom.
 *
 * The rail fills that space with something useful: a contents list (also what
 * earns jump-to-section links in search results) and a persistent download
 * card. It is hidden below `lg`, so mobile is unchanged.
 */
export function ArticleShell({
  toc,
  rail,
  children,
}: {
  toc?: TocItem[];
  /** Page-specific panel pinned above the contents list (e.g. a progress card). */
  rail?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="container-cg pb-24">
      <div className="mx-auto grid max-w-[1060px] grid-cols-1 gap-x-16 lg:grid-cols-[minmax(0,680px)_300px]">
        <div className="min-w-0">{children}</div>

        <aside aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-28 space-y-7">
            {rail}

            {toc && toc.length > 1 && (
              <nav className="border-l border-hairline pl-5">
                <p className="mono-tag mb-3">On this page</p>
                <ul className="space-y-2">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a
                        href={`#${t.id}`}
                        className="text-[14px] leading-snug text-ink-3 transition-colors hover:text-ink"
                      >
                        {t.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            <div className="card-fog p-5">
              <p className="text-[15px] font-semibold text-ink">
                43 SOC 2 criteria, scored on your own machine.
              </p>
              <p className="mt-2 text-[13px] leading-[1.55] text-ink-2">
                Free tier, no account, nothing leaves your network.
              </p>
              <a
                href={DOWNLOAD_URL}
                className="btn-primary mt-4 inline-flex w-full justify-center text-[14px]"
                onClick={() => trackConversion("download_click", "article-rail")}
              >
                Download Free
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
