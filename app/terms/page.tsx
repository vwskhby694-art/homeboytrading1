import type { Metadata } from "next";
import { LegalDocument } from "@/components/site/legal-document";

export const metadata: Metadata = {
  title: "Terms of Website Use",
  description: "Terms governing the use of the NexaAI website, its market information, education and enquiry form."
};

const sections = [
  { id: "scope", title: "About this website", body: "This website provides information about NexaAI’s AI-powered automated trading service, educational material, third-party market displays, information about funding profiles, risk notices and an enquiry form. The website itself does not open brokerage accounts, accept deposits, hold client funds, connect broker credentials or execute trades. NexaAI’s trading service is provided separately to eligible clients after onboarding." },
  { id: "no-advice", title: "No investment advice or guarantee", body: "Website material is general information and education. It does not account for an individual visitor’s objectives, finances, knowledge, or jurisdiction and must not be treated as personal investment advice, a recommendation, or a guarantee." },
  { id: "funding-profiles", title: "Funding profiles and client agreements", body: "Core, Advanced, and Elite describe suggested starting balances, in US dollars, for a client’s own brokerage account. They are not NexaAI invoices, software prices or payment instructions, and they do not guarantee eligibility or any level of service. Clients who proceed after onboarding receive the applicable NexaAI client agreement and the broker’s own account terms, which govern the trading service." },
  { id: "market-information", title: "Market information", body: "TradingView and other third-party information may be delayed, incomplete, interrupted, or unavailable. Visitors should verify market information with an authorized provider and should not use website displays as an execution feed." },
  { id: "acceptable-use", title: "Acceptable use", body: "Do not misuse the website, attempt unauthorized access, submit malicious or unlawful material, interfere with availability, or send credentials, financial details, identity documents, or funds through public forms." },
  { id: "intellectual-property", title: "Intellectual property", body: "NexaAI branding and original website content are protected by applicable intellectual-property law. TradingView and other third-party names, widgets, and data remain subject to their respective owners’ rights and terms." },
  { id: "eligibility", title: "Eligibility and onboarding", body: "Access to NexaAI’s trading service depends on eligibility, including the client’s country of residence and the broker’s own checks. Submitting an enquiry does not create a client relationship, open an account, or oblige either party to proceed. Where a client proceeds, the agreements provided during onboarding apply." }
] as const;

export default function TermsPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Terms of website use"
      intro="These terms govern your use of the NexaAI website. NexaAI’s trading service is provided separately, under the agreements provided during onboarding."
      sections={sections}
    />
  );
}
