// export const basicInfoFilterableColumns = [
//     { key: 'city',                label: 'City',                type: 'distinct',   paramKeys: ['city'] },
//     { key: 'state',               label: 'State',               type: 'distinct',   paramKeys: ['state'] },
//     { key: 'designation',         label: 'Designation',         type: 'distinct',   paramKeys: ['designation'] },
//     { key: 'gender',              label: 'Gender',              type: 'enum',       paramKeys: ['gender'],                  options: ['male', 'female', 'other'] },
//     { key: 'relationship_status', label: 'Relationship Status', type: 'enum',       paramKeys: ['relationship_status'],     options: ['single', 'committed'] },
//     { key: 'dob',                 label: 'Date of Birth',       type: 'daterange',  paramKeys: ['dob_from', 'dob_to'] },
// ] as const;
import { z } from "zod";
import type { BasicInfo, BasicInfoFilterOptionsSchema, CreateBasicInfo } from '@job-applicants/schemas';
import type { BasicInfoFieldDefinition } from '../types/fieldDefinition';
import { today } from '../date';

type Visibility = 'table' | 'form' | 'detail';

//-------------------

// Detail View

type DetailBasicInfoSection =
    | 'personal'
    | 'contact'
    | 'address'
    | 'system';

// export const DetailSections = {
//     personal: "personal",
//     contact: "contact",
//     address: "address",
//     system: "system",
// } as const;
// export type DetailSection =
//     typeof DetailSections[keyof typeof DetailSections];



export const detailBasicInfoSections = [
    {
        key: 'personal',
        title: 'Personal Information',
    },
    {
        key: 'contact',
        title: 'Contact Information',
    },
    {
        key: 'address',
        title: 'Address',
    },
    {
        key: 'system',
        title: 'System Information',
    },
] as const;

//-------------------

export type Option<T = string> = {
    value: T;
    label: string;
};
type CommonFieldOptions = {
    placeholder?: string;
    disabled?: boolean;
    // required?: boolean; //put this in zod schema

    // NOTE: moved to specific fields fieldProps (like DateFieldOptions)
    // options?: readonly Option[];     //combobox
    // rows?: number;                   // textarea
    // min?: string;                    // date/number
    // max?: string;

    //Keep this object about the field, not the page layout. Layout belongs in the form/page, not in the field definition.
    // layout?: {
    //     columnSpan?: number,
    //     // gridSpan;
    //     // className;
    //     // containerClass;
    //     // labelClass;
    // }
};


// export type BasicInfoFieldBaseDefinition = {
//     key: keyof BasicInfo;

//     dbColumn: ApplicantColumn;

//     label: string;

//     // fieldType:
//     //     | 'text'
//     //     | 'textarea'
//     //     | 'email'
//     //     | 'tel'
//     //     | 'date'
//     //     | 'select'
//     //     | 'radio';

//     formatter?: Formatter;

//     sortable?: boolean;

//     // isVisibleIn: {
//     //     table?: boolean;
//     //     form?: boolean;
//     //     detail?: boolean;
//     // };
//     visibility: readonly Visibility[];

//     filter?: FilterConfig;

//     // fieldProps?: fieldProps;
// };

export type ApplicantColumn = typeof basicInfoFields[number]["key"];

export type BasicInfoFieldBaseDefinition<
    TKey extends keyof BasicInfo = keyof BasicInfo,
> = {
    key: TKey;
    dbColumn: TKey;

    label: string;

    formatter?: Formatter;

    sortable?: boolean;

    visibility: readonly Visibility[];

    filter?: FilterConfig;
    section: DetailBasicInfoSection;
};

export type TextFieldOptions = CommonFieldOptions;

export type DateFieldOptions = CommonFieldOptions & {
    min?: string;
    max?: string;
};

export type TextareaFieldOptions = CommonFieldOptions & {
    rows?: number;
};

export type SelectFieldOptions = CommonFieldOptions & {
    options?: readonly Option[];
};

export type RadioFieldOptions = CommonFieldOptions & {
    options: readonly Option[];
};



//used in basicInfoFIelds
type FilterConfig =
    | {
          type: 'distinct';
          paramKeys: readonly string[];
      }
    | {
          type: 'enum';
          paramKeys: readonly string[];
          options: readonly string[];
      }
    | {
          type: 'daterange';
          paramKeys: readonly string[];
      };

// used in basicInfoFields
export type Formatter = 'date' | 'email' | 'phone';

