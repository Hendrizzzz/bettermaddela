# BetterMaddela current architecture

## Status

This document describes the application that exists now, not a planned platform.
BetterMaddela is a pre-release static civic-information site. The upstream interface
and route compositions are intentionally preserved, while inherited municipal facts,
branding, links, integrations, caches, and unsupported assets are removed or replaced
with reviewed Maddela data and honest unavailable states.

## Active application

The repository contains one active web application:

- Next.js 16 App Router with React and TypeScript;
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

The browser executes the exported application. The interface requests the Inter font
stylesheet from Google Fonts and the Bootstrap Icons stylesheet from jsDelivr. The
homepage requests a public model forecast from Open-Meteo and embeds a general-area
OpenStreetMap view; both are third-party network boundaries and receive ordinary
request metadata. No third-party script is loaded into BetterMaddela's own document,
and the site uses no analytics or advertising.

Browser local storage contains the selected `en` or `fil` interface language and a
short-lived Open-Meteo response cache. The current forecast cache is reused for up to
30 minutes, with a six-hour degraded fallback when the provider is unavailable. It
contains forecast values, the technical forecast point, and a fetch time—not user
submissions or resident records. Linked source documents and the external providers
above remain separate trust boundaries.

### Deployment

This repository produces a host-agnostic static export. The GitHub repository is
connected to Vercel project `bettermaddela`; `main` deploys to
`https://bettermaddela.vercel.app`, while other branches and pull requests receive
preview deployments. A successful deployment alone does not establish that civic
content is accurate or that release checks passed; the accessibility release record
lives in `docs/ACCESSIBILITY.md` and the publication gates in `docs/data/DATA_CONTRACT.md`.

Vercel's Next.js framework defaults, the existing `package.json` build script, and
`next.config.mjs` are sufficient; no `vercel.json` override or application environment
variable is currently required. Deployment credentials remain outside the repository.
Server-side platform behavior must be verified against the actual deployment rather
than inferred from a local build.

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
