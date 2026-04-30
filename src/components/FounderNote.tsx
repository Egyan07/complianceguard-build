import { FadeUp } from "./FadeUp";

export function FounderNote() {
  return (
    <section className="bg-background py-20">
      <div className="container-cg max-w-2xl">
        <FadeUp>
          <div
            className="rounded-[12px] p-8 md:p-10 bg-white"
            style={{ border: "1px solid #E2E8F0" }}
          >
            <p className="eyebrow mb-4">A note from the founder</p>
            <p className="text-[17px] text-foreground leading-[1.8]">
              I built ComplianceGuard because I got quoted $11,200 for Vanta when our team was doing
              $8K MRR. There was no version of reality where we paid that. Four months later, this exists.
              <br /><br />
              If you're a bootstrapped founder facing the same wall, this is for you. Email me directly
              if anything is broken — I read every message.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-[18px]"
                style={{ background: "linear-gradient(135deg, #1B3A6B, #1A8C5F)" }}
                aria-hidden="true"
              >
                A
              </div>
              <div>
                <div
                  className="text-[22px] text-navy"
                  style={{ fontFamily: "'Caveat', 'Brush Script MT', cursive", fontWeight: 600 }}
                >
                  Egyan
                </div>
                <div className="text-[13px] text-text-secondary">Founder, ComplianceGuard</div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
