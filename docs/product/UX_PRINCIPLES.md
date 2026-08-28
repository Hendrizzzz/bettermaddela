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

## Hard interface rules (owner-mandated 2026-08-26, round 2 — amended 2026-08-27; round 4 override below supersedes conflicting items)

1. ~~**Pills allowed**~~ **Pills banned (round 4).** Rounded chip/badge shapes are no longer used anywhere. Reputation and status render as quiet text: small-caps labels, the green "Checked" stamp, stacked source lines.
2. **Babysitting text allowed in the glance layer.** The glance layer may include a one-sentence orienting line (≤20 words) that names the civic role, data scope, or next step — e.g. "Municipal Mayor — presides over the Sangguniang Bayan." GSAP structure still carries the primary meaning.
3. **Cut text relaxed.** A card may carry a name, a number, one-line description, and a status line. Full evidence still lives one click away (expanders, tables, sources).
4. **More GSAP, orchestrated.** Premium modern motion: drawn connectors, staggered cascades, count-ups on money/numbers, scroll-scrubbed progress. Always reduced-motion-safe.

## Owner design brief (ratified 2026-08-26, round 3; amended 2026-08-27; items 1, 2, 4 (boxed-chip clause), and 5 superseded by round 4). These are the current laws.

### Adopt these (as amended)

1. ~~**Double labels.**~~ **Single labels (round 4).** Sections and components are title + body. No eyebrow/kicker line above a title; the title carries the meaning once. A subordinate classification line (e.g. barangay urban/rural class) is allowed only when it adds data, never as decoration.
2. ~~**Numbered markers.**~~ **No deck numbering (round 4).** Ordered narrative steps use layout and arrows, not `01 / 02 / 03` markers, dot leaders, or forms like `02 · Benches` / `01 — Philippines`.
3. **Data re-statement.** A fact may appear twice per surface when it aids glance recognition — e.g. the hero stat and the same number inside its detail section, or mayor name in the chart and again in the leadership grid. Provenance (source, `asOf`) travels with each instance. This is different from the banned role+office echo on one card (see not-likes).
4. **Hairline divider lines.** Hairlines are the primary section and card structure: `1px solid var(--line)` row separators, header underlines, meta-bar borders, and `border: 1px solid var(--line)` card containment.
5. ~~**Em dashes.**~~ **Commas and stacks (round 4).** Em dashes and dash-like rules are banned in rendered UI, and the middot `·` separator is banned everywhere rendered. Inline meta uses commas ("PSA dataset, 2020 census") or stacked lines (value / label / source). En dashes in date ranges (2010–2019) remain legitimate.
6. **Template flow (FOL: hero, features grid, cards, repeat).** Sections follow the proven BetterAllen/Better LGU template rhythm: hero → features/services grid → stats band → location/map story → history/timeline → updates/projects → government → contact. Each section is a `py-12` contained band with alternating `bg-white` / `bg-alt` and a clear header. Overlap/stick/scale/bleed is an effect *inside* a section, not a mandate to dissolve section boundaries.
7. **Data repetition for reputation.** Category, status, `asOf`, and sublabel travel wherever the data is shown, as quiet text lines; emergency/contact duplication across header strip + page grid is intentional redundancy.

### Owner likes and not-likes (2026-08-28, round 4 — binding)

The owner reviewed round-2/3 surfaces live and recorded these reactions. They apply
to every rendered surface, including the header, hero, stats, cards, charts, and meta.

**Not-likes — never render these again:**

1. Em dashes and dash-like separator rules (the gold dash before kickers included).
2. The middot `·` used as a separator anywhere rendered ("Independent · not the LGU").
3. Kicker/eyebrow lines above titles; a section is title + body, nothing above the title.
4. The same role and office stacked on one official card ("Municipal Civil Registrar" over "Municipal Civil Registry Office") — show the designation once.
5. Dead whitespace in stretched cards — short content inside a tall grid cell must center itself (the Vice Mayor chart node).
6. Primary nav overlapping or crowding the EN/FIL buttons at any width.
7. Pills, badges, and rounded chips.
8. Deck-style numbering and dot-leader meta (`02 · Benches`).

**Likes — keep and reuse:**

1. Title + body hierarchy with generous whitespace.
2. Hairlines as the structural device.
3. The quiet small-caps green "Checked" provenance stamp.
4. Amber (`#8a5e0f`) accents used sparingly for role/type labels — in sentence case, never long uppercase strings.
5. Stacked source lines (value, then label, then source) instead of inline separator punctuation.
6. Overall premium restraint: the page should feel quiet, confident, and expensive.

### Still never do these
1. **AI slop.** No glassmorphism, random gradients, meaningless glows, gradient text, sparkles, Awwwards imitation with bad usability. Identical rounded card grids are now *allowed* when they are the template flow — slop is unconsidered use, not the grid itself.
2. **Janky motion.** No sudden shifts, snaps, or zaps when sections lock or release. One smoothing layer only. Animations must end exactly at handoff points. Reduced-motion always respected.
3. **Unverified imagery or layout in-betweens.** Images either bleed fully to the edge or are fully rounded cards, never both. Nothing clips or collides during motion. Every navigation click path must work.
4. **Filler that repeats without hierarchy.** Eyebrow/heading/pill that say byte-identical text with no added scope is still banned; double labels must refine (category → instance → badge), not echo.

### Always do these
1. **20 percent rule.** A focused experience using about a fifth of the available information, chosen with judgment, beats exposing everything. Cut what does not earn its place.
2. **Strong art direction.** Composition, typography, rhythm, motion. The wow comes from these, never from noise. Portfolio-grade, premium, intentional.
3. **Signature interactions** that belong specifically to BetterMaddela.
4. **Real storytelling as you scroll**, within a page. The site stays multi-page with the same persistent header — continuous experience applies inside each page via BetterAllen-style section rhythm, never by merging the site into one page. Headers persist across routes (copied from BetterAllen `Navbar` → `SiteHeader`).
5. **Usability above all**, and mobile must feel designed, not like a collapsed desktop site.
6. **Inspect the rendered result.** Every change gets real browser screenshots at desktop and mobile widths, critiqued and iterated, before handoff. Never judge from source code alone.
7. **Work quietly, take ownership.** Make strong creative decisions; do not ask the owner to choose directions.
8. **Technology only when it earns its place** (GSAP, Lenis, plain CSS).
9. **BetterLGU compliance is the floor, not the ceiling.** The directory's five core areas (officials, budget, projects, ordinances/resolutions, contact) must stay present and prominent; art direction never hides them. Title/description/og:image must be Maddela-specific per `crawl-lgu-meta.js:122` boilerplate gate, under 400 KB, and robots must allow `BetterLGUDirectoryBot`.
10. **Data reputation is structured.** Every changing fact shows a status line + `asOf` + sublabel as quiet text (the green "Checked" stamp or a stacked source line); emergency contacts duplicate intentionally across the header strip + contact grid once verified. No pills.

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
