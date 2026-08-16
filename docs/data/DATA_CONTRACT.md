# BetterMaddela civic data contract

## Purpose and scope

This document defines the minimum evidence required before civic information can be published by BetterMaddela. It applies to human contributors, coding agents, and research tools. It does not prescribe a database, scraper, or agent framework.

BetterMaddela is an independent civic-information project, not an official LGU system. A research result is a candidate claim, not production data. Missing or uncertain information must stay unpublished or appear as an honest unavailable state.

This contract deliberately contains no Maddela facts. A separate, reviewed research handoff supplies candidate records and evidence.

The words **must**, **must not**, and **should** describe required and recommended review behavior.

## Core rules

1. Every changing fact must be traceable to one or more source records.
2. A `verified` label is necessary but not sufficient for publication; the applicable risk gate must also pass.
3. A source being official does not make it current, complete, or internally consistent.
4. Conflicting or stale claims fail closed: block or remove the claim instead of selecting a convenient value.
5. Site-wide review dates never replace record-level verification dates.
6. Research evidence and production content remain separate until review accepts the record.
7. Public data must not contain credentials, private correspondence, unnecessary personal information, or machine-local paths.

## Minimum record shape

The storage format may change, but each publishable record must preserve these semantics.

| Field | Requirement |
|---|---|
| `id` | Required. Stable, unique, lowercase identifier; do not encode a value likely to change. |
| `type` | Required. Plain category such as official, office, service, contact, legislative item, transparency document, project, statistic, place, or media item. |
| `label` | Required. Human-readable name or title. |
| `data` | Required. The domain fields shown to users; preserve exact names, numbers, periods, units, and document identifiers. |
| `sourceIds` | Required. Non-empty list of source IDs supporting the record as a whole. |
| `claimSources` | Required when `data` contains fields supported by different evidence. Map each displayed field or atomic claim to its supporting source IDs. |
| `status` | Required. One value from the verification vocabulary below. |
| `lastVerified` | Required. ISO 8601 date when a reviewer last checked the claim against its evidence. |
| `acceptedBy` | Required for `verified` records. Stable identifier of the reviewer who accepted the record; this must not be filled by the research preparer. |
| `acceptedAt` | Required for `verified` records. ISO 8601 timestamp of acceptance. |
| `nextReviewOn` | Required for every changing fact. ISO 8601 date after which the record is no longer fresh. |
| `updateCadence` | Required for changing facts. One of `monthly`, `quarterly`, `annually`, `per-term`, `per-document`, or `manual`. |
| `owner` | Required. Maintainer role responsible for the next review; a personal email is not required. |
| `effectiveFrom` | Required when the source defines a term, reporting period, or start date. |
| `effectiveTo` | Required when known; otherwise omit rather than inventing an end date. |
| `notes` | Optional. Concise limits, conflict resolution, or interpretation needed to prevent misuse. |

Dates use `YYYY-MM-DD`. Timestamps use ISO 8601 with an explicit offset. Currency, units, reporting periods, legal numbers, and names must never be silently normalized in a way that changes their meaning.

## Minimum source shape

Every `sourceId` must resolve to exactly one source entry.

| Field | Requirement |
|---|---|
| `id` | Required. Stable, unique source identifier. |
| `title` | Required. Exact page, dataset, post, or document title; use a descriptive label only when the source has no title. |
| `publisher` | Required. Issuing organization or office, not the search engine or researcher. |
| `url` | Required unless the evidence is a documented direct confirmation. Use the original page or document URL, not a search-results URL. |
| `documentType` | Required. One of `webpage`, `pdf`, `law`, `social-post`, `dataset`, `procurement-record`, `media-file`, `permission-record`, or `direct-confirmation`. |
| `publishedAt` | Required when the source provides a publication date. |
| `effectivePeriod` | Required when the source applies to a term, fiscal year, quarter, or other bounded period. |
| `retrievedAt` | Required. ISO 8601 date on which the evidence was accessed. |
| `verifiedAt` | Required. ISO 8601 date on which a reviewer inspected the evidence. |
| `verifier` | Required. Reviewer name or stable contributor identifier. |
| `sourceState` | Required. `active` or `superseded`. |
| `archivePath` | Optional. Public, lawful evidence copy when preservation is appropriate. |
| `sha256` | Required for a downloaded file used as evidence; otherwise optional. |
| `notes` | Optional. Accessibility limits, conflicting passages, replacement source, or exact location within a long document. |

