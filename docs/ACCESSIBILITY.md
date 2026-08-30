# BetterMaddela accessibility review record

This is the release-check record required by the accessibility acceptance section of
`docs/PROJECT_SCOPE.md`: the routes, browsers, tools, results, and justified exceptions
for accessibility review of the public site. Re-run the commands below after UI changes
and update this record in the same change that alters public behavior.

## Commands

```text
bun install --frozen-lockfile
bun run test:accessibility         # axe scan, every route, 390x844
bun run test:accessibility-manual  # scripted manual checks, representative routes
```

Both must pass with zero findings for a release. The manual script exits non-zero and
prints each finding when a check fails.

## Tools and environment

- axe-core via `@axe-core/playwright` 4.13 (WCAG-oriented rules, color contrast included)
- `playwright-core` 1.62 driving Chrome (headless, `channel: "chrome"`)
- Static export served locally from `out/` by the check scripts
- Review date: 2026-08-30, against the working tree that introduced this record
  (commit `96c8a79` plus this change)

## Coverage

`check-accessibility.mjs` axe-scans **every generated route** (69 static pages at the
time of this record) at 390x844: no serious or critical findings.

`check-a11y-manual.mjs` adds scripted manual checks on 20 representative routes — one or
more for every shared layout and interaction:

| Route | Layout / interaction represented |
| --- | --- |
| `/` | Home: hero, search form, glance stats, locator and atlas maps, weather, timeline, news |
| `/services` | Services index |
| `/services/certificates` | Service category layout (all 10 categories share it) |
| `/government` | Government structure chart (GSAP reveal) |
| `/government/officials` | Officials directory with filters |
| `/government/barangays/dipintin` | Barangay detail layout (all 32 share it) |
| `/barangays` | Barangay summary page with page-header decor |
| `/statistics`, `/population` | Glance-first numeric and chart layouts |
| `/budget`, `/projects` | Transparency spine and projects board |
| `/legislative`, `/news`, `/legal-history` | Feed and GSAP timeline layouts |
| `/contact`, `/sources` | Contact/corrections and source directory |
| `/faq` | Accordion layout |
| `/privacy`, `/accessibility` | Policy page layout (shared by `/terms`, `/security`) |
| `/_not-found` | Error-state layout |

Checks run on each representative route:

- **Automated scan at three widths** (320, 390, 1280) with axe: no serious or critical
  findings; color contrast covered at all three widths.
- **Heading structure**: exactly one `h1` per page, no skipped heading levels, no empty
  headings.
- **Accessible names**: every `img` has an `alt`; inline SVGs are `aria-hidden`,
  presented, or labelled. Leaflet's internal SVG rendering layer is exempt: it is a
  drawing canvas inside a map region that carries its own `role` and `aria-label`.
- **Scripted keyboard traversal** (646 stops recorded): the skip link is the first tab
  stop on every route and jumps to `#main-content`; every focusable element reached by
  `Tab` has a visible focus indicator (outline, box shadow, or underline via computed
  styles); focus cycles normally to the end of each page.
- **Mobile menu keyboard operation** at 390px: `Enter` opens the disclosure nav with
  `aria-expanded="true"`, `Escape` closes it and returns focus to the toggle, and the
  Services dropdown expands by keyboard.
- **Search form**: the input has a programmatic label; `Enter` with a query navigates
  to the matched category; an empty submission stays on the page.
- **Reflow at 320px**: no horizontal overflow (WCAG 1.4.10).
- **`prefers-reduced-motion: reduce`** emulation: no content is left hidden
  (GSAP components set final states; CSS media queries in `public/assets/css` neutralize
  CSS animation).

## Results

- 2026-08-30: first full manual release review. One defect found and fixed in the same
  change: the inactive language-toggle button (`EN`/`FIL`) used `opacity: 0.7`, which
  composited `--color-primary` text on white to roughly 3.1:1 and failed contrast at
  desktop width. Replaced with the `--color-text-light` token (about 5.9:1). All checks
  now pass: 20 representative routes, 3 widths each, 646 keyboard stops, mobile menu,
  search form, reflow, reduced motion.

## Justified exceptions and limitations

- **No human assistive-technology walkthrough.** The keyboard review is a scripted
  traversal with computed-style focus verification, not a human screen-reader session.
  A sighted or screen-reader user walkthrough remains recommended before any future
  redesign; it is not a regression gate for routine changes.
- **Focus-visibility salience is mechanical.** The script verifies that a focus
  indicator exists (outline, shadow, or underline), not that a human judges it salient
  in every context. The closed token palette keeps indicator styles centralized in
  `public/assets/css`.
- **`/service-details/[slug]` has no generated routes yet**: no verified service-detail
  records exist, so that layout is unreviewed by construction. Review it when the first
  record publishes (data gate: `docs/data/DATA_CONTRACT.md`).
- **Dynamic third-party embeds** (Google Maps iframe, Open-Meteo data) are reviewed via
  their containers and disclosures; their internal DOM is outside this repository's
  control.
- **Filipino (`fil`) translations** update `lang` attributes correctly, but translation
  completeness is a content-quality matter outside this accessibility record.
