# KISSAN Connect

Student hackathon prototype for SIH Problem Statement 26033: **Multiple intermediaries reduce farmers earnings and increase consumer prices.**

## What we are building

KISSAN Connect demonstrates one connected flow:

**Farmer/FPO → Login → Produce Listing → Marketplace → Buyer → Order → Demand Insight → Logistics Route → Ops/Impact Summary**

The prototype focuses on three connected pillars:

1. Direct marketplace connection between farmers/FPOs and buyers/consumers.
2. Demand forecasting / recommendations from order history or clearly labelled demo data.
3. Logistics and route optimization using simple, explainable prototype logic.

## Prototype scope

This is a **local hackathon prototype**, not a production platform.

Prefer simple, free/student-accessible, reliable technology. Avoid unnecessary infrastructure, microservices, complex payments, real-time GPS, blockchain, and production-scale ML.

## Team workflow

The project is organized by **workstreams, not permanent person-to-feature assignments**. Team members can collaborate across workstreams as needed.

- Team Lead / Architect
- Frontend
- UX/UI
- Database + Core API
- Authentication + Dashboard API
- AI + Logistics
- GitHub + QA + Integration

## Working rules

- GitHub is the source of truth for code.
- `main` is stable/demo-ready.
- `develop` is the shared integration branch.
- `feature/<task>` branches describe the work being changed, not the person doing it.
- One logical task per branch/PR.
- Inspect current code before rewriting it.
- Coordinate API and database contracts before integration.
- Test locally before claiming a task is complete.
- Synthetic/demo data must be clearly labelled.
- Never force-merge unrelated Git histories.

## Local development

The exact technology stack and architecture are documented in `docs/ARCHITECTURE.md`.

Before feature work, verify that the project can be cloned, dependencies installed, and the app started locally.

## Project documentation

- `docs/PROJECT_SPEC.md` — what the prototype must demonstrate
- `docs/ARCHITECTURE.md` — technical structure and decisions
- `docs/CHAT_PROMPTS.md` — specialized planning, coding-agent, review, and handoff prompts
- `docs/API_SPEC.md` — API contracts
- `docs/DATABASE.md` — data model and schema assumptions
- `docs/AI_SPEC.md` — demand and logistics logic
- `docs/TASKS.md` — work backlog and integration milestones
- `docs/HANDOVER.md` — current project state and next actions
- `docs/UX_UI_INTEGRATION.md` — how to integrate the supplied Stitch design package
- `docs/CONSTRAINTS.md` — project guardrails

## Design source of truth

The supplied Stitch UX/UI package is the visual source of truth for the prototype. Adapt its screens and design system into the existing Next.js/React application; do not replace the application with the static HTML prototype.

## Current integration status

- `main` and `develop` are synchronized.
- Product/order implementation exists in feature work and needs normal review before integration.
- Demand forecast implementation exists on `feature/demand-forecast` and needs review/porting onto the current integration baseline.
- Logistics, authentication, final UI integration, operations view, and end-to-end QA remain to be completed.
