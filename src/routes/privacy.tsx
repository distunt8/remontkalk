import { createFileRoute } from "@tanstack/react-router";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: `Конфиденциальность — ${SITE_NAME}` },
      { name: "description", content: "Как РемонтКальк обрабатывает данные: localStorage, аналитика и будущая реклама." },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/privacy` }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="font-display text-3xl text-ink">Конфиденциальность</h1>
      <div className="mt-5 grid gap-4 text-base leading-7 text-ink-soft">
        <p>
          Сервис работает без учётных записей. Вычисления выполняются на вашем устройстве.
        </p>
        <h2 className="font-display mt-4 text-xl text-ink">localStorage</h2>
        <p>
          Последние введённые значения каждого калькулятора сохраняются в localStorage браузера,
          чтобы вы могли вернуться к расчёту. Данные не отправляются на сервер. Кнопка «Сбросить»
          удаляет сохранённые значения этого калькулятора.
        </p>
        <h2 className="font-display mt-4 text-xl text-ink">Аналитика</h2>
        <p>
          Счётчики посещаемости (Яндекс Метрика, Google Analytics) могут быть подключены позже.
          Пока идентификаторы не заданы, сторонние аналитические скрипты не загружаются. Когда
          они появятся, мы не будем передавать в них размеры помещений и другие введённые значения
          расчёта — только факт события и идентификатор калькулятора.
        </p>
        <h2 className="font-display mt-4 text-xl text-ink">Cookies</h2>
        <p>
          Сайт сам по себе не устанавливает cookie для расчётов. Cookie могут появиться после
          подключения аналитики или рекламной сети — тогда этот раздел будет обновлён.
        </p>
        <h2 className="font-display mt-4 text-xl text-ink">Реклама</h2>
        <p>
          Рекламная сеть пока не подключена. После подключения рекламные системы могут собирать
          данные согласно своей политике — мы укажем это явно.
        </p>
      </div>
    </article>
  );
}
