# Contributing to BetterMaddela

BetterMaddela is an independent BetterLGU civic-information project. It is not owned, operated, or endorsed by the Municipality of Maddela. Contributions should make verified public information easier to find without presenting the site as an official government service.

## Before you start

- Search existing issues and pull requests before opening a duplicate.
- Keep each change focused. Discuss broad redesigns, new data sources, or architecture changes in an issue first.
- Do not include local agent configuration, credentials, transcripts, research dumps, or machine-specific paths.
- Report security issues privately according to [SECURITY.md](SECURITY.md).

## Local setup

Install [Bun](https://bun.sh/) and Git, then run:

```bash
git clone https://github.com/Hendrizzzz/bettermaddela.git
cd bettermaddela
bun install --frozen-lockfile
bun run dev
```

## Branches, commits, and pull requests

Create a short-lived branch from the current target branch. Use a descriptive name such as `fix/service-source` or `feat/barangay-directory`. Keep commits scoped and write messages that explain the change, for example `fix: correct service source date`.

A pull request should:

- explain its scope and user impact;
- identify every civic-data addition, removal, or change;
- include screenshots for visible interface changes;
- report the checks actually run and their results;
- call out accessibility, privacy, security, licensing, and migration risks; and
- avoid unrelated formatting, generated-file, or dependency changes.

Only repository maintainers or reviewers authorized by the code owners may approve and merge changes. Approval is not guaranteed, and a maintainer may request that a large contribution be split.

## Civic data and content

Do not guess or infer officials, barangay officers, hotlines, contacts, fees, requirements, processing times, coordinates, ordinances, project status, or other changing facts.

For each factual change, provide enough evidence for a reviewer to verify it:

- source publisher and document or page title;
- direct source URL or repository evidence file;
- retrieval date and the fact's effective or “as of” date when known;
- the exact claim supported and its verification status; and
- conflicts, uncertainty, or expiry/freshness concerns.

Prefer authoritative public sources. Search snippets, social posts, AI output, and scraped aggregations are discovery aids, not sufficient publication evidence by themselves. Emergency information and other high-risk changing facts require direct confirmation. If evidence is incomplete or conflicting, leave the content unavailable and document the gap instead of publishing a best guess.

Do not submit private personal information. Public officeholder information must still be relevant, sourced, and limited to the civic purpose. Images, logos, maps, and documents require documented reuse permission or a compatible license; include attribution where required.

## Engineering expectations

- Preserve the independent-project disclaimer and BetterAurora attribution.
- Do not expose a client-side route as a secure editor or add an unofficial transaction flow.
- Use semantic HTML, keyboard-accessible interactions, meaningful labels, sufficient contrast, and useful alternative text.
- Keep third-party code and services to the minimum needed for the feature.
- Update documentation when behavior or contributor expectations change.

Run the relevant checks available in the repository before requesting review:

```bash
bun install --frozen-lockfile
bun run verify
```

Run `bun run audit:inherited` when working on the conversion purge; it remains an
expected release blocker until inherited Aurora and Solano production content is gone.
Also run any content validation, tests, or accessibility checks introduced for the area
you changed. Never report a check as passing unless it ran successfully on your current
tree.

By contributing, you agree that your work may be distributed under the repository's license and that you have the right to submit it.
