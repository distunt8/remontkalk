import { checkPositive, checkRange, fail, LIMITS, type CalcError } from "./errors";

export type OpeningInput = {
  width: number;
  height: number;
};

export type RoomInput = {
  length: number;
  width: number;
  height: number;
  openings?: OpeningInput[];
};

export type RoomResult = {
  floorArea: number;
  ceilingArea: number;
  perimeter: number;
  grossWallArea: number;
  openingsArea: number;
  netWallArea: number;
  roomVolume: number;
  openingsCount: number;
};

export function calculateRoom(input: RoomInput): RoomResult | CalcError {
  const { length, width, height } = input;
  for (const [n, field] of [
    [length, "length"],
    [width, "width"],
    [height, "height"],
  ] as const) {
    const err = checkPositive(n, field) ?? checkRange(n, LIMITS.maxLengthM, field);
    if (err) return err;
  }

  const floorArea = length * width;
  const ceilingArea = length * width;
  const perimeter = 2 * (length + width);
  const grossWallArea = perimeter * height;
  const roomVolume = length * width * height;

  if (floorArea > LIMITS.maxAreaM2) return fail("Площадь слишком большая", "length");
  if (roomVolume > LIMITS.maxVolumeM3) return fail("Объём слишком большой", "height");

  let openingsArea = 0;
  const openings = input.openings ?? [];
  if (openings.length > LIMITS.maxOpenings) {
    return fail(`Можно добавить не больше ${LIMITS.maxOpenings} проёмов`);
  }
  for (const [i, o] of openings.entries()) {
    if (o.width < 0 || o.height < 0) {
      return fail("Размеры проёма не могут быть отрицательными", `opening-${i}`);
    }
    if (o.width === 0 && o.height === 0) continue;
    if (o.width <= 0 || o.height <= 0) {
      return fail("Введите ширину и высоту проёма больше 0", `opening-${i}`);
    }
    openingsArea += o.width * o.height;
  }

  if (openingsArea > grossWallArea) {
    return fail("Площадь проёмов больше площади стен. Проверьте размеры.");
  }

  return {
    floorArea,
    ceilingArea,
    perimeter,
    grossWallArea,
    openingsArea,
    netWallArea: grossWallArea - openingsArea,
    roomVolume,
    openingsCount: openings.filter((o) => o.width > 0 && o.height > 0).length,
  };
}
