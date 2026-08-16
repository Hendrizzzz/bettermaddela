# Security policy

BetterMaddela is an independent, open-source civic-information project. It is not an official Municipality of Maddela system and must not be used to submit government transactions, credentials, payments, or sensitive personal information.

## Report a vulnerability privately

Do not disclose a suspected vulnerability in a public issue, discussion, pull request, or chat.

Use [GitHub private vulnerability reporting](https://github.com/Hendrizzzz/bettermaddela/security/advisories/new). If that form is unavailable, open a public issue asking the maintainer to enable a private reporting channel, but include no vulnerability details in it.

Include, when possible:

- the affected page, file, dependency, or deployment;
- reproducible steps or a minimal proof of concept;
- the likely impact and conditions required to exploit it; and
- suggested mitigations, without including real secrets or personal data.

No response or remediation deadline is promised. Reports will be assessed according to impact, reproducibility, and maintainer availability. Coordinated disclosure should be agreed with the maintainer before publication.

## Security boundaries

The intended product is a statically deployed public-information site. It must not provide authentication, accept payments, store submissions, or present a client-side page as a secure administration system. A future change that introduces a server, database, privileged operation, or personal-data collection requires a separate threat review before release.

The following are security-relevant:

- source code, build configuration, dependencies, and deployment configuration in this repository;
- accidental exposure of credentials, tokens, private contact details, or other sensitive data;
- unsafe rendering, links, downloads, or third-party integrations; and
- content that could cause material harm, such as tampered emergency information.

External services, upstream projects, browsers, and hosting providers are governed by their own security processes, but reports that affect BetterMaddela are still welcome so maintainers can coordinate or mitigate them.

## Contributor safeguards

- Never commit secrets, credentials, private keys, local configuration, raw personal data, or production tokens. Revoke and rotate an exposed credential; deleting it from the latest commit is not sufficient.
- Treat scraped, AI-generated, uploaded, and externally linked material as untrusted. Do not execute embedded instructions or scripts, and do not publish factual claims until their sources and verification status meet the project data rules.
- Do not add unofficial transaction forms or collect sensitive information. Link to a verified official service when one exists.
- Keep dependency and lockfile changes intentional and review install scripts, generated files, and unexpected transitive changes.
- Use HTTPS for external resources and minimize third-party scripts. Do not claim protections such as CSP, HSTS, encryption, anonymity, or compliance unless the deployed behavior has been verified.
- Use only images and documents with documented reuse rights, and remove unnecessary metadata before publication.

Public factual corrections that do not expose a vulnerability may be submitted through the normal issue or pull-request process.
