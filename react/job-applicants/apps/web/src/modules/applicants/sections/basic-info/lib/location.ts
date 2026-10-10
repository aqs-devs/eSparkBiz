import Country from "country-state-city/lib/country";
import State from "country-state-city/lib/state";
import type { Option } from '@job-applicants/shared';

export type { Option } from '@job-applicants/shared';

// export const countries = Country.getAllCountries();

// export function getStates(countryCode: string) {
//     return State.getStatesOfCountry(countryCode);
// }

// export function getCities(
//     countryCode: string,
//     stateCode: string,
// ) {
//     return City.getCitiesOfState(countryCode, stateCode);
// }



export function getCountryOptions(): Option[] {
    return Country.getAllCountries().map((country) => ({
        value: country.isoCode,
        label: country.name,
    }));
}

export function getStateOptions(countryCode: string): Option[] {
    return State.getStatesOfCountry(countryCode).map((state) => ({
        value: state.isoCode,
        label: state.name,
    }));
}

export async function getCityOptions(
    countryCode: string,
    stateCode: string,
): Promise<Option[]> {
    const { default: City } = await import("country-state-city/lib/city");
    return City.getCitiesOfState(countryCode, stateCode).map((city) => ({
        value: city.name,
        label: city.name,
    }));
}
