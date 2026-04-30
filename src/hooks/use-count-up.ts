import { useEffect, useRef, useState } from "react";

/**
 * Count up to a target number over `duration` ms when `start` flips true.
 * Used by stat counters that should roll up on scroll-into-view.
 */
export function useCountUpOnTrigger(target: number, start: boolean, duration = 1200) {
  const [value, setValue] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!start) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    const steps = 30;
    const stepTime = Math.max(16, Math.floor(duration / steps));
    let i = 0;
    intervalRef.current = setInterval(() => {
      i++;
      if (i >= steps) {
        setValue(target);
        if (intervalRef.current) clearInterval(intervalRef.current);
      } else {
        // Ease-out
        const progress = 1 - Math.pow(1 - i / steps, 3);
        setValue(Math.round(target * progress));
      }
    }, stepTime);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [target, start, duration]);

  return value;
}
