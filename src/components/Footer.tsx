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

const heading = "mono-tag mb-5";
const linkClass =
  "text-[13.5px] text-text-secondary hover:text-starlight transition-colors block py-1";

export function Footer() {
  return (
    <footer
      className="bg-deepspace border-t border-hairline"
      style={{ paddingTop: 96, paddingBottom: 40 }}
    >
      <div className="container-cg">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10">
          <div className="col-span-2 md:col-span-5">
            <Link to="/" className="flex items-center gap-2">
              <span
                className="inline-block h-5 w-5 rounded-[5px] border border-hairline"
                style={{
                  background:
                    "linear-gradient(135deg, #5266EB 0%, #3a4ed1 60%, #272735 100%)",
                }}
              />
              <span className="text-[15px] font-medium text-starlight tracking-tight">
                ComplianceGuard
              </span>
            </Link>
            <p className="mt-4 text-[13.5px] text-text-secondary max-w-[320px] leading-[1.7]">
              Endpoint-level evidence for SOC 2, ISO 27001 and HIPAA. Runs on
              your machine. Stays under your control.
            </p>
            <a
              href="https://github.com/Egyan07/ComplianceGuard"
              aria-label="GitHub"
              className="inline-flex mt-6 text-text-secondary hover:text-starlight transition-colors"
            >
              <Github size={18} />
            </a>
          </div>

          <div className="md:col-span-2">
            <h3 className={heading}>Product</h3>
            <ul>
              {productLinks.map((l) => (
                <li key={l.label}>
                  {l.external ? (
                    <a href={l.href} className={linkClass}>
                      {l.label}
                    </a>
                  ) : (
                    <Link to={l.to!} className={linkClass}>
                      {l.label}
                    </Link>
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
                    <a href={l.href} className={linkClass}>
                      {l.label}
                    </a>
                  ) : (
                    <Link to={l.to!} className={linkClass}>
                      {l.label}
                    </Link>
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
                    <Link to={l.to!} className={linkClass}>
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-16 border-t border-hairline flex flex-col md:flex-row gap-3 md:gap-6 items-start md:items-center justify-between"
          style={{ paddingTop: 28 }}
        >
          <p className="text-[12.5px] text-text-secondary">
            © 2026 ComplianceGuard · BSL 1.1
          </p>
          <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[6px] border border-hairline mono-tag">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--accent-color)" }}
            />
            v3.3.1 · all systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}
