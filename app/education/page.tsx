import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { glossary, learningPaths, startHere } from "../content";
import { EducationExplorer } from "@/components/site/education-explorer";
import { PageHero } from "@/components/site/page-hero";

export const metadata: Metadata = {
  title: "Education",
  description: "A structured NexaAI learning library: 23 plain-language topics across beginner, intermediate and advanced paths, a recommended starting sequence and a glossary of trading terms."
};

const topicTitles = new Map(learningPaths.flatMap((path) => path.topics.map((topic) => [topic.id, topic.title] as const)));

export default function EducationPage() {
  return (
    <main id="main-content" className="education-page">
      <PageHero
        eyebrow="Learning library"
        title={<>Learn the markets <em>before you trade them.</em></>}
        lead="Twenty-three short, plain-language topics, from how markets work to the limits of automation. Start at the beginning or go straight to what you need."
      />

      <section className="section-tight surface-sand" aria-labelledby="start-title">
        <div className="container start-here">
          <div className="start-here-intro">
            <p className="eyebrow">Recommended</p>
            <h2 className="h2" id="start-title">New to trading? <em>Start here.</em></h2>
            <p className="muted">Five topics, in order, that cover the essentials.</p>
          </div>
          <ol className="start-here-list">
            {startHere.map((item, index) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>
                  <span className="tabular">{index + 1}</span>
                  <span><strong>{topicTitles.get(item.id)}</strong><em>{item.reason}</em></span>
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section surface-ivory" aria-labelledby="library-title">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">The library</p>
            <h2 className="h2" id="library-title">Three paths, at your own pace.</h2>
          </div>
          <div className="path-cards">
            {learningPaths.map((path) => (
              <a key={path.id} className="path-card" href={`#path-${path.id}`}>
                <span className="path-card-label">{path.label}</span>
                <strong>{path.title}</strong>
                <span>{path.description}</span>
                <em className="tabular">{path.topics.length} topics</em>
              </a>
            ))}
          </div>
          <EducationExplorer />
        </div>
      </section>

      <section className="section surface-sand" aria-labelledby="glossary-title">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Glossary</p>
            <h2 className="h2" id="glossary-title">Common terms, <em>explained simply.</em></h2>
          </div>
          <dl className="glossary">
            {glossary.map((item) => (
              <div key={item.term}>
                <dt>{item.term}</dt>
                <dd>{item.definition}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section-tight surface-ink" aria-labelledby="education-risk-title">
        <div className="container education-risk">
          <div>
            <h2 className="h3" id="education-risk-title">Education, not advice.</h2>
            <p>Knowledge improves your questions. It does not guarantee outcomes, and no lesson can account for your own finances, goals or tolerance for loss.</p>
          </div>
          <Link className="text-link" href="/risk-disclosure">Read the risk disclosure <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  );
}
