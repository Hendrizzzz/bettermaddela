import type { Metadata } from "next";
import type { ReactNode } from "react";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Logo directions (internal)",
  description: "Internal decision board for the BetterMaddela identity mark.",
  robots: { index: false, follow: false },
};

const INK = "#221d14";
const PAPER = "#fffcf4";
const GOLD = "#f5b301";
const AMBER = "#8a5e0f";
const STRAW = "#f7efd8";
const LINE = "#e8dfc8";

type Variant = "light" | "dark";

function MarkA({ size, variant = "light" }: { size: number; variant?: Variant }) {
  const bars = variant === "dark" ? INK : GOLD;
  const widths = [40, 35, 30, 25, 20, 15, 10];
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill={variant === "dark" ? GOLD : INK} />
      {widths.map((w, i) => (
        <rect
          key={w}
          x={32 - w / 2}
          y={10.2 + i * 7}
          width={w}
          height={3.6}
          rx={1.8}
          fill={bars}
        />
      ))}
    </svg>
  );
}

function MarkB({ size, variant = "light", id }: { size: number; variant?: Variant; id: string }) {
  const step = variant === "dark" ? PAPER : INK;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <mask id={`bcut-${id}`}>
          <rect width="64" height="64" fill="#fff" />
          <rect x="4" y="28" width="56" height="8" fill="#000" />
        </mask>
      </defs>
      <circle cx="32" cy="32" r="30" fill={GOLD} mask={`url(#bcut-${id})`} />
      <rect x="18" y="28" width="8" height="8" fill={step} />
      <rect x="28" y="31" width="8" height="5" fill={step} />
      <rect x="38" y="34" width="8" height="2" fill={step} />
    </svg>
  );
}

function MarkC({ size, variant = "light" }: { size: number; variant?: Variant }) {
  const line = variant === "dark" ? PAPER : INK;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="29.5" fill="none" stroke={line} strokeWidth="4.5" />
      <path
        d="M17 44 L17 21 L25 21 L32 31 L39 21 L47 21 L47 44 L40 44 L40 32.5 L34.5 40 L29.5 40 L24 32.5 L24 44 Z"
        fill={GOLD}
        stroke={line}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MarkD({ size, variant = "light" }: { size: number; variant?: Variant }) {
  const line = variant === "dark" ? PAPER : INK;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <path
        d="M14 12 L14 24 C14 34 22 40 32 40 C42 40 50 34 50 24 L50 12"
        fill="none"
        stroke={line}
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path d="M32 40 L32 54" fill="none" stroke={line} strokeWidth="9" strokeLinecap="round" />
      <circle cx="32" cy="40" r="7.5" fill={GOLD} />
    </svg>
  );
}

function CurrentMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect x="8" y="8" width="11" height="48" rx="5.5" fill={INK} />
      <rect x="45" y="8" width="11" height="48" rx="5.5" fill={INK} />
      <circle cx="32" cy="30" r="13" fill={GOLD} />
      <rect x="21" y="50" width="10" height="5" rx="2.5" fill={GOLD} />
      <rect x="33" y="50" width="10" height="5" rx="2.5" fill={GOLD} opacity="0.55" />
    </svg>
  );
}

interface DirectionProps {
  tag: string;
  name: string;
  why: string;
  children: (size: number, variant: Variant, id: string) => ReactNode;
}

function Direction({ tag, name, why, children }: DirectionProps) {
  return (
    <div className="card">
      <span className="tag">{tag}</span>
      <h2>{name}</h2>
      <p className="why">{why}</p>
      <div className="row">
        {[64, 32, 16].map((s) => (
          <div className="cell" key={s}>
            {children(s, "light", `${tag}-${s}`)}
            <span>{s}px</span>
          </div>
        ))}
      </div>
      <div className="lockup">
        {children(34, "light", `${tag}-lock`)}
        <b>BetterMaddela</b>
      </div>
      <div className="lockup dark">
        {children(34, "dark", `${tag}-lockd`)}
        <b>BetterMaddela</b>
      </div>
      <div className="og">
        <span className="kick">MADDELA, QUIRINO</span>
        <span className="big">
          Better<em>Maddela</em>
        </span>
      </div>
    </div>
  );
}

