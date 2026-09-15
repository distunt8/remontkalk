import { checkPositive, checkRange, fail, LIMITS, MSG, type CalcError } from "./errors";

export type ScreedInput = {
  length: number;
  width: number;
  thicknessMm: number;
  reservePercent: number;
  cementRatio?: number;
  sandRatio?: number;
  mixDensityKgPerM3?: number;
};

export type ScreedResult = {
  area: number;
  volume: number;
  requiredVolume: number;
  approximateMix?: {
    cementKg: number;
    sandKg: number;
    note: string;
  };
};

export function calculateScreed(input: ScreedInput): ScreedResult | CalcError {
  const errL = checkPositive(input.length, "length") ?? checkRange(input.length, LIMITS.maxLengthM, "length");
  if (errL) return errL;
  const errW = checkPositive(input.width, "width") ?? checkRange(input.width, LIMITS.maxLengthM, "width");
  if (errW) return errW;
  const errT = checkPositive(input.thicknessMm, "thicknessMm");
  if (errT) return errT;
  if (input.reservePercent < 0) return fail(MSG.nonNegative, "reservePercent");

  const area = input.length * input.width;
  const volume = area * (input.thicknessMm / 1000);
  const requiredVolume = volume * (1 + input.reservePercent / 100);
  if (!Number.isFinite(requiredVolume) || requiredVolume > LIMITS.maxVolumeM3) {
    return fail(MSG.tooLarge, "length");
  }

  const result: ScreedResult = { area, volume, requiredVolume };

  if (
    input.cementRatio != null &&
    input.sandRatio != null &&
    input.cementRatio > 0 &&
    input.sandRatio > 0
  ) {
    const density = input.mixDensityKgPerM3 && input.mixDensityKgPerM3 > 0 ? input.mixDensityKgPerM3 : 2000;
    const parts = input.cementRatio + input.sandRatio;
    const totalMass = requiredVolume * density;
    result.approximateMix = {
      cementKg: totalMass * (input.cementRatio / parts),
      sandKg: totalMass * (input.sandRatio / parts),
      note: "Ориентировочный расчёт по введённому соотношению. Реальный расход зависит от влажности песка, марки цемента и уплотнения.",
    };
  }

  return result;
}
