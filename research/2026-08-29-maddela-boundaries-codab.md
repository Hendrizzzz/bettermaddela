# Maddela boundary polygons — OCHA COD-AB verification (2026-08-29)

Research question: can the Maddela atlas draw real administrative boundaries
(municipality + all 32 barangays) after OpenStreetMap proved to hold no Maddela
boundary polygons (see `research/2026-08-29-maddela-atlas-geo-verification.md`)?

## Source found

- Dataset: "Philippines - Subnational Administrative Boundaries" (COD-AB), slug
  `cod-ab-phl` on the UN OCHA Humanitarian Data Exchange,
  https://data.humdata.org/dataset/cod-ab-phl
- License, from the HDX package API (`/api/3/action/package_show?id=cod-ab-phl`):
  "Creative Commons Attribution for Intergovernmental Organisations (CC BY-IGO)",
  http://creativecommons.org/licenses/by/3.0/igo/legalcode — attribution required,
  no share-alike, no endorsement demand; compatible with this project's reuse
  (community civic-information site, attribution displayed adjacent to every map).
- Resource used: `phl_admin_boundaries.gdb.zip` (Geodatabase, admin levels 0–4),
  resource URL
  https://data.humdata.org/dataset/caf116df-f984-4deb-85ca-41b349d3f313/resource/3fa0dbcf-e07d-4506-9821-ba15baa6da07/download/phl_admin_boundaries.gdb.zip
  resource last modified 2026-05-28T12:13:03 (HDX API).
- Download: 360,586,879 bytes — byte count equals the size listed by HDX.
  SHA-256: e7fc18f1383a21066ecfbe595c5c1d77375c93341dedf7284f09d66dbd28c5ad

## Verification performed

- Extracted geodatabase (44 files); feature counts read independently from the
  geometry tables: `phl_admin3` = 1,642 municipalities, `phl_admin4` = 42,048
  barangays (EPSG:4326, MultiPolygon), matching the HDX documentation figures.
- Maddela municipal polygon present, keyed `adm3_pcode` = `PH0205704`
  (PSGC 0205704000), area 770.62 km².
- All 32 Maddela barangay polygons present, keyed by `adm4_pcode` = PSGC with the
  `PH` prefix; joined 32/32 against the reviewed `barangay-dataset-2026q2` list by
  PSGC code. One alias: COD-AB `adm4_name` "Divisoria Sur (Bisangal)" vs reviewed
  name "Divisoria Sur" (PSGC alternate name; join is by code, reviewed name shown).
- Barangay polygon areas sum to 770.60 km² vs municipal 770.62 km² — the set tiles
  the municipality within rounding.
- Per-feature metadata: `version` = v03, `valid_on` = 2025-02-13 (uniform across
  all 32 barangays and the municipality); label centers supplied as
  `center_lat`/`center_lon`.
- All three derived GeoJSON extracts read back as valid EPSG:4326 with
  `is_valid = true` geometry; barangay-level bounds equal municipal bounds.

## Derivation for the site

- `public/assets/data/maddela-boundaries-codab.geojson` — bundled artifact holding
  the municipality + 32 barangay polygons with attribution, license, source URL,
  and per-feature PSGC/name/area metadata.
- `src/data/atlas/geometry.json` — render projection (same equirectangular +
  cos(mid-lat) projection as the retired dot map; 640×372 viewBox), coordinates
  simplified with Douglas-Peucker at 1 px tolerance (640 px width), quantized to
  0.1 px. Derivation script and the 344 MB source download live in temp only.
- Center inverse-projection round-trips to source centers within 4.45e-5° (≈5 m),
  i.e. pure 0.1 px quantization error, no systematic bias.

## Honest-presentation gates

- The rendered map is a stylized simplification; every caption states it is not an
  official survey boundary, and the COD-AB attribution (CC BY-IGO) is displayed
  adjacent to every use.
- Polygons are published only as shapes from the named source; no barangay
  population, official, or contact claim is derived from them.
