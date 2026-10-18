import { FileText } from "lucide-react";
import { legalDocumentsApproved, legalDocumentsUpdated } from "@/app/site-config";

export type LegalSection = { id: string; title: string; body: string };

// Shared layout for the Terms, Privacy and Risk Disclosure pages. The approval note disappears once
// `legalDocumentsApproved` is set in site-config after final sign-off.
export function LegalDocument({
  eyebrow,
  title,
  intro,
  sections
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: readonly LegalSection[];
}) {
  return (
    <main id="main-content" className="legal-document">
      <header className="legal-hero surface-ink">
        <div className="container legal-hero-inner">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="h1">{title}</h1>
          <p className="lead">{intro}</p>
        </div>
      </header>
      <div className="container legal-layout">
        <aside className="legal-aside">
          <div className={`legal-status ${legalDocumentsApproved ? "is-approved" : ""}`}>
            <FileText size={20} aria-hidden="true" />
            <div>
              <strong>Last updated {legalDocumentsUpdated}</strong>
              {legalDocumentsApproved ? null : <p>This version is awaiting final approval.</p>}
            </div>
          </div>
          <nav aria-label={`${title} sections`}>
            <p className="legal-aside-label">On this page</p>
            <ol>
              {sections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}
            </ol>
          </nav>
        </aside>
        <article className="legal-body">
          {sections.map((section, index) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
              <span className="legal-index tabular">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2 id={`${section.id}-title`}>{section.title}</h2>
                <p>{section.body}</p>
              </div>
            </section>
          ))}
        </article>
      </div>
    </main>
  );
}
