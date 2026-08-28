---
prepared-by: research-agent:contacts-2026-08
date: 2026-08-28
title: Maddela contacts & emergency hotlines — evidence collection
status: RESEARCH — NOT CLEARED FOR PUBLICATION
---

# Contacts and emergency hotlines — evidence file

## Scope

Included:

- Contact details (hotlines, landlines, office mobiles, emails, addresses) publicly
  published by the Municipal Government of Maddela, the Provincial Government of
  Quirino, and national/agency sources for emergency and safety services serving
  Maddela and Quirino.
- Emergency and safety services: PNP, BFP, MDRRMO/LDRRMO, PDRRMO, Philippine Red
  Cross, national emergency hotlines (911, 143).

Excluded:

- Social-media-only numbers (Facebook posts) — recorded as leads only, never as
  evidence.
- Third-party directories/aggregators (Yellow Pages clones, hospital directory
  sites) — leads only.
- Personal mobile numbers of named officials (house privacy rule): not transcribed
  as candidates even when present in a source.
- Credentials, behind-login portals, and anything requiring an account.

## Method and limitations

- Fetch tooling: `curl.exe` with a Chrome User-Agent worked for most hosts. The
  PowerShell helper (`Invoke-WebRequest`, TLS12) failed on
  `quirinoprovince.gov.ph` with "The request was aborted: Could not create
  SSL/TLS secure channel"; `curl.exe` succeeded (TLS 1.3).
- The webfetch tool was blocked (HTTP 403) on the same government hosts as direct
  fetches, so `curl.exe` was the primary channel.
- `r.jina.ai` rendering was attempted for `ndrrmc.gov.ph`, `pro2.pnp.gov.ph`, and
  `pnp.gov.ph`; every attempt returned a Cloudflare "Just a moment..." CAPTCHA
  challenge instead of page content.
- DuckDuckGo HTML endpoint (`html.duckduckgo.com/html/?q=`) worked for the first
  two queries, then returned HTTP 202 (rate-limit) on all later queries, including
  a spaced-out retry for "Maddela District Hospital" on 2026-08-28. Bing returned
  an anti-bot page with zero parseable results.
- The official LGU site `maddela-quirino.gov.ph` is unreachable from this
  environment (HTTP 403, empty body, on both HTTP and HTTPS). All LGU evidence
  below comes from Internet Archive captures of that site; **capture dates are
  printed on every record** and none of it may be treated as current until
  re-verified.
- Facebook is login-walled; nothing from Facebook is used as evidence.

## Source registry

All sources retrieved 2026-08-28 unless stated otherwise.

| ID | Source | URL | Status | Notes |
|----|--------|-----|--------|-------|
| S1 | Provincial Government of Quirino — Directory | `https://quirinoprovince.gov.ph/directory/` | 200 | Provincial office directory with contacts |
| S2 | Provincial Government of Quirino — Contact Us | `https://quirinoprovince.gov.ph/contact-us/` | 200 | Provincial address + main line + email |
| S3 | Municipality of Maddela official site — Contact Us (archived) | `https://web.archive.org/web/20230402144502/http://maddela-quirino.gov.ph/contact-us/` | 200 (archive) | "Local Hotlines" section; capture 2023-04-02 |
| S4 | Municipality of Maddela official site — Citizen's Charter "Pagannurutan" (archived) | `https://web.archive.org/web/20231014102928/http://maddela-quirino.gov.ph/citizens-charter/` | 200 (archive) | Service procedures; no numbers published; capture 2023-10-14 |
| S5 | Municipality of Maddela official site — footer (archived 2017 contact page) | `https://web.archive.org/web/20171125200545/http://maddela-quirino.gov.ph:80/contact-us/` | 200 (archive) | Old-theme footer `mailto:`; capture 2017-11-25 |
| S6 | Philippine Red Cross — Contact Us | `https://redcross.org.ph/contact-us/` | 200 | National contact page; no Quirino chapter listing |
| S7 | Official Gazette — 911 hotline inauguration speech (2016-08-01) | `https://www.officialgazette.gov.ph/2016/08/01/speech-presidential-communications-office-secretary-martin-andanar-911-hotline-inauguration-and-24th-police-community-relations-group-founding-anniversary-in-camp-crame/` | 200 | Official government record establishing 911 as the national emergency hotline |
| S8 | DSWD Field Office 2 — Directory of Officials | `https://fo2.dswd.gov.ph/contact-us/directory-of-officials-updated/` | 200 | Auxiliary (adjacent scope) |
| S9 | DA FFEdIS negotiated procurement record 1913 | `https://ffedis.da.gov.ph/negotiated-procurement/public/view/1913` | 200 | Published procurement correspondence email for the Mayor's Office |
| S10 | Municipality of Maddela — departments page (archived) | `https://web.archive.org/web/20231015132321/http://maddela-quirino.gov.ph/departments/` | 200 (archive) | Office name list only; no contacts |
| S11 | Municipality of Maddela — contact page embed (archived) | `https://web.archive.org/web/20220707152727/http://maddela-quirino.gov.ph/contact-us/embed/` | 200 (archive) | Truncated excerpt; confirms BPLO address |
| S12 | Quirino tourism page for Maddela | `https://quirinoprovince.gov.ph/tourism/municipality-of-maddela/` | 200 | No contact details published |

