export type LengthUnit = "mm" | "cm" | "m";
export type MassUnit = "g" | "kg" | "t";
export type VolumeUnit = "l" | "m3";

export const LENGTH_UNITS: { value: LengthUnit; label: string }[] = [
  { value: "mm", label: "мм" },
  { value: "cm", label: "см" },
  { value: "m", label: "м" },
];

export const MASS_UNITS: { value: MassUnit; label: string }[] = [
  { value: "g", label: "г" },
  { value: "kg", label: "кг" },
  { value: "t", label: "т" },
];

export const VOLUME_UNITS: { value: VolumeUnit; label: string }[] = [
  { value: "l", label: "л" },
  { value: "m3", label: "м³" },
];

export function lengthToMeters(value: number, unit: LengthUnit): number {
  switch (unit) {
    case "mm":
      return value * 0.001;
    case "cm":
      return value * 0.01;
    case "m":
      return value;
  }
}

export function metersToLength(meters: number, unit: LengthUnit): number {
  switch (unit) {
    case "mm":
      return meters / 0.001;
    case "cm":
      return meters / 0.01;
    case "m":
      return meters;
  }
}

export function massToKg(value: number, unit: MassUnit): number {
  switch (unit) {
    case "g":
      return value * 0.001;
    case "kg":
      return value;
    case "t":
      return value * 1000;
  }
}

export function volumeToM3(value: number, unit: VolumeUnit): number {
  switch (unit) {
    case "l":
      return value * 0.001;
    case "m3":
      return value;
  }
}

export function litersToM3(liters: number): number {
  return liters * 0.001;
}

export function m3ToLiters(m3: number): number {
  return m3 * 1000;
}
