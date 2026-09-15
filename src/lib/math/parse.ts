/** Accepts "2.5" and "2,5" as the same decimal. Strips spaces. */

const NUMERIC = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i;

export function parseNumber(input: string | number | null | undefined): number | null {
  if (input === null || input === undefined) return null;
  if (typeof input === "number") {
    return Number.isFinite(input) ? input : null;
  }
  const normalized = String(input).trim().replace(/\s+/g, "").replace(",", ".");
  if (!normalized) return null;
  if (!NUMERIC.test(normalized)) return null;
  const n = Number(normalized);
  if (!Number.isFinite(n)) return null;
  return n;
}

export function parseNonNegative(input: string | number | null | undefined): number | null {
  const n = parseNumber(input);
  if (n === null || n < 0) return null;
  return n;
}

export function parsePositive(input: string | number | null | undefined): number | null {
  const n = parseNumber(input);
  if (n === null || n <= 0) return null;
  return n;
}

export function isEmptyInput(input: string | number | null | undefined): boolean {
  if (input === null || input === undefined) return true;
  if (typeof input === "number") return false;
  return String(input).trim() === "";
}
