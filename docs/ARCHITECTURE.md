# KISSAN Connect — Architecture

## Status

This document describes the current prototype baseline. KISSAN Connect is a local student hackathon project, so the architecture is intentionally simple and demo-focused.

## Technical baseline

- Next.js + React + TypeScript
- Tailwind CSS for styling
- Supabase/Postgres for data
- Next.js API routes for server-side endpoints
- Deterministic TypeScript logic for demand forecasting and route optimization
- Leaflet/OpenStreetMap for map visualization where needed
- Gemini may be used only for optional narrative/explanation; it must not be required for numerical forecast calculations

Do not replace this stack blindly. Inspect the current repository before changing it.

## Logical architecture

```text
                    ┌──────────────────────┐
                    │   Farmer / FPO UI     │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │   Next.js Frontend    │
                    │ Farmer + Buyer + Ops  │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │  Next.js API Routes   │
                    │ Products / Orders /   │
                    │ Auth / Forecast /     │
                    │ Logistics / Summary   │
                    └───────┬─────┬────────┘
                            │     │
                 ┌──────────▼─┐ ┌─▼────────────────┐
                 │ Supabase   │ │ Pure TS logic      │
                 │ / Postgres │ │ Forecast + Routes  │
                 └──────┬─────┘ └─────────┬─────────┘
                        │                  │
                        └────────┬─────────┘
                                 ▼
                    ┌────────────────────────┐
                    │ Forecast / Route Panels │
                    │ Recommendations / Map   │
                    └────────────────────────┘
```

## Core demo flow

```text
Farmer login/demo access
        ↓
Farmer adds produce
        ↓
Product stored in Supabase
        ↓
Marketplace displays produce
        ↓
Buyer selects quantity and places order
        ↓
Order stored in Supabase
        ↓
Historical orders feed demand aggregation
        ↓
Deterministic forecast produces expected demand + trend
        ↓
Farmer sees recommendation
        ↓
Order locations/quantities feed route calculation
        ↓
Route result is shown on map
        ↓
Ops/Judge dashboard summarizes impact and flow
```

## Seven project chats

- **00 — Team Lead / Architect:** decides priorities, dependencies, and integration order.
- **01 — Frontend:** farmer and buyer/marketplace screens; consumes agreed contracts.
- **02 — UX/UI:** maintains the shared visual system and developer handoff from the Stitch package.
- **03 — Database + Core API:** owns schema, Supabase data access, products, orders, and core contracts.
- **04 — Authentication + Login + Dashboard API:** owns prototype login/session/role access and dashboard summary endpoints.
- **05 — AI + Logistics:** owns demand forecast, farmer recommendation, route optimization, and their API integration.
- **06 — GitHub + QA + Integration:** owns branch/PR discipline, review, regression checks, and end-to-end demo readiness.

## Team ownership

- Member 1 — Farmer frontend
- Member 2 — Buyer + marketplace frontend
- Member 3 — Database + core API
- Member 4 — Authentication + login + dashboard API
- Member 5 — AI demand forecast + logistics
- Member 6 — GitHub + QA + integration
- UX/UI — shared design responsibility across the team; visual source of truth is the supplied Stitch/design package

## Integration rules

1. `main` is stable and demo-ready.
2. `develop` is the shared integration branch.
3. Feature branches must be based on current `develop`.
4. PRs target `develop`; `main` receives reviewed, demo-ready integration changes.
5. One logical feature per PR.
6. API and database contracts must be agreed before frontend integration.
7. AI agents inspect current code first and modify only the necessary files.
8. Never commit secrets or `.env` files.
9. Synthetic/demo data must be explicitly labelled.
10. Numerical AI results must remain deterministic and testable locally.

## Important branch note

The current `feature/demand-forecast` branch contains the demand forecast implementation, but it currently has no common ancestor with `main`. Do **not** force-merge or rebuild `main` around that branch. The demand code should be reviewed, then selectively ported onto a fresh feature branch created from current `develop`/`main` so repository history stays clean.

## Prototype non-goals

Do not introduce microservices, Kubernetes, blockchain, production-scale ML, real payment infrastructure, real-time GPS, or enterprise authentication for this hackathon prototype.
