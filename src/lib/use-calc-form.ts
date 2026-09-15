import { useCallback, useEffect, useMemo, useState } from "react";
import { clearCalculatorState, loadCalculatorState, saveCalculatorState } from "@/lib/storage";
import { pickSearchValues, toQueryString } from "@/lib/search-params";

export function useCalcForm<T extends Record<string, string>>(opts: {
  id: string;
  defaults: T;
  search?: Record<string, unknown>;
  urlKeys?: (keyof T & string)[];
  slug: string;
}) {
  const urlKeys = opts.urlKeys ?? (Object.keys(opts.defaults) as (keyof T & string)[]);
  const initial = useMemo(() => {
    const fromUrl = pickSearchValues(opts.search, urlKeys);
    return { ...opts.defaults, ...fromUrl } as T;
  }, []);

  const [values, setValues] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const fromUrl = pickSearchValues(opts.search, urlKeys);
    const hasUrl = Object.keys(fromUrl).length > 0;
    if (!hasUrl) {
      const stored = loadCalculatorState<T>(opts.id);
      if (stored) {
        setValues((prev) => {
          const next = { ...prev };
          for (const [k, v] of Object.entries(stored) as [keyof T, T[keyof T]][]) {
            if (prev[k] === opts.defaults[k] && v != null && String(v) !== "") {
              next[k] = v;
            }
          }
          return next;
        });
      }
    }
    setHydrated(true);
  }, [opts.id]);

  const set = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      saveCalculatorState(opts.id, next);
      return next;
    });
  }, [opts.id]);

  const setMany = useCallback((patch: Partial<T>) => {
    setValues((prev) => {
      const next = { ...prev, ...patch };
      saveCalculatorState(opts.id, next);
      return next;
    });
  }, [opts.id]);

  const reset = useCallback(() => {
    setValues(opts.defaults);
    clearCalculatorState(opts.id);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.search = "";
      window.history.replaceState(null, "", url.pathname);
    }
  }, [opts.defaults, opts.id]);

  const sharePath = useCallback(() => {
    const q = toQueryString(values);
    return `/${opts.slug}${q}`;
  }, [values, opts.slug]);

  const writeUrl = useCallback(() => {
    if (typeof window === "undefined") return;
    const q = toQueryString(values);
    window.history.replaceState(null, "", `/${opts.slug}${q}`);
  }, [values, opts.slug]);

  return { values, set, setMany, reset, sharePath, writeUrl, hydrated };
}
