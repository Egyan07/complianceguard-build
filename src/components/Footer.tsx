import { Link } from "@tanstack/react-router";
import { Github } from "lucide-react";

const productLinks = [
  { label: "Features", to: "/", hash: "features", external: false },
  { label: "Pricing", to: "/pricing", external: false },
  { label: "Changelog", to: "/changelog", external: false },
  { label: "Download Free", href: "https://github.com/Egyan07/ComplianceGuard/releases/latest", external: true },
  { label: "GitHub", href: "https://github.com/Egyan07/ComplianceGuard", external: true },
];

const companyLinks = [
  { label: "About", to: "/about", external: false },
  { label: "Security", to: "/security", external: false },
  { label: "Privacy Policy", to: "/privacy", external: false },
  { label: "Contact", href: "mailto:alexisegyan1232@gmail.com", external: true },
];

const trustItems = [
  "BSL 1.1 Open Core",
  "311 Tests Passing",
  "4 Green CI Workflows",
  "Ed25519 License Signing",
  "AICPA TSC-Mapped",
];

const colHeading = "text-[12px] uppercase font-semibold text-[#9CA3AF] tracking-[0.1em] mb-4";
const linkClass = "text-[14px] text-foreground/70 hover:text-navy transition-colors block";

export function Footer() {
  return (
    <footer className="bg-background border-t border-[#E2E8F0]" style={{ paddingTop: 64, paddingBottom: 32 }}>
      <div className="container-cg">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link to="/" className="text-[20px] font-bold text-navy">
              ComplianceGuard
            </Link>
            <p className="mt-3 text-[14px] text-[#4A5568] max-w-[260px] leading-relaxed">
              On-premise SOC 2 compliance for bootstrapped founders. Your evidence never leaves your machine.
            </p>
            <a
              href="https://github.com/Egyan07/ComplianceGuard"
              aria-label="GitHub"
              className="inline-flex mt-5 text-navy hover:text-teal transition-colors"
            >
              <Github size={20} />
            </a>
          </div>

          {/* Product */}
          <div className="md:col-span-2">
            <h3 className={colHeading}>Product</h3>
            <ul className="space-y-2.5">
              {productLinks.map((l) => (
                <li key={l.label}>
                  {l.external ? (
                    <a href={l.href} className={linkClass}>{l.label}</a>
                  ) : (
                    <Link to={l.to!} hash={l.hash} className={linkClass}>{l.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h3 className={colHeading}>Company</h3>
            <ul className="space-y-2.5">
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

          {/* Trust */}
          <div className="md:col-span-3">
            <h3 className={colHeading}>Trust</h3>
            <ul className="space-y-2.5">
              {trustItems.map((item) => (
                <li key={item} className="flex items-center gap-2 text-[14px] text-foreground/70">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 border-t border-[#E2E8F0] flex flex-col md:flex-row gap-3 md:gap-6 items-start md:items-center justify-between"
          style={{ paddingTop: 24 }}
        >
          <p className="text-[13px] text-foreground/60">
            © 2026 ComplianceGuard. Made by a bootstrapped founder who got tired of paying $10K/year.
          </p>
          <span className="inline-flex items-center px-2.5 py-1 rounded-[4px] border border-[#E2E8F0] text-[12px] text-[#9CA3AF]">
            v3.1.0
          </span>
        </div>
      </div>
    </footer>
  );
}
