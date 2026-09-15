import { checkPositive, fail, LIMITS, MSG, type CalcError } from "./errors";
import { ceilCount } from "./round";

export type DrywallInput = {
  surfaceWidth: number;
  surfaceHeight: number;
  sheetWidth: number;
  sheetHeight: number;
  layers: number;
  reservePercent: number;
  sheetPrice?: number;
};

export type DrywallResult = {
  surfaceArea: number;
  sheetArea: number;
  rawSheets: number;
  sheets: number;
  totalPrice?: number;
};

export function calculateDrywall(input: DrywallInput): DrywallResult | CalcError {
  const errSw = checkPositive(input.surfaceWidth, "surfaceWidth");
  if (errSw) return errSw;
  const errSh = checkPositive(input.surfaceHeight, "surfaceHeight");
  if (errSh) return errSh;
  const errW = checkPositive(input.sheetWidth, "sheetWidth");
  if (errW) return errW;
  const errH = checkPositive(input.sheetHeight, "sheetHeight");
  if (errH) return errH;
  const errL = checkPositive(input.layers, "layers");
  if (errL) return errL;
  if (input.reservePercent < 0) return fail(MSG.nonNegative, "reservePercent");
  if (input.surfaceWidth * input.surfaceHeight > LIMITS.maxAreaM2) {
    return fail(MSG.tooLarge, "surfaceWidth");
  }

  const surfaceArea = input.surfaceWidth * input.surfaceHeight;
  const sheetArea = input.sheetWidth * input.sheetHeight;
  const rawSheets = (surfaceArea / sheetArea) * input.layers;
  const sheets = ceilCount(rawSheets * (1 + input.reservePercent / 100));
  if (!Number.isFinite(sheets) || sheets > LIMITS.maxCount) {
    return fail("Получилось слишком большое количество листов. Проверьте данные.");
  }
  const result: DrywallResult = { surfaceArea, sheetArea, rawSheets, sheets };
  if (input.sheetPrice != null && input.sheetPrice !== 0) {
    if (input.sheetPrice < 0) return fail(MSG.nonNegative, "sheetPrice");
    result.totalPrice = sheets * input.sheetPrice;
  }
  return result;
}
