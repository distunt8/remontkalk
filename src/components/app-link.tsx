import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";

type Props = {
  to: string;
  className?: string;
  children: ReactNode;
  onClick?: ComponentProps<typeof Link>["onClick"];
};

export function AppLink({ to, className, children, onClick }: Props) {
  if (to === "/") {
    return (
      <Link to="/" className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  if (to === "/o-proekte") {
    return (
      <Link to="/o-proekte" className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  if (to === "/privacy") {
    return (
      <Link to="/privacy" className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  if (to === "/terms") {
    return (
      <Link to="/terms" className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  if (to === "/contacts") {
    return (
      <Link to="/contacts" className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  const slug = to.replace(/^\//, "").split("/")[0] ?? to;
  return (
    <Link to="/$slug" params={{ slug }} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
