# BetterMaddela current architecture

## Status

This document describes the application that exists now, not a planned platform.
BetterMaddela is a pre-release conversion of the BetterAurora codebase. Inherited
Aurora and Solano content, branding, routes, caches, links, and assets are still
present and are release blockers. In particular, the inherited client-side
`src/app/admin/news-editor` route is not secure administration and must not be exposed
as one.

## Active application

The repository contains one active web application:

- Next.js 15 App Router with React and TypeScript;
- application routes and the root layout under `src/app`;
- shared interface code under `src/components` and `src/contexts`;
- repository-managed JSON consumed from `src/data` at build time and `public/data` in
  the browser; and
- static assets under `public`.

Bun installs dependencies and runs repository scripts. `next.config.mjs` configures
Next.js with `output: 'export'`; a production build writes the static site to `out`.
Serwist generates the service worker during production builds. There is no required
application server after export.

## Trust boundaries

### Research and publication

External pages, documents, scraped material, AI output, and researcher submissions are
untrusted evidence inputs. They do not become application data automatically. A human
reviewer must verify each candidate record against
`docs/data/DATA_CONTRACT.md` before moving it into a production content file.

Production civic content is repository-controlled, bundled into the static build, and
publicly readable. Secrets, private correspondence, unnecessary personal data, and
unreviewed research do not belong in either `src/data` or `public/data`. Current data
in those locations is inherited and must be removed or independently accepted before
release.

### Build and browser

Repository source, the lockfile, and build configuration are inputs to the build
boundary. Only a successful verified build output should reach hosting. The generated
`out` directory contains public files and must never be treated as a private storage
boundary.

The browser executes the exported application and service worker. Any remote font,
icon, script, map, API, or linked document is a separate third-party trust boundary
and requires a current product, privacy, security, and licensing justification.

### Deployment

This repository produces a host-agnostic static export. It does not currently define
or verify a production hosting provider, live domain, server-side security headers, or
deployment credentials. Those properties must not be claimed based on a local build.

## Explicit non-goals

The current architecture has no supported:

- backend application server or API;
- database or private data store;
- authentication, authorization, or secure administration;
- payments, bookings, applications, complaints, or other government transactions; or
- collection of resident records or other sensitive submissions.

Introducing any of these boundaries requires an explicit product decision, security
and privacy review, and an update to the canonical project documentation before
implementation.
