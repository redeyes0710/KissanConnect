# KISSAN Connect — Current Handover

## Stable baseline

`main` is the stable/demo baseline. `develop` is the shared integration branch and should be synchronized with `main` before new feature work starts.

## Branches

- `main` — stable/demo baseline
- `develop` — shared integration
- `feature/*` — individual tasks
- `feature/demand-forecast` — demand implementation exists here but has unrelated history; do not force-merge it

## Current feature state

- Product/order implementation exists in feature work and needs normal review before integration.
- Demand forecast implementation exists on `feature/demand-forecast`.
- Supplied Stitch ZIP contains the intended UI/UX source material.

## Still required

1. Synchronize `develop` with the latest approved `main` baseline.
2. Port/review demand forecast onto a branch based on current `develop`.
3. Audit and align the Supabase schema for products, orders, users/roles, and delivery locations.
4. Complete prototype authentication and role access.
5. Integrate farmer and buyer screens with the supplied design.
6. Implement logistics route optimization and map presentation.
7. Build/finish ops/judge summary and impact evidence.
8. Run end-to-end regression and demo rehearsal.

## Merge rule

Feature work goes to `develop` through a reviewed PR. `main` receives approved, demo-ready integration changes.