## Candidate contact records

### Municipal Government of Maddela (LGU official site, via Internet Archive)

Publication basis: the LGU's own official website, archived 2023-04-02 (S3).
The live site is currently unreachable (HTTP 403 from this environment), so every
row in this block carries **"archived source — re-verify currency before live
display."** Emergency rows additionally require direct confirmation.

Verbatim from S3 (capture 2023-04-02), section titled "Local Hotlines":

```
Local Hotlines
Office of the Municipal Mayor
Landline: (078) 374-1543
email: mmo_lgu_maddela@yahoo.com
Municipal Economic Enterprise Management and Development Office
+63-947-853-8035 (Smart) & +63-945-866-1375 (Globe)
Philippine National Police Maddela Station
+63-905-617-2749
Bureau of Fire Protection Maddela Station
+63-917-511-1429
Local Disaster Risk Reduction Management Office
+63-977-851-9603 & +63-966-259-5691
```

| Entity | Detail as published | Source | Gate | Caveats |
|--------|--------------------|--------|------|---------|
| Office of the Municipal Mayor | Landline: `(078) 374-1543`; email: `mmo_lgu_maddela@yahoo.com` | S3 (2023 archive) | Ordinary | Archived; re-verify currency |
| Business Permit & Licensing Office | Address: "Municipal Hall, Magsaysay st., Poblacion Norte, Maddela, Quirino Philippines 3404"; email: `bplo@maddela-quirino.gov.ph` | S3 (2023 archive; also S11, 2022 archive) | Ordinary | Archived; re-verify currency |
| Municipal Economic Enterprise Management and Development Office (MEEMDO) | `+63-947-853-8035 (Smart)` & `+63-945-866-1375 (Globe)` | S3 (2023 archive) | Ordinary | Office-published mobiles; archived; re-verify |
| Site-wide LGU email (footer) | `mipc@maddela-quirino.gov.ph` | S3 (2023 archive, footer `mailto:`) | Ordinary | Generic site email; archived; re-verify |
| Old-theme site email (footer, 2017) | `admin@maddela-quirino.gov.ph` | S5 (2017 archive) | Ordinary | Superseded-era address; historical only |
| LGU Facebook (footer link) | `facebook.com/InvestMaddela` | S3 (2023 archive) | Ordinary | Link only; content not accessible (login wall) |

### Emergency and safety services (REQUIRES DIRECT CONFIRMATION BEFORE PUBLICATION)

| Entity | Detail as published | Source | Gate | Caveats |
|--------|--------------------|--------|------|---------|
| Philippine National Police — Maddela Station | `+63-905-617-2749` | S3 (2023 archive) | EMERGENCY | Archived LGU page; direct confirmation required before publication |
| Bureau of Fire Protection — Maddela Station | `+63-917-511-1429` | S3 (2023 archive) | EMERGENCY | Archived LGU page; direct confirmation required before publication |
| LDRRMO Maddela (Local Disaster Risk Reduction Management Office) | `+63-977-851-9603` & `+63-966-259-5691` | S3 (2023 archive) | EMERGENCY | Archived LGU page; direct confirmation required. Charter (S4) labels its response team "Rescue 104" but publishes no number |
| PDRRMO (Provincial DRRMO) — "Rescue 910 24/7 Emergency" | Globe `0975 415 8508`; PLDT `(078)374 6118` | S1 (live, 2026-08-28) | EMERGENCY | Live provincial source; direct confirmation still required per house rule |
| National emergency hotline | `911` | S7 (2016 Official Gazette) | EMERGENCY | Established as national hotline via official speech record; direct confirmation required before publication |
| Philippine Red Cross — Emergency Hotline | `143` | S6 (live, 2026-08-28) | EMERGENCY | National PRC line; direct confirmation required before publication |
| Philippine Red Cross — Trunkline | `(+63 2) 8790-2300` | S6 (live) | Ordinary | National trunkline |

