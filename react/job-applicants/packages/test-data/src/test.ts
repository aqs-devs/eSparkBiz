// // import { basicInfoFactory } from './factories/basic-info.js';

// // const applicant = basicInfoFactory.build();

// // console.dir(applicant, {
// //     depth: null,
// // });

// // const applicants = basicInfoFactory.buildList(5);

// // console.dir(applicants, {
// //     depth: null,
// // });

// import {
//     CreateBasicInfoSchema,
// } from '@job-applicants/schemas';

// import {
//     basicInfoFactory,
// } from './factories/basic-info.js';

// const applicant = basicInfoFactory.build(); //if factory callback is async, then this is not appropriate

// const result = CreateBasicInfoSchema.safeParse(applicant);

// console.dir(applicant, { depth: null });

// if (!result.success) {
//     console.error(result.error.format());
//     process.exit(1);
// }

// console.log('Valid CreateBasicInfo');

import {
    CreateBasicInfoSchema,
} from '@job-applicants/schemas';

import {
    basicInfoFactory,
} from './factories/basic-info.js';

const applicant = await basicInfoFactory.create();

const result = CreateBasicInfoSchema.safeParse(applicant);

console.dir(applicant, { depth: null });

if (!result.success) {
    console.error(result.error.format());
    process.exit(1);
}

console.log('Valid CreateBasicInfo');