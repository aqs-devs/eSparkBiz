// // // import { faker } from '@faker-js/faker';
// // // import { Factory } from 'fishery';

// // // import type { CreateBasicInfo } from '@job-applicants/schemas';

// // // const indianLocations = [
// // //     {
// // //         country: 'IN',
// // //         state: 'GJ',
// // //         city: 'Ahmedabad',
// // //     },
// // //     {
// // //         country: 'IN',
// // //         state: 'RJ',
// // //         city: 'Jaipur',
// // //     },
// // //     {
// // //         country: 'IN',
// // //         state: 'MH',
// // //         city: 'Mumbai',
// // //     },
// // //     {
// // //         country: 'IN',
// // //         state: 'DL',
// // //         city: 'New Delhi',
// // //     },
// // //     {
// // //         country: 'IN',
// // //         state: 'KA',
// // //         city: 'Bengaluru',
// // //     },
// // //     {
// // //         country: 'IN',
// // //         state: 'TG',
// // //         city: 'Hyderabad',
// // //     },
// // //     {
// // //         country: 'IN',
// // //         state: 'TN',
// // //         city: 'Chennai',
// // //     },
// // //     {
// // //         country: 'IN',
// // //         state: 'UP',
// // //         city: 'Lucknow',
// // //     },
// // // ] as const;

// // // const designations = [
// // //     'Software Engineer',
// // //     'Frontend Developer',
// // //     'Backend Developer',
// // //     'Full Stack Developer',
// // //     'UI/UX Designer',
// // //     'Product Designer',
// // //     'QA Engineer',
// // //     'DevOps Engineer',
// // //     'Data Analyst',
// // //     'Intern',
// // // ] as const;

// // // const randomIndianLocation = () =>
// // //     faker.helpers.arrayElement(indianLocations);

// // // const randomDesignation = () =>
// // //     faker.helpers.arrayElement(designations);

// // // const randomDateOfBirth = (): string => {
// // //     const today = new Date();

// // //     const latestBirthDate = new Date(
// // //         today.getFullYear() - 18,
// // //         today.getMonth(),
// // //         today.getDate(),
// // //     );

// // //     const earliestBirthDate = new Date(
// // //         today.getFullYear() - 60,
// // //         today.getMonth(),
// // //         today.getDate(),
// // //     );

// // //     return faker.date
// // //         .between({
// // //             from: earliestBirthDate,
// // //             to: latestBirthDate,
// // //         })
// // //         .toISOString()
// // //         .slice(0, 10);
// // // };

// // // export const basicInfoFactory = Factory.define<CreateBasicInfo>(() => {
// // //     const firstName = faker.person.firstName();
// // //     const lastName = faker.person.lastName();
// // //     const location = randomLocation();

// // //     return {
// // //         firstName,
// // //         lastName,
// // //         designation: randomDesignation(),
// // //         email: faker.internet.email({ firstName, lastName }),
// // //         phone: randomPhone(),
// // //         country: location.countryCode,
// // //         state: location.stateCode,
// // //         city: location.city,
// // //         gender: faker.helpers.arrayElement([
// // //             'male',
// // //             'female',
// // //             'other',
// // //         ]),
// // //         zipCode: location.postalCode,
// // //         relationshipStatus: faker.helpers.arrayElement([
// // //             'single',
// // //             'committed',
// // //         ]),
// // //         dob: randomDateOfBirth(),
// // //     };
// // // });


// // import { faker } from '@faker-js/faker';
// // import { Factory } from 'fishery';

// // import type { CreateBasicInfo } from '@job-applicants/schemas';

// // const designations = [
// //     'Software Engineer',
// //     'Frontend Developer',
// //     'Backend Developer',
// //     'Full Stack Developer',
// //     'UI/UX Designer',
// //     'Product Designer',
// //     'QA Engineer',
// //     'DevOps Engineer',
// //     'Data Analyst',
// //     'Project Manager',
// //     'Intern',
// // ] as const;

// // // const randomDesignation = (): string =>
// // //     faker.helpers.arrayElement(designations);
// // const randomDesignation = () =>
// //     faker.helpers.arrayElement(designations);

// // const randomDateOfBirth = (): string => {
// //     const today = new Date();

// //     const oldestDate = new Date(
// //         today.getFullYear() - 60,
// //         today.getMonth(),
// //         today.getDate(),
// //     );

// //     const youngestDate = new Date(
// //         today.getFullYear() - 18,
// //         today.getMonth(),
// //         today.getDate(),
// //     );

// //     return faker.date
// //         .between({
// //             from: oldestDate,
// //             to: youngestDate,
// //         })
// //         .toISOString()
// //         .slice(0, 10);
// // };

// // const randomPhone = (): string => {
// //     return faker.string.numeric({
// //         length: 10,
// //         allowLeadingZeros: false,
// //     });
// // };

// // export const basicInfoFactory = Factory.define<CreateBasicInfo>(() => ({
// //     firstName: faker.person.firstName(),
// //     lastName: faker.person.lastName(),

// //     designation: randomDesignation(),

// //     email: faker.internet.email(),

// //     phone: randomPhone(),

// //     /*
// //      * Location generation will be replaced with a
// //      * worldwide country/state/city generator.
// //      *
// //      * Temporary values so the factory shape is complete.
// //      */
// //     country: 'US',
// //     state: 'CA',
// //     city: 'Los Angeles',

