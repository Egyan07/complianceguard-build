import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { useCountUpOnTrigger } from "@/hooks/use-count-up";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

type Props = {
  /** The full display value, e.g. "29", "$10,000+", "< 2min", "100%". */
  value: string;
  className?: string;
  duration?: number;
};

/**
 * Animates a stat value into view.
 * - If the value is purely numeric (optionally with commas), counts up from 0.
 * - If it has a numeric core wrapped by simple prefix/suffix (e.g. "$10,000+", "100%"),
 *   counts the number and keeps the wrapping characters.
 * - Otherwise (e.g. "< 2min", "4-8 weeks"), reveals characters with a fast opacity stagger.
 */
export function AnimatedStat({ value, className, duration = 1200 }: Props) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const reduced = usePrefersReducedMotion();

  const match = value.match(/^([^\\d]*)([\\d,]+)([^\\d]*)$/);
  const isNumeric = !!match;

  if (isNumeric && match) {
    const prefix = match[1];
    const numberStr = match[2];
    const suffix = match[3];
    const target = parseInt(numberStr.replace(/,/g, ""), 10);
    return (
      <span ref={ref} className={className}>
        {reduced ? value : <NumberCounter target={target} start={inView} duration={duration} prefix={prefix} suffix={suffix} hasComma={numberStr.includes(",")} />}
      </span>
    );
  }

  // Character reveal for non-numeric values.
  return (
    <span ref={ref} className={className}>
      {reduced
        ? value
        : value.split("").map((ch, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut", delay: i * 0.03 }}
              className="inline-block"
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          ))}
    </span>
  );
}

function NumberCounter({
  target,
  start,
  duration,
  prefix,
  suffix,
  hasComma,
}: {
  target: number;
  start: boolean;
  duration: number;
  prefix: string;
  suffix: string;
  hasComma: boolean;
}) {
  const value = useCountUpOnTrigger(target, start, duration);
  const display = hasComma ? value.toLocaleString("en-US") : String(value);
  return (
    <>
      {prefix}
      {display}
      {suffix}
    </>
  );
}

// Re-export to keep import surface stable if the older AnimatedStat is referenced.
export default AnimatedStat;
