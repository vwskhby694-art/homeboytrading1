import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, LockKeyhole } from "lucide-react";
import { BoundaryDiagram } from "@/components/site/boundary-diagram";
import { PageHero } from "@/components/site/page-hero";

export const metadata: Metadata = {
  title: "About Us",
  description: "About NexaAI: a financial-technology company providing AI-powered automated trading, with client funds held at independent brokers and personal, human-assisted onboarding."
};

const principles = [
  { title: "Clarity over spectacle", text: "We explain what the technology does, and what it cannot do, in plain language — without performance promises." },
  { title: "Separation by design", text: "Your decisions, the technology and your money sit in separate hands, so no single part can act beyond what you have agreed." },
  { title: "Risk before reach", text: "A wider feature set is not useful if limits, failure states and human oversight are unclear. Controls come first." },
  { title: "People behind the technology", text: "Every client is onboarded and supported by our team, so you always have someone to ask — not just a system." }
] as const;

export default function AboutPage() {
  return (
    <main id="main-content" className="about-page">
      <PageHero
        eyebrow="About NexaAI"
        title={<>Technology that respects <em>your decisions.</em></>}
        lead="NexaAI is a financial-technology company providing AI-powered automated trading for accounts that clients hold at independent brokers, supported by a team that guides every client personally."
      />

      <section className="section surface-ivory" aria-labelledby="what-title">
        <div className="container about-intro">
          <div className="section-header">
            <p className="eyebrow">What NexaAI is</p>
            <h2 className="h2" id="what-title">A disciplined layer between <em>your plan and the market.</em></h2>
          </div>
          <div className="about-intro-copy">
            <p className="lead">
              Many people find markets interesting but hard to approach consistently. NexaAI&apos;s technology follows the
              markets in your strategy, applies the risk settings agreed with you, and trades automatically — in an
              account that remains yours.
            </p>
            <p>
              Our AI trading system is operational today. Joining starts with a conversation: our team explains the service,
              answers your questions and guides eligible clients through onboarding. This website is where that begins. It is
              not a trading platform and does not accept deposits; trading takes place only in your own broker account, with
              your authorization.
            </p>
          </div>
        </div>
      </section>

      <section className="section surface-ivory" aria-labelledby="principles-title">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Principles</p>
            <h2 className="h2" id="principles-title">Four principles <em>guide the product.</em></h2>
          </div>
          <ol className="principles">
            {principles.map((item, index) => (
              <li key={item.title}>
                <span className="tabular">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="h3">{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section surface-sand" aria-labelledby="separation-title">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Separation by design</p>
            <h2 className="h2" id="separation-title">Your money stays <em>with your broker.</em></h2>
          </div>
          <BoundaryDiagram />
        </div>
      </section>

      <section className="section surface-ink" aria-labelledby="security-title">
        <div className="container about-security">
          <LockKeyhole size={30} aria-hidden="true" />
          <div>
            <h2 className="h2" id="security-title">Collect less. Ask for nothing sensitive.</h2>
            <p className="lead">
              Our enquiry form asks only for contact details and a few questions. It never asks for passwords, broker API
              keys, seed phrases, identity documents, card details or deposits.
            </p>
            <Link className="text-link" href="/privacy">Read our privacy notice <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="section surface-ivory" aria-labelledby="global-title">
        <div className="container-narrow about-global">
          <p className="eyebrow">Global access, local eligibility</p>
          <h2 className="h2" id="global-title">Focused on Europe. <em>Open to the world, where permitted.</em></h2>
          <p className="lead">
            NexaAI serves clients primarily in Europe and welcomes enquiries from other countries. Whether the service can be
            offered where you live depends on local rules and broker eligibility, and we confirm it before onboarding. Being
            able to view this website does not mean the service is available in your country.
          </p>
        </div>
      </section>
    </main>
  );
}
