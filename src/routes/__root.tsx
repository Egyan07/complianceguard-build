import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { MotionConfig } from "framer-motion";

import appCss from "../styles.css?url";
import { PageTransition } from "@/components/PageTransition";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SITE_URL } from "@/lib/site";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-snow px-4">
      <div className="max-w-md text-center">
        <p className="mono-tag mb-3" style={{ color: "var(--azure)" }}>
          404 &middot; not in the control library
        </p>
        <h1 className="display-2">This page isn&rsquo;t part of the framework.</h1>
        <p className="mt-4 text-[17px] text-ink-2 leading-[1.65]">
          We scanned this address and found no evidence it exists. Double-check the URL, or
          head somewhere we know passes audit.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary">
            Back to home
          </Link>
          <Link to="/pricing" className="btn-ghost">
            View pricing
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-ink-3">
          <Link to="/security" className="hover:text-ink transition-colors">
            Security
          </Link>
          <span aria-hidden>&middot;</span>
          <Link to="/trust" className="hover:text-ink transition-colors">
            Trust
          </Link>
          <span aria-hidden>&middot;</span>
          <Link to="/changelog" className="hover:text-ink transition-colors">
            Changelog
          </Link>
          <span aria-hidden>&middot;</span>
          <Link to="/resources/what-is-soc2" className="hover:text-ink transition-colors">
            What is SOC 2?
          </Link>
        </div>
      </div>
    </div>
  );
}

// Cloudflare Web Analytics — cookieless, no banner needed. The token is read
// at build time from VITE_CF_BEACON_TOKEN (set it in .env alongside the
// Supabase keys); the beacon is only injected when the token is present, so
// the public repo never carries it and local/dev builds stay clean.
const CF_BEACON_TOKEN = import.meta.env.VITE_CF_BEACON_TOKEN as string | undefined;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "ComplianceGuard" },
      { name: "theme-color", content: "#ffffff" },
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
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Inter+Tight:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "ComplianceGuard",
          url: SITE_URL,
          logo: `${SITE_URL}/favicon.svg`,
          description:
            "Endpoint-level SOC 2, ISO 27001 and HIPAA compliance evidence on your machine, on your terms.",
        }),
      },
      ...(CF_BEACON_TOKEN
        ? [
            {
              src: "https://static.cloudflareinsights.com/beacon.min.js",
              defer: true,
              "data-cf-beacon": JSON.stringify({ token: CF_BEACON_TOKEN }),
            },
          ]
        : []),
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
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] btn-primary"
        >
          Skip to content
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </SmoothScroll>
    </MotionConfig>
  );
}
