// rename

// renderField()

// to

// renderFormField()
// Because later you'll probably have

// renderTableCell()

// renderDetailField()

// renderFilterField()

// renderSearchField()

// The word Field becomes ambiguous.

import type {
    FormBasicInfoField,
    Option,
} from '@job-applicants/shared';
import type { AnyFieldApi } from '@tanstack/react-form';

import { InputField } from './InputField';
import { SelectField } from './SelectField';
import { RadioField } from './RadioField';
import { DateField } from './DateField';
import { PhoneField } from './PhoneField';

function assertNever(value: never): never {
    throw new Error(`Unhandled field type: ${String(value)}`);
}

type RenderFormFieldOptions = {
    options?: readonly Option[];
    isInvalid: boolean;
    ariaDescribedBy?: string;
};

export function renderFormField(
    fieldDefinition: FormBasicInfoField,
    field: AnyFieldApi,
    {
        options = [],
        isInvalid,
        ariaDescribedBy,
    }: RenderFormFieldOptions,
) {
    switch (fieldDefinition.fieldType) {
        case 'text':
        case 'email':
            return (
                <InputField
                    fieldDefinition={fieldDefinition}
                    field={field}
                    isInvalid={isInvalid}
                    ariaDescribedBy={ariaDescribedBy}
                />
            );

        case 'tel':
            return (
                <PhoneField
                    fieldDefinition={fieldDefinition}
                    field={field}
                    isInvalid={isInvalid}
                    ariaDescribedBy={ariaDescribedBy}
                />
            );

        case 'date':
            return (
                <DateField
                    fieldDefinition={fieldDefinition}
                    field={field}
                    isInvalid={isInvalid}
                    ariaDescribedBy={ariaDescribedBy}
                />
            );

        case 'select':
            return (
                <SelectField
                    fieldDefinition={fieldDefinition}
                    field={field}
                    options={options}
                    isInvalid={isInvalid}
                    ariaDescribedBy={ariaDescribedBy}
                />
            );

        case 'radio':
            return (
                <RadioField
                    fieldDefinition={fieldDefinition}
                    field={field}
                    isInvalid={isInvalid}
                    ariaDescribedBy={ariaDescribedBy}
                />
            );

        default:
            return assertNever(fieldDefinition);
    }
}
