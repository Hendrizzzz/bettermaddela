import { getRecord } from "@/data/civic";
import { slugify } from "@/lib/slugify";
import atlasGeometry from "@/data/atlas/geometry.json";

interface BoundariesData {
  attribution: string;
  license: string;
  licenseUrl: string;
  method: string;
  geometryArtifact: string;
  barangayCount: number;
  datasetVersion: string;
  validOn: string;
  municipalityAreaSqkm: number;
  barangayAreaSumSqkm: number;
}

interface BarangayPopulationEntry {
  name: string;
  psgcCode: string;
  population: number;
}

interface BarangayDataset {
  populationReferenceDate: string;
  barangays: BarangayPopulationEntry[];
}

export const maddelaBoundariesRecord = getRecord<BoundariesData>(
  "maddela-barangay-boundaries-codab-2026-08",
);

const barangayRecord = getRecord<BarangayDataset>("barangay-dataset-2026q2");

interface GeometryEntry {
  psgc: string;
  name: string;
  d: string;
  center: [number, number];
  label: boolean;
  areaSqkm: number;
}

interface AtlasGeometry {
  width: number;
  height: number;
  pad: number;
  municipality: { psgc: string; name: string; d: string };
  barangays: GeometryEntry[];
}

const geometry = atlasGeometry as unknown as AtlasGeometry;

const populationByPsgc = new Map(
  barangayRecord.data.barangays.map((entry) => [entry.psgcCode, entry]),
);

// Reviewed census counts bucketed into five quantile bands, computed at render.
const sortedPopulations = barangayRecord.data.barangays
  .map((entry) => entry.population)
  .sort((a, b) => a - b);
const bandCuts = [1, 2, 3, 4].map(
  (k) => sortedPopulations[Math.ceil((sortedPopulations.length * k) / 5) - 1],
);

function bandOf(population: number) {
  for (let band = 0; band < bandCuts.length; band++) {
    if (population <= bandCuts[band]) return band;
  }
  return bandCuts.length;
}

const formatNumber = (value: number) => value.toLocaleString("en-PH");

const bandLabels = [
  `${formatNumber(sortedPopulations[0])}–${formatNumber(bandCuts[0])}`,
  `${formatNumber(bandCuts[0] + 1)}–${formatNumber(bandCuts[1])}`,
  `${formatNumber(bandCuts[1] + 1)}–${formatNumber(bandCuts[2])}`,
  `${formatNumber(bandCuts[2] + 1)}–${formatNumber(bandCuts[3])}`,
  `${formatNumber(bandCuts[3] + 1)}+`,
];

const features = geometry.barangays.map((entry) => {
  const reviewed = populationByPsgc.get(entry.psgc);
  if (!reviewed) {
    throw new Error(
      `Boundary polygon ${entry.psgc} has no reviewed barangay row in barangay-dataset-2026q2`,
    );
  }
  return {
    ...entry,
    name: reviewed.name,
    population: reviewed.population,
    band: bandOf(reviewed.population),
  };
});

const gridFractions = [0.25, 0.5, 0.75];

function formatLongDate(value: string) {
  return new Intl.DateTimeFormat("en-PH", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Manila",
  }).format(new Date(`${value}T00:00:00+08:00`));
}

function atlasAriaLabel(variant: "hero" | "full" | "mini", highlight?: string) {
  if (variant === "mini") {
    return `Stylized map of Maddela with ${
      highlight ?? "the selected barangay"
    } highlighted; boundaries from OCHA COD-AB, not an official survey boundary.`;
  }
  return `Stylized map of all ${features.length} barangays of Maddela with boundaries from OCHA COD-AB, shaded by reviewed census population; not an official survey boundary.`;
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
  const { width: WIDTH, height: HEIGHT, pad: PAD } = geometry;

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
        {features.map((feature) => {
          const isActive = isMini && highlight === feature.name;
          const isDim = isMini && highlight != null && !isActive;

          if (isMini) {
            return (
              <path
                key={feature.psgc}
                className={`atlas-poly${isActive ? " atlas-poly--active" : ""}${
                  isDim ? " atlas-poly--dim" : ""
                }`}
                d={feature.d}
                fillRule="evenodd"
                aria-hidden="true"
              />
            );
          }

          return (
            <a
              key={feature.psgc}
              className="atlas-poly-link"
              href={`/government/barangays/${slugify(feature.name)}`}
              aria-label={`Barangay ${feature.name} — ${formatNumber(
                feature.population,
              )} residents, reviewed census count; opens the barangay profile`}
            >
              <title>{`Barangay ${feature.name} — ${formatNumber(feature.population)} residents`}</title>
              <path
                className={`atlas-poly atlas-poly--band-${feature.band}`}
                d={feature.d}
                fillRule="evenodd"
              />
              {showLabels && (
                <text
                  className={`atlas-poly-label ${
                    feature.label
                      ? "atlas-poly-label--fixed"
                      : "atlas-poly-label--hover"
                  }`}
                  x={feature.center[0]}
                  y={feature.center[1] + 3}
                  textAnchor="middle"
                >
                  {feature.name}
                </text>
              )}
            </a>
          );
        })}
        <path
          className="atlas-muni-edge"
          d={geometry.municipality.d}
          fillRule="evenodd"
          aria-hidden="true"
        />
      </svg>

      {variant !== "mini" && (
        <p className="atlas-caption" lang="en">
          <span>
            All {features.length} barangays shaded by reviewed census population (
            {formatLongDate(barangayRecord.data.populationReferenceDate)}).
          </span>
          <span>{maddelaBoundariesRecord.data.attribution}</span>
        </p>
      )}

      {variant === "full" && (
        <ul className="atlas-legend" aria-label="Population bands">
          {bandLabels.map((labelText, band) => (
            <li key={band}>
              <span
                className={`atlas-legend-swatch atlas-legend-swatch--band-${band}`}
                aria-hidden="true"
              />
              {labelText} residents
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
