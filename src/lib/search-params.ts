import { parseNumber } from "@/lib/math/parse";

const SKIP = new Set(["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]);

export function pickSearchValues(
  search: Record<string, unknown> | undefined,
  keys: string[],
): Record<string, string> {
  if (!search) return {};
  const out: Record<string, string> = {};
  for (const k of keys) {
    if (SKIP.has(k)) continue;
    const v = search[k];
    if (v == null) continue;
    if (typeof v === "string" && v.trim() !== "") out[k] = v;
    else if (typeof v === "number" && Number.isFinite(v)) out[k] = String(v);
    else if (typeof v === "boolean") out[k] = v ? "1" : "0";
  }
  return out;
}

export function toQueryString(values: Record<string, string | number | boolean | undefined | null>): string {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(values)) {
    if (v == null) continue;
    const s = String(v).trim();
    if (!s) continue;
    params.set(k, s);
  }
  const q = params.toString();
  return q ? `?${q}` : "";
}

export function validatedNumberParam(raw: unknown): number | null {
  if (raw == null) return null;
  return parseNumber(typeof raw === "string" || typeof raw === "number" ? raw : String(raw));
}
