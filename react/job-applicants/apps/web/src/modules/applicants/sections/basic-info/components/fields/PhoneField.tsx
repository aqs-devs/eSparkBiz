// Keeping: `fieldDefinition: TelFieldDefinition;` 
// in the props is still useful because later you might add:
// ```
// fieldProps: {
//     defaultCountry: 'IN',
// }
// ```
// or:
// ```
// fieldProps: {
//     disabled: true,
// }
// ```
// without changing the component API.

import type { AnyFieldApi } from '@tanstack/react-form';
import type { TelFieldDefinition } from '@job-applicants/shared';

import { PhoneInput } from './PhoneInput';

type PhoneFieldProps = {
    field: AnyFieldApi;
    fieldDefinition: TelFieldDefinition;
    isInvalid: boolean;
    ariaDescribedBy?: string;
};

export function PhoneField({
    field,
    isInvalid,
    ariaDescribedBy,
}: PhoneFieldProps) {
    return (
        <PhoneInput
            defaultCountry="IN"
            value={field.state.value}
            onChange={(value) => field.handleChange(value ?? '')}
            aria-invalid={isInvalid}
            aria-describedby={ariaDescribedBy}
            // id={fieldDefinition.key}
        />
    );
}
