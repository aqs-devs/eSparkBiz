import { Field, FieldError, FieldLabel } from '@job-applicants/ui/components/field';

import type { FormBasicInfoField, Option } from '@job-applicants/shared';
import type { AnyFieldApi } from '@tanstack/react-form';

import { renderFieldComponent } from './renderField';

type FormFieldProps = {
    fieldDefinition: FormBasicInfoField;
    field: AnyFieldApi;
    options?: readonly Option[];
};

export function FormField({
    fieldDefinition,
    field,
    options = [],
}: FormFieldProps) {
    const isInvalid =
        field.state.meta.isTouched && !field.state.meta.isValid;

    return (
        <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={fieldDefinition.key}>
                {fieldDefinition.label}
            </FieldLabel>

            {renderFieldComponent(
                fieldDefinition,
                field,
                options,
            )}

            {isInvalid && (
                <FieldError errors={field.state.meta.errors} />
            )}
        </Field>
    );
}