export const basicInfoFields = [
    {
        key: 'firstName',
        dbColumn: 'firstName',
        label: 'First Name',
        fieldType: 'text',
        sortable: true,
        visibility: ['table', 'form', 'detail'],
        filter: undefined,
        fieldProps: {
            placeholder: 'John',
            // required: true,
        },
        section: 'personal',
    },

    {
        key: 'lastName',
        dbColumn: 'lastName',
        label: 'Last Name',
        fieldType: 'text',
        sortable: true,
        visibility: ['table', 'form', 'detail'],
        filter: undefined,
        section: 'personal',
    },

    {
        key: 'designation',
        dbColumn: 'designation',
        label: 'Designation',
        fieldType: 'text',
        sortable: false,
        visibility: ['table', 'form', 'detail'],
        filter: {
            type: 'distinct',
            paramKeys: ['designation'],
        },
        section: 'personal',
    },

    {
        key: 'email',
        dbColumn: 'email',
        label: 'E-mail',
        fieldType: 'email',
        formatter: 'email',
        sortable: true,
        visibility: ['table', 'form', 'detail'],
        filter: undefined,
        section: 'contact',
    },

    {
        key: 'phone',
        dbColumn: 'phone',
        label: 'Phone',
        fieldType: 'tel',
        formatter: 'phone',
        sortable: false,
        visibility: ['table', 'form', 'detail'],
        filter: undefined,
        section: 'contact',
    },

    {
        key: 'country',
        dbColumn: 'country',
        label: 'Country',
        fieldType: 'select',
        sortable: false,
        visibility: ['table', 'form', 'detail'],
        filter: {
            type: 'distinct',
            paramKeys: ['country'],
        },
        section: 'address',

    },

    {
        key: 'state',
        dbColumn: 'state',
        label: 'State',
        fieldType: 'select',
        sortable: false,
        visibility: ['table', 'form', 'detail'],
        filter: {
            type: 'distinct',
            paramKeys: ['state'],
        },

        // fieldProps: {
        //     options: [
        //         {
        //             value: 'gujarat',
        //             label: 'Gujarat',
        //         },
        //         {
        //             value: 'rajasthan',
        //             label: 'Rajasthan',
        //         },
        //     ],
        // },
        section: 'address',

    },

    {
        key: 'city',
        dbColumn: 'city',
        label: 'City',
        fieldType: 'select',
        sortable: false,
        visibility: ['table', 'form', 'detail'],
        filter: {
            type: 'distinct',
            paramKeys: ['city'],
        },
        section: 'address',

    },

    {
        key: 'gender',
        dbColumn: 'gender',
        label: 'Gender',
        fieldType: 'radio',
        sortable: false,
        visibility: ['table', 'form', 'detail'],
        filter: {
            type: 'enum',
            paramKeys: ['gender'],
            options: ['male', 'female', 'other'],
        },
        fieldProps: {
            options: [
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
            ],
        },
        section: 'personal',
    },

    {
        key: 'zipCode',
        dbColumn: 'zipCode',
        label: 'Zip Code',
        fieldType: 'text',
        sortable: false,
        visibility: ['table', 'form', 'detail'],
        filter: undefined,
        section: 'address',
    },

    {
        key: 'relationshipStatus',
        dbColumn: 'relationshipStatus',
        label: 'Relationship Status',
        fieldType: 'select',
        sortable: false,
        visibility: ['table', 'form', 'detail'],
        filter: {
            type: 'enum',
            paramKeys: ['relationshipStatus'],
            options: ['single', 'committed'],
        },
        fieldProps: {
            options: [
                {
                    value: 'single',
                    label: 'Single',
                },
                {
                    value: 'committed',
                    label: 'Committed',
                },
            ],
        },
        section: 'personal',
    },

    {
        key: 'dob',
        dbColumn: 'dob',
        label: 'Date of Birth',
        fieldType: 'date',
        formatter: 'date',
        sortable: false,
        visibility: ['table', 'form', 'detail'],
        filter: {
            type: 'daterange',
            paramKeys: ['dobFrom', 'dobTo'],
        },
        fieldProps: {
            max: today()
            // max: today //"Don't let the user pick tomorrow." // this is not real validation
        },
        section: 'personal',

    },

    {
        key: 'createdAt',
        dbColumn: 'createdAt',
        label: 'Created At',
        fieldType: 'date',
        formatter: 'date',
        sortable: undefined,
        visibility: ['detail'],
        filter: undefined,
        section: 'system',
    },

    {
        key: 'id',
        dbColumn: 'id',
        label: 'ID',
        fieldType: 'text',
        sortable: undefined,
        visibility: ['detail'],
        filter: undefined,
        section: 'system',
    },
] as const satisfies readonly BasicInfoFieldDefinition[];

// export type BasicInfoField = BasicInfoFieldDefinition;
export type BasicInfoField = (typeof basicInfoFields)[number];

// export type FilterableBasicInfoField = BasicInfoField & {
//     filter: NonNullable<BasicInfoField['filter']>;
// };
// export type FilterableBasicInfoField =
//     BasicInfoField & {
//         key: FilterKey;
//         filter: NonNullable<BasicInfoField["filter"]>;
//     };
// export type FilterableBasicInfoField = Extract<
//     BasicInfoField,
//     {
//         filter: NonNullable<BasicInfoField["filter"]>;
//     }
// >;
// type FilterableBasicInfoField = Extract<
//     BasicInfoField,
//     {
//         key: FilterKey;
//         filter: FilterConfig;
//     }
// >;



export function isFilterableField(
    field: BasicInfoField,
): field is FilterableBasicInfoField {
    return field.filter !== undefined;
}

