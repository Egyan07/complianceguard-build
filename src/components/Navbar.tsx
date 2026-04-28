import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Features" },
  { to: "/pricing", label: "Pricing" },
  { to: "/changelog", label: "Changelog" },
  { to: "/about", label: "About" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
            <Link
              key={l.to + l.label}
              to={l.to}
              hash={l.label === "Features" ? "features" : undefined}
              className="text-[15px] text-foreground/80 hover:text-navy transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/"
            className="btn-ghost !py-2 !px-4 !text-sm"
          >
            Download Free
          </a>
          <Link to="/pricing" className="btn-primary !py-2 !px-4 !text-sm">
            Get Pro
          </Link>
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
            <div className="flex flex-col gap-2 pt-2">
              <a href="https://github.com/" className="btn-ghost">Download Free</a>
              <Link to="/pricing" className="btn-primary">Get Pro</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
