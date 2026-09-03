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
- **Member 3:** Database + core API
- **Member 4:** Authentication + login + dashboard API
- **Member 5:** AI demand forecast + logistics
- **Member 6:** GitHub + QA + integration
- **UX/UI:** shared design responsibility; the uploaded Stitch/design package is the visual source of truth

## Working rules

- GitHub is the source of truth for code.
- `main` is stable/demo-ready.
- `develop` is the shared integration branch.
- Feature branches are used for individual tasks.
- One logical task per branch/PR.
- AI coding agents must inspect existing code before changing it.
- Test locally before claiming a task is complete.
- Do not let multiple AI tools rewrite the same feature at the same time.
- Synthetic/demo data must be clearly labelled.
- Never commit secrets, `.env` files, API keys, or service-role credentials.

## Local development

The current technical baseline is documented in `docs/ARCHITECTURE.md`.

Before coding, each team member must be able to clone the repository, install its dependencies, and run the current project locally.

## Project documentation

- `docs/PROJECT_SPEC.md` — what the prototype must demonstrate
- `docs/ARCHITECTURE.md` — current technical structure and decisions
- `docs/CHAT_PROMPTS.md` — copy-paste prompts for the seven specialized ChatGPT Project chats
- `docs/TASKS.md` — current task assignments and integration milestones
- `docs/API_SPEC.md` — agreed API contracts
- `docs/DATABASE.md` — minimum data model and schema notes
- `docs/AI_SPEC.md` — demand forecast and logistics rules
- `docs/UX_UI_INTEGRATION.md` — how to integrate the Stitch/design package without replacing the working app blindly
- `docs/HANDOVER.md` — short current-state handoff
- `docs/CONSTRAINTS.md` — project guardrails

## Current integration status

- Foundation documentation is on `main`.
- Product/order work exists in feature branches and must be reviewed before integration.
- AI demand forecast currently exists on `feature/demand-forecast` and must be reviewed and ported/integrated onto a branch based on `main` before merging.
- The UI/UX ZIP is a design source and should be integrated selectively into the Next.js app rather than copied over wholesale.

## Important

The repository contains starter implementation work. **Do not delete or rewrite it blindly.** First inspect the current implementation, verify what works, and then continue incrementally.