export const filterableBasicInfoFields: FilterableBasicInfoField[] = basicInfoFields.filter(
    isFilterableField,
);
// export const filterableBasicInfoFields =
//     basicInfoFields.filter(
//         isFilterableField,
//     ) as FilterableBasicInfoField[];

function isVisibleIn(section: Visibility) {
    return (field: BasicInfoField) =>
        (field.visibility as readonly Visibility[]).includes(section);
}
export function isTableField(
    field: BasicInfoField,
): field is Extract<
    BasicInfoField,
    { visibility: readonly ["table", ...Visibility[]] }
> {
    const visibility = field.visibility as readonly Visibility[];

    return visibility.includes("table");
}

// export const tableBasicInfoFields = basicInfoFields.filter(
//     isVisibleIn('table'),
// );
export const tableBasicInfoFields = basicInfoFields.filter(isTableField);

// export type TableBasicInfoField = (typeof tableBasicInfoFields)[number]; 
// type TableBasicInfoField = Extract<
//     BasicInfoField,
//     {
//         key: TableKey;
//     }
// >;

// const filterableBasicInfoFields = basicInfoFields.filter(
//     (
//         field,
//     ): field is (typeof basicInfoFields)[number] & {
//         filter: NonNullable<(typeof field)['filter']>;
//     } => field.filter !== undefined,
// );

// export const filterableBasicInfoFields = basicInfoFields.filter(
//     (
//         field,
//     ): field is Extract<
//         (typeof basicInfoFields)[number],
//         { filter: object }
//     > => field.filter !== undefined,
// );


export const detailBasicInfoFields = basicInfoFields.filter(
    isVisibleIn('detail'),
);

// export type FormBasicInfoField = BasicInfoFieldDefinition;
// export type FormBasicInfoField =
//     BasicInfoFieldDefinition & {
//         key: FormKey;
//     };
// export type FormBasicInfoField = Extract<
//     BasicInfoField,
//     {
//         visibility: readonly ("table" | "form" | "detail")[];
//     }
// >;
// type FormBasicInfoField = Extract<
//     BasicInfoField,
//     {
//         key: Exclude<keyof BasicInfo, "id" | "createdAt" | "isDeleted">;
//     }
// >;
// type FormBasicInfoField = Extract<
//     BasicInfoField,
//     { key: FormKey }
// >;


export function isFormField(field: BasicInfoField): field is FormBasicInfoField {
    return (field.visibility as readonly Visibility[]).includes('form');
}

export const formBasicInfoFields = basicInfoFields.filter(
    isFormField,
);
// export const formBasicInfoFields =
//     basicInfoFields.filter(
//         isFormField,
//     ) as FormBasicInfoField[];



//## Filtering

// export type BasicInfoFilterOptions = Partial<Record<string, string[]>>;
export type BasicInfoFilterOptions = z.infer<typeof BasicInfoFilterOptionsSchema>;

export function getFormFieldDefinition(
    key: FormBasicInfoField['key'],
): FormBasicInfoField {
    const field = formBasicInfoFields.find((field) => field.key === key);

    if (!field) {
        throw new Error(`Unknown form field: ${key}`);
    }

    return field;
}

export type BasicInfoFilterColumn = typeof filterableBasicInfoFields[number]['key'];

export type BasicInfoFilterType = FilterConfig['type'];

export type DateRangeValue = { from?: string; to?: string };

export type ActiveFilterValue = string[] | DateRangeValue;

export type ActiveFilters = Partial<Record<BasicInfoFilterColumn, ActiveFilterValue>>;


const x = formBasicInfoFields;
type X = typeof formBasicInfoFields[number];


// type FormKey = keyof CreateBasicInfo;
// type FormBasicInfoField = typeof formBasicInfoFields[number];
// type FormKey = FormBasicInfoField["key"];
type FormKey =
    Exclude<keyof BasicInfo, "id" | "createdAt" | "isDeleted">;
type FormBasicInfoField = Extract<
    BasicInfoField,
    { key: FormKey }
>;

// type FilterableBasicInfoField = typeof filterableBasicInfoFields[number];
// type FilterKey = FilterableBasicInfoField["key"];
type FilterKey =
    Extract<
        BasicInfoField,
        { filter: FilterConfig }
    >["key"];
export type FilterableBasicInfoField =
    Extract<
        BasicInfoField,
        { filter: FilterConfig }
    >;

// type TableBasicInfoField = typeof tableBasicInfoFields[number];
// type TableKey = TableBasicInfoField["key"];

export function isDistinctFilter(
    field: FilterableBasicInfoField,
): field is Extract<
    FilterableBasicInfoField,
    {
        filter: {
            type: "distinct";
        };
    }
> {
    return field.filter.type === "distinct";
}

export function hasRemoteOptions(
    field: FilterableBasicInfoField,
): field is Extract<
    FilterableBasicInfoField,
    {
        filter:
            | { type: "distinct" }
            | { type: "enum" };
    }
> {
    return (
        field.filter.type === "distinct" ||
        field.filter.type === "enum"
    );
}


