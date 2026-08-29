# Maddela imagery rights handoff

- **Status:** research handoff (evidence input) for a licensed media import.
- **Prepared:** 2026-08-29 by agent research session `ses_fb5ed910affemdPtTCpOGR3fay` plus direct fetch of the Commons file page (revision oldid 927424815, retrieved 2026-08-29).
- **Acceptance:** owner instruction "Use the aerial photo (Recommended)" (2026-08-29), recorded as `owner-approval-2026-08-29`.

## Selected media — the only free-licensed genuine Maddela photograph found

- **File:** `Maddela Quirino.JPG` — https://commons.wikimedia.org/wiki/File:Maddela_Quirino.JPG
- **Direct URL:** https://upload.wikimedia.org/wikipedia/commons/f/fa/Maddela_Quirino.JPG
- **Description (as stated at source):** "Aerial view of Maddela, Quirino, Philippines"
- **Date:** April 2012 · **Author:** P199 (own work) · **Source page revision:** oldid 927424815 (page last edited 2024-09-22)
- **License:** dual-licensed **CC BY-SA 3.0 Unported** and GFDL 1.2+; CC BY-SA 3.0 chosen for this project. Share-alike: we serve the file unmodified; no derivative is created.
- **Local copy:** `public/assets/images/maddela-quirino-aerial-2012.jpg`, 1500×1000 px, 385,330 bytes.
  - Integrity: downloaded byte count equals the Commons-stated size (385,330). SHA-256 of local copy: `ec3d75e867b2f2a2b666fbcfd91fc714e343b24e3fbfd9c1e14dd559861b25b1` (Commons-stated SHA-1: `93bc50434f9dc83dc9595a20c69151fd7bb5b37c`).
- **Attribution line to display:** "Aerial view of Maddela, Quirino, Philippines (April 2012), photograph by P199, via Wikimedia Commons, CC BY-SA 3.0" with links to the author page and license. Also stored beside the file as `maddela-quirino-aerial-2012.attribution.txt`.
- **Endorsement guard:** attribution in a reasonable manner; no suggestion that P199/Wikimedia endorses BetterMaddela.

## Rejected sources (do not revisit without a license change)

- Wikimedia Commons `Category:Maddela, Quirino` holds exactly 5 files: this photograph, two maps, the municipal flag (public domain — identity asset, not photography; not used), and one craft photo. Nothing else qualifies.
- Flickr photographs of the Siitan River area are CC BY-NC-ND — fail the no-ND / noncommercial-restriction bar in `docs/data/DATA_CONTRACT.md`.
- Generic stock imagery must never be presented as depicting Maddela.

## Data-quality note

The 2012 photograph is 14 years old at retrieval date. Any caption must state the capture date honestly ("Aerial view, April 2012") and must not imply current conditions.

## Community photo intake policy (process note, 2026-08-29)

