/**
 * Site-wide configuration.
 */
export const SITE_NAME = "РемонтКальк";
export const SITE_TAGLINE = "Строительные калькуляторы онлайн";
export const SITE_DESCRIPTION =
  "Бесплатные онлайн-калькуляторы материалов для ремонта и строительства: ламинат, плитка, обои, краска, бетон и другие.";

/**
 * Canonical origin (без www, без слэша в конце).
 * Sitemap, robots.txt и rel=canonical всегда указывают сюда.
 */
export const SITE_URL = "https://remontkalk.ru";
export const SITE_HOST = "remontkalk.ru";

/** Public contact. Incoming mail is forwarded via ImprovMX. */
export const CONTACT_EMAIL = "info@remontkalk.ru";

export const ANALYTICS = {
  yandexMetrikaId: "",
  gaMeasurementId: "",
  googleSiteVerification: "",
  yandexWebmasterVerification: "",
} as const;

export function joinUrl(origin: string, path: string): string {
  const base = origin.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export function canonicalPath(path: string): string {
  if (!path) return "/";
  const noQuery = path.split("?")[0] ?? "/";
  const noHash = noQuery.split("#")[0] ?? "/";
  if (noHash.length > 1 && noHash.endsWith("/")) return noHash.slice(0, -1);
  return noHash || "/";
}
