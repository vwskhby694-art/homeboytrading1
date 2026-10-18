import { Quote } from "lucide-react";
import { testimonials } from "@/app/content";

// Renders real client testimonials from content.ts. Nothing is shown until at least one is added.
export function Testimonials() {
  if (!testimonials.length) return null;

  return (
    <div className="testimonials">
      <h3 className="testimonials-title">What our clients say</h3>
      <ul className="testimonial-list">
        {testimonials.map((item) => (
          <li key={`${item.name}-${item.quote.slice(0, 24)}`}>
            <figure>
              <Quote size={22} aria-hidden="true" />
              <blockquote>{item.quote}</blockquote>
              <figcaption>
                <strong>{item.name}</strong>
                {item.location ? <span>{item.location}</span> : null}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
