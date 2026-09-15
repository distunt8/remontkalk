import type { ReactNode } from "react";
import { AdSlot } from "@/components/ads/ad-slot";
import { Breadcrumbs } from "./breadcrumbs";
import { Faq } from "./faq";
import { RelatedCalculators } from "./related";
import { CATEGORIES, listRelated } from "@/lib/calculators/registry";
import type { CalculatorDef } from "@/lib/calculators/types";

export function CalculatorLayout({
  calc,
  children,
}: {
  calc: CalculatorDef;
  children: ReactNode;
}) {
  const category = CATEGORIES.find((c) => c.id === calc.category);
  const related = listRelated(calc.id);

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          ...(category ? [{ href: `/${category.slug}`, label: category.name }] : []),
          { label: calc.name },
        ]}
      />
      <h1 className="font-display mt-5 text-3xl leading-tight text-ink sm:text-4xl">{calc.h1}</h1>
      <p className="mt-3 text-base leading-7 text-ink-soft">{calc.description}</p>

      <div className="mt-8">{children}</div>

      <AdSlot slot="after-result" />

      <section className="mt-12">
        <h2 className="font-display text-2xl text-ink">Как пользоваться</h2>
        <ol className="mt-4 grid gap-2 text-sm leading-6 text-ink-soft">
          {calc.howToUse.map((step, i) => (
            <li key={step} className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-medium text-accent">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-ink">Как выполняется расчёт</h2>
        <ul className="mt-4 grid gap-2 text-sm leading-6 text-ink-soft">
          {calc.howCalculated.map((s) => (
            <li key={s} className="border-l-2 border-accent-soft pl-3">
              {s}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-ink">Что влияет на расход</h2>
        <ul className="mt-4 grid gap-2 text-sm leading-6 text-ink-soft">
          {calc.whatAffects.map((s) => (
            <li key={s} className="border-l-2 border-border pl-3">
              {s}
            </li>
          ))}
        </ul>
      </section>

      <AdSlot slot="before-faq" />
      <Faq items={calc.faq} />
      <AdSlot slot="after-faq" />
      <RelatedCalculators items={related} fromId={calc.id} />
    </article>
  );
}
