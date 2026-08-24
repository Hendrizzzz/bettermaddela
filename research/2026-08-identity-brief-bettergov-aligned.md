---
title: "BetterMaddela — Maddela Identity Research & Creative Product Brief"
project: "Hendrizzzz/bettermaddela"
branch: "feat/pre-release-polish"
research_date: "2026-08-25"
purpose: "Research corpus and creative context for making BetterMaddela feel unmistakably Maddela while remaining an independent Better LGU digital-transparency portal."
status: "Research input — NOT production civic data"
---

# BetterMaddela — Maddela Identity Research & Creative Product Brief

> **Read this before designing or editing BetterMaddela.**
>
> This document is deliberately **not a pixel specification** and **not a list of exact components to build**. It is a researched identity corpus, data-acquisition map, current-site diagnosis, and set of creative constraints.
>
> Use it to understand **what Maddela is**, **what information residents can actually benefit from**, **why the current site can still feel inherited/template-like**, and **what raw material is available to make the product locally specific**.
>
> The implementation model/designer should inspect the current repository, `AGENTS.md`, the data contract, and the actual branch before deciding how the site should look or behave. **Be creative. Do not mechanically implement every idea in this file.**
>
> The goal is not to make a prettier generic government website. The goal is to make an independent **Better LGU digital-transparency portal** whose structure, rhythm, vocabulary, data, interactions, and visual atmosphere could plausibly belong to **Maddela, Quirino and nowhere else**.

The BetterGov.ph / Better LGU mission is the product's backbone. Local identity is the differentiator layered on top of that mission, not a replacement for it.

---

# 0. BetterGov.ph / Better LGU alignment guardrail

This section has priority over the creative identity sections below when interpreting this research brief.

The Better LGU Directory's current guide defines a Better LGU portal as an **independent, publicly accessible digital transparency portal** that makes local-government information easy for citizens to find and understand.

The guide explicitly names the core information areas:

1. **Officials**
2. **Budget / financial information**
3. **Projects**
4. **Ordinances and resolutions**
5. **Contact information**

Source:
- https://github.com/jmacj/better-lgu-directory/blob/main/GUIDE.md

BetterMaddela may go substantially beyond those five areas. Barangays, agriculture, local geography, education, weather, culture, current notices, services, tourism/place context, search, maps, data stories, and other locally useful information can make BetterMaddela much better.

But they are **extensions of the transparency mission**.

They must not cause a redesign to:

- hide or demote officials;
- hide or demote budget/financial disclosure;
- hide or demote public projects/procurement;
- hide or demote ordinances/resolutions;
- hide or demote public contact information once verified;
- present tourism or lifestyle material as the primary reason the portal exists;
- make the site look like an official LGU website;
- trade source clarity for visual polish.

A useful mental model:

> **Transparency spine + Maddela identity + resident utility.**

The spine makes it a Better LGU portal.
The local identity makes it BetterMaddela.
The resident utility makes it worth returning to.

## 0.1 There is no required BetterGov visual template

The Better LGU guide explicitly allows maintainers to:

- use a community starter template and customize it; or
- build a portal from scratch.

Therefore, **visual originality and significant UX restructuring are compatible with the initiative**.

The implementation model should not preserve inherited BetterLGU styling merely because it came from a community template.

Source:
- https://github.com/jmacj/better-lgu-directory/blob/main/GUIDE.md

## 0.2 The directory itself rewards LGU-specific identity

The current Better LGU Directory crawler contains a quality floor for its Featured Portal pool.

It rejects BetterGov's unchanged generic template title/description and explains in code that a portal can be mechanically complete yet still fail to be sufficiently **about the LGU**.

It expects, for Featured eligibility:

- a non-boilerplate LGU-specific title;
- a non-boilerplate LGU-specific description;
- an `og:image`;
- the `og:image` to be fetchable as an image;
- the `og:image` to stay under the crawler's current 400 KB ceiling;
- the portal not to block the Better LGU Directory bot through a blanket `robots.txt` rule.

Source:
- https://github.com/jmacj/better-lgu-directory/blob/main/scripts/crawl-lgu-meta.js

This is a technical confirmation that BetterMaddela should develop its own identity rather than merely recolor generic BetterGov material.

## 0.3 Directory status and launch semantics

The directory currently defines:

- `🔵 Planned` — intended but development not started;
- `🟡 Work in Progress` — actively building, not yet launched;
- `🟢 Active` — publicly launched and actively maintained;
- `🔴 Unmaintained` — previously active but no longer maintained.

BetterMaddela is currently listed as **Work in Progress**, which is appropriate while the project is pre-release.

Do not tell an implementation model to present the portal as launched/active merely because a Vercel preview exists.

Sources:
- https://github.com/jmacj/better-lgu-directory
- https://github.com/jmacj/better-lgu-directory/blob/main/CONTRIBUTING.md

## 0.4 Domain convention

The Better LGU guide recommends the convention:

`better[lguname].org`

For this project, the convention would be:

`bettermaddela.org`

This is a BetterGov community recommendation rather than a technical requirement for development previews. A Vercel domain is fine while the directory entry is Work in Progress.

Source:
- https://github.com/jmacj/better-lgu-directory/blob/main/GUIDE.md

## 0.5 Core transparency routes are protected product capabilities

The current BetterMaddela branch already contains important Better LGU-aligned foundations:

- `/government` — dated leadership / officials data;
- `/budget` — source-linked financial disclosures and procurement;
- `/legislative` — ordinances/resolutions archive state and legal history;
- `/contact` — source/correction channel and intentionally withheld unverified municipal contacts.

The redesign may rethink their presentation, relationships, and navigation.

It should **not remove their transparency purpose**.

---

# 1. The product thesis

BetterMaddela should feel like:

- first, an **independent Maddela digital-transparency portal in the Better LGU tradition**;
- second, a **local civic companion for Maddela**;
- a place where a resident can understand the municipality without digging through scattered agency pages;
- useful enough for everyday resident questions, not merely a municipal brochure;
- modern, clean, interactive, low-friction, and mobile-first;
- rich in **Maddela-specific context** without becoming a tourism website;
- trustworthy without looking cold, bureaucratic, or like a source-database viewer;
- clearly independent rather than a clone of a `.gov.ph` portal;
- alive to the municipality's **barangays, farms, river, roads, livelihoods, education, public projects, services, culture, and current public information**.

A useful test:

> If every visible occurrence of the word **Maddela** were replaced with another municipality name, would most of the site still make sense?

If the answer is yes, the experience is still too template-like.

A stronger target:

> A visitor should be able to recognize that the product is about Maddela even before reading the municipality name, because the information hierarchy, examples, visual language, geographic references, current data, and microcopy are locally grounded.

---

# 2. Current branch audit: why it can still feel like a template

## 2.1 This is partly architectural, not just aesthetic

The current architecture explicitly says:

- the app is a pre-release static civic-information site;
- the **upstream interface and route compositions are intentionally preserved**;
- inherited municipal facts and branding were replaced with reviewed Maddela data;
- the site remains a Next.js static export with no runtime civic backend.

Source:
- https://raw.githubusercontent.com/Hendrizzzz/bettermaddela/refs/heads/feat/pre-release-polish/docs/architecture/ARCHITECTURE.md

This was a sensible safety strategy while purging inherited content, but it also explains the current identity ceiling. The shell can be technically correct yet still carry the spatial and interaction grammar of the upstream project.

## 2.2 The CSS literally confirms the inherited visual system

The first lines of the branch's `src/app/globals.css` say:

> `/* The upstream BetterLGU visual system is loaded from /public/assets/css. */`

and then:

> `/* Small, BetterMaddela-specific extensions to the inherited homepage system. */`

Source:
- https://raw.githubusercontent.com/Hendrizzzz/bettermaddela/refs/heads/feat/pre-release-polish/src/app/globals.css

This is the clearest technical explanation for the "template" feeling. BetterMaddela-specific styling currently sits on top of a largely inherited system rather than owning a complete local visual language.

## 2.3 The information architecture is still generic civic taxonomy

The current route set includes the expected broad civic sections:

- services
- barangays
- government
- legislative
- budget
- statistics
- population
- news
- contact
- FAQ
- legal history
- sources
- privacy/security/accessibility/etc.

That is reasonable for civic coverage, but by itself it does not express Maddela.

The current services directory uses broad categories such as:

- Agriculture & Economic Development
- Business, Trade & Investment
- Certificates & Vital Records
- Education & Scholarship
- Environment & Natural Resources
- Health Services
- Infrastructure & Public Works
- Public Safety & Security
- Social Services & Assistance
- Taxation & Payments

Source:
- https://raw.githubusercontent.com/Hendrizzzz/bettermaddela/refs/heads/feat/pre-release-polish/src/app/services/page.tsx

Those categories could belong to almost any Philippine municipality. They are useful classification labels, but they do not automatically create a local experience.

## 2.4 The barangays exist in the data, but are not yet an identity system

The barangay page currently presents the 32 barangays mainly as a grid of linked names.

Source:
- https://raw.githubusercontent.com/Hendrizzzz/bettermaddela/refs/heads/feat/pre-release-polish/src/app/barangays/page.tsx

The site already has the foundation for something far more locally powerful: every service, project, place, notice, institution, statistic, road story, agriculture story, and community feature can potentially become **geographically legible through barangays**.

Maddela is not just one municipal center with 32 administrative labels. Public sources show a municipality whose daily life is distributed across rural barangays, farm roads, schools, fields, river corridors, sitios, tourism areas, and two urban-classified poblaciones.

## 2.5 The statistics page is one of the stronger local pieces

The current statistics page is already more specific and interpretive than a generic municipal dashboard. It includes:

- population and household metrics;
- population history;
- growth-rate interpretation;
- poverty estimates with uncertainty language;
- all-barangay population ranking;
- the distinction between rural and urban-classified barangays;
- careful source metadata.

Source:
- https://raw.githubusercontent.com/Hendrizzzz/bettermaddela/refs/heads/feat/pre-release-polish/src/app/statistics/page.tsx

