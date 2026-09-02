import type { CreateBasicInfo } from '@job-applicants/schemas';
import { db } from '@job-applicants/server-core';
import { insert } from '@job-applicants/server-core/applicants/basic-info/repository';

export const e2eApplicant: CreateBasicInfo = {
    firstName: 'E2E',
    lastName: 'Test Applicant',
    designation: 'Software Engineer',
    email: 'e2e.applicant@example.test',
    phone: '+15555550123',
    country: 'US',
    state: 'CA',
    city: 'San Francisco',
    zipCode: '94105',
    gender: 'other',
    relationshipStatus: 'single',
    dob: '1990-01-01',
};

export async function seedE2e() {
    const existingApplicant = await db
        .selectFrom('applicant')
        .select('id')
        .where('email', '=', e2eApplicant.email)
        .executeTakeFirst();

    if (existingApplicant) {
        console.log(`E2E applicant already exists (${existingApplicant.id}).`);
    } else {
        const id = await insert(e2eApplicant);
        console.log(`Seeded E2E applicant ${id}.`);
    }
}

if (process.argv[1]?.endsWith('seed-e2e.ts')) {
    await seedE2e();
    await db.destroy();
}
