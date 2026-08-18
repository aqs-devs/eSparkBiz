#

- Future schema changes:

```bash

# 1. Change apps/api/src/db/schema.ts


# 2. Generate migration
npm run db:generate -w apps/api


# 3. Inspect generated SQL


# 4. Apply migration
npm run db:migrate -w apps/api


# 5. Regenerate Kysely types
npm run db:codegen -w apps/api


# 6. Typecheck
npm run typecheck
```

That should become the normal workflow.

Drizzle explicitly separates generate (schema diff → migration) from migrate (apply migrations).
