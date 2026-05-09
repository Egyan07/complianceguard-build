import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

type Props = {
  lines: string[];
  className?: string;
  /** Stagger between words in seconds. */
  stagger?: number;
};

/**
 * Reveals a multi-line headline word by word.
 * Each word fades in with a 20px upward translate.
 */
export function WordReveal({ lines, className, stagger = 0.06 }: Props) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <span className={className}>
        {lines.map((line, idx, arr) => (
          <span key={idx}>
            {line}
            {idx < arr.length - 1 ? <br /> : null}
          </span>
        ))}
      </span>
    );
  }

  let wordIndex = 0;
  return (
    <span className={className}>
      {lines.map((line, lineIdx, arr) => {
        const words = line.split(" ");
        return (
          <span key={lineIdx}>
            {words.map((word, i) => {
              const delay = wordIndex * stagger;
              wordIndex++;
              return (
                <span key={i} className="inline-block overflow-hidden align-baseline">
                  <motion.span
                    className="inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay }}
                  >
                    {word}
                    {i < words.length - 1 ? "\u00A0" : ""}
                  </motion.span>
                </span>
              );
            })}
            {lineIdx < arr.length - 1 ? <br /> : null}
          </span>
        );
      })}
    </span>
  );
}
