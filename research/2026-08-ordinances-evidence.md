# BetterMaddela evidence research: Sangguniang Bayan ORDINANCES AND RESOLUTIONS of Maddela, Quirino

- Prepared by: ox-alpha civic research agent (evidence research only)
- Retrieval date: 2026-08-26 (all fetches this date unless stated otherwise)
- Question: Are any Maddela municipal ordinances or resolutions publicly accessible ONLINE, at a quality suitable for a browsable legislation corpus?
- Relationship to existing notes: extends `research/2026-08-legislation-archive.md` (cutoff 2026-08-23), which reached the same conclusion from a wider surface sweep (COA, eJournal/eLibrary, DILG R2 news page 1, provincial transparency/downloads pages). This file records fresh attempts plus newly identified access points.

## BOTTOM LINE

**No. Essentially nothing is verifiable online.** As of retrieval date:

- **Zero** full-text Maddela municipal ordinances or resolutions were found on the open web.
- **Zero** individual ordinances could be identified by number, title, or date from any online source — not even for well-known topic areas (curfew, plastic ban, tourism/ecotourism fees, traffic code).
- The official LGU's online presence is a **Facebook page whose posts cannot be read anonymously**, and **no confirmed working official municipal website domain exists**.
- This is a valid, evidence-backed finding: Maddela's Sanggunian measures are effectively **not published online in any verifiable form**. A browsable legislation corpus cannot be seeded from web sources alone; it requires direct requests to the SB Secretariat / Municipal Vice Mayor's office (see EVIDENCE GAPS).

Per the data contract, absence of publication is recorded honestly ("Local archive unavailable" remains correct); no candidate ordinance record is proposed because no source met even the minimum identification threshold, let alone the signed-document gate.

## FINDINGS BY SEARCH ANGLE

### Angle 1 — Official Municipality of Maddela website / Facebook page

**Website: NO WORKING OFFICIAL DOMAIN FOUND (conflict noted).**
- `https://maddela.gov.ph/` → connection failure on 2026-08-26. Prior session (2026-08-23) also logged DNS resolution failures for `maddela.gov.ph`, `www.maddela.gov.ph`, and `maddelaquirino.gov.ph`.
- `maddela-quirino.gov.ph` → TLS certificate trust failure; answering 403 Forbidden even with certificate validation bypassed solely to identify the host (prior-session observation). **Domain ownership unverified; must NOT be treated as an official LGU source.**
- Source authority: n/a — no content retrieved. Weakness: inability to resolve may be network-side; a human check from an unrestricted connection is still worthwhile.

**Facebook: OFFICIAL PAGE EXISTS BUT IS UNREADABLE ANONYMOUSLY.**
- Bing listings identify "**Municipal Government of Maddela | Maddela**" at `facebook.com/BayanNg Maddela Opisyal` (slug appears as `BayanNgMaddelaOpisyal`), ~18,328 likes, described as "Municipality of Maddela, a vivid first class…". There is also "Lakbay Maddela – Maddela Tourism, Culture & the Arts" (activity observed Aug 2026).
- Direct fetches on 2026-08-26: desktop URL returned an empty JS shell; `mbasic.facebook.com/BayanNgMaddelaOpisyal` returned Facebook's "not available on this browser" error. **No posts could be read; whether the page ever posts ordinances, resolutions, or SB minutes is UNKNOWN — not evidence either way.**
- Authority if readable would be high (official LGU page) but social posts without attached signed documents would still fail the publication gate.
- Weakness: slug spelling taken from a search-engine listing, not confirmed against the LGU; page identity should be verified via a human-logged-in session before citing it as the official channel.

### Angle 2 — DILG Full Disclosure Policy Portal (FDPP)

- Portal reachable (`https://fdpp.dilg.gov.ph/`, HTTP 200) on 2026-08-26. It advertises "14 core documents" that LGUs must post — these are **financial/spending disclosures, not ordinances**; the FDP does not require posting legislation.
- The DOCUMENT REPORTS index is a JavaScript application gated behind `/user/login`; anonymous cascading endpoints returned HTTP 302 with unusable Location (observed 2026-08-23, unchanged portal design 2026-08-26). Whether FDPP holds *any* Maddela items remains **UNKNOWN** (not evidence of presence or absence).
- Authority: high when accessible (DILG-run national portal), but (a) it is login-gated to anonymous visitors, and (b) its scope is budget/finance documents owned by the parallel budget-finance handoff — not an ordinances repository.
- Note: under the FDP regime many LGUs historically posted "budget-related" ordinances (annual budget, revenue code) as part of the required set; if a Maddela annual-budget ordinance PDF ever existed on FDPP, it is behind the same login wall.

### Angle 3 — Regional/national media (BenarNews, PIA Region 2, Quirino local news)

