# PRD.md — Kissan Connect

**Status:** Draft — one open decision flagged in Section 9 needs resolving before build starts.
**Problem Statement:** 26033 — Ministry of Consumer Affairs, Food & Public Distribution
**Category:** Software · Theme: Agriculture, FoodTech & Rural Development
**Scope:** Hackathon prototype/demo, not a production system.

---

## 1. Problem

Multiple intermediary layers (aggregators, wholesalers, commission agents, retailers) sit between farmers and consumers. Each layer takes a margin without adding proportional value, so farmers realize a fraction of the final retail price while consumers pay a premium above it.

## 2. Goal

Build a locally-runnable web prototype that convincingly demonstrates a **direct farmer-to-buyer marketplace**, supported by AI-based demand forecasting and route-optimized logistics, in a live judged demo.

**Not the goal:** a production-ready, scalable, or commercially deployable platform.

## 3. Stack (confirmed)

- **Framework:** Next.js (App Router)
- **Database/Backend services:** Supabase (Postgres + client SDK)
- **Existing repo:** `KissanConnect-main` — currently unmodified `create-next-app` boilerplate plus one working API route (`app/api/products` — GET/POST against a `products` table, with basic field validation) and a configured Supabase client (`lib/supabase.ts`). No frontend UI consumes this route yet. The README has an unresolved git merge conflict that needs cleaning up before further work.
- **AI:** Gemini API / Google AI Studio, for demand-forecast narration over locally computed statistics.
- **Maps/logistics:** Leaflet + OpenStreetMap for the route-optimization display.

## 4. Users / Roles (demo roles, not real auth)

| Role | Description |
|---|---|
| Farmer/FPO | Lists produce for sale |
| Consumer/Bulk Buyer | Browses listings, places orders |
| Ops view | Internal-facing dashboard showing forecast, route optimization, and impact metrics — not a "real" role, just the judge-facing screen |

## 5. Core User Stories

1. As a farmer, I can list a product (name, description, price, quantity, unit) so buyers can see it in the marketplace.
2. As a buyer, I can browse available listings and place an order.
3. As a farmer, I can see a demand forecast for my crop so I know whether to list more or less supply.
4. As an operator/judge, I can see multiple orders grouped by location and an optimized delivery sequence versus a naive one.
5. As an operator/judge, I can see an estimated impact comparison (traditional supply chain vs. this platform) framed clearly as a prototype estimate.

## 6. Feature Scope

**Demo-critical (must work live)**
- Farmer produce listing (create + list) — extends the existing `products` API route
- Marketplace browse view for buyers
- Buyer order placement + order creation on the backend
- Demand forecast panel (per product/crop)
- Route optimization panel (multi-order → optimized sequence, distance/time comparison)
- Impact dashboard (traditional chain vs. platform, labeled as estimates)

**Demo-supporting**
- Search/filter on the marketplace
- Order history per user
- Basic profile pages
- Simple order-confirmation feedback (toast/banner)

**Explicitly out of scope for this prototype**
- Real payments
- Farmer/FPO identity verification or KYC
- Real courier/logistics integration
- Nationwide route network or live traffic data
- Production-grade auth, multi-tenancy, or scaling infrastructure

## 7. Data Model (extends what already exists)

The existing `products` table (name, description, price, quantity, unit, farmer_id) is the base for listings. Still needed: `farmers`, `buyers`, `orders`, `locations`, and a demand-history dataset (synthetic, seeded) for the forecast to run against. Exact schema belongs in `DATABASE.md`, not duplicated here.

## 8. AI & Logistics — what's real vs. simulated

- **Demand forecast:** REAL calculation (trend/moving-average over seeded historical order data) with SIMULATED underlying data (synthetic, not sourced from actual markets). Gemini may be used to turn the number into a one-line insight — narration only, not the forecast math itself.
- **Route optimization:** REAL — a nearest-neighbor/2-opt heuristic over Haversine distance between delivery points and a fixed depot. The simplification (straight-line distance, not road network) should be disclosed in the demo, not presented as GPS-accurate.

## 9. Open Decision — Reliability Fallback (unresolved)

Supabase is a hosted, external dependency. If it's unreachable during judging (venue wifi, outage), any screen depending on it fails live in front of judges — this is exactly the failure mode the team's own hackathon-planning brief says to avoid ("judges should never see 'API unavailable'"). Two options, not yet decided:

- **(a) Local fallback cache:** frontend/backend keeps a small local seed dataset and falls back to it if a Supabase call fails, so the demo degrades silently instead of breaking.
- **(b) Accept and rehearse the risk:** confirm venue connectivity in advance, test on the actual judging network beforehand, and don't build a fallback layer.

This needs a decision before Section 6's demo-critical features are considered "done" — it changes how the listing/order/forecast panels are built.

## 10. Success Criteria

A judge, watching one continuous live run, can follow: farmer lists produce → forecast appears → buyer orders → orders are grouped and routed → impact numbers appear — without a visible error, and without the team overstating what's real vs. simulated.

## 11. Known Risks / Open Items

- Unresolved git merge conflict in `README.md` — cosmetic, but should be cleaned up early so it doesn't cause confusion in the repo.
- Team has little-to-no prior coding experience; Next.js + Supabase (server components, RLS, env config) has a steeper learning curve than the simpler stack originally considered — budget extra setup time in `Phases.md`.
- Reliability fallback (Section 9) is unresolved and blocks calling the demo-critical feature set final.
