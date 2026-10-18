import type { Metadata } from "next";
import { CookieSettingsControl } from "@/components/site/cookie-settings-control";
import { PageHero } from "@/components/site/page-hero";

export const metadata: Metadata = {
  title: "Cookie and Embed Settings",
  description: "Manage necessary local storage and optional TradingView market embeds on NexaAI."
};

export default function CookieSettingsPage() {
  return (
    <main id="main-content" className="cookie-page">
      <PageHero
        eyebrow="Privacy preferences"
        title="Your cookie and embed settings."
        lead="NexaAI uses necessary local storage to remember your choice, and optional TradingView widgets for market data. No analytics provider is active."
      />
      <section className="section surface-ivory">
        <div className="container-narrow">
          <p className="cookie-intro">
            Turning off market embeds removes TradingView charts and tickers. You can still read the rest of the website
            and send an enquiry.
          </p>
          <CookieSettingsControl />
        </div>
      </section>
    </main>
  );
}
