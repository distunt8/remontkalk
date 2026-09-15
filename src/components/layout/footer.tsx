import { AppLink } from "@/components/app-link";
import { CATEGORIES, listPublishedCalculators } from "@/lib/calculators/registry";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";
import { Logo } from "./logo";

const DISCLAIMER =
  "Расчеты на сайте являются ориентировочными. Фактический расход материалов зависит от производителя, технологии работ, геометрии помещения, способа укладки и других условий. Для ответственных строительных конструкций используйте проектную документацию и рекомендации специалистов.";

export function Footer() {
  const calcs = listPublishedCalculators();
  return (
    <footer className="site-footer no-print mt-16 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo />
          <p className="mt-3 text-sm leading-6 text-muted">
            Бесплатные калькуляторы материалов для ремонта и строительства.
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-ink">Категории</p>
          <ul className="mt-3 grid gap-2 text-sm break-words">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <AppLink to={`/${c.slug}`} className="text-muted hover:text-accent">
                  {c.name}
                </AppLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium text-ink">Калькуляторы</p>
          <ul className="mt-3 grid gap-2 text-sm break-words">
            {calcs.slice(0, 8).map((c) => (
              <li key={c.id}>
                <AppLink to={`/${c.slug}`} className="text-muted hover:text-accent">
                  {c.name}
                </AppLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium text-ink">О сервисе</p>
          <ul className="mt-3 grid gap-2 text-sm break-words">
            <li>
              <AppLink to="/o-proekte" className="text-muted hover:text-accent">
                О проекте
              </AppLink>
            </li>
            <li>
              <AppLink to="/contacts" className="text-muted hover:text-accent">
                Контакты
              </AppLink>
            </li>
            <li>
              <AppLink to="/privacy" className="text-muted hover:text-accent">
                Конфиденциальность
              </AppLink>
            </li>
            <li>
              <AppLink to="/terms" className="text-muted hover:text-accent">
                Условия использования
              </AppLink>
            </li>
          </ul>
          <p className="mt-4 text-xs text-subtle">
            {CONTACT_EMAIL === "EMAIL_PLACEHOLDER"
              ? "Email появится перед запуском"
              : CONTACT_EMAIL}
          </p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <p className="text-xs leading-5 text-muted">{DISCLAIMER}</p>
          <p className="mt-3 text-xs text-subtle">© {new Date().getFullYear()} {SITE_NAME}</p>
        </div>
      </div>
    </footer>
  );
}
