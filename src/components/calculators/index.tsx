import type { ComponentType } from "react";
import type { CalculatorId } from "@/lib/calculators/types";
import { RoomForm } from "./room-form";
import { WallsForm } from "./walls-form";
import { LaminateForm } from "./laminate-form";
import { TilesForm } from "./tiles-form";
import { WallpaperForm } from "./wallpaper-form";
import { PaintForm } from "./paint-form";
import { PlasterForm, PuttyForm, SelfLevelingForm } from "./bag-forms";
import { ScreedForm } from "./screed-form";
import { ConcreteForm } from "./concrete-form";
import { BrickForm, DrywallForm, GasblockForm, InsulationForm } from "./masonry-forms";

export const CALCULATOR_FORMS: Record<CalculatorId, ComponentType<{ search?: Record<string, unknown> }>> = {
  room: RoomForm,
  walls: WallsForm,
  laminate: LaminateForm,
  tiles: TilesForm,
  wallpaper: WallpaperForm,
  paint: PaintForm,
  plaster: PlasterForm,
  putty: PuttyForm,
  "self-leveling": SelfLevelingForm,
  screed: ScreedForm,
  concrete: ConcreteForm,
  brick: BrickForm,
  gasblock: GasblockForm,
  drywall: DrywallForm,
  insulation: InsulationForm,
};
