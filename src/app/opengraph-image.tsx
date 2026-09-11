import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "BetterMaddela - independent civic information about Maddela, Quirino";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#fffcf4";
const INK = "#151d22";
const GOLD = "#f5b301";
const MUTED = "rgba(21, 29, 34, 0.68)";

function PanagsasalogMark() {
  return (
    <svg width="106" height="106" viewBox="0 0 120 120" style={{ display: "flex" }}>
      <defs>
        <clipPath id="mclip-og">
          <path d="M6 110V23C17 24 25 19 31 13C35 9 39 9 43 14C50 23 55 29 60 32C65 29 70 23 77 14C81 9 85 9 89 13C95 19 103 24 114 23V110H78L65 84L52 110H6Z" />
        </clipPath>
      </defs>
      <circle cx="60" cy="31" r="10.5" fill={GOLD} />
      <path d="M6 110V23C17 24 25 19 31 13C35 9 39 9 43 14C50 23 55 29 60 32C65 29 70 23 77 14C81 9 85 9 89 13C95 19 103 24 114 23V110H78L65 84L52 110H6Z" fill={INK} />
      <g clipPath="url(#mclip-og)">
        <path d="M-3 75C16 72 33 76 49 88M-2 84C16 80 31 84 45 96M1 93C17 89 29 94 39 105M123 75C104 72 87 76 71 88M122 84C104 80 89 84 75 96M119 93C103 89 91 94 81 105" fill="none" stroke={GOLD} strokeWidth="4.2" />
        <path d="M8 42C20 42 23 49 31 52C39 55 44 58 51 61M112 42C100 42 97 49 89 52C81 55 76 58 69 61" fill="none" stroke={PAPER} strokeWidth="2.3" strokeLinecap="round" />
        <path d="M17 116C27 103 39 99 47 89C55 79 45 73 51 65C56 59 65 60 66 53C67 47 58 47 60 40C60.5 38 61.5 36.5 63 35" fill="none" stroke={PAPER} strokeWidth="8.3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <path d="M16 99L26 90L36 99V110H16V99Z" fill={INK} />
      <path d="M13.5 100L26 88L38.5 100Z" fill={INK} />
      <rect x="24" y="100" width="4.5" height="5.5" fill={PAPER} />
    </svg>
  );
}

export default function OpengraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", backgroundColor: PAPER, position: "relative", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", padding: "62px 72px 0", gap: 28 }}>
        <PanagsasalogMark />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 86, fontWeight: 760, color: INK, letterSpacing: -3 }}>
            BetterMaddela
          </div>
          <div style={{ display: "flex", fontSize: 29, color: MUTED, marginTop: 8 }}>
            Independent civic information about Maddela, Quirino
          </div>
        </div>
      </div>

      <svg width="1200" height="310" viewBox="0 0 1200 310" preserveAspectRatio="none" style={{ position: "absolute", left: 0, bottom: 0, display: "flex" }}>
        <path d="M0 134C154 113 265 105 381 132C500 160 573 150 600 126C627 150 700 160 819 132C935 105 1046 113 1200 134V310H0Z" fill={INK} />
        <circle cx="600" cy="143" r="48" fill={GOLD} />
        <path d="M0 191C180 168 350 183 545 252M0 222C180 197 336 211 505 276M0 254C165 230 300 239 451 296" fill="none" stroke={GOLD} strokeWidth="19" />
        <path d="M1200 191C1020 168 850 183 655 252M1200 222C1020 197 864 211 695 276M1200 254C1035 230 900 239 749 296" fill="none" stroke={GOLD} strokeWidth="19" />
        <path d="M602 148C595 168 622 176 604 194C587 211 548 211 567 234C589 259 641 250 625 282C618 296 607 303 600 310" fill="none" stroke={PAPER} strokeWidth="28" strokeLinecap="round" />
      </svg>

      <div style={{ position: "absolute", left: 72, bottom: 38, display: "flex", fontSize: 22, color: "rgba(255,252,244,0.92)", letterSpacing: 0.2 }}>
        Panagsasalog — home, fields, shared work, a brighter Maddela
      </div>
    </div>,
    size,
  );
}
