import { useState } from "react";
import { supabase } from "@/lib/supabase";

export function WaitlistForm({
  source = "landing_cta",
  buttonLabel = "Get Early Access",
  variant = "onNavy",
}: {
  source?: string;
  buttonLabel?: string;
  variant?: "onNavy" | "onLight";
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrMsg(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      setErrMsg("Please enter a valid email.");
      return;
    }
    if (!supabase) {
      setState("error");
      setErrMsg("Supabase not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
      return;
    }
    setState("loading");
    const { error } = await supabase.from("waitlist").insert({ email, source });
    if (error) {
      setState("error");
      setErrMsg("Something went wrong. Try again.");
      return;
    }
    setState("success");
  };

  const isLight = variant === "onLight";

  if (state === "success") {
    return (
      <p className={`${isLight ? "text-navy" : "text-white"} text-[16px] font-medium`}>
        You're on the list. We'll be in touch.
      </p>
    );
  }

  return (
    <div className={`w-full ${isLight ? "" : "max-w-md mx-auto"}`}>
      <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`flex-1 px-4 py-3 rounded-md text-foreground placeholder:text-foreground/40 outline-none focus:ring-2 focus:ring-teal ${
            isLight ? "bg-white border border-border" : "bg-white"
          }`}
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className={`${isLight ? "btn-primary" : "btn-on-navy"} disabled:opacity-60`}
        >
          {state === "loading" ? "Joining..." : buttonLabel}
        </button>
      </form>
      {errMsg && (
        <p className={`mt-3 text-[13px] text-left ${isLight ? "text-danger" : "text-[#FCA5A5]"}`}>
          {errMsg}
        </p>
      )}
    </div>
  );
}
