import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { ScrollProgress } from "@/components/ScrollProgress";
import { PageTransition } from "@/components/PageTransition";
import { SmoothScroll } from "@/components/SmoothScroll";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-snow px-4">
      <div className="max-w-md text-center">
        <p className="text-[13px] font-mono uppercase tracking-wider text-text-dim mb-3">
          404 &middot; route not found
        </p>
        <h1 className="display-2">This page hasn&rsquo;t been deployed.</h1>
        <p className="mt-4 text-[17px] text-text-secondary">
          Either the URL is wrong, or we haven&rsquo;t built it yet.
        </p>
        <div className="mt-8">
          <Link to="/" className="btn-primary">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "ComplianceGuard" },
      { name: "theme-color", content: "#f5f5f7" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ComplianceGuard" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "alternate icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "ComplianceGuard",
          url: "/",
          logo: "/favicon.svg",
          description:
            "Endpoint-level SOC 2, ISO 27001 and HIPAA compliance evidence — on your machine, on your terms.",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-snow text-ink antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <AnnouncementBanner />
      <PageTransition>
        <Outlet />
      </PageTransition>
    </SmoothScroll>
  );
}

