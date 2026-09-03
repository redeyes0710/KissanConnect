# KISSAN Connect — Architecture

## Status

This document describes the current baseline. It is intentionally simple because KISSAN Connect is a local hackathon prototype.

## Current repository baseline

The repository already contains a Next.js/React application and a Supabase client/helper, plus a products API route. **Do not replace this stack blindly.** First verify the existing application locally and continue incrementally.

## Technology-selection rule

The team is using free/student-accessible AI tools and wants the simplest practical local technology. The technology stack should be changed only when there is a clear benefit for the prototype.

When considering a replacement, compare:

- Free availability
- Beginner friendliness
- Local setup difficulty
- AI coding-agent compatibility
- Reliability for a hackathon demo
- Integration effort

Do not add paid dependencies or complex infrastructure unless explicitly approved.

## Logical architecture

```text
Frontend
   ↓
Application/API layer
   ↓
Database
   ↓
AI / Demand Logic
   ↓
Logistics / Route Logic
   ↓
Frontend visualization
```

## Core flow

```text
Farmer adds produce
      ↓
Product data is stored
      ↓
Marketplace displays produce
      ↓
Buyer places order
      ↓
Order is stored
      ↓
Demand logic can use order history
      ↓
Farmer sees a demand recommendation
      ↓
Delivery data is created
      ↓
Route logic generates a simple route/stop order
      ↓
Route is shown in the UI
```

## Ownership

- Member 1 — Farmer frontend
- Member 2 — Buyer + marketplace frontend
- Member 3 — UX
- Member 4 — UI/design
- Member 5 — Backend + APIs
- Member 6 — Database + AI + logistics + integration

## Integration principle

API contracts and database changes must be communicated before implementation. Frontend should consume agreed contracts rather than inventing endpoint names or response fields.

## Prototype rule

Do not introduce microservices, Kubernetes, blockchain, production-scale ML, real payment infrastructure, or real-time GPS unless the team explicitly decides a demo requirement cannot be met without them.
