"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Globe2 } from "lucide-react";
import { company, footerGroups, siteConfig } from "@/app/site-config";
import { useConsent } from "./consent-provider";
import { WordmarkMark } from "./wordmark";

export function SiteFooter() {
  const { openPanel } = useConsent();
  const pathname = usePathname();

  return (
    <footer className="site-footer">
      {/* The homepage ends with the enquiry form, so a closing CTA would only repeat it. */}
      {pathname === "/" ? null : (
        <div className="footer-lead container">
          <div>
            <p className="eyebrow">Next step</p>
            <h2 className="h2">Ready to get started? Speak to our team.</h2>
          </div>
          <Link className="btn btn-primary on-ink btn-lg" href="/#enquiry">
            Speak to our team <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      )}

      <div className="footer-grid container">
        <div className="footer-brand">
          <Link className="wordmark wordmark-large" href="/" aria-label="NexaAI home">
            <WordmarkMark size={44} />
            <span>NexaAI</span>
          </Link>
          <p>{siteConfig.description}</p>
          <p className="footer-status">
            <Globe2 size={18} aria-hidden="true" />
            <span>Focused on Europe and open to international enquiries. Availability depends on your country of residence and broker eligibility.</span>
          </p>
        </div>

        {footerGroups.map((group) => (
          <nav key={group.title} className="footer-links" aria-label={`${group.title} links`}>
            <h3>{group.title}</h3>
            {group.links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
          </nav>
        ))}

        <div className="footer-links">
          <h3>Contact</h3>
          {company.contactEmail ? <a href={`mailto:${company.contactEmail}`}>{company.contactEmail}</a> : null}
          {company.contactPhone ? <a href={`tel:${company.contactPhone.replace(/s+/g, "")}`}>{company.contactPhone}</a> : null}
          <Link href="/#enquiry">Speak to our team</Link>
          <button type="button" onClick={openPanel}>Manage privacy choices</button>
        </div>
      </div>

      <div className="footer-risk container">
        <p>
          Trading in forex, gold, indices and cryptocurrency carries a high risk of loss and is not suitable for everyone.
          NexaAI does not accept deposits, hold client funds, or guarantee returns.{" "}
          <Link href="/risk-disclosure">Read the risk disclosure</Link>.
        </p>
      </div>

      <div className="footer-bottom container">
        <span>© {new Date().getFullYear()} NexaAI</span>
        <span>Market data on this site is provided by TradingView.</span>
      </div>
    </footer>
  );
}
