/**
 * Ceil for purchase quantities.
 * Subtracts a tiny epsilon so binary float leftovers
 * like 33.000000000000004 do not buy an extra bag.
 */
export function ceilCount(n: number): number {
  if (!Number.isFinite(n)) return n;
  if (n <= 0) return 0;
  return Math.ceil(n - 1e-10);
}

export function floorCount(n: number): number {
  if (!Number.isFinite(n)) return n;
  if (n < 0) return 0;
  return Math.floor(n + 1e-10);
}
