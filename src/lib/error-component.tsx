import type { ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-6 text-center bg-bg text-ink">
      <span className="text-danger" aria-hidden="true">
        <TriangleAlert className="size-10" strokeWidth={2} />
      </span>
      <h1 className="font-display text-2xl">Не удалось открыть страницу</h1>
      <p className="max-w-md text-sm leading-6 text-muted break-words">
        Не удалось выполнить расчёт. Проверьте введённые значения и попробуйте снова.
      </p>
      <p className="max-w-md text-xs text-subtle break-words">{error.message}</p>
    </main>
  );
}
