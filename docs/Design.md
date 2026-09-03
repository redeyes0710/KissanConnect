# Design.md — Kissan Connect

This is a proposed starting point, not a stated requirement — UX/UI owners should adjust it, but it gives frontend members something concrete to build against instead of guessing per-screen.

## Theme direction
Agricultural/marketplace, not generic SaaS — warm, grounded, high-contrast enough to read clearly on a projector during judging (a real, practical constraint: demo screens often get shown on unfamiliar displays).

## Color palette
| Role | Color | Hex |
|---|---|---|
| Primary (brand/action) | Leaf green | `#2E7D32` |
| Primary hover/active | Darker green | `#1B5E20` |
| Secondary accent | Harvest orange | `#EF6C00` |
| Background | Off-white | `#FAFAF7` |
| Surface/card | White | `#FFFFFF` |
| Text primary | Near-black | `#1A1A1A` |
| Text secondary | Gray | `#5F6368` |
| Success | `#2E7D32` (reuse primary) |
| Warning/estimate-label | `#EF6C00` (reuse accent — use for "prototype estimate" labels so they're visually consistent) |
| Error | `#C62828` |
| Border/divider | `#E0E0DA` |

Keep contrast in mind: text primary on background/surface should comfortably pass WCAG AA (near-black on off-white/white does).

## Typography
- **Font:** system font stack or Inter (already Next.js-friendly, no license concerns) — avoid the default Geist font already in the boilerplate if you want the app to look distinct from an unedited Next.js starter, though Geist is also fine to keep if time is short.
- **Scale:** H1 28–32px / semibold, H2 22–24px / semibold, H3 18px / medium, body 15–16px / regular, small/labels 13px.
- Keep the type scale small (5 sizes) — a hackathon team doesn't benefit from a large design system to maintain.

## Layout
- Single-column mobile-first forms (listing form, order form) — most demo interaction will likely happen on a laptop, but don't design assuming a huge screen.
- Card-based layout for the marketplace grid (product cards) and for the ops dashboard's panels (forecast, route map, impact numbers) — cards make it easy for judges to visually parse "this section = this concept."
- Consistent page shell: top nav with role indicator (Farmer / Marketplace / Ops) so judges always know which "side" of the platform they're looking at.

## Components (map to `Architecture.md`'s component list)
- `ProductCard` — image placeholder, name, price/unit, quantity, farmer name.
- `ProductForm` — grouped fields, inline validation errors (matches the existing API route's validation: name/price/quantity/unit required).
- `ForecastPanel` — big number (forecast qty) + trend indicator (up/down arrow + %) + one-line narration text, with a small "prototype estimate — synthetic data" label using the warning/accent color.
- `RouteMap` — Leaflet map with two overlaid route lines (naive vs. optimized) in visually distinct colors (e.g., gray dashed for naive, primary green solid for optimized) plus a small stat block (distance/time saved).
- `ImpactDashboard` — simple before/after comparison (traditional chain vs. platform), each stat labeled clearly as an estimate, not presented as verified data.

## Navigation
Three top-level views matching the three roles: Farmer dashboard, Marketplace (buyer), Ops dashboard (judge-facing). No deep nested navigation — a hackathon demo benefits from a flat structure judges can follow without getting lost.

## Responsive behavior
Design for laptop-width first (this is a demo on a laptop, not a public consumer app) — mobile responsiveness is a "nice if time allows," not demo-critical, per the MVP scope in `PRD.md`.
