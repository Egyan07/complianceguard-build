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
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-navy text-white text-center py-4 font-semibold text-[15px]"
      style={{ borderTop: "1px solid #2D4E8A" }}
    >
      Download Free — No account required
    </a>
  );
}
