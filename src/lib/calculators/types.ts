export type CalculatorId =
  | "room"
  | "walls"
  | "laminate"
  | "tiles"
  | "wallpaper"
  | "paint"
  | "plaster"
  | "putty"
  | "self-leveling"
  | "screed"
  | "concrete"
  | "brick"
  | "gasblock"
  | "drywall"
  | "insulation";

export type CategoryId =
  | "pomeshchenie"
  | "pol"
  | "steny"
  | "otdelka"
  | "stroitelstvo";

export type IconName =
  | "house"
  | "walls"
  | "layers"
  | "grid-2x2"
  | "scroll"
  | "paintbrush"
  | "droplets"
  | "hammer"
  | "cylinder"
  | "box"
  | "brick"
  | "blocks"
  | "panel"
  | "snowflake"
  | "ruler";

export type FaqItem = { q: string; a: string };

export type CalculatorDef = {
  id: CalculatorId;
  slug: string;
  name: string;
  shortName: string;
  category: CategoryId;
  alsoIn: CategoryId[];
  description: string;
  keywords: string[];
  icon: IconName;
  related: CalculatorId[];
  seoTitle: string;
  seoDescription: string;
  h1: string;
  popular: boolean;
  order: number;
  status: "published";
  howToUse: string[];
  howCalculated: string[];
  whatAffects: string[];
  faq: FaqItem[];
  checkBeforeBuy: string;
  disclaimer?: string;
};

export type CategoryDef = {
  id: CategoryId;
  slug: CategoryId;
  name: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  description: string;
  order: number;
  icon: IconName;
};
