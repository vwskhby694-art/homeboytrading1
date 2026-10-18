import { ImageResponse } from "next/og";

export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

// Social sharing card (temporary typographic branding). Referenced from metadata only when
// NEXT_PUBLIC_SITE_URL is configured, so shared links never point at localhost.
export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 80px", background: "#06110c", color: "#f4f2ec" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 34 34">
            <rect x="0.5" y="0.5" width="33" height="33" rx="9" fill="#13281e" stroke="#3a4f43" />
            <path d="M11 24V10M23 24V10" stroke="#f4f2ec" strokeWidth="3" strokeLinecap="round" />
            <path d="M11 10l12 14" stroke="#d4ff70" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>NexaAI</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 76, lineHeight: 1.05, letterSpacing: -2, maxWidth: 940 }}>AI-powered trading, built around your rules.</div>
          <div style={{ display: "flex", height: 4, width: 220, background: "#d4ff70", borderRadius: 4 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#a3aea4" }}>
          <span>Forex · Gold · Indices · Crypto</span>
          <span>Trading involves risk of loss</span>
        </div>
      </div>
    ),
    size
  );
}
