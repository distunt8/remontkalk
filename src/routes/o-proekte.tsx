import { createFileRoute } from "@tanstack/react-router";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/o-proekte")({
  head: () => ({
    meta: [
      { title: `О проекте — ${SITE_NAME}` },
      {
        name: "description",
        content: "РемонтКальк — бесплатный сервис онлайн-калькуляторов для предварительного расчёта материалов при ремонте и строительстве.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/o-proekte` }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="font-display text-3xl text-ink">О проекте</h1>
      <div className="mt-5 grid gap-4 text-base leading-7 text-ink-soft">
        <p>
          РемонтКальк — бесплатный сервис онлайн-калькуляторов для предварительного расчёта
          материалов при ремонте и строительстве.
        </p>
        <p>
          Вы вводите размеры и параметры выбранного материала — сайт считает площадь, объём,
          запас, число упаковок или мешков и, если указана цена, ориентировочную стоимость.
        </p>
        <p>
          Все вычисления выполняются в браузере. Мы не храним ваши размеры на сервере: последний
          расчёт каждого калькулятора сохраняется только на вашем устройстве.
        </p>
        <p>
          Результаты ориентировочные. Они не заменяют проект, смету или консультацию специалиста.
        </p>
      </div>
    </article>
  );
}
