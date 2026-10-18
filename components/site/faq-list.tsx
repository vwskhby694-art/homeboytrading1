import { ChevronDown } from "lucide-react";
import type { Faq } from "@/app/content";

export function FaqList({ items }: { items: readonly Faq[] }) {
  return (
    <div className="faq-list">
      {items.map((item) => (
        <details className="faq-item" key={item.question}>
          <summary>
            <span className="faq-question">{item.question}</span>
            <ChevronDown className="faq-chevron" size={22} aria-hidden="true" />
          </summary>
          <div className="faq-answer">
            <p>{item.answer}</p>
            {item.pending ? <span className="badge badge-tbc">Confirmed individually</span> : null}
          </div>
        </details>
      ))}
    </div>
  );
}
