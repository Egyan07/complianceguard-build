import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "@tanstack/react-router";

/**
 * Wrap children to fade in on every route change.
 * Lightweight — just a CSS class swap on pathname change.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [key, setKey] = useState(location.pathname);

  useEffect(() => {
    setKey(location.pathname);
  }, [location.pathname]);

  return (
    <div key={key} className="cg-page-transition">
      {children}
    </div>
  );
}
