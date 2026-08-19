import { Field, FieldError, FieldLabel } from '@job-applicants/ui/components/field';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation('basicInfo');
    const isInvalid =
        field.state.meta.isTouched && !field.state.meta.isValid;

    return (
        <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={fieldDefinition.key}>
                {t(`fields.${fieldDefinition.key}`)}
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
