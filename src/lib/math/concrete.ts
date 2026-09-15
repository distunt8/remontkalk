import { checkPositive, checkRange, fail, LIMITS, MSG, type CalcError } from "./errors";

export type ConcreteSlabInput = {
  shape: "slab";
  length: number;
  width: number;
  thickness: number;
};

export type ConcreteStripInput = {
  shape: "strip";
  totalLength: number;
  width: number;
  height: number;
};

export type ConcreteRectColumnInput = {
  shape: "rect-column";
  width: number;
  length: number;
  height: number;
  quantity: number;
};

export type ConcreteCylinderInput = {
  shape: "cylinder";
  diameter: number;
  height: number;
  quantity: number;
};

export type ConcreteShapeInput =
  | ConcreteSlabInput
  | ConcreteStripInput
  | ConcreteRectColumnInput
  | ConcreteCylinderInput;

export type ConcreteInput = ConcreteShapeInput & {
  reservePercent: number;
  pricePerM3?: number;
};

export type ConcreteResult = {
  volume: number;
  requiredVolume: number;
  shape: ConcreteShapeInput["shape"];
  totalPrice?: number;
};

function shapeVolume(input: ConcreteShapeInput): number | CalcError {
  switch (input.shape) {
    case "slab": {
      const a = checkPositive(input.length, "length") ?? checkRange(input.length, LIMITS.maxLengthM, "length");
      if (a) return a;
      const b = checkPositive(input.width, "width") ?? checkRange(input.width, LIMITS.maxLengthM, "width");
      if (b) return b;
      const c = checkPositive(input.thickness, "thickness") ?? checkRange(input.thickness, LIMITS.maxLengthM, "thickness");
      if (c) return c;
      return input.length * input.width * input.thickness;
    }
    case "strip": {
      const a = checkPositive(input.totalLength, "totalLength") ?? checkRange(input.totalLength, LIMITS.maxLengthM, "totalLength");
      if (a) return a;
      const b = checkPositive(input.width, "width") ?? checkRange(input.width, LIMITS.maxLengthM, "width");
      if (b) return b;
      const c = checkPositive(input.height, "height") ?? checkRange(input.height, LIMITS.maxLengthM, "height");
      if (c) return c;
      return input.totalLength * input.width * input.height;
    }
    case "rect-column": {
      const a = checkPositive(input.width, "width");
      if (a) return a;
      const b = checkPositive(input.length, "length");
      if (b) return b;
      const c = checkPositive(input.height, "height");
      if (c) return c;
      const q = checkPositive(input.quantity, "quantity");
      if (q) return q;
      return input.width * input.length * input.height * input.quantity;
    }
    case "cylinder": {
      const a = checkPositive(input.diameter, "diameter");
      if (a) return a;
      const b = checkPositive(input.height, "height");
      if (b) return b;
      const q = checkPositive(input.quantity, "quantity");
      if (q) return q;
      const radius = input.diameter / 2;
      const volumeOne = Math.PI * radius * radius * input.height;
      return volumeOne * input.quantity;
    }
  }
}

export function calculateConcrete(input: ConcreteInput): ConcreteResult | CalcError {
  if (input.reservePercent < 0) return fail(MSG.nonNegative, "reservePercent");
  const volume = shapeVolume(input);
  if (typeof volume !== "number") return volume;
  if (!Number.isFinite(volume) || volume > LIMITS.maxVolumeM3) {
    return fail(MSG.tooLarge);
  }
  const requiredVolume = volume * (1 + input.reservePercent / 100);
  const result: ConcreteResult = {
    volume,
    requiredVolume,
    shape: input.shape,
  };
  if (input.pricePerM3 != null && input.pricePerM3 !== 0) {
    if (input.pricePerM3 < 0) return fail(MSG.nonNegative, "pricePerM3");
    result.totalPrice = requiredVolume * input.pricePerM3;
  }
  return result;
}
