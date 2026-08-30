# BetterMaddela project scope

## Purpose

BetterMaddela is an independent, community-maintained BetterLGU civic-information site
for Maddela, Quirino. It aims to make verified local-government information easier to
find and understand. It is not owned, operated, endorsed, or approved by the Municipal
Government of Maddela.

## MVP

The first useful release provides an accessible, responsive, static information layer
with:

- a prominent independent-project disclaimer;
- municipal identity and civic records only after their evidence passes the applicable
  publication gate;
- source and last-verification information for changing facts;
- honest unavailable states for missing or conflicting records;
- focused navigation for verified services, offices, officials, barangays, contacts,
  transparency records, and legislation as each dataset becomes publishable; and
- clear attribution, correction, accessibility, privacy, and security information.

The inherited-content removal is implemented. The remaining acceptance for the MVP is
that any intended deployment boundary is separately reviewed; the repository and
accessibility release checks have run and are recorded in
[`docs/ACCESSIBILITY.md`](ACCESSIBILITY.md) and the README project status.

## Accessibility acceptance

Public pages target WCAG 2.2 Level AA. Before release, representative routes for every
shared layout and interaction must have:

- an automated accessibility scan with no serious or critical findings;
- keyboard-only review covering navigation, visible focus, dialogs, forms, and skip
  links;
- manual checks for headings, accessible names, error messages, contrast, zoom/reflow,
  reduced motion, and meaningful alternative text; and
- a recorded list of routes, browsers, tools, results, and justified exceptions.

UI changes must report the applicable manual checks immediately. The automated
accessibility gate runs in `bun run verify`; the scripted manual review runs via
`bun run test:accessibility-manual`. Their routes, tools, results, and justified
exceptions are recorded in [`docs/ACCESSIBILITY.md`](ACCESSIBILITY.md).

## Glance-first direction (2026-08-26)

Owner-approved product direction lives in
[`docs/product/UX_PRINCIPLES.md`](product/UX_PRINCIPLES.md). Summary: the primary
user is a visual learner who glances; every surface leads with one dominant visual
(big numbers, charts, timelines, org charts, maps) with full detail one click away.
Motion is GSAP-only and reduced-motion-safe; the closed-token palette stays (no
shadcn/Tailwind); maps use the Google Maps embed with a privacy disclosure; weather
is resident utility and must not outrank the transparency spine.

Round 1 surfaces: location story, government-structure org chart, history timeline
story, and a projects board. Content that still requires evidence collection before
publication is tracked in that document's research-gated roadmap; missing datasets
render as designed, honest unavailable states — never placeholders.

## Non-goals

The MVP does not:

- act as an official LGU website or imply government endorsement;
- accept payments, permit applications, appointments, complaints, or other official
  transactions;
- store sensitive resident records;
- expose a client-side page as secure administration;
- publish guessed, provisional, conflicting, stale, or unconfirmed civic facts;
- publish emergency contacts without direct, recent confirmation; or
- add speculative platforms, services, automation, or infrastructure for future use.

## Foundation and research boundary

This repository is a standalone adaptation derived from `Jayke770/betteraurora` at
upstream baseline commit `c9490e83efc712b33c12e3f5ba6d8208f403991a`. It retains the
upstream Git history and software foundation under the existing licence and attribution
requirements. BetterAurora is a design and code starting point only; its municipal
facts, images, branding, and operational assumptions are not BetterMaddela data. Its
interface and route compositions may be reused only with reviewed Maddela records or
honest section-level unavailable states. The core application is live; remaining
release checks and data coverage are tracked in the README project status.

Implementation may establish the clean shell, schemas, validation, accessibility, and
publication controls before civic research is complete. Research is a separate input:
submitted notes and documents remain evidence candidates until reviewed against
`docs/data/DATA_CONTRACT.md`. Missing research blocks the affected content, not the
engineering foundation, and must never be filled with plausible placeholders.