### Provincial Government of Quirino (live official site)

Verbatim from S1 (retrieved 2026-08-28):

```
Office of the Governor Admin Section — pgo.quirino@gmail.com
Office of the Provincial Administrator — Globe - 0917 651 1626
PDRRMO - Rescue 910 24/7 Emergency — Globe - 0975 415 8508 — PLDT - (078)374 6118
```

Verbatim from S2 (retrieved 2026-08-28):

```
Republic of the Philippines | PROVINCIAL GOVERNMENT OF QUIRINO |
Capitol Hills, San Marcos | Cabarroguis, Quirino 3400 | Philippines |
+63 917 685 2040 | pgoquirino@gmail.com
```

| Entity | Detail as published | Source | Gate | Caveats |
|--------|--------------------|--------|------|---------|
| Office of the Governor (Admin Section) | email `pgo.quirino@gmail.com` | S1 | Ordinary | |
| Office of the Provincial Administrator | Globe `0917 651 1626` | S1 | Ordinary | |
| Provincial Government main line | `+63 917 685 2040` | S2 | Ordinary | |
| Provincial Government email | `pgoquirino@gmail.com` | S2 | Ordinary | Second provincial email; see Conflicts |

### National agencies (live official sources, adjacent scope)

| Entity | Detail as published | Source | Gate | Caveats |
|--------|--------------------|--------|------|---------|
| Philippine Red Cross — Blood Donation / Blood Request | `(+63 2) 8790-2382`, `8790-2383`; `8790-2300` loc. 113/116 | S6 | Ordinary | National office; no Quirino chapter contact found |
| Philippine Red Cross — Social/Welfare | `8790-2359` loc. 916 | S6 | Ordinary | |
| Philippine Red Cross — First Aid Training | `8790-2365` loc. 934/933; `(+63 917) 806-8520` | S6 | Ordinary | |
| Philippine Red Cross address | "37 EDSA corner Boni Avenue, Barangka-Ilaya, Mandaluyong City 1550" | S6 | Ordinary | |
| DSWD Field Office 2 | main `(078) 375-2640`; email `fo2@dswd.gov.ph`; mobile `+63 956 473 2954`; other published lines `(078) 825-2220 / 255-4135`, `(078) 825-2242`, `(078) 375-0057 / 255-4137`, `(078) 846-9727` | S8 | Ordinary | Auxiliary to core scope |
| DSWD FO2 regional address | "Narciso Ramos Ave., District 2, San Mariano, Diffun, Quirino" (as published on S8) | S8 | Ordinary | |

### Contextual, non-contact records

- S9 (DA FFEdIS record 1913) publishes for procuring entity "MUNICIPAL
  AGRICULTURE OFFICE - LGU MADDELA", address "Poblacion Norte, Maddela, Quirino":
  contact person "RIMEL | C | TOLENTINO", designation "Municipal Mayor", and a
  phone number that is **not transcribed here** (personal mobile of a named
  official — privacy rule) and email `mmo_lgu_maddela@yahoo.com`. The email
  corroborates the Mayor's Office email on S3.
- S3 "Featured Person" widget: "RIMEL C. TOLENTINO — Municipal Mayor"
  (consistent with the officials roster research).
