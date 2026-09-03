# KISSAN Connect — Current Handover

## Stable baseline

`main` is the stable/demo baseline. `develop` is the shared integration branch. They are currently synchronized.

## Workstream branches

Use task-based branch names. The branch name describes the work, not the person.

- `feature/core-api` — core database/API work; preserves the existing core API implementation for review/porting
- `feature/farmer-frontend` — farmer experience work
- `feature/marketplace` — buyer/marketplace work
- `feature/ux-ui` — design system and Stitch UI integration
- `feature/auth-dashboard` — login, roles, session, and dashboard API
- `feature/demand-forecast` — current demand forecast implementation; review and port before merge
- `feature/ai-logistics` — logistics and route optimization work
- `feature/integration-qa` — integration, regression, and demo-readiness work

## Current state

- Foundation documentation is committed.
- `main` and `develop` are synchronized.
- Existing product/order implementation requires normal review and integration.
- Demand forecast implementation exists on `feature/demand-forecast`, but that branch has unrelated history and should not be force-merged.
- The supplied Stitch ZIP is the visual source of truth for the application UI.

## Next work order

1. Verify local build/run on `main` and `develop`.
2. Audit and align the Supabase schema and product/order API contracts.
3. Complete prototype authentication, roles, and dashboard summary.
4. Port/review demand forecast onto a clean branch based on current `develop`.
5. Complete logistics route optimization and map presentation.
6. Integrate Stitch screens into the existing Next.js/React app.
7. Complete operations/judge dashboard and impact evidence.
8. Run full end-to-end regression and demo rehearsal.

## Merge rule

Feature work goes to `develop` through a reviewed PR. `main` receives only approved, demo-ready integration changes.

## Important

Do not track individual team members or their completed work in project documentation. Use Git history and pull requests for contribution history. Project documentation should describe the product, workstreams, contracts, current state, and remaining work.
