import { checkPositive, fail, LIMITS, MSG, type CalcError } from "./errors";
import { ceilCount } from "./round";

export type PuttyInput = {
  area: number;
  layers: number;
  consumptionPerM2PerLayer: number;
  bagWeight: number;
  reservePercent: number;
  bagPrice?: number;
};

export type PuttyResult = {
  area: number;
  layers: number;
  requiredMass: number;
  requiredMassWithReserve: number;
  bags: number;
  purchasedMass: number;
  extraMass: number;
  totalPrice?: number;
};

export function calculatePutty(input: PuttyInput): PuttyResult | CalcError {
  const errA = checkPositive(input.area, "area");
  if (errA) return errA;
  if (input.area > LIMITS.maxAreaM2) return fail(MSG.tooLarge, "area");
  const errL = checkPositive(input.layers, "layers");
  if (errL) return errL;
  const errC = checkPositive(input.consumptionPerM2PerLayer, "consumptionPerM2PerLayer");
  if (errC) return errC;
  const errB = checkPositive(input.bagWeight, "bagWeight");
  if (errB) return errB;
  if (input.reservePercent < 0) return fail(MSG.nonNegative, "reservePercent");

  const requiredMass = input.area * input.layers * input.consumptionPerM2PerLayer;
  const requiredMassWithReserve = requiredMass * (1 + input.reservePercent / 100);
  if (!Number.isFinite(requiredMassWithReserve) || requiredMassWithReserve > LIMITS.maxMassKg) {
    return fail(MSG.tooLarge, "area");
  }
  const bags = ceilCount(requiredMassWithReserve / input.bagWeight);
  const purchasedMass = bags * input.bagWeight;
  const result: PuttyResult = {
    area: input.area,
    layers: input.layers,
    requiredMass,
    requiredMassWithReserve,
    bags,
    purchasedMass,
    extraMass: purchasedMass - requiredMassWithReserve,
  };
  if (input.bagPrice != null && input.bagPrice !== 0) {
    if (input.bagPrice < 0) return fail(MSG.nonNegative, "bagPrice");
    result.totalPrice = bags * input.bagPrice;
  }
  return result;
}
