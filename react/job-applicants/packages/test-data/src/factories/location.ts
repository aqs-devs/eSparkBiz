import { faker } from '@faker-js/faker';

export type RandomLocation = {
    country: string;
    state: string;
    city: string;
    zipCode: string | null;
};

type CuratedLocation = RandomLocation;

const curatedLocations = {
    IN: [
        ['MH', 'Mumbai', '400001'],
        ['DL', 'Delhi', '110001'],
        ['KA', 'Bengaluru', '560001'],
        ['TG', 'Hyderabad', '500001'],
        ['TN', 'Chennai', '600001'],
        ['MH', 'Pune', '411001'],
        ['GJ', 'Ahmedabad', '380001'],
        ['RJ', 'Jaipur', '302001'],
    ],
    US: [
        ['NY', 'New York', '10001'],
        ['CA', 'Los Angeles', '90001'],
        ['IL', 'Chicago', '60601'],
        ['CA', 'San Francisco', '94105'],
        ['WA', 'Seattle', '98101'],
        ['MA', 'Boston', '02108'],
    ],
    GB: [
        ['ENG', 'London', 'SW1A 1AA'],
        ['ENG', 'Manchester', 'M1 1AE'],
        ['ENG', 'Birmingham', 'B1 1BB'],
        ['SCT', 'Edinburgh', 'EH1 1YZ'],
    ],
    CA: [
        ['ON', 'Toronto', 'M5H 2N2'],
        ['BC', 'Vancouver', 'V6B 1A1'],
        ['QC', 'Montreal', 'H2Y 1C6'],
        ['AB', 'Calgary', 'T2P 1J9'],
    ],
    AU: [
        ['NSW', 'Sydney', '2000'],
        ['VIC', 'Melbourne', '3000'],
        ['QLD', 'Brisbane', '4000'],
        ['WA', 'Perth', '6000'],
    ],
    DE: [
        ['BE', 'Berlin', '10115'],
        ['BY', 'Munich', '80331'],
        ['HH', 'Hamburg', '20095'],
        ['HE', 'Frankfurt', '60311'],
    ],
} as const satisfies Record<string, readonly (readonly [string, string, string])[]>;

const weightedCountries = [
    ...Array(50).fill('IN'),
    ...Array(25).fill('US'),
    ...Array(10).fill('GB'),
    ...Array(7).fill('CA'),
    ...Array(5).fill('AU'),
    ...Array(3).fill('DE'),
] as const;

export const LOCATION_DATA: Readonly<Record<string, readonly CuratedLocation[]>> =
    Object.fromEntries(
        Object.entries(curatedLocations).map(([country, locations]) => [
            country,
            locations.map(([state, city, zipCode]) => ({
                country,
                state,
                city,
                zipCode,
            })),
        ]),
    );

export const randomLocation = async (): Promise<RandomLocation> => {
    const country = faker.helpers.arrayElement(weightedCountries);
    const locations = LOCATION_DATA[country];

    if (!locations || locations.length === 0) {
        throw new Error(`No curated locations configured for ${country}`);
    }

    return faker.helpers.arrayElement(locations);
};
