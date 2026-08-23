import type { InputFieldDefinition } from '@job-applicants/shared';
import type { AnyFieldApi } from '@tanstack/react-form';
import { Input } from '@job-applicants/ui/components/input';

type InputFieldProps = {
    fieldDefinition: InputFieldDefinition<'text' | 'email' | 'tel'>;
    field: AnyFieldApi;
    isInvalid: boolean;
    ariaDescribedBy?: string;
};

export function InputField({
    fieldDefinition,
    field,
    isInvalid,
    ariaDescribedBy,
}: InputFieldProps) {
    return (
        <Input
            id={fieldDefinition.key}
            name={field.name}
            type={fieldDefinition.fieldType}
            value={field.state.value ?? ''}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            placeholder={fieldDefinition.fieldProps?.placeholder}
            disabled={fieldDefinition.fieldProps?.disabled}
            aria-invalid={isInvalid}
            aria-describedby={ariaDescribedBy}
        />
    );
}
