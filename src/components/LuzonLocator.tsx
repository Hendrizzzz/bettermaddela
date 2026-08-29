import luzonGeometry from "@/data/atlas/luzon-geometry.json";

interface LuzonProvinceEntry {
  pcode: string;
  name: string;
  d: string;
}

interface LuzonGeometry {
  width: number;
  height: number;
  provinces: LuzonProvinceEntry[];
  maddela: { name: string; d: string; labelPoint: [number, number] };
  quirinoLabelPoint: [number, number];
}

const luzon = luzonGeometry as unknown as LuzonGeometry;

/**
 * Static rendering of the Luzon province context, used as the no-JS fallback
 * inside <noscript> under the interactive LuzonMap. Carries no caption: the
 * interactive wrapper renders the attribution caption for both modes.
 */
export function LuzonLocatorStatic() {
  return (
    <svg
      className="luzon-loc-svg"
      viewBox={`0 0 ${luzon.width} ${luzon.height}`}
      role="img"
      aria-label="Map of the island of Luzon. Maddela is highlighted on the southeastern edge of Quirino province. Boundaries from OCHA COD-AB; the stylized map is not an official survey boundary."
    >
      {luzon.provinces.map((province) => (
        <path
          key={province.pcode}
          className={`luzon-loc-prov${
            province.pcode === "PH02057" ? " luzon-loc-prov--quirino" : ""
          }`}
          d={province.d}
          fillRule="evenodd"
        >
          <title>{province.name}</title>
        </path>
      ))}
      <path
        className="luzon-loc-maddela"
        d={luzon.maddela.d}
        fillRule="evenodd"
        aria-hidden="true"
      />
      <text
        className="luzon-loc-label"
        x={luzon.maddela.labelPoint[0] + 3}
        y={luzon.maddela.labelPoint[1] + 10}
      >
        Maddela
      </text>
      <text
        className="luzon-loc-label"
        x={luzon.quirinoLabelPoint[0] - 2}
        y={luzon.quirinoLabelPoint[1] - 16}
        textAnchor="end"
      >
        Quirino
      </text>
    </svg>
  );
}
