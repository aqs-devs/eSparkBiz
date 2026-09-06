import {
    parseAsInteger,
    parseAsNativeArrayOf,
    parseAsString,
    parseAsStringLiteral,
} from 'nuqs';

const sortableColumns = ['id', 'firstName', 'lastName', 'createdAt', 'email'] as const;
const orders = ['asc', 'desc'] as const;

export const basicInfoListQueryParsers = {
    page: parseAsInteger.withDefault(1),
    pageSize: parseAsInteger.withDefault(10),
    sortOn: parseAsStringLiteral(sortableColumns),
    order: parseAsStringLiteral(orders),
    city: parseAsNativeArrayOf(parseAsString),
    designation: parseAsNativeArrayOf(parseAsString),
    state: parseAsNativeArrayOf(parseAsString),
    country: parseAsNativeArrayOf(parseAsString),
    gender: parseAsNativeArrayOf(parseAsString),
    relationshipStatus: parseAsNativeArrayOf(parseAsString),
    dobFrom: parseAsString,
    dobTo: parseAsString,
};

export const basicInfoListQueryOptions = {
    shallow: false,
    urlKeys: {
        relationshipStatus: 'relationship_status',
        dobFrom: 'dob_from',
        dobTo: 'dob_to',
    },
};
