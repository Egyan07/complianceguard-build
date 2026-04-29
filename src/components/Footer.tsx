import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container-cg py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <Link to="/" className="text-[18px] font-bold text-navy">
            ComplianceGuard
          </Link>
          <nav className="flex flex-wrap gap-6 text-[14px] text-foreground/70">
            <Link to="/" hash="features" className="hover:text-navy">Features</Link>
            <Link to="/pricing" className="hover:text-navy">Pricing</Link>
            <Link to="/changelog" className="hover:text-navy">Changelog</Link>
            <Link to="/about" className="hover:text-navy">About</Link>
            <a href="https://github.com/Egyan07/ComplianceGuard" className="hover:text-navy">GitHub</a>
          </nav>
        </div>
        <div className="mt-8 pt-6 border-t border-border flex flex-col md:flex-row gap-3 md:gap-6 items-start md:items-center justify-between text-[13px] text-foreground/60">
          <p>© 2026 ComplianceGuard. Made by a bootstrapped founder who got tired of paying $10K/year.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-navy">Privacy Policy</a>
            <a href="#" className="hover:text-navy">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
