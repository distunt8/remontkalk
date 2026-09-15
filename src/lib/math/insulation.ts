import { checkPositive, fail, LIMITS, MSG, type CalcError } from "./errors";
import { ceilCount } from "./round";

export type InsulationInput = {
  insulatedArea: number;
  requiredThicknessMm: number;
  slabLength: number;
  slabWidth: number;
  slabThicknessMm: number;
  slabsPerPack: number;
  reservePercent: number;
  packPrice?: number;
};

export type InsulationResult = {
  insulatedArea: number;
  slabFaceArea: number;
  layers: number;
  slabsNeeded: number;
  packs: number;
  actualThicknessMm: number;
  totalPrice?: number;
};

export function calculateInsulation(input: InsulationInput): InsulationResult | CalcError {
  const errA = checkPositive(input.insulatedArea, "insulatedArea");
  if (errA) return errA;
  if (input.insulatedArea > LIMITS.maxAreaM2) return fail(MSG.tooLarge, "insulatedArea");
  const errRt = checkPositive(input.requiredThicknessMm, "requiredThicknessMm");
  if (errRt) return errRt;
  const errSl = checkPositive(input.slabLength, "slabLength");
  if (errSl) return errSl;
  const errSw = checkPositive(input.slabWidth, "slabWidth");
  if (errSw) return errSw;
  const errSt = checkPositive(input.slabThicknessMm, "slabThicknessMm");
  if (errSt) return errSt;
  const errP = checkPositive(input.slabsPerPack, "slabsPerPack");
  if (errP) return errP;
  if (input.reservePercent < 0) return fail(MSG.nonNegative, "reservePercent");

  const slabFaceArea = input.slabLength * input.slabWidth;
  const layers = ceilCount(input.requiredThicknessMm / input.slabThicknessMm);
  const slabsNeeded = ceilCount(
    (input.insulatedArea / slabFaceArea) * layers * (1 + input.reservePercent / 100),
  );
  const packs = ceilCount(slabsNeeded / input.slabsPerPack);
  const actualThicknessMm = layers * input.slabThicknessMm;

  if (!Number.isFinite(slabsNeeded) || slabsNeeded > LIMITS.maxCount) {
    return fail("Получилось слишком большое количество плит. Проверьте данные.");
  }

  const result: InsulationResult = {
    insulatedArea: input.insulatedArea,
    slabFaceArea,
    layers,
    slabsNeeded,
    packs,
    actualThicknessMm,
  };
  if (input.packPrice != null && input.packPrice !== 0) {
    if (input.packPrice < 0) return fail(MSG.nonNegative, "packPrice");
    result.totalPrice = packs * input.packPrice;
  }
  return result;
}
