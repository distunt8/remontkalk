import { checkPositive, checkRange, fail, LIMITS, type CalcError } from "./errors";
import type { OpeningInput } from "./room";

export type WallSegment = {
  width: number;
  height: number;
};

export type WallsRoomInput = {
  mode: "room";
  length: number;
  width: number;
  height: number;
  openings?: OpeningInput[];
};

export type WallsSegmentsInput = {
  mode: "segments";
  walls: WallSegment[];
  openings?: OpeningInput[];
};

export type WallsInput = WallsRoomInput | WallsSegmentsInput;

export type WallsResult = {
  grossArea: number;
  openingsArea: number;
  netArea: number;
  wallsCount: number;
};

export function calculateWalls(input: WallsInput): WallsResult | CalcError {
  let grossArea = 0;
  let wallsCount = 0;

  if (input.mode === "room") {
    const { length, width, height } = input;
    for (const [n, field] of [
      [length, "length"],
      [width, "width"],
      [height, "height"],
    ] as const) {
      const err = checkPositive(n, field) ?? checkRange(n, LIMITS.maxLengthM, field);
      if (err) return err;
    }
    grossArea = 2 * (length + width) * height;
    wallsCount = 4;
  } else {
    if (!input.walls.length) return fail("Добавьте хотя бы одну стену");
    for (const [i, w] of input.walls.entries()) {
      const errW = checkPositive(w.width, `wall-${i}-width`);
      const errH = checkPositive(w.height, `wall-${i}-height`);
      if (errW) return errW;
      if (errH) return errH;
      grossArea += w.width * w.height;
      wallsCount += 1;
    }
  }

  if (grossArea > LIMITS.maxAreaM2) return fail("Площадь слишком большая");

  let openingsArea = 0;
  for (const [i, o] of (input.openings ?? []).entries()) {
    if (o.width < 0 || o.height < 0) {
      return fail("Размеры проёма не могут быть отрицательными", `opening-${i}`);
    }
    if (o.width === 0 && o.height === 0) continue;
    if (o.width <= 0 || o.height <= 0) {
      return fail("Введите ширину и высоту проёма больше 0", `opening-${i}`);
    }
    openingsArea += o.width * o.height;
  }

  if (openingsArea > grossArea) {
    return fail("Площадь проёмов больше площади стен. Проверьте размеры.");
  }

  return {
    grossArea,
    openingsArea,
    netArea: grossArea - openingsArea,
    wallsCount,
  };
}
