# BetterMaddela context map

Use this map to load the smallest sufficient context for a task. `AGENTS.md`, the
current task, and the exact files being changed are always required.

| Task | Read first | Read when the boundary is crossed |
| --- | --- | --- |
| Product purpose, MVP, or non-goals | `docs/PROJECT_SCOPE.md` | Applicable public behavior and affected source files |
| Civic research handoff, data modeling, import, or publication | `docs/data/DATA_CONTRACT.md` | Exact submitted evidence; affected content/schema files; source-specific primary material |
| Branding, routes, content, or inherited-data purge | `docs/PROJECT_SCOPE.md`; affected `src/` and `public/` files | `docs/data/DATA_CONTRACT.md` before adding any civic record; `LICENSE` and attribution material when reuse is involved |
| Identity, creative direction, or locality-focused design | `research/2026-08-identity-brief-bettergov-aligned.md` (research input, not production data) | `docs/PROJECT_SCOPE.md`; affected `src/` and `public/` files; `docs/data/DATA_CONTRACT.md` before importing any record it proposes |
| UI, accessibility, navigation, or PWA behavior | `docs/PROJECT_SCOPE.md`; affected UI files and tests | `docs/ACCESSIBILITY.md` for release checks and recorded results; data contract for factual copy; current deployment guidance for the changed surface |
| Build, dependencies, scripts, or CI | `package.json`; lockfile; affected configuration and workflow files | Security policy and current official version-specific documentation when behavior may have changed |
| Security, privacy, secrets, or reporting | `SECURITY.md`; affected data flow or workflow | `docs/data/DATA_CONTRACT.md` for evidence or civic data; deployment documentation for an actual deployment boundary |
| Contribution, review, or repository delivery | `CONTRIBUTING.md`; affected workflow files | Governing product, data, security, or implementation document for the change being delivered |
| Licensing, assets, or upstream reuse | `LICENSE`; attribution material; exact asset/source record | `docs/data/DATA_CONTRACT.md` when a source or rights record is stored or published |
| Durable architecture change | `docs/PROJECT_SCOPE.md`; current source and configuration | Existing decision records; add a focused decision record only when material alternatives and consequences would otherwise be rediscovered |

## Loading rules

1. Read only the applicable row and exact target files first.
2. Search headings or symbols before opening a long document in full.
3. Load another contract only when the task crosses its owned boundary.
4. Prefer canonical files and current executable behavior over generated summaries or
   inherited historical documentation.
5. If canonical documents conflict, stop and report the conflict rather than choosing
   silently.
6. At handoff, name the documents that governed the change and the exact checks run.

## Compact task contract

```text
Goal:
Governing context:
In scope:
Out of scope:
Owned files:
Invariants:
Acceptance criteria:
Verification:
Rollback/recovery concern (if applicable):
```

Keep this contract short. Update it only when scope, ownership, or acceptance criteria
change.