- Bing News (functional this session, unlike Bing's web vertical): 
  - `"Maddela" "ordinance" Quirino` → **zero results** (explicit "We didn't find any results").
  - `Maddela "Sangguniang Bayan"` → **zero results**.
  - `Maddela tourism fee Quirino` → **zero results**.
  - Broad `Maddela Quirino ordinance` → only unrelated stories: a murder-suspect arrest (RMN), a PIA story on DILG Quirino confirming SBDP farm-to-market road compliance (infrastructure, not legislation), a DPWH water-treatment plant story (SMNI), and a GMA weather-damage story. **None mentions any ordinance or resolution.**
- BenarNews site search (`benarnews.org/english/search/?q=Maddela`) returned only a navigation shell with no listed results — weak negative; BenarNews covers security/Mindanao topics and is an unlikely venue regardless.
- PIA main-site search endpoints returned HTTP 403 to automated fetching on 2026-08-26; PIA Region 2 content could not be swept directly. Weakness: PIA Cagayan Valley articles about LGU events do exist (one appeared in Bing News), so manual browsing of PIA R2 pages by a human is still an open lead.
- Authority: media reports can identify ordinance titles/numbers but are secondary sources; they would still require the underlying text. None was found.

### Angle 4 — Lawphil / Supreme Court / DILG databases

- Lawphil: no Maddela municipal ordinance surfaced via any query this session. Lawphil's corpus is national statutes, administrative issuances, and jurisprudence; municipal ordinances are generally outside its scope. **No Maddela citation found = consistent with absence, but search-engine unreliability limits confidence.**
- Supreme Court E-Library (`elibrary.judiciary.gov.ph`): homepage reachable, but search is JS-only for anonymous users (observed 2026-08-23; not re-probed today). Court citations naming a Maddela ordinance remain **unsearchable remotely this session**.
- DILG Region 2 (`region2.dilg.gov.ph`): news page 1 of 71 reviewed 2026-08-23 with no Maddela legislative items; anonymous Joomla site-search redirects home. Deeper archive requires paginated human review.
- COA audit reports (which sometimes cite municipal revenue ordinances): `coa.gov.ph` returns HTTP 403 to automated clients (both sessions). Unreachable.

### Angle 5 — Known-topic ordinances (curfew, Siitan River / Nhawhal Falls eco-tourism fees, plastic ban, traffic code)

- Targeted Bing News/web queries on curfew, plastic, tourism fee, `"Siitan River" OR "Nhawhal Falls"` entrance fees returned **no result naming any Maddela ordinance number, title, or date**. (The quoted-landmark web query returned pure junk results — see access limits.)
- The provincial tourism page (`quirinoprovince.gov.ph/tourism/municipality-of-maddela`) describes Governor's Rapids and other attractions but **states no fees backed by any cited ordinance**. Fee amounts circulating in travel content therefore have **no verifiable legal basis online** and must not be published on BetterMaddela without the underlying revenue/tourism-code text.
- Conclusion for this angle: topics are plausible subjects of Maddela legislation (nearly all Philippine municipalities legislate on curfew/plastics/tourism fees), but plausibility is not evidence. **Not one specific instrument is identifiable online.**

## CANDIDATE ORDINANCE / RESOLUTION RECORDS

| # | Number | Title/subject | Date passed | Status | Effect | Source URL | Authority |
|---|--------|---------------|-------------|--------|--------|-----------|-----------|
| — | NONE FOUND | — | — | — | — | — | — |

No online source provided even a numbered citation to a single Maddela municipal ordinance or resolution, across all five angles and both sessions (2026-08-23, 2026-08-26).


## ACCESS LIMITS ENCOUNTERED (2026-08-26 session)

- Bing **web** vertical: returned identical canned/junk result sets regardless of query (e.g., calculator sites for a Siitan River query) — output unusable for discovery. Bing **news** vertical worked normally.
- DuckDuckGo HTML and Lite endpoints: bot CAPTCHA challenge both times.
- Google: anti-bot interstitial; Mojeek: HTTP 403.
- `pia.gov.ph` search/article endpoints: HTTP 403 to automated client.
- Facebook (www and mbasic): login/browser walls; posts unreadable anonymously.
- `fdpp.dilg.gov.ph` document index: login/JS-gated; anonymous enumeration fails (HTTP 302).
- `coa.gov.ph`: HTTP 403 (prior session; not re-probed).
- `elibrary.judiciary.gov.ph`: JS-only search (prior session; not re-probed).

## SOURCES

1. Bing News search results, queries `"Maddela" "ordinance" Quirino`, `Maddela "Sangguniang Bayan"`, `Maddela tourism fee Quirino`, `Maddela Quirino ordinance` — https://www.bing.com/news/search?q=... — retrieved 2026-08-26. Zero ordinance-related hits; broad query returned four unrelated news items (RMN, PIA, SMNI, GMA).
2. Bing web search listing identifying the official Facebook page "Municipal Government of Maddela | Maddela" (`facebook.com/BayanNg Maddela Opisyal`) and "Lakbay Maddela" tourism page — retrieved 2026-08-26. Secondary identification only; page contents unreadable.
3. `https://www.facebook.com/BayanNg Maddela Opisyal` and `https://mbasic.facebook.com/BayanNgMaddelaOpisyal` — fetched 2026-08-26 — empty shell / browser-error page. Negative-access record only.
4. `https://maddela.gov.ph/` — connection failure 2026-08-26; corroborates DNS-failure log of 2026-08-23 in `2026-08-legislation-archive.md`. No official municipal website confirmed to exist.
5. DILG Full Disclosure Policy Portal — https://fdpp.dilg.gov.ph/ — retrieved 2026-08-26 (home page) and 2026-08-23 (index/login behavior). Financial-disclosure scope; document index login-gated; Maddela coverage UNKNOWN.
6. Provincial Government of Quirino — MUNICIPALITY OF MADDELA tourism page — https://quirinoprovince.gov.ph/tourism/municipality-of-maddela — retrieved 2026-08-26. Tourism descriptions with no ordinances or ordinance-backed fees cited.
7. Provincial Government of Quirino — LEGISLATIVE OFFICIALS page — https://quirinoprovince.gov.ph/legislative — retrieved 2026-08-26. Lists Vice Gov. Julius Caesar S. Vaquilar and SP members only; no SP review/approval tracker for municipal ordinances.
8. Wikipedia, "Maddela" (revision dated 2026-04-02) — https://en.wikipedia.org/wiki/Maddela — retrieved 2026-08-26. No ordinance/resolution citations anywhere in body or references (references are PSA, Comelec, DepEd, LWUA statistical sources).
9. BenarNews site search — https://www.benarnews.org/english/search/?q=Maddela — retrieved 2026-08-26. Navigation shell only; no results listed (weak negative).
10. Prior handoff (context, not new evidence): `research/2026-08-legislation-archive.md`, prepared 2026-08-23 — documents COA 403, eJournal/eLibrary gating, DILG R2 news page-1 review, provincial transparency/downloads review, and FDPP login gating; outcome then was likewise ZERO candidate records.

## EVIDENCE GAPS — what is NOT online and needs direct owner request

Nothing Maddela-specific is obtainable online; the following all require off-web acquisition:

1. **SB Maddela ordinance and resolution series (any year)** — full texts, numbers, dates, effectivity clauses. Request from: Office of the Sangguniang Bayan Secretariat / Office of the Municipal Vice Mayor, Municipality of Maddela, Quirino. Ask for the codified ordinance index and certified copies.
2. **SB session journals/minutes** — no online access point discovered on any checked surface. Same office; request public-access rules first.
3. **Sangguniang Panlalawigan review actions on Maddela ordinances** (approval/disapproval under the LGC) — the provincial website publishes no SP action tracker; request review-action indexes from the Office of the Secretary to the Sangguniang Panlalawigan, Provincial Capitol, Cabarroguis.
4. **Known-topic instruments needing confirmation**: curfew ordinance; plastic/regulation ordinance; tourism and ecotourism fee ordinance covering Siitan River / Nhawhal Falls / Governor's Rapids; traffic or tricycle franchise code; revenue code (relevant to every fee the site might publish). None is identifiable online; each fee/rule on BetterMaddela stays "unavailable" until its text is in hand.
5. **FOI route**: eFOI covers national government; municipal SB records are best obtained by written request to the Municipal Mayor's Office / SB Secretariat citing the Local Government Code's public-records provisions and the municipality's own Citizen's Charter procedure.
6. **FDPP holdings**: whether any Maddela documents exist there is unknown; a human maintainer with an account (respecting portal terms) should enumerate them — though any hits will be budget-domain, not ordinances.
7. **Official online presence verification**: confirm the true official Facebook page (slug above is search-engine-derived) and whether the LGU maintains any website at all, including the ownership question around `maddela-quirino.gov.ph` — do not cite that host without verified ownership.

**Explicit statement for the record:** after two sessions (2026-08-23 and 2026-08-26) covering the LGU's own channels, the DILG FDP portal, provincial government pages, national/legal databases, and regional media, **no Maddela municipal ordinance or resolution has been verified as publicly accessible online in any form** — not as full text, not as an official announcement with attachment, and not even as a numbered secondary citation. Search-engine blocking (Bing web junk, DDG CAPTCHA, Google/Mojeek/PIA 403s) weakens confidence in absolute absence, but every functional channel checked also returned nothing. The honest corpus state is: **Local legislation archive unavailable — records must be requested directly from the Sangguniang Bayan of Maddela.**

