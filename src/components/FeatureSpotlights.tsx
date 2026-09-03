import { Cloud, FileText, Lock, WifiOff, type LucideIcon } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

/**
 * Product section: two spotlight rows built on real product screenshots,
 * followed by a compact grid for the remaining capabilities.
 */

function WindowFrame({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <div className="card-snow overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="flex items-center gap-2 px-4 py-2.5 bg-fog border-b border-hairline">
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
        <span className="ml-2 text-[12px] text-ink-3">ComplianceGuard</span>
      </div>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className="block w-full h-auto"
      />
    </div>
  );
}

const spotlights = [
  {
    eyebrow: "Real-time scoring",
    title: "Know exactly where you stand.",
    body: "Your compliance score updates the moment a scan completes. See which of the 54 SOC 2 controls you're passing and which need work — with remediation scripts for the gaps — before you ever engage an auditor.",
    img: {
      src: "/screenshots/Dashboard.png",
      alt: "ComplianceGuard dashboard showing a real-time compliance score with one-click access to collect evidence, run an evaluation, and export an audit-ready PDF report",
      width: 1440,
      height: 900,
    },
  },
  {
    eyebrow: "Control heatmap",
    title: "Every control, color-coded.",
    body: "Every SOC 2 control at a glance — passing, partial, and failing — with per-control gap details and inline remediation scripts for the findings that can be automated.",
    img: {
      src: "/screenshots/ControlHeatmap.png",
      alt: "ComplianceGuard control heatmap showing passing, partial, and failing SOC 2 controls with per-control gap details and remediation scripts",
      width: 1440,
      height: 900,
    },
  },
];

const capabilities: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Cloud,
    title: "One connection. Automatic cloud evidence.",
    body: "Connect your AWS account once. IAM configurations, S3 bucket policies, and security settings join the same evidence pack on every scan.",
  },
  {
    icon: FileText,
    title: "Hand it to your auditor on day one.",
    body: "Every evidence pack exports as an auditor-ready PDF, mapped control-by-control to the framework. No reformatting. No back-and-forth.",
  },
  {
    icon: Lock,
    title: "Credentials never leave the machine.",
    body: "AWS credentials are encrypted at rest with HKDF-SHA256-derived Fernet keys and stored locally. Evidence stays in your local database.",
  },
  {
    icon: WifiOff,
    title: "Works without an internet connection.",
    body: "Evidence collection and reporting run fully offline — built for air-gapped environments and restricted networks.",
  },
];

const gallery: {
  eyebrow: string;
  title: string;
  img: { src: string; alt: string; width: number; height: number };
}[] = [
  {
    eyebrow: "Score trend",
    title: "Track readiness over time.",
    img: {
      src: "/screenshots/ScoreTrend.png",
      alt: "ComplianceGuard score trend chart with compliance zone bands and per-framework tabs across SOC 2, ISO 27001, HIPAA, and GDPR",
      width: 1440,
      height: 900,
    },
  },
  {
    eyebrow: "Cloud dashboard",
    title: "Every machine, one view.",
    img: {
      src: "/screenshots/CloudDashboard.png",
      alt: "ComplianceGuard cloud dashboard monitoring compliance scores, fleet-level stats, and last-sync status across multiple machines",
      width: 1440,
      height: 900,
    },
  },
  {
    eyebrow: "Framework browser",
    title: "The full control library, offline.",
    img: {
      src: "/screenshots/FrameworkBrowser.png",
      alt: "ComplianceGuard framework browser showing the SOC 2 Type II control library with control objectives and implementation guidance",
      width: 1440,
      height: 900,
    },
  },
];

export function FeatureSpotlights() {
  return (
    <section id="features" className="bg-snow py-24 md:py-32">
      <div className="container-cg">
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-4">The product</p>
          <h2 className="display-2">
            Evidence collection,
            <br />
            down to the operating system.
          </h2>
        </Reveal>

        <div className="mt-16 space-y-20 md:space-y-28">
          {spotlights.map((s, i) => (
            <div
              key={s.title}
              className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Reveal>
                <p className="eyebrow mb-3">{s.eyebrow}</p>
                <h3 className="display-3">{s.title}</h3>
                <p className="mt-5 text-[17px] text-ink-2 leading-[1.7]" style={{ maxWidth: 480 }}>
                  {s.body}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <WindowFrame {...s.img} />
              </Reveal>
            </div>
          ))}
        </div>

        <div className="mt-20 md:mt-28">
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-4">More surfaces</p>
            <h3 className="display-3">Built for the whole compliance journey.</h3>
          </Reveal>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {gallery.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.06}>
                <WindowFrame {...g.img} />
                <p className="eyebrow mt-5">{g.eyebrow}</p>
                <h4 className="mt-1 text-[17px] font-semibold text-ink">{g.title}</h4>
              </Reveal>
            ))}
          </div>
        </div>

        <RevealGroup className="mt-20 md:mt-28 grid sm:grid-cols-2 gap-5">
          {capabilities.map((c) => (
            <RevealItem key={c.title}>
              <div className="card-fog card-hover p-8 h-full">
                <div className="w-10 h-10 rounded-[12px] bg-azure flex items-center justify-center text-snow">
                  <c.icon size={20} strokeWidth={2} />
                </div>
                <h3 className="mt-5 text-[19px] font-semibold text-ink">{c.title}</h3>
                <p className="mt-2.5 text-[15px] text-ink-2 leading-[1.65]">{c.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
