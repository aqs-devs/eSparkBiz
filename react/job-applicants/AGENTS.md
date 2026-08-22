# Project Instructions

## Project

Job Applicants is a TypeScript monorepo for managing job applicant data.

## Repository Structure

- `apps/web` — React frontend
- `apps/api` — API application
- `packages/shared` — shared utilities and constants
- `packages/schemas` — domain schemas and validation
- `packages/api-contract` — API contracts
- `packages/api-client` — client-side API access
- `packages/server-core` — server-side business logic

See [docs/architecture.md](docs/architecture.md) for dependency boundaries and architectural decisions.

## Conventions

- Use npm.
- TypeScript identifiers use camelCase.
- React code uses camelCase.
- JSON API fields use camelCase.
- Database fields use snake_case.
- Prefer existing project abstractions over introducing parallel patterns.
- Do not manually modify generated files.

## Verification

After making code changes, run the relevant typecheck, lint, and tests.

Do not claim that a check passed unless it was actually run.

## Documentation

- Architecture: [docs/architecture.md](docs/architecture.md)
- Accessibility policy: [docs/accessibility.md](docs/accessibility.md)

Specialised implementation procedures are stored in `.agents/skills/`.
