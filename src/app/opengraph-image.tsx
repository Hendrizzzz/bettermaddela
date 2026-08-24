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

const BRAND_BLUE = "#0032a0";
const BRAND_DARK = "#002170";
const LIMESTONE = "#f7f5f0";
const INK = "#1a1a1a";

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
            gap: 16,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              backgroundColor: "#f77f00",
              display: "flex",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: 6,
              color: BRAND_BLUE,
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
          <span style={{ color: BRAND_BLUE }}>Maddela</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 38,
            color: "rgba(26, 26, 26, 0.78)",
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
          <polygon
            fill={BRAND_BLUE}
            opacity="0.45"
            points="0,140 130,70 270,120 420,40 580,115 730,60 890,135 1050,85 1200,150 1200,260 0,260"
          />
          <polygon
            fill={BRAND_DARK}
            points="0,205 160,130 310,185 490,105 650,175 810,125 970,195 1130,145 1200,180 1200,260 0,260"
          />
        </svg>
        <div
          style={{
            position: "absolute",
            left: 72,
            bottom: 44,
            display: "flex",
            fontSize: 24,
            color: LIMESTONE,
          }}
        >
          Independent project - not a government website
        </div>
      </div>
    ),
    size,
  );
}
