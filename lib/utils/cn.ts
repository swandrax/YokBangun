type ClassValue = string | false | null | undefined;

/** Tiny className joiner. Avoids pulling in a dependency for one function. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