A direct-confirmation source has no invented URL. It must instead record the office contacted, date and time, method, public purpose of the confirmation, outcome, and the reviewer who performed it. Do not publish private conversation details or a confirmer's personal data.

## Verification vocabulary

Use only these record states:

| Status | Meaning | Public treatment |
|---|---|---|
| `provisional` | Evidence is useful but the preferred source or required check is missing. | Keep out of production. |
| `verified` | Evidence was reviewed and the applicable gate passed at that time. | May be published while fresh. |
| `needs-reverification` | The review deadline passed, a material change occurred, a link failed, or a test no longer succeeds. | Remove from current factual displays or show unavailable; do not imply it remains current. |
| `blocked` | Sources conflict, evidence is incomplete, or a required high-risk check failed. | Do not publish the claim. |
| `retired` | The record is no longer current and is intentionally kept for history. | Show only in a clearly dated archive, never as current information. |

Normal flow is `provisional` → `verified` → `needs-reverification` or `retired`. Any state may become `blocked`. A blocked record returns to `verified` only after the conflict or failed gate is documented as resolved.

“Not found” is a research outcome, not a production record state. Track it in the unresolved-items section of the handoff and render an honest unavailable state when necessary.

## Publication gates

All records must pass the base gate: complete required fields, claim-level evidence when needed, `verified` status, recorded reviewer acceptance, and no unresolved contradiction. Changing facts also require a future `nextReviewOn` date. A material event may shorten that window at any time; `manual`, `per-term`, and `per-document` never mean indefinitely fresh. The following gates add requirements according to harm and volatility.

### Ordinary changing facts

Examples include normal office contacts, schedules, department heads, statistics, coordinates, and other values that may change.

- Use a primary source or a strong government source appropriate to the claim.
- Record the source's date or applicable period and the record's verification date.
- Confirm the value is about Maddela and the relevant office, geography, or reporting period.
- Recheck at the stated cadence and after a known material event.
- Treat secondary sources and search snippets as leads unless independently confirmed.

Stable legal or statistical identity facts still require provenance, but may use an annual or manual review cadence when justified.

### Officials and rosters

- Use a current proclamation, appointment, signed roster, official directory, or current official-government publication.
- Preserve the exact name, suffix, title, body, and term dates when available.
- Recheck time-sensitive officeholders near launch; for mayor and vice mayor, within 30 days when feasible.
- Verify complete bodies as complete, including applicable ex-officio seats, vacancies, succession, and appointments. A partial list must be labeled partial or withheld.
- Recheck quarterly and after elections, appointments, vacancies, succession, or organizational changes. Use monthly review during the initial launch period for the highest-profile offices.

### Services

- Requirements, eligibility, fees, steps, processing times, schedules, and complaint procedures require the current Citizen's Charter or direct confirmation by the responsible office.
- Identify the responsible office and the charter edition or effective period.
- Do not convert a blank field into “none,” “free,” “same day,” or similar language.
- If the governing material is unavailable, publish only a general service description and the notice: “Detailed requirements, fees, and processing time are not yet verified. Please confirm directly with the responsible office.”
- Recheck when a charter or office procedure is replaced and at least quarterly for published time-sensitive details.

### Ordinances and resolutions

- Require the signed or complete official document, an official repository copy, or an official announcement with the attached document.
- Preserve type, number, series year, exact title, and approval date exactly.
- Link the full text. Label plain-language explanations as summaries and do not present legal advice.
- Do not infer effectivity without the measure's effectivity clause and any required posting or publication evidence.
- Record amendments, supersession, or uncertain status; a title or social-media snippet alone cannot establish the law's complete content.

### Budgets, transparency, procurement, and projects

