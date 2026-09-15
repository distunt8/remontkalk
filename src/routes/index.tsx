import { createFileRoute } from "@tanstack/react-router";
import { AdSlot } from "@/components/ads/ad-slot";
import { CalculatorCard, CategoryCard } from "@/components/home/cards";
import { SearchCalculators } from "@/components/home/search-calculators";
import { JsonLd } from "@/components/seo/json-ld";
import { CATEGORIES, listByCategory, listPopular } from "@/lib/calculators/registry";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE_NAME} — строительные калькуляторы онлайн` },
      { name: "description", content: SITE_DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
  }),
  component: Home,
});

function Home() {
  const popular = listPopular();
  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "ru-RU",
  };
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <JsonLd data={websiteLd} />
      <section className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-accent">РемонтКальк</p>
        <h1 className="font-display mt-3 text-4xl leading-[1.1] text-ink sm:text-5xl">
          Строительные калькуляторы онлайн
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-7 text-ink-soft">
          Рассчитайте количество материалов для ремонта и строительства
        </p>
      </section>

      <div className="mt-8 max-w-2xl">
        <SearchCalculators />
      </div>

      <section className="mt-14">
        <h2 className="font-display text-2xl text-ink">Популярные калькуляторы</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((c) => (
            <li key={c.id}>
              <CalculatorCard calc={c} />
            </li>
          ))}
        </ul>
      </section>

      <AdSlot slot="home-mid" />

      <section className="mt-14">
        <h2 className="font-display text-2xl text-ink">Категории</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => (
            <li key={c.id}>
              <CategoryCard category={c} count={listByCategory(c.id).length} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
