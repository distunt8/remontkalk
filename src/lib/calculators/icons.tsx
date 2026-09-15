import type { LucideIcon } from "lucide-react";
import {
  House,
  PanelTop,
  Layers,
  Grid2x2,
  Scroll,
  Paintbrush,
  Droplets,
  Cylinder,
  Box,
  BrickWall,
  Boxes,
  PanelsTopLeft,
  Snowflake,
  Ruler,
} from "lucide-react";
import type { IconName } from "./types";

export const ICONS: Record<IconName, LucideIcon> = {
  house: House,
  walls: PanelTop,
  layers: Layers,
  "grid-2x2": Grid2x2,
  scroll: Scroll,
  paintbrush: Paintbrush,
  droplets: Droplets,
  hammer: Box,
  cylinder: Cylinder,
  box: Box,
  brick: BrickWall,
  blocks: Boxes,
  panel: PanelsTopLeft,
  snowflake: Snowflake,
  ruler: Ruler,
};
