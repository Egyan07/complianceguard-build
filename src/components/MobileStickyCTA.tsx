import { useEffect, useState } from "react";
import { DOWNLOAD_URL } from "@/lib/site";

export function MobileStickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    if (!hero) return;
    const obs = new IntersectionObserver(([entry]) => setShow(!entry.isIntersecting), {
      threshold: 0,
    });
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  if (!show) return null;

  return (
    <a
      href={DOWNLOAD_URL}
      className="md:hidden fixed inset-x-3 z-50 bg-azure text-snow text-center py-3 font-medium text-[15px] rounded-full"
      style={{
        bottom: "calc(12px + env(safe-area-inset-bottom))",
        letterSpacing: "-0.01em",
        boxShadow: "0 8px 24px -8px rgba(0,113,227,0.4)",
      }}
    >
      Download &mdash; Free, no account required
    </a>
  );
}
