import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { LogoMark } from "./Logo";
import { DOWNLOAD_URL, GITHUB_URL } from "@/lib/site";

const links = [
  { to: "/pricing", label: "Pricing" },
  { to: "/security", label: "Security" },
  { to: "/about", label: "About" },
  { to: "/changelog", label: "Changelog" },
] as const;

const resourceLinks = [
  { to: "/resources/what-is-soc2", label: "What is SOC 2?" },
  { to: "/resources/soc2-checklist", label: "SOC 2 Checklist" },
] as const;

function NavLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="px-1 py-2 text-[14px] text-ink-2 hover:text-ink transition-colors"
      activeProps={{
        className: "px-1 py-2 text-[14px] text-ink font-medium",
        "aria-current": "page",
      }}
      style={{ letterSpacing: "-0.006em" }}
    >
      {label}
    </Link>
  );
}

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
    if (!resourcesOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setResourcesOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [resourcesOpen]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-[background-color,border-color] duration-300"
      style={{
        backgroundColor: "rgba(255,255,255,0.78)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: scrolled ? "1px solid var(--hairline)" : "1px solid transparent",
      }}
    >
      <div className="container-cg flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group" aria-label="ComplianceGuard home">
          <LogoMark size={26} />
          <span
            className="text-[15px] font-semibold text-ink transition-opacity group-hover:opacity-80"
            style={{ letterSpacing: "-0.012em" }}
          >
            ComplianceGuard
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6" aria-label="Main">
          {links.map((l) => (
            <NavLink key={l.label} to={l.to} label={l.label} />
          ))}
          <div
            ref={resourcesRef}
            className="relative"
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <button
              type="button"
              aria-expanded={resourcesOpen}
              aria-haspopup="menu"
              onClick={() => setResourcesOpen((v) => !v)}
              className="inline-flex items-center gap-1 px-1 py-2 text-[14px] text-ink-2 hover:text-ink transition-colors"
              style={{ letterSpacing: "-0.006em" }}
            >
              Resources
              <ChevronDown
                size={12}
                className="transition-transform duration-200"
                style={{ transform: resourcesOpen ? "rotate(180deg)" : undefined }}
              />
            </button>
            {resourcesOpen && (
              <div className="absolute right-0 top-full pt-2 min-w-[210px]">
                <div
                  className="bg-snow rounded-[14px] p-2 border border-hairline"
                  style={{ boxShadow: "var(--shadow-card)" }}
                >
                  {resourceLinks.map((r) => (
                    <Link
                      key={r.to}
                      to={r.to}
                      onClick={() => setResourcesOpen(false)}
                      className="block px-3 py-2 text-[14px] text-ink hover:bg-fog rounded-[10px] transition-colors"
                    >
                      {r.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-1 py-2 text-[14px] text-ink-2 hover:text-ink transition-colors"
          >
            GitHub
          </a>
          <a
            href={DOWNLOAD_URL}
            className="bg-azure text-snow text-[14px] font-medium px-4 py-1.5 rounded-full hover:bg-[var(--azure-hover)] transition-colors"
            style={{ letterSpacing: "-0.006em" }}
          >
            Download
          </a>
        </div>

        <button
          className="md:hidden p-2 -mr-2 text-ink"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-hairline bg-snow max-h-[calc(100dvh-56px)] overflow-y-auto">
          <nav className="container-cg py-4 flex flex-col gap-1" aria-label="Mobile">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-[17px] text-ink py-2.5"
                activeProps={{
                  className: "text-[17px] text-ink font-semibold py-2.5",
                  "aria-current": "page",
                }}
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-3 mt-2 border-t border-hairline">
              <p className="mono-tag mb-2">Resources</p>
              {resourceLinks.map((r) => (
                <Link
                  key={r.to}
                  to={r.to}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-[15px] text-ink"
                >
                  {r.label}
                </Link>
              ))}
            </div>
            <a href={DOWNLOAD_URL} className="btn-primary mt-3 mb-2">
              Download
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
