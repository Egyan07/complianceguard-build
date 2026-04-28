import { useState } from "react";
import { supabase } from "@/lib/supabase";

export function WaitlistForm({ source = "landing_cta" }: { source?: string }) {
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
    const { error } = await supabase
      .from("waitlist")
      .insert({ email, source });
    if (error) {
      setState("error");
      setErrMsg("Something went wrong. Try again.");
      return;
    }
    setState("success");
  };

  if (state === "success") {
    return (
      <p className="text-white text-[16px] font-medium">
        You're on the list. We'll be in touch.
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto"
    >
      <input
        type="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-4 py-3 rounded-md bg-white text-foreground placeholder:text-foreground/40 outline-none focus:ring-2 focus:ring-teal"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="btn-on-navy disabled:opacity-60"
      >
        {state === "loading" ? "Joining..." : "Get Early Access"}
      </button>
      {errMsg && (
        <p className="text-[13px] text-[#FCA5A5] sm:absolute sm:mt-14 w-full">
          {errMsg}
        </p>
      )}
    </form>
  );
}
