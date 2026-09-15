import { Link } from "@tanstack/react-router";
import { SITE_NAME } from "@/lib/site";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 text-ink hover:text-accent">
      <svg viewBox="0 0 32 32" className="size-8 shrink-0" aria-hidden>
        <rect width="32" height="32" rx="8" fill="currentColor" className="text-accent" />
        <rect x="8" y="8" width="5" height="16" rx="1" fill="#F3F1EB" />
        <rect x="8" y="19" width="16" height="5" rx="1" fill="#F3F1EB" />
      </svg>
      {compact ? (
        <span className="sr-only">{SITE_NAME}</span>
      ) : (
        <span className="font-display text-lg tracking-tight">{SITE_NAME}</span>
      )}
    </Link>
  );
}
