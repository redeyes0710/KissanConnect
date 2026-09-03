# KISSAN Connect — Task Board

Status values: `todo` / `doing` / `review` / `done` / `blocked`.

The task board is organized by **workstream and deliverable**, not by permanent person-to-feature assignment. Team members can collaborate across workstreams.

## 0 — Foundation / repository hygiene

- [done] Project foundation documentation committed to `main`.
- [done] `develop` synchronized with the current `main` baseline.
- [ ] Verify `main` and `develop` run locally.
- [ ] Confirm a clean local setup for the whole team.
- [ ] Keep task-based branch names; avoid personal names.
- [ ] Keep one shared end-to-end demo definition.

## 1 — Frontend

### Farmer experience

- [ ] Farmer dashboard
- [ ] Add Produce
- [ ] My Products / inventory
- [ ] Incoming Orders
- [ ] Earnings summary
- [ ] Demand Insight integration

### Buyer / marketplace

- [ ] Marketplace shell
- [ ] Product cards
- [ ] Search/filter
- [ ] Product details
- [ ] Quantity selection
- [ ] Place-order flow
- [ ] Buyer Orders / status

### Shared frontend quality

- [ ] Use the supplied Stitch design system
- [ ] Loading / empty / error / success / disabled states
- [ ] Responsive desktop/tablet/mobile layouts
- [ ] Connect only to agreed API contracts

## 2 — Database + Core API

- [ ] Audit current Supabase setup/schema
- [ ] Finalize minimum users/profiles, products, orders, and delivery data needed by the demo
- [ ] Product create/read/update flow
- [ ] Order create/read/update flow
- [ ] Basic delivery/status contract
- [ ] Seed/demo dataset for predictable local testing
- [ ] Document schema and API assumptions
- [ ] Verify ownership fields are compatible with authentication

## 3 — Authentication + Login + Dashboard API

- [ ] Choose the simplest prototype-safe auth/session approach compatible with the current repo
- [ ] Login/access screen
- [ ] Demo roles: Farmer / Buyer / Admin-Ops
- [ ] Protect role-specific routes/API operations where needed
- [ ] Connect product/order ownership to the signed-in demo user where practical
- [ ] Dashboard summary API
- [ ] Logout/session reset
- [ ] Unauthorized/error states

## 4 — AI Demand Forecast

### Existing implementation to review

- [review] Deterministic forecast engine exists on `feature/demand-forecast`.
- [review] Forecast API exists on `feature/demand-forecast`.
- [review] Forecast panel exists on `feature/demand-forecast`.
- [review] Demo fallback data exists on `feature/demand-forecast`.
- [review] Forecast test file exists on `feature/demand-forecast`.

### Required integration work

- [ ] Review forecast code against current schema/API contracts
- [ ] Change demand aggregation to meaningful daily/weekly time buckets
- [ ] Port only required forecast files onto a clean branch based on current `develop`
- [ ] Integrate ForecastPanel into the real farmer/dashboard flow
- [ ] Verify deterministic output with real and demo data
- [ ] Verify disclosure for synthetic/demo data

## 5 — Logistics / Route Optimization

- [ ] Define route input/output contract
- [ ] Validate locations and coordinates
- [ ] Implement Haversine distance helper
- [ ] Implement simple nearest-neighbour route ordering
- [ ] Optional 2-opt improvement if useful for the demo
- [ ] Add route API
- [ ] Integrate route result into logistics UI/map
- [ ] Handle empty/invalid location cases
- [ ] Label route as prototype estimate; no live traffic/GPS claim

## 6 — UX/UI Integration

The supplied Stitch package is the visual source of truth. Do not replace the working app with the static HTML prototype.

- [ ] Confirm the shared design tokens from the ZIP
- [ ] Map each designed screen to an actual Next.js route/component
- [ ] Rebuild/adapt screens in React/TypeScript/Tailwind
- [ ] Reuse existing data/API logic rather than duplicating it in static HTML
- [ ] Integrate authentication screen
- [ ] Integrate farmer dashboard/inventory/add-produce screens
- [ ] Integrate marketplace/order screens
- [ ] Integrate logistics/route screen
- [ ] Integrate Ops/Judge dashboard
- [ ] Verify mobile-responsive behavior

## 7 — Operations / Judge Dashboard

- [ ] Operations dashboard shell
- [ ] Product/order counts
- [ ] Prototype impact metrics
- [ ] Demand insight evidence
- [ ] Logistics route evidence
- [ ] Clearly label demo/synthetic metrics

## 8 — QA + Integration

- [ ] Review every feature diff before merge
- [ ] Ensure feature branches are based on current `develop`
- [ ] PRs target `develop`
- [ ] Run regression smoke tests after important merges
- [ ] Verify no secrets or `.env` files are committed
- [ ] Verify API/database contracts end to end
- [ ] Test login → farmer listing → marketplace → buyer order → farmer order → forecast → route → ops summary
- [ ] Final bug list
- [ ] Final demo rehearsal

## Integration milestones

### Milestone A — Supply
Farmer access → Add Produce → product stored → product appears in marketplace.

### Milestone B — Transaction
Buyer access → browse product → place order → order stored → farmer sees incoming order.

### Milestone C — Intelligence
Order history → time-bucket aggregation → deterministic forecast → farmer sees demand insight + recommendation.

### Milestone D — Logistics
Order locations → route calculation → route/stop sequence → map visualization.

### Milestone E — Operations
Admin/Ops dashboard → counts + prototype metrics + forecast/route evidence.

### Milestone F — Demo ready
One clean local run passes from access/login through marketplace, order, demand insight, logistics, and impact summary.

## Branch rule

Branches describe the work, never the person:

- `feature/core-api`
- `feature/farmer-frontend`
- `feature/marketplace`
- `feature/ux-ui`
- `feature/auth-dashboard`
- `feature/demand-forecast`
- `feature/ai-logistics`
- `feature/integration-qa`
