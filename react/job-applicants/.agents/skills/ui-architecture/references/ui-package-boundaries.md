# UI Package Boundaries

## Architectural decision

The repository uses `packages/ui` as the shared UI workspace and `apps/web`
as the application workspace. The boundary is based on ownership and
domain knowledge, not on the library that originally supplied the code.

## Shared UI (`packages/ui`) — examples

- `Button`, `Card`, `Table`, `Checkbox`, `Tooltip` (shadcn primitives)
- `data-table-toolbar`, `data-table-column-header`, `data-table-filter-input`
- `useFilterState`, `useFilterActions`
- table/filter serialization utilities

## Application UI (`apps/web`) — examples

- `ApplicantDataTable`, applicant table columns, applicant filter config
- `ListViewPage`, `DeleteApplicantAction`, applicant-specific table actions
- pages, feature modules, API integration, business logic

## shadcn primitive location

Primitives belong under:

```
packages/ui/src/components/ui/
```

e.g. `button.tsx`, `input.tsx`, `table.tsx`, `checkbox.tsx`.

Do not duplicate these under `apps/web/src/components/ui/` if the shared
primitive already exists in `packages/ui`. Import shared primitives from
`@job-applicants/ui/components/<component>`.

## OpenStatus components

Generic OpenStatus data-table infrastructure belongs in:

```
packages/ui/src/components/
packages/ui/src/hooks/
packages/ui/src/lib/
```

e.g. `data-table-toolbar.tsx`, `data-table-column-header.tsx`,
`use-debounce.ts`, `serialization.ts`. Do not duplicate this in `apps/web`.

Application-specific table code (e.g. `apps/web/src/modules/applicants/`:
`columns.tsx`, `ListViewPage.tsx`, `ApplicantDataTable.tsx`,
`filterUtils.ts`) stays in the application, composing the generic
infrastructure rather than modifying it for one domain.

## shadcn monorepo behavior

Every shadcn workspace has its own `components.json`, which the CLI uses
to determine aliases and installation targets. When working from the
monorepo root, use `-c` to explicitly select the workspace:

```bash
npx shadcn@latest add <component> -c packages/ui
```

The official shadcn monorepo documentation describes the same distinction
— a shared UI package for components/hooks/utilities, and an application
workspace for app-specific components — and documents using `-c` to target
a workspace.

Note that `-c` targets a workspace for the whole install command — it does
not classify individual files within a registry. A registry can still
contain a mix of generic and application-specific files even when installed
with `-c packages/ui`; per-file classification (see SKILL.md's core rule)
still applies after installation.

## OpenStatus ownership

OpenStatus is treated as a provider of generic data-table infrastructure:

```
OpenStatus generic infrastructure   → packages/ui
Applicant-specific OpenStatus use   → apps/web
```

The fact that OpenStatus is distributed through a shadcn registry does not
change the ownership rule.

Do not interpret this as "every file from the OpenStatus registry must
always go into packages/ui." Instead: generic OpenStatus infrastructure
belongs in `packages/ui`; application-specific code belongs in `apps/web`.
Inspect generated files when necessary.

## Dependency ownership

Dependencies belong to the workspace that owns the code requiring them. Do
not accept a third-party registry installation that unnecessarily
duplicates or downgrades dependencies in `apps/web` when the generated code
belongs to `packages/ui`. After installing a registry, inspect
`package.json` and lockfile changes, check for unintended downgrades, and
check whether an existing dependency should remain owned by `packages/ui`.

## Examples

### Correct

```
packages/ui/
└── src/
    ├── components/
    │   ├── ui/
    │   │   ├── button.tsx
    │   │   └── table.tsx
    │   ├── data-table-toolbar.tsx
    │   └── data-table-column-header.tsx
    ├── hooks/
    │   └── use-debounce.ts
    └── lib/
        └── serialization.ts

apps/web/
└── src/
    └── modules/
        └── applicants/
            ├── columns.tsx
            └── ListViewPage.tsx
```

### Incorrect

```
apps/web/
└── src/
    └── components/
        ├── ui/
        │   ├── button.tsx
        │   └── table.tsx
        ├── data-table-toolbar.tsx
        └── useFilterState.ts
```

when those components are already part of the shared UI system.