This is a good signal: BetterMaddela becomes more distinctive when it **interprets Maddela's data rather than merely storing it**.

The challenge is to spread that same local intelligence through the rest of the product.

## 2.6 Trust is strong; personality is weaker

The repository's strongest existing product quality is provenance discipline.

`AGENTS.md` correctly requires:

- no invented civic facts;
- no fake contacts/hotlines;
- changing facts only after source/freshness/risk verification;
- emergency information to meet the highest threshold;
- external research and scraping to remain evidence inputs until reviewed;
- no implication that BetterMaddela is official;
- no fake transactions/payments/bookings;
- accessibility, privacy, and security as release requirements.

Source:
- https://raw.githubusercontent.com/Hendrizzzz/bettermaddela/refs/heads/feat/pre-release-polish/AGENTS.md

Do **not** weaken any of this in the name of local identity.

Instead, make provenance feel like a subtle layer underneath a confident place-centered product rather than the dominant visible personality of the interface.

---

# 3. The Maddela identity: the strongest evidence-backed themes

This section is not a branding mandate. It is a set of locally specific signals the design model can interpret.

## 3.1 A municipality that is overwhelmingly rural in its barangay structure

The Philippine Statistics Authority lists:

- municipality: Maddela
- PSGC: `0205704000`
- income class: 1st
- 2024 POPCEN population: **41,867**
- barangays: **32**

Only:

- Poblacion Norte
- Poblacion Sur

are classified as urban in the PSA barangay table.

Their combined 2024 population is 5,105, about **12.2%** of Maddela's 41,867 population. The rest of the population is in rural-classified barangays.

Primary source:
- https://psa.gov.ph/classification/psgc/barangays/0205704000

Implication for product identity:

**Maddela should not feel like a municipal-hall website whose mental model ends in Poblacion.**

The wider barangay network is the municipality.

## 3.2 Agriculture is not a decorative theme — it is a structural part of Maddela's identity

The Provincial Government of Quirino describes Maddela as a major agro-industrial hub associated with:

- corn
- palay
- peanut
- banana
- cassava

and calls it the province's **"Commercial Growth Center."**

Source:
- https://quirinoprovince.gov.ph/tourism/municipality-of-maddela/

An older Maddela Local Investments and Incentives Code (Ordinance No. 2016-27) lists agriculture-related priority activity including:

- corn
- peanut
- cassava
- banana
- root crops
- coffee
- cacao
- vegetables
- fruits
- agri-processing
- feed mills
- cold storage
- nurseries
- markets/trading centers
- training/demo centers
- packaging
- post-harvest facilities
- irrigation
- agri-tourism

Research source:
- https://staging-invest.rdc2.gov.ph/wp-content/uploads/2024/07/Maddela-LIIC.pdf

**Important:** this 2016 ordinance is historical/currentness-sensitive. Treat it as evidence of economic orientation and a research lead, not proof that every listed priority remains current in 2026.

A 2025 PIA feature on the Lusod Integrated National Irrigation Project describes Maddela farmers as historically reliant on corn and describes planned irrigation support for 1,046 hectares and 685 farmer-beneficiaries.

Source:
- https://pia.gov.ph/news/lusod-irrigation-project-quirinos-dream-of-a-greener-future/

This gives the product more than "use farm colors." It gives BetterMaddela a real civic frame:

- harvest and planting cycles;
- irrigation;
- market access;
- price information;
- farm-to-market roads;
- weather;
- programs for farmers;
- local agriculture services;
- barangay-level infrastructure;
- changing crop/livelihood conditions.

## 3.3 The river–limestone–forest landscape is a real visual signature

The Provincial Government of Quirino identifies Governor's Rapids in Barangay Divisoria Sur as a stretch of the Cagayan River characterized by:

- blue water;
- white limestone walls;
- rapids;
- boatmen/`bugadors`;
- caves and waterfalls;
- views toward the Sierra Madre.

The same provincial source identifies:

- Maddela Eco-Tourism Park in Dumabato Sur;
- the seven-tier Maddela Waterfalls;
- Maria Angela Falls in Jose Ancheta;
- portions of Maddela within the broader protected landscape context.

Source:
- https://quirinoprovince.gov.ph/tourism/municipality-of-maddela/

The current repo also correctly keeps a legal distinction between the Quirino Protected Landscape's total area and Maddela's municipal land area.

These are strong raw materials for visual identity because they are not generic "green government" imagery. Maddela has a specific combination:

**river + limestone + forest + cultivated land + rural road + mountain horizon.**

## 3.4 Panagsasalog is a deeper identity clue than a festival banner

The Provincial Government of Quirino says Panagsasalog dramatizes the traditional routine of Maddela farming communities leaving home at dawn, working on farms, and returning at night. It says the name comes from the Ilocano term `salog`, described there as "going to the farms," and connects the festival with communal planting/harvest work and gratitude.

Source:
- https://quirinoprovince.gov.ph/tourism/municipality-of-maddela/

The provincial page says the festival is held **June 12–15**. A 2024 "Maddela Tourism" video is consistent with a mid-June town fiesta.

However, annual festival schedules are time-sensitive.

Use **Panagsasalog as a cultural identity reference**, but confirm each year's exact program and dates before publishing a "current event" schedule.

What is more interesting for design than the date is the rhythm embedded in the idea:

- dawn;
- movement from home to farm;
- work;
- planting;
- harvest;
- community;
- return;
- gratitude.

That rhythm can inform storytelling or interaction without literally turning the interface into a festival poster.

## 3.5 Maddela has a living higher-education and skills identity

Quirino State University has a Maddela Campus in Dipintin.

Current QSU pages list Maddela-campus undergraduate programs including:

- Bachelor of Science in Agriculture;
- Bachelor in Technology and Livelihood Education;
- Bachelor of Science in Hospitality Management.

QSU also reports current accreditation periods for those programs.

Sources:
- https://qsu.edu.ph/info/program-offerings/
- https://qsu.edu.ph/info/accredited-programs/

TESDA Quirino also lists QSU Maddela as a training/assessment location for several TVET programs.

Source:
- https://sites.google.com/tesda.gov.ph/tesdaquirino/qsu-maddela

This means "Maddela today" is not only farming and scenery. It also includes:

- students;
- vocational skills;
- agriculture education;
- hospitality;
- local youth;
- training and employment pathways.

## 3.6 Public-service modernization is happening in small, concrete ways

Recent sources show useful local civic stories:

### APCAS civil registration
In July 2026, PSA Quirino and the Local Civil Registry Office of Maddela launched the Administrative Petition for Correction Automated System (APCAS).

Source:
- https://rsso02.psa.gov.ph/content/apcas-goes-live-municipality-maddela

### Business One Stop Shop
A January 2026 PIA report describes Quirino's BOSS period and specifically quotes a Negosyo Center Maddela representative. It describes a one-stop setup involving BPLO and partner agencies and explains how business registration/renewal is coordinated.

Source:
- https://pia.gov.ph/news/luzon/cv/from-long-lines-to-one-stop-easing-business-in-quirino/

### Barangay service delivery
An August 5, 2026 PIA article describes Barangay San Pedro receiving resources intended to improve grassroots service delivery, including mobility and information-sharing.

Source:
- https://pia.gov.ph/news/every-barangay-matters-san-pedro-maddela-turns-national-assistance-into-better-grassroots-services/

### CBMS
PSA has reported Community-Based Monitoring System work and data turnover/convening with LGU Maddela.

Sources:
- https://rsso02.psa.gov.ph/content/psa-quirino-conducts-2024-cbms-data-turnover-lgu-maddela
- https://rsso02.psa.gov.ph/statistics/cbms/node/1684060595

**Critical privacy note:** the existence of CBMS data does **not** mean BetterMaddela should ingest household-level CBMS records. Any use must be limited to properly released, public, aggregate statistics with clear legal and privacy basis.

## 3.7 Road access is a civic story, not just an infrastructure category

A PIA feature on Barangay Sto. Niño describes how a farm-to-market road changed access to:

- markets;
- schools;
- hospitals;
- buyers;
- delivery;
- transportation.

It also describes the problem of roads becoming difficult or cut off during Cagayan River flooding.

Source:
- https://pia.gov.ph/features/from-mud-to-hope-how-quirinos-new-road-changed-villagers-lives/

This is valuable UX research.

A generic site says **Infrastructure & Public Works**.

A locally intelligent civic product understands that infrastructure can mean:

- "Can produce get to market?"
- "Can a tricycle reach us?"
- "Can a student get to school?"
- "Can an emergency vehicle pass?"
- "What project is being built in my barangay?"
- "What stage is it at?"
- "Who funds it?"
- "When was the source last updated?"

The implementation model can decide how to translate that understanding into product experience.

## 3.8 Maddela is part of a current regional agricultural price-monitoring context

The Department of Agriculture Cagayan Valley's Daily Price Index page for June 28, 2026 says Maddela and Cabarroguis were among the Quirino municipalities included in selected retail-market monitoring covering 220 agricultural commodities.

Source:
- https://cagayanvalley.da.gov.ph/2026/06/28/daily-price-index-june-28-2026/

This is especially interesting for an independent civic app because it points toward **resident-useful, local, changing data** that is not the usual government-homepage content.

Do not assume the same table/coverage is continuously available or that automated republication is licensed identically on every embedded source. Investigate the source format, update cadence, attribution requirements, and machine-access conditions before integration.

## 3.9 Food is connected to river ecology and local life

The Provincial Government's Maddela tourism page describes food around Governor's Rapids made from local freshwater catch, including:

- kanduli;
- igat;
- burasi;
- balanban;
- ikan;
- freshwater shrimp locally called `lasik`.

It also documents broader Ilocano/Cagayan Valley food references such as:

- dinengdeng;
- pinakbet;
- dendelot;
- pancit traditions.

Source:
- https://quirinoprovince.gov.ph/tourism/municipality-of-maddela/

This is useful as cultural texture and local vocabulary.

