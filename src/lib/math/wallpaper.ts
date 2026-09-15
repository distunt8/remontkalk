import { checkPositive, checkRange, fail, LIMITS, MSG, type CalcError } from "./errors";
import { ceilCount, floorCount } from "./round";

export type WallpaperInput = {
  perimeter?: number;
  length?: number;
  width?: number;
  height: number;
  rollWidth: number;
  rollLength: number;
  repeatLength: number;
  trimAllowance: number;
  extraRolls: number;
  openingsArea?: number;
};

export type WallpaperResult = {
  perimeter: number;
  stripLength: number;
  stripsNeeded: number;
  stripsPerRoll: number;
  rollsRaw: number;
  extraRolls: number;
  rolls: number;
  warning?: string;
};

export function calculateWallpaper(input: WallpaperInput): WallpaperResult | CalcError {
  const errH = checkPositive(input.height, "height") ?? checkRange(input.height, LIMITS.maxLengthM, "height");
  if (errH) return errH;
  const errRw = checkPositive(input.rollWidth, "rollWidth");
  if (errRw) return errRw;
  const errRl = checkPositive(input.rollLength, "rollLength");
  if (errRl) return errRl;
  if (input.trimAllowance < 0) return fail(MSG.nonNegative, "trimAllowance");
  if (input.repeatLength < 0) return fail(MSG.nonNegative, "repeatLength");
  if (input.extraRolls < 0) return fail(MSG.nonNegative, "extraRolls");
  if (input.extraRolls > 20) return fail(MSG.tooLarge, "extraRolls");

  let perimeter = input.perimeter;
  if (perimeter == null) {
    const errL = checkPositive(input.length, "length") ?? checkRange(input.length ?? 0, LIMITS.maxLengthM, "length");
    if (errL) return errL;
    const errW = checkPositive(input.width, "width") ?? checkRange(input.width ?? 0, LIMITS.maxLengthM, "width");
    if (errW) return errW;
    perimeter = 2 * (input.length! + input.width!);
  } else {
    const errP = checkPositive(perimeter, "perimeter") ?? checkRange(perimeter, LIMITS.maxLengthM * 4, "perimeter");
    if (errP) return errP;
  }

  let warning: string | undefined;
  if (input.openingsArea != null && input.openingsArea > 0) {
    if (input.openingsArea < 0) return fail(MSG.nonNegative, "openingsArea");
    warning =
      "Учёт проёмов приблизительный: обои редко кроятся так, чтобы проёмы давали целые полотна. Не вычитайте проёмы, если хотите запас на подрезку.";
  }

  const rawStripLength = input.height + input.trimAllowance;
  let stripLength: number;
  if (input.repeatLength === 0) {
    stripLength = rawStripLength;
  } else {
    stripLength = ceilCount(rawStripLength / input.repeatLength) * input.repeatLength;
  }

  if (stripLength <= 0 || !Number.isFinite(stripLength)) {
    return fail(MSG.invalid, "height");
  }

  const stripsNeeded = ceilCount(perimeter / input.rollWidth);
  const stripsPerRoll = floorCount(input.rollLength / stripLength);

  if (stripsPerRoll < 1) {
    return fail(MSG.wallpaperStrip, "rollLength");
  }

  const rollsRaw = ceilCount(stripsNeeded / stripsPerRoll);
  const extra = ceilCount(input.extraRolls);
  const rolls = rollsRaw + extra;

  if (!Number.isFinite(rolls) || rolls > LIMITS.maxCount) {
    return fail("Получилось слишком большое количество рулонов. Проверьте данные.");
  }

  return {
    perimeter,
    stripLength,
    stripsNeeded,
    stripsPerRoll,
    rollsRaw,
    extraRolls: extra,
    rolls,
    warning,
  };
}
