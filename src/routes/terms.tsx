import { createFileRoute } from "@tanstack/react-router";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: `Условия использования — ${SITE_NAME}` },
      { name: "description", content: "Расчёты РемонтКальк ориентировочные и не являются проектной документацией." },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/terms` }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="font-display text-3xl text-ink">Условия использования</h1>
      <div className="mt-5 grid gap-4 text-base leading-7 text-ink-soft">
        <p>
          Пользуясь сайтом, вы соглашаетесь, что результаты калькуляторов носят справочный характер.
        </p>
        <ul className="grid list-disc gap-2 pl-5">
          <li>Расчёты ориентировочные и зависят от введённых вами данных.</li>
          <li>Сайт не является проектной документацией, сметой или заключением специалиста.</li>
          <li>Пользователь самостоятельно сверяет характеристики выбранного материала с упаковкой.</li>
          <li>Для несущих и ответственных конструкций нужен проект и рекомендации инженеров.</li>
        </ul>
        <p>
          Мы не несём ответственность за решения о закупке материалов, принятые только на основании
          расчёта на сайте.
        </p>
      </div>
    </article>
  );
}