Do **not** treat an old tourism-page restaurant list as a current business directory without checking whether each business still exists and wants to be listed.

## 3.10 Indigenous presence needs respectful, sourced treatment

Multiple sources use different labels and scopes when discussing Indigenous communities in and around Maddela.

The provincial tourism page refers to Agta communities around the limestone/river landscape.

A National Commission on Indigenous Peoples annual report includes an IP-education framework relating to **Agta, Bugkalot, and Kankanaey ICCs/IPs of Maddela, Quirino**.

The current BetterMaddela history text separately attributes an older local-history compilation that refers to Ilongot/Bugkalot and Dumagat communities in the wider historical area.

Research source:
- https://ncip.gov.ph/wp-content/uploads/2024/03/2022-AAR.pdf

This is exactly the kind of subject where a design model must **not invent decorative "tribal" motifs** or flatten distinct communities into a visual aesthetic.

If BetterMaddela eventually develops Indigenous-history, language, or cultural content:

- use community-supported/primary sources;
- preserve the exact terminology used by each source;
- distinguish historical descriptions from current self-identification;
- avoid using sacred or identity-bearing motifs as generic decoration;
- seek direct local/community review for prominent cultural representation.

---

# 4. Maddela's current hard-data skeleton

## 4.1 Municipality

| Field | Current researched value | Source |
|---|---:|---|
| Municipality | Maddela | PSA PSGC |
| Province | Quirino | PSA PSGC |
| Region | Region II / Cagayan Valley | PSA |
| PSGC | 0205704000 | PSA PSGC |
| Income class | 1st | PSA PSGC |
| Population | 41,867 | 2024 POPCEN |
| Barangays | 32 | PSA PSGC |
| ZIP | 3404 | Current BetterMaddela record / PHLPost source gate |

Primary data source:
- https://psa.gov.ph/classification/psgc/barangays/0205704000

PSA says its website data/content is CC BY 4.0 unless otherwise stated. That is a useful reuse basis, but attribution should still be preserved.

## 4.2 All 32 barangays — 2024 POPCEN

| Barangay | Class | Population |
|---|---|---:|
| Abbag | Rural | 951 |
| Balligui | Rural | 2,538 |
| Divisoria Sur | Rural | 1,149 |
| Buenavista | Rural | 1,434 |
| Cabaruan | Rural | 1,916 |
| Cabua-an | Rural | 845 |
| Cofcaville | Rural | 796 |
| Diduyon | Rural | 933 |
| Dipintin | Rural | 3,122 |
| Divisoria Norte | Rural | 666 |
| Dumabato Norte | Rural | 1,528 |
| Dumabato Sur | Rural | 1,484 |
| Lusod | Rural | 2,175 |
| Manglad | Rural | 692 |
| Pedlisan | Rural | 822 |
| Poblacion Norte | Urban | 2,949 |
| San Bernabe | Rural | 1,321 |
| San Dionisio I | Rural | 625 |
| San Martin | Rural | 1,085 |
| San Pedro | Rural | 1,260 |
| San Salvador | Rural | 537 |
| Santo Niño | Rural | 1,195 |
| Santo Tomas | Rural | 623 |
| Villa Gracia | Rural | 904 |
| Villa Hermosa Sur | Rural | 2,412 |
| Villa Hermosa Norte | Rural | 1,739 |
| Ysmael | Rural | 642 |
| Villa Agullana | Rural | 528 |
| Poblacion Sur | Urban | 2,156 |
| Villa Jose V Ylanan | Rural | 582 |
| Jose Ancheta | Rural | 1,235 |
| Santa Maria | Rural | 1,023 |

Source:
- https://psa.gov.ph/classification/psgc/barangays/0205704000

Useful derived context:

- total: 41,867;
- urban-classified barangay population: 5,105;
- urban-classified share: ~12.2%;
- rural-classified share: ~87.8%;
- largest barangay by the 2024 POPCEN table: Dipintin, 3,122;
- next largest: Poblacion Norte, Balligui, Villa Hermosa Sur, Lusod.

These derived values should be labeled **computed from PSA data** if published.

---

# 5. What data BetterMaddela should acquire next

This is the most important section for future scraping/research.

The instruction is **not** "implement all of these." The implementation model should decide which data creates the strongest resident value and local identity under the current architecture.

## 5.1 Identity layer

### A. Barangay profiles

For every barangay, candidate fields:

- canonical name;
- PSGC code;
- rural/urban classification;
- population;
- population reference date;
- geographic polygon or centroid with source/license;
- neighboring barangays;
- major roads;
- waterways;
- public institutions;
- public schools;
- health facilities;
- public markets/trading points;
- verified community facilities;
- current public projects;
- tourism/nature places if applicable;
- local history only where sourced;
- agriculture/livelihood context only where sourced;
- official notices affecting the barangay;
- photo/media rights ledger;
- last verified date.

Why this matters:

The barangay can become a **cross-cutting entity** throughout BetterMaddela instead of a separate static list.

### B. Local geography

Acquire verified, license-safe geospatial data for:

- municipal boundary;
- barangay boundaries;
- major roads;
- Cagayan River;
- significant tributaries;
- public buildings;
- schools;
- health facilities;
- markets;
- transport terminals;
- public project locations;
- major nature/tourism places;
- protected-area overlays where legally and cartographically safe.

Likely source families:

- PSA/PSGC for administrative identity;
- NAMRIA where public/licensed;
- OpenStreetMap under ODbL, with correct attribution and data-use compliance;
- official agency project coordinates;
- DILG/DPWH/NIA published project documents.

**Do not invent municipal-hall or service coordinates from a map search.**

### C. Local visual corpus

Acquire or commission imagery with explicit reuse rights.

A useful media corpus would cover real Maddela, not only tourist hero shots:

- river and limestone;
- farms at different seasons;
- corn/rice/cassava/banana;
- farm roads;
- Poblacion street life;
- public market;
- QSU Maddela;
- barangay halls where rights are clear;
- public service activity;
- irrigation;
- bridges/roads;
- mountains/forest;
- Maddela Waterfalls;
- Governor's Rapids;
- town fiesta/Panagsasalog;
- locally produced food;
- ordinary residents **only with consent and rights**.

For every media asset, store:

- title;
- photographer/creator;
- original URL;
- license;
- permission evidence if needed;
- subject;
- barangay/place;
- date captured if known;
- alt text;
- crop/orientation;
- restrictions;
- whether identifiable people are present;
- review status.

**Do not use Google Images as an asset source.**
Image search is for discovery/reference, not proof of reuse rights.

### D. Local language / microcopy corpus

Do not have a model make up "local-sounding Ilocano."

Acquire a reviewed vocabulary from:

- LGU/local cultural materials;
- provincial tourism material;
- local educators;
- published Ilocano resources;
- community review.

Candidate terms/themes already encountered:

- Panagsasalog
- `salog` (provincial tourism page describes it as "going to the farms")
- `bugador` / `bugadors` for the boatmen described at Governor's Rapids
- `lasik` for local freshwater shrimp in the provincial tourism description
- Pinappagan as a historical name/context, with historical-source caveats

For each term:

- original language;
- spelling;
- meaning;
- source;
- context;
- whether okay for UI use;
- whether it needs attribution/explanation;
- reviewer.

The product can be bilingual without becoming performatively "local."

---

# 6. Resident utility layer

## 6.1 Municipal Citizen's Charter

This is probably the highest-value missing dataset.

The current BetterMaddela repo correctly says detailed requirements, fees, and processing times are not yet verified.

Research did **not** recover a clearly current, complete, indexed Maddela Municipal Citizen's Charter from a first-party municipal source.

This should become a targeted acquisition task.

For every service, extract:

- service name;
- responsible office;
- transaction type;
- who may avail;
- requirements;
- where each requirement comes from;
- fees;
- payment destination;
- processing time;
- steps;
- person/unit responsible by step;
- office location;
- service hours;
- form links;
- legal basis;
- special cases;
- online/offline availability;
- date/version of Citizen's Charter;
- effective date;
- source file;
- page numbers;
- last verified;
- freshness deadline;
- risk classification.

High-value service domains:

- civil registry;
- business permits;
- real property;
- local taxes/fees;
- zoning/locational;
- building/engineering;
- sanitary/health permits;
- agriculture;
- social welfare;
- senior/PWD-related municipal processes;
- employment/PESO;
- environment;
- market/economic enterprise;
- local permits/clearances.

### Do not substitute national Citizen's Charter rules for local requirements

National agencies may explain the legal framework, but BetterMaddela should not infer Maddela's local step sequence, fee, or turnaround from a different municipality.

## 6.2 Office directory

Acquire a current municipal directory with:

- office;
- public-facing function;
- public phone;
- official email;
- physical location;
- service hours;
- head of office only if useful and verified;
- source;
- verification method;
- last verified;
- freshness deadline.

Prefer **office-level contactability** over personality-centered government pages.

## 6.3 Business and entrepreneurship

Recent research says Quirino uses a Business One Stop Shop model during permit-renewal season, and a Negosyo Center Maddela representative described coordinated services.

Source:
- https://pia.gov.ph/news/luzon/cv/from-long-lines-to-one-stop-easing-business-in-quirino/

Acquire:

- current BOSS dates each year;
- BPLO requirements;
- current local fee schedule;
- BFP/DTI/BIR link-outs;
- current office hours;
- business renewal calendar;
- official forms;
- Negosyo Center Maddela public contact;
- BMBE guidance;
- current local investment code if revised;
- business-related ordinances.

Avoid turning BetterMaddela into a stale "how to register" article. This information changes and needs visible effective dates.

## 6.4 Agriculture services

Potential public-service records:

- Municipal Agriculture Office services;
- RSBSA guidance;
- seed/planting material programs;
- livestock/veterinary schedules;
- crop insurance links;
- training;
- DA regional programs;
- farmer organization support;
- NIA irrigation updates;
- farm-to-market road projects;
- crop calendar;
- weather/agri advisories;
- monitored market prices.

Source candidates:
- DA Cagayan Valley
- ATI
- NIA
- Philippine Crop Insurance Corporation
- PIA
- municipal/provincial agriculture releases

