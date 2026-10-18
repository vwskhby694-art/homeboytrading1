import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not available in your region",
  robots: { index: false, follow: false }
};

export default function UnavailablePage() {
  return (
    <main id="main-content" className="not-found-page surface-deep">
      <div className="container-narrow">
        <p className="eyebrow">Region unavailable</p>
        <h1 className="display">NexaAI is not available <em>in your region.</em></h1>
        <p className="lead">Our services are not offered to residents of the United Kingdom, including the Crown Dependencies and British Overseas Territories, or the United States and its territories.</p>
      </div>
    </main>
  );
}
