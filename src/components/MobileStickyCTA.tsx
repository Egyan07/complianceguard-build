import { useEffect, useState } from "react";

export function MobileStickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  if (!show) return null;

  return (
    <a
      href="https://github.com/Egyan07/ComplianceGuard/releases/latest"
      className="md:hidden fixed bottom-3 inset-x-3 z-50 bg-azure text-snow text-center py-3 font-normal text-[15px] rounded-full"
      style={{ letterSpacing: "-0.022em", boxShadow: "0 8px 24px -8px rgba(0,113,227,0.4)" }}
    >
      Download &mdash; Free, no account required
    </a>
  );
}
