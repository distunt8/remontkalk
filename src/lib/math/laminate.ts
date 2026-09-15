import { checkPositive, checkRange, fail, LIMITS, MSG, type CalcError } from "./errors";
import { ceilCount } from "./round";

export type LaminateInput = {
  length: number;
  width: number;
  reservePercent: number;
  packArea?: number;
  boardLengthMm?: number;
  boardWidthMm?: number;
  boardsPerPack?: number;
  packPrice?: number;
};

export type LaminateResult = {
  roomArea: number;
  reservePercent: number;
  reserveArea: number;
  requiredArea: number;
  packArea: number;
  packs: number;
  purchasedArea: number;
  extraAfterPurchase: number;
  totalPrice?: number;
};

export function calculateLaminate(input: LaminateInput): LaminateResult | CalcError {
  const errL = checkPositive(input.length, "length") ?? checkRange(input.length, LIMITS.maxLengthM, "length");
  if (errL) return errL;
  const errW = checkPositive(input.width, "width") ?? checkRange(input.width, LIMITS.maxLengthM, "width");
  if (errW) return errW;
  if (!Number.isFinite(input.reservePercent) || input.reservePercent < 0) {
    return fail(MSG.nonNegative, "reservePercent");
  }
  if (input.reservePercent > LIMITS.maxPercent) return fail(MSG.tooLarge, "reservePercent");

  const roomArea = input.length * input.width;
  const reserveArea = roomArea * (input.reservePercent / 100);
  const requiredArea = roomArea * (1 + input.reservePercent / 100);

  let packArea = input.packArea;
  if (packArea == null) {
    const errBl = checkPositive(input.boardLengthMm, "boardLengthMm");
    const errBw = checkPositive(input.boardWidthMm, "boardWidthMm");
    const errBp = checkPositive(input.boardsPerPack, "boardsPerPack");
    if (errBl) return errBl;
    if (errBw) return errBw;
    if (errBp) return errBp;
    const boardArea = (input.boardLengthMm! / 1000) * (input.boardWidthMm! / 1000);
    packArea = boardArea * input.boardsPerPack!;
  } else {
    const errP = checkPositive(packArea, "packArea");
    if (errP) return errP;
  }

  if (packArea > LIMITS.maxAreaM2) return fail(MSG.tooLarge, "packArea");

  const packs = ceilCount(requiredArea / packArea);
  if (!Number.isFinite(packs) || packs > LIMITS.maxCount) {
    return fail("Получилось слишком большое количество упаковок. Проверьте данные.");
  }
  const purchasedArea = packs * packArea;
  const extraAfterPurchase = purchasedArea - requiredArea;

  const result: LaminateResult = {
    roomArea,
    reservePercent: input.reservePercent,
    reserveArea,
    requiredArea,
    packArea,
    packs,
    purchasedArea,
    extraAfterPurchase,
  };

  if (input.packPrice != null && input.packPrice !== 0) {
    if (input.packPrice < 0) return fail(MSG.nonNegative, "packPrice");
    result.totalPrice = packs * input.packPrice;
  }

  return result;
}
