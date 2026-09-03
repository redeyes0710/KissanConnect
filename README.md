# KISSAN Connect

Student hackathon prototype for SIH Problem Statement 26033: **Multiple intermediaries reduce farmers earnings and increase consumer prices.**

## What we are building

KISSAN Connect demonstrates one connected flow:

**Farmer/FPO → Produce Listing → Marketplace → Buyer → Order → Demand Insight → Logistics Route**

The prototype focuses on three pillars:

1. Direct marketplace connection between farmers/FPOs and buyers/consumers.
2. Demand forecasting / recommendations.
3. Logistics and route optimization.

## Prototype scope

This is a **local hackathon prototype**, not a production platform.

Prefer simple, free/student-accessible, reliable technology. Avoid unnecessary infrastructure, microservices, complex payments, real-time GPS, blockchain, and production-scale ML.

## Team ownership

- **Member 1:** Farmer frontend
- **Member 2:** Buyer + marketplace frontend
- **Member 3:** UX
- **Member 4:** UI/design
- **Member 5:** Backend + APIs
- **Member 6:** Database + AI + logistics + integration

## Working rules

- GitHub is the source of truth for code.
- `main` is kept stable.
- `develop` is the shared integration branch.
- Feature branches are used for individual tasks.
- One logical task per branch/PR.
- AI must inspect the existing code before changing it.
- Test locally before claiming a task is complete.
- Do not let multiple AI tools rewrite the same feature at the same time.
- Synthetic/demo data must be clearly labelled.

## Local development

The exact technology stack is documented in `docs/ARCHITECTURE.md` and should only be changed after the team agrees.

Before coding, each team member must be able to clone the repository, install its dependencies, and run the current project locally.

## Project documentation

- `docs/PROJECT_SPEC.md` — what the prototype must demonstrate
- `docs/ARCHITECTURE.md` — current technical structure and decisions
- `docs/CHAT_PROMPTS.md` — copy-paste prompts for the team’s ChatGPT Project chats
- `docs/API_SPEC.md` — agreed API contracts
- `docs/DATABASE.md` — data model
- `docs/AI_SPEC.md` — demand and logistics logic
- `docs/TASKS.md` — current task assignments
- `docs/HANDOVER.md` — short current-state handoff
- `docs/CONSTRAINTS.md` — project guardrails

## Important

The existing repository is a starter project with some Supabase/product API work already present. **Do not delete or rewrite it blindly.** First inspect the current implementation, verify what works, and then continue incrementally.
