# BetterMaddela

BetterMaddela is an independent, volunteer-maintained BetterLGU project that makes
verified civic information about Maddela, Quirino easier to find and understand.

The site is live and actively maintained at
[bettermaddela.vercel.app](https://bettermaddela.vercel.app).

> **BetterMaddela is not an official government website.** It is not owned, operated,
> endorsed, or approved by the Municipal Government of Maddela or any other public
> body. Verify time-sensitive information with the responsible government office.

## What you'll find

- **Civic facts** — municipal identity and postal information; population, household,
  poverty, and barangay statistics; and verified contacts.
- **History and leadership** — reviewed legal history and dated leadership and
  office-head observations.
- **Transparency** — selected agency updates, procurement records, and transparency
  documents; a scoped community profile; and licensed media and maps.

Every published record is checked against cited sources before publication, and
missing datasets are shown as unavailable — never guessed or filled with placeholders.

Coverage is intentionally incomplete. Service requirements, fees, and processing
times have no verified records yet, and project, budget, and transparency coverage
is partial.

## How you can help

- **Report a problem.** Open an issue or pull request if any published fact is wrong,
  outdated, or missing a source, or if a page has a layout or accessibility issue.
  Accessibility release checks and their recorded results are in
  [docs/ACCESSIBILITY.md](docs/ACCESSIBILITY.md).
- **Research missing data.** The largest gaps are service requirements, projects, and
  transparency documents. Submissions are evidence inputs and must pass
  [the civic-data publication gate](docs/data/DATA_CONTRACT.md) before publication.

## For developers

The site is a Next.js 16 App Router project in TypeScript, built as a static export.
[Bun](https://bun.sh/) manages dependencies and scripts.

```bash
bun install --frozen-lockfile
bun run verify   # repository policy, civic data, types, build, accessibility
bun run dev      # http://localhost:3000
```

`main` deploys to Vercel automatically. Before merging a deployment change, inspect
the branch preview at desktop and mobile widths. Architecture, deployment details,
and known blockers: [docs/architecture/ARCHITECTURE.md](docs/architecture/ARCHITECTURE.md).
Contribution rules for human and AI contributors: [CONTRIBUTING.md](CONTRIBUTING.md)
and [AGENTS.md](AGENTS.md). Report vulnerabilities privately via
[SECURITY.md](SECURITY.md).

## Data discipline

Research submissions are evidence, not content. Every changing civic claim keeps its
source, effective period, verification date, and review state, and a reviewer must
accept it against [the civic data contract](docs/data/DATA_CONTRACT.md) before
publication. Never add plausible placeholders for officials, contacts, services, fees,
schedules, legislation, budgets, or projects.

## License and attribution

This repository retains the licenses and notices in [LICENSE](LICENSE). Software is
provided under the MIT License. Upstream and project-authored non-code content is
governed by CC BY 4.0 where specified; third-party assets may have separate or
unresolved rights and must not be assumed reusable. BetterMaddela is derived from
BetterAurora; see [ATTRIBUTION.md](ATTRIBUTION.md) for the source, modifications, reuse
boundaries, and non-endorsement notice.
