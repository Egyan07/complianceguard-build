type Props = {
  variant?: "hero" | "grid";
};

const DASHBOARD_URL = "/screenshots/Dashboard.png";
const EVIDENCE_URL = "/screenshots/EvidenceCollection.png";

function WindowFrame({
  label,
  src,
  alt,
  loading,
}: {
  label: string;
  src: string;
  alt: string;
  loading: "eager" | "lazy";
}) {
  return (
    <div
      className="rounded-[8px] overflow-hidden bg-[#0B1220]"
      style={{
        border: "1px solid rgba(0,0,0,0.15)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      }}
    >
      <div className="flex items-center gap-1.5 px-3 bg-[#1F2937]" style={{ height: 32 }}>
        <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
        <span className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
        <span className="w-2 h-2 rounded-full bg-[#28C840]" />
        <span
          className="ml-3 font-mono"
          style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}
        >
          {label}
        </span>
      </div>
      <div className="w-full" style={{ aspectRatio: "16 / 10" }}>
        <img
          src={src}
          alt={alt}
          loading={loading}
          className="w-full h-full"
          style={{ objectFit: "cover", objectPosition: "top" }}
        />
      </div>
    </div>
  );
}

export function ScreenshotShowcase({ variant = "hero" }: Props) {
  if (variant === "grid") {
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <WindowFrame
            label="ComplianceGuard — Dashboard"
            src={DASHBOARD_URL}
            alt="ComplianceGuard Dashboard showing SOC 2 readiness score"
            loading="lazy"
          />
          <WindowFrame
            label="ComplianceGuard — Evidence"
            src={EVIDENCE_URL}
            alt="ComplianceGuard evidence collection interface"
            loading="lazy"
          />
        </div>
        <p className="mt-4 text-center italic text-[14px] text-text-secondary">
          Screenshots from ComplianceGuard v3.2.0 running on Windows 11.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full md:max-w-[560px] mx-auto md:rotate-[-3deg] transition-transform">
      <div className="relative">
        <WindowFrame
          label="ComplianceGuard — Dashboard"
          src={DASHBOARD_URL}
          alt="ComplianceGuard Dashboard showing SOC 2 readiness score"
          loading="eager"
        />
        <div className="hidden md:block relative" style={{ marginTop: -20, marginLeft: 16 }}>
          <WindowFrame
            label="ComplianceGuard — Evidence"
            src={EVIDENCE_URL}
            alt="ComplianceGuard evidence collection interface"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
