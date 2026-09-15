import { checkPositive, checkRange, fail, LIMITS, MSG, type CalcError } from "./errors";
import { ceilCount } from "./round";

export type BrickBond = 0.5 | 1 | 1.5 | 2;

export type BrickInput = {
  wallLength: number;
  wallHeight: number;
  openingsArea: number;
  brickLength: number;
  brickWidth: number;
  brickHeight: number;
  joint: number;
  bond: BrickBond;
  reservePercent: number;
  brickPrice?: number;
};

export type BrickResult = {
  netWallArea: number;
  wallThickness: number;
  modularLength: number;
  modularHeight: number;
  bricksPerM2: number;
  bricks: number;
  reservePercent: number;
  totalPrice?: number;
  halves: number;
};

function thicknessMeters(input: BrickInput): number {
  const { brickLength: L, brickWidth: W, joint: j, bond } = input;
  switch (bond) {
    case 0.5:
      return W;
    case 1:
      return L;
    case 1.5:
      return L + j + W;
    case 2:
      return L + j + L;
  }
}

export function calculateBrick(input: BrickInput): BrickResult | CalcError {
  const errL = checkPositive(input.wallLength, "wallLength") ?? checkRange(input.wallLength, LIMITS.maxLengthM, "wallLength");
  if (errL) return errL;
  const errH = checkPositive(input.wallHeight, "wallHeight") ?? checkRange(input.wallHeight, LIMITS.maxLengthM, "wallHeight");
  if (errH) return errH;
  if (input.openingsArea < 0) return fail(MSG.nonNegative, "openingsArea");
  const errBl = checkPositive(input.brickLength, "brickLength");
  if (errBl) return errBl;
  const errBw = checkPositive(input.brickWidth, "brickWidth");
  if (errBw) return errBw;
  const errBh = checkPositive(input.brickHeight, "brickHeight");
  if (errBh) return errBh;
  if (input.joint < 0) return fail(MSG.nonNegative, "joint");
  if (input.reservePercent < 0) return fail(MSG.nonNegative, "reservePercent");

  const gross = input.wallLength * input.wallHeight;
  if (input.openingsArea > gross) {
    return fail("Площадь проёмов больше площади стены. Проверьте размеры.", "openingsArea");
  }
  const netWallArea = gross - input.openingsArea;

  const modularLength = input.brickLength + input.joint;
  const modularHeight = input.brickHeight + input.joint;
  if (modularLength <= 0 || modularHeight <= 0) {
    return fail(MSG.invalid, "joint");
  }

  const halvesMap: Record<BrickBond, number> = { 0.5: 1, 1: 2, 1.5: 3, 2: 4 };
  const halves = halvesMap[input.bond];
  const faceArea = modularLength * modularHeight;
  const bricksPerM2 = halves / faceArea;
  const raw = netWallArea * bricksPerM2 * (1 + input.reservePercent / 100);
  const bricks = ceilCount(raw);

  if (!Number.isFinite(bricks) || bricks > LIMITS.maxCount) {
    return fail("Получилось слишком большое количество кирпичей. Проверьте данные.");
  }

  const result: BrickResult = {
    netWallArea,
    wallThickness: thicknessMeters(input),
    modularLength,
    modularHeight,
    bricksPerM2,
    bricks,
    reservePercent: input.reservePercent,
    halves,
  };
  if (input.brickPrice != null && input.brickPrice !== 0) {
    if (input.brickPrice < 0) return fail(MSG.nonNegative, "brickPrice");
    result.totalPrice = bricks * input.brickPrice;
  }
  return result;
}
