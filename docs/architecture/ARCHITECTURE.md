# BetterMaddela current architecture

## Status

This document describes the application that exists now, not a planned platform.
BetterMaddela is a pre-release static civic-information shell. Inherited municipal
production content, branding, routes, caches, scripts, and assets have been removed.

## Active application

The repository contains one active web application:

- Next.js 15 App Router with React and TypeScript;
- application routes and the root layout under `src/app`;
- shared interface code under `src/components`;
- reviewed, repository-managed civic JSON under `src/data/civic`; and
- build-time validation under `scripts`.

Bun installs dependencies and runs repository scripts. `next.config.mjs` configures
Next.js with `output: 'export'`; a production build writes the static site to `out`.
There is no service worker, runtime civic-data API, or required application server
after export.

## Trust boundaries

### Research and publication

External pages, documents, scraped material, AI output, and researcher submissions are
untrusted evidence inputs. They do not become application data automatically. A human
reviewer must verify each candidate record against
`docs/data/DATA_CONTRACT.md` before moving it into a production content file.

Production civic content is repository-controlled, bundled into the static build, and
publicly readable. Secrets, private correspondence, unnecessary personal data, and
unreviewed research do not belong in `src/data`. Only accepted records from the public
source registry may enter that directory.

### Build and browser

Repository source, the lockfile, and build configuration are inputs to the build
boundary. Only a successful verified build output should reach hosting. The generated
`out` directory contains public files and must never be treated as a private storage
boundary.

The browser executes the exported application. The current interface uses no remote
font, analytics, map, API, or third-party script. Linked source documents are separate
third-party trust boundaries.

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
