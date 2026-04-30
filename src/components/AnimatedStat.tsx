import { useCountUpOnTrigger } from "@/hooks/use-count-up";
import { useInView } from "@/hooks/use-in-view";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Format like "$" prefix + ",000" thousands separators */
  format?: (n: number) => string;
  className?: string;
};

export function AnimatedStat({ value, prefix = "", suffix = "", format, className }: Props) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const n = useCountUpOnTrigger(value, inView, 1400);
  const display = format ? format(n) : n.toLocaleString("en-US");
  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
