# BetterMaddela

BetterMaddela is an independent, volunteer-maintained BetterLGU project that aims to
make verified civic information about Maddela, Quirino easier to find and understand.

> **BetterMaddela is not an official government website.** It is not owned, operated,
> endorsed, or approved by the Municipal Government of Maddela or any other public
> body. Verify time-sensitive information with the responsible government office.

## Project status

**Pre-release / research-ready engineering foundation.** The repository currently
contains the inherited BetterAurora application while the BetterMaddela shell and
publication controls are established. Aurora and Solano facts, branding, routes,
caches, links, and assets remain a release blocker and must be removed before this can
be presented or deployed as BetterMaddela.

No Maddela civic dataset has been accepted for publication yet. Missing or conflicting
information will remain unavailable rather than being guessed or copied from an
unverified source.

## Technical foundation

The active application is a Next.js 15 App Router project written in TypeScript. Bun
manages dependencies and scripts, and production builds use Next.js static export.
See [the current architecture](docs/architecture/ARCHITECTURE.md) for the implemented
boundaries and known blockers.

### Local development

Install [Bun](https://bun.sh/) and Git, then run:

```bash
bun install --frozen-lockfile
bun run verify
bun run dev
```

The development server is available at `http://localhost:3000`. The verification
command runs the repository checks used for the current foundation.

## Civic-data discipline

Research is evidence input, not production content. Every changing civic claim must
retain its source, effective period, verification date, freshness expectation, and
review state. High-risk information such as emergency contacts requires direct,
recent confirmation. A reviewer must accept a record against
[the civic data contract](docs/data/DATA_CONTRACT.md) before it is published.

Do not add plausible placeholders for officials, barangay officers, contacts,
services, fees, schedules, legislation, budgets, projects, or other civic facts.

## Contributing

Start with [the project scope](docs/PROJECT_SCOPE.md) and
[contribution guide](CONTRIBUTING.md). Repository-specific instructions for human and
AI contributors are in [AGENTS.md](AGENTS.md). Report vulnerabilities privately as
described in [SECURITY.md](SECURITY.md).

## License and attribution

This repository retains the licenses and notices in [LICENSE](LICENSE). Software is
provided under the MIT License. Upstream and project-authored non-code content is
governed by CC BY 4.0 where specified; third-party assets may have separate or
unresolved rights and must not be assumed reusable. BetterMaddela is derived from
BetterAurora; see [ATTRIBUTION.md](ATTRIBUTION.md) for the source, modifications, reuse
boundaries, and non-endorsement notice.
