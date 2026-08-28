# Maddela barangay geo-verification handoff (OpenStreetMap)

- **Status:** research handoff (evidence input). Imported to production records only after review acceptance.
- **Prepared:** 2026-08-29 by agent research session `ses_fb5ed913fffeScSesKMoYiD1aA` (opencode subagent), project instructions `BetterMaddelaResearch/1.0 (community civic-info project)`.
- **Claim class:** approximate point locations of barangay places. NOT official boundaries; OSM holds no administrative boundary polygons for Maddela at any level (verified via Overpass relation query and area query; 0 Maddela areas).
- **Retrieval date:** 2026-08-29. Overpass DB timestamp observed: `2026-08-28T20:34:56Z` (osm_base).
- **Acceptance:** owner instruction "Go — build the atlas round" (2026-08-29), recorded as `owner-approval-2026-08-29`.

## Method

1. Overpass API place-node sweep over bounding box 16.05,121.45,16.65,122.15 (`node["place"]` + `way["place"]`), 415 elements; townhall query (29 elements) and school/cemetery POIs used as corroboration.
2. Nominatim search per barangay, two passes (`<Name>, Maddela, Quirino, Philippines` and `Barangay <Name>, …`); ~1.1 s delay between geocoder requests; bulk `lookup` of candidate OSM node IDs for final confirmation.
3. Photon geocoder fallback and Wikidata (P131 children of Q53072; P625 of Q53072 = 16.341111, 121.683333) for cross-checks and the missing-name sweep.
4. Name matching against the project's reviewed 32-name PSGC list (`barangay-dataset-2026q2`).

## Verified barangay locations (23 of 32)

All rows are OSM `place=village` nodes except Poblacion Norte / Poblacion Sur (`place=quarter`). Coordinates are raw node coordinates, never interpolated.

| Barangay (PSGC spelling) | Match | OSM name (when variant) | Lat | Lon | OSM element | Caveat |
|---|---|---|---|---|---|---|
| Abbag | exact | — | 16.271552 | 121.655340 | node/12709698237 | — |
| Balligui | exact | — | 16.365048 | 121.632970 | node/8195101671 | — |
| Cabaruan | exact | — | 16.291351 | 121.646407 | node/8195101675 | — |
| Cabua-an | variant | Kaboa-An | 16.317247 | 121.716719 | node/4394437084 | name assertion; Kaboa-An Brgy Hall node/4394437085 adjacent |
| Cofcaville | exact | — | 16.393875 | 121.716505 | node/8195100788 | — |
| Divisoria Norte | exact | — | 16.396931 | 121.730549 | node/8195100787 | — |
| Divisoria Sur | exact | — | 16.373815 | 121.724879 | node/8195100789 | — |
| Dumabato Sur | exact | — | 16.337822 | 121.658368 | node/9421946567 | — |
| Manglad | exact | — | 16.317890 | 121.685504 | node/10982611446 | — |
| Poblacion Norte | exact | — | 16.341694 | 121.685021 | node/12657242300 | — |
| Poblacion Sur | exact | — | 16.339172 | 121.684527 | node/12657254201 | — |
| San Bernabe | exact | — | 16.368733 | 121.700138 | node/8195100786 | — |
| San Dionisio I | variant | San Dionisio | 16.406416 | 121.800715 | node/4394262532 | name assertion; barangay hall way/1182794236 adjacent |
| San Martin | exact | — | 16.391530 | 121.780115 | node/9421940576 | Nominatim shows no municipality; corroborated only by adjacent barangay hall way/603339199 |
| San Pedro | exact | — | 16.348880 | 121.702789 | node/4393678383 | — |
| San Salvador | exact | — | 16.409843 | 121.684012 | node/9476560618 | — |
| Santa Maria | exact | — | 16.373345 | 121.669711 | node/8195101672 | lowest confidence: attribution only to "Quirino"; justification is positional (inside the Maddela node cluster) |
| Santo Tomas | exact | — | 16.420968 | 121.702321 | node/9476359026 | — |
| Villa Agullana | exact | — | 16.343977 | 121.723865 | node/4394267901 | — |
| Villa Gracia | exact | — | 16.316818 | 121.756609 | node/5740760575 | — |
| Villa Hermosa Norte | exact | — | 16.357811 | 121.682146 | node/12690386706 | — |
| Villa Hermosa Sur | exact | — | 16.352885 | 121.677784 | node/12690386707 | — |
| Villa Jose V Ylanan | variant | Villa Jose Ylanan | 16.362015 | 121.753111 | node/4394405603 | name assertion; barangay hall node/4394405608 adjacent |

## Barangays not mappable (9 of 32) — publish as honest unavailable state

No barangay-level feature exists in OSM for these; nearby POIs are NOT barangay locations and were not used:

1. **Buenavista** — nothing found.
2. **Diduyon** — school POI only (way/863800756).
3. **Dipintin** — school POI only (way/863606569); "Dipantan" node/12709698238 is an unverified near-name, refused.
4. **Dumabato Norte** — nothing found (Dumabato Sur verified).
5. **Jose Ancheta** — nothing found (Photon: 0 results).
6. **Lusod** — cemetery way/217381880 + school way/862792696 only.
7. **Pedlisan** — school POI only (way/771548647).
8. **Santo Niño** — the only nearby "Santo Niño" node (node/9381620998, 16.467026, 121.784078) is in Jones, Isabela (cluster of Sinaoangan/Dabubu/Quimalabasa/Santos/Virgonesa). Refused.
9. **Ysmael** — school POI only (way/929564505).

## Refused / uncertifiable candidates (must not be published)

- **node/9381620998 "Santo Niño"** — wrong municipality (Isabela). Refused.
- **node/12709698238 "Dipantan"** — plausible variant of Dipintin but unverified. Refused.
- **node/9321550079 "San Dionisio Ⅱ"** (U+2161, 16.257739, 121.627030) — attributed only to "Quirino, Cagayan Valley"; not in the 32-name PSGC list. Uncertifiable; do not publish.

## Unresolved items for the dataset owner

- **San Dionisio discrepancy:** OSM has "San Dionisio" (used as San Dionisio I above) and "San Dionisio Ⅱ", but the PSGC list has only "San Dionisio I". Which node, if either, is the official San Dionisio II — and whether the 32-name list or OSM is stale — was deliberately NOT reconciled. Needs direct confirmation (barangay hall signage or the municipal assessor).
- **Santa Maria confidence:** positional justification only. A corroborating feature (hall, school, chapel) would raise it; otherwise keep the caveat note visible wherever the point is published.
- **The 9 unmapped barangays:** remain "location pending verification" until coordinates come from a direct or strong government source or a future OSM import.

## Attribution / licensing for display

OSM-derived points must carry visible attribution: "Map data © OpenStreetMap contributors" (ODbL). No boundary shapes are drawn because none exist at source.
