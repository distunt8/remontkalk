import { createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { AdSlot } from "@/components/ads/ad-slot";
import { CalcBoundary } from "@/components/calculator/calc-boundary";
import { CalculatorLayout } from "@/components/calculator/calculator-layout";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/calculator/breadcrumbs";
import { CALCULATOR_FORMS } from "@/components/calculators";
import { CalculatorCard } from "@/components/home/cards";
import { JsonLd } from "@/components/seo/json-ld";
import { track } from "@/lib/analytics";
import {
  CATEGORIES,
  getCalculatorBySlug,
  getCategoryBySlug,
  listByCategory,
} from "@/lib/calculators/registry";
import type { CalculatorDef, CategoryDef } from "@/lib/calculators/types";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type LoaderData =
  | { kind: "calculator"; calc: CalculatorDef }
  | { kind: "category"; category: CategoryDef };

export const Route = createFileRoute("/$slug")({
  validateSearch: (search: Record<string, unknown>) => search,
  loader: ({ params }): LoaderData => {
    const calc = getCalculatorBySlug(params.slug);
    if (calc) return { kind: "calculator", calc };
    const category = getCategoryBySlug(params.slug);
    if (category) return { kind: "category", category };
    throw notFound();
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    if (loaderData.kind === "calculator") {
      const c = loaderData.calc;
      return {
        meta: [
          { title: `${c.seoTitle} — ${SITE_NAME}` },
          { name: "description", content: c.seoDescription },
        ],
        links: [{ rel: "canonical", href: `${SITE_URL}/${c.slug}` }],
      };
    }
    const cat = loaderData.category;
    return {
      meta: [
        { title: `${cat.seoTitle} — ${SITE_NAME}` },
        { name: "description", content: cat.seoDescription },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/${cat.slug}` }],
    };
  },
  component: SlugPage,
});

function SlugPage() {
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  if (data.kind === "calculator") return <CalculatorPage calc={data.calc} search={search} />;
  return <CategoryPage category={data.category} />;
}

function CalculatorPage({
  calc,
  search,
}: {
  calc: CalculatorDef;
  search: Record<string, unknown>;
}) {
  useEffect(() => {
    track("calculator_view", { calculator_id: calc.id, calculator_name: calc.id });
  }, [calc.id]);

  const Form = CALCULATOR_FORMS[calc.id];
  const category = CATEGORIES.find((c) => c.id === calc.category);
  const crumbs = [
    { href: "/", label: "Главная" },
    ...(category ? [{ href: `/${category.slug}`, label: category.name }] : []),
    { href: `/${calc.slug}`, label: calc.name },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(SITE_URL, crumbs)} />
      <CalculatorLayout calc={calc}>
        <CalcBoundary>
          <Form search={search} />
        </CalcBoundary>
      </CalculatorLayout>
    </>
  );
}

function CategoryPage({ category }: { category: CategoryDef }) {
  const items = listByCategory(category.id);
  const crumbs = [
    { href: "/", label: "Главная" },
    { href: `/${category.slug}`, label: category.name },
  ];
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd data={breadcrumbJsonLd(SITE_URL, crumbs)} />
      <Breadcrumbs items={crumbs} />
      <h1 className="font-display mt-5 text-3xl text-ink sm:text-4xl">{category.h1}</h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-ink-soft">{category.description}</p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <li key={c.id}>
            <CalculatorCard calc={c} />
          </li>
        ))}
      </ul>
      <AdSlot slot="category-bottom" />
    </div>
  );
}