## 6.5 Education and skills

Acquire:

- public school directory;
- school locations;
- DepEd announcements relevant to Maddela;
- QSU Maddela programs;
- QSU/TESDA training/assessment opportunities;
- scholarships with current eligibility and deadlines;
- ALS / training resources if public;
- local job fairs and career services.

Do not make scholarship eligibility claims from old announcements.

---

# 7. "Today in Maddela" / live-local layer

This is where an independent civic app can become meaningfully interactive without becoming transactional.

## 7.1 Weather

Current architecture already uses Open-Meteo and references a PAGASA Maddela AWS context.

Potential enhancement data:

- forecast;
- rainfall probability;
- heat index where sourced appropriately;
- severe weather advisory links;
- PAGASA station context;
- sunrise/sunset;
- agricultural weather advisory links.

Do not present third-party forecast data as PAGASA observations.

## 7.2 Public notices

Build a source catalog for:

- PSA Quirino;
- PIA Quirino;
- DILG Region II / Quirino;
- DA RFO 02;
- DMW Region II;
- DOLE;
- DSWD;
- NIA;
- DPWH;
- DENR;
- provincial government;
- verified municipal channels.

For each notice:

- title;
- publisher;
- publication date;
- event/effective date;
- affected barangays;
- topic;
- expiry date if applicable;
- source URL;
- whether the event is confirmed vs planning;
- extracted summary;
- review status.

The distinction between **publication date** and **event date** matters.

## 7.3 Agricultural market prices

DA RFO 02 publishes a Daily Price Index and has included Maddela as a monitored municipality.

Possible fields:

- commodity;
- variety/grade;
- unit;
- market;
- municipality;
- low/high/prevailing price;
- date monitored;
- publisher;
- source file;
- collection methodology if available.

This could provide resident utility that is deeply Maddela-relevant.

First confirm:

- whether the data is consistently structured;
- whether Maddela has a stable market series;
- licensing/republication terms;
- gaps;
- whether prices are retail, farmgate, wholesale, etc.

Never collapse unlike price concepts into one number.

## 7.4 Public-service event calendar

Potential events:

- BOSS;
- job fairs;
- government caravans;
- PSA registration/civil-registry activities;
- agriculture distributions/trainings;
- barangay consultations;
- vaccination/health campaigns;
- scholarship windows;
- festival/town fiesta;
- public hearings.

Fields:

- event title;
- organizer;
- date;
- time;
- venue;
- eligibility;
- documents to bring;
- cost;
- registration requirement;
- affected barangays;
- source;
- source publication date;
- status;
- expiry.

Event records should auto-expire from "current" views.

---

# 8. Transparency and public-project layer

## 8.1 Public projects

Maddela has enough project/infrastructure activity that a locally grounded product could make this area much richer than a generic "Budget" section.

Source families:

- DILG SubayBAYAN / regional project monitoring;
- SGLG Incentive Fund;
- LGSF-SBDP;
- DBM;
- DPWH;
- NIA;
- PhilGEPS;
- municipal procurement;
- provincial government;
- PIA reporting that links back to agencies.

Fields:

- project name;
- project type;
- barangay/s;
- coordinates if official;
- source agency;
- implementing agency;
- contractor where public;
- fund source;
- approved amount;
- contract amount if available;
- start;
- expected completion;
- latest stage;
- progress percentage only if source gives it;
- latest inspection;
- completion status;
- issue/delay note;
- source trail;
- last verified;
- status confidence.

Examples of source-backed local project themes already found:

- Lusod Integrated National Irrigation Project;
- farm-to-market/access roads;
- road projects in San Pedro, Villa Agullana, Manglad;
- barangay-level projects;
- 2025 DILG project-governance recognitions;
- 2026 DILG turnover of infrastructure projects in Quirino including Maddela.

Do not infer "completed" from a procurement award or "ongoing" from an old article.

## 8.2 Procurement

PhilGEPS already exposes current notices naming Municipality of Maddela as procuring entity.

Useful fields:

- reference number;
- title;
- procuring entity;
- solicitation number;
- category;
- procurement mode;
- approved budget;
- date published;
- closing date;
- delivery period;
- status;
- source URL.

Possible resident-friendly interpretation:

- what is being bought/built;
- amount;
- which office/project it supports;
- where;
- stage;
- timeline.

Do not transform procurement data into allegations or performance claims.

## 8.3 Local legislation

Acquire:

- ordinance number;
- resolution number;
- title;
- date approved;
- author/sponsor if useful;
- full text;
- status/repeal/amendment relationships;
- topic;
- affected groups;
- fee/requirement effects;
- source;
- page-level provenance.

Potential source:
- Sangguniang Bayan records;
- DILG/DTI regional investment portals;
- official municipal documents;
- official FOI/public records requests.

A browsable local ordinance corpus would create enormous Maddela specificity.

---

# 9. Culture, history, and place layer

## 9.1 Legal history and local memory must remain separate

BetterMaddela already handles this well.

There is a difference between:

- legally documented milestones;
- local historical compilations;
- oral tradition/folklore;
- institutional tourism storytelling.

Keep those evidence types visibly distinct.

Primary/high-authority legal anchors include:

- Executive Order No. 368, November 11, 1950;
- Republic Act No. 4734;
- Republic Act No. 5554;
- Republic Act No. 6394;
- Batas Pambansa Blg. 345;
- Proclamation No. 548.

Executive Order PDF:
- https://lawphil.net/executive/execord/eo1950/pdf/eo_368_1950.pdf

Senate legislative reference for BP 345:
- https://ldr.senate.gov.ph/legislative-issuance/batas-pambansa-345

## 9.2 Pinappagan

Multiple secondary/local-history sources identify **Pinappagan** as a historical name associated with Maddela.

However:

- exact origin stories differ;
- Wikidata claims are not sufficiently sourced for production;
- local historical compilations need attribution;
- legal documents establish the 1950 reorganization more firmly than they establish every renaming detail.

Use Pinappagan as a researched historical identity lead, not an excuse to invent etymology.

## 9.3 Historical settlements and communities

The existing BetterMaddela history correctly uses cautious language around older local narratives.

Future research should try to recover:

- original local history compilation;
- municipal/provincial archives;
- academic studies;
- NCIP/ancestral-domain materials where public and appropriate;
- community-reviewed Indigenous history;
- early barrio records;
- historical maps;
- old photographs with clear rights.

## 9.4 Local food

Food can create locality without taking over the civic product.

Build a sourced local-food glossary rather than a generic restaurant recommendation list.

For each item:

- local name;
- description;
- source;
- where/context it is documented;
- photo rights;
- whether it is broad Ilocano/Cagayan Valley food or specifically documented in Maddela.

---

# 10. Local UX research questions to answer offline

Web scraping can only go so far.

The fastest way to stop BetterMaddela from feeling like a template is eventually to collect real resident language and behavior.

Interview a small cross-section:

- student;
- farmer;
- market vendor;
- small business owner;
- parent;
- senior;
- barangay staff/member;
- municipal employee if willing;
- tricycle/transport worker;
- person from a farther rural barangay;
- tourism worker/bugador;
- QSU student;
- resident who frequently processes local documents.

Ask questions like:

1. What municipal information do you usually need but struggle to find?
2. Where do you currently get it?
3. What do you message people on Facebook to ask?
4. What do you still have to travel to Poblacion just to confirm?
5. Which requirements/fees/schedules are confusing?
6. Which office names do residents actually use in conversation?
7. What makes a public announcement trustworthy?
8. Which barangay-specific information is useful?
9. What local places, symbols, words, colors, or photographs feel genuinely Maddela rather than "Quirino tourism" generally?
10. What would make a local website feel fake or outsider-made?
11. Which local words are natural in interface copy and which feel forced?
12. Which services are urgent on a phone with weak signal?
13. What information should be printable/screenshot-friendly?
14. What public data would people check repeatedly?
15. What parts of Maddela do online maps regularly get wrong?

The answers should influence structure more than aesthetic trend references.

---

# 11. Creative direction — principles, not prescriptions

The implementation model has creative freedom.

## 11.1 Make locality ambient, not confined to an "About Maddela" page

A template site has one local-history page and generic everything else.

A local product lets Maddela quietly appear across:

- page context;
- labels;
- examples;
- data;
- geography;
- photos;
- current updates;
- barangay references;
- helpful side information;
- transitions;
- search behavior;
- source context.

## 11.2 Let real local data create the UI

Prefer interaction generated by meaningful local information over arbitrary animation.

Possible raw material:

- 32 barangays;
- population differences;
- rural/urban classification;
- project locations;
- service offices;
- weather;
- river/flood context;
- agriculture prices;
- events;
- source freshness;
- road access;
- institutions;
- places;
- timelines.

The implementation model can decide whether this becomes maps, filters, small visualizations, progressive disclosure, cards, a command palette, locality-aware search, or something else.

## 11.3 Identity does not require "government blue"

BetterMaddela is intentionally independent.

Avoid relying on:

- Philippine government portal conventions;
- seal-heavy headers;
- generic navy/blue civic templates;
- ceremonial government language;
- "Official Portal" presentation;
- fake online transaction affordances.

The independent identity can be contemporary and calm while still trustworthy.

## 11.4 Natural visual vocabulary — without becoming a resort website

Observed Maddela visual cues:

- deep forest;
- cultivated green;
- corn/rice gold;
- limestone/off-white;
- river blue/green;
- earth;
- mist/horizon;
- road and river lines;
- field geometry;
- water movement;
- dawn light.

These are **source materials**, not a mandatory palette.

The model should choose a system that supports:

- legibility;
- accessibility;
- civic trust;
- local distinctiveness;
- restrained visual richness.

## 11.5 Do not over-romanticize rural life

Avoid turning farmers, Indigenous communities, or barangays into decorative "authenticity."

Maddela's rural character should show through **useful information and real representation**, not nostalgia.

## 11.6 Do not turn the site into tourism marketing

