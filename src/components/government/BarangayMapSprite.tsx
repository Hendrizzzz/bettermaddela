import atlasGeometry from "@/data/atlas/geometry.json";

interface SpriteGeometry {
  width: number;
  height: number;
  municipality: { psgc: string; name: string; d: string };
  barangays: { psgc: string; name: string; d: string }[];
}

const geometry = atlasGeometry as unknown as SpriteGeometry;

// One hidden copy of the municipal geometry, referenced by every directory
// mini-map through <use> so 32 thumbnails cost one copy of the path data.
export function BarangayMapSprite() {
  return (
    <svg
      className="bmm-sprite"
      viewBox={`0 0 ${geometry.width} ${geometry.height}`}
      aria-hidden="true"
      focusable="false"
    >
      <g id="bmm-sil">
        {geometry.barangays.map((barangay) => (
          <path key={barangay.psgc} id={`bmm-${barangay.psgc}`} d={barangay.d} fillRule="evenodd" />
        ))}
      </g>
    </svg>
  );
}

export function BarangayMiniMap({ psgc }: { psgc: string }) {
  return (
    <svg
      className="brgy-dir-mini"
      viewBox={`0 0 ${geometry.width} ${geometry.height}`}
      aria-hidden="true"
      focusable="false"
    >
      <use href="#bmm-sil" />
      <use className="brgy-dir-mini-active" href={`#bmm-${psgc}`} />
    </svg>
  );
}
