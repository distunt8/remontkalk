import { Button } from "@/components/ui/button";

export function FormActions({
  onReset,
  submitLabel = "Рассчитать",
}: {
  onReset: () => void;
  submitLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <Button type="submit" size="lg" className="w-full sm:w-auto sm:min-w-48">
        {submitLabel}
      </Button>
      <Button type="button" variant="ghost" size="lg" onClick={onReset} className="w-full sm:w-auto">
        Сбросить
      </Button>
    </div>
  );
}