- S4 (Citizen's Charter, 2023): the MDRRMO/LDRRMO service tables say
  "Call emergency number, mobile radio" and name the response team
  "Emergency response team (Rescue 104)" — evidence the LGU deliberately does not
  print the rescue number in the charter text.

## Leads only — NOT evidence

- Facebook snippet (search-result excerpt, page "Ldrrmo Maddela"): "HOTLINE:
  0966-259-5691". Matches the archived LGU number `+63-966-259-5691` on S3; the
  Facebook page itself was not accessible, so it adds nothing beyond S3 and is
  recorded only as corroboration direction. Do not publish from this lead.
- Third-party hospital directories claim Quirino Provincial Hospital
  `+63(78)6925077`. Aggregator source; prohibited as evidence; recorded as a lead
  for direct confirmation only.

## Conflicts and notes

- Two provincial emails published by the province itself: `pgo.quirino@gmail.com`
  (S1 directory) and `pgoquirino@gmail.com` (S2 contact page). Both are official
  publications; keep both if both are used, never merge into one address.
- LGU site email changed over time: `admin@maddela-quirino.gov.ph` (2017 theme,
  S5) vs `mipc@maddela-quirino.gov.ph` (2022–2023 theme, S3). The newer one is
  the more recent official publication; the older one is historical.
- The Facebook lead number and the archived LGU LDRRMO number match — increases
  confidence in S3 but does not satisfy the emergency gate (which requires direct
  confirmation).

## Negative findings (exact errors, 2026-08-28)

- `maddela-quirino.gov.ph` — HTTP 403, empty body (HTTP and HTTPS). DNS resolves
  (66.96.147.193; CNAME `www`). Official site not reachable.
- `ndrrmc.gov.ph` — HTTP 403 (direct, curl and webfetch); via `r.jina.ai` →
  Cloudflare CAPTCHA ("Just a moment...").
- `pro2.pnp.gov.ph` — HTTP 403; via `r.jina.ai` → CAPTCHA.
- `pnp.gov.ph` — HTTP 403; via `r.jina.ai` → CAPTCHA.
- `bfp.gov.ph` — HTTP 403.
- `doh.gov.ph` — HTTP 403.
- `ocd.gov.ph` — HTTP 403.
- `dict.gov.ph` — HTTP 403.
- `r2.bfp.gov.ph` — connection failure (HTTP code 000).
- `lgu201.dilg.gov.ph` — connection failure (000).
- `fdpp.dilg.gov.ph` — 200 but JavaScript SPA ("Loading...") behind a sign-in
  wall; no public contact content.
- `subaybayan.dilg.gov.ph` — 200; project-monitoring portal, no public contact
  directory.
- `region2.dilg.gov.ph` — 200; search yields no results via plain GET (JS-driven).
- `officialgazette.gov.ph/911/` — HTTP 500, then 404 on retry (path does not
  exist); `/?s=911` search worked and led to S7.
- `quirinoprovince.gov.ph/?s=hotline|rescue|police` — 200, "0 articles".
- `quirinoprovince.gov.ph/?s=hospital` — only Diffun District Hospital
  procurement posts; no Quirino Provincial Hospital or Maddela District Hospital
  contacts.
- `quirinoprovince.gov.ph/bac-post/*` — HTTP 500 (site defect).
- `redcross.org.ph/chapters/` and `/red-cross-chapters/` — 404; no Quirino
  chapter contact published.
- Wayback CDX for `maddela-quirino.gov.ph` PDFs — only 1987–1993 ordinances; no
  charter/contact PDFs.
- DuckDuckGo HTML — HTTP 202 rate-limit on later queries (incl. retry).
- Bing — anti-bot wall, zero parseable results.

## Evidence gaps

Unverifiable from public web sources in this session; stay "unavailable" or await
direct confirmation:

- Maddela MHO/RHU, MSWDO, Municipal Treasurer, MPDC, Municipal Engineering, SB
  Secretary, Tourism, Agriculture offices — no published contacts found.
- Vice Mayor / Sangguniang Bayan office contact — not found.
- Quirino Provincial Hospital and Maddela District Hospital — no official contact
  found (aggregator lead only).
- Philippine Red Cross Quirino chapter — no published contact found.
- Current (2026) validity of every archived LGU contact — site unreachable;
  requires re-verification.

## Verdict

- Nothing in this file is cleared for publication as-is.
- The provincial records (S1, S2) and national records (S6, S8) come from live
  official sources and satisfy the ordinary evidence gate, but any row that is
  emergency/safety-critical still needs direct confirmation before publication.
- The Maddela LGU rows come from 2023 archive captures of the official site: they
  are genuine LGU publications, but currency is unproven. Emergency rows (PNP,
  BFP, LDRRMO) must be directly confirmed before publication; the ordinary rows
  need a currency re-verification pass once the site is reachable or through an
  official channel.
- The Facebook lead and the aggregator hospital number must not be published.
