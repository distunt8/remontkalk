import { CheckCircle2 } from "lucide-react";
import { formatMoney } from "@/lib/math/format";
import { ShareBar } from "./share-bar";
import { cn } from "@/lib/utils";

export type ResultRow = {
  label: string;
  value: string;
  hint?: string;
  emphasize?: boolean;
};

export function ResultCard({
  headline,
  rows,
  checkBeforeBuy,
  copyText,
  shareTitle,
  sharePath,
  price,
  warning,
  disclaimer,
}: {
  headline: string;
  rows: ResultRow[];
  checkBeforeBuy: string;
  copyText: string;
  shareTitle: string;
  sharePath: string;
  price?: number;
  warning?: string;
  disclaimer?: string;
}) {
  return (
    <section
      id="result"
      className="rounded-[var(--radius-xl)] border border-border bg-surface p-5 shadow-soft sm:p-7"
      aria-live="polite"
    >
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">Результат</p>
      <h2 className="font-display mt-2 text-2xl leading-tight text-ink sm:text-3xl">{headline}</h2>
      {price != null ? (
        <p className="mt-2 text-lg text-accent tabular">{formatMoney(price)}</p>
      ) : null}

      <dl className="mt-6 grid gap-3 border-t border-border pt-5">
        {rows.map((row) => (
          <div
            key={row.label}
            className={cn(
              "flex items-baseline justify-between gap-4 text-sm",
              row.emphasize && "text-base font-medium text-ink",
            )}
          >
            <dt className="text-muted">
              {row.label}
              {row.hint ? <span className="mt-0.5 block text-xs font-normal text-subtle">{row.hint}</span> : null}
            </dt>
            <dd className="tabular text-ink text-right">{row.value}</dd>
          </div>
        ))}
      </dl>

      {warning ? (
        <p className="mt-5 rounded-[var(--radius-md)] bg-warn-bg px-3 py-2 text-sm text-warn">{warning}</p>
      ) : null}

      <div className="mt-6 flex gap-3 rounded-[var(--radius-lg)] bg-accent-soft px-4 py-3">
        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
        <div>
          <p className="text-sm font-medium text-ink">Проверьте перед покупкой</p>
          <p className="mt-1 text-sm text-ink-soft">{checkBeforeBuy}</p>
        </div>
      </div>

      {disclaimer ? <p className="mt-4 text-xs leading-5 text-muted">{disclaimer}</p> : null}

      <ShareBar copyText={copyText} shareTitle={shareTitle} sharePath={sharePath} />
    </section>
  );
}

export function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="rounded-[var(--radius-md)] bg-danger-bg px-4 py-3 text-sm text-danger" role="alert">
      {message}
    </div>
  );
}
