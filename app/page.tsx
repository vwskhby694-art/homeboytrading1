import Link from "next/link";
import { ArrowRight, ArrowUpRight, CircleAlert } from "lucide-react";
import { faqGroups, marketCategories, performanceNote, performanceStats } from "./content";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { FaqList } from "@/components/site/faq-list";
import { JoinSteps } from "@/components/site/join-steps";
import { HomeMarketOverview, MarketTicker } from "@/components/site/market-widgets";
import { PackageSelector } from "@/components/site/package-selector";
import { ProductConcept } from "@/components/site/product-concept";
import { Reveal } from "@/components/site/reveal";
import { StatusPanel } from "@/components/site/status-panel";
import { TechnologyTabs } from "@/components/site/technology-tabs";
import { Testimonials } from "@/components/site/testimonials";

const homeFaqQuestions = [
  "Is the AI trading bot operational?",
  "How do I become a client?",
  "What happens after I submit my enquiry?",
  "Where would my trading funds be held?",
  "Are profits guaranteed?"
];
const homeFaqs = faqGroups.flatMap((group) => group.items).filter((item) => homeFaqQuestions.includes(item.question));

export default function HomePage() {
  return (
    <main id="main-content">
      <div className="ticker-band"><MarketTicker /></div>

      <section className="hero surface-deep" aria-labelledby="hero-title">
        <div className="hero-backdrop" aria-hidden="true">
          <svg viewBox="0 0 1440 640" preserveAspectRatio="none">
            <path className="hero-trace" d="M0 470 C 120 455, 180 500, 270 470 S 420 380, 520 410 S 660 470, 760 390 S 900 300, 1010 330 S 1150 250, 1250 270 S 1380 200, 1440 210" />
            <path className="hero-trace hero-trace-faint" d="M0 540 C 160 520, 240 560, 360 530 S 560 470, 700 500 S 900 430, 1040 450 S 1260 380, 1440 400" />
          </svg>
        </div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Forex · Gold · Indices · Crypto</p>
            <h1 className="display" id="hero-title">Let AI trade the markets <em>for you.</em></h1>
            <p className="lead hero-lead">
              NexaAI&apos;s AI trading system analyzes forex, gold, indices and crypto and places trades automatically in your
              own broker account. Share your details and our team will guide you personally.
            </p>
            <dl className="hero-stats">
              {performanceStats.slice(0, 3).map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd className="tabular">{stat.value}</dd>
                </div>
              ))}
            </dl>
            <div className="button-row hero-actions">
              <Link className="btn btn-primary btn-lg" href="#enquiry">Speak to our team <ArrowRight size={18} aria-hidden="true" /></Link>
              <Link className="btn btn-secondary btn-lg" href="/how-it-works">See how it works</Link>
            </div>
            <p className="hero-risk">
              <CircleAlert size={16} aria-hidden="true" />
              <span>Trading involves risk of loss, and past performance does not guarantee future results.</span>
            </p>
          </div>
          <div className="hero-visual">
            <ProductConcept />
          </div>
        </div>
      </section>

      <section className="status-section surface-ink" aria-labelledby="safety-title">
        <div className="container">
          <p className="safety-statement" id="safety-title">
            Your money never leaves your own account. <em>You can see every trade.</em>
          </p>
          <StatusPanel />
        </div>
      </section>

      <section className="section surface-deep results-section" aria-labelledby="results-title">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Results</p>
            <h2 className="h2" id="results-title">The numbers behind <em>the system.</em></h2>
          </div>
          <dl className="results-stats">
            {performanceStats.map((stat) => (
              <div key={stat.label}>
                <dd className="tabular">{stat.value}</dd>
                <dt>{stat.label}</dt>
              </div>
            ))}
          </dl>
          <p className="results-note">{performanceNote}</p>
          <Testimonials />
        </div>
      </section>

      <section className="section surface-ivory" aria-labelledby="model-title">
        <div className="container">
          <div className="section-header-split">
            <div className="section-header">
              <p className="eyebrow">How joining works</p>
              <h2 className="h2" id="model-title">It starts with a conversation, <em>not a checkout.</em></h2>
              <p className="lead">
                Share your details and a member of the NexaAI team personally explains the service, answers your questions and
                guides you through onboarding if you decide to go ahead.
              </p>
            </div>
            <Link className="text-link" href="/how-it-works">How joining and trading work <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
          <Reveal><JoinSteps /></Reveal>
        </div>
      </section>

      <section id="technology" className="section surface-ink" aria-labelledby="technology-title">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Inside the technology</p>
            <h2 className="h2" id="technology-title">Sophisticated technology, <em>clearly explained.</em></h2>
          </div>
          <TechnologyTabs />
        </div>
      </section>

      <section className="section surface-ivory" aria-labelledby="markets-title">
        <div className="container markets-home">
          <div className="markets-home-copy">
            <div className="section-header">
              <p className="eyebrow">Four markets</p>
              <h2 className="h2" id="markets-title">Four global markets, <em>one disciplined approach.</em></h2>
            </div>
            <ul className="market-list">
              {marketCategories.map((market) => (
                <li key={market.id}>
                  <Link href={`/markets?symbol=${encodeURIComponent(market.symbol)}`}>
                    <span className="market-list-name">{market.title}</span>
                    <span className="market-list-text">{market.description}</span>
                    <span className="market-list-meta">{market.hours}</span>
                    <ArrowUpRight className="market-list-arrow" size={20} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="markets-home-widget">
            <HomeMarketOverview />
            <p className="widget-note">Live market view by TradingView. Prices may be delayed and are not NexaAI signals.</p>
          </div>
        </div>
      </section>

      <section id="packages" className="section surface-ink funding-section" aria-labelledby="funding-title">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Funding profiles</p>
            <h2 className="h2" id="funding-title">Three starting balances. <em>One service.</em></h2>
            <p className="lead">
              Core, Advanced and Elite are suggested starting balances, in US dollars, for your own broker account. They are
              not prices, subscriptions or deposits paid to NexaAI. Your choice helps your representative understand what you
              would like to discuss.
            </p>
          </div>
          <PackageSelector />
          <ul className="funding-disclosures" aria-label="Important information about funding profiles">
            <li>Starting balances are guidance only and depend on broker requirements and an eligibility review.</li>
            <li>Your funds stay in your own account with an independent broker. NexaAI does not collect deposits through this website.</li>
            <li>All trading carries a risk of loss, including with automation. Past results do not guarantee future performance.</li>
          </ul>
        </div>
      </section>

      <section className="section surface-ivory" aria-labelledby="faq-title">
        <div className="container faq-home">
          <div className="section-header">
            <p className="eyebrow">Questions</p>
            <h2 className="h2" id="faq-title">Straight answers <em>to fair questions.</em></h2>
            <p className="lead">About the service, your money and the risks involved.</p>
            <Link className="text-link" href="/faq">Read every question <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
          <FaqList items={homeFaqs} />
        </div>
      </section>

      <section id="enquiry" className="section surface-sand enquiry-section" aria-label="Enquiry">
        <div className="container"><EnquiryForm /></div>
      </section>
    </main>
  );
}
