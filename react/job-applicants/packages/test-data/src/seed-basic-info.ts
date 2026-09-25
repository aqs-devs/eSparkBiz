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
import { insert } from '@job-applicants/server-core/applicants/basic-info/repository';

const COUNT = 1000;

console.log(`Seeding ${COUNT} basic-info records...`);

for (let index = 0; index < COUNT; index++) {
    const applicant = await basicInfoFactory.create();
    const id = await insert(applicant);

    console.log(`[${index + 1}/${COUNT}] Inserted applicant ${id}`);
}

console.log('Seeding complete.');