Nature and food are important identity signals, but residents need:

- services;
- projects;
- contacts;
- requirements;
- notices;
- agriculture info;
- public data;
- school/training info;
- transparent source trails.

Utility first. Place identity makes the utility feel native to Maddela.

## 11.7 Make evidence accessible but secondary

The current project is unusually careful with sourcing. Keep that advantage.

However, a resident should not need to understand the site's data-governance architecture to use it.

Potential interaction principle:

- answer first;
- "as of" context close by;
- provenance available on demand;
- warnings where materially necessary;
- detailed evidence deeper in the page.

Let trust be experienced through consistency and transparency rather than disclaimer density.

## 11.8 Mobile and weak-signal behavior are part of local UX

A local civic app should remain useful under:

- older Android devices;
- spotty mobile data;
- narrow screens;
- slow image loading.

Good locality can disappear if the experience only works well on a designer's desktop.

The existing static-export architecture is actually an advantage here.

---

# 12. Page-level creative opportunities

Again: these are opportunity spaces, not instructions.

## Home

Questions for the model:

- Does the first screen tell me anything about Maddela beyond its name?
- Is the page useful today, not only informative forever?
- Is the balance between civic utility and place identity right?
- Can current resident-relevant signals be surfaced without becoming noisy?
- Does the hero need to behave like a generic landing-page hero at all?
- What should "Maddela at a glance" mean beyond four numbers?

## Services

Current problem:
- the categories are sensible but generic;
- most detailed local service data is not yet verified.

Opportunity:
- once Citizen's Charter data exists, let real resident tasks shape the experience;
- use local office/service language;
- distinguish "verified process" from "official source link";
- expose version/effective dates;
- create strong zero-data states when information is not yet safely known.

## Barangays

This is one of the biggest identity opportunities.

A 32-barangay municipality should make barangays feel first-class.

Possible data relationships:

- population;
- current projects;
- public institutions;
- notices;
- places;
- roads;
- agriculture context;
- local maps;
- source-backed history;
- contacts only when verified.

The model should decide the best visual and interaction metaphor.

## Statistics

This is already relatively strong.

Opportunity:
- keep the interpretive, careful tone;
- tie demographic/statistical insight to the rest of the product;
- avoid dashboard-for-dashboard's-sake;
- preserve uncertainty;
- use charts that are readable on phones.

## News / Updates

Do not build a generic news feed.

Make local information easier to act on:

- topic;
- affected barangay;
- publisher;
- publication date;
- event date;
- expiration;
- source;
- current vs historical.

## Projects / Budget / Procurement

Potentially one of the strongest civic differentiation areas.

Residents can understand:
- what;
- where;
- amount;
- fund source;
- stage;
- when;
- source.

Do not imply audit conclusions.

## Government

Keep it useful rather than personality-driven.

Potential resident questions:
- What office handles this?
- Who is the current elected official?
- When was that verified?
- What does the office do?
- Where is the source?

## History

Current evidence separation is good.

Opportunity:
- make history spatial and place-aware;
- distinguish law, local compilation, and folklore;
- connect historical territorial changes to modern geography.

## Sources

A source directory is a strong trust feature but should not carry the burden of the entire product's personality.

---

# 12.5 Better LGU transparency-source priorities

The first version of this brief underweighted several source families that are central to the Better LGU mission.

Before expanding lower-risk identity content, actively research these sources for Maddela.

## A. Municipality of Maddela / official municipal publications

Preferred for:

- enacted local ordinances and resolutions;
- Citizen's Charter;
- office directory;
- public service requirements;
- annual and supplemental budgets;
- Annual Investment Plan;
- procurement;
- Full Disclosure Policy documents;
- current officials;
- public notices;
- local project status.

Treat official municipal social pages as time-sensitive publication channels, not permanent archival truth.

## B. DILG Full Disclosure Policy Portal

This is especially important for the **Budget / Transparency** mission.

Acquire and preserve document-level context for:

- annual budget reports;
- statements of receipts and expenditures;
- annual procurement plans;
- utilization reports;
- debt/loan disclosures where applicable;
- development-fund reports;
- LDRRMF-related disclosures;
- other mandatory FDP documents.

Never merge unlike financial documents into a made-up "total budget."

The current BetterMaddela `/budget` implementation already follows this principle and should retain it.

## C. Commission on Audit (COA)

COA should be a first-class research source, not an afterthought.

Acquire when available:

- Annual Audit Reports;
- Independent Auditor's Reports;
- audit observations;
- compliance audit reports;
- status of prior audit recommendations.

Important interpretation rule:

> An LGU-prepared Full Disclosure document and a COA audit document are different evidence types.

Do not describe an unaudited LGU disclosure as "COA-verified."

Primary source:
- https://www.coa.gov.ph/

## D. Department of Budget and Management (DBM)

Use DBM for:

- Local Budget Circulars and Memoranda;
- National Tax Allotment / local budget guidance;
- national appropriations affecting Maddela;
- Local Government Support Fund programs;
- national-budget-funded projects.

Primary source:
- https://www.dbm.gov.ph/

Do not confuse a nationally funded project located in Maddela with Maddela LGU's own enacted municipal budget.

## E. PhilGEPS

Keep PhilGEPS as the procurement source family for:

- notices;
- approved budget for the contract;
- solicitation/reference number;
- publication/closing dates;
- award/contract information when available.

Procurement stage must remain explicit.

## F. Core-source balance rule

When choosing what to research next, do not let the quantity of easily scraped tourism/news content crowd out harder-to-obtain transparency records.

A thin but verified ordinance/budget/project/official/contact dataset is more central to Better LGU than a large collection of decorative local-interest facts.

---

# 13. Data-source map

## Tier A — preferred primary / high-authority sources

### Philippine Statistics Authority
Use for:
- PSGC;
- barangays;
- population;
- classifications;
- census;
- poverty;
- household statistics;
- civil-registration updates;
- CBMS public releases.

URLs:
- https://psa.gov.ph/classification/psgc/barangays/0205704000
- https://rsso02.psa.gov.ph/Quirino
- https://rsso02.psa.gov.ph/content/apcas-goes-live-municipality-maddela

Rights note:
- PSA site states CC BY 4.0 unless otherwise stated.

### Lawphil / Official Gazette / Senate Legislative Reference
Use for:
- legal creation/history;
- laws;
- executive orders;
- proclamations.

URLs:
- https://lawphil.net/executive/execord/eo1950/pdf/eo_368_1950.pdf
- https://ldr.senate.gov.ph/legislative-issuance/batas-pambansa-345

### PhilGEPS
Use for:
- procurement notices;
- budgets;
- deadlines;
- solicitation metadata.

URL family:
- https://notices.philgeps.gov.ph/

### DILG
Use for:
- governance;
- project monitoring;
- SGLG/SGLGIF;
- SubayBAYAN;
- local project compliance;
- business-process/eBPLS context.

URL families:
- https://region2.dilg.gov.ph/
- https://dilg.gov.ph/

### Department of Agriculture — Cagayan Valley
Use for:
- agriculture programs;
- regional price monitoring;
- technical services;
- commodity programs;
- procurement/current notices.

URL:
- https://cagayanvalley.da.gov.ph/

### National Irrigation Administration
Use for:
- irrigation project primary records when available.

### DPWH
Use for:
- national roads;
- public works;
- project and procurement documents.

### PAGASA
Use for:
- weather observations/advisories;
- station information.

### DENR
Use for:
- protected areas;
- environment;
- conservation;
- landslide/environmental official releases.

### NCIP
Use for:
- Indigenous peoples policies/programs;
- ICC/IP references;
- ancestral-domain related public documents.

### Quirino State University
Use for:
- Maddela campus;
- programs;
- current institutional news;
- training/education.

URLs:
- https://qsu.edu.ph/info/program-offerings/
- https://qsu.edu.ph/info/accredited-programs/
- https://qsu.edu.ph/info/campuses/maddela/

### TESDA Quirino
Use for:
- current training and assessment-center information.

URL:
- https://sites.google.com/tesda.gov.ph/tesdaquirino/qsu-maddela

---

# 14. Tier B — official government communication / institutional secondary sources

## Provincial Government of Quirino

Strong for:
- tourism/place descriptions;
- provincial context;
- public programs;
- directory/announcements.

Maddela page:
- https://quirinoprovince.gov.ph/tourism/municipality-of-maddela/

Treat promotional descriptions such as "Commercial Growth Center" as attributed descriptions unless separately verified statistically.

## Philippine Information Agency

PIA is extremely useful for discovering current local government activity and connecting otherwise scattered agency information.

Useful Maddela research:

- Lusod irrigation:
  https://pia.gov.ph/news/lusod-irrigation-project-quirinos-dream-of-a-greener-future/

- Sto. Niño farm-to-market road:
  https://pia.gov.ph/features/from-mud-to-hope-how-quirinos-new-road-changed-villagers-lives/

- Quirino project governance:
  https://pia.gov.ph/news/quirino-lgus-honored-for-excellence-in-local-project-governance/

- 2026 BOSS:
  https://pia.gov.ph/news/luzon/cv/from-long-lines-to-one-stop-easing-business-in-quirino/

- San Pedro barangay service story:
  https://pia.gov.ph/news/every-barangay-matters-san-pedro-maddela-turns-national-assistance-into-better-grassroots-services/

PIA is valuable, but if the article points to a primary program agency, prefer the primary agency for exact requirements/status when available.

---

# 15. Tier C — discovery-only sources

Use these to discover names, photos, old stories, terms, or leads.

Do not automatically publish their claims.

Examples:

- travel blogs;
- local tourism blogs;
- Facebook posts;
- YouTube uploads;
- Google Maps;
- Mapcarta;
- Wikipedia;
- Wikidata;
- Scribd copies;
- old personal blogs;
- business directories.

Rules:

1. Use them to discover a candidate fact.
2. Search for a primary/official corroborating source.
3. Preserve the original URL and retrieval date.
4. Record contradictions.
5. Do not promote the candidate to production just because multiple low-quality sites copy the same text.

