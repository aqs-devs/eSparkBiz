import { Label } from '@job-applicants/ui/components/label';
import { RadioGroup, RadioGroupItem } from '@job-applicants/ui/components/radio-group';
import type { RadioFieldDefinition } from '@job-applicants/shared';
import type { AnyFieldApi } from '@tanstack/react-form';


type RadioFieldProps = {
    fieldDefinition: RadioFieldDefinition;
    field: AnyFieldApi;
};

export function RadioField({fieldDefinition, field}:RadioFieldProps) {
    return (
        <RadioGroup
            value={field.state.value ?? ''}
            onValueChange={field.handleChange}
        >
            {fieldDefinition.fieldProps.options.map((option) => (
                <div key={option.value} className="flex items-center gap-2">
                    <RadioGroupItem
                        value={option.value}
                        id={`${fieldDefinition.key}-${option.value}`}
                    />

                    <Label htmlFor={`${fieldDefinition.key}-${option.value}`}>
                        {option.label}
                    </Label>
                </div>
            ))}
        </RadioGroup>
    );
}
