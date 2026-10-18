"use client";

import { ArrowDownRight, Check, Landmark } from "lucide-react";
import { packages, planningConsiderations, type PackageId } from "@/app/content";
import { useEnquirySelection } from "./enquiry-provider";

// en-GB renders "US$250", which is unambiguous for European and international visitors.
const currency = new Intl.NumberFormat("en-GB", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const largest = Math.max(...packages.map((item) => item.amount));

export function PackageSelector() {
  const { selectedPackage, selectPackage } = useEnquirySelection();
  const selected = packages.find((item) => item.id === selectedPackage) ?? packages[1];

  function enquire(id: PackageId) {
    selectPackage(id);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("enquiry")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    document.getElementById("field-firstName")?.focus({ preventScroll: true });
  }

  return (
    <div className="profiles">
      <div className="profiles-main">
        <fieldset className="profile-picker">
          <legend>Choose a starting balance to discuss</legend>
          <div className="profile-options">
            {packages.map((item) => {
              const active = item.id === selectedPackage;
              return (
                <label key={item.id} className={`profile-option ${active ? "is-selected" : ""}`} htmlFor={`profile-${item.id}`}>
                  <input
                    id={`profile-${item.id}`}
                    type="radio"
                    name="funding-profile"
                    value={item.id}
                    checked={active}
                    onChange={() => selectPackage(item.id)}
                  />
                  <span className="profile-option-name">{item.name}</span>
                  <span className="profile-option-amount tabular">{currency.format(item.amount)}</span>
                  <span className="profile-scale" aria-hidden="true">
                    <i style={{ width: `${(item.amount / largest) * 100}%` }} />
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="profile-detail" aria-live="polite">
          <div className="profile-detail-head">
            <p className="profile-detail-status"><Check size={16} aria-hidden="true" /> Selected for your enquiry</p>
            <h3 className="h2">{selected.name}</h3>
            <p className="profile-detail-amount">
              <span className="tabular">{currency.format(selected.amount)}</span> suggested starting balance for your own broker account
            </p>
          </div>
          <p className="profile-detail-description">{selected.description}</p>
          <div className="profile-note">
            <strong>At this balance</strong>
            <p>{selected.balanceNote}</p>
          </div>
          <p className="profile-custody">
            <Landmark size={18} aria-hidden="true" />
            <span>Held in your own account at an independent partner broker. Not paid to NexaAI.</span>
          </p>
          <button className="btn btn-primary btn-lg" type="button" onClick={() => enquire(selected.id)}>
            Discuss this profile with our team <ArrowDownRight className="icon-down" size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <aside className="profiles-shared" aria-labelledby="profiles-shared-title">
        <h3 id="profiles-shared-title">The same service for every profile</h3>
        <p>
          No profile is safer, earns more, or receives different predictions or execution. Only the starting balance
          differs, which shapes the questions worth discussing.
        </p>
        <p className="profiles-shared-label">What we discuss with everyone</p>
        <ul className="check-list">
          {planningConsiderations.map((item) => <li key={item}><Check size={18} aria-hidden="true" />{item}</li>)}
        </ul>
        <p className="profiles-shared-note">
          These are discussion topics, not activated services, tested strategies or approved risk settings.
        </p>
      </aside>
    </div>
  );
}
