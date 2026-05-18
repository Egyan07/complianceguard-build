import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

const KEY = "cg_announce_v320_dismissed";

export function AnnouncementBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY) !== "1") setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="bg-navy text-white text-[13px] md:text-[14px]">
      <div className="container-cg flex items-center justify-between gap-4 py-2">
        <p className="flex-1 text-center">
          v3.2.0 is out — Enterprise air-gapped tier, multi-framework scoring, 530 tests passing.{" "}
          <Link to="/changelog" className="text-teal font-semibold hover:underline whitespace-nowrap">
            See what&apos;s new →
          </Link>
        </p>
        <button
          aria-label="Dismiss announcement"
          onClick={() => {
            try { sessionStorage.setItem(KEY, "1"); } catch {}
            setVisible(false);
          }}
          className="text-teal hover:text-white transition-colors shrink-0"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
