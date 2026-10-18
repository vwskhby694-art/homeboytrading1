import type { Metadata } from "next";
import { LegalDocument } from "@/components/site/legal-document";

export const metadata: Metadata = {
  title: "Risk Disclosure",
  description: "The main risks of trading and of NexaAI's automated trading service: capital loss, leverage, volatility, automation, AI limitations and third-party dependencies."
};

const sections = [
  { id: "about", title: "About this disclosure", body: "This page summarizes the main risks of trading and of NexaAI’s automated trading service. It does not describe every risk. Please read it, together with your broker’s own risk disclosures, before you begin." },
  { id: "capital-loss", title: "Capital loss", body: "Trading can result in the loss of some or all capital committed to a brokerage account. No strategy, package, model, indicator, or automated process can guarantee a profit, prevent a loss, or preserve capital." },
  { id: "leverage", title: "Leverage and margin", body: "Leveraged instruments magnify price movements. Losses can develop quickly, margin requirements can change, and a broker may close positions when available margin is insufficient. A deposit or margin amount is not necessarily the maximum possible loss." },
  { id: "volatility", title: "Volatility and liquidity", body: "Prices can move sharply because of economic releases, geopolitical events, market gaps, thin liquidity, or changing expectations. Requested prices may be unavailable and orders may fill at materially different prices." },
  { id: "automation", title: "Automation risk", body: "Automated systems can behave unexpectedly because of configuration errors, stale or incomplete data, connectivity failure, latency, rejected orders, partial fills, broker outages, or mismatched system state. Automation requires monitoring and tested intervention procedures." },
  { id: "ai-limitations", title: "AI limitations", body: "AI-assisted outputs are probabilistic and can be wrong, incomplete, biased, outdated, or unsuitable for a new market regime. Apparent confidence or precision does not establish accuracy and must not be treated as a guarantee." },
  { id: "backtests", title: "Backtests and demonstrations", body: "Historical, hypothetical, simulated, or back-tested information has important limitations. It may omit costs, slippage, liquidity constraints, failures, or decisions that would have occurred in live conditions. Past performance does not predict future results." },
  { id: "third-parties", title: "Third-party services", body: "Charts, market data, brokers, hosting providers, and connectivity services are controlled by third parties. Their availability, accuracy, delay, execution behavior, and terms can change independently of NexaAI." },
  { id: "custody", title: "Your brokerage account", body: "Your trading funds are held in your own account at an independent broker, not by NexaAI, and NexaAI does not accept deposits through this website. Holding funds with a broker does not remove broker, custody, counterparty, operational, or insolvency risk." },
  { id: "eligibility", title: "Eligibility and independent review", body: "Website access does not establish that any service is legal or suitable in a visitor’s jurisdiction. Prospective users should assess their objectives, financial position, knowledge, and capacity for loss and obtain independent professional advice where appropriate." }
] as const;

export default function RiskDisclosurePage() {
  return (
    <LegalDocument
      title="Risk disclosure"
      eyebrow="Risk information"
      intro="Trading technology can improve process consistency. It cannot remove uncertainty, operational failure, or capital loss."
      sections={sections}
    />
  );
}
