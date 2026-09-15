import { checkPositive, fail, LIMITS, MSG, type CalcError } from "./errors";
import { ceilCount } from "./round";

export type PlasterInput = {
  area: number;
  layerThicknessMm: number;
  manufacturerConsumption: number;
  bagWeight: number;
  reservePercent: number;
  bagPrice?: number;
};

export type PlasterResult = {
  area: number;
  layerThicknessMm: number;
  baseMass: number;
  requiredMass: number;
  bags: number;
  purchasedMass: number;
  extraMass: number;
  totalPrice?: number;
};

export function calculatePlaster(input: PlasterInput): PlasterResult | CalcError {
  const errA = checkPositive(input.area, "area");
  if (errA) return errA;
  if (input.area > LIMITS.maxAreaM2) return fail(MSG.tooLarge, "area");
  const errT = checkPositive(input.layerThicknessMm, "layerThicknessMm");
  if (errT) return errT;
  const errC = checkPositive(input.manufacturerConsumption, "manufacturerConsumption");
  if (errC) return errC;
  const errB = checkPositive(input.bagWeight, "bagWeight");
  if (errB) return errB;
  if (input.reservePercent < 0) return fail(MSG.nonNegative, "reservePercent");

  const baseMass = input.area * input.manufacturerConsumption * (input.layerThicknessMm / 10);
  const requiredMass = baseMass * (1 + input.reservePercent / 100);
  if (!Number.isFinite(requiredMass) || requiredMass > LIMITS.maxMassKg) {
    return fail(MSG.tooLarge, "area");
  }
  const bags = ceilCount(requiredMass / input.bagWeight);
  const purchasedMass = bags * input.bagWeight;

  const result: PlasterResult = {
    area: input.area,
    layerThicknessMm: input.layerThicknessMm,
    baseMass,
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
