# Luzon context map derivation

- **Date:** 2026-08-29
- **Prepared for:** BetterMaddela barangay profile Luzon locator
- **Status:** derived data accepted for publication (owner approved the mainland-Luzon
  scope on 2026-08-29)

## Purpose

The barangay profile Location section shows the barangay inside Maddela. The owner asked
for a second, wider map that shows Maddela on the island of Luzon, with Quirino slightly
tinted and Maddela highlighted. Province names appear as hover tooltips only.

## Source and license

Same verified source as the municipal atlas: OCHA COD-AB Philippines admin boundaries
v03 (`sources.json` id `ocha-codab-phl-admin-boundaries-2026-08`, CC BY-IGO 3.0), layer
`phl_admin2`, features valid on 2025-02-13. No new source was added.

## Derivation

- Filtered the 88 `phl_admin2` rows to the mainland-Luzon provinces fixed by the owner:
  Regions I, II (excluding Batanes), III, CAR, NCR, IV-A (mainland provinces), and V
  (excluding Catanduanes and Masbate) = 34 rows. The four NCR district rows
  (PH13039, PH13074, PH13075, PH13076) were unioned into one feature labeled
  "Metropolitan Manila (NCR)" with a synthetic pcode `PH13NCR`; 31 features ship.
- Simplified at 0.012 degrees (preserve topology) and dropped islet rings with a bbox
  diagonal under 0.015 degrees, matching the tolerance used by the municipal atlas.
- Projected equirectangular (cos of mid-latitude) onto a 200x328 canvas, 8 px padding.
- Maddela was rebuilt from the reviewed municipal atlas geometry
  (`src/data/atlas/geometry.json`): barangay paths were parsed, inverse-projected into
  the same lon/lat frame, unioned, and re-projected so the highlight always matches what
  the mini atlas draws.

## Verification

- Maddela union is valid; area computes to ~773 km2 versus the recorded 770.62 km2
  (equirectangular distortion plus simplification).
- Rebuilt centroid (121.7826, 16.3538) vs COD-AB `phl_admin3` Maddela center
  (121.7752, 16.3699): ~1.9 km apart, within the vertex-centroid vs polygon-center gap.
- Containment: raw Quirino contains the rebuilt Maddela (with a 0.001 degree buffer);
  the simplified Quirino contains it with a 0.02 degree buffer. Residual gaps are the
  atlas simplification shave, under half a pixel at locator scale.
- `scripts/validate-civic-data.mjs` passes with the new record.

## Assumptions

- Mainland scope is an editorial choice directed by the owner; Batanes, Catanduanes,
  Masbate, Marinduque, both Mindoros, Romblon, and Palawan are excluded as island
  provinces and would need a separate decision to include.
- `PH13NCR` is a synthetic pcode local to the bundled artifact
  (`/assets/data/luzon-mainland-boundaries-codab.geojson`); it is not a COD-AB code.
- The locator is decorative context. It is not a survey boundary and province hover
  tooltips are convenience only.
