import type { Metadata } from "next";
import { faqGroups } from "../content";
import { FaqList } from "@/components/site/faq-list";
import { PageHero } from "@/components/site/page-hero";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Clear answers about NexaAI: the AI trading service, how to become a client, where trading funds are held, the funding profiles, availability, risk and charges."
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqGroups.flatMap((group) => group.items).map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer }
  }))
};

export default function FaqPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="FAQ"
        title={<>Straight answers <em>to fair questions.</em></>}
        lead="What NexaAI does, where your money is held, how the funding profiles work and the risks involved. Answers marked “Confirmed individually” depend on your country or are agreed with you directly."
      />

      <section className="section surface-ivory">
        <div className="container faq-page">
          <nav className="faq-nav" aria-label="FAQ topics">
            <p className="faq-nav-label">Topics</p>
            <ul>
              {faqGroups.map((group) => <li key={group.id}><a href={`#${group.id}`}>{group.title}</a></li>)}
            </ul>
          </nav>
          <div className="faq-groups">
            {faqGroups.map((group) => (
              <section key={group.id} id={group.id} className="faq-group" aria-labelledby={`${group.id}-title`}>
                <h2 className="h3" id={`${group.id}-title`}>{group.title}</h2>
                <FaqList items={group.items} />
              </section>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </main>
  );
}
