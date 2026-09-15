import { ArrowUpRight } from "lucide-react";
import { AppLink } from "@/components/app-link";
import { ICONS } from "@/lib/calculators/icons";
import type { CalculatorDef } from "@/lib/calculators/types";
import { track } from "@/lib/analytics";

export function RelatedCalculators({
  items,
  fromId,
}: {
  items: CalculatorDef[];
  fromId?: string;
}) {
  if (!items.length) return null;
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl text-ink">Вам также пригодится</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((c) => {
          const Icon = ICONS[c.icon];
          return (
            <li key={c.id}>
              <AppLink
                to={`/${c.slug}`}
                onClick={() =>
                  track("related_calculator_click", {
                    calculator_id: fromId,
                    calculator_name: c.id,
                  })
                }
                className="flex items-start gap-3 rounded-[var(--radius-lg)] border border-border bg-surface p-4 transition-colors duration-150 hover:border-accent"
              >
                <span className="flex size-10 items-center justify-center rounded-[var(--radius-sm)] bg-accent-soft text-accent">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2 font-medium text-ink">
                    {c.name}
                    <ArrowUpRight className="size-4 text-muted" aria-hidden />
                  </span>
                  <span className="mt-1 block text-sm text-muted">{c.description}</span>
                </span>
              </AppLink>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
