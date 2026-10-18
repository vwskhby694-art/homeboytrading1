import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ClipboardCheck, MonitorSmartphone } from "lucide-react";
import { confirmedBeforeStart, custodyRows, joinSteps, plannedProducts, tradingExplained } from "../content";
import { BoundaryDiagram } from "@/components/site/boundary-diagram";
import { PageHero } from "@/components/site/page-hero";

export const metadata: Metadata = {
  title: "How It Works",
  description: "How joining NexaAI works, from your enquiry to personal onboarding with our team, and how NexaAI's AI-powered automated trading works in your own broker account."
};

export default function HowItWorksPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="How it works"
        title={<>From your first enquiry <em>to automated trading.</em></>}
        lead="Joining NexaAI starts with a conversation. Our team guides you personally through onboarding, and NexaAI's AI trading system then trades in your own broker account, within the settings agreed with you."
      >
        <div className="button-row">
          <a className="btn btn-primary btn-lg" href="#joining">How joining works</a>
          <a className="btn btn-secondary btn-lg" href="#trading">How the trading works</a>
        </div>
      </PageHero>

      <section id="joining" className="section surface-sand" aria-labelledby="journey-title">
        <div className="container journey">
          <div className="section-header journey-header">
            <p className="eyebrow">Part one · Joining NexaAI</p>
            <h2 className="h2" id="journey-title">A personal, <em>guided process.</em></h2>
            <p className="lead">There is no checkout and no automatic sign-up. A member of our team takes you through each step.</p>
            <Link className="btn btn-primary" href="/#enquiry">Speak to our team <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
          <ol className="journey-steps">
            {joinSteps.map((step, index) => (
              <li key={step.title} className={`journey-step ${index === 0 ? "is-available" : ""}`}>
                <span className="journey-index tabular" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div className="journey-body">
                  <h3 className="h3">{step.title}</h3>
                  <p>{step.text}</p>
                  <p className="journey-detail">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="trading" className="section surface-ivory" aria-labelledby="trading-title">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Part two · How automated trading works</p>
            <h2 className="h2" id="trading-title">Your decisions. Your broker. <em>Technology in between.</em></h2>
            <p className="lead">
              Decisions, technology and money stay in separate hands. Your funds remain with the broker, in your name, and
              NexaAI&apos;s system trades only with your authorization.
            </p>
          </div>
          <ul className="explain-grid">
            {tradingExplained.map((item, index) => (
              <li key={item.title}>
                <span className="tabular">{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
          <BoundaryDiagram />
          <p className="explain-risk">
            Automated trading can lose money, and past performance does not guarantee future results.{" "}
            <Link href="/risk-disclosure">Read the risk disclosure</Link>.
          </p>
        </div>
      </section>

      <section className="section surface-sand" aria-labelledby="custody-title">
        <div className="container custody-grid">
          <div>
            <div className="section-header">
              <p className="eyebrow">Your money and your control</p>
              <h2 className="h2" id="custody-title">Who holds what.</h2>
            </div>
            <dl className="custody-table">
              {custodyRows.map((row) => (
                <div key={row.item}>
                  <dt>{row.item}</dt>
                  <dd>{row.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
          <aside className="open-questions" aria-labelledby="confirmed-title">
            <ClipboardCheck size={26} aria-hidden="true" />
            <h3 className="h3" id="confirmed-title">Confirmed with you during onboarding</h3>
            <p>Your representative gives you clear answers to the questions that matter before you start:</p>
            <ul>
              {confirmedBeforeStart.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <Link className="text-link" href="/faq">Read the FAQ <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </aside>
        </div>
      </section>

      <section className="section-tight surface-ink" aria-labelledby="coming-title">
        <div className="container coming-next">
          <div className="coming-next-intro">
            <MonitorSmartphone size={28} aria-hidden="true" />
            <h2 className="h3" id="coming-title">Coming next</h2>
            <p>
              We are building dedicated client platforms. They are not available yet; today, our team supports you directly
              and your account information is available from your broker.
            </p>
          </div>
          <ul className="coming-next-list">
            {plannedProducts.map((product) => (
              <li key={product.name}>
                <span className="badge badge-dev">Planned</span>
                <h3>{product.name}</h3>
                <p>{product.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