Operational path for accepting community-submitted photographs. This restates
and applies the media-rights gate in docs/data/DATA_CONTRACT.md ("Media
rights", lines 147-158); it does not change that contract.

1. **Everything starts as evidence, never as production data.** A submitted
   photo is a research input. It does not enter public/assets and no page
   references it until the media gate below is complete.
2. **Review inbox, not the public tree.** Submissions land in
   esearch/media-inbox/<subject-slug>/ holding (a) the untouched original
   file and (b) a metadata sheet recording submitter, retrieval/submission
   date, claimed creator, claimed subject, and claimed license or permission.
3. **Rights evidence required per the contract.** Creator or rights holder;
   original source URL or acquisition record; explicit license or written
   permission (documentType permission-record for private grants); required
   attribution text; modification status; scope/expiry/distribution
   restrictions. "It was on a government page or in a Facebook group" is not
   reuse permission. Public-viewable does not mean reusable.
4. **No social-CDN hotlinking, ever.** If a photo only exists inside a social
   platform, the volunteer must secure permission from the rights holder and a
   stable acquisition record; the file is then downloaded, hashed, and stored
   locally beside an attribution sidecar (same pattern as the 2012 aerial
   photograph above). We never embed social-platform CDN URLs.
5. **People require depiction verification.** For any image of a named
   individual (official, employee, resident): the depicted identity must be
   confirmed against a second source tied to the subject (official listing,
   direct confirmation), never inferred from context alone. Portrait use needs
   permission from the depicted person or their rights holder, recorded as a
   permission-record. Unverified identity = blocked.
6. **Publication is opt-in per verified item.** On passing the gate the file
   moves to public/assets/images/ with its attribution sidecar, the civic
   record gains a media-file source entry, and the display caption states
   the capture date honestly (age discipline as with the April 2012 aerial).
   Failing or missing evidence = locked, stays out.
7. **Monogram fallback is the default presentation.** Officials without a
   verified photo keep the generated monogram avatar. Photos are an
   enhancement layered on verified records; absence of a photo is an honest
   state, not a defect to fill.

## Sourcing decision: LGU photographs first (2026-08-29)

Owner decision, recorded as `owner-approval-2026-08-29`. When sourcing genuine
Maddela imagery, LGU-published photographs are the preferred lane, ahead of
community submissions. The rules below restate and apply the media-rights gate
in `docs/data/DATA_CONTRACT.md` (lines 147-158); they do not change it.

### Copyright analysis for LGU-published photographs (RA 8293)

- **Sec. 172.1(k):** photographs are protected literary/artistic works by
  default, so a photo taken by a private party and merely shown on an LGU page
  does NOT enter this lane — only photographs the LGU itself publishes as its
  own.
- **Sec. 176.1:** no copyright subsists in works of the Government of the
  Philippines. Exploitation for profit would require the agency's prior
  approval; this project's noncommercial civic-information use does not, but
  source attribution and honest dating still apply in full.
- **Sec. 178.3(b):** photographs taken by LGU staff in the course of their
  regular employment are owned by the LGU as employer. Preserve any
  photographer credit the LGU page carries, never strip it.
- **Sec. 184:** the limitations on copyright (quotation, current-event
  reporting, public-interest use by or under government direction) are narrow
  and context-dependent. The project does not rest on Sec. 184 to justify
  publishing LGU photos; it rests on the Sec. 176.1 government-works rule plus
  documented provenance per item.
- **Practical consequence:** an LGU-published photo may be downloaded, hashed,
  stored locally with an attribution sidecar naming the LGU page as source, and
  captioned with the page's retrieval date — the same evidence pattern as every
  civic fact on the site.

### Privacy overlay (RA 10173 / NPC Circular 2023-04, Secs. 10, 12-A, 13, 17; circular text archived in the research cache)

- A photograph of an identifiable person is personal information; publishing
  it is processing personal information.
- Depiction verification (identity tied to a second source) stays mandatory
  from the intake policy above.
- Portraits and close-ups of named individuals require recorded permission
  before publication. Wide public-event or ceremony shots, and scene or aerial
  photographs without a naming subject, do not carry the same permission
  burden.
- Any permission we collect follows the circular's consent rules: specific,
  informed, documented, and revocable.
- Any person depicted may request removal (take-down below) regardless of the
  legal analysis; the request is honored.

### No scraping, no bulk harvesting

LGU sites are fetched as pages for evidence. Automated bulk harvesting of
media, or using a photo whose source page and retrieval date cannot be
recorded, is out of bounds. Every published photograph needs its source URL,
retrieval date, and attribution sidecar.

### Take-down path

Requests to remove a published photograph are honored as a standing project
rule — the courtesy threshold is higher than the legal minimum because
BetterMaddela is an independent project, not the government it documents.
Channel: repository issues or the project email. Action: remove the file, its
references, and note the removal in the record. No argument is required from
the requester.

### Effect on sourcing order

Preferred order is now: (1) LGU-published photographs under the rules above;
(2) community submissions via the intake policy above; (3) free-licensed
single finds such as the 2012 aerial photograph. Social-platform-only imagery
remains out unless a permission record exists; hotlinking stays barred.
