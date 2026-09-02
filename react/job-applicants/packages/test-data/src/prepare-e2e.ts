import { db } from '@job-applicants/server-core';
import { seedE2e } from './seed-e2e.ts';

await db.deleteFrom('technologies').execute();
await db.deleteFrom('applicant').execute();
await seedE2e();
await db.destroy();