---

# 16. Research gaps found during this investigation

These are important because missing data is itself a product roadmap.

## High-value unresolved

### 1. Current Maddela Municipal Citizen's Charter
Not recovered as a clearly current complete first-party indexed source during this research.

### 2. Complete current municipal office directory
Current office heads/contact details are fragmented.

### 3. Directly verified emergency/hotline dataset
Do not scrape-and-publish this from old directories.

### 4. Current local service fee tables
Needed for certificates, permits, taxes, engineering, etc.

### 5. Current complete ordinance/resolution repository
A few ordinances are discoverable, but not a reliable complete corpus.

### 6. Current official tourism operating information
Need direct current verification for:
- fees;
- hours;
- closures;
- safety rules;
- contact numbers;
- required guides;
- seasonality.

### 7. Current transport routes/fares/schedules
Highly volatile and likely best verified locally.

### 8. Authoritative current municipal boundary and municipal land area source
The repo already treats this carefully. Continue that caution.

### 9. Licensed current photography
There is plenty of online imagery, but much of it lacks a clear reuse license.

### 10. Reviewed local language corpus
Needed before using more Ilocano/local language in primary UI.

### 11. Current public market information structure
DA price monitoring is promising, but source format and consistent Maddela coverage need investigation.

### 12. Current waste-collection/environmental service schedules
Useful resident data if verified.

---

# 17. Contradiction and risk register

## Panagsasalog date

Provincial tourism page:
- June 12–15

Other web pages can show different date descriptions.

Decision:
- cultural meaning can be used with attribution;
- each year's event schedule must be separately verified.

## Historical "Pinappagan" claims

Several secondary sources repeat:
- former name Pinappagan;
- 1919 Ilocano settlement led by Vicente Velasco.

Decision:
- continue the repo's existing attribution strategy;
- don't convert local compilation into a legal fact.

## Named-after claim

Some DILG/provincial secondary pages say Maddela was named after former Nueva Vizcaya Governor Tomas Maddela, but source quality and exact legal naming evidence need stronger recovery if this is to become a prominent hard fact.

## Indigenous-community terminology

Sources use:
- Agta;
- Bugkalot/Ilongot;
- Dumagat;
- Kankanaey in specific NCIP context.

Decision:
- do not merge terms;
- preserve source context;
- prioritize NCIP/community-supported current terminology.

## Tourism business lists

Provincial tourism pages list restaurants/businesses.

Decision:
- discovery only until current existence, hours, location, and consent/public listing basis are verified.

## Procurement contact information

PhilGEPS may expose named contact persons and phone/email data.

Decision:
- publication in BetterMaddela should be purpose-limited;
- do not repurpose personal contact details broadly just because they are public in procurement context.

## CBMS

The LGU has received/used CBMS data.

Decision:
- only public, aggregate releases;
- never household-level or personally identifiable CBMS data.

---

# 18. Suggested research data model

This is conceptual. Adapt it to the existing BetterMaddela data contract rather than replacing that contract blindly.

```ts
type CandidateRecord = {
  id: string;
  entityType:
    | "service"
    | "office"
    | "barangay"
    | "place"
    | "project"
    | "procurement"
    | "event"
    | "notice"
    | "statistic"
    | "institution"
    | "culture"
    | "history"
    | "market-price";

  title: string;
  summary?: string;

  geography?: {
    municipality: "Maddela";
    barangays?: string[];
    address?: string;
    coordinates?: {
      lat: number;
      lng: number;
      sourceId: string;
    };
  };

  time?: {
    publishedAt?: string;
    effectiveFrom?: string;
    effectiveTo?: string;
    eventStart?: string;
    eventEnd?: string;
    referenceDate?: string;
  };

  provenance: {
    sourceIds: string[];
    retrievedAt: string;
    reviewedAt?: string;
    reviewer?: string;
    rights?: string;
  };

  risk: {
    class:
      | "low"
      | "changing"
      | "financial"
      | "safety"
      | "emergency"
      | "privacy-sensitive";
    freshnessDays?: number;
  };

  publication: {
    state: "candidate" | "conflicted" | "verified" | "expired" | "rejected";
    notes?: string;
  };

  tags?: string[];
};
```

Important additions for media:

```ts
type MediaRightsRecord = {
  assetId: string;
  subject: string;
  sourceUrl: string;
  creator?: string;
  license?: string;
  permissionEvidence?: string;
  capturedAt?: string;
  containsPeople: boolean;
  consentRequired?: boolean;
  approvedForProduction: boolean;
};
```

---

# 19. Scraping/research pipeline

The site's own governance says scraping is evidence input, not production data. Keep that.

## Stage 1 — Discovery

Search:

- official agency websites;
- official press releases;
- PDFs;
- public procurement;
- source directories;
- government social channels;
- maps;
- institutional sites;
- archived local plans.

Output:
- candidate URL;
- title;
- publisher;
- retrieved date;
- likely data type.

## Stage 2 — Capture

For each candidate:

- raw page/PDF;
- URL;
- publication date;
- content hash;
- retrieval time;
- source organization;
- license/rights statement;
- document version;
- page numbers for claims.

Do not depend on a copied text snippet without preserving its source.

## Stage 3 — Structured extraction

Extract candidate entities:

- dates;
- offices;
- barangays;
- project names;
- amounts;
- service requirements;
- fees;
- contacts;
- coordinates;
- event dates;
- document IDs;
- legal references.

Extraction output remains **untrusted**.

## Stage 4 — Entity resolution

Resolve:

- `Sto. Niño` vs `Santo Niño`;
- Poblacion variants;
- office abbreviations;
- duplicated project titles;
- reused press releases;
- same event across multiple agencies.

Prefer canonical PSGC names for barangays.

## Stage 5 — Conflict detection

Flag when:

- dates differ;
- officials differ;
- status differs;
- amounts differ;
- coordinates differ;
- office contacts differ;
- source is older than a newer source;
- secondary source disagrees with primary law/data.

Never silently choose.

## Stage 6 — Risk/freshness classification

Example classes:

### Stable
- historic laws;
- PSGC code;
- established institutions.

### Periodic
- population;
- poverty;
- school program accreditation.

### Seasonal
- BOSS;
- festival;
- agriculture programs.

### Fast-changing
- office hours;
- contacts;
- current projects;
- procurement;
- events;
- prices.

### High-risk
- emergency contacts;
- disaster instructions;
- health instructions;
- public-safety information.

Fast-changing and high-risk records need much tighter review.

## Stage 7 — Human review

Reviewer checks:

- claim;
- exact source;
- date;
- scope;
- license;
- risk;
- ambiguity;
- whether the UI wording overstates the evidence.

## Stage 8 — Production import

Only reviewed records enter `src/data/civic` or equivalent production data.

## Stage 9 — Expiry / freshness monitoring

Every changing record should know when it becomes suspicious.

Better to show:
- "last verified"
- "source updated"
- "may be outdated"

than silently carry a 3-year-old schedule.

---

# 20. Identity-specific scraping backlog

## P0 — highest identity gain

1. Current licensed/local Maddela photography.
2. Barangay geodata and public-institution mapping.
3. Current Citizen's Charter.
4. Local office directory.
5. Current POI/tourism operational data.
6. Reviewed local-language vocabulary.
7. Municipal/local maps with correct rights.
8. Updated public project locations.
9. Current agriculture/service datasets.
10. Current market/price source structure.

## P1 — high resident utility

1. Service requirements, fees, times.
2. Forms.
3. BPLO/BOSS.
4. agriculture programs.
5. social services.
6. health facility directory.
7. education/scholarship/training.
8. current public notices.
9. current project tracker.
10. local legislation.

## P2 — depth and storytelling

1. historical photo archive;
2. oral/local history with provenance;
3. local food glossary;
4. public architecture/landmark catalog;
5. environmental stories;
6. river/agriculture historical changes;
7. municipal economic plans;
8. older local investment plans;
9. community organizations/cooperatives;
10. archived festival programs.

---

# 21. A possible "Maddela data graph"

Do not interpret this as a required backend.

Think conceptually:

**Barangay**
↔ services  
↔ office  
↔ project  
↔ school  
↔ place  
↔ notice  
↔ statistic  
↔ road  
↔ agriculture  
↔ event

**Service**
↔ office  
↔ requirement  
↔ fee  
↔ form  
↔ legal basis  
↔ effective date

**Project**
↔ barangay  
↔ amount  
↔ fund source  
↔ agency  
↔ procurement  
↔ status  
↔ latest inspection

**Place**
↔ barangay  
↔ coordinates  
↔ access  
↔ tourism/safety info  
↔ photo  
↔ culture/history

**Notice**
↔ publisher  
↔ affected barangay  
↔ affected service  
↔ event date  
↔ expiry

This relationship structure is what can make the app feel more intelligent than a stack of static pages.

---

# 22. Interaction ideas the model may interpret freely

These are provocations, not requirements.

- "Where in Maddela?" as a persistent geographical concept.
- Search that understands barangays, services, projects, places, and offices.
- Location-aware links without collecting precise user location.
- Local "today" signals.
- Freshness as an interaction pattern.
- A municipality map that is civic, not merely decorative.
- Source drawers rather than walls of metadata.
- Related records built from barangay/entity relationships.
- Seasonal context from agriculture, weather, and annual civic processes.
- Human-readable project status.
- Timeline views.
- Data stories.
- Low-bandwidth image modes.
- Print/screenshot-friendly service instructions.
- Progressive disclosure for requirements and source evidence.
- Small motion inspired by water/route/field rhythm, if it improves orientation rather than decorating.
- Contrast between river/landscape surfaces and clean information surfaces.
- A strong identity system that does not depend on the municipal seal.

The model is explicitly allowed to reject any of these if it finds a better concept after inspecting the code and data.

---

# 23. What not to do

## Do not solve identity by:

