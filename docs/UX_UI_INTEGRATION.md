# KISSAN Connect — UX/UI ZIP Integration Guide

The supplied Stitch/design ZIP is a **design source**, not a second application to merge wholesale.

## What is in the package

The package contains high-fidelity screens plus HTML prototypes and a design system. It includes areas for:
- unified authentication
- landing page
- operations/judge dashboard
- farmer dashboard/inventory
- add produce + demand insights
- buyer marketplace
- smart logistics route/dispatch
- mobile farmer and buyer screens
- reusable UI/design-system references

## Integration rule

Do not replace the existing Next.js app with the HTML prototypes. They are reference implementations.

Use this flow:

```text
Stitch ZIP
   ↓
Pick target screen
   ↓
Read screen + design tokens
   ↓
Map screen to existing Next.js route
   ↓
Reuse/adapt existing React components
   ↓
Connect real API/data
   ↓
Add loading/empty/error/success states
   ↓
Test desktop + mobile
```

## Step-by-step integration

### 1. Keep the ZIP outside the application runtime

Do not put the whole ZIP into `app/`, `components/`, or `public/`.

A copy may be stored outside the runtime for team reference, but production/demo code should contain only the assets and implementation that are actually used.

### 2. Extract and inspect the design package

Use the screen image and its `code.html` only to understand:
- layout
- typography
- colors
- spacing
- cards
- navigation
- states
- responsive behavior

The design package is not automatically compatible with the current Next.js implementation.

### 3. Integrate in priority order

1. Authentication / Login
2. Farmer Dashboard + Add Produce
3. Buyer Marketplace + Order
4. Demand Insight panel
5. Logistics Route/Dispatch
6. Ops/Judge dashboard
7. Mobile refinements

### 4. Map to real application routes

Each design screen must have one clear target route/component. Do not create duplicate pages just because the ZIP contains separate desktop/mobile HTML files.

### 5. Convert only what is needed

When copying a visual element:
- convert HTML into React/TSX
- replace static text with application data
- replace fake buttons with real actions
- use existing Tailwind setup
- reuse existing API helpers
- keep images/icons only when needed

### 6. Do not copy prototype JavaScript blindly

The HTML files may contain UI-only scripts, hardcoded data, or CDN assumptions. Do not paste those scripts into the Next.js app without inspection.

### 7. Preserve product behavior

The visual layer must connect to the agreed contracts:
- products API
- orders API
- auth/session
- forecast API
- route API
- dashboard summary API

## Design tokens

The supplied design uses Plus Jakarta Sans for prominent headings/metrics and Inter for body/controls, with emerald/forest greens, harvest amber, slate/white neutrals, rounded cards, and responsive desktop/tablet/mobile grids.

Use the design tokens as the basis for shared CSS/Tailwind values rather than introducing many one-off colors.

## Ownership

- UX/UI: maintains design decisions and developer handoff.
- Member 1: implements farmer screens.
- Member 2: implements buyer/marketplace screens.
- Member 4: integrates login and role-access screens.
- Member 5: owns forecast/logistics functionality shown inside the screens.
- Member 6: verifies visual + functional integration and regression.

## Definition of done for a screen

- Matches the supplied design closely enough for the hackathon demo.
- Uses real project data or clearly labelled demo data.
- Buttons/actions work.
- Correct API contract is used.
- Loading/empty/error/success states exist where relevant.
- Desktop layout works.
- Mobile layout works without creating a separate app.
- No unrelated files or dependencies are introduced.
