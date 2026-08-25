import { ImageResponse } from "next/og";

// Static export (output: "export") pre-renders metadata images at build time,
// so no edge runtime declaration is needed.
export const dynamic = "force-static";
export const alt =
  "BetterMaddela - verified civic information about Maddela, Quirino";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// "Golden Hour" identity world - see src/app/icon.svg direction contract.
// Harvest gold and dawn light from the identity brief's verified anchors.
const PAPER = "#fffcf4";
const INK = "#221d14";
const AMBER = "#b97e14";
const GOLD = "#f5b301";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: PAPER,
          position: "relative",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginBottom: 30,
          }}
        >
          <svg width="46" height="46" viewBox="0 0 64 64" style={{ display: "flex" }}>
            <circle cx="32" cy="32" r="29.5" fill="none" stroke={INK} strokeWidth="4.5" />
            <path
              d="M17 44 L17 21 L25 21 L32 31 L39 21 L47 21 L47 44 L40 44 L40 32.5 L34.5 40 L29.5 40 L24 32.5 L24 44 Z"
              fill={GOLD}
              stroke={INK}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </svg>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: 6,
              color: AMBER,
              textTransform: "uppercase",
            }}
          >
            Maddela, Quirino
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 104,
            fontWeight: 700,
            color: INK,
            marginBottom: 24,
          }}
        >
          <span>Better</span>
          <span style={{ color: AMBER }}>Maddela</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 38,
            color: "rgba(34, 29, 20, 0.75)",
            marginBottom: 200,
          }}
        >
          Verified civic information for Maddela, Quirino
        </div>
        <svg
          width="1200"
          height="260"
          viewBox="0 0 1200 260"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            display: "flex",
          }}
        >
          {/* Dawn terraces: descending field steps catching first light. */}
          <rect x="0" y="150" width="1200" height="110" fill={INK} />
          <polygon
            fill={GOLD}
            opacity="0.85"
            points="0,150 240,110 480,158 720,106 960,160 1200,120 1200,150 0,150"
          />
          <polygon
            fill={GOLD}
            opacity="0.4"
            points="0,150 240,110 480,158 720,106 960,160 1200,120 1200,176 0,176"
          />
        </svg>
        <div
          style={{
            position: "absolute",
            left: 72,
            bottom: 44,
            display: "flex",
            fontSize: 24,
            color: "rgba(255, 252, 244, 0.92)",
          }}
        >
          Independent project - not a government website
        </div>
      </div>
    ),
    size,
  );
}
