# BetterMaddela

BetterMaddela is an independent, volunteer-maintained BetterLGU project that aims to
make verified civic information about Maddela, Quirino easier to find and understand.

> **BetterMaddela is not an official government website.** It is not owned, operated,
> endorsed, or approved by the Municipal Government of Maddela or any other public
> body. Verify time-sensitive information with the responsible government office.

## Project status

**Pre-release / verified-baseline shell.** Inherited municipal production content has
been removed. The application publishes a deliberately small reviewed baseline:
municipal identity, postal code, the latest census population, the complete PSA
barangay dataset, census population history and growth rates, and seven reviewed
legal instruments.

Officials, contacts, emergency information, service details, local legislation,
transparency records, project status, and media remain unavailable until their
record-specific publication gates pass.

### Next steps

1. Review and import useful civic records only when they pass the
   [civic-data publication gate](docs/data/DATA_CONTRACT.md).
2. Complete the remaining manual accessibility, link, privacy, and security release
   checks.
3. Connect the repository to Vercel, inspect a preview deployment, and publish only
   after the release checks pass.

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
command checks repository policy, inherited content, civic data, types, the static
build, and automated accessibility across every public route.

### Deployment readiness

No hosting project, production domain, or deployment credentials are configured in
this repository. To deploy on Vercel:

1. Run `bun install --frozen-lockfile` and `bun run verify` on `main`, and proceed only
   when that revision is safe to expose at a public Vercel URL.
2. In Vercel, create a project by importing this GitHub repository. The initial
   deployment of `main` is a production deployment, not a private preview.
3. Keep the detected **Next.js** framework preset, repository root, build command, and
   output settings. No environment variables are currently required.
4. After the initial connection, use branch or pull-request deployments for review;
   keep `main` as the production branch.

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
