# KISSAN Connect — Task Board

Status values: `todo` / `doing` / `review` / `done` / `blocked`.

## Foundation / baseline

- [done] Project foundation documentation committed to `main`.
- [ ] Fast local smoke test of current `main`.
- [ ] Fast local smoke test of current `develop` after synchronization.
- [ ] Confirm everyone can clone, install, and run the project.
- [ ] Keep one shared end-to-end demo definition.

## Member 1 — Farmer frontend

- [ ] Farmer dashboard shell
- [ ] Add Produce screen
- [ ] My Products / inventory
- [ ] Incoming Orders
- [ ] Earnings summary
- [ ] Demand Insight integration using agreed forecast API
- [ ] Match supplied Stitch design on desktop and mobile

## Member 2 — Buyer + marketplace frontend

- [ ] Marketplace shell
- [ ] Product cards
- [ ] Search/filter
- [ ] Product details
- [ ] Quantity selection
- [ ] Place-order flow
- [ ] Buyer Orders / status
- [ ] Match supplied Stitch design on desktop and mobile

## Member 3 — Database + core API

- [ ] Audit current Supabase setup/schema
- [ ] Define minimum `profiles/users`, `products`, `orders`, and delivery data needed by demo
- [ ] Product create/read/update flow
- [ ] Order create/read/update flow
- [ ] Basic delivery/status data contract
- [ ] Seed/demo dataset for predictable local testing
- [ ] Document API and schema assumptions

## Member 4 — Authentication + login + dashboard API

- [ ] Choose simplest prototype-safe auth/session approach already compatible with repo
- [ ] Login/access screen
- [ ] Demo roles: Farmer / Buyer / Admin-Ops
- [ ] Protect role-specific screens at the UI/API boundary as appropriate
- [ ] Connect product/order ownership to the signed-in demo user where practical
- [ ] Dashboard summary API
- [ ] Logout/session reset
- [ ] Error and unauthorized states

## Member 5 — AI demand forecast + logistics

### Demand forecast

- [done] Deterministic forecast engine exists on `feature/demand-forecast`.
- [done] Forecast API exists on `feature/demand-forecast`.
- [done] Forecast panel exists on `feature/demand-forecast`.
- [done] Demo fallback data exists on `feature/demand-forecast`.
- [done] Demand forecast test file exists on `feature/demand-forecast`.
- [ ] Review forecast implementation against current database schema.
- [ ] Fix demand aggregation to use meaningful time buckets (daily/weekly) rather than treating every individual order as a time period.
- [ ] Port reviewed forecast files onto a fresh branch based on current `develop`.
- [ ] Integrate forecast panel into the agreed dashboard screen.

### Logistics

- [ ] Define route input/output contract
- [ ] Implement Haversine distance helper
- [ ] Implement simple nearest-neighbour route ordering
- [ ] Add route API
- [ ] Integrate route result into logistics UI/map
- [ ] Handle empty locations and invalid coordinates

## Member 6 — GitHub + QA + integration

- [ ] Keep `main` stable
- [ ] Keep `develop` synchronized with latest approved `main` baseline
- [ ] Review every feature branch before merge
- [ ] Verify changed files and diff
- [ ] Maintain PR checklist and branch naming
- [ ] Run regression smoke tests after major merges
- [ ] Verify end-to-end demo flow
- [ ] Final demo rehearsal and bug list

## UX/UI — shared across the team

The uploaded Stitch package is the visual source of truth. Do not create a second unrelated design system.

- [ ] Confirm design tokens: green, amber, neutrals, typography, spacing, radii
- [ ] Confirm reusable cards/buttons/forms/tables/navigation
- [ ] Map each designed screen to a real route/component
- [ ] Define loading / empty / error / success / disabled states
- [ ] Check mobile behavior without creating a separate application
- [ ] Hand off implementation notes to frontend owners

## Integration milestones

### Milestone A — Supply
Farmer login/demo access → Add Produce → product stored → product appears in marketplace.

### Milestone B — Transaction
Buyer login/demo access → browse product → place order → order stored → farmer sees incoming order.

### Milestone C — Intelligence
Order history → time-bucket aggregation → deterministic forecast → farmer sees demand insight + recommendation.

### Milestone D — Logistics
Order locations → route calculation → route/stop sequence → map visualization.

### Milestone E — Operations
Admin/Ops dashboard → counts + prototype metrics + forecast/route evidence.

### Milestone F — Demo ready
One clean end-to-end local run passes from login through marketplace, order, demand insight, logistics, and impact summary.

## Do not merge yet

`feature/demand-forecast` is not merge-ready as-is because it is based on unrelated repository history. Review the implementation, then port the required files onto a new branch based on current `develop`.
