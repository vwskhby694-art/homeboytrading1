"use client";

import { ArrowRight, Check, CheckCircle2, LoaderCircle, LockKeyhole, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { countries, europeanCountries, otherCountries } from "@/app/countries";
import { packages, type PackageId } from "@/app/content";
import { useEnquirySelection } from "./enquiry-provider";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  preferredPackage: PackageId;
  message: string;
  privacyAccepted: boolean;
  website: string;
};

const currency = new Intl.NumberFormat("en-GB", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const hints: Partial<Record<keyof FormState, string>> = {
  phone: "Include your country code, for example +49, +33 or +39.",
  message: "Please do not include passwords, account details or identity documents."
};

export function EnquiryForm() {
  const { selectedPackage, selectPackage } = useEnquirySelection();
  const [startedAt] = useState(() => Date.now());
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    preferredPackage: selectedPackage,
    message: "",
    privacyAccepted: false,
    website: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState("");
  const successHeadingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => setForm((current) => ({ ...current, preferredPackage: selectedPackage })), [selectedPackage]);
  useEffect(() => {
    if (status === "success") successHeadingRef.current?.focus();
  }, [status]);

  const selected = useMemo(
    () => packages.find((item) => item.id === form.preferredPackage) ?? packages[1],
    [form.preferredPackage]
  );

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function describedBy(key: keyof FormState) {
    const ids = [hints[key] ? `hint-${key}` : null, errors[key] ? `error-${key}` : null].filter(Boolean);
    return ids.length ? ids.join(" ") : undefined;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setStatus("error");
      setMessage("Please check the highlighted fields.");
      document.getElementById(`field-${Object.keys(nextErrors)[0]}`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const attribution = Object.fromEntries(
        ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]
          .map((key) => [key, new URLSearchParams(window.location.search).get(key)])
          .filter((entry): entry is [string, string] => Boolean(entry[1]))
      );
      // The API stores a single full name, so the two name fields are combined here.
      const { firstName, lastName, ...details } = form;
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...details,
          fullName: `${firstName.trim()} ${lastName.trim()}`,
          startedAt,
          landingPage: `${window.location.origin}${window.location.pathname}`,
          referrer: document.referrer,
          attribution
        })
      });
      const result = await response.json() as { id?: string; message?: string };

      if (!response.ok || !result.id) throw new Error(result.message ?? "The enquiry service did not confirm delivery.");
      completeSubmission(result.id);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "The enquiry service is temporarily unavailable. No delivery was confirmed.");
    }
  }

  function completeSubmission(id: string) {
    setStatus("success");
    setReference(id);
    setMessage(`Your enquiry has been received. Reference ${id}.`);
    setErrors({});
    setForm((current) => ({
      ...current,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
      message: "",
      privacyAccepted: false,
      website: ""
    }));
  }

  function startAgain() {
    setStatus("idle");
    setMessage("");
    setReference("");
    window.setTimeout(() => document.getElementById("field-firstName")?.focus(), 0);
  }

  return (
    <div className="enquiry-layout">
      <aside className="enquiry-aside surface-ink">
        <p className="eyebrow">Get started</p>
        <h2 className="h2">Speak to our team.</h2>
        <p className="enquiry-aside-copy">
          Share a few details and a NexaAI representative can get in touch to explain the service, answer your questions
          and talk you through the next steps. There is no obligation.
        </p>

        <div className="enquiry-profile" aria-live="polite">
          <span>Funding profile you would like to discuss</span>
          <div>
            <strong>{selected.name}</strong>
            <b className="tabular">{currency.format(selected.amount)}</b>
          </div>
          <p>Suggested starting balance for your own broker account, in US dollars. Not a fee or deposit paid to NexaAI.</p>
        </div>

        <div className="enquiry-steps">
          <p className="enquiry-steps-title">What happens next</p>
          <ol>
            <li><b className="tabular">1</b><span>You submit your details.</span></li>
            <li><b className="tabular">2</b><span>Our team reviews your enquiry.</span></li>
            <li><b className="tabular">3</b><span>A sales or support representative contacts you by phone or email.</span></li>
            <li><b className="tabular">4</b><span>We explain the service and discuss the onboarding steps that apply to you.</span></li>
          </ol>
        </div>

        <p className="enquiry-privacy">
          <LockKeyhole size={18} aria-hidden="true" />
          <span>Submitting this form does not open a trading account or start any trading. We will never ask for passwords, broker logins, card details or deposits through it.</span>
        </p>
      </aside>

      <div className="enquiry-panel">
        {status === "success" ? (
          <div className="enquiry-success" role="status">
            <span className="enquiry-success-icon"><CheckCircle2 size={34} aria-hidden="true" /></span>
            <h3 className="h2" tabIndex={-1} ref={successHeadingRef}>Thank you. We have received your details.</h3>
            <p>
              Your reference is <strong className="enquiry-reference">{reference}</strong>. A member of the NexaAI team may
              contact you by phone or email using the details you provided. Please keep your reference for any follow-up.
            </p>
            <ul className="check-list">
              <li><Check size={18} aria-hidden="true" />Our team reviews your enquiry.</li>
              <li><Check size={18} aria-hidden="true" />A representative may contact you to explain the service and onboarding.</li>
              <li><Check size={18} aria-hidden="true" />No trading account has been opened and no trading has started.</li>
              <li><Check size={18} aria-hidden="true" />We will never ask for passwords or deposits through this website.</li>
            </ul>
            <button className="btn btn-secondary" type="button" onClick={startAgain}>Send another enquiry</button>
          </div>
        ) : (
          <form className="enquiry-form" onSubmit={submit} noValidate>
            <input className="honeypot" tabIndex={-1} autoComplete="off" name="website" value={form.website} onChange={(event) => update("website", event.target.value)} aria-hidden="true" />
            <div className="enquiry-form-heading">
              <h3>Your details</h3>
              <p className="required-note">Fields marked <span aria-hidden="true">*</span><span className="sr-only">with an asterisk</span> are required</p>
            </div>

            <fieldset className="form-section">
              <legend>About you</legend>
              <div className="form-grid">
                <FormField id="firstName" label="First name" error={errors.firstName}>
                  <input id="field-firstName" name="firstName" autoComplete="given-name" required value={form.firstName} onChange={(event) => update("firstName", event.target.value)} aria-invalid={Boolean(errors.firstName)} aria-describedby={describedBy("firstName")} />
                </FormField>
                <FormField id="lastName" label="Last name" error={errors.lastName}>
                  <input id="field-lastName" name="lastName" autoComplete="family-name" required value={form.lastName} onChange={(event) => update("lastName", event.target.value)} aria-invalid={Boolean(errors.lastName)} aria-describedby={describedBy("lastName")} />
                </FormField>
                <FormField id="email" label="Email address" error={errors.email} full>
                  <input id="field-email" name="email" type="email" autoComplete="email" inputMode="email" required value={form.email} onChange={(event) => update("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={describedBy("email")} />
                </FormField>
                <FormField id="country" label="Country" error={errors.country}>
                  <select id="field-country" name="country" autoComplete="country-name" required value={form.country} onChange={(event) => update("country", event.target.value)} aria-invalid={Boolean(errors.country)} aria-describedby={describedBy("country")}>
                    <option value="">Select your country</option>
                    <optgroup label="Europe">
                      {europeanCountries.map((country) => <option key={country}>{country}</option>)}
                    </optgroup>
                    <optgroup label="Rest of the world">
                      {otherCountries.map((country) => <option key={country}>{country}</option>)}
                    </optgroup>
                  </select>
                  {form.country ? (
                    <p className="field-hint" id="hint-country-availability" aria-live="polite">
                      We will confirm whether NexaAI is available in {form.country} before onboarding.
                    </p>
                  ) : null}
                </FormField>
                <FormField id="phone" label="Phone number" error={errors.phone} hint={hints.phone} hintBelow>
                  <input id="field-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+49 30 1234 5678" required value={form.phone} onChange={(event) => update("phone", event.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={describedBy("phone")} />
                </FormField>
              </div>
            </fieldset>

            <fieldset className="form-section">
              <legend>Your interest</legend>
              <div className="form-grid">
                <FormField id="preferredPackage" label="Funding profile" error={errors.preferredPackage} full>
                  <select id="field-preferredPackage" name="preferredPackage" required value={form.preferredPackage} onChange={(event) => { const value = event.target.value as PackageId; update("preferredPackage", value); selectPackage(value); }}>
                    {packages.map((item) => <option key={item.id} value={item.id}>{item.name} · {currency.format(item.amount)}</option>)}
                  </select>
                </FormField>
              </div>
            </fieldset>

            <fieldset className="form-section">
              <legend>Anything else?</legend>
              <FormField id="message" label="Your message" error={errors.message} hint={hints.message} optional full>
                <textarea id="field-message" name="message" rows={4} value={form.message} onChange={(event) => update("message", event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={describedBy("message")} />
              </FormField>
            </fieldset>

            <label className={`consent-check ${errors.privacyAccepted ? "has-error" : ""}`}>
              <input id="field-privacyAccepted" type="checkbox" required checked={form.privacyAccepted} onChange={(event) => update("privacyAccepted", event.target.checked)} aria-invalid={Boolean(errors.privacyAccepted)} aria-describedby={errors.privacyAccepted ? "error-privacyAccepted" : undefined} />
              <span>I have read the <a href="/privacy" target="_blank">privacy notice</a> and understand this is an enquiry — not account opening, a deposit, investment advice or live trading.</span>
            </label>
            {errors.privacyAccepted ? <p className="field-error" id="error-privacyAccepted">{errors.privacyAccepted}</p> : null}

            <div className="form-submit-row">
              <button className="btn btn-primary btn-lg" type="submit" disabled={status === "submitting"}>
                {status === "submitting" ? <LoaderCircle className="spin" size={18} aria-hidden="true" /> : null}
                {status === "submitting" ? "Sending…" : "Send my details"}
                {status === "submitting" ? null : <ArrowRight size={18} aria-hidden="true" />}
              </button>
              <p className={`form-status is-${status}`} role="status" aria-live="polite">
                {message || <><ShieldCheck size={16} aria-hidden="true" /> Your details are used only to respond to your enquiry.</>}
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function FormField({ id, label, error, hint, hintBelow, optional, full, children }: { id: string; label: string; error?: string; hint?: string; hintBelow?: boolean; optional?: boolean; full?: boolean; children: ReactNode }) {
  const hintText = hint ? <p className="field-hint" id={`hint-${id}`}>{hint}</p> : null;
  return (
    <div className={`form-field ${full ? "is-full" : ""} ${error ? "has-error" : ""}`}>
      <label className="field-label" htmlFor={`field-${id}`}>
        <span>{label}{optional ? null : <i aria-hidden="true">*</i>}</span>
        {optional ? <small>Optional</small> : <span className="sr-only">Required</span>}
      </label>
      {hintBelow ? null : hintText}
      {children}
      {hintBelow ? hintText : null}
      {error ? <span className="field-error" id={`error-${id}`} role="alert">{error}</span> : null}
    </div>
  );
}

function validate(form: FormState) {
  const errors: Record<string, string> = {};
  if (form.website.trim()) errors.website = "Invalid submission.";
  if (!form.firstName.trim() || form.firstName.trim().length > 59) errors.firstName = "Enter your first name.";
  if (!form.lastName.trim() || form.lastName.trim().length > 59) errors.lastName = "Enter your last name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) || form.email.length > 254) errors.email = "Enter a valid email address.";
  if (!countries.includes(form.country as (typeof countries)[number])) errors.country = "Select your country.";
  if (!/^\+[1-9][\d\s().-]{6,24}$/.test(form.phone)) errors.phone = "Include a valid international calling code, for example +49.";
  if (!packages.some((item) => item.id === form.preferredPackage)) errors.preferredPackage = "Select a funding profile.";
  if (form.message.length > 1000) errors.message = "Keep the message below 1,000 characters.";
  if (/password|api\s?(key|secret)|seed phrase|card number|passport|bank account/i.test(form.message)) errors.message = "Do not include credentials, financial details, or identity documents.";
  if (!form.privacyAccepted) errors.privacyAccepted = "Please confirm you have read the privacy notice.";
  return errors;
}
