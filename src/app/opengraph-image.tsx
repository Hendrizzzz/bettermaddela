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

// "Gorge & Current" identity world - see .agents/skills and the icon.svg
// direction contract. Palette derives from research/2026-08-identity-brief
// section 11.4 cues: limestone, deep forest, river, cultivated gold.
const LIMESTONE = "#f4f6f1";
const INK = "#16362e";
const RIVER = "#2e7d6b";
const WHITEWATER = "#8fe3cd";
const GOLD = "#e9b944";

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
          backgroundColor: LIMESTONE,
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
          <svg width="44" height="44" viewBox="0 0 64 64" style={{ display: "flex" }}>
            <rect width="64" height="64" rx="14" fill={INK} />
            <path
              d="M18 44 V23 L32 35.5 L46 23 V44"
              fill="none"
              stroke={WHITEWATER}
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="32" cy="13" r="3.4" fill={GOLD} />
          </svg>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: 6,
              color: RIVER,
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
          <span style={{ color: RIVER }}>Maddela</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 38,
            color: "rgba(22, 54, 46, 0.78)",
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
          {/* Stepped current: the seven-tier falls abstracted to descending
              terraces of water over stone. */}
          <polygon
            fill={RIVER}
            opacity="0.4"
            points="0,96 200,60 400,104 600,52 800,110 1000,66 1200,118 1200,260 0,260"
          />
          <polygon
            fill={INK}
            points="0,176 240,132 480,186 720,128 960,192 1200,150 1200,260 0,260"
          />
        </svg>
        <div
          style={{
            position: "absolute",
            left: 72,
            bottom: 44,
            display: "flex",
            fontSize: 24,
            color: "rgba(244, 246, 241, 0.92)",
          }}
        >
          Independent project - not a government website
        </div>
      </div>
    ),
    size,
  );
}
