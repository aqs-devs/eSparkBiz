---
name: ui-architecture
description: >
    Enforces the project's UI package boundaries in the monorepo.
    Use when adding, installing, moving, or designing UI components,
    shadcn/ui components, OpenStatus components, UI hooks, or UI utilities.
---

# UI Architecture

## Purpose

This project separates shared UI infrastructure from application-specific
code. The authoritative architectural decision is documented in
`docs/architecture.md`. This skill enforces that decision when modifying
the codebase.

For detailed examples, directory trees, and rationale, see
`references/ui-package-boundaries.md`.

---

## Package ownership

**`packages/ui`** owns generic, reusable UI infrastructure: shadcn/ui
primitives, reusable components/hooks/utilities, generic table and
filtering infrastructure, and reusable OpenStatus data-table components.

**`apps/web`** owns application-specific composition and business logic:
pages, feature modules, domain-specific components, applicant-specific
table/filter code, API integration, business rules.

---

## Core rule

Classify code by **ownership and reusability**, not by its original source.

Not this: "shadcn code goes in packages/ui, OpenStatus code goes in apps/web."

This instead: "Generic/reusable UI belongs in `packages/ui`. Application/
domain-specific code belongs in `apps/web`."

OpenStatus is a source of generic UI infrastructure in this project — its
reusable data-table components belong in `packages/ui`. An applicant-specific
implementation that uses OpenStatus belongs in `apps/web`.

---

## shadcn CLI

Explicitly target the workspace when adding shared UI:

```bash
npx shadcn@latest add <component> -c packages/ui
```

Do not install shared UI into `apps/web` merely because the command runs
from the web application.

**Do not blindly run every OpenStatus (or other third-party registry)
install with `-c packages/ui`.** A registry can contain both generic and
application-specific files — classify each file with the core rule before
deciding where it lands. The command is a consequence of classification,
not a substitute for it.

---

## Before installing a third-party registry

1. Classify the generated files as generic or application-specific.
2. Install generic files into `packages/ui`, application-specific files
   into `apps/web`.
3. Inspect generated files before making package-boundary changes.
4. Inspect `package.json`/lockfile changes for unintended dependency
   downgrades or misplaced ownership.
5. Preserve the existing `@job-applicants/ui` package boundary.

---

## Existing architecture takes precedence

Before introducing a new UI abstraction: inspect `packages/ui` and
`apps/web`, reuse existing shared components, follow `docs/architecture.md`.
Do not introduce a second component system without explicit approval. Do
not move code between packages as an incidental refactor. If ownership is
genuinely ambiguous, stop and ask rather than silently deciding.

Do not over-abstract: not every application component needs to become
shared. Don't move application code into `packages/ui` merely because it
uses shadcn or OpenStatus.

---

## Final decision rule

**Does this file know about the application's domain?**

- Yes → `apps/web`
- No, and it's reusable UI infrastructure → `packages/ui`
