import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CalculatorCard } from "@/components/home/cards";
import { SearchCalculators } from "@/components/home/search-calculators";
import { listPopular } from "@/lib/calculators/registry";

export function NotFoundPage() {
  const popular = listPopular();
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-sm font-medium uppercase tracking-[0.14em] text-muted">404</p>
      <h1 className="font-display mt-3 text-4xl text-ink">Страница не найдена</h1>
      <p className="mt-3 text-ink-soft">
        Возможно, калькулятор был перемещён или адрес указан неверно.
      </p>
      <div className="mt-8">
        <SearchCalculators />
      </div>
      <div className="mt-6">
        <Button asChild>
          <Link to="/">На главную</Link>
        </Button>
      </div>
      <h2 className="font-display mt-12 text-2xl text-ink">Популярные калькуляторы</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {popular.map((c) => (
          <li key={c.id}>
            <CalculatorCard calc={c} />
          </li>
        ))}
      </ul>
    </div>
  );
}
