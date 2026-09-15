export type CalcError = {
  field?: string;
  message: string;
};

export const MSG = {
  positive: "Введите значение больше 0",
  nonNegative: "Значение не может быть отрицательным",
  required: "Заполните это поле",
  invalid: "Некорректное значение",
  tooLarge: "Значение слишком большое. Проверьте единицы измерения.",
  openingsExceed: "Площадь проёмов больше площади стен. Проверьте размеры.",
  wallpaperStrip: "Из одного рулона невозможно получить полотно заданной длины",
  noCans: "Добавьте хотя бы один размер банки",
} as const;

export const LIMITS = {
  maxLengthM: 10_000,
  maxAreaM2: 1_000_000,
  maxVolumeM3: 1_000_000,
  maxMassKg: 10_000_000,
  maxCount: 10_000_000,
  maxPrice: 1_000_000_000,
  maxPercent: 200,
  maxOpenings: 50,
} as const;

export function fail(message: string, field?: string): CalcError {
  return field ? { field, message } : { message };
}

export function checkPositive(
  n: number | null | undefined,
  field: string,
  emptyMessage = MSG.required,
): CalcError | null {
  if (n === null || n === undefined) return fail(emptyMessage, field);
  if (n <= 0) return fail(MSG.positive, field);
  if (!Number.isFinite(n)) return fail(MSG.invalid, field);
  return null;
}

export function checkRange(
  n: number,
  max: number,
  field: string,
): CalcError | null {
  if (n > max) return fail(MSG.tooLarge, field);
  return null;
}

export function isCalcError(v: unknown): v is CalcError {
  return Boolean(v) && typeof v === "object" && v !== null && "message" in v;
}
