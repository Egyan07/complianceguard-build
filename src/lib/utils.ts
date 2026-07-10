/** Minimal class-name joiner (clsx/tailwind-merge not needed here). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
