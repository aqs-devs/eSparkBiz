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

export function renderFieldComponent(
    fieldDefinition: FormBasicInfoField,
    field: AnyFieldApi,
    options: readonly Option[],
) {
    switch (fieldDefinition.fieldType) {
        case 'text':
        case 'email':
            return (
                <InputField fieldDefinition={fieldDefinition} field={field} />
            );
        case 'tel':
            return (
                <PhoneField fieldDefinition={fieldDefinition} field={field} />
            );
        case 'date':
            return (
                <DateField fieldDefinition={fieldDefinition} field={field} />
            );
        case 'select':
            return (
                <SelectField
                    fieldDefinition={fieldDefinition}
                    field={field}
                    options={options}
                />
            );
        case 'radio':
            return (
                <RadioField fieldDefinition={fieldDefinition} field={field} />
            );
        default:
            return assertNever(fieldDefinition);
    }
}
