import { NextResponse, type NextRequest } from "next/server";

// Countries whose visitors are not served. ISO 3166-1 alpha-2 codes.
const BLOCKED_COUNTRIES = new Set([
  // United Kingdom and the Crown Dependencies
  "GB", "JE", "GG", "IM",
  // British Overseas Territories (Akrotiri and Dhekelia have no separate country code)
  "AI", "BM", "IO", "VG", "KY", "FK", "GI", "MS", "PN", "SH", "GS", "TC",
  // United States and its territories
  "US", "PR", "GU", "VI", "AS", "MP", "UM"
]);

// Country headers set by common hosting platforms and CDNs. Detection only works when the
// production host provides one of these; without it, every visitor is allowed through.
const COUNTRY_HEADERS = ["x-vercel-ip-country", "cf-ipcountry", "cloudfront-viewer-country", "x-country-code"];

function visitorCountry(request: NextRequest) {
  for (const header of COUNTRY_HEADERS) {
    const value = request.headers.get(header);
    if (value) return value.trim().toUpperCase();
  }
  return null;
}

export function middleware(request: NextRequest) {
  const country = visitorCountry(request);
  if (!country || !BLOCKED_COUNTRIES.has(country)) return NextResponse.next();

  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json({ message: "This service is not available in your region." }, { status: 451 });
  }

  return NextResponse.rewrite(new URL("/unavailable", request.url));
}

export const config = {
  // Skip Next.js assets, icons and the unavailable page itself.
  matcher: ["/((?!_next/static|_next/image|icon.svg|apple-icon|social-card.png|robots.txt|sitemap.xml|unavailable).*)"]
};
