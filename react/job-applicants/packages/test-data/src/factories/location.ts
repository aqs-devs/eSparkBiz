// // // import {
// // //     getCitiesOfState,
// // //     getCountries,
// // //     getStatesOfCountry,
// // // } from '@countrystatecity/countries';

// // // type Location = {
// // //     country: string;
// // //     state: string;
// // //     city: string;
// // //     zipCode: string;
// // // };

// // // // const randomElement = <T>(items: T[]): T => {
// // // //     if (items.length === 0) {
// // // //         throw new Error('Cannot select from an empty array');
// // // //     }

// // // //     return items[Math.floor(Math.random() * items.length)]!;
// // // // };

// // // // export const randomLocation = async (): Promise<Location> => {
// // // //     const countries = await getCountries();

// // // //     const country = randomElement(countries);

// // // //     const states = await getStatesOfCountry(country.iso2);

// // // //     if (states.length === 0) {
// // // //         throw new Error(
// // // //             `Country ${country.iso2} has no states or regions`,
// // // //         );
// // // //     }

// // // //     const state = randomElement(states);

// // // //     const cities = await getCitiesOfState(
// // // //         country.iso2,
// // // //         state.iso2,
// // // //     );

// // // //     if (cities.length === 0) {
// // // //         throw new Error(
// // // //             `State ${country.iso2}/${state.iso2} has no cities`,
// // // //         );
// // // //     }

// // // //     const city = randomElement(cities);

// // // //     return {
// // // //         country: country.iso2,
// // // //         state: state.iso2,
// // // //         city: city.name,
// // // //         zipCode: '',
// // // //     };
// // // // };

// // // const randomElement = <T>(items: T[]): T => {
// // //     if (items.length === 0) {
// // //         throw new Error('Cannot select from an empty array');
// // //     }

// // //     return items[Math.floor(Math.random() * items.length)]!;
// // // };

// // // const shuffle = <T>(items: T[]): T[] => {
// // //     return [...items].sort(() => Math.random() - 0.5);
// // // };

// // // export const randomLocation = async (): Promise<Location> => {
// // //     const countries = shuffle(await getCountries());

// // //     for (const country of countries) {
// // //         const states = shuffle(
// // //             await getStatesOfCountry(country.iso2),
// // //         );

// // //         for (const state of states) {
// // //             const cities = await getCitiesOfState(
// // //                 country.iso2,
// // //                 state.iso2,
// // //             );

// // //             if (cities.length === 0) {
// // //                 continue;
// // //             }

// // //             const city = randomElement(cities);

// // //             return {
// // //                 country: country.iso2,
// // //                 state: state.iso2,
// // //                 city: city.name,
// // //                 zipCode: '',
// // //             };
// // //         }
// // //     }

// // //     throw new Error(
// // //         'Could not find a country, state, and city combination',
// // //     );
// // // };

// // import { Country, State, City } from '@countrystatecity/countries';
// // import { faker } from '@faker-js/faker';

// // export type RandomLocation = {
// //     country: string;
// //     state: string;
// //     city: string;
// //     zipCode: string | null;
// // };

// // const MAX_STATE_ATTEMPTS = 10;

// // export const randomLocation = async (): Promise<RandomLocation> => {
// //     const countries = Country.getAllCountries();

// //     for (let attempt = 0; attempt < MAX_STATE_ATTEMPTS; attempt++) {
// //         const country = faker.helpers.arrayElement(countries);

// //         const states = State.getStatesOfCountry(country.iso2);

// //         if (states.length === 0) {
// //             return {
// //                 country: country.iso2,
// //                 state: '',
// //                 city: '',
// //                 zipCode: null,
// //             };
// //         }

// //         const state = faker.helpers.arrayElement(states);

// //         const cities = City.getCitiesOfState(
// //             country.iso2,
// //             state.iso2,
// //         );

// //         if (cities.length === 0) {
// //             continue;
// //         }

// //         const city = faker.helpers.arrayElement(cities);

