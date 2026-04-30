import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { FadeUp } from "./FadeUp";

type Control = {
  id: string;
  name: string;
  category: string;
  description: string;
};

const CONTROLS: Control[] = [
  // Common Criteria - Control Environment
  { id: "CC1.1", name: "Demonstrates Commitment to Integrity", category: "Control Environment", description: "Organization demonstrates a commitment to integrity and ethical values." },
  { id: "CC1.2", name: "Board Oversight", category: "Control Environment", description: "Board of directors demonstrates independence from management and exercises oversight." },
  { id: "CC1.3", name: "Organizational Structure", category: "Control Environment", description: "Management establishes structures, reporting lines, and authorities aligned with objectives." },
  { id: "CC1.4", name: "Commitment to Competence", category: "Control Environment", description: "Organization demonstrates a commitment to attract, develop, and retain competent individuals." },
  { id: "CC1.5", name: "Accountability", category: "Control Environment", description: "Organization holds individuals accountable for their internal control responsibilities." },
  // Communication
  { id: "CC2.1", name: "Internal Information", category: "Communication", description: "Uses relevant, quality information to support internal control function." },
  { id: "CC2.2", name: "Internal Communication", category: "Communication", description: "Internally communicates information necessary to support internal control." },
  { id: "CC2.3", name: "External Communication", category: "Communication", description: "Communicates with external parties on matters affecting internal control." },
  // Risk Assessment
  { id: "CC3.1", name: "Objectives Specification", category: "Risk Assessment", description: "Specifies objectives with sufficient clarity to identify and assess risks." },
  { id: "CC3.2", name: "Risk Identification", category: "Risk Assessment", description: "Identifies risks to achieving objectives and analyzes risks as a basis for managing them." },
  { id: "CC3.3", name: "Fraud Risk", category: "Risk Assessment", description: "Considers the potential for fraud in assessing risks." },
  { id: "CC3.4", name: "Change Identification", category: "Risk Assessment", description: "Identifies and assesses changes that could significantly impact the system." },
  // Monitoring
  { id: "CC4.1", name: "Ongoing Evaluations", category: "Monitoring", description: "Selects, develops, and performs ongoing evaluations to ascertain whether controls are present." },
  { id: "CC4.2", name: "Deficiency Communication", category: "Monitoring", description: "Evaluates and communicates internal control deficiencies to those responsible for corrective action." },
  // Control Activities
  { id: "CC5.1", name: "Control Selection", category: "Control Activities", description: "Selects and develops control activities that contribute to risk mitigation." },
  { id: "CC5.2", name: "Technology Controls", category: "Control Activities", description: "Selects and develops general control activities over technology." },
  { id: "CC5.3", name: "Policies & Procedures", category: "Control Activities", description: "Deploys control activities through policies that establish what is expected and procedures that put policies into action." },
  // Logical & Physical Access
  { id: "CC6.1", name: "Logical Access Controls", category: "Access", description: "Implements logical access security software, infrastructure, and architectures." },
  { id: "CC6.2", name: "User Registration", category: "Access", description: "New internal and external users are registered and authorized prior to issuing credentials." },
  { id: "CC6.3", name: "Access Removal", category: "Access", description: "Removes access to protected information assets when access is no longer required." },
  { id: "CC6.6", name: "Boundary Protection", category: "Access", description: "Implements logical access security measures to protect against threats from outside the system boundary." },
  { id: "CC6.7", name: "Data Transmission", category: "Access", description: "Restricts the transmission, movement, and removal of information to authorized users." },
  { id: "CC6.8", name: "Malware Protection", category: "Access", description: "Implements controls to prevent or detect and act upon the introduction of unauthorized or malicious software." },
  // System Operations
  { id: "CC7.1", name: "Vulnerability Detection", category: "Operations", description: "Detects and monitors for new vulnerabilities and changes that introduce new vulnerabilities." },
  { id: "CC7.2", name: "Anomaly Monitoring", category: "Operations", description: "Monitors system components for anomalies indicative of malicious acts or processing errors." },
  { id: "CC7.3", name: "Incident Evaluation", category: "Operations", description: "Evaluates security events to determine whether they could or have resulted in a failure." },
  { id: "CC7.4", name: "Incident Response", category: "Operations", description: "Responds to identified security incidents by executing a defined response program." },
  { id: "CC7.5", name: "Recovery", category: "Operations", description: "Identifies, develops, and implements activities to recover from identified security incidents." },
  // Change Management
  { id: "CC8.1", name: "Change Authorization", category: "Change Management", description: "Authorizes, designs, develops, configures, documents, tests, approves, and implements changes." },
];

const CATEGORIES = ["All", ...Array.from(new Set(CONTROLS.map((c) => c.category)))] as const;

export function ControlsExplorer() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CONTROLS.filter((c) => {
      if (cat !== "All" && c.category !== cat) return false;
      if (!q) return true;
      return (
        c.id.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
      );
    });
  }, [query, cat]);

  return (
    <section className="bg-background py-24">
      <div className="container-cg">
        <FadeUp>
          <p className="eyebrow mb-4">All 29 Controls</p>
          <h2 className="text-[32px] md:text-[40px] font-bold text-navy max-w-3xl leading-tight">
            Every SOC 2 control,<br />covered out of the box.
          </h2>
          <p className="mt-6 text-[18px] text-text-secondary max-w-2xl">
            Search and filter the AICPA Trust Services Criteria ComplianceGuard evaluates on every scan.
          </p>
        </FadeUp>

        <FadeUp delay={0.05}>
          <div className="mt-10 flex flex-col md:flex-row gap-4 md:items-center">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                placeholder="Search controls…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-[14px] border border-border rounded-[8px] bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => {
                const active = cat === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCat(c)}
                    className="text-[12px] px-3 py-1.5 rounded-[4px] border transition-colors"
                    style={{
                      borderColor: "#E2E8F0",
                      backgroundColor: active ? "#1B3A6B" : "#ffffff",
                      color: active ? "#ffffff" : "#1B3A6B",
                    }}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
        </FadeUp>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((c) => (
            <div
              key={c.id}
              className="group border border-border rounded-[8px] p-4 bg-white hover:border-teal hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[12px] font-semibold text-teal">{c.id}</span>
                <span className="text-[11px] uppercase tracking-wider text-text-secondary">{c.category}</span>
              </div>
              <h3 className="mt-2 text-[14px] font-semibold text-navy">{c.name}</h3>
              <p className="mt-1.5 text-[13px] text-text-secondary leading-[1.6]">{c.description}</p>
            </div>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="mt-8 text-center text-[15px] text-text-secondary">No controls match your search.</p>
        )}

        <p className="mt-6 text-center text-[13px] text-text-secondary">
          Showing {visible.length} of {CONTROLS.length} controls
        </p>
      </div>
    </section>
  );
}
