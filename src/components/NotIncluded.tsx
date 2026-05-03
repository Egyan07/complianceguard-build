import { X } from "lucide-react";
import { FadeUp } from "./FadeUp";

const ITEMS = [
  {
    title: "No auditor marketplace",
    body: "We don't take a cut for sending you to an auditor. Use whoever you want.",
  },
  {
    title: "No Slack or Jira integrations",
    body: "If you need 40 integrations, you're not our customer. We do SOC 2 evidence — that's it.",
  },
  {
    title: "No auditor lock-in",
    body: "We don't take a referral cut for sending you to an auditor. Use whoever you want, whenever you're ready.",
  },
  {
    title: "No sales calls or demos",
    body: "Download the free tier and try it. If it works, pay us. If not, walk away.",
  },
  {
    title: "No 'enterprise edition' upsell",
    body: "Pro is $49/month for everyone. There is no hidden tier you'll get pushed into.",
  },
  {
    title: "No data uploaded to our servers",
    body: "Other tools call this 'cloud-native.' We call it a contradiction for a privacy product.",
  },
];

export function NotIncluded() {
  return (
    <section className="bg-background py-24">
      <div className="container-cg">
        <FadeUp>
          <p className="eyebrow mb-4">Honest Positioning</p>
          <h2 className="text-[32px] md:text-[40px] font-bold text-navy max-w-3xl leading-tight">
            What's <span className="text-danger">not</span> included.
          </h2>
          <p className="mt-6 text-[18px] text-text-secondary max-w-2xl">
            We'd rather be honest about what we don't do than waste your time later. Here's what
            ComplianceGuard intentionally leaves out.
          </p>
        </FadeUp>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ITEMS.map((it, i) => (
            <FadeUp key={it.title} delay={i * 0.04}>
              <div className="border border-border rounded-[12px] p-6 h-full bg-white">
                <div className="w-9 h-9 rounded-md bg-danger/10 text-danger flex items-center justify-center">
                  <X size={18} strokeWidth={3} />
                </div>
                <h3 className="mt-4 text-[16px] font-semibold text-navy">{it.title}</h3>
                <p className="mt-2 text-[14px] text-text-secondary leading-[1.65]">{it.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