- adding a giant tourism hero image to every page;
- making everything green because Maddela is agricultural;
- adding random corn icons;
- copying the municipal seal everywhere;
- using faux-Indigenous patterns;
- machine-generating Ilocano phrases;
- adding an animated map that is less useful than the current content;
- turning every card into glassmorphism;
- creating "AI chatbot" interaction without useful verified data;
- faking online services;
- filling gaps with plausible requirements/contact details;
- using old Facebook posts as current truth;
- using unlicensed Google images;
- copying a trendy SaaS landing page and recoloring it;
- copying `.gov.ph` design conventions so closely that independence becomes unclear.

## Do not equate "interactive" with "moving"

Interactivity can mean:

- better filtering;
- comparison;
- location context;
- search;
- expanding detail;
- data relationships;
- current information;
- saved/shareable views;
- contextual source detail.

---

# 24. Accessibility, performance, privacy, and trust

Local identity is not worth much if residents cannot use the site.

## Accessibility

Keep:
- semantic navigation;
- keyboard use;
- focus visibility;
- readable typography;
- contrast;
- reduced-motion support;
- screen-reader-friendly charts;
- tables as alternatives to visualizations;
- descriptive link text;
- meaningful alt text.

## Performance

Prefer:
- static-first;
- responsive images;
- cached public data where allowed;
- small JS budgets;
- progressive enhancement;
- no heavyweight visual library just for decoration.

## Privacy

The current architecture collects no resident records and uses no analytics/ads.

That is a product advantage.

Do not casually add:
- invasive analytics;
- location tracking;
- fingerprinting;
- personal-data forms;
- resident profiles.

If a future feature genuinely needs personal data, that is an architectural/security/privacy decision, not UI polish.

## Trust

Always distinguish:
- BetterMaddela's explanation;
- official source;
- retrieved date;
- effective date;
- current vs historical;
- verified vs unavailable.

---

# 25. Source/rights notes

## PSA
PSA's site states:
> all data and content on the website are licensed under CC BY 4.0 unless otherwise stated.

This is excellent for structured demographic data with attribution.

## PIA
PIA pages state content is in the public domain unless otherwise stated.

Still preserve:
- author;
- publisher;
- date;
- source URL.

## Provincial tourism photography
Do not assume every photo on the provincial tourism page is freely reusable just because the page is public.

Check the actual media rights.

## OpenStreetMap
OSM data is not public-domain. It is licensed under ODbL and needs correct attribution/compliance.

## GitHub upstream
BetterMaddela already tracks BetterAurora/BetterLGU attribution. Do not erase that legal history while creating a more original design.

---

# 26. Recommended local research artifacts for the repo

The user requested one plug-in research file now, but the implementation model may eventually split the corpus into machine-friendly supporting artifacts such as:

```text
docs/research/maddela-identity-corpus.md
docs/research/maddela-source-catalog.json
docs/research/maddela-data-gaps.md
docs/research/maddela-language-notes.md
docs/research/maddela-media-rights.csv
docs/research/maddela-poi-candidates.csv
docs/research/maddela-service-candidates.csv
docs/research/maddela-project-candidates.csv
```

Do not create all of these merely for organization. Split only when there is enough data to justify it.

---

# 27. Recommended source catalog fields

```json
{
  "id": "source-example",
  "publisher": "Philippine Statistics Authority",
  "title": "Municipality of Maddela",
  "url": "https://psa.gov.ph/classification/psgc/barangays/0205704000",
  "sourceType": "official-primary",
  "retrievedAt": "2026-08-25",
  "publishedAt": null,
  "rights": "CC BY 4.0 unless otherwise stated",
  "geographicScope": ["Maddela"],
  "topics": ["population", "barangays", "PSGC"],
  "freshness": "periodic",
  "notes": ""
}
```

---

# 28. Concrete current-source watchlist

These sources are worth monitoring/researching repeatedly for new Maddela records.

## Civic / demographic

- PSA Quirino releases  
  https://rsso02.psa.gov.ph/Quirino/releases

- PSA Maddela PSGC  
  https://psa.gov.ph/classification/psgc/barangays/0205704000

## Agriculture

- DA Cagayan Valley  
  https://cagayanvalley.da.gov.ph/

- DA Daily Price Index pages  
  https://cagayanvalley.da.gov.ph/

- NIA official channels/pages

## Projects / governance

- DILG Region II  
  https://region2.dilg.gov.ph/

- PhilGEPS  
  https://notices.philgeps.gov.ph/

- DBM  
  https://www.dbm.gov.ph/

- DPWH  
  https://www.dpwh.gov.ph/

## Local current information

- PIA Cagayan Valley / Quirino  
  https://pia.gov.ph/

- Provincial Government of Quirino  
  https://quirinoprovince.gov.ph/

## Education

- Quirino State University  
  https://qsu.edu.ph/

- TESDA Quirino  
  https://sites.google.com/tesda.gov.ph/tesdaquirino/

## Environment

- DENR  
  https://denr.gov.ph/

- NCIP  
  https://ncip.gov.ph/

---

# 29. Research findings that could become unique BetterMaddela content

Not instructions — just examples of material that is locally specific enough to build around.

## "Maddela is a network of 32 barangays"

Not:
> We have 32 barangays.

More interesting raw insight:
> Only two barangays are urban-classified in the PSA table; about 87.8% of the 2024 population lives in rural-classified barangays.

This should change how the product thinks about location and service access.

## "Agriculture is infrastructure"

Irrigation, roads, price monitoring, market access, extension services, and weather all connect.

This is more local than an isolated "Agriculture" card.

## "The Cagayan River is both identity and access context"

It appears in:
- Governor's Rapids;
- settlement/history;
- agriculture;
- flooding/access stories;
- irrigation.

The river can become an information relationship, not just a background photo.

## "Education is part of modern Maddela"

QSU-Maddela makes the town a learning/skills node.

## "Public projects are tangible stories"

Residents can connect a project to a specific barangay and a daily-life effect.

## "Local public information is already distributed across many agencies"

BetterMaddela's independent value is in making those fragments comprehensible and local.

---

# 30. Current-source examples by theme

## Civil registration

### APCAS Goes Live in Maddela
Publisher: PSA Quirino  
Date: July 20, 2026  
URL:
https://rsso02.psa.gov.ph/content/apcas-goes-live-municipality-maddela

Research value:
- local digital-service modernization;
- LCRO context;
- current civil-registration news.

Do not convert this article into a complete service procedure.

## Business

### From long lines to one stop: Easing business in Quirino
Publisher: PIA  
Date: January 2, 2026  
URL:
https://pia.gov.ph/news/luzon/cv/from-long-lines-to-one-stop-easing-business-in-quirino/

Research value:
- BOSS;
- Negosyo Center Maddela;
- offices involved;
- annual renewal workflow context.

## Irrigation

### Lusod irrigation project
Publisher: PIA / NIA reporting  
Date: July 21, 2025  
URL:
https://pia.gov.ph/news/lusod-irrigation-project-quirinos-dream-of-a-greener-future/

Research value:
- agriculture;
- project scale;
- local farmer context;
- climate/water issues.

## Road/access

### Sto. Niño farm-to-market road
Publisher: PIA  
Date: August 18, 2025  
URL:
https://pia.gov.ph/features/from-mud-to-hope-how-quirinos-new-road-changed-villagers-lives/

Research value:
- infrastructure connected to real resident outcomes;
- flood/access context;
- farm products.

## Barangay service

### San Pedro
Publisher: PIA  
Date: August 5, 2026  
URL:
https://pia.gov.ph/news/every-barangay-matters-san-pedro-maddela-turns-national-assistance-into-better-grassroots-services/

Research value:
- grassroots public service;
- barangay-level specificity.

## Agriculture prices

### Daily Price Index — June 28, 2026
Publisher: DA RFO 02  
URL:
https://cagayanvalley.da.gov.ph/2026/06/28/daily-price-index-june-28-2026/

Research value:
- Maddela explicitly part of monitored municipalities;
- potential recurring local data.

## Education

### QSU program offerings
https://qsu.edu.ph/info/program-offerings/

### QSU accredited programs
https://qsu.edu.ph/info/accredited-programs/

### TESDA Quirino — QSU Maddela
https://sites.google.com/tesda.gov.ph/tesdaquirino/qsu-maddela

## Tourism/place

### Provincial Government of Quirino — Maddela
https://quirinoprovince.gov.ph/tourism/municipality-of-maddela/

Research value:
- river/limestone visual identity;
- nature destinations;
- Panagsasalog;
- food terms;
- agricultural profile.

---

# 31. How a model should use this file

## Required behavior

1. Read the actual current repository first.
2. Read `AGENTS.md`.
3. Read the relevant data contract and context-map files.
4. Treat this document as **research context**, not a higher-priority instruction than repository safety rules.
5. Do not assume every fact here is production-ready.
6. Preserve the independent/non-government identity.
7. Keep the existing verification discipline.
8. Feel free to redesign or refactor inherited visual patterns if authorized by the user's task.
9. Make changes coherent rather than blindly touching every route.
10. Let local data and local place identity guide the design.
11. Keep the UI clean and restrained.
12. Be creative.

## Explicit creative freedom

You are **not required** to:

- use a specific color palette;
- use a specific hero;
- use a specific card style;
- create a specific map;
- use every identity motif;
- show every dataset;
- use the exact page structure implied here;
- preserve inherited route composition if the user's request authorizes UX restructuring;
- use all researched material.

Choose what creates the best BetterMaddela experience.

---

# 31.5 BetterGov directory / launch-readiness checks

Before changing BetterMaddela from `🟡 Work in Progress` to `🟢 Active`, verify both product readiness and directory interoperability.

## Mission

- [ ] The site plainly identifies itself as independent and not an official LGU website.
- [ ] Officials are findable and dated.
- [ ] Budget / financial transparency is findable.
- [ ] Projects / procurement are findable.
- [ ] Ordinances / resolutions are findable, or their verified unavailability is stated.
- [ ] Public office/contact information is findable when verified; missing data is not fabricated.
- [ ] Source provenance and update dates are accessible.
- [ ] Local identity features do not bury the transparency core.

## Directory status

