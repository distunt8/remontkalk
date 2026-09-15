export type AnalyticsEvent =
  | "calculator_view"
  | "calculator_calculate"
  | "calculator_result"
  | "calculator_reset"
  | "calculator_share"
  | "related_calculator_click"
  | "calculator_search";

type EventProps = {
  calculator_id?: string;
  calculator_name?: string;
  query?: string;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
    ym?: (id: number, method: string, ...rest: unknown[]) => void;
  }
}

/**
 * Analytics layer. No-ops until owner fills IDs in site.ts.
 * Never send room sizes or other user inputs.
 */
export function track(event: AnalyticsEvent, props: EventProps = {}) {
  if (typeof window === "undefined") return;
  const payload = {
    event,
    calculator_id: props.calculator_id,
    calculator_name: props.calculator_name,
    ...(event === "calculator_search" && props.query !== undefined
      ? { query_length: props.query.length }
      : {}),
  };
  try {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push(payload);
    if (typeof window.gtag === "function") {
      window.gtag("event", event, {
        calculator_id: props.calculator_id,
        calculator_name: props.calculator_name,
      });
    }
  } catch {
    // never surface analytics failures
  }
}
