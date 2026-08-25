# Vendored agent skills

These folders are development-time instruction documents copied into the repository so
that every contributor (human or agent) applies the same design-review standards when
working on BetterMaddela. They are tooling and documentation only — nothing in
`.agents/` is part of the shipped website build.

Copied on 2026-08-25 at the repository maintainer's request.

| Skill | Source repository | Pinned path | Version vendored | License |
| --- | --- | --- | --- | --- |
| `emil-design-eng` | https://github.com/emilkowalski/skills | `skills/emil-design-eng` | tree `175725745e70946d891b93a1694d7c9ebb71b69d` (byte-exact match) | MIT |
| `impeccable` | https://github.com/pbakaus/impeccable | `.agents/skills/impeccable` | current `main` HEAD at copy time — **drifted** from the previously installed tree `c10903ca3e7fe0b1815576f9b67730b588fba665` (upstream advanced past that commit; not found in recent history) | Apache-2.0 |
| `frontend-design` | https://github.com/anthropics/skills | `skills/frontend-design` | tree `0d5b74a14bdf3ebcd64f352d06376a2ef05ed296` (byte-exact match); folder-level `LICENSE.txt` included | Apache-2.0 (folder LICENSE.txt) |
| `web-design-guidelines` | https://github.com/vercel-labs/agent-skills | `skills/web-design-guidelines` | tree `3116f3e62dbd02b44a598b1aa690d2a8938e8f89` (byte-exact match) | none declared upstream |

## Notes and cautions

- Original install provenance comes from the maintainer's local
  `~/.agents/.skill-lock.json`; the previous local copies were lost from that machine,
  so these were re-fetched from the pinned public sources above.
- `web-design-guidelines` is published without an explicit license upstream. It is
  vendored here as an internal development reference only. If this repository is ever
  redistributed as a template, remove or replace that folder first.
- `impeccable/scripts/` includes bundled third-party JavaScript (for example
  `modern-screenshot.umd.js`) inherited from its upstream distribution. It runs only in
  local development sessions and is never deployed.
- Update policy: refresh a skill by re-cloning its source repository and replacing the
  folder; update this file's version column in the same change.
