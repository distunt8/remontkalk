import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function TooltipProvider({ children }: { children: ReactNode }) {
  return (
    <TooltipPrimitive.Provider delayDuration={200} skipDelayDuration={80}>
      {children}
    </TooltipPrimitive.Provider>
  );
}

export function InfoTooltip({ text, label }: { text: string; label?: string }) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>
        <button
          type="button"
          className="inline-flex size-6 items-center justify-center rounded-full text-muted hover:bg-accent-soft hover:text-accent"
          aria-label={label ?? "Подсказка"}
        >
          <span className="text-xs font-semibold leading-none">i</span>
        </button>
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side="top"
          sideOffset={6}
          className={cn(
            "z-50 max-w-xs rounded-[var(--radius-md)] bg-ink px-3 py-2 text-xs leading-5 text-accent-fg shadow-soft",
          )}
        >
          {text}
          <TooltipPrimitive.Arrow className="fill-ink" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