// //     gender: faker.helpers.arrayElement([
// //         'male',
// //         'female',
// //         'other',
// //     ]),

// //     zipCode: faker.string.numeric(5),

// //     relationshipStatus: faker.helpers.arrayElement([
// //         'single',
// //         'committed',
// //     ]),

// //     dob: randomDateOfBirth(),
// // }));


// import { faker } from '@faker-js/faker';
// import { Factory } from 'fishery';

// import type { CreateBasicInfo } from '@job-applicants/schemas';

// import { randomLocation } from './location.js';

// const designations = [
//     'Software Engineer',
//     'Frontend Developer',
//     'Backend Developer',
//     'Full Stack Developer',
//     'UI/UX Designer',
//     'Product Designer',
//     'QA Engineer',
//     'DevOps Engineer',
//     'Data Analyst',
//     'Project Manager',
//     'Intern',
// ] as const;

// const randomDesignation = (): string =>
//     faker.helpers.arrayElement(designations);

// const randomDateOfBirth = (): string => {
//     const today = new Date();

//     const oldestDate = new Date(
//         today.getFullYear() - 60,
//         today.getMonth(),
//         today.getDate(),
//     );

//     const youngestDate = new Date(
//         today.getFullYear() - 18,
//         today.getMonth(),
//         today.getDate(),
//     );

//     return faker.date
//         .between({
//             from: oldestDate,
//             to: youngestDate,
//         })
//         .toISOString()
//         .slice(0, 10);
// };

// const randomPhone = (): string => {
//     return faker.phone.number({
//         style: 'international',
//     });
// };

// // export const basicInfoFactory = Factory.define<CreateBasicInfo>(
// //     async () => {
// //         const firstName = faker.person.firstName();
// //         const lastName = faker.person.lastName();

// //         const location = await randomLocation();

// //         return {
// //             firstName,
// //             lastName,

// //             designation: randomDesignation(),

// //             email: faker.internet.email({ //no need to make the emails internally coherent as then they might not be unique
// //                 // firstName,
// //                 // lastName,
// //             }),

// //             // Temporary. We will replace this with
// //             // country-aware phone generation.
// //             phone: '',

// //             country: location.country,
// //             state: location.state,
// //             city: location.city,
// //             zipCode: location.zipCode,

// //             gender: faker.helpers.arrayElement([
// //                 'male',
// //                 'female',
// //                 'other',
// //             ]),

// //             relationshipStatus: faker.helpers.arrayElement([
// //                 'single',
// //                 'committed',
// //             ]),

// //             dob: randomDateOfBirth(),
// //         };
// //     },
// // );


// export const basicInfoFactory = Factory.define<CreateBasicInfo>(
//     async () => {
//         const location = await randomLocation();

//         return {
//             firstName: faker.person.firstName(),
//             lastName: faker.person.lastName(),

//             designation: randomDesignation(),

//             email: faker.internet.email(),

//             phone: randomPhone(),

//             country: location.country,
//             state: location.state,
//             city: location.city,

//             gender: faker.helpers.arrayElement([
//                 'male',
//                 'female',
//                 'other',
//             ]),

//             zipCode: location.zipCode,

//             relationshipStatus: faker.helpers.arrayElement([
//                 'single',
//                 'committed',
//             ]),

//             dob: randomDateOfBirth(),
//         };
//     },
// );

import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import type { CreateBasicInfo } from '@job-applicants/schemas';

import { randomLocation } from './location.js';

const designations = [
    'Software Engineer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'UI/UX Designer',
    'Product Designer',
    'QA Engineer',
    'DevOps Engineer',
    'Data Analyst',
    'Project Manager',
    'Intern',
] as const;

const randomDesignation = (): string =>
    faker.helpers.arrayElement(designations);

const randomDateOfBirth = (): string => {
    const today = new Date();

    const oldestDate = new Date(
        today.getFullYear() - 60,
        today.getMonth(),
        today.getDate(),
    );

    const youngestDate = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate(),
    );

    return faker.date
        .between({
            from: oldestDate,
            to: youngestDate,
        })
        .toISOString()
        .slice(0, 10);
};

//TRADEOFF: No need to introduce randomPhone(countryCode) or couple the two factories.
//STANDARD: ITU E.164
const randomPhone = (): string => {
    const phone = faker.phone.number({
        style: 'international',
    });

    return `+${phone.replace(/\D/g, '')}`;
};

export const basicInfoFactory = Factory.define<CreateBasicInfo>(
    () => ({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),

        designation: randomDesignation(),

        email: faker.internet.email(),

        phone: randomPhone(),

        country: '',
        state: '',
        city: '',
        zipCode: null,

        gender: faker.helpers.arrayElement([
            'male',
            'female',
            'other',
        ]),

        relationshipStatus: faker.helpers.arrayElement([
            'single',
            'committed',
        ]),

        dob: randomDateOfBirth(),
    }),
).onCreate(async (applicant) => {
    const location = await randomLocation();

    return {
        ...applicant,
        country: location.country,
        state: location.state,
        city: location.city,
        zipCode: location.zipCode,
    };
});

// Next logical step

// Move to the next applicant section rather than adding more complexity here:

// basic-info.ts — done
// education.ts
// experience.ts
// technologies.ts
// Applicant factory — compose all sections
// Seed/test-data generation

// We should keep each factory independently responsible for its own section, as opposed to making basicInfoFactory aware of education, experience, etc.