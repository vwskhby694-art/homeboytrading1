// Approved contact details. Nothing is shown while a value is null.
export const company = {
  contactEmail: null as string | null,
  contactPhone: null as string | null
};

// Set to true once the Terms, Privacy and Risk Disclosure wording has received final approval.
export const legalDocumentsApproved = false;
export const legalDocumentsUpdated = "16 October 2026";

// Production builds ignore a localhost URL so metadata never advertises it; set NEXT_PUBLIC_SITE_URL to the real domain.
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || null;
const isLocalUrl = configuredUrl ? /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(configuredUrl) : false;
const siteUrl = configuredUrl && !(isLocalUrl && process.env.NODE_ENV === "production") ? configuredUrl : null;

export const siteConfig = {
  name: "NexaAI",
  description:
    "NexaAI provides AI-powered trading technology for forex, gold, indices and crypto. It trades within the risk settings agreed with you, in your own account at an independent broker.",
  tagline: "AI-powered trading, built around your rules.",
  // Only set from the environment. Without it, metadata and the sitemap omit absolute URLs rather than leak localhost.
  url: siteUrl,
  locale: "en",
  navigation: [
    { label: "How it works", href: "/how-it-works" },
    { label: "Markets", href: "/markets" },
    { label: "Funding", href: "/#packages" },
    { label: "Education", href: "/education" },
    { label: "About", href: "/about-us" }
  ],
  marketSymbols: [
    { id: "FX:EURUSD", label: "EUR / USD", short: "EUR/USD", group: "Forex" },
    { id: "FX:GBPUSD", label: "GBP / USD", short: "GBP/USD", group: "Forex" },
    { id: "OANDA:XAUUSD", label: "Gold / USD", short: "Gold", group: "Gold" },
    { id: "FOREXCOM:SPXUSD", label: "S&P 500", short: "S&P 500", group: "Indices" },
    { id: "FOREXCOM:NSXUSD", label: "NASDAQ 100", short: "NASDAQ 100", group: "Indices" },
    { id: "BITSTAMP:BTCUSD", label: "Bitcoin / USD", short: "Bitcoin", group: "Crypto" },
    { id: "BITSTAMP:ETHUSD", label: "Ether / USD", short: "Ether", group: "Crypto" }
  ]
} as const;

export const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Markets", href: "/markets" },
      { label: "Funding profiles", href: "/#packages" },
      { label: "Education", href: "/education" },
      { label: "FAQ", href: "/faq" },
      { label: "About NexaAI", href: "/about-us" }
    ]
  },
  {
    title: "Legal",
    links: [
      { label: "Risk disclosure", href: "/risk-disclosure" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookie settings", href: "/cookie-settings" }
    ]
  }
] as const;
