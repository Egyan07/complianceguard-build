import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

function NavLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="text-[12px] text-ink/80 hover:text-ink transition-colors"
      style={{ letterSpacing: "-0.003em" }}
    >
      {children}
    </Link>
  );
}

const links: ReadonlyArray<{ to: string; label: string }> = [
  { to: "/", label: "Product" },
  { to: "/pricing", label: "Pricing" },
  { to: "/changelog", label: "Changelog" },
  { to: "/about", label: "About" },
  { to: "/security", label: "Security" },
];

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
    const onScroll = () => setScrolled(window.scrollY > 12);
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
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(245,245,247,0.82)" : "rgba(245,245,247,0.72)",
        backdropFilter: "blur(20px) saturate(180%)",
        borderBottom: scrolled ? "1px solid #e8e8ed" : "1px solid transparent",
      }}
    >
      <div className="container-cg flex h-11 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 64 64" fill="none" aria-hidden>
            <defs>
              <linearGradient id="nav-cg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0A84FF" />
                <stop offset="100%" stopColor="#0040DD" />
              </linearGradient>
            </defs>
            <path
              d="M32 3 L57 12 V31 C57 47 46 57 32 61 C18 57 7 47 7 31 V12 Z"
              fill="url(#nav-cg)"
            />
            <path
              d="M20 33 L29 42 L46 23"
              stroke="#ffffff"
              strokeWidth={5}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <span className="text-[14px] font-semibold text-ink" style={{ letterSpacing: "-0.012em" }}>
            ComplianceGuard
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink key={l.label} to={l.to as "/"}>
              {l.label}
            </NavLink>
          ))}
          <div
            ref={resourcesRef}
            className="relative"
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setResourcesOpen((v) => !v)}
              className="inline-flex items-center gap-1 text-[12px] text-ink/80 hover:text-ink transition-colors"
            >
              Resources
              <ChevronDown size={11} />
            </button>
            <div
              className="absolute right-0 top-full pt-3 min-w-[200px]"
              style={{ pointerEvents: resourcesOpen ? "auto" : "none" }}
            >
              <div
                className="bg-snow rounded-[16px] p-2 transition-all duration-200 origin-top"
                style={{
                  border: "1px solid #e8e8ed",
                  opacity: resourcesOpen ? 1 : 0,
                  transform: resourcesOpen ? "translateY(0)" : "translateY(-4px)",
                }}
              >
                {resourceLinks.map((r) => (
                  <Link
                    key={r.to}
                    to={r.to}
                    onClick={() => setResourcesOpen(false)}
                    className="block px-3 py-2 text-[13px] text-ink hover:bg-fog rounded-[10px] transition-colors"
                  >
                    {r.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/Egyan07/ComplianceGuard"
            className="text-[12px] text-ink/80 hover:text-ink transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://github.com/Egyan07/ComplianceGuard/releases/latest"
            className="bg-azure text-snow text-[12px] font-normal px-3 py-1 rounded-full hover:bg-[#0077ed] transition-colors"
            style={{ letterSpacing: "-0.003em" }}
          >
            Download
          </a>
        </div>

        <button
          className="md:hidden p-2 text-ink"
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-silver-mist bg-snow">
          <div className="container-cg py-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to as "/"}
                onClick={() => setOpen(false)}
                className="text-[17px] text-ink py-1.5"
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-3 mt-1 border-t border-silver-mist">
              <p className="text-[12px] uppercase tracking-wider text-text-dim mb-2" style={{ color: "var(--text-dim)" }}>
                Resources
              </p>
              {resourceLinks.map((r) => (
                <Link
                  key={r.to}
                  to={r.to}
                  onClick={() => setOpen(false)}
                  className="block py-1.5 text-[15px] text-ink"
                >
                  {r.label}
                </Link>
              ))}
            </div>
            <a
              href="https://github.com/Egyan07/ComplianceGuard/releases/latest"
              className="btn-primary mt-2"
            >
              Download
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