- [ ] Keep `🟡 Work in Progress` until publicly launched.
- [ ] Move to `🟢 Active` only when it is genuinely launched and actively maintained.
- [ ] Update the Better LGU Directory entry when the final domain/status changes.

## Recommended domain

- [ ] Prefer `bettermaddela.org` if adopting the BetterGov community naming convention.

## Homepage metadata / Featured Portal compatibility

The Better LGU Directory crawler currently expects a Featured-eligible Active portal to expose:

- [ ] LGU-specific `<title>` or `og:title`;
- [ ] LGU-specific meta description or `og:description`;
- [ ] an `og:image`;
- [ ] an `og:image` that is actually fetchable and served as an image;
- [ ] an `og:image` no larger than the crawler's current 400 KB ceiling;
- [ ] no unchanged generic BetterGov template title/description;
- [ ] `robots.txt` that does not blanket-block the Better LGU Directory crawler.

Current BetterMaddela already has a Maddela-specific title/description in `src/app/layout.tsx`, which is good. It should add/check its intentional social-preview image before Active launch.

## Logo/favicon interoperability

The directory's current logo crawler looks through:

1. SVG `rel=icon`;
2. other `rel=icon`;
3. web manifest icons;
4. `apple-touch-icon`;
5. `/favicon.ico`.

Maintain an intentional BetterMaddela icon/favicon identity rather than leaving inherited template assets.

## Maintenance

The Better LGU guide stresses that a transparency portal remains valuable only if data stays current.

Define a realistic recurring review process for:

- officials;
- contacts;
- active projects;
- procurement;
- ordinances;
- budgets/disclosures;
- current notices;
- service requirements;
- time-sensitive resident information.

Do not expand live/changing datasets faster than they can be maintained.

Sources:
- https://github.com/jmacj/better-lgu-directory/blob/main/GUIDE.md
- https://github.com/jmacj/better-lgu-directory/blob/main/CONTRIBUTING.md
- https://github.com/jmacj/better-lgu-directory/blob/main/scripts/crawl-lgu-meta.js

---

# 32. Quality bar

A successful redesign should score well on these questions:

### Better LGU transparency mission
- Are officials easy to find and clearly dated?
- Are budget/financial records understandable without overstating what they prove?
- Are projects and procurement understandable by place, stage, amount, and source?
- Are ordinances and resolutions accessible when verified, and clearly marked unavailable when not?
- Are public office/contact routes easy to find once verified?
- Does local identity strengthen rather than replace the transparency mission?

### Locality
- Does it feel unmistakably Maddela?
- Are barangays and local places first-class?
- Is local identity present throughout, not only in a tourism/history section?

### Utility
- Can residents find important civic information quickly?
- Does the interface help people act on information?

### Trust
- Are sources, dates, and uncertainty handled correctly?
- Does the site avoid pretending to be official?

### Interaction
- Is interactivity driven by useful data and relationships?
- Does the site feel alive without becoming gimmicky?

### Visual design
- Is the system coherent and distinctive?
- Is it clean, calm, and modern?
- Does it avoid both generic GOVPH and generic SaaS-template aesthetics?

### Mobile
- Is it excellent on a phone?
- Does it remain useful with weak connectivity?

### Accessibility
- Can keyboard, screen-reader, low-vision, and motion-sensitive users use it?

### Data safety
- Did the model avoid inventing civic facts?
- Are high-risk and changing facts properly gated?

---

# 33. Final identity statement for the implementation model

BetterMaddela already has a strong **trust foundation** and a recognizable **Better LGU transparency skeleton**.

What it needs now is not to abandon that skeleton for a broader lifestyle/city-guide product. It needs **Maddela to become the organizing intelligence of the transparency portal**.

Maddela is:

- 32 barangays;
- overwhelmingly rural in PSA classification;
- a 1st-income-class municipality;
- an agricultural and agro-industrial center;
- tied to corn, rice, banana, cassava, peanut and other crops;
- shaped by irrigation and farm-to-market access;
- crossed by the Cagayan River;
- visually marked by river water, limestone, forest, fields, and mountain terrain;
- home to QSU Maddela in Dipintin;
- connected to skills training and local youth;
- associated with Governor's Rapids, Maddela Waterfalls, and other nature sites;
- home to Panagsasalog and its farm-work/harvest cultural narrative;
- connected to freshwater food traditions;
- made of distinct barangays with very different populations and local contexts;
- a place where public information is scattered across PSA, PIA, DILG, DA, NIA, DPWH, QSU, PhilGEPS, provincial pages, and local channels;
- a place where a good independent civic app can add value precisely by **bringing those fragments together carefully**.

Do not turn these facts into a checklist of decorations.

Turn them into understanding.

Then design from that understanding.

---

# 33.5 BetterGov.ph / Better LGU references used for alignment

- Better LGU Directory  
  https://github.com/jmacj/better-lgu-directory

- Better LGU Guide  
  https://github.com/jmacj/better-lgu-directory/blob/main/GUIDE.md

- Better LGU Directory contribution/status rules  
  https://github.com/jmacj/better-lgu-directory/blob/main/CONTRIBUTING.md

- Community templates  
  https://github.com/jmacj/better-lgu-directory/blob/main/TEMPLATES.md

- Directory metadata / Featured Portal crawler  
  https://github.com/jmacj/better-lgu-directory/blob/main/scripts/crawl-lgu-meta.js

---

# 34. Core sources consulted

Research date: **2026-08-25**

## BetterMaddela repository

- Repository branch  
  https://github.com/Hendrizzzz/bettermaddela/tree/feat/pre-release-polish

- `AGENTS.md`  
  https://raw.githubusercontent.com/Hendrizzzz/bettermaddela/refs/heads/feat/pre-release-polish/AGENTS.md

- Architecture  
  https://raw.githubusercontent.com/Hendrizzzz/bettermaddela/refs/heads/feat/pre-release-polish/docs/architecture/ARCHITECTURE.md

- `globals.css`  
  https://raw.githubusercontent.com/Hendrizzzz/bettermaddela/refs/heads/feat/pre-release-polish/src/app/globals.css

- Home  
  https://raw.githubusercontent.com/Hendrizzzz/bettermaddela/refs/heads/feat/pre-release-polish/src/app/page.tsx

- Services  
  https://raw.githubusercontent.com/Hendrizzzz/bettermaddela/refs/heads/feat/pre-release-polish/src/app/services/page.tsx

- Barangays  
  https://raw.githubusercontent.com/Hendrizzzz/bettermaddela/refs/heads/feat/pre-release-polish/src/app/barangays/page.tsx

- Statistics  
  https://raw.githubusercontent.com/Hendrizzzz/bettermaddela/refs/heads/feat/pre-release-polish/src/app/statistics/page.tsx

## Primary / official public sources

- PSA — Municipality of Maddela PSGC/barangays  
  https://psa.gov.ph/classification/psgc/barangays/0205704000

- PSA Quirino releases  
  https://rsso02.psa.gov.ph/Quirino/releases

- PSA — APCAS Maddela  
  https://rsso02.psa.gov.ph/content/apcas-goes-live-municipality-maddela

- PSA — CBMS Maddela convening  
  https://rsso02.psa.gov.ph/statistics/cbms/node/1684060595

- PSA — CBMS data turnover Maddela  
  https://rsso02.psa.gov.ph/content/psa-quirino-conducts-2024-cbms-data-turnover-lgu-maddela

- Provincial Government of Quirino — Maddela  
  https://quirinoprovince.gov.ph/tourism/municipality-of-maddela/

- QSU — Programs  
  https://qsu.edu.ph/info/program-offerings/

- QSU — Accredited programs  
  https://qsu.edu.ph/info/accredited-programs/

- QSU — Maddela Campus  
  https://qsu.edu.ph/info/campuses/maddela/

- TESDA Quirino — QSU Maddela  
  https://sites.google.com/tesda.gov.ph/tesdaquirino/qsu-maddela

- DA Cagayan Valley — Daily Price Index June 28, 2026  
  https://cagayanvalley.da.gov.ph/2026/06/28/daily-price-index-june-28-2026/

- Lawphil — Executive Order No. 368, 1950  
  https://lawphil.net/executive/execord/eo1950/pdf/eo_368_1950.pdf

- Senate Legislative Reference — Batas Pambansa Blg. 345  
  https://ldr.senate.gov.ph/legislative-issuance/batas-pambansa-345

- NCIP annual report research lead  
  https://ncip.gov.ph/wp-content/uploads/2024/03/2022-AAR.pdf

## Government information / current local reporting

- PIA — Lusod irrigation  
  https://pia.gov.ph/news/lusod-irrigation-project-quirinos-dream-of-a-greener-future/

- PIA — Sto. Niño farm-to-market road  
  https://pia.gov.ph/features/from-mud-to-hope-how-quirinos-new-road-changed-villagers-lives/

- PIA — Quirino local-project governance  
  https://pia.gov.ph/news/quirino-lgus-honored-for-excellence-in-local-project-governance/

- PIA — Business One Stop Shop  
  https://pia.gov.ph/news/luzon/cv/from-long-lines-to-one-stop-easing-business-in-quirino/

- PIA — San Pedro barangay service delivery  
  https://pia.gov.ph/news/every-barangay-matters-san-pedro-maddela-turns-national-assistance-into-better-grassroots-services/

## Historical/economic research leads

- Maddela Local Investments and Incentives Code (2016 document hosted in regional investment portal)  
  https://staging-invest.rdc2.gov.ph/wp-content/uploads/2024/07/Maddela-LIIC.pdf

---

# 35. Research caveat

This is a **research corpus created from public web sources**, not an official municipal publication.

Some sources are:
- current primary data;
- current government press releases;
- older policy documents;
- provincial promotional descriptions;
- historical compilations;
- discovery leads.

Before any changing fact is moved into BetterMaddela production data, it still needs to pass the repository's source, verification, freshness, risk, and rights rules.

That is intentional.

The purpose of this file is to give the implementation model enough **local intelligence** to stop designing a generic municipality template and start designing **BetterMaddela**.
