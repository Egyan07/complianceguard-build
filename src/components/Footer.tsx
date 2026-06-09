import { Link } from "@tanstack/react-router";
import { Github } from "lucide-react";

const productLinks = [
  { label: "Product", to: "/", external: false },
  { label: "Pricing", to: "/pricing", external: false },
  { label: "Changelog", to: "/changelog", external: false },
  {
    label: "Download",
    href: "https://github.com/Egyan07/ComplianceGuard/releases/latest",
    external: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/Egyan07/ComplianceGuard",
    external: true,
  },
] as const;

const companyLinks = [
  { label: "About", to: "/about", external: false },
  { label: "Security", to: "/security", external: false },
  { label: "Privacy", to: "/privacy", external: false },
  { label: "Contact", href: "mailto:alexisegyan1232@gmail.com", external: true },
] as const;

const resourceLinks = [
  { label: "What is SOC 2?", to: "/resources/what-is-soc2", external: false },
  { label: "SOC 2 checklist", to: "/resources/soc2-checklist", external: false },
  {
    label: "Documentation",
    href: "https://github.com/Egyan07/ComplianceGuard#readme",
    external: true,
  },
  {
    label: "Releases",
    href: "https://github.com/Egyan07/ComplianceGuard/releases",
    external: true,
  },
] as const;

const heading = "text-[12px] font-semibold text-ink mb-3";
const linkClass =
  "text-[12px] text-ink/70 hover:text-ink hover:underline transition-colors block py-1";

export function Footer() {
  return (
    <footer
      className="bg-fog"
      style={{ paddingTop: 28, paddingBottom: 28, borderTop: "1px solid #e8e8ed" }}
    >
      <div className="container-cg">
        <p className="text-[12px] text-ink/60 mb-6">
          More ways to get compliant:{" "}
          <a
            href="https://github.com/Egyan07/ComplianceGuard/releases/latest"
            className="text-cobalt-link hover:underline"
          >
            Download ComplianceGuard
          </a>{" "}
          or{" "}
          <a href="mailto:alexisegyan1232@gmail.com" className="text-cobalt-link hover:underline">
            Talk to sales
          </a>.
        </p>

        <div className="border-t border-silver-mist pt-8 grid grid-cols-2 md:grid-cols-12 gap-8">
          <div className="col-span-2 md:col-span-5">
            <Link to="/" className="flex items-center gap-2">
              <svg width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden>
                <path
                  d="M7 0L0 3v6c0 5.25 3.5 8.25 7 9 3.5-.75 7-3.75 7-9V3L7 0z"
                  fill="#1d1d1f"
                />
              </svg>
              <span className="text-[13px] font-medium text-ink">ComplianceGuard</span>
            </Link>
            <p className="mt-3 text-[12px] text-ink/60 max-w-[320px] leading-[1.5]">
              Endpoint-level evidence for SOC 2, ISO 27001 and HIPAA. Runs on your
              machine. Stays under your control.
            </p>
            <a
              href="https://github.com/Egyan07/ComplianceGuard"
              aria-label="GitHub"
              className="inline-flex mt-4 text-ink/60 hover:text-ink transition-colors"
            >
              <Github size={16} />
            </a>
          </div>

          <div className="md:col-span-2">
            <h3 className={heading}>Product</h3>
            <ul>
              {productLinks.map((l) => (
                <li key={l.label}>
                  {l.external ? (
                    <a href={l.href} className={linkClass}>{l.label}</a>
                  ) : (
                    <Link to={l.to!} className={linkClass}>{l.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className={heading}>Company</h3>
            <ul>
              {companyLinks.map((l) => (
                <li key={l.label}>
                  {l.external ? (
                    <a href={l.href} className={linkClass}>{l.label}</a>
                  ) : (
                    <Link to={l.to!} className={linkClass}>{l.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className={heading}>Resources</h3>
            <ul>
              {resourceLinks.map((l) => (
                <li key={l.label}>
                  {l.external ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link to={l.to!} className={linkClass}>{l.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-5 border-t border-silver-mist flex flex-col md:flex-row gap-3 md:gap-6 items-start md:items-center justify-between">
          <p className="text-[12px] text-ink/60">
            Copyright &copy; 2026 ComplianceGuard. BSL 1.1. All rights reserved.
          </p>
          <span className="inline-flex items-center gap-2 text-[12px] text-ink/60">
            <span className="h-1.5 w-1.5 rounded-full bg-azure" />
            v3.3.1 &middot; all systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}
