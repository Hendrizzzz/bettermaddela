import Link from "next/link";
import { getRecord } from "@/data/civic";
import { slugify } from "@/lib/slugify";

export interface AtlasLocation {
  barangay: string;
  psgcCode: string;
  latitude: number;
  longitude: number;
  osmElement: string;
  osmPlaceType: string;
  match: string;
  matchName?: string;
  note?: string;
}

export interface AtlasUnmapped {
  barangay: string;
  psgcCode: string;
  note: string;
}

interface PlaceData {
  attribution: string;
  method: string;
  locations: AtlasLocation[];
  unmapped: AtlasUnmapped[];
}

export const maddelaPlaceRecord = getRecord<PlaceData>(
  "maddela-barangay-locations-osm-2026-08",
);

const locations = maddelaPlaceRecord.data.locations;
const unmapped = maddelaPlaceRecord.data.unmapped;

const WIDTH = 640;
const PAD = 42;
const MIN_LAT = Math.min(...locations.map((entry) => entry.latitude));
const MAX_LAT = Math.max(...locations.map((entry) => entry.latitude));
const MIN_LNG = Math.min(...locations.map((entry) => entry.longitude));
const MAX_LNG = Math.max(...locations.map((entry) => entry.longitude));
const midLatRadians = ((MIN_LAT + MAX_LAT) / 2) * (Math.PI / 180);
const spanX = (MAX_LNG - MIN_LNG) * Math.cos(midLatRadians);
const spanY = MAX_LAT - MIN_LAT;
const scale = (WIDTH - PAD * 2) / spanX;
const HEIGHT = Math.round(spanY * scale + PAD * 2);

function projectX(longitude: number) {
  return PAD + (longitude - MIN_LNG) * Math.cos(midLatRadians) * scale;
}

function projectY(latitude: number) {
  return PAD + (MAX_LAT - latitude) * scale;
}

const gridFractions = [0.25, 0.5, 0.75];

function atlasAriaLabel(variant: "hero" | "full" | "mini", highlight?: string) {
  if (variant === "mini") {
    return `Stylized map of Maddela barangays with ${
      highlight ?? "the selected barangay"
    } highlighted; dots are approximate point locations, not official boundaries.`;
  }
  return `Stylized map of Maddela barangays: ${locations.length} plotted with approximate point locations, ${unmapped.length} not yet mappable. Dots are not official boundaries.`;
}

export function MaddelaAtlas({
  variant,
  highlight,
}: {
  variant: "hero" | "full" | "mini";
  highlight?: string;
}) {
  const isMini = variant === "mini";
  const showLabels = variant === "full";

  return (
    <div className={`atlas-card atlas-card--${variant}`}>
      <svg
        className="atlas-svg"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="group"
        aria-label={atlasAriaLabel(variant, highlight)}
      >
        <g className="atlas-grid" aria-hidden="true">
          {gridFractions.map((fraction) => (
            <line
              key={`v-${fraction}`}
              x1={PAD + fraction * (WIDTH - PAD * 2)}
              y1={PAD}
              x2={PAD + fraction * (WIDTH - PAD * 2)}
              y2={HEIGHT - PAD}
            />
          ))}
          {gridFractions.map((fraction) => (
            <line
              key={`h-${fraction}`}
              x1={PAD}
              y1={PAD + fraction * (HEIGHT - PAD * 2)}
              x2={WIDTH - PAD}
              y2={PAD + fraction * (HEIGHT - PAD * 2)}
            />
          ))}
        </g>
        <rect
          className="atlas-frame"
          x={PAD - 14}
          y={PAD - 14}
          width={WIDTH - (PAD - 14) * 2}
          height={HEIGHT - (PAD - 14) * 2}
          rx={14}
          aria-hidden="true"
        />
        {locations.map((loc) => {
          const cx = projectX(loc.longitude);
          const cy = projectY(loc.latitude);
          const isActive = isMini && highlight === loc.barangay;
          const isDim = isMini && highlight != null && !isActive;
          const markClass = [
            "atlas-dot-mark",
            isActive ? "atlas-dot-mark--active" : "",
            isDim ? "atlas-dot-mark--dim" : "",
          ]
            .filter(Boolean)
            .join(" ");
          const haloClass = [
            "atlas-dot-halo",
            isActive ? "atlas-dot-halo--active" : "",
            isDim ? "atlas-dot-halo--dim" : "",
          ]
            .filter(Boolean)
            .join(" ");
          const flipLabel = cx > WIDTH - 150;

          if (isMini) {
            return (
              <g key={loc.psgcCode} aria-hidden="true">
                <circle className={haloClass} cx={cx} cy={cy} r={9} />
                <circle className={markClass} cx={cx} cy={cy} r={isActive ? 6.5 : 5} />
              </g>
            );
          }

          return (
            <a
              key={loc.psgcCode}
              className="atlas-dot"
              href={`/government/barangays/${slugify(loc.barangay)}`}
              aria-label={`Barangay ${loc.barangay} — approximate point location; opens the barangay profile`}
            >
              <title>{`Barangay ${loc.barangay}`}</title>
              <circle className={haloClass} cx={cx} cy={cy} r={9} />
              <circle className={markClass} cx={cx} cy={cy} r={5} />
              {showLabels && (
                <text
                  className="atlas-dot-label"
                  x={flipLabel ? cx - 12 : cx + 12}
                  y={cy + 4}
                  textAnchor={flipLabel ? "end" : "start"}
                >
                  {loc.barangay}
                </text>
              )}
            </a>
          );
        })}
      </svg>

      {variant !== "mini" && (
        <p className="atlas-caption" lang="en">
          <span>
            {locations.length} of {locations.length + unmapped.length} barangays plotted,{" "}
            {unmapped.length} pending verification.
          </span>
          <span>{maddelaPlaceRecord.data.attribution}</span>
        </p>
      )}

      {variant === "full" && (
        <>
          <ul className="atlas-pending" aria-label="Barangays without a mappable location yet">
            {unmapped.map((entry) => (
              <li key={entry.psgcCode}>
                <Link
                  className="atlas-pending-chip"
                  href={`/government/barangays/${slugify(entry.barangay)}`}
                >
                  {entry.barangay}
                  <span className="atlas-pending-state">location pending</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
