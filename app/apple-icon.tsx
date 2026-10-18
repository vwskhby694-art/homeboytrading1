import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Temporary typographic icon until official NexaAI brand assets are supplied.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#13281e" }}>
        <svg width="120" height="120" viewBox="0 0 34 34">
          <path d="M11 24V10M23 24V10" stroke="#f4f2ec" strokeWidth="3" strokeLinecap="round" />
          <path d="M11 10l12 14" stroke="#d4ff70" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
    ),
    size
  );
}
