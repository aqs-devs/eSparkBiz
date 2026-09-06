import { db } from '@job-applicants/server-core';
import { sql } from 'kysely';
import { seedE2e } from './seed-e2e.ts';

await db.deleteFrom('technologies').execute();
await db.deleteFrom('applicant').execute();
await sql`alter table technologies auto_increment = 1`.execute(db);
await sql`alter table applicant auto_increment = 1`.execute(db);
await seedE2e();
await db.destroy();