// //         return {
// //             country: country.iso2,
// //             state: state.iso2,
// //             city: city.name,
// //             zipCode: city.zipCode || null,
// //         };
// //     }

// //     throw new Error(
// //         `Unable to generate a location after ${MAX_STATE_ATTEMPTS} attempts`,
// //     );
// // };


// // import {
// //     City,
// //     Country,
// //     State,
// // } from '@countrystatecity/countries';
// // import { faker } from '@faker-js/faker';

// // export type RandomLocation = {
// //     country: string;
// //     state: string;
// //     city: string;
// //     zipCode: string | null;
// // };

// // const MAX_ATTEMPTS = 20;

// // export const randomLocation = async (): Promise<RandomLocation> => {
// //     const countries = Country.getAllCountries();

// //     for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
// //         const country = faker.helpers.arrayElement(countries);

// //         const states = State.getStatesOfCountry(country.iso2);

// //         // Some countries have no states/provinces in the dataset.
// //         if (states.length === 0) {
// //             continue;
// //         }

// //         const state = faker.helpers.arrayElement(states);

// //         const cities = City.getCitiesOfState(
// //             country.iso2,
// //             state.iso2,
// //         );

// //         // Some states in the dataset have no cities.
// //         if (cities.length === 0) {
// //             continue;
// //         }

// //         const city = faker.helpers.arrayElement(cities);

// //         return {
// //             country: country.iso2,
// //             state: state.iso2,
// //             city: city.name,
// //             zipCode: city.zipCode?.trim() || null,
// //         };
// //     }

// //     throw new Error(
// //         `Could not generate a valid country/state/city combination after ${MAX_ATTEMPTS} attempts`,
// //     );
// // };

// import {
//     getCitiesOfState,
//     getCountries,
//     getStatesOfCountry,
// } from '@countrystatecity/countries';

// import { faker } from '@faker-js/faker';

// export type RandomLocation = {
//     country: string;
//     state: string;
//     city: string;
//     zipCode: string | null;
// };

// const MAX_ATTEMPTS = 20;

// export const randomLocation = async (): Promise<RandomLocation> => {
//     const countries = await getCountries();

//     for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
//         const country = faker.helpers.arrayElement(countries);

//         const states = await getStatesOfCountry(country.iso2);

//         if (states.length === 0) {
//             continue;
//         }

//         const state = faker.helpers.arrayElement(states);

//         const cities = await getCitiesOfState(
//             country.iso2,
//             state.iso2,
//         );

//         if (cities.length === 0) {
//             continue;
//         }

//         const city = faker.helpers.arrayElement(cities);

//         return {
//             country: country.iso2,
//             state: state.iso2,
//             city: city.name,
//             zipCode: city.zipCode?.trim() || null,
//         };
//     }

//     throw new Error(
//         `Could not generate a valid country/state/city combination after ${MAX_ATTEMPTS} attempts`,
//     );
// };


import {
    getCitiesOfState,
    getCountries,
    getStatesOfCountry,
} from '@countrystatecity/countries';

import { faker } from '@faker-js/faker';

export type RandomLocation = {
    country: string;
    state: string;
    city: string;
    zipCode: string | null;
};

const MAX_ATTEMPTS = 20;

export const randomLocation = async (): Promise<RandomLocation> => {
    const countries = await getCountries();

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        const country = faker.helpers.arrayElement(countries);

        const states = await getStatesOfCountry(country.iso2);

        if (states.length === 0) {
            continue;
        }

        const state = faker.helpers.arrayElement(states);

        const cities = await getCitiesOfState(
            country.iso2,
            state.iso2,
        );

        if (cities.length === 0) {
            continue;
        }

        const city = faker.helpers.arrayElement(cities);

        return {
            country: country.iso2,
            state: state.iso2,
            city: city.name,
            zipCode: null,
        };
    }

    throw new Error(
        `Unable to generate a location after ${MAX_ATTEMPTS} attempts`,
    );
};