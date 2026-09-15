const ru = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 20 });

function roundDisplay(n: number, digits: number): number {
  if (!Number.isFinite(n)) return n;
  const f = 10 ** digits;
  return Math.round(n * f) / f;
}

export function formatNumber(n: number, maxDigits: number): string {
  if (!Number.isFinite(n)) return "—";
  const value = roundDisplay(n, maxDigits);
  return new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits: maxDigits,
    minimumFractionDigits: 0,
  }).format(value);
}

export function formatFixed(n: number, digits: number): string {
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(roundDisplay(n, digits));
}

export function formatArea(n: number): string {
  return `${formatNumber(n, 2)} м²`;
}

export function formatLength(n: number): string {
  return `${formatNumber(n, 2)} м`;
}

export function formatVolume(n: number): string {
  const digits = Math.abs(n) < 1 ? 3 : 3;
  return `${formatNumber(n, digits)} м³`;
}

export function formatLiters(n: number): string {
  return `${formatNumber(n, 2)} л`;
}

export function formatMass(n: number): string {
  if (n >= 1000) return `${formatNumber(n / 1000, 2)} т`;
  return `${formatNumber(n, 2)} кг`;
}

export function formatKg(n: number): string {
  return `${formatNumber(n, 2)} кг`;
}

export function formatMm(n: number): string {
  return `${formatNumber(n, 1)} мм`;
}

export function formatInt(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(
    Math.round(n),
  );
}

export function formatMoney(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return `${new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits: 0,
  }).format(Math.round(n))} ₽`;
}

export function formatPercent(n: number): string {
  return `${formatNumber(n, 1)}%`;
}

export function ruPlural(n: number, forms: [string, string, string]): string {
  const abs = Math.abs(Math.trunc(n)) % 100;
  const d = abs % 10;
  if (abs > 10 && abs < 20) return forms[2];
  if (d > 1 && d < 5) return forms[1];
  if (d === 1) return forms[0];
  return forms[2];
}

export { ru };
