import type { Metadata } from "next";
import { BookOpen, CircleAlert } from "lucide-react";
import Link from "next/link";
import { chartTips, marketCategories } from "../content";
import { MarketTicker, MarketsWorkspace } from "@/components/site/market-widgets";
import { PageHero } from "@/components/site/page-hero";

export const metadata: Metadata = {
  title: "Markets",
  description: "Explore forex, gold, stock indices and cryptocurrency through live TradingView charts, with plain-language guides to what moves each market."
};

export default function MarketsPage() {
  return (
    <main id="main-content" className="markets-page">
      <div className="ticker-band"><MarketTicker /></div>

      <PageHero
        eyebrow="Market research"
        title={<>Explore the markets, <em>in plain language.</em></>}
        lead="Live charts from TradingView, with short guides to what each market is and what tends to move it. These views are for research and learning. They are not NexaAI signals or recommendations."
      />

      <section className="section-tight surface-deep workspace-section" aria-label="Market research workspace">
        <div className="container"><MarketsWorkspace /></div>
      </section>

      <section className="section surface-ivory" aria-labelledby="chart-help-title">
        <div className="container chart-help">
          <div className="section-header">
            <p className="eyebrow">Reading the chart</p>
            <h2 className="h2" id="chart-help-title">New to charts? <em>Start here.</em></h2>
          </div>
          <ol className="chart-tips">
            {chartTips.map((tip, index) => (
              <li key={tip}><span className="tabular">{String(index + 1).padStart(2, "0")}</span><p>{tip}</p></li>
            ))}
          </ol>
          <Link className="text-link" href="/education"><BookOpen size={18} aria-hidden="true" /> Learn more in the education library</Link>
        </div>
      </section>

      <section className="section surface-sand" aria-labelledby="market-types-title">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Four markets</p>
            <h2 className="h2" id="market-types-title">How the four markets differ.</h2>
          </div>
          <div className="market-types">
            {marketCategories.map((market) => (
              <article key={market.id} className="market-type">
                <h3 className="h3">{market.title}</h3>
                <p>{market.description}</p>
                <dl>
                  <div><dt>Often moved by</dt><dd>{market.movers.join(" · ")}</dd></div>
                  <div><dt>When it trades</dt><dd>{market.hours}</dd></div>
                  <div><dt>Examples</dt><dd>{market.examples.join(", ")}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="market-disclosure surface-ink">
        <div className="container market-disclosure-inner">
          <CircleAlert size={24} aria-hidden="true" />
          <div>
            <h2 className="h3">Read market data with care.</h2>
            <p>Availability, venue and delay vary by instrument. Stock and index data may be delayed; forex and cryptocurrency feeds may be real-time depending on TradingView’s source. Confirm prices with your authorized provider before making any decision.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
