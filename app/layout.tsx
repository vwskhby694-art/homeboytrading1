import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import { ConsentProvider } from "@/components/site/consent-provider";
import { EnquiryProvider } from "@/components/site/enquiry-provider";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { siteConfig } from "./site-config";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/chrome.css";
import "./styles/components.css";
import "./styles/forms.css";
import "./styles/pages.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap"
});

const title = "NexaAI | AI-powered trading technology";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s | NexaAI"
  },
  description: siteConfig.description,
  // Absolute URLs are only produced when NEXT_PUBLIC_SITE_URL is configured.
  ...(siteConfig.url ? { metadataBase: new URL(siteConfig.url) } : {}),
  applicationName: "NexaAI",
  category: "financial technology",
  openGraph: {
    title,
    description: siteConfig.description,
    type: "website",
    locale: "en_US",
    siteName: "NexaAI",
    ...(siteConfig.url ? { images: [{ url: "/social-card.png", width: 1200, height: 630, alt: "NexaAI — AI-powered trading, built around your rules." }] } : {})
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.description,
    ...(siteConfig.url ? { images: ["/social-card.png"] } : {})
  },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  themeColor: "#06110c",
  colorScheme: "light"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body>
        <ConsentProvider>
          <EnquiryProvider>
            <a className="skip-link" href="#main-content">Skip to content</a>
            <SiteHeader />
            {children}
            <SiteFooter />
          </EnquiryProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
