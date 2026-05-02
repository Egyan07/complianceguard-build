import { motion } from "framer-motion";
import {
  Monitor,
  Terminal,
  Cloud,
  Shield,
  Gauge,
  CheckCircle,
  FileText,
  Download,
  Lock,
  WifiOff,
  Server,
  type LucideIcon,
} from "lucide-react";

type Spotlight = {
  eyebrow: string;
  title: string;
  body: string;
  bg: LucideIcon;
  fg: LucideIcon;
};

const SPOTLIGHTS: Spotlight[] = [
  {
    eyebrow: "Endpoint Scanning",
    title: "Reads your machine. Not your cloud.",
    body: "ComplianceGuard reads directly from the Windows Registry, event logs, firewall configuration, and user accounts. No agent to install. No API key. No cloud permission required. Evidence collected in 30 seconds.",
    bg: Monitor,
    fg: Terminal,
  },
  {
    eyebrow: "Cloud Evidence",
    title: "One connection. Automatic evidence.",
    body: "Connect your AWS account once. ComplianceGuard pulls CloudTrail logs, IAM configurations, S3 bucket policies, and security group rules into your evidence pack automatically on every scan.",
    bg: Cloud,
    fg: Shield,
  },
  {
    eyebrow: "Real-Time Scoring",
    title: "Know exactly where you stand.",
    body: "Your compliance score updates the moment a scan completes. See which of the 29 SOC 2 Trust Services Criteria you're passing and which need work — before you engage an auditor.",
    bg: Gauge,
    fg: CheckCircle,
  },
  {
    eyebrow: "Auditor-Ready Export",
    title: "Hand it to your auditor on day one.",
    body: "Every evidence pack exports as PDF, CSV, and JSON in the exact format used in successful SOC 2 Type I and Type II audits. No reformatting. No back-and-forth.",
    bg: FileText,
    fg: Download,
  },
  {
    eyebrow: "Data Privacy",
    title: "Your credentials never leave your machine.",
    body: "AWS credentials are encrypted at rest using HKDF-SHA256 derived Fernet keys before being stored locally. They are never transmitted to ComplianceGuard servers. Your evidence stays in your local database.",
    bg: Lock,
    fg: Shield,
  },
  {
    eyebrow: "Air-Gap Ready",
    title: "Works without an internet connection.",
    body: "ComplianceGuard runs fully offline. No internet connection required to collect evidence or generate reports. Works in air-gapped environments and restricted networks.",
    bg: WifiOff,
    fg: Server,
  },
];

function Visual({ Bg, Fg }: { Bg: LucideIcon; Fg: LucideIcon }) {
  return (
    <div className="relative w-full flex items-center justify-center min-h-[260px] md:min-h-[320px]">
      <Bg
        size={200}
        strokeWidth={1.25}
        className="text-teal"
        style={{ opacity: 0.15 }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 rounded-2xl bg-white border border-border flex items-center justify-center shadow-sm">
          <Fg size={32} className="text-teal" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}

export function FeatureSpotlights() {
  return (
    <section id="features" className="bg-background">
      {SPOTLIGHTS.map((s, i) => {
        const reverse = i % 2 === 1;
        return (
          <div key={s.title} className="py-20 md:py-24 border-b border-border last:border-b-0">
            <div
              className={`container-cg grid md:grid-cols-[3fr_2fr] gap-10 md:gap-16 items-center ${
                reverse ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <p
                  className="text-[12px] font-semibold uppercase text-teal"
                  style={{ letterSpacing: "0.1em" }}
                >
                  {s.eyebrow}
                </p>
                <h3 className="mt-3 text-[28px] md:text-[36px] font-bold text-navy leading-tight tracking-tight">
                  {s.title}
                </h3>
                <p
                  className="mt-5 text-[17px] md:text-[18px] text-text-secondary"
                  style={{ maxWidth: 480, lineHeight: 1.7 }}
                >
                  {s.body}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              >
                <Visual Bg={s.bg} Fg={s.fg} />
              </motion.div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