- Require an official document or record and identify its category, fiscal/reporting period, publishing body, and source link.
- Keep unlike documents separate; do not collapse appropriations, expenditures, procurement ceilings, contract amounts, and project costs into one “budget” value.
- Hash downloaded source files used as evidence and keep document dates distinct from retrieval dates.
- Report procurement and project status exactly as published. Award, funding, announcement, or groundbreaking does not prove completion.
- Each project-stage change requires its own evidence. Summaries of audit findings must stay faithful to the complete report and avoid unsupported conclusions.

### Emergency and health contacts

This gate is mandatory even when an official post contains a number.

- Confirm the line directly with the responsible office. Never place an unannounced test call to an emergency or dispatch line.
- Test only with advance authorization from the responsible office, an agreed low-impact time and script, and a clear statement at the start that no emergency response is requested. A test must never trigger or simulate an actual dispatch. If a safe authorized test cannot be arranged, keep the record blocked.
- Record the service and facility, geographic scope, operating hours, calls/text capability, permanent or temporary status, test date/time, method, result, and confirmer's office.
- Obtain a second confirmation from a signed/current directory, official page, or separate responsible office.
- Publish only after both confirmations agree and the test succeeds.
- Recheck monthly. A failed test or conflict immediately changes the record to `needs-reverification` or `blocked` and removes it from current and offline contact data.
- Any offline copy must show its record-level verification date and warn that saved information may be outdated.

### Media rights

Before publishing an image, illustration, map, logo, audio, video, or document copy, record:

- creator or rights holder;
- original source URL or acquisition record;
- explicit license or written permission;
- required attribution text;
- modification status; and
- any scope, expiry, or distribution restriction.

An item appearing on a government page or an upstream site is not proof of reuse permission. Replace the item if its rights cannot be demonstrated. Do not use an official seal, logo, or visual treatment in a way that implies LGU ownership or endorsement.

## Conflicts, corrections, and freshness

When evidence disagrees:

1. Set the affected candidate record to `blocked`.
2. Preserve each claim with its own source ID, date, period, and exact scope.
3. Check whether the disagreement results from different terms, facilities, reporting periods, document versions, or supersession.
4. Resolve using the most relevant current primary source or direct confirmation required by the risk gate—not by majority vote or convenience.
5. Record the resolution and why any source became `superseded`.

When a published fact becomes stale, fails a link or phone test, or is credibly challenged, mark it `needs-reverification` and remove it from current displays until reviewed. Corrections should update the record and source history without erasing material evidence of why the earlier value changed.

Default review expectations for this project are:

| Content | Review expectation |
|---|---|
| Emergency contacts | Monthly and immediately after a failed test |
| Mayor, vice mayor, critical contacts | Monthly during initial launch; then quarterly and after material events |
| Other officials, department heads, barangay officials, service details, ordinances, projects, and FDP items | Quarterly or on a new governing document/event |
| Budgets, APP, audit reports, and year-specific records | Per document and at least annually |
| Stable identity/statistical facts | Annually or when the issuing authority updates the dataset |

These are maximum routine intervals, not guarantees that a claim stays valid until the deadline.

## Incoming research Markdown handoff

Research must stop at evidence collection. It must not edit production data directly. Submit one Markdown file using the structure below; tables may link to separate lawful evidence files when needed.

