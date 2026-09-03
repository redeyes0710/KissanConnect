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
- **Backend API workstream complete** (see `feature/backend-completion` PR → `develop`):
  - `app/api/products/route.ts` — GET (filter, demo fallback) + POST (full validation)
  - `app/api/orders/route.ts` — GET (filter by buyer/farmer/status) + POST (server-side total, stock check)
  - `app/api/admin/summary/route.ts` — dashboard metrics with demo fallback
  - `app/api/auth/login/route.ts` — Supabase email/password login
  - `app/api/auth/me/route.ts` — Bearer token session check
  - `lib/demoData.ts` — demo fallback data labelled with `isDemoData: true`
  - `db/migrations/001_create_tables.sql` — Supabase schema for all core tables
  - `tests/` — Jest unit tests for products, orders, and summary APIs
- Demand forecast implementation exists on `feature/demand-forecast`, but that branch has unrelated history and should not be force-merged.
- The supplied Stitch ZIP is the visual source of truth for the application UI.

## Next work order

1. Apply `db/migrations/001_create_tables.sql` in your Supabase SQL Editor.
2. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in `.env.local`.
3. Run `npm install` to pick up new jest/ts-jest devDependencies.
4. Run `npm test` and verify all backend tests pass.
5. Port/review demand forecast onto a clean branch based on current `develop`.
6. Complete logistics route optimization and map presentation.
7. Integrate Stitch screens into the existing Next.js/React app.
8. Complete frontend: farmer dashboard, marketplace, buyer order flow, auth screens.
9. Complete operations/judge dashboard and impact evidence.
10. Run full end-to-end regression and demo rehearsal.


## Merge rule

Feature work goes to `develop` through a reviewed PR. `main` receives only approved, demo-ready integration changes.

## Important

Do not track individual team members or their completed work in project documentation. Use Git history and pull requests for contribution history. Project documentation should describe the product, workstreams, contracts, current state, and remaining work.
