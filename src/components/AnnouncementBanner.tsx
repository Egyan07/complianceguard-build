import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

const KEY = "cg_announce_v331_dismissed";

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
    <div className="bg-ink text-snow text-[12px]" style={{ paddingTop: 0 }}>
      <div className="container-cg flex items-center justify-between gap-4 py-2.5">
        <p className="flex-1 text-center" style={{ letterSpacing: "-0.003em" }}>
          v3.3.1 ships macOS support &middot; multi-framework scoring &middot; ~568 tests passing.{" "}
          <Link to="/changelog" className="text-snow underline underline-offset-2 hover:opacity-80 whitespace-nowrap font-medium">
            See what&apos;s new &rsaquo;
          </Link>
        </p>
        <button
          aria-label="Dismiss announcement"
          onClick={() => {
            try { sessionStorage.setItem(KEY, "1"); } catch { /* noop */ }
            setVisible(false);
          }}
          className="text-snow/70 hover:text-snow transition-colors shrink-0"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
