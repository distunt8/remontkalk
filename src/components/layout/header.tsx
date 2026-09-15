import { Menu, X } from "lucide-react";
import { useState } from "react";
import { AppLink } from "@/components/app-link";
import { CATEGORIES, listPublishedCalculators } from "@/lib/calculators/registry";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const calcs = listPublishedCalculators();

  return (
    <header className="site-header no-print sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Основное меню">
          {CATEGORIES.map((c) => (
            <AppLink
              key={c.id}
              to={`/${c.slug}`}
              className="rounded-[var(--radius-sm)] px-3 py-2 text-sm text-ink-soft hover:bg-accent-soft hover:text-ink"
            >
              {c.name}
            </AppLink>
          ))}
          <AppLink
            to="/o-proekte"
            className="rounded-[var(--radius-sm)] px-3 py-2 text-sm text-ink-soft hover:bg-accent-soft hover:text-ink"
          >
            О проекте
          </AppLink>
        </nav>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-[var(--radius-md)] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      <div
        id="mobile-nav"
        className={cn(
          "border-t border-border bg-surface md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="mx-auto grid max-w-6xl gap-1 px-4 py-4" aria-label="Мобильное меню">
          {CATEGORIES.map((c) => (
            <AppLink
              key={c.id}
              to={`/${c.slug}`}
              className="rounded-[var(--radius-sm)] px-3 py-3 text-base text-ink"
              onClick={() => setOpen(false)}
            >
              {c.name}
            </AppLink>
          ))}
          <AppLink to="/o-proekte" className="rounded-[var(--radius-sm)] px-3 py-3 text-base text-ink" onClick={() => setOpen(false)}>
            О проекте
          </AppLink>
          <p className="mt-3 px-3 text-xs font-medium uppercase tracking-wider text-muted">Калькуляторы</p>
          {calcs.map((c) => (
            <AppLink
              key={c.id}
              to={`/${c.slug}`}
              className="rounded-[var(--radius-sm)] px-3 py-2 text-sm text-ink-soft"
              onClick={() => setOpen(false)}
            >
              {c.name}
            </AppLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
