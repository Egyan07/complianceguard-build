import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Reveal } from "./Reveal";
import { FAQS } from "@/lib/faq";

export function HomepageFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-fog py-24 md:py-32">
      <div className="container-cg max-w-3xl">
        <Reveal>
          <p className="eyebrow mb-4">FAQ</p>
          <h2 className="display-2">Common questions.</h2>
        </Reveal>

        <div className="mt-10 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={Math.min(i * 0.04, 0.2)}>
                <div className="card-snow overflow-hidden">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-fog/60 transition-colors"
                    >
                      <span className="text-[16px] font-semibold text-ink">{f.q}</span>
                      <span className="shrink-0 text-azure" aria-hidden>
                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                      </span>
                    </button>
                  </h3>
                  <div
                    className="grid transition-[grid-template-rows] duration-300"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      transitionTimingFunction: "var(--ease-expo)",
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-[15px] text-ink-2 leading-[1.7]">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
