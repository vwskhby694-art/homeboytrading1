import type { Metadata } from "next";
import { company } from "../site-config";
import { LegalDocument } from "@/components/site/legal-document";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How NexaAI handles the information you submit through its website enquiry form, your consent choices, and third-party market embeds."
};

const controller = `NexaAI is responsible for the personal information you submit through this website.${company.contactEmail ? ` Privacy requests can be sent to ${company.contactEmail}.` : ""}`;

const sections = [
  { id: "controller", title: "Who is responsible for your data", body: controller },
  { id: "enquiry-information", title: "Enquiry information", body: "The form collects first and last name, email, international phone number, country, preferred funding profile, optional message, and required privacy consent. It also records approved campaign parameters, landing path, referrer, consent wording version, and submission time." },
  { id: "not-requested", title: "Information not requested", body: "Do not provide passwords, broker credentials, API keys or secrets, seed phrases, payment-card information, bank details, identity documents, or trading deposits. The public website is not designed to process that information." },
  { id: "purpose", title: "How we use your information", body: "We use your enquiry information to understand your request. A member of our sales or customer-support team may contact you by phone or email, using the details you provide, to discuss the service and onboarding. We also keep a record of your privacy consent and of approved campaign attribution. No automated eligibility or credit decision is made from the form." },
  { id: "storage", title: "Storage providers", body: "Website enquiries are stored in Supabase PostgreSQL through a server-only application route. Browser clients cannot read or write the enquiry table directly." },
  { id: "tradingview", title: "TradingView", body: "TradingView widgets load only after permission for market embeds. TradingView may receive the embedding page URL, widget type, displayed symbol, IP address, and technical request data needed to deliver the widget. Review TradingView’s own privacy information for its processing." },
  { id: "local-storage", title: "Local preference storage", body: "The browser stores a necessary privacy-preference record in local storage. No analytics provider is currently connected. The preference can be changed through Cookie Settings or the footer privacy control." },
  { id: "retention", title: "Retention and your rights", body: "We keep enquiry information only for as long as it is needed for the purposes described here and to meet legal obligations. You can ask us to access, correct, or delete the information you submitted." }
] as const;

export default function PrivacyPage() {
  return (
    <LegalDocument
      eyebrow="Privacy"
      title="Privacy notice"
      intro="How NexaAI handles the information you submit through this website, your preference choices, and third-party market displays."
      sections={sections}
    />
  );
}
