import type { MetadataRoute } from "next";
import { siteConfig } from "./site-config";

const routes = ["", "/how-it-works", "/markets", "/education", "/faq", "/about-us", "/risk-disclosure", "/privacy", "/terms", "/cookie-settings"];

export default function sitemap(): MetadataRoute.Sitemap {
  // A sitemap needs absolute URLs; without a configured production URL it stays empty rather than list localhost.
  if (!siteConfig.url) return [];
  return routes.map((path) => ({ url: `${siteConfig.url}${path}`, lastModified: new Date("2026-10-16") }));
}
