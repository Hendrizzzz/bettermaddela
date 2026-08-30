# BetterMaddela

BetterMaddela is an independent, volunteer-maintained BetterLGU project that aims to
make verified civic information about Maddela, Quirino easier to find and understand.

> **BetterMaddela is not an official government website.** It is not owned, operated,
> endorsed, or approved by the Municipal Government of Maddela or any other public
> body. Verify time-sensitive information with the responsible government office.

## Project status

**Live and maintained.** The core site is complete and deployed to
[bettermaddela.vercel.app](https://bettermaddela.vercel.app). It publishes 58 verified
civic records covering municipal identity and postal information; population,
household, poverty, and barangay statistics; reviewed legal history; dated leadership
and office-head observations; selected agency updates, procurement records, and
transparency documents; a scoped community profile; verified contacts; and licensed
media and maps. Missing datasets render as honest unavailable states, never
placeholders.

Coverage is intentionally incomplete. Service requirements, fees, and processing
times have no verified records yet. Project, budget, and transparency coverage is
partial, and local office contacts are limited.

### How you can help

- **Fix UI issues.** Report or correct layout, accessibility, or presentation
  mistakes on any page or viewport. Accessibility release checks and their recorded
  results live in [docs/ACCESSIBILITY.md](docs/ACCESSIBILITY.md).
- **Correct published data.** Open an issue or pull request with evidence for any
  fact shown here that is wrong, outdated, or missing a source.
- **Research missing data.** The largest gaps are services (no verified records
  yet), projects, and transparency documents. Submissions are evidence inputs and
  must pass [the civic-data publication gate](docs/data/DATA_CONTRACT.md) before
  publication.

## Technical foundation

The active application is a Next.js 16 App Router project written in TypeScript. Bun
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
command checks repository policy, inherited content, civic data, types, the static
build, and automated accessibility across every public route.

### Deployment

The GitHub repository is connected to the Vercel project `bettermaddela`. Vercel
deploys `main` to [bettermaddela.vercel.app](https://bettermaddela.vercel.app) and
creates previews for other branches and pull requests. The site is publicly launched;
its accessibility release checks and their recorded results live in
[`docs/ACCESSIBILITY.md`](docs/ACCESSIBILITY.md).

Before merging a deployment change:

1. Run `bun install --frozen-lockfile` and `bun run verify`.
2. Inspect the branch preview at desktop and mobile widths.
3. Merge to `main` only after the revision is safe for the public production URL.

The project uses Vercel's detected **Next.js** preset, repository root, build command,
and output settings. No application environment variables are currently required.

Vercel automatically detects Next.js and applies framework defaults. The existing
`package.json` build script and `next.config.mjs` static-export settings are sufficient,
so a `vercel.json` file is not needed unless a future requirement must override those
defaults. See Vercel's official [Git deployment guide](https://vercel.com/docs/git) and
[project configuration reference](https://vercel.com/docs/project-configuration).

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
