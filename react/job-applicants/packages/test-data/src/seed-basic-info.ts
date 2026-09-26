// // import { basicInfoFactory } from './factories/basic-info.js';
// // import { insert } from '@job-applicants/server-core/applicants/basic-info/repository';

// // const COUNT = 100;

// // const applicants = await basicInfoFactory.createList(COUNT);

// // for (const applicant of applicants) {
// //     const id = await insert(applicant);

// //     console.log(`Inserted applicant ${id}: ${applicant.firstName} ${applicant.lastName}`);
// // }

// // console.log(`Seeded ${applicants.length} applicants.`);

// import { basicInfoFactory } from './factories/basic-info.js';
// import { insert } from '@job-applicants/server-core/applicants/basic-info/repository';

// const COUNT = 50;

// for (let index = 0; index < COUNT; index++) {
//     const applicant = await basicInfoFactory.create();

//     const id = await insert(applicant);

//     console.log(`Inserted applicant ${id}`);
// }

import { basicInfoFactory } from './factories/basic-info.js';
import { insertMany } from '@job-applicants/server-core/applicants/basic-info/repository';
import { closeDb } from '@job-applicants/server-core';

const COUNT = 500000;
const BATCH_SIZE = 500;
const SEED_RUN_ID = Date.now().toString(36);
const PHONE_RUN_ID = String(Date.now()).slice(-9);

console.log(`Seeding ${COUNT} basic-info records...`);

try {
    for (let offset = 0; offset < COUNT; offset += BATCH_SIZE) {
        const batchSize = Math.min(BATCH_SIZE, COUNT - offset);
        const applicants = await Promise.all(
            Array.from({ length: batchSize }, () => basicInfoFactory.create()),
        );
        const databaseSafeApplicants = applicants.map((applicant, batchIndex) => ({
            ...applicant,
            firstName: applicant.firstName.slice(0, 20),
            lastName: applicant.lastName.slice(0, 20),
            email: applicant.email.replace('@', `+seed${SEED_RUN_ID}${offset + batchIndex}@`),
            phone: `+9${PHONE_RUN_ID}${String(offset + batchIndex).padStart(6, '0')}`,
        }));

        await insertMany(databaseSafeApplicants);
        console.log(`[${offset + batchSize}/${COUNT}] Inserted batch`);
    }

    console.log('Seeding complete.');
} finally {
    await closeDb();
}
