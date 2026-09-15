import { isEmptyInput, parseNonNegative, parsePositive } from "@/lib/math/parse";
import { MSG } from "@/lib/math/errors";

export function readPositive(
  values: Record<string, string>,
  key: string,
  errors: Record<string, string>,
): number | null {
  const raw = values[key];
  if (isEmptyInput(raw)) {
    errors[key] = MSG.required;
    return null;
  }
  const n = parsePositive(raw);
  if (n == null) {
    errors[key] = MSG.positive;
    return null;
  }
  return n;
}

export function readNonNegative(
  values: Record<string, string>,
  key: string,
  errors: Record<string, string>,
  fallback = 0,
): number | null {
  const raw = values[key];
  if (isEmptyInput(raw)) return fallback;
  const n = parseNonNegative(raw);
  if (n == null) {
    errors[key] = MSG.invalid;
    return null;
  }
  return n;
}

export function readOptionalPositive(
  values: Record<string, string>,
  key: string,
  errors: Record<string, string>,
): number | undefined {
  const raw = values[key];
  if (isEmptyInput(raw)) return undefined;
  const n = parsePositive(raw);
  if (n == null) {
    errors[key] = MSG.positive;
    return undefined;
  }
  return n;
}

export function scrollToResult() {
  if (typeof document === "undefined") return;
  document.getElementById("result")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
