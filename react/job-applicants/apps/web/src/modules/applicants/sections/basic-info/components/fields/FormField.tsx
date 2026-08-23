import {
    Field,
    FieldError,
    FieldLabel,
} from '@job-applicants/ui/components/field';

import { useTranslation } from 'react-i18next';

import type {
    FormBasicInfoField,
    Option,
} from '@job-applicants/shared';

import type { AnyFieldApi } from '@tanstack/react-form';

import { renderFormField } from './renderField';

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
        field.state.meta.isTouched &&
        !field.state.meta.isValid;
    const errorId = `${fieldDefinition.key}-error`;

    return (
        <Field data-invalid={isInvalid}>
            <FieldLabel
                id={`${fieldDefinition.key}-label`}
                htmlFor={
                    fieldDefinition.fieldType === 'radio'
                        ? undefined
                        : fieldDefinition.key
                }
            >
                {t(`fields.${fieldDefinition.key}`)}
            </FieldLabel>

            {renderFormField(
                fieldDefinition,
                field,
                {
                    options,
                    isInvalid,
                    ariaDescribedBy: isInvalid ? errorId : undefined,
                },
            )}

            {isInvalid && (
                <FieldError
                    id={errorId}
                    errors={field.state.meta.errors}
                />
            )}
        </Field>
    );
}
