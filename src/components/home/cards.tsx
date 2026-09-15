import { ArrowUpRight } from "lucide-react";
import { AppLink } from "@/components/app-link";
import { ICONS } from "@/lib/calculators/icons";
import type { CalculatorDef, CategoryDef } from "@/lib/calculators/types";

export function CalculatorCard({ calc }: { calc: CalculatorDef }) {
  const Icon = ICONS[calc.icon];
  return (
    <AppLink
      to={`/${calc.slug}`}
      className="group flex h-full flex-col rounded-[var(--radius-xl)] border border-border bg-surface p-5 transition-colors duration-150 hover:border-accent"
    >
      <span className="flex size-10 items-center justify-center rounded-[var(--radius-sm)] bg-accent-soft text-accent">
        <Icon className="size-5" aria-hidden />
      </span>
      <span className="mt-4 flex items-center justify-between gap-2 font-medium text-ink">
        {calc.name}
        <ArrowUpRight className="size-4 text-muted opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
      </span>
      <span className="mt-1 text-sm leading-6 text-muted">{calc.description}</span>
    </AppLink>
  );
}

export function CategoryCard({ category, count }: { category: CategoryDef; count: number }) {
  const Icon = ICONS[category.icon];
  return (
    <AppLink
      to={`/${category.slug}`}
      className="group flex items-center gap-4 rounded-[var(--radius-xl)] border border-border bg-surface p-5 transition-colors duration-150 hover:border-accent"
    >
      <span className="flex size-11 items-center justify-center rounded-[var(--radius-md)] bg-accent-soft text-accent">
        <Icon className="size-5" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-medium text-ink">{category.name}</span>
        <span className="text-sm text-muted">
          {count} {count === 1 ? "калькулятор" : count < 5 ? "калькулятора" : "калькуляторов"}
        </span>
      </span>
      <ArrowUpRight className="size-4 text-muted" aria-hidden />
    </AppLink>
  );
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="rounded-[var(--radius-xl)] border border-dashed border-border-strong bg-surface px-6 py-10 text-center">
      <p className="font-medium text-ink">{title}</p>
      {hint ? <p className="mt-2 text-sm text-muted">{hint}</p> : null}
    </div>
  );
}

export function ErrorState({ message }: { message?: string }) {
  return (
    <div className="rounded-[var(--radius-xl)] border border-danger/20 bg-danger-bg px-6 py-8 text-center">
      <p className="font-medium text-danger">
        {message ?? "Не удалось выполнить расчёт. Проверьте введённые значения и попробуйте снова."}
      </p>
    </div>
  );
}
