import { countries } from "@/app/countries";
import { packages, serviceOptions } from "@/app/content";

export const experienceOptions = ["New to trading", "Some experience", "Experienced", "Professional or institutional"] as const;
export const campaignKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export type ValidatedEnquiry = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  preferredPackage: string;
  preferredService: string;
  experience: string;
  message: string;
  privacyAccepted: true;
  landingPage: string;
  referrer: string;
  attribution: Record<string, string>;
};

export function validateEnquiry(input: unknown): { data?: ValidatedEnquiry; errors?: Record<string, string> } {
  if (!isRecord(input)) return { errors: { form: "Invalid request body." } };
  const errors: Record<string, string> = {};
  const fullName = text(input.fullName, 120);
  const email = text(input.email, 254).toLowerCase();
  const phone = text(input.phone, 32);
  const country = text(input.country, 80);
  const preferredPackage = text(input.preferredPackage, 24);
  const preferredService = text(input.preferredService, 32);
  const experience = text(input.experience, 64);
  const message = text(input.message, 1000);
  const website = text(input.website, 200);
  const landingPage = safeUrl(input.landingPage);
  const referrer = safeUrl(input.referrer);
  const startedAt = typeof input.startedAt === "number" ? input.startedAt : 0;

  if (website) errors.form = "Invalid submission.";
  if (Date.now() - startedAt < 1500 || Date.now() - startedAt > 1000 * 60 * 60 * 24) errors.form = "Please refresh and try again.";
  if (fullName.length < 2) errors.fullName = "Enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address.";
  if (!/^\+[1-9][\d\s().-]{6,24}$/.test(phone)) errors.phone = "Enter a valid international phone number.";
  if (!countries.includes(country as (typeof countries)[number])) errors.country = "Select a valid country.";
  if (!packages.some((item) => item.id === preferredPackage)) errors.preferredPackage = "Select a valid package.";
  // Preferred conversation is optional: the form no longer asks, but older form versions may still send it.
  if (preferredService && !serviceOptions.some((item) => item.value === preferredService)) errors.preferredService = "Select a valid service.";
  // Trading experience is optional: the sales team asks for it, but older form versions may still send it.
  if (experience && !experienceOptions.includes(experience as (typeof experienceOptions)[number])) errors.experience = "Select a valid experience level.";
  if (input.privacyAccepted !== true) errors.privacyAccepted = "Privacy consent is required.";
  if (/password|api\s?(key|secret)|seed phrase|card number|passport|bank account/i.test(message)) errors.message = "Remove credentials, financial details, or identity-document information.";

  const attribution: Record<string, string> = {};
  if (isRecord(input.attribution)) {
    for (const key of campaignKeys) {
      const value = text(input.attribution[key], 180);
      if (value) attribution[key] = value;
    }
  }

  if (Object.keys(errors).length) return { errors };
  return {
    data: {
      fullName,
      email,
      phone,
      country,
      preferredPackage,
      preferredService,
      experience,
      message,
      privacyAccepted: true,
      landingPage,
      referrer,
      attribution
    }
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, max) : "";
}

function safeUrl(value: unknown) {
  const candidate = text(value, 500);
  if (!candidate) return "";
  try {
    const url = new URL(candidate);
    return url.protocol === "https:" || url.protocol === "http:" ? `${url.origin}${url.pathname}` : "";
  } catch {
    return "";
  }
}
