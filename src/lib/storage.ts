const PREFIX = "remontcalc:v1:";

function key(calculatorId: string) {
  return `${PREFIX}${calculatorId}`;
}

export function loadCalculatorState<T>(calculatorId: string): Partial<T> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key(calculatorId));
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    return parsed as Partial<T>;
  } catch {
    return null;
  }
}

export function saveCalculatorState(calculatorId: string, state: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key(calculatorId), JSON.stringify(state));
  } catch {
    // quota / private mode
  }
}

export function clearCalculatorState(calculatorId: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key(calculatorId));
  } catch {
    // ignore
  }
}
