import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { searchCalculators } from "@/lib/calculators/registry";
import { track } from "@/lib/analytics";
import { CalculatorCard, EmptyState } from "./cards";
import { Input } from "@/components/ui/input";

export function SearchCalculators({
  autoFocus = false,
  showResults = true,
}: {
  autoFocus?: boolean;
  showResults?: boolean;
}) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchCalculators(query), [query]);
  const searching = query.trim().length > 0;

  return (
    <div>
      <label htmlFor="calc-search" className="sr-only">
        Какой материал хотите рассчитать?
      </label>
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" aria-hidden />
        <Input
          id="calc-search"
          type="search"
          value={query}
          autoFocus={autoFocus}
          placeholder="Какой материал хотите рассчитать?"
          onChange={(e) => {
            const v = e.target.value;
            setQuery(v);
            if (v.trim().length >= 2) track("calculator_search", { query: v });
          }}
          className="h-14 rounded-[var(--radius-lg)] border-border-strong bg-surface pl-12 text-base shadow-soft"
        />
      </div>
      {showResults && searching ? (
        <div className="mt-6">
          {results.length === 0 ? (
            <EmptyState
              title="Калькулятор не найден. Попробуйте другое название."
              hint="Например: ламинат, краска, бетон"
            />
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((c) => (
                <li key={c.id}>
                  <CalculatorCard calc={c} />
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
