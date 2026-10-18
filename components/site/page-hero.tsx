import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  aside
}: {
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className={`page-hero surface-ink ${aside ? "has-aside" : ""}`}>
      <div className="container page-hero-grid">
        <div className="page-hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="h1">{title}</h1>
          <p className="lead">{lead}</p>
          {children}
        </div>
        {aside ? <div className="page-hero-aside">{aside}</div> : null}
      </div>
    </header>
  );
}
