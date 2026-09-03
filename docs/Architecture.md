# Architecture.md — Kissan Connect

## Stack (confirmed)
- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Next.js API routes (`app/api/**/route.ts`) — no separate Express server; Next.js *is* the backend here
- **Database/Auth:** Supabase (Postgres)
- **AI:** Gemini API / Google AI Studio, called server-side from an API route (never from the browser, to avoid exposing the key)
- **Maps:** Leaflet + OpenStreetMap
- **Hosting for the demo:** `next dev` run locally on the judging laptop, pointed at a Supabase project — see the open reliability question below, this doc doesn't resolve it, `PRD.md` §9 does

## Current repo state (as audited)
```
KissanConnect-main/
├── app/
│   ├── api/
│   │   └── products/route.ts   ← REAL: GET (list) + POST (create) against `products` table
│   ├── page.tsx                 ← unedited Next.js starter page — needs replacing
│   ├── layout.tsx                ← unedited default layout
│   ├── globals.css
│   └── favicon.ico
├── lib/
│   └── supabase.ts               ← REAL: configured Supabase client
├── public/                       ← default Next.js starter assets, safe to delete
├── package.json                  ← next, react, react-dom, @supabase/supabase-js only
└── README.md                     ← has an unresolved git merge conflict, fix first
```

## Target structure (what needs to be added)
```
app/
├── api/
│   ├── products/route.ts         ← existing, extend as needed (filters, etc.)
│   ├── orders/route.ts           ← new: GET (list/group by location) + POST (create order)
│   ├── forecast/route.ts         ← new: returns computed demand forecast + optional Gemini narration
│   └── route-optimize/route.ts   ← new: takes order locations, returns optimized sequence
├── (farmer)/
│   ├── page.tsx                  ← farmer dashboard: listing form + forecast panel
├── (marketplace)/
│   ├── page.tsx                  ← buyer browse/marketplace view
├── (ops)/
│   ├── page.tsx                  ← judge-facing dashboard: route map + impact comparison
├── layout.tsx                    ← replace default metadata/branding
components/
├── ProductForm.tsx
├── ProductCard.tsx
├── OrderForm.tsx
├── ForecastPanel.tsx
├── RouteMap.tsx
└── ImpactDashboard.tsx
lib/
├── supabase.ts                   ← existing, unchanged
├── forecast.ts                   ← moving-average/trend calc, pure function, testable without the DB
└── routeOptimize.ts              ← Haversine + nearest-neighbor heuristic, pure function
```

## Data flow
1. Frontend page → `fetch("/api/...")` → API route → Supabase (or local seed fallback, pending §9 decision) → JSON back to the page.
2. Forecast and route-optimization logic live as **pure functions** in `lib/`, called from their API routes — this matters for two reasons: (a) they can be unit-tested without touching Supabase, and (b) if the fallback decision in `PRD.md` §9 lands on "local cache," these functions don't change at all — only what feeds them does.
3. No client-side Supabase calls for writes (listing/order creation go through API routes, not directly from the browser) — keeps validation and error handling in one place.

## What this repo is *not*
No separate backend server/process, no message queue, no microservices. One Next.js app, one Postgres instance (Supabase), local dev only.

## Open dependency
This architecture assumes Supabase is reachable during the demo. `PRD.md` §9 is still unresolved (local fallback cache vs. accept-the-risk) — if you pick the fallback option, `lib/` gains a small seed-data module that the API routes fall back to on a Supabase error; if you accept the risk, no code changes here, just a rehearsal/checklist item in `Phases.md`.
