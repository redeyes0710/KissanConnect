# Phases.md — Kissan Connect

Owners are referenced by role, not name, since exact names weren't given — swap in your actual teammates.

## Phase 0 — Setup & the one open decision (before any feature code)
- Resolve `PRD.md` §9: local fallback cache vs. accept-the-risk for Supabase reliability during judging. This changes how Phase 2/3 API routes are built, so it blocks starting them.
- Fix the unresolved git merge conflict in `README.md`.
- Backend (2): confirm Supabase project access, `.env.local` set up locally for everyone, delete unused default Next.js starter assets from `public/` and `app/page.tsx`.
- UX/UI (2): produce the screen map (which pages exist, what's on each) and base design tokens — see `Design.md` — before frontend starts building screens against them.
- Frontend (2): can start on static layout/component shells using placeholder data while waiting on the above — don't block on Phase 0 finishing entirely.

## Phase 1 — Core listing & marketplace
- Backend: extend/confirm the `products` API route covers what the listing form needs; add `orders` table + API route (GET/POST).
- Frontend: build the farmer listing form (`app/(farmer)/`) and the buyer marketplace/browse view (`app/(marketplace)/`), wired to real API routes.
- UX/UI: apply the design system to these two screens; flag any UX gaps found while building (e.g. missing states for "no listings yet").
- **Exit criterion:** a farmer can list a product and a buyer can see it and place an order, end to end, against real Supabase data (or the fallback, if Phase 0 chose that).

## Phase 2 — AI demand forecast
- Backend: seed synthetic demand-history data; implement `lib/forecast.ts` (moving-average/trend calc) as a pure function; wrap it in `app/api/forecast/route.ts`; optionally call Gemini for one-line narration of the number.
- Frontend: build the forecast panel on the farmer dashboard, consuming the new endpoint.
- **Exit criterion:** the farmer dashboard shows a real computed forecast number and trend, clearly labeled as running on synthetic seed data.

## Phase 3 — Route optimization & ops dashboard
- Backend: implement `lib/routeOptimize.ts` (Haversine + nearest-neighbor heuristic) and `app/api/route-optimize/route.ts`, taking current orders' locations as input.
- Frontend: build the ops/judge-facing dashboard (`app/(ops)/`) with the Leaflet map showing naive vs. optimized route, plus the impact comparison (traditional chain vs. platform, labeled as estimates).
- **Exit criterion:** with several seeded orders in the system, the dashboard shows a genuinely computed optimized route and a distance/efficiency comparison.

## Phase 4 — Integration pass
- Whole team: run the full demo story (Section 3 of the blueprint / `PRD.md` §5 user stories) start to finish on one machine. Fix whatever breaks at the seams between phases 1–3.
- Backend: confirm the Phase 0 reliability decision actually holds up — test with Supabase intentionally unreachable if the fallback-cache option was chosen.

## Phase 5 — Freeze, polish, rehearse
- No new features past this point — bug fixes, UI polish, seed-data quality, and demo rehearsal only.
- Full team: run the live demo multiple times on the actual judging laptop/network.
- Prepare a backup path for any single feature that's still flaky (e.g., a pre-recorded screen segment or a manual fallback screen) — decide this explicitly rather than hoping nothing breaks.

## Sequencing note
Phases 2 and 3 can run in parallel once Phase 1's `orders` table exists — the two backend members can split them rather than both working the same phase serially. Frontend/UX members likewise split Phase 2's forecast panel and Phase 3's ops dashboard once Phase 1 screens are stable.
