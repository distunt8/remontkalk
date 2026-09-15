import { ADS_ENABLED, AD_SLOT_MIN_HEIGHT_PX, type AdSlotId } from "@/lib/ads";

export function AdSlot({ slot }: { slot: AdSlotId }) {
  if (!ADS_ENABLED) return null;
  return (
    <aside
      className="no-print overflow-hidden rounded-[var(--radius-md)] bg-bg-sunken"
      data-ad-slot={slot}
      aria-label="Реклама"
      style={{ minHeight: AD_SLOT_MIN_HEIGHT_PX }}
    />
  );
}
