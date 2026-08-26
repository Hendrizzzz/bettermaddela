# BetterMaddela UX principles

Owner-approved product direction (2026-08-26). This document governs interface and
presentation decisions. It does not change the data contract: civic facts still
publish only through `docs/data/DATA_CONTRACT.md`.

## The glance-first contract

The primary user is a **visual learner who glances**. Every public surface must
deliver its core meaning visually — structure, graphics, motion, and labels — so a
first-time visitor understands the page in seconds. Reading is optional depth, never
the price of understanding.

1. **Glance first, read second.** Each section leads with one dominant visual or
   big-number statement. Full detail stays available (expanders, tables, sources)
   but is never the entry point.
2. **Graphics before tables.** Numbers become charts, bars, timelines, maps, and org
   charts. The complete table still exists for verification and accessibility.
3. **Story structure.** Explanatory surfaces (history, government structure,
   location) read as a narrative a high-school student can follow: what came before,
   what changed, what exists now.
4. **Mobile-first.** Every visual must work as a vertical, touch-friendly layout.
5. **Honest empties.** A dataset that has not passed verification is shown as a
   designed, quiet "not yet published — here's why and what it takes" state. No
   dummy data, ever.
6. **Provenance survives polish.** Sources, review dates, and computed-figure labels
   remain visible or one click away on every surface.
7. **A bit fancy.** Restrained premium motion in the manner of modern premium
   websites — orchestrated reveals, count-ups, scroll-triggered timelines. Never
   decorative noise; never a barrier to information.

## Technology decisions (owner-approved 2026-08-26)

- **Motion: GSAP only.** The repo already ships GSAP + the `Reveal` component. All
  new motion uses GSAP and CSS, honors `prefers-reduced-motion`, and adds no new
  animation dependencies.
- **No shadcn/ui / Tailwind.** Adopting them would discard the closed-token CSS
  system (enforced by `check:design`). The Golden Hour token system stays.
- **Maps: Google Maps embed.** The standard Google Maps iframe (no API key) replaces
  OpenStreetMap embeds for familiarity. The privacy page must disclose
  Google's third-party involvement wherever the embed loads.
- **Weather: kept but demoted.** Weather is resident utility, not transparency; it
  must not dominate the homepage or outrank the transparency spine.

## Round 1 surfaces (approved 2026-08-26)

1. **Location story** — "Where is Maddela?": Philippines → Quirino → Maddela context
   with a Google Maps embed; weather demoted within the section.
2. **Government structure explainer** — visual org chart of a Philippine municipal
   LGU (RA 7160 roles, responsibilities, reporting lines) with verified incumbents
   where reviewed records exist and designed withheld states where they do not.
3. **History timeline story** — visual narrative from early settlements (Bugkalot/
   Ilongot presence, Pinappagan associations) through the documented legal
   milestones, each node labeled by evidence type; undocumented periods stay
   honestly empty.
4. **Projects board** — procurement and project records as glanceable cards
   (what/amount/stage/timeline) with detail on demand.

## Research-gated content roadmap

These surfaces are designed but blocked on evidence collection (tracked via the
data contract; research lives in `research/`):

- Barangay captains and barangay officials (per-barangay profile enrichment)
- Sangguniang Bayan ordinances and resolutions corpus
- Infrastructure/projects dataset beyond procurement items
- Municipal contact directory and emergency contacts (highest evidence bar)
- Complete Sangguniang Bayan roster
