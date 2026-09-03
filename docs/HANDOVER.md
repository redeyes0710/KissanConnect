# KISSAN Connect — Current Handover

## Stable baseline

`main` contains the project foundation, current team workflow, task board, API contracts, database notes, AI/logistics specification, and UX/UI integration guidance.

## Branches

- `main` — stable/demo baseline
- `develop` — shared integration; keep synchronized with approved `main` baseline
- `feature/*` — individual tasks
- `feature/demand-forecast` — demand implementation exists here but has unrelated Git history; do not force-merge it

## Current feature state

### Existing / in progress
- Product API work exists in feature branches.
- Order API work exists in feature branches.
- Demand forecast implementation exists on `feature/demand-forecast`.
- Supplied Stitch ZIP contains the intended UI/UX source material.

### Still required
1. Synchronize `develop` with the latest stable `main` baseline.
2. Review and port demand forecast onto a branch based on current `develop`.
3. Audit database schema and align products/orders/forecast inputs.
4. Complete prototype authentication and role access.
5. Integrate farmer and buyer screens with the supplied design.
6. Implement logistics route optimization and map presentation.
7. Build/finish ops/judge summary and impact evidence.
8. Run end-to-end regression and demo rehearsal.

## Merge rule

Feature work goes to `develop` through a reviewed PR. `main` is updated only with approved integration-ready changes.
