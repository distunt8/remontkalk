import { createFileRoute } from "@tanstack/react-router";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: `Контакты — ${SITE_NAME}` },
      { name: "description", content: "Контакты сервиса РемонтКальк." },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contacts` }],
  }),
  component: ContactsPage,
});

function ContactsPage() {
  const placeholder = CONTACT_EMAIL === "EMAIL_PLACEHOLDER";
  return (
    <article className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="font-display text-3xl text-ink">Контакты</h1>
      <p className="mt-5 text-base leading-7 text-ink-soft">
        По вопросам сервиса, точности формул и сотрудничества:
      </p>
      {placeholder ? (
        <p className="mt-4 rounded-[var(--radius-md)] bg-warn-bg px-4 py-3 text-sm text-warn">
          Адрес электронной почты ещё не задан владельцем сайта. Перед запуском замените
          значение CONTACT_EMAIL в настройках проекта.
        </p>
      ) : (
        <p className="mt-4 text-base">
          <a className="text-accent hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
        </p>
      )}
    </article>
  );
}
