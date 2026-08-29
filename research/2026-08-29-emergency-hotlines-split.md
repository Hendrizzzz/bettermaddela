---
prepared-by: research-agent:contacts-2026-08
date: 2026-08-29
title: Emergency hotlines split — unpublishing local numbers, keeping 911 and 143
status: DECISION RECORD — owner-approved 2026-08-29
---

# Emergency hotlines split — decision record

## What was published (2026-08-28) and why it is being withdrawn

On 2026-08-28 the record `maddela-emergency-contacts` was published on
`/contact` with six entries:

| Service | Details | Evidence basis |
|---|---|---|
| PNP — Maddela Municipal Police Station | `+63-905-617-2749` | LGU website, Local Hotlines (archived 2023-04-02) |
| BFP — Maddela Fire Station | `+63-917-511-1429` | LGU website, Local Hotlines (archived 2023-04-02) |
| Maddela LDRRMO | `+63-977-851-9603`; `+63-966-259-5691` | LGU website, Local Hotlines (archived 2023-04-02) |
| PDRRMO Quirino — Rescue 910 (24/7) | Globe `0975 415 8508`; PLDT `(078) 374-6118` | Provincial directory (live, retrieved 2026-08-28) |
| National emergency hotline | `911` | Official Gazette record of the 911 launch (2016) |
| Philippine Red Cross emergency hotline | `143` | Red Cross contact page (retrieved 2026-08-28) |

The data contract (`docs/data/DATA_CONTRACT.md`, emergency gate) requires direct
confirmation and authorized test calls before an emergency number is published.
Those calls were never made. The 2026-08-28 publication relied on an explicit
owner direction recorded in the record's `notes`; on 2026-08-29 the owner
reviewed the gate again and narrowed the direction: **publish only the national
911 and 143 hotlines; unpublish every local and provincial emergency number
until they are confirmed directly.**

## What replaces it

- New record `national-emergency-hotlines-2026`: 911 and 143 only, same
  evidence bases as above (`official-gazette-911-2016`,
  `redcross-contact-2026`).
- `/contact` shows the two national hotlines plus a pending panel that names
  the local services (PNP Maddela, Maddela Fire Station, Municipal DRRRMO,
  provincial Rescue 910) without numbers, and tells readers to call 911.
- The site-wide hotline strip (site header) shows 911 and 143 plus
  non-emergency office contacts from `maddela-lgu-office-contacts-2023`, each
  labelled with its 2023 vintage.

## What stays available

- The withdrawn numbers remain in git history (this file and the superseded
  record) as preserved evidence; nothing is silently erased.
- The underlying evidence collection, including source URLs and capture dates,
  is in `research/2026-08-contacts-emergency-hotlines.md`.
- The provincial directory contacts on `/contact` (governor's office,
  administrator, main line, email, address) are unchanged — they are
  non-emergency office contacts from the live provincial pages.

## Outstanding review action

Direct confirmation and test calls to PNP Maddela, BFP Maddela, LDRRMO Maddela,
and PDRRMO Rescue 910. When they are done and documented, the local numbers can
be republished under a new record with the test-call log attached.
