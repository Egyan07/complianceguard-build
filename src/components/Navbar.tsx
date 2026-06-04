import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

function NavLink({
  to,
  hash,
  children,
}: {
  to: string;
  hash?: string;
  children: React.ReactNode;
}) {
  const [hover, setHover] = useState(false);
  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link
        to={to}
        hash={hash}
        className="text-[13.5px] text-text-secondary hover:text-starlight transition-colors"
      >
        {children}
      </Link>
      <motion.div
        className="absolute left-0 right-0 -bottom-1 origin-left"
        style={{ height: 1, background: "var(--accent-color)" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hover ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
    </span>
  );
}

const links: ReadonlyArray<{ to: string; label: string; hash?: string }> = [
  { to: "/", label: "Product" },
  { to: "/pricing", label: "Pricing" },
  { to: "/changelog", label: "Changelog" },
  { to: "/about", label: "About" },
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
        backgroundColor: scrolled ? "rgba(23,23,33,0.72)" : "transparent",
        backdropFilter: scrolled ? "blur(18px) saturate(140%)" : "none",
        borderBottom: scrolled ? "1px solid var(--hairline)" : "1px solid transparent",
      }}
    >
      <div className="container-cg flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span
            className="inline-block h-5 w-5 rounded-[5px] border border-hairline"
            style={{
              background:
                "linear-gradient(135deg, #5266EB 0%, #3a4ed1 60%, #272735 100%)",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
            }}
          />
          <span className="text-[15px] font-medium text-starlight tracking-tight">
            ComplianceGuard
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <NavLink key={l.label} to={l.to as "/"} hash={l.hash}>
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
              className="inline-flex items-center gap-1 text-[13.5px] text-text-secondary hover:text-starlight transition-colors"
            >
              Resources
              <ChevronDown size={13} />
            </button>
            <div
              className="absolute left-0 top-full pt-3 min-w-[200px]"
              style={{ pointerEvents: resourcesOpen ? "auto" : "none" }}
            >
              <div
                className="bg-midnight rounded-[10px] p-2 transition-all duration-150 origin-top border border-hairline"
                style={{
                  boxShadow: "0 24px 48px -16px rgba(0,0,0,0.6)",
                  opacity: resourcesOpen ? 1 : 0,
                  transform: resourcesOpen ? "translateY(0)" : "translateY(-4px)",
                }}
              >
                {resourceLinks.map((r) => (
                  <Link
                    key={r.to}
                    to={r.to}
                    onClick={() => setResourcesOpen(false)}
                    className="block px-3 py-2 text-[13.5px] text-text-secondary hover:text-starlight hover:bg-graphite rounded-[6px] transition-colors"
                  >
                    {r.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a
            href="https://github.com/Egyan07/ComplianceGuard"
            className="text-[13.5px] text-text-secondary hover:text-starlight transition-colors px-3 py-1.5"
          >
            GitHub
          </a>
          <a
            href="https://github.com/Egyan07/ComplianceGuard/releases/latest"
            className="btn-primary !text-[13px] !py-1.5 !px-3.5"
          >
            Download
          </a>
        </div>

        <button
          className="md:hidden p-2 text-starlight"
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-hairline bg-midnight/95 backdrop-blur-xl">
          <div className="container-cg py-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to as "/"}
                onClick={() => setOpen(false)}
                className="text-[15px] text-starlight py-1"
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-3 mt-1 border-t border-hairline">
              <p className="mono-tag mb-2">Resources</p>
              {resourceLinks.map((r) => (
                <Link
                  key={r.to}
                  to={r.to}
                  onClick={() => setOpen(false)}
                  className="block py-1.5 text-[14px] text-text-secondary"
                >
                  {r.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2 pt-3">
              <a
                href="https://github.com/Egyan07/ComplianceGuard/releases/latest"
                className="btn-primary"
              >
                Download free
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