```markdown
# BetterMaddela research handoff: <scope>

- Prepared by: <researcher or stable identifier>
- Prepared at: <ISO 8601 timestamp with offset>
- Research cutoff: <YYYY-MM-DD>
- Scope included: <datasets or questions investigated>
- Scope excluded: <datasets or questions not investigated>
- Methods and access limits: <manual review, inaccessible pages, OCR limits, etc.>

## Source registry

### <source ID>: <exact title>

- Publisher:
- Original URL or direct-confirmation reference:
- Document type:
- Published at (when supplied):
- Effective period (when supplied):
- Retrieved at:
- Verified at:
- Verifier:
- Source state (`active` or `superseded`):
- Evidence file and SHA-256 (for downloaded evidence):
- Notes:

## Candidate records

### <record ID>: <label>

- Type:
- Candidate data:
- Source IDs for the record:
- Claim-to-source mapping (required when fields use different evidence):
- Proposed status (`provisional` or `blocked`; `verified` is reviewer-only):
- Effective from (when supplied):
- Effective to (when supplied):
- Update cadence:
- Review owner role:
- Proposed next review date:
- Applicable publication gate:
- Gate evidence:
- Limitations or notes:

Reviewer-only acceptance fields are added after independent review: `lastVerified`,
`acceptedBy`, `acceptedAt`, `nextReviewOn`, and final `status`.

## Direct-confirmation log

Include only when performed: office, public purpose, date/time, method,
scope/hours/call-text/permanence answers, test result, second confirmation,
and reviewer. Exclude unnecessary personal data and private correspondence.

## Conflicts and unresolved items

| Item | Competing claims or missing evidence | Source IDs checked | Why blocked/not found | Required next action |
|---|---|---|---|---|

## Media rights

| Item | Creator/rights holder | Source | License/permission | Attribution | Modified? | Restrictions | Publication recommendation |
|---|---|---|---|---|---|---|---|

## Researcher self-check

- [ ] Every candidate claim maps to source IDs.
- [ ] Original sources, dates, periods, and limitations are recorded.
- [ ] Conflicts and unsuccessful searches are disclosed.
- [ ] High-risk claims are not marked verified without their full gate evidence.
- [ ] No guessed value, secret, private contact detail, or machine-local path is included.
- [ ] Research did not directly change production data.
```

A reviewer must independently inspect the handoff and evidence before accepting records. The researcher's proposed status and review date are advisory; only the accepting reviewer may set `verified`, `acceptedBy`, `acceptedAt`, and the final `nextReviewOn`.

## Prohibited practices

- Copying Aurora, Solano, or another municipality's facts, officials, contacts, media, or identifiers into BetterMaddela.
- Treating search snippets, AI-generated prose, directory aggregators, or unsourced summaries as final evidence.
- Inventing citations, dates, fees, processing times, titles, contact purposes, document status, coordinates, or missing values.
- Choosing one value from conflicting sources without documenting and resolving the conflict.
- Publishing personal phone numbers as office lines without explicit confirmation that public use is intended.
- Calling a project complete because it was announced, funded, bid, awarded, or contracted.
- Presenting a partial roster, document index, or reporting period as complete.
- Reusing media because it is publicly viewable without establishing reuse rights.
- Implying that BetterMaddela is official, endorsed, or able to complete an LGU transaction.
- Moving raw research directly into production or hiding uncertainty in notes that users cannot see.
- Committing secrets, tunnel URLs, credentials, private correspondence, unnecessary personal data, or local-tool configuration.

## Validation expectations

Before a record enters production, review or automated checks should reject it when any of the following is true:

- a required field is empty, an ID is duplicated, or a `sourceId` does not resolve;
- a date is invalid, an effective period is contradictory, or a changing fact lacks a cadence and owner;
- the status is not `verified`, the review window has passed, or a conflict remains open;
- a source uses a search-results URL, lacks its publisher/retrieval details, or a downloaded evidence file lacks its hash;
- the applicable official, service, legislative, transparency, emergency, or media gate is incomplete;
- an emergency record lacks two confirmations, a successful test, purpose/scope, operating details, or a current monthly review;
- media lacks explicit rights and attribution metadata;
- an ordinance or resolution number was normalized incorrectly, a reporting period is absent, or a project stage is inferred rather than sourced;
- unavailable content is represented by a guess or misleading placeholder; or
- public output includes secrets, private evidence, machine-local paths, inherited municipal content, or language implying official status.

Validation may be manual or automated, but its result must be reproducible from the record and its referenced evidence. High-risk direct confirmations and media permissions always require human review.

## Acceptance boundary

Research is complete enough for implementation only record by record. A partially complete handoff is acceptable when it clearly identifies unresolved items; those items remain blocked. The site may ship with fewer facts or pages, but it must not lower these gates to appear complete.
