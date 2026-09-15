/**
 * Central ads switch. Keep false until a real network is connected.
 * When false, AdSlot renders nothing — no empty reserved gaps.
 */
export const ADS_ENABLED = false;

export type AdSlotId =
  | "after-result"
  | "before-faq"
  | "after-faq"
  | "category-bottom"
  | "home-mid";

export const AD_SLOT_MIN_HEIGHT_PX = 90;
