import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/calculators/types";

export function Faq({ items }: { items: FaqItem[] }) {
  if (!items.length) return null;
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl text-ink">Частые вопросы</h2>
      <Accordion.Root type="single" collapsible className="mt-4 divide-y divide-border rounded-[var(--radius-xl)] border border-border bg-surface">
        {items.map((item, i) => (
          <Accordion.Item key={item.q} value={`q-${i}`} className="px-5">
            <Accordion.Header>
              <Accordion.Trigger className="flex w-full items-center justify-between gap-4 py-4 text-left text-base font-medium text-ink hover:text-accent [&[data-state=open]>svg]:rotate-180">
                {item.q}
                <ChevronDown className="size-4 shrink-0 text-muted transition-transform duration-200" aria-hidden />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden data-[state=closed]:animate-none">
              <p className="pb-4 text-sm leading-6 text-ink-soft">{item.a}</p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
}
