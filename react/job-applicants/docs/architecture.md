# Naming conventions

## Database

snake_case

## TypeScript

camelCase

## React

camelCase

## JSON API

camelCase

## Mapping

Database rows are converted to domain models in the repository layer using:

- camelizeKeys()
- Zod validation

Components and services never perform case conversion.

---

# DateField

```md
Button
    ↓
Popover
    ↓
Calendar (react-day-picker)
```

## Dataflow

```md
TanStack Form
        ↓
field.state.value      // "2002-06-18" or ""
        ↓
convert to Date
        ↓
Calendar
        ↓
Date selected
        ↓
convert back to ISO string (yyyy-MM-dd)
        ↓
field.handleChange(...)
```

> Notice the conversions:

```md
Form value      Calendar value
---;            ---;
""          ⇄   undefined
"2024-07-08" ⇄  Date
```

## ORPC

- api-contract → @orpc/contract only
- server-core → @orpc/server
- web → @orpc/client, @orpc/react
- apps/api → Express, HTTP server, environment loading, server startup

Replace this flow:

``` md
React
    │
    ▼
api-client
    │
    ▼
http.post("/applicants")
    │
    ▼
Express REST route
    │
    ▼
service
```

with

```md
React
    │
    ▼
oRPC Client
    │
    ▼
RPCHandler
    │
    ▼
appRouter
    │
    ▼
basicInfo.create.handler(...)
    │
    ▼
service
```

Notice that your service layer should not change. Only the transport changes.

---

# Package Ownership & Dependency Boundaries

```text
                 shared
                    ▲
                    │
                 schemas
                    ▲
                    │
             api-contract
              ▲         ▲
              │         │
         api-client  server-core
              ▲         ▲
              │         │
          apps/web   apps/api
```

| Package        | Owns                                       | Must not know about        |
| -------------- | ------------------------------------------ | -------------------------- |
| `shared`       | utilities, constants                       | everyone                   |
| `schemas`      | data models & validation                   | HTTP, Express, React, oRPC |
| `api-contract` | routes, methods, request/response bindings | Express implementation     |
| `api-client`   | network implementation                     | server internals           |
| `server-core`  | business logic                             | React, browser             |
| `apps/api`     | Express adapters                           | UI                         |
| `apps/web`     | React UI                                   | database                   |

### Core Architectural Rules:

1. **Dependencies flow one way**: Lower layers never depend on higher layers.
2. **`schemas` owns domain models**: Domain schemas (`BasicInfoSchema`, `CreateBasicInfoSchema`, `BasicInfoListQuerySchema`) stay transport-agnostic.
3. **`api-contract` owns HTTP endpoints**: Defines oRPC/HTTP routes and selectively re-exports only the request/response schemas tied to those endpoints.
4. **React Forms consume `schemas`**: UI components import validation schemas from `@job-applicants/schemas` directly, without coupling UI validation to HTTP contract routes.

##

```md
MySQL schema
     │
     │ introspection
     ▼
kysely-codegen
     │
     │ generated DB types
     ▼
db-types.ts
     │
     ▼
Kysely<DB>
     │
     ▼
repository
     │
     ▼
mapper
     │
     ▼
API schema / DTO
```

## `Docs/` and `.agents/skills/`

Here's an example:

- project-specific rules → docs/accessibility.md
- agent-specific procedures/workflows → .agents/skills/accessibility/references/
- general technical reference material → potentially references/

> Docs explain the project's rules. Skills explain how an agent applies those rules.

## UI Package Ownership

packages/ui is the shared UI workspace.

It owns:

- shadcn UI primitives
- reusable UI components
- reusable UI hooks
- reusable UI utilities
- generic third-party UI infrastructure such as OpenStatus data-table components

apps/web owns:

- application-specific pages
- domain-specific components
- applicant-specific table columns
- applicant-specific filters
- application/business logic

The boundary is based on reusability/domain ownership, not on which library originally provided the code.
