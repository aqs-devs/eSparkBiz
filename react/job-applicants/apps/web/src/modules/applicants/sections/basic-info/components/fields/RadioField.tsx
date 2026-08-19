import { Label } from '@job-applicants/ui/components/label';
import { RadioGroup, RadioGroupItem } from '@job-applicants/ui/components/radio-group';
import type { RadioFieldDefinition } from '@job-applicants/shared';
import type { AnyFieldApi } from '@tanstack/react-form';
import { useTranslation } from 'react-i18next';

type RadioFieldProps = {
    fieldDefinition: RadioFieldDefinition;
    field: AnyFieldApi;
};

export function RadioField({fieldDefinition, field}:RadioFieldProps) {
    const { t } = useTranslation('basicInfo');

    return (
        <RadioGroup
            value={field.state.value ?? ''}
            onValueChange={field.handleChange}
        >
            {fieldDefinition.fieldProps.options.map((option) => {
                const label = option.label ?? t(`options.${fieldDefinition.key}.${option.value}`, { defaultValue: option.value });

                return (
                    <div key={option.value} className="flex items-center gap-2">
                        <RadioGroupItem
                            value={option.value}
                            id={`${fieldDefinition.key}-${option.value}`}
                        />

                        <Label htmlFor={`${fieldDefinition.key}-${option.value}`}>
                            {label}
                        </Label>
                    </div>
                );
            })}
        </RadioGroup>
    );
}
