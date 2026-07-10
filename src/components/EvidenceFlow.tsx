import { motion, useReducedMotion } from "framer-motion";

/**
 * EvidenceFlow — hub-and-spoke architecture diagram. Four sources (machine,
 * AWS, OS configs, event logs) stream evidence *inward* to a pulsing "Local
 * evidence store" hub. Reinforces the pitch: everything collects to one local
 * place, nothing flows out. All-SVG (responsive, crisp); particle flow +
 * pulses pause under reduced motion.
 *
 * Technique (traveling stroke-dash particles + pulsing hub) adapted from a
 * 21st.dev "cloud flow" component, rebuilt light/azure and inward-directed.
 */

const AZURE = "#0071e3";
const AZURE_BRIGHT = "#6cb4ff";
const HUB = { x: 110, y: 70 };

const NODES = [
  { x: 42, y: 26, label: "Your machine" },
  { x: 178, y: 26, label: "Your AWS" },
  { x: 42, y: 114, label: "OS configs" },
  { x: 178, y: 114, label: "Event logs" },
];

export function EvidenceFlow() {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 220 140"
      className="w-full max-w-[620px] mx-auto"
      role="img"
      aria-label="Four sources — your machine, your AWS, OS configs and event logs — stream evidence inward to a local evidence store that stays inside your network boundary."
    >
      {/* Base spokes */}
      {NODES.map((n, i) => (
        <line
          key={`base-${i}`}
          x1={n.x}
          y1={n.y}
          x2={HUB.x}
          y2={HUB.y}
          stroke={AZURE}
          strokeWidth={0.5}
          opacity={0.18}
        />
      ))}

      {/* Traveling evidence particles — dashes drift toward the hub */}
      {!reduce &&
        NODES.map((n, i) => (
          <motion.line
            key={`flow-${i}`}
            x1={n.x}
            y1={n.y}
            x2={HUB.x}
            y2={HUB.y}
            stroke={AZURE}
            strokeWidth={1}
            strokeLinecap="round"
            strokeDasharray="4 26"
            initial={{ strokeDashoffset: 30 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay: i * 0.35 }}
          />
        ))}

      {/* Pulsing rings behind the hub */}
      {!reduce &&
        [20, 27].map((r, i) => (
          <motion.circle
            key={`ring-${i}`}
            cx={HUB.x}
            cy={HUB.y}
            r={r}
            fill="none"
            stroke={AZURE_BRIGHT}
            strokeWidth={0.5}
            initial={{ opacity: 0.35, scale: 0.9 }}
            animate={{ opacity: [0.35, 0.05, 0.35], scale: [0.9, 1.15, 0.9] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
            style={{ transformOrigin: `${HUB.x}px ${HUB.y}px` }}
          />
        ))}

      {/* Source node badges */}
      {NODES.map((n, i) => (
        <g key={`node-${i}`}>
          <rect
            x={n.x - 30}
            y={n.y - 8}
            width={60}
            height={16}
            rx={8}
            fill="#ffffff"
            stroke="#e8e8ed"
            strokeWidth={0.5}
          />
          <circle cx={n.x - 21} cy={n.y} r={1.8} fill={AZURE} />
          <text
            x={n.x - 15}
            y={n.y + 2}
            fill="#1d1d1f"
            fontSize={5.4}
            fontWeight={500}
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {n.label}
          </text>
        </g>
      ))}

      {/* Central hub — local evidence store */}
      <g>
        <rect
          x={HUB.x - 32}
          y={HUB.y - 15}
          width={64}
          height={30}
          rx={9}
          fill="rgba(0,113,227,0.08)"
          stroke={AZURE}
          strokeWidth={0.7}
        />
        <text
          x={HUB.x}
          y={HUB.y - 2}
          textAnchor="middle"
          fill="#1d1d1f"
          fontSize={6}
          fontWeight={600}
          style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.02em" }}
        >
          Local evidence
        </text>
        <text
          x={HUB.x}
          y={HUB.y + 6}
          textAnchor="middle"
          fill="#1d1d1f"
          fontSize={6}
          fontWeight={600}
          style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.02em" }}
        >
          store
        </text>
        <text
          x={HUB.x}
          y={HUB.y + 12}
          textAnchor="middle"
          fill={AZURE}
          fontSize={3.6}
          style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }}
        >
          SQLITE · ENCRYPTED
        </text>
      </g>
    </svg>
  );
}
