# DILG BOPS Barangay Officials — Evidence and Import Note (2026-08-28)

- **Task:** source the punong barangay and barangay-governance rosters for all 32 Maddela
  barangays after the 2026-08-26 evidence round (research/2026-08-barangay-officials-evidence.md)
  could verify none of the 32 punong barangay from any reachable source.
- **Outcome:** the official DILG Barangay Officials Profiling System (BOPS) dataset covers all
  32 barangays (316 Maddela rows) and independently corroborates that round's only weak lead
  (Pedro Blanza Salvador, Diduyon). Imported as production record
  `maddela-barangay-officials-2026-dilg-bops` with owner approval on 2026-08-28
  (names + official office emails/telephones, all four roles).
- **Method:** web fetching and one-time client-side filtering only. The dilg.gov.ph
  barangay-officials-directory search form posts (GET) to
  `https://bis.dilg.gov.ph/bops/default/master-filter`; the `region=02` variant returns the
  full Region 02 listing as JSON (22,757 rows), which was filtered to
  `province_m` ~ QUIRINO and `citymun_m` ~ MADDELA (316 rows). Raw Maddela subset preserved
  locally during the working session; no production data was written outside
  `src/data/civic/{records,sources}.json` and this note.

## Listing shape

Per-row fields: `POSITION`, `LASTNAME`, `FIRSTNAME`, `MIDDLENAME`, `SUFFIX`, `EMAIL_ADD`,
`BH_TELNO`, plus locality keys (`abbreviation`, `province_m`, `citymun_m`, `barangay_m`).

Maddela subset (316 rows):

| POSITION | Count |
|---|---|
| Punong Barangay | 32 (exactly one per barangay) |
| Sangguniang Barangay Member | 220 (6-7 per barangay) |
| SK Chairperson | 32 (exactly one per barangay) |
| Barangay Secretary | 32 (exactly one per barangay) |

## Barangay name mapping

All 32 DILG `barangay_m` values match the site's canonical PSA-derived barangay names
(`barangay-dataset-2026q2`) under case/punctuation-insensitive comparison, including
`Cabua-an`, `San Dionisio I`, `Santo Niño`, `Villa Jose V Ylanan`. No renaming or inference
was applied; `officials[].barangay` carries the canonical name.

## Absent-value markers (treated as absent, never published)

| Field | Value | Rows |
|---|---|---|
| BH_TELNO | `N/A` | 176 |
| BH_TELNO | `NONE` | 39 |
| BH_TELNO | blank | 65 |
| EMAIL_ADD | `NONE@GMAIL.COM` | 17 |
| EMAIL_ADD | blank | 276 |

Published values: 23 of 316 email addresses, 36 of 316 telephone numbers. The 12 distinct
telephone numbers are shared barangay office lines (e.g. Diduyon's `09978091153` appears for
all ten of its listed officials); a number identifies the barangay office, not an individual.
Names are reproduced verbatim in the source's uppercase styling, composed by concatenating
the separate FIRSTNAME/MIDDLENAME/LASTNAME/SUFFIX fields in that order.

## Term and freshness caveats

- The BOPS listing publishes no term identifier and no per-entry update date.
- Reachable term context (2026-08-26 evidence file): officials elected at the 2023-10-30 BSKE
  appear to remain in office through 2026 pending barangay and SK elections reportedly
  scheduled for 2026-11-02 — a secondary, unofficial source (barangaydirectory.com snippets);
  COMELEC confirmation was not retrieved. This caveat is carried into the record's
  `termBasis`.
- Mitigations in the record: `updateCadence: monthly` (next review 2026-09-27), explicit
  limitations, and a commitment to re-verify against the next barangay election results.

## Contact publication decision

Owner approved publication of official office emails and shared telephone numbers on
2026-08-28 (names + contacts, all four roles). These are office-contact details published by
the DILG for public use; absent values render as "No contact details published at source" on
barangay pages.

## Follow-ups not yet done

- Barangay index page (`/barangays`) could surface the 32 punong barangay names; deferred to
  keep this change scoped to the detail pages.
- Re-verification against the next BSKE results when COMELEC publishes them.
