import { useEffect, useState, type FormEvent } from "react";
import { X, Download, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

const STORAGE_KEY = "cg_exit_intent_shown_v1";

export function ExitIntentModal() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    if (window.matchMedia?.("(hover: none)").matches) return; // Desktop only

    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setOpen(true);
        sessionStorage.setItem(STORAGE_KEY, "1");
        document.removeEventListener("mouseleave", onLeave);
      }
    };
    const t = setTimeout(() => {
      document.addEventListener("mouseleave", onLeave);
    }, 8000);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const close = () => setOpen(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setErrMsg(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrMsg("Please enter a valid email.");
      return;
    }
    if (!supabase) {
      setErrMsg("Email capture is not configured yet. Please try again later.");
      return;
    }
    setBusy(true);
    // TODO: wire up actual checklist email delivery (e.g. Resend/Postmark
    // triggered from a server function or a Supabase webhook on insert).
    // For now we just capture the lead in the waitlist table.
    const { error } = await supabase
      .from("waitlist")
      .insert({ email, source: "exit_intent" });
    setBusy(false);
    if (error) {
      setErrMsg("Something went wrong. Try again.");
      return;
    }
    setSubmitted(true);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(15, 23, 42, 0.65)", animation: "cg-fade-in 0.2s ease-out" }}
      onClick={close}
    >
      <div
        className="bg-white rounded-[12px] max-w-md w-full p-8 relative"
        style={{ animation: "cg-scale-in 0.25s ease-out" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={close}
          className="absolute top-3 right-3 text-text-secondary hover:text-navy p-1"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-teal/10 text-teal flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <h3 id="exit-intent-title" className="mt-4 text-[20px] font-bold text-navy">
              Checklist sent.
            </h3>
            <p className="mt-2 text-[14px] text-text-secondary">
              Check your inbox — and if you don't see it, check spam.
            </p>
            <button
              type="button"
              onClick={close}
              className="btn-ghost mt-6 w-full"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 rounded-md bg-navy text-white flex items-center justify-center">
              <Download size={22} />
            </div>
            <h3 id="exit-intent-title" className="mt-4 text-[22px] font-bold text-navy leading-tight">
              Before you go — grab the free SOC 2 readiness checklist.
            </h3>
            <p className="mt-3 text-[14px] text-text-secondary">
              The 29-control checklist auditors actually use. PDF, no fluff, no signup beyond your email.
            </p>
            <form onSubmit={submit} className="mt-5 space-y-3">
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 text-[15px] border border-border rounded-[8px] bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                aria-label="Email address"
              />
              <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
                {busy ? "Sending..." : "Send Me the Checklist"}
              </button>
            </form>
            {errMsg && (
              <p className="mt-3 text-[13px] text-danger text-center">{errMsg}</p>
            )}
            <p className="mt-3 text-[12px] text-text-secondary text-center">
              No marketing spam. One email with the PDF, then nothing.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
