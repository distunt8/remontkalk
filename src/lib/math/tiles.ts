import { checkPositive, checkRange, fail, LIMITS, MSG, type CalcError } from "./errors";
import { ceilCount } from "./round";

export type TilesInput = {
  length: number;
  width: number;
  tileLengthMm: number;
  tileWidthMm: number;
  reservePercent: number;
  tilesPerPack?: number;
  tilePrice?: number;
  packPrice?: number;
};

export type TilesResult = {
  surfaceArea: number;
  tileArea: number;
  reservePercent: number;
  requiredArea: number;
  tiles: number;
  packs?: number;
  purchasedTiles?: number;
  extraTiles?: number;
  totalPrice?: number;
};

export function calculateTiles(input: TilesInput): TilesResult | CalcError {
  const errL = checkPositive(input.length, "length") ?? checkRange(input.length, LIMITS.maxLengthM, "length");
  if (errL) return errL;
  const errW = checkPositive(input.width, "width") ?? checkRange(input.width, LIMITS.maxLengthM, "width");
  if (errW) return errW;
  const errTl = checkPositive(input.tileLengthMm, "tileLengthMm");
  if (errTl) return errTl;
  const errTw = checkPositive(input.tileWidthMm, "tileWidthMm");
  if (errTw) return errTw;
  if (!Number.isFinite(input.reservePercent) || input.reservePercent < 0) {
    return fail(MSG.nonNegative, "reservePercent");
  }

  const surfaceArea = input.length * input.width;
  const tileArea = (input.tileLengthMm / 1000) * (input.tileWidthMm / 1000);
  if (tileArea <= 0 || !Number.isFinite(tileArea)) return fail(MSG.invalid, "tileLengthMm");

  const requiredArea = surfaceArea * (1 + input.reservePercent / 100);
  const tiles = ceilCount(requiredArea / tileArea);
  if (!Number.isFinite(tiles) || tiles > LIMITS.maxCount) {
    return fail("Получилось слишком большое количество плиток. Проверьте данные.");
  }

  const result: TilesResult = {
    surfaceArea,
    tileArea,
    reservePercent: input.reservePercent,
    requiredArea,
    tiles,
  };

  if (input.tilesPerPack != null && input.tilesPerPack !== 0) {
    const errPack = checkPositive(input.tilesPerPack, "tilesPerPack");
    if (errPack) return errPack;
    const packs = ceilCount(tiles / input.tilesPerPack);
    const purchasedTiles = packs * input.tilesPerPack;
    result.packs = packs;
    result.purchasedTiles = purchasedTiles;
    result.extraTiles = purchasedTiles - tiles;
    if (input.packPrice != null && input.packPrice !== 0) {
      if (input.packPrice < 0) return fail(MSG.nonNegative, "packPrice");
      result.totalPrice = packs * input.packPrice;
    }
  }

  if (result.totalPrice == null && input.tilePrice != null && input.tilePrice !== 0) {
    if (input.tilePrice < 0) return fail(MSG.nonNegative, "tilePrice");
    const count = result.purchasedTiles ?? tiles;
    result.totalPrice = count * input.tilePrice;
  }

  return result;
}
