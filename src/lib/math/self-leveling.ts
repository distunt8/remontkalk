import { checkPositive, fail, LIMITS, MSG, type CalcError } from "./errors";
import { ceilCount } from "./round";

export type SelfLevelingInput = {
  area: number;
  layerThicknessMm: number;
  consumptionKgPerM2PerMm: number;
  bagWeight: number;
  reservePercent: number;
  bagPrice?: number;
};

export type SelfLevelingResult = {
  area: number;
  layerThicknessMm: number;
  mass: number;
  requiredMass: number;
  bags: number;
  purchasedMass: number;
  extraMass: number;
  totalPrice?: number;
};

export function calculateSelfLeveling(input: SelfLevelingInput): SelfLevelingResult | CalcError {
  const errA = checkPositive(input.area, "area");
  if (errA) return errA;
  if (input.area > LIMITS.maxAreaM2) return fail(MSG.tooLarge, "area");
  const errT = checkPositive(input.layerThicknessMm, "layerThicknessMm");
  if (errT) return errT;
  const errC = checkPositive(input.consumptionKgPerM2PerMm, "consumptionKgPerM2PerMm");
  if (errC) return errC;
  const errB = checkPositive(input.bagWeight, "bagWeight");
  if (errB) return errB;
  if (input.reservePercent < 0) return fail(MSG.nonNegative, "reservePercent");

  const mass = input.area * input.layerThicknessMm * input.consumptionKgPerM2PerMm;
  const requiredMass = mass * (1 + input.reservePercent / 100);
  if (!Number.isFinite(requiredMass) || requiredMass > LIMITS.maxMassKg) {
    return fail(MSG.tooLarge, "area");
  }
  const bags = ceilCount(requiredMass / input.bagWeight);
  const purchasedMass = bags * input.bagWeight;
  const result: SelfLevelingResult = {
    area: input.area,
    layerThicknessMm: input.layerThicknessMm,
    mass,
    requiredMass,
    bags,
    purchasedMass,
    extraMass: purchasedMass - requiredMass,
  };
  if (input.bagPrice != null && input.bagPrice !== 0) {
    if (input.bagPrice < 0) return fail(MSG.nonNegative, "bagPrice");
    result.totalPrice = bags * input.bagPrice;
  }
  return result;
}
