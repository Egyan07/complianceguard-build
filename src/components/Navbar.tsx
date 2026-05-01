import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { to: "/", label: "Features" },
  { to: "/pricing", label: "Pricing" },
  { to: "/changelog", label: "Changelog" },
  { to: "/about", label: "About" },
] as const;

const resourceLinks = [
  { to: "/resources/what-is-soc2", label: "What is SOC 2?" },
  { to: "/resources/soc2-checklist", label: "SOC 2 Checklist" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const resourcesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-background ${scrolled ? "border-b border-border" : ""}`}
    >
      <div className="container-cg flex h-16 items-center justify-between">
        <Link to="/" className="text-[18px] font-bold text-navy tracking-tight">
          ComplianceGuard
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <div key={l.to + l.label} className="contents">
              <Link
                to={l.to}
                hash={l.label === "Features" ? "features" : undefined}
                className="text-[15px] text-foreground/80 hover:text-navy transition-colors"
              >
                {l.label}
              </Link>
              {l.label === "Changelog" && (
                <div
                  key="resources-dd"
                  ref={resourcesRef}
                  className="relative"
                  onMouseEnter={() => setResourcesOpen(true)}
                  onMouseLeave={() => setResourcesOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setResourcesOpen((v) => !v)}
                    className="inline-flex items-center gap-1 text-[15px] text-foreground/80 hover:text-navy transition-colors"
                    aria-haspopup="menu"
                    aria-expanded={resourcesOpen}
                  >
                    Resources
                    <ChevronDown size={14} />
                  </button>
                  <div
                    className="absolute left-0 top-full pt-2 min-w-[200px]"
                    style={{
                      pointerEvents: resourcesOpen ? "auto" : "none",
                    }}
                  >
                    <div
                      role="menu"
                      className="bg-background rounded-[8px] p-2 transition-all duration-150 origin-top"
                      style={{
                        border: "1px solid #E2E8F0",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                        opacity: resourcesOpen ? 1 : 0,
                        transform: resourcesOpen ? "translateY(0)" : "translateY(-4px)",
                      }}
                    >
                      {resourceLinks.map((r) => (
                        <Link
                          key={r.to}
                          to={r.to}
                          onClick={() => setResourcesOpen(false)}
                          className="block px-3 py-2 text-[14px] text-foreground/80 hover:text-navy hover:bg-[#F8F9FA] rounded-[4px] transition-colors"
                        >
                          {r.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a
            href="https://github.com/Egyan07/ComplianceGuard/releases/latest"
            className="btn-ghost !py-2 !px-4 !text-sm"
          >
            Download Free
          </a>
          <a
            href="mailto:alexisegyan1232@gmail.com?subject=ComplianceGuard%20Pro%20Trial"
            className="btn-primary !py-2 !px-4 !text-sm"
          >
            Get Pro
          </a>
        </div>

        <button
          className="md:hidden p-2 text-navy"
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container-cg py-4 flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.to + l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-[16px] text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-1 border-t border-[#E2E8F0]">
              <p className="text-[12px] uppercase font-semibold text-[#9CA3AF] tracking-[0.1em] mb-2 mt-3">
                Resources
              </p>
              {resourceLinks.map((r) => (
                <Link
                  key={r.to}
                  to={r.to}
                  onClick={() => setOpen(false)}
                  className="block py-1.5 text-[15px] text-foreground/80"
                >
                  {r.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <a href="https://github.com/Egyan07/ComplianceGuard/releases/latest" className="btn-ghost">Download Free</a>
              <a href="mailto:alexisegyan1232@gmail.com?subject=ComplianceGuard%20Pro%20Trial" className="btn-primary">Get Pro</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
