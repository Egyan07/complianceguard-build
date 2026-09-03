import { Link } from "@tanstack/react-router";
import { Github } from "lucide-react";
import { LogoMark } from "./Logo";
import { DOWNLOAD_URL, GITHUB_URL, VERSION, salesMailto } from "@/lib/site";

const productLinks = [
  { label: "Product", to: "/" },
  { label: "Pricing", to: "/pricing" },
  { label: "Changelog", to: "/changelog" },
  { label: "Download", href: DOWNLOAD_URL },
  { label: "GitHub", href: GITHUB_URL },
] as const;

const companyLinks = [
  { label: "About", to: "/about" },
  { label: "Security", to: "/security" },
  { label: "Trust", to: "/trust" },
  { label: "Privacy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
  { label: "Contact sales", href: salesMailto("ComplianceGuard sales enquiry") },
] as const;

const resourceLinks = [
  { label: "What is SOC 2?", to: "/resources/what-is-soc2" },
  { label: "SOC 2 checklist", to: "/resources/soc2-checklist" },
  { label: "Documentation", href: `${GITHUB_URL}#readme` },
  { label: "Releases", href: `${GITHUB_URL}/releases` },
] as const;

const groupLabel = "text-[13px] font-semibold text-ink mb-3";
const linkClass =
  "text-[13px] text-ink-2 hover:text-ink hover:underline transition-colors block py-1";

type FooterLink = { label: string; to?: string; href?: string };

function FooterColumn({ label, links }: { label: string; links: readonly FooterLink[] }) {
  return (
    <nav aria-label={label}>
      <p className={groupLabel}>{label}</p>
      <ul>
        {links.map((l) => (
          <li key={l.label}>
            {l.href ? (
              <a
                href={l.href}
                className={linkClass}
                {...(l.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
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
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-fog border-t border-hairline py-12">
      <div className="container-cg">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8">
          <div className="col-span-2 md:col-span-5">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5"
              aria-label="ComplianceGuard home"
            >
              <LogoMark size={22} />
              <span className="text-[14px] font-semibold text-ink">ComplianceGuard</span>
            </Link>
            <p className="mt-3 text-[13px] text-ink-2 max-w-[320px] leading-[1.6]">
              Endpoint-level evidence for SOC 2, ISO 27001 and HIPAA. Runs on your machine. Stays
              under your control.
            </p>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ComplianceGuard on GitHub"
              className="inline-flex mt-4 p-1 -ml-1 text-ink-2 hover:text-ink transition-colors"
            >
              <Github size={18} />
            </a>
          </div>

          <div className="md:col-span-2">
            <FooterColumn label="Product" links={productLinks} />
          </div>
          <div className="md:col-span-2">
            <FooterColumn label="Company" links={companyLinks} />
          </div>
          <div className="md:col-span-3">
            <FooterColumn label="Resources" links={resourceLinks} />
          </div>
        </div>

        <div className="mt-10 pt-5 border-t border-hairline flex flex-col md:flex-row gap-3 md:gap-6 items-start md:items-center justify-between">
          <p className="text-[13px] text-ink-2">
            &copy; 2026 ComplianceGuard &middot; Source available under BSL 1.1
          </p>
          <a
            href={`${GITHUB_URL}/releases`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-ink-2 hover:text-ink transition-colors"
          >
            v{VERSION}
          </a>
        </div>
      </div>
    </footer>
  );
}