const pageStyles = `
  * { box-sizing: border-box; margin: 0; }
  body { font-family: Archivo, 'Segoe UI', system-ui, sans-serif; background: ${PAPER}; color: ${INK}; padding: 40px 24px 80px; }
  .wrap { max-width: 1060px; margin: 0 auto; }
  h1 { font-size: 1.7rem; font-weight: 800; letter-spacing: -0.01em; }
  .sub { color: #6b6353; margin: 6px 0 36px; font-size: .95rem; }
  .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 28px; }
  @media (max-width: 820px) { .grid { grid-template-columns: 1fr; } }
  .card { background: #fff; border: 1px solid ${LINE}; border-radius: 18px; padding: 26px; box-shadow: 0 2px 10px rgba(34,29,20,.05); }
  .tag { display: inline-block; font-size: .72rem; font-weight: 800; letter-spacing: .12em; color: ${AMBER}; background: ${STRAW}; border-radius: 999px; padding: 5px 12px; margin-bottom: 12px; }
  h2 { font-size: 1.15rem; font-weight: 800; margin-bottom: 4px; }
  .why { color: #6b6353; font-size: .86rem; line-height: 1.45; margin-bottom: 18px; min-height: 2.6em; }
  .row { display: flex; align-items: flex-end; gap: 18px; margin-bottom: 18px; }
  .cell { text-align: center; }
  .cell span { display: block; font-size: .66rem; color: #6b6353; margin-top: 6px; letter-spacing: .06em; }
  .lockup { display: flex; align-items: center; gap: 10px; background: ${PAPER}; border: 1px solid ${LINE}; border-radius: 12px; padding: 12px 16px; margin-bottom: 12px; }
  .lockup.dark { background: ${INK}; border-color: ${INK}; }
  .lockup b { font-size: 1.15rem; font-weight: 800; letter-spacing: -0.01em; }
  .lockup.dark b { color: ${PAPER}; }
  .og { display: flex; flex-direction: column; justify-content: center; gap: 6px; background: ${PAPER}; border: 1px solid ${LINE}; border-radius: 12px; padding: 16px 18px; }
  .og .kick { font-size: .6rem; letter-spacing: .22em; color: ${AMBER}; font-weight: 700; }
  .og .big { font-size: 1.3rem; font-weight: 800; }
  .og .big em { font-style: normal; color: ${AMBER}; }
  .current { border: 2px dashed #d9822b; margin-bottom: 28px; }
`;

export default function LogoLabPage() {
  return (
    <>
      <style>{pageStyles}</style>
      <div className="wrap">
        <h1>BetterMaddela — logo directions</h1>
        <p className="sub">
          Every mark is built from a verified Maddela fact. Pick a letter — the winner gets
          production polish (optical sizing, dark variant, OG card, favicon).
        </p>

        <div className="card current">
          <span className="tag">CURRENT — FOR COMPARISON</span>
          <div className="row">
            {[64, 32, 16].map((s) => (
              <div className="cell" key={s}>
                <CurrentMark size={s} />
                <span>{s}px</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid">
          <Direction
            tag="A"
            name="The Seven-Tier Roundel"
            why="The Maddela Waterfalls — seven tiers — abstracted into a mon-style emblem: seven descending currents inside a full disc. Reads like a prefecture mark: quiet, ownable, official-adjacent without copying any seal."
          >
            {(_size, variant) => (
              <MarkA size={_size} variant={variant} />
            )}
          </Direction>

          <Direction
            tag="B"
            name="The Gorge Coin"
            why="One gold disc, one precise horizon cut — and inside the cut, the falls step down through the gorge. Sun and river in a single shape. The most minimal of the four; strongest at favicon size."
          >
            {(_size, variant, id) => <MarkB size={_size} variant={variant} id={id} />}
          </Direction>

          <Direction
            tag="C"
            name="The Ridge Mon"
            why="A geometric M whose strokes are the Sierra Madre ridgeline, set inside a ring that echoes the civic-seal genre without copying it. The most conventional of the four — and the most instantly legible as 'a municipality'."
          >
            {(_size, variant) => (
              <MarkC size={_size} variant={variant} />
            )}
          </Direction>

          <Direction
            tag="D — WILDCARD"
            name="The Confluence"
            why="Two currents — the rivers and the roads that carry daily life — merging into one flow, with the harvest sun at the meeting point. The most modern of the four; the only one built from motion rather than scenery."
          >
            {(_size, variant) => (
              <MarkD size={_size} variant={variant} />
            )}
          </Direction>
        </div>

        <p className="sub" style={{ marginTop: 32 }}>
          Reply with a letter (or &quot;A but with B&apos;s cut&quot;, etc.). The winner gets optical
          polish, a true 16px favicon test, and full lockup + OG rollout.
        </p>
      </div>
    </>
  );
}
