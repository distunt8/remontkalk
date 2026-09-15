import { checkPositive, fail, LIMITS, MSG, type CalcError } from "./errors";
import { ceilCount } from "./round";

export type GasblockInput = {
  wallArea: number;
  openingsArea: number;
  blockLength: number;
  blockHeight: number;
  blockThickness: number;
  reservePercent: number;
  blockPrice?: number;
};

export type GasblockResult = {
  netWallArea: number;
  blockFaceArea: number;
  blocks: number;
  finalBlocks: number;
  blockVolume: number;
  totalBlockVolume: number;
  wallThickness: number;
  reservePercent: number;
  totalPrice?: number;
};

export function calculateGasblock(input: GasblockInput): GasblockResult | CalcError {
  const errA = checkPositive(input.wallArea, "wallArea");
  if (errA) return errA;
  if (input.wallArea > LIMITS.maxAreaM2) return fail(MSG.tooLarge, "wallArea");
  if (input.openingsArea < 0) return fail(MSG.nonNegative, "openingsArea");
  if (input.openingsArea > input.wallArea) {
    return fail("Площадь проёмов больше площади стен. Проверьте размеры.", "openingsArea");
  }
  const errL = checkPositive(input.blockLength, "blockLength");
  if (errL) return errL;
  const errH = checkPositive(input.blockHeight, "blockHeight");
  if (errH) return errH;
  const errT = checkPositive(input.blockThickness, "blockThickness");
  if (errT) return errT;
  if (input.reservePercent < 0) return fail(MSG.nonNegative, "reservePercent");

  const netWallArea = input.wallArea - input.openingsArea;
  const blockFaceArea = input.blockLength * input.blockHeight;
  if (blockFaceArea <= 0) return fail(MSG.invalid, "blockLength");
  const blocks = ceilCount(netWallArea / blockFaceArea);
  const finalBlocks = ceilCount(blocks * (1 + input.reservePercent / 100));
  const blockVolume = input.blockLength * input.blockHeight * input.blockThickness;
  const totalBlockVolume = finalBlocks * blockVolume;

  if (!Number.isFinite(finalBlocks) || finalBlocks > LIMITS.maxCount) {
    return fail("Получилось слишком большое количество блоков. Проверьте данные.");
  }

  const result: GasblockResult = {
    netWallArea,
    blockFaceArea,
    blocks,
    finalBlocks,
    blockVolume,
    totalBlockVolume,
    wallThickness: input.blockThickness,
    reservePercent: input.reservePercent,
  };
  if (input.blockPrice != null && input.blockPrice !== 0) {
    if (input.blockPrice < 0) return fail(MSG.nonNegative, "blockPrice");
    result.totalPrice = finalBlocks * input.blockPrice;
  }
  return result;
}
