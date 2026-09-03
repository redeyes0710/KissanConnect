# KISSAN Connect — Constraints

## Prototype constraints

- Build a local hackathon prototype, not a production platform.
- Prefer simple solutions that beginners can understand.
- Use free/student-accessible tools where practical.
- Do not add unnecessary libraries or services.
- Do not introduce microservices or Kubernetes.
- Do not add blockchain.
- Do not build real payment infrastructure.
- Do not require real-time GPS for the demo.
- Do not train a large custom language model.
- Use mock/synthetic/demo data when real data is unavailable, and label it clearly.
- Never claim unsupported AI accuracy.

## AI coding constraints

- Inspect the existing code before editing it.
- Work on one small task at a time.
- List the intended files before changing them.
- Do not rewrite unrelated modules.
- Do not rename APIs or database fields casually.
- Do not change another member's owned area without coordination.
- Do not expose secrets.
- Run the application or relevant tests after changes.
- Review the diff before creating a PR.
- A feature is not done because an AI agent says it is done; it is done after human verification.

## Collaboration constraints

- GitHub is the code source of truth.
- `main` remains stable.
- `develop` is the integration branch.
- Feature branches are used for implementation work.
- One logical change per PR is preferred.
- Schema/API changes must be communicated to affected team members.
