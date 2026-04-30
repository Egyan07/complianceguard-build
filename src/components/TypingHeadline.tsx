import { useEffect, useState } from "react";

type Props = {
  /** Lines to type out one after another. Each line wraps to a new <br />. */
  lines: string[];
  /** Speed in ms per character. */
  speed?: number;
  /** Pause between lines. */
  linePause?: number;
  className?: string;
};

/**
 * Types a multi-line headline character by character. Renders with a blinking caret
 * until the final line is complete. Reduced-motion users see the full text immediately.
 */
export function TypingHeadline({ lines, speed = 40, linePause = 200, className }: Props) {
  const total = lines.join("\n");
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const [output, setOutput] = useState(reducedMotion ? total : "");
  const [done, setDone] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;
    let cancelled = false;
    let i = 0;
    let lineIdx = 0;
    let charIdx = 0;
    let acc = "";

    const tick = () => {
      if (cancelled) return;
      const line = lines[lineIdx];
      if (charIdx < line.length) {
        acc += line[charIdx];
        charIdx++;
        setOutput(acc);
        i = window.setTimeout(tick, speed);
      } else if (lineIdx < lines.length - 1) {
        acc += "\n";
        lineIdx++;
        charIdx = 0;
        setOutput(acc);
        i = window.setTimeout(tick, linePause);
      } else {
        setDone(true);
      }
    };
    i = window.setTimeout(tick, 250);
    return () => {
      cancelled = true;
      clearTimeout(i);
    };
  }, [lines, speed, linePause, reducedMotion]);

  return (
    <span className={className}>
      {output.split("\n").map((line, idx, arr) => (
        <span key={idx}>
          {line}
          {idx < arr.length - 1 ? <br /> : null}
        </span>
      ))}
      {!done && <span className="cg-caret" aria-hidden="true">|</span>}
    </span>
  );
}